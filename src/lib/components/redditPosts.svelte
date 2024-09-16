<script lang="ts">
  import { onMount } from "svelte";
  import { MultiRedditFetcher, type RedditPost } from "./MultiRedditFetcher";

  let redditPosts: RedditPost[] = $state([]);
  let isLoading = $state(true);
  let error: string | null = $state(null);
  let progress = $state(0);
  let limitPostsVisible: number = 10;
  let selectedValues: string[] = $state([]);

  const subreddits = ["running", "AdvancedRunning"];
  const postLimit = 15;
  const cacheDuration = 60 * 60 * 1000; // 60 minutes
  const time = "week";

  const multiFetcher = new MultiRedditFetcher(
    subreddits,
    postLimit,
    cacheDuration,
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

      redditPosts = allPosts.flat().sort((a, b) => b.score - a.score);
    } catch (err) {
      error = (err as Error).message;
    } finally {
      isLoading = false;
    }
  }

  onMount(() => {
    fetchDataWithProgress();
  });

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
  <h1>Top Posts from Multiple Subreddits</h1>

  {#each subreddits as sub}
  <label>
    <input type="checkbox" 
           onchange={(e: Event) => handleCheckboxChange(sub, (e.target as HTMLInputElement).checked)}>
    {sub}
</label>
  {/each}
  <p>Selected: {selectedValues.join(", ")}</p>

  <br />

  {#if isLoading}
    <p>Loading posts... {progress.toFixed(0)}% complete</p>
    <progress value={progress} max="100"></progress>
  {:else if error}
    <p class="error">Error: {error}</p>
  {:else}
    <ul>
      {#each redditPosts as post, index}
        <!-- {#each redditPosts.slice(0, limitPostsVisible) as post} -->
        <!-- {#if post.subreddit != "running"} -->
        <!-- {#if index <= limitPostsVisible} -->
        <li>
          <div
            class="hover:bg-accent border-2 m-1 bg-white grid grid-cols-[10%_70%_20%] grid-rows-2"
            style="position:relative"
          >
            <div
              class="flex items-center justify-center row-span-2 bg-slate-300 p-3 font-medium"
            >
              {post.score}
              {index}
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
        <!-- {/if} -->
        <!-- {/if} -->
      {/each}
    </ul>
  {/if}
</div>

<style>
  /* progress {
    width: 100%;
    height: 20px;
  } */
</style>
