<script lang="ts">
  import { onMount } from "svelte";
  import { fetchRedditTop } from "./api/reddit_data";
  import type { RedditTopResponse, RedditPost } from "./api/reddit_types";
  import type { Writable } from "svelte/store";
  import PaceConvertText from "$lib/components/paceConvertText.svelte";
  import PaceConvertSelect from "$lib/components/paceConvertSelect.svelte";
  import RaceTime from "$lib/components/raceTime.svelte";

  let paceMinutes: number = $state(4);
  let paceSeconds: number = $state(36);

  let isMinutesPerMile = $state(true);

  function toggleFunction() {
    isMinutesPerMile = !isMinutesPerMile;
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

<div class="grid justify-items-center mt-4">
  <h2 class="text-2xl lg:text-4xl lg:mb-2">Pace Converter</h2>
  <div class="text-sm lg:text-base">
    Convert the pace between minutes per Mile and minutes per KM.
  </div>
  <hr
    class="w-60 lg:w-96 h-px mt-4 mb-6 lg:my-6 bg-gray-400 border-0 dark:bg-gray-700"
  />
</div>

<div class="flex lg:justify-center">
  <!--TODO -->
  <!-- <PaceConvertSelect {paceMinutes} {paceSeconds} {toggleMilesAndKM} /> -->
  <div class="max-w-sm w-64">
    <select
      id="number-dd"
      name="number"
      bind:value={paceMinutes}
      class="text-lg h-full bg-gray-50/50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    >
      {#each range(0, 15) as i}
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
      {isMinutesPerMile ? "/Miles" : "/KM"}
    </button>
  </div>
</div>

<div class="flex my-4 text-lg lg:text-xl">
  <PaceConvertText {paceMinutes} {paceSeconds} {isMinutesPerMile} />
</div>

<div class="">
  <RaceTime {paceMinutes} {paceSeconds} {isMinutesPerMile} />
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
