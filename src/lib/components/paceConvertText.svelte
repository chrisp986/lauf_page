<script lang="ts">
    interface convertPropsText {
        paceMinutes: number;
        paceSeconds: number;
        isMinutesPerMile: boolean;
    }

    let { paceMinutes, paceSeconds, isMinutesPerMile }: convertPropsText =
        $props();

    function convertPace(
        paceMinutes: number,
        paceSeconds: number,
        isMinutesPerMile: boolean = true,
    ): string {
        // Convert pace to total seconds
        const totalSeconds = paceMinutes * 60 + paceSeconds;

        let convertedSeconds: number;

        if (isMinutesPerMile) {
            // Convert miles to km (1 mile = 1.60934km)
            convertedSeconds = totalSeconds / 1.60934;
        } else {
            // Convert km to miles
            convertedSeconds = totalSeconds * 1.60934;
        }

        // Convert back to minutes and seconds
        const convertedMinutes = Math.floor(convertedSeconds / 60);
        const remainingSeconds = Math.round(convertedSeconds % 60);

        return `${convertedMinutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
    }
</script>

<div class="w-32 text-right">
    {#if isMinutesPerMile}
        <p class="ml-auto rounded p-1">
            {paceMinutes.toString().padStart(2, "0")}:{paceSeconds
                .toString()
                .padStart(2, "0")}/Mile
        </p>
    {:else}
        <p class="ml-auto rounded p-1">
            {paceMinutes.toString().padStart(2, "0")}:{paceSeconds
                .toString()
                .padStart(2, "0")}/KM &nbsp;
        </p>
    {/if}
</div>

<div class="text-center w-12 text-base rounded p-1">
    <p>=</p>
</div>

<div class="w-32 text-left">
    {#if isMinutesPerMile}
        <p class="font-bold bg-gray-300 w-fit rounded p-1">
            {convertPace(paceMinutes, paceSeconds, isMinutesPerMile)}/KM &nbsp;
        </p>
    {:else}
        <p class="font-bold bg-gray-300 w-fit mr-auto rounded p-1">
            {convertPace(paceMinutes, paceSeconds, isMinutesPerMile)}/Mile
        </p>
    {/if}
</div>
