<script lang="ts">
  import { onMount } from "svelte";
  import { MultiRedditFetcher, type RedditPost } from "./MultiRedditFetcher";

  let redditPosts: RedditPost[] = $state([]);
  let isLoading = $state(true);
  let error: string | null = $state(null);
  let progress = $state(0);
  let limitPostsVisible: number = 10;
  let selectedValues: string[] = $state(["running", "AdvancedRunning", "Marathon_Training"]);

  const subreddits = ["running", "AdvancedRunning", "Marathon_Training"];
  const postLimit = 10;
  const cacheDuration = 60 * 60 * 1000; // 60 minutes
  const time = "week";

  const multiFetcher = new MultiRedditFetcher(
    subreddits,
    postLimit,
    cacheDuration,
    time,
  );



  async function fetchDataWithProgress() {
    const totalSubreddits = subreddits.length;
    let fetchedSubreddits = 0;

    try {
      const allPosts = await Promise.all(
        subreddits.map(async (subreddit) => {
          const posts = await multiFetcher.fetchDataForSubreddit(subreddit);
          fetchedSubreddits++;
          progress = (fetchedSubreddits / totalSubreddits) * 100;
          return posts;
        }),
      );

      // redditPosts = allPosts.flat().sort((a, b) => b.score - a.score);
      redditPosts = allPosts.flat();
    } catch (err) {
      error = (err as Error).message;
    } finally {
      isLoading = false;
    }
  }

  onMount(() => {
    fetchDataWithProgress();
  });

  function filteredPosts(redditPosts: RedditPost[], selectedValues: string[]): RedditPost[] {
    return redditPosts.filter(redditPost => selectedValues.includes(redditPost.subreddit)).sort((a, b) => b.score - a.score).slice(0, limitPostsVisible);
  }

 
  function handleCheckboxChange(sub: string, isChecked: boolean): void {
    if (isChecked) {
      // If checked, add to selectedValues array
      selectedValues = [...selectedValues, sub];
    } else {
      // If unchecked, remove from selectedValues array
      selectedValues = selectedValues.filter((value) => value !== sub);
    }
  }
</script> 

<div>  
  <!-- grid-cols-[10%_12%_20%_22%] -->
  <div class="grid grid-flow-col grid-cols-[12%_15%_35%_22%] sm:grid-cols-[10%_12%_20%_22%] items-center bg-white mx-1 border-2">
    <p class="text-sm sm:text-5xl font-bold bg-reddit-orange w-1/10 text-white h-16 flex items-center justify-center">r/...</p>
  {#each subreddits as sub}

    <label class="ml-auto px-3 text-xs sm:text-lg">
    <input type="checkbox" class="w-4 h-4" checked 
           onclick={(e: Event) => handleCheckboxChange(sub, (e.target as HTMLInputElement).checked)}>
    {sub}
  </label>
  {/each}
</div>


  {#if isLoading}
    <p class="flex items-center justify-center">Loading posts... {progress.toFixed(0)}% complete</p>
    <!-- <progress value={progress} max="100"></progress> -->
  {:else if error}
    <p class="error">Error: {error}</p>
  {:else}
    <ul>
        {#each filteredPosts(redditPosts, selectedValues) as post}
        <li>
          <div
            class="hover:bg-accent border-2 m-1 bg-white grid grid-cols-[10%_70%_20%] grid-rows-2"
            style="position:relative"
          >
            <div
              class="flex items-center justify-center row-span-2 bg-slate-300 p-3 font-medium"
            >
              {post.score}
            </div>

            <div class="max-w-2xl px-3 pt-2">
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                class="font-medium text-medium md:text-lg"
              >
                <span class="link-spanner"></span>
                <p class="chars-limit-header">
                  {post.title}
                </p></a
              >
            </div>
            <div class="border-l-2 flex items-end justify-end pr-2">
              r/{post.subreddit}
            </div>

            <div
              class="text-xs md:text-sm chars-limit-text pl-3 pt-1 text-gray-500"
            >
              {post.selftext}
            </div>
            <div class="border-l-2"></div>
          </div>
        </li>

      {/each}
    </ul>
  {/if}
</div>

<style>

</style>
