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

<div class="flex font-semibold text-xl justify-center">Finishing Times</div>
<div class="grid grid-cols-2 mb-2 ml-3 pt-3">
    <div class="text-lg font-medium w-48">Race Distance</div>
    <div class="text-lg font-medium w-48">Time</div>
    <div class="">Marathon:</div>
    <div class="">
        {calculateRaceTime(
            paceMinutes,
            paceSeconds,
            "marathon",
            isMinutesPerMile,
        )}
    </div>
    <div class="">Half-Marathon:</div>
    <div class="">
        {calculateRaceTime(
            paceMinutes,
            paceSeconds,
            "half-marathon",
            isMinutesPerMile,
        )}
    </div>
    <div class="">10km:</div>
    <div class="">
        {calculateRaceTime(paceMinutes, paceSeconds, "10k", isMinutesPerMile)}
    </div>
    <div class="">5km:</div>
    <div class="">
        {calculateRaceTime(paceMinutes, paceSeconds, "5k", isMinutesPerMile)}
    </div>
</div>
