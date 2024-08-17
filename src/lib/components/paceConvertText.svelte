<script lang="ts">
    interface convertPropsText {
        paceMinutes: number;
        paceSeconds: number;
        toggleMilesAndKM: boolean;
    }

    let { paceMinutes, paceSeconds, toggleMilesAndKM }: convertPropsText =
        $props();

    function convertPace(
        paceMinutes: number,
        paceSeconds: number,
        toggleMilesAndKM: boolean,
    ) {
        // Helper variables
        const conversionRate: number = 1.609344;
        let minutesDist: number = 0;

        const secondsToDecimal: number = paceSecondsToDecimal(paceSeconds);
        const timeInDecimal: number = paceMinutes + secondsToDecimal;

        if (toggleMilesAndKM) {
            minutesDist = timeInDecimal * conversionRate;
        } else {
            minutesDist = timeInDecimal / conversionRate;
        }

        const decimalToSeconds: number = (minutesDist % 1) * 0.6;

        const total = (Math.floor(minutesDist) + decimalToSeconds).toFixed(2);

        return total.replace(".", ":");
    }

    function paceSecondsToDecimal(seconds: number) {
        return seconds / 60;
    }
</script>

<div class="flex-auto w-32 text-right">
    {#if toggleMilesAndKM}
        <p>{paceMinutes}:{paceSeconds}/Mile</p>
    {:else}
        <p class="font-bold">
            {convertPace(paceMinutes, paceSeconds, toggleMilesAndKM)}/Mile
        </p>
    {/if}
</div>

<div class="text-center w-10 text-base">
    <p>=</p>
</div>

<div class="flex-auto w-32 text-left">
    {#if toggleMilesAndKM}
        <p class="font-bold">
            {convertPace(paceMinutes, paceSeconds, toggleMilesAndKM)}/KM
        </p>
    {:else}
        <p>
            {paceMinutes}:{paceSeconds}/KM
        </p>
    {/if}
</div>
