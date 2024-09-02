<script lang="ts">
  import { onMount } from "svelte";
  import { MultiRedditFetcher, type RedditPost } from "./MultiRedditFetcher";

  let redditPosts: RedditPost[] = [];
  let isLoading = true;
  let error: string | null = null;
  let progress = 0;

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

<main>
  <h1>Top Posts from Multiple Subreddits</h1>

  {#if isLoading}
    <p>Loading posts... {progress.toFixed(0)}% complete</p>
    <progress value={progress} max="100"></progress>
  {:else if error}
    <p class="error">Error: {error}</p>
  {:else}
    <ul>
      {#each redditPosts as post, index}
        <div class="hover:bg-accent border-2 m-1 p-1 bg-white flex flex-row">
          <li>
            <!-- <p>Number: {index + 1}</p> -->
            <p class="font-medium text-lg">{post.title}</p>
            <p>
              Subreddit: r/{post.subreddit} | Score: {post.score} |
            </p>
            <a href={post.url} target="_blank" rel="noopener noreferrer"
              >View Post</a
            >
          </li>
        </div>
      {/each}
    </ul>
  {/if}
</main>

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
