<script lang="ts">
  import { onMount } from "svelte";
  import { MultiRedditFetcher, type RedditPost } from "./MultiRedditFetcher";

  let redditPosts: RedditPost[] = $state([]);
  let isLoading = $state(true);
  let error: string | null = $state(null);
  let progress = $state(0);
  let limitPostsVisible: number = 20;
  let selectedValues: string[] = $state([
    "running",
    "AdvancedRunning",
    "Marathon_Training",
    "trailrunning",
    "RunningShoeGeeks",
  ]);

  const subreddits = [
    "running",
    "AdvancedRunning",
    "Marathon_Training",
    "trailrunning",
    "RunningShoeGeeks",
  ];
  const postLimit = 20;
  const cacheDuration = 15 * 60 * 1000; // 15 minutes
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

  function filteredPosts(
    redditPosts: RedditPost[],
    selectedValues: string[],
  ): RedditPost[] {
    return redditPosts
      .filter((redditPost) => selectedValues.includes(redditPost.subreddit))
      .sort((a, b) => b.score - a.score)
      .slice(0, limitPostsVisible);
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

<div class="flex w-full lg:w-1/2">
  <div>
    <div
      class="flex flex-col sm:flex-row items-left sm:items-center bg-white mx-1 border-2"
    >
      <p
        class="font-redfont w-full text-4xl font-bold bg-reddit-orange sm:w-20 text-white h-16 flex items-center justify-center"
      >
        r/...
      </p>
      <!-- {#each subreddits as sub}
  <div class="flex flex-wrap flex-col px-4 py-2">
    <label class="text-base sm:text-lg">
      <input type="checkbox" class="w-4 h-4" checked 
      onclick={(e: Event) => handleCheckboxChange(sub, (e.target as HTMLInputElement).checked)}>
      {sub}
    </label>
  </div>
  {/each} -->
    </div>

    {#if isLoading}
      <p class="flex items-center justify-center">
        Loading posts... {progress.toFixed(0)}% complete
      </p>
    {:else if error}
      <p class="error">Error: {error}</p>
    {:else}
      <ul>
        {#each filteredPosts(redditPosts, selectedValues) as post}
          <li>
            <div
              class="hover:bg-accent border-2 m-1 bg-white flex"
              style="position:relative"
            >
              <div
                class="flex items-center justify-center bg-slate-300 font-medium min-w-[15%] sm:min-w-20"
              >
                {post.score}
              </div>

              <div class="p-3 w-[85%] sm:w-[95%]">
                <div class="">
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="font-medium text-medium md:text-lg"
                  >
                    <span class="link-spanner"></span>
                    <p class="chars-limit-text">
                      {post.title}
                    </p></a
                  >
                  <div
                    class="text-xs md:text-sm text-gray-500 chars-limit-text border-b-2 pb-1"
                  >
                    {post.selftext}
                  </div>
                  <div class="text-xs md:text-sm items-end justify-end pt-2">
                    r/{post.subreddit}
                  </div>
                </div>
              </div>
            </div>
          </li>
        {/each}
      </ul>
    {/if}
  </div>
</div>

<style>
</style>
