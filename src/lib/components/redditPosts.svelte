<script lang="ts">
  import { onMount } from "svelte";
  import { MultiRedditFetcher, type RedditPost } from "./MultiRedditFetcher";

  let redditPosts: RedditPost[] = [];
  let isLoading = true;
  let error: string | null = null;
  let progress = 0;
  let limitPostsVisible: number = 10;

  const subreddits = ["running", "AdvancedRunning"];
  const postLimit = 10;
  const cacheDuration = 10 * 60 * 1000; // 10 minutes
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
</script>

<div>
  <h1>Top Posts from Multiple Subreddits</h1>

  {#if isLoading}
    <p>Loading posts... {progress.toFixed(0)}% complete</p>
    <progress value={progress} max="100"></progress>
  {:else if error}
    <p class="error">Error: {error}</p>
  {:else}
    <ul>
      {#each redditPosts.slice(0, limitPostsVisible) as post}
        <!-- {#if post.subreddit != "AdvancedRunning"} -->
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
        <!-- {/if} -->
      {/each}
    </ul>
  {/if}
</div>

<!-- // <div class="p-4">
// //   {#if error}
// //     <p>Error: {error}</p>
// //   {:else if !redditData}
// //     <p>Loading...</p>
// //   {:else}
// //     <p class="font-bold text-lg">Top Posts on Reddit</p>
// //     <div class="border-3 rounded-md">
// //       <ul>
// //         {#each redditData.data.children as post}
// //           <div
// //             class="hover:bg-accent border-2 rounded-md shadow-sm m-1 p-1 bg-gray-300"
// //             style="position:relative"
// //           >
// //             <li>
// //               <a
// //                 href={"https://www.reddit.com" + post.data.permalink}
// //                 target="_blank"
// //                 class="font-medium"
// //                 ><span class="link-spanner"></span>
// //                 {post.data.title}
// //               </a>
// //               <p>
// //                 Score: {post.data.score} | Comments: {post.data.num_comments}
// //               </p>
// //               <p>Subreddit: r/{post.data.subreddit}</p>
// //               <p>Pic: r/{post.data.thumbnail}</p>
// //             </li>
// //           </div>
// //         {/each}
// //       </ul>
// //     </div>
// //   {/if}
// // </div> -->
<style>
  /* progress {
    width: 100%;
    height: 20px;
  } */
</style>
