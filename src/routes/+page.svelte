<script lang="ts">
  import { onMount } from "svelte";
  import { fetchRedditTop } from "./api/reddit_data";
  import type { RedditTopResponse, RedditPost } from "./api/reddit_types";
  import type { Writable } from "svelte/store";
  import PaceConvert from "$lib/components/paceConvertText.svelte";

  let opts = [
    {
      pk: 1,
      name: "Kelvin Kiptum",
      pace_M: 4,
      pace_S: 36,
      distance: "Marathon",
      race: "Berlin",
      date: "01.01.2023",
    },
    { pk: 2, name: "second" },
    { pk: 3, name: "third" },
  ];

  let paceMinutes: number = $state(4);
  let paceSeconds: number = $state(36);

  let toggleMilesAndKM = $state(true);

  function toggleFunction() {
    toggleMilesAndKM = !toggleMilesAndKM;
  }

  function* range(start: number, end: number): Generator<number> {
    for (let i = start; i <= end; i++) yield i;
  }

  // let redditData: Writable<RedditTopResponse>;

  // onMount(async () => {
  //   try {
  //     redditData = await fetchRedditTop({ subreddit: 'running', limit: 2, time: 'week' });
  //   } catch (error) {
  //     console.error('Failed to fetch Reddit data:', error);
  //   }
  // });
</script>

<h2 class="text-lg mb-2">Pace Converter</h2>
<p class="text-sm mb-2">
  Convert the pace between minutes per Mile and minutes per KM.
</p>

<div class="flex mb-4">
  <div class="max-w-sm w-64">
    <select
      id="number-dd"
      name="number"
      bind:value={paceMinutes}
      class="text-lg h-full bg-gray-50/50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    >
      {#each range(0, 20) as i}
        <option>{i}</option>
      {/each}
    </select>
  </div>

  <div class="text-xl w-6 font-extrabold flex items-center justify-center">
    :
  </div>

  <div class="max-w-sm w-64">
    <select
      id="number-dd"
      name="number"
      bind:value={paceSeconds}
      class="text-lg h-full bg-gray-50/50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    >
      {#each range(0, 59) as i}
        <option>{i}</option>
      {/each}
    </select>
  </div>

  <div class="max-w-sm w-64 ml-2">
    <button
      onclick={toggleFunction}
      class="text-lg h-full w-full p-2.5 bg-gray-50/50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    >
      {toggleMilesAndKM ? "/Miles" : "/KM"}
    </button>
  </div>
</div>

<div class="flex">
  <PaceConvert {paceMinutes} {paceSeconds} {toggleMilesAndKM} />
</div>

<!-- {#if $redditData}
<ul>
  {#each $redditData.data.children as post}
      <li>
        <a href="https://www.reddit.com{post.data.permalink}">{post.data.title}</a>
        by {post.data.author} (Score: {post.data.score})
      </li>
    {/each}
  </ul>
{:else}
  <p>Loading top Reddit posts...</p>
{/if} -->
