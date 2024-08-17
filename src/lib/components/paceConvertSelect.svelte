<script lang="ts">
    interface convertPropsSelect {
        paceMinutes: number;
        paceSeconds: number;
        toggleMilesAndKM: boolean;
    }

    let { paceMinutes, paceSeconds, toggleMilesAndKM }: convertPropsSelect =
        $props();

    // let paceMinutes: number = $state(4);
    // let paceSeconds: number = $state(36);
    // let toggleMilesAndKM = $state(true);

    function toggleFunction() {
        toggleMilesAndKM = !toggleMilesAndKM;
    }

    function* range(start: number, end: number): Generator<number> {
        for (let i = start; i <= end; i++) yield i;
    }
</script>

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

<div class="text-xl w-6 font-extrabold flex items-center justify-center">:</div>

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
        {toggleMilesAndKM ? "/Miles" : "/KM"}
    </button>
</div>
