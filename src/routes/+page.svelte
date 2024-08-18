<script lang="ts">
  import { onMount } from "svelte";
  import { fetchRedditTop } from "./api/reddit_data";
  import type { RedditTopResponse, RedditPost } from "./api/reddit_types";
  import type { Writable } from "svelte/store";
  import PaceConvertText from "$lib/components/paceConvertText.svelte";
  import PaceConvertSelect from "$lib/components/paceConvertSelect.svelte";
  import RaceTime from "$lib/components/raceTime.svelte";
  import type convertPropsRaceTime from "$lib/components/raceTime.svelte";

  let paceMinutes: number = $state(4);
  let paceSeconds: number = $state(36);

  let isMinutesPerMile = $state(true);

  function toggleFunction() {
    isMinutesPerMile = !isMinutesPerMile;
  }

  function* range(start: number, end: number): Generator<number> {
    for (let i = start; i <= end; i++) yield i;
  }

  type RaceDistance = "marathon" | "half-marathon" | "10k" | "5k";

  function calculateFinishTime(
    paceMinutes: number,
    paceSeconds: number,
    raceDistance: RaceDistance,
    isMinutesPerMile: boolean = false,
  ): string {
    // Convert pace to total seconds
    const paceInSeconds = paceMinutes * 60 + paceSeconds;

    // Define distances in kilometers
    const distances: { [key in RaceDistance]: number } = {
      marathon: 42.195,
      "half-marathon": 21.0975,
      "10k": 10,
      "5k": 5,
    };

    // Get the distance in km for the selected race
    const distanceKm = distances[raceDistance];

    // Calculate total seconds for the given distance
    let totalSeconds: number;
    if (isMinutesPerMile) {
      // If pace is in minutes per mile, convert to km pace
      const kmPace = paceInSeconds / 1.60934;
      totalSeconds = kmPace * distanceKm;
    } else {
      // Pace is already in minutes per km
      totalSeconds = paceInSeconds * distanceKm;
    }

    // Convert total seconds to hours, minutes, and seconds
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);

    // Format the result as a string
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
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

<!-- svelte-ignore state_referenced_locally -->
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
      {isMinutesPerMile ? "/Miles" : "/KM"}
    </button>
  </div>
</div>

<div class="flex mb-4">
  <PaceConvertText {paceMinutes} {paceSeconds} {isMinutesPerMile} />
</div>

<h2 class="font-semibold mb-2">Finishing Times</h2>
<div class="flex p-1">
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
