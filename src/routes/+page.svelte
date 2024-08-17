<script lang="ts">
  import { onMount } from "svelte";
  import { fetchRedditTop } from "./api/reddit_data";
  import type { RedditTopResponse, RedditPost } from "./api/reddit_types";
  import type { Writable } from "svelte/store";
  import PaceConvertText from "$lib/components/paceConvertText.svelte";
  import PaceConvertSelect from "$lib/components/paceConvertSelect.svelte";

  let paceMinutes: number = $state(4);
  let paceSeconds: number = $state(36);

  let toggleMilesAndKM = $state(true);

  function toggleFunction() {
    toggleMilesAndKM = !toggleMilesAndKM;
  }

  function* range(start: number, end: number): Generator<number> {
    for (let i = start; i <= end; i++) yield i;
  }

  function paceToRaceTime(
    paceMinutes: number,
    paceSeconds: number,
    toggleMilesAndKM: boolean,
    distance: number,
  ) {
    const distMarathon: number = 42.195;
    const distHalfMarathon: number = 21.0975;
    const dist10km: number = 10;
    const dist5km: number = 5;

    let dist = distance;

    if (distance == 42) {
      dist = distMarathon;
    } else if (distance == 21) {
      dist = distHalfMarathon;
    } else if (distance == 10) {
      dist = dist10km;
    } else if (distance == 5) {
      dist = dist5km;
    }

    let minutesDist: number = 0;

    const secondsToDecimal: number = paceSecondsToDecimal(paceSeconds);
    const timeInDecimal: number = paceMinutes + secondsToDecimal;

    if (toggleMilesAndKM) {
      minutesDist = timeInDecimal * (distance / 1.609344);
    } else {
      minutesDist = timeInDecimal * distance;
    }

    const decimalToSeconds: number = (minutesDist % 1) * 0.6;

    let raceTime = Math.floor(minutesDist) + decimalToSeconds;
    let raceTimeInHours: number = raceTime;

    if (raceTime > 60) {
      console.log("rt", raceTime);
      raceTimeInHours = raceTime / 60;
    }

    const total = raceTimeInHours.toFixed(2);

    return total.replace(".", ":");
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

<h2 class="text-lg mb-2">Pace Converter</h2>
<p class="text-sm mb-2">
  Convert the pace between minutes per Mile and minutes per KM.
</p>

<div class="flex mb-4">
  <!--TODO -->
  <!-- <PaceConvertSelect {paceMinutes} {paceSeconds} {toggleMilesAndKM} /> -->
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

<div class="flex mb-4">
  <PaceConvertText {paceMinutes} {paceSeconds} {toggleMilesAndKM} />
</div>

<h3>Finishing Times</h3>
<div class="grid grid-cols-1">
  <p>
    Marathon: {paceToRaceTime(paceMinutes, paceSeconds, toggleMilesAndKM, 42)}
  </p>
  <p>
    Half-Marathon: {paceToRaceTime(
      paceMinutes,
      paceSeconds,
      toggleMilesAndKM,
      21,
    )}
  </p>
  <p>10km: {paceToRaceTime(paceMinutes, paceSeconds, toggleMilesAndKM, 10)}</p>
  <p>5km: {paceToRaceTime(paceMinutes, paceSeconds, toggleMilesAndKM, 5)}</p>
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
