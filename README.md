# movie-app

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```
# Copy .env.example to .env
```bash
  $ cp .env.example .env
```
# Create an account on The Movie Database

Visit [TMDb](https://www.themoviedb.org/signup) website and create a new account. After signing up, you will obtain an API key.

# Set your API key

Open the .env file in your project root and replace YOUR_API_KEY with the API key obtained from TMDb.
```.env
TMDB_API_KEY='your api key'
```
