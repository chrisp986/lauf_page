
export interface RedditPost {
    id: string;
    title: string;
    author: string;
    score: number;
    url: string;
    created_utc: number;
    subreddit: string;
    ups: number;
    downs: number;
    selftext: string;
}

interface RedditTopResponse {
    kind: string;
    data: {
        children: Array<{ kind: string; data: RedditPost }>;
    };
}

interface CacheEntry<T> {
    data: T;
    timestamp: number;
}


class RateLimiter {
    private tokens: number;
    private lastRefilled: number;
    private refillRate: number;
    private capacity: number;

    constructor(tokensPerSecond: number, capacity: number) {
        this.tokens = capacity;
        this.lastRefilled = Date.now();
        this.refillRate = tokensPerSecond;
        this.capacity = capacity;
    }

    async waitForToken(): Promise<void> {
        this.refillTokens();
        if (this.tokens < 1) {
            const waitTime = (1 / this.refillRate) * 1000;
            await new Promise(resolve => setTimeout(resolve, waitTime));
            return this.waitForToken();
        }
        this.tokens -= 1;
    }

    private refillTokens(): void {
        const now = Date.now();
        const timePassed = (now - this.lastRefilled) / 1000;
        this.tokens = Math.min(this.capacity, this.tokens + timePassed * this.refillRate);
        this.lastRefilled = now;
    }
}




class RedditDataFetcher {
    private CACHE_KEY: string;
    private CACHE_DURATION: number;
    private url: string;
    private subreddit: string;
    private limit: number;

    constructor(subreddit: string, limit: number = 5, cacheDurationMs: number = 5 * 60 * 1000, time: string = 'week') {
        this.subreddit = subreddit;
        this.limit = limit;
        this.CACHE_KEY = `reddit_${subreddit}_${limit}`;
        this.CACHE_DURATION = cacheDurationMs;
        this.url = `https://www.reddit.com/r/${subreddit}/top.json?limit=${limit}&t=${time}`;
    }

    async fetchData(): Promise<RedditPost[]> {
        try {
            // Check if there's cached data
            const cachedData = localStorage.getItem(this.CACHE_KEY);
            if (cachedData) {
                const { data, timestamp } = JSON.parse(cachedData) as CacheEntry<RedditPost[]>;
                if (Date.now() - timestamp < this.CACHE_DURATION || data.length != this.limit) {
                    console.log(`Using cached data for r/${this.subreddit}`);
                    return data;
                }
            }

            // If no valid cached data, fetch from API
            console.log(`Fetching new data for r/${this.subreddit}`);
            const response = await fetch(this.url, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`Error fetching data: ${response.statusText}`);
            }

            const responseData: RedditTopResponse = await response.json();
            const posts = responseData.data.children.map(child => ({
                ...child.data,
                subreddit: this.subreddit // Ensure subreddit is included
            }));

            // Cache the new data
            localStorage.setItem(
                this.CACHE_KEY,
                JSON.stringify({
                    data: posts,
                    timestamp: Date.now(),
                } as CacheEntry<RedditPost[]>)
            );

            return posts;
        } catch (err) {
            console.error(`Error fetching Reddit data for r/${this.subreddit}:`, err);
            throw err;
        }
    }
}

export class MultiRedditFetcher {
    private fetchers: Map<string, RedditDataFetcher>;
    private rateLimiter: RateLimiter;

    constructor(subreddits: string[], limit: number, cacheDurationMs: number = 5 * 60 * 1000, time: string = 'week') {
        this.fetchers = new Map(
            subreddits.map(subreddit => [subreddit, new RedditDataFetcher(subreddit, limit, cacheDurationMs)])
        );
        // Rate limit to 5 request per second, with a burst capacity of 5 requests
        this.rateLimiter = new RateLimiter(4, 5);
    }

    async fetchAllData(): Promise<RedditPost[]> {
        const fetchPromises = Array.from(this.fetchers.values()).map(async fetcher => {
            await this.rateLimiter.waitForToken();
            return fetcher.fetchData();
        });
        const results = await Promise.all(fetchPromises);
        return results.flat();
    }

    async fetchDataForSubreddit(subreddit: string): Promise<RedditPost[]> {
        const fetcher = this.fetchers.get(subreddit);
        if (!fetcher) {
            throw new Error(`No fetcher found for subreddit: ${subreddit}`);
        }
        await this.rateLimiter.waitForToken();
        return fetcher.fetchData();
    }
}

