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

<div class="flex-auto w-32 text-right">
    {#if isMinutesPerMile}
        <p>{paceMinutes}:{paceSeconds}/Mile</p>
    {:else}
        <p class="font-bold">
            {convertPace(paceMinutes, paceSeconds, isMinutesPerMile)}/Mile
        </p>
    {/if}
</div>

<div class="text-center w-10 text-base">
    <p>=</p>
</div>

<div class="flex-auto w-32 text-left">
    {#if isMinutesPerMile}
        <p class="font-bold">
            {convertPace(paceMinutes, paceSeconds, isMinutesPerMile)}/KM
        </p>
    {:else}
        <p>
            {paceMinutes}:{paceSeconds}/KM
        </p>
    {/if}
</div>
