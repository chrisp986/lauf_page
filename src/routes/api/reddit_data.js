import { writable, type Writable } from 'svelte/store';
import type { RedditTopResponse, RedditTopParams } from './reddit_types';

export async function fetchRedditTop(params: RedditTopParams): Promise<Writable<RedditTopResponse>> {
  const data: Writable<RedditTopResponse> = writable();

  const { subreddit = 'all', limit = 25, time = 'day', after, before } = params;

  let url = `https://www.reddit.com/r/${subreddit}/top.json?limit=${limit}&t=${time}`;
  if (after) url += `&after=${after}`;
  if (before) url += `&before=${before}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const jsonData: RedditTopResponse = await response.json();
    data.set(jsonData);
    return data;
  } catch (error) {
    console.error('Error fetching Reddit data:', error);
    throw error;
  }
}
