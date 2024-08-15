<script lang="ts">
  import { onMount } from 'svelte';
  import { fetchRedditTop } from './api/reddit_data';
  import type { RedditTopResponse, RedditPost } from './api/reddit_types';
  import type { Writable } from 'svelte/store';

    let opts = [
        {pk:1, name:"Kelvin Kiptum", pace_M: 4, pace_S: 36, distance: "Marathon", race:"Berlin", date:"01.01.2023"},
        {pk:2, name:"second"},
        {pk:3, name:"third"},
    ]
    
    let chosen = 1;
    $: current = 


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

    })

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

        console.log("timeDecimal", timeInDecimal / );

        const minutesKM = timeInDecimal * conversionRate;
        console.log("remainder", minutesKM % 1);

        const decimalToSeconds: number = (minutesKM % 1) * 0.6;
        console.log("decSeconds", Math.floor(minutesKM) + decimalToSeconds);

        return (Math.floor(minutesKM) + decimalToSeconds).toFixed(2);
    }


    function paceSecondsToDecimal (seconds: number) {
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

<div class="container">
    <div class="item"></div>
    <div class="points"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="form-item">
        <select id="number-dd" name="number" bind:value={paceMinutes}>
            {#each { length: 20 } as _, i}
                <option>{i + 1}</option>
            {/each}
        </select>
    </div>
    <div class="points">:</div>
    <div class="form-item">
        <select id="number-dd" name="number" bind:value={paceSeconds}>
            {#each { length: 59 } as _, i}
                <option>{i + 1}</option>
            {/each}
        </select>
    </div>
    <div class="form-item">
        <button onclick={toggleFunction}>
          {isFirstFunction ? "First" : "Second"}
        </button>
    </div>
    <div class="item row-3">
        <p>Pace: {paceMinutes}:{paceSeconds} /Mile</p>
        <p>
            Pace: {convertToKilometers(paceMinutes, paceSeconds)} /KM
        </p>
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

</div>
