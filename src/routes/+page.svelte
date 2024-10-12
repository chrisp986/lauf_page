<script lang="ts">
  import PaceConvertText from "$lib/components/paceConvertText.svelte";
  import RaceTime from "$lib/components/raceTime.svelte";
  import RedditPosts from "$lib/components/redditPosts.svelte";

  let paceMinutes: number = $state(4);
  let paceSeconds: number = $state(36);

  let isMinutesPerMile = $state(true);

  function toggleFunction() {
    isMinutesPerMile = !isMinutesPerMile;
  }

  function* range(start: number, end: number): Generator<number> {
    for (let i = start; i <= end; i++) yield i;
  }
</script>

<div class="grid justify-items-center mt-4">
  <h2 class="text-2xl lg:text-4xl lg:mb-2">Pace Converter</h2>
  <div class="text-sm lg:text-base">
    Convert the pace between minutes per Mile and minutes per KM.
  </div>
</div>
<div class="flex justify-center items-center w-full h-px mt-4 mb-6 lg:my-6">
  <hr class="w-60 lg:w-1/3 border-slate-400/50 border-1 dark:border-white" />
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

<div class="flex mt-4 text-lg lg:text-xl items-center justify-center">
  <PaceConvertText {paceMinutes} {paceSeconds} {isMinutesPerMile} />
</div>

<div class="lg:w-full mb-7 flex flex-col justify-center items-center">
  <hr
    class="w-60 lg:w-1/3 h-px my-4 lg:my-6 border-slate-400/50 border-1 dark:border-white"
  />
  <RaceTime {paceMinutes} {paceSeconds} {isMinutesPerMile} />
</div>

<div class="flex justify-center items-center w-full h-px mt-4 mb-6 lg:my-6">
  <hr
    class="w-60 lg:w-1/3 h-px my-4 lg:my-6 border-slate-400/50 border-1 dark:border-white"
  />
</div>

<RedditPosts />
