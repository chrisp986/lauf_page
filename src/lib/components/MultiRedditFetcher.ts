import { onMount } from 'svelte';

export interface RedditPost {
    id: string;
    title: string;
    author: string;
    score: number;
    url: string;
    created_utc: number;
    subreddit: string; // Added to identify the source subreddit
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

class RedditDataFetcher {
    private CACHE_KEY: string;
    private CACHE_DURATION: number;
    private url: string;
    private subreddit: string;

    constructor(subreddit: string, limit: number = 25, cacheDurationMs: number = 5 * 60 * 1000) {
        this.subreddit = subreddit;
        this.CACHE_KEY = `reddit_${subreddit}_${limit}`;
        this.CACHE_DURATION = cacheDurationMs;
        this.url = `https://www.reddit.com/r/${subreddit}/top.json?limit=${limit}`;
    }

    async fetchData(): Promise<RedditPost[]> {
        try {
            // Check if there's cached data
            const cachedData = localStorage.getItem(this.CACHE_KEY);
            if (cachedData) {
                const { data, timestamp } = JSON.parse(cachedData) as CacheEntry<RedditPost[]>;
                if (Date.now() - timestamp < this.CACHE_DURATION) {
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

    constructor(subreddits: string[], limit: number = 25, cacheDurationMs: number = 5 * 60 * 1000) {
        this.fetchers = new Map(
            subreddits.map(subreddit => [subreddit, new RedditDataFetcher(subreddit, limit, cacheDurationMs)])
        );
    }

    async fetchAllData(): Promise<RedditPost[]> {
        const fetchPromises = Array.from(this.fetchers.values()).map(fetcher => fetcher.fetchData());
        const results = await Promise.all(fetchPromises);
        return results.flat();
    }

    async fetchDataForSubreddit(subreddit: string): Promise<RedditPost[]> {
        const fetcher = this.fetchers.get(subreddit);
        if (!fetcher) {
            throw new Error(`No fetcher found for subreddit: ${subreddit}`);
        }
        return fetcher.fetchData();
    }
}


// interface RedditTopResponse {
//   kind: string;
//   data: {
//     children: Array<{ kind: string; data: RedditPost }>;
//   };
// }

// interface CacheEntry<T> {
//   data: T;
//   timestamp: number;
// }

// interface RedditListing {
//   after: string | null;
//   before: string | null;
//   children: RedditPost[];
//   dist: number;
//   modhash: string;
// }

// interface RedditPost {
//   kind: string;
//   data: {
//     id: string;
//     subreddit: string;
//     title: string;
//     author: string;
//     score: number;
//     ups: number;
//     downs: number;
//     num_comments: number;
//     created_utc: number;
//     url: string;
//     permalink: string;
//     selftext: string;
//     thumbnail: string;
//     is_self: boolean;
//     over_18: boolean;
//     stickied: boolean;
//   };
// }