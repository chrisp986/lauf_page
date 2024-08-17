<script lang="ts">
  import { onMount } from "svelte";
  import { fetchRedditTop } from "./api/reddit_data";
  import type { RedditTopResponse, RedditPost } from "./api/reddit_types";
  import type { Writable } from "svelte/store";

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

  // let chosen = 1;
  // $: current = opts.find((opt) => opt.pk === chosen);

  let paceMinutes: number = $state(4);
  let paceSeconds: number = $state(36);

  let isFirstFunction = $state(true);

  function firstFunction() {
    console.log("First Function");
  }

  function secondFunction() {
    console.log("Second Function");
  }

  function toggleFunction() {
    isFirstFunction = !isFirstFunction;
    if (isFirstFunction) {
      firstFunction();
    } else {
      secondFunction();
    }
  }

  $effect(() => {
    console.log("Current function ${isFirstFunction ? '1' : '2'}");
  });

  function convertToKilometers(paceMinutes: number, paceSeconds: number) {
    const milesToKM: number = 1.609344;
    const secondsToDecimal: number = paceSecondsToDecimal(paceSeconds);
    const timeInDecimal: number = paceMinutes + secondsToDecimal;

    console.log("timeDecimal", timeInDecimal / milesToKM);

    const minutesKM = timeInDecimal / milesToKM;
    console.log("remainder", minutesKM % 1);

    const decimalToSeconds: number = (minutesKM % 1) * 0.6;
    console.log("decSeconds", Math.floor(minutesKM) + decimalToSeconds);

    return (Math.floor(minutesKM) + decimalToSeconds).toFixed(2);
  }

  function convertToMiles(paceMinutes: number, paceSeconds: number) {
    const conversionRate: number = 1.609344;
    const secondsToDecimal: number = paceSecondsToDecimal(paceSeconds);
    const timeInDecimal: number = paceMinutes + secondsToDecimal;

    const minutesKM = timeInDecimal * conversionRate;

    const decimalToSeconds: number = (minutesKM % 1) * 0.6;

    return (Math.floor(minutesKM) + decimalToSeconds).toFixed(2);
  }

  function paceSecondsToDecimal(seconds: number) {
    return seconds / 60;
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

<div class="flex">
  <div class="max-w-sm mt-4 w-64">
    <select
      id="number-dd"
      name="number"
      bind:value={paceMinutes}
      class="h-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    >
      {#each { length: 20 } as _, i}
        <option>{i + 1}</option>
      {/each}
    </select>
  </div>

  <div class="mt-4 w-6 font-extrabold flex items-center justify-center">:</div>

  <div class="max-w-sm mt-4 w-64">
    <select
      id="number-dd"
      name="number"
      bind:value={paceSeconds}
      class="h-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    >
      {#each { length: 59 } as _, i}
        <option>{i + 1}</option>
      {/each}
    </select>
  </div>

  <div class="max-w-sm mt-4 w-64 ml-2">
    <button
      onclick={toggleFunction}
      class="h-full w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    >
      {isFirstFunction ? "First" : "Second"}
    </button>
  </div>
</div>

<div class="col-span-4">
  <p>Pace: {paceMinutes}:{paceSeconds} /Mile</p>
  <p>
    Pace: {convertToKilometers(paceMinutes, paceSeconds)} /KM
  </p>
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
</div>
