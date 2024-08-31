<script lang="ts">
  import { onMount } from "svelte";
  import { MultiRedditFetcher, type RedditPost } from "./MultiRedditFetcher";

  let redditPosts: RedditPost[] = [];
  let isLoading = true;
  let error: string | null = null;

  const subreddits = ["typescript", "javascript", "webdev"];
  const postLimit = 10;
  const cacheDuration = 10 * 60 * 1000; // 10 minutes

  const multiFetcher = new MultiRedditFetcher(
    subreddits,
    postLimit,
    cacheDuration,
  );

  onMount(async () => {
    try {
      redditPosts = await multiFetcher.fetchAllData();
      redditPosts.sort((a, b) => b.score - a.score); // Sort by score descending
    } catch (err) {
      error = (err as Error).message;
    } finally {
      isLoading = false;
    }
  });
</script>

<main>
  <h1>Top Posts from Multiple Subreddits</h1>

  {#if isLoading}
    <p>Loading posts...</p>
  {:else if error}
    <p class="error">Error: {error}</p>
  {:else}
    <ul>
      {#each redditPosts as post}
        <li>
          <h3>{post.title}</h3>
          <p>
            Subreddit: r/{post.subreddit} | Score: {post.score} | Author: u/{post.author}
          </p>
          <a href={post.url} target="_blank" rel="noopener noreferrer"
            >View Post</a
          >
        </li>
      {/each}
    </ul>
  {/if}
</main>

<!-- //   // Component state to hold the response data
  //   let redditData: RedditTopResponse | null = $state(null);
  //   let error: string | null = $state(null);

  //   const subreddit: string = "running";
  //   const limit: number = 10;
  //   const time: string = "week";
  //   let url = `https://www.reddit.com/r/${subreddit}/top.json?limit=${limit}&t=${time}`;

  //   // Add caching
  //   const CACHE_KEY = "redditDataCache";
  //   const CACHE_DURATION = 60 * 60 * 1000; // 60 minutes in milliseconds

  //   onMount(async () => {
  //     try {
  //       // Check if there's cached data
  //       const cachedData = localStorage.getItem(CACHE_KEY);
  //       if (cachedData) {
  //         const { data, timestamp } = JSON.parse(cachedData);
  //         if (Date.now() - timestamp < CACHE_DURATION) {
  //           // Use cached data if it's still valid
  //           console.log("Using cached data");
  //           redditData = data as RedditTopResponse;
  //           return;
  //         }
  //       }

  //       // If no valid cached data, fetch from API
  //       console.log("Fetching new data");
  //       const response = await fetch(url, {
  //         method: "GET",
  //         headers: {
  //           Accept: "application/json",
  //         },
  //       });

  //       if (!response.ok)
  //         throw new Error(`Error fetching data: ${response.statusText}`);

  //       const data = await response.json();
  //       redditData = data as RedditTopResponse;

  //       // Cache the new data
  //       localStorage.setItem(
  //         CACHE_KEY,
  //         JSON.stringify({
  //           data: redditData,
  //           timestamp: Date.now(),
  //         }),
  //       );
  //     } catch (err) {
  //       error = (err as Error).message;
  //     }
  //   });
// </script> -->

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
  main {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    margin-bottom: 20px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  .error {
    color: red;
  }
</style>
