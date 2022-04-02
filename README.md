# MERN Full Stack Project

## How to configure:
Create a `config.env` file in the root directory, fill it with the following parameters:

```
PORT=5000

MONGO_URI='Your DB URI'

JWT_SECRET='A secret key'
JWT_EXPIRE='10min'
```

### For password Reset :
```
EMAIL_SERVICE=""
EMAIL_USERNAME=""
EMAIL_PASSWORD=""
EMAIL_FROM=""
```
## How to run:
```
- Install dependencies for both server and client
- Run concurrently using 'npm run dev'
- Server runs on: http://localhost:5000
- Client runs on: http://localhost:3000
```

## Movies API Endpoints:
```
- GET api/movies - shows all movies
- POST api/movies/create - create a movie
- PUT api/movies/movieName - update a movie
- DELETE api/movies/movieName - delete a movie
- GET api/movies/movieName - get a movie by name
```