<script lang="ts">
    let paceMinutes: number = 0;
    let paceSeconds: number = 0;

    function convertToKilometers(paceMinutes: number, paceSeconds: number) {
        const milesToKM: number = 1.609344;
        const secondsToDecimal: number = paceSeconds / 60;
        const timeInDecimal: number = paceMinutes + secondsToDecimal;

        console.log("timeDecimal", timeInDecimal / milesToKM);

        const minutesKM = timeInDecimal / milesToKM;
        console.log("remainder", minutesKM % 1);

        const decimalToSeconds: number = (minutesKM % 1) * 0.6;
        console.log("decSeconds", Math.floor(minutesKM) + decimalToSeconds);

        // const m = paceMinutes / milesToKM;
        // const fractionalMinutes = (m % 1) / milesToKM;
        // const ms = Math.floor(m) + fractionalMinutes;
        // const ps = paceSeconds / milesToKM / 100;
        // console.log("ps", ms);
        // const total = ms + ps;

        return (Math.floor(minutesKM) + decimalToSeconds).toFixed(2);
    }

    // function convertToKilometers(
    //     paceMinutes: number,
    //     paceSeconds: number,
    // ): string {
    //     const milesToKilometers = 1.609344;

    //     const minutesInKilometers = paceMinutes / milesToKilometers;
    //     const fractionalMinutes = minutesInKilometers % 1;
    //     const secondsInKilometers = fractionalMinutes / 1.609344;

    //     const totalMinutes =
    //         Math.floor(minutesInKilometers) + secondsInKilometers;
    //     const secondsConverted = paceSeconds / 100 / milesToKilometers;

    //     const totalTimeInKilometers = totalMinutes + secondsConverted;

    //     return totalTimeInKilometers.toFixed(2);
    // }

    // function leadingZero(number: number) {
    //     if (number < 10) {
    //         let m = "0" + number;
    //     }
    //     return m;
    // }

    // function convertToMiles(minutes) {
    //     return (minutes * 1.60934).toFixed(2);
    // }
</script>

<div class="container">
    <div class="item"></div>
    <div class="points"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="form-item">
        <select id="number-dd" name="number" bind:value={paceMinutes}>
            {#each { length: 20 } as _, i}
                <option>{i + 1}</option>
            {/each}
        </select>
    </div>
    <div class="points">:</div>
    <div class="form-item">
        <select id="number-dd" name="number" bind:value={paceSeconds}>
            {#each { length: 59 } as _, i}
                <option>{i + 1}</option>
            {/each}
        </select>
    </div>
    <div class="form-item">
        <button>M - KM</button>
    </div>
    <div class="item row-3">
        <p>Pace in Minutes/Mile: {paceMinutes}:{paceSeconds}</p>
        <p>
            Pace in Minutes/KM: {convertToKilometers(paceMinutes, paceSeconds)}
        </p>
    </div>
</div>
