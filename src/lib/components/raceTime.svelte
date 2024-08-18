<script lang="ts">
    interface convertPropsRaceTime {
        paceMinutes: number;
        paceSeconds: number;
        isMinutesPerMile: boolean;
    }

    let { paceMinutes, paceSeconds, isMinutesPerMile }: convertPropsRaceTime =
        $props();

    type RaceDistance = "marathon" | "half-marathon" | "10k" | "5k";

    function calculateRaceTime(
        paceMinutes: number,
        paceSeconds: number,
        raceDistance: RaceDistance,
        isMinutesPerMile: boolean = false,
    ): string {
        // Convert pace to total seconds
        const paceInSeconds = paceMinutes * 60 + paceSeconds;

        // Define distances in kilometers
        const distances: { [key in RaceDistance]: number } = {
            marathon: 42.195,
            "half-marathon": 21.0975,
            "10k": 10,
            "5k": 5,
        };

        // Get the distance in km for the selected race
        const distanceKm = distances[raceDistance];

        // Calculate total seconds for the given distance
        let totalSeconds: number;
        if (isMinutesPerMile) {
            // If pace is in minutes per mile, convert to km pace
            const kmPace = paceInSeconds / 1.60934;
            totalSeconds = kmPace * distanceKm;
        } else {
            // Pace is already in minutes per km
            totalSeconds = paceInSeconds * distanceKm;
        }

        // Convert total seconds to hours, minutes, and seconds
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = Math.floor(totalSeconds % 60);

        // Format the result as a string
        return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    }
</script>

<h2 class="font-semibold">Finishing Times</h2>

<div class="grid grid-cols-3 p-1">
    <p class="">Marathon:</p>
    <p class="col-span-2">
        {calculateRaceTime(
            paceMinutes,
            paceSeconds,
            "marathon",
            isMinutesPerMile,
        )}
    </p>
    <p class="">Half-Marathon:</p>
    <p class="col-span-2">
        {calculateRaceTime(
            paceMinutes,
            paceSeconds,
            "half-marathon",
            isMinutesPerMile,
        )}
    </p>
    <p class="">10km:</p>
    <p class="col-span-2">
        {calculateRaceTime(paceMinutes, paceSeconds, "10k", isMinutesPerMile)}
    </p>
    <p class="">5km:</p>
    <p class="col-span-2">
        {calculateRaceTime(paceMinutes, paceSeconds, "5k", isMinutesPerMile)}
    </p>
</div>
