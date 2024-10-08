// Main interface for the Reddit .top function response
export interface RedditTopResponse {
  kind: string;
  data: RedditListing;
}

// Interface for the listing data
export interface RedditListing {
  after: string | null;
  before: string | null;
  children: RedditPost[];
  dist: number;
  modhash: string;
}

// Interface for individual posts
export interface RedditPost {
  kind: string;
  data: {
    id: string;
    subreddit: string;
    title: string;
    author: string;
    score: number;
    ups: number;
    downs: number;
    num_comments: number;
    created_utc: number;
    url: string;
    permalink: string;
    selftext: string;
    thumbnail: string;
    is_self: boolean;
    over_18: boolean;
    stickied: boolean;
    // Add more fields as needed
  };
}

// Parameters for the .top function
export interface RedditTopParams {
  subreddit?: string;
  limit?: number;
  time?: 'hour' | 'day' | 'week' | 'month' | 'year' | 'all';
  after?: string;
  before?: string;
}