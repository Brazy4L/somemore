![somemore-3d](https://user-images.githubusercontent.com/104111832/218467925-5373fb45-b0fd-4415-8083-3cb8764f7edd.jpg)

<p align="center">
  <b>SOMEMORE</b> - discover Movies & TV Shows
</p>

---

This project uses wonderful [TMDb API](https://www.themoviedb.org/)

# [Live Preview](https://somemore.vercel.app)

## Features

+ Dark and Light themes
+ Popular Movies and TV Shows
+ Standalone pages for Movies, TV Shows and People
+ Search for Movies, TV Shows and People
+ Watchlist

## Local Development

1. Clone the repository
1. To install dependencies, run:
   ```sh
   npm install
   ```
1. Create `.env.local` file in the root directory:
   ```sh
   API_KEY=<<YOUR_KEY>>
   ```
1. To start it locally, run:
   ```sh
   npm run dev
   ```

## Extra

Standalone pages for Movies, TV Shows and People do not have proper error handling for `status: 404` response from TMDb API

The types are mess and will be refactored later.