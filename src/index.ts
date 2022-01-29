import { printTop10, sortHistoryMap, createHistoryMap } from "./spotify";

// Logs song rank, title, and artist of songs with top 10 listens
printTop10(sortHistoryMap(createHistoryMap()))