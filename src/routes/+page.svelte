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

<div class="lg:w-full mb-10 flex flex-col justify-center items-center">
  <hr class="w-60 lg:w-96 h-px lg:my-6 bg-gray-400 border-0 dark:bg-gray-700" />
  <RaceTime {paceMinutes} {paceSeconds} {isMinutesPerMile} />
</div>

<!-- <RedditPosts {subreddits} {postsPerSubreddit} {cacheDuration} /> -->

<RedditPosts />

<!-- <div class="p-4">
  {#if error}
    <p>Error: {error}</p>
  {:else if !redditData}
    <p>Loading...</p>
  {:else}
    <p class="font-bold text-lg">Top Posts on Reddit</p>
    <div class="border-3 rounded-md">
      <ul>
        {#each redditData.data.children as post}
          <div
            class="hover:bg-accent border-2 rounded-md shadow-sm m-1 p-1 bg-gray-300"
            style="position:relative"
          >
            <li>
              <a
                href={"https://www.reddit.com" + post.data.permalink}
                target="_blank"
                class="font-medium"
                ><span class="link-spanner"></span>
                {post.data.title}
              </a>
              <p>
                Score: {post.data.score} | Comments: {post.data.num_comments}
              </p>
              <p>Subreddit: r/{post.data.subreddit}</p>
              <p>Pic: r/{post.data.thumbnail}</p>
            </li>
          </div>
        {/each}
      </ul>
    </div>
  {/if}
</div> -->
