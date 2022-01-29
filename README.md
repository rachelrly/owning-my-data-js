# Owning My Data TS

This repo contains TypeScript code to parse and analyze personal data from social media. 

[View an earlier version of this project in Python.](https://github.com/rachelrly/owning-my-data-python)

## Spotify
### /src/spotify

This works with data from Spotify, primarily my listening history. This is exported as an array sorted by date in `/spotify_data/index.ts`.

#### /listens.ts

This folder contains the functions that convert the array sorted by date into an array sorted by listen count. This is done by converting the data into a Map and keeping track of the occurances of each song then converting it back into a sorted array. 