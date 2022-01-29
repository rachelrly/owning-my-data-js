import { printTop10, printPlaysTop10, sortListensHistoryMap, createListensHistoryMap, sortPlaysHistoryMap, createPlaysHistoryMap } from "./spotify";

// Logs song rank, title, and artist of songs with top 10 listens
printPlaysTop10(sortPlaysHistoryMap(createPlaysHistoryMap()))
// printTop10(sortListensHistoryMap(createListensHistoryMap()))