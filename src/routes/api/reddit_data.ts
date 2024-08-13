import { writable, type Writable } from 'svelte/store';
import type { RedditTopResponse, RedditTopParams } from './reddit_types';

export async function fetchRedditTop(params: RedditTopParams): Promise<Writable<RedditTopResponse>> {
  const data: Writable<RedditTopResponse> = writable();

  const { subreddit = 'all', limit = 25, time = 'day', after, before } = params;

  let url = `https://www.reddit.com/r/${subreddit}/top.json?limit=${limit}&t=${time}`;
  if (after) url += `&after=${after}`;
  if (before) url += `&before=${before}`;

  try {
    console.log("URL", url);
    const response = await fetch(url, {method: 'GET',
      headers: {
        Accept: 'application/json',
      },});
    if (!response.ok) {
      throw new Error('Error status: ${response.status}');
    }
    const jsonData: RedditTopResponse = await response.json();
    data.set(jsonData);
    return data;
  } catch (error) {
  if (error instanceof Error) {
    console.log('Error message: ', error.message);
    return error.message;
  } else {
    console.log('Unexpected error: ', error);
    return 'An unexpected error occurred';
  }
}
}
