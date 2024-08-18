// // Assuming the function is in a file named 'raceCalculator.ts'
// import { calculateFinishTime, RaceDistance } from './raceCalculator.svelte';

// describe('calculateFinishTime', () => {
//     // Test for 10k with min/km pace
//     test('calculates 10k time correctly with min/km pace', () => {
//         expect(calculateFinishTime(10, 36, '10k')).toBe('01:46:00');
//     });

//     // Test for marathon with min/km pace
//     test('calculates marathon time correctly with min/km pace', () => {
//         expect(calculateFinishTime(10, 36, 'marathon')).toBe('07:28:22');
//     });

//     // Test for 5k with min/mile pace
//     test('calculates 5k time correctly with min/mile pace', () => {
//         expect(calculateFinishTime(10, 36, '5k', true)).toBe('00:52:45');
//     });

//     // Test for half-marathon with min/mile pace
//     test('calculates half-marathon time correctly with min/mile pace', () => {
//         expect(calculateFinishTime(10, 36, 'half-marathon', true)).toBe('03:41:38');
//     });

//     // Test edge case: very fast pace
//     test('handles very fast pace correctly', () => {
//         expect(calculateFinishTime(3, 0, '5k')).toBe('00:15:00');
//     });

//     // Test edge case: very slow pace
//     test('handles very slow pace correctly', () => {
//         expect(calculateFinishTime(30, 0, '5k')).toBe('02:30:00');
//     });

//     // Test edge case: pace with high seconds value
//     test('handles pace with high seconds value correctly', () => {
//         expect(calculateFinishTime(9, 59, '10k')).toBe('01:39:50');
//     });

//     // Test invalid input
//     test('throws error for invalid race distance', () => {
//         expect(() => {
//             // @ts-ignore: Next line will have a TypeScript error, but we want to test runtime behavior
//             calculateFinishTime(10, 0, 'invalid_distance');
//         }).toThrow();
//     });
// });