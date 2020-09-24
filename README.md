# MovInder-Backend

(will pretty up this md soon)  

## Backend
Backend is done with SQlite 3, sequelize and express in typescript and hosted on heroku  

## API
### Domain
https://movinder9gag.herokuapp.com/  

### Path
(will delete `:userId` soon)  
/movie/`:userId`/`:movieId`/`:like`   add a new like/dislike (`:like` 1 or "like" for like, anything else for dislike) example:  
`https://movinder9gag.herokuapp.com/movie/1/50/like`  
(will delete `:userId1` soon)  
/movie/match/`:userId1`/`:userId2`   find common movie matches    example: `https://movinder9gag.herokuapp.com/movie/match/1/12`  

### Database setup:
Movie table: MovieId primary, name, description, image  
Category table: CategoryId primary, name  
Movie-Category match table: Id primary, CategoryId, MovieId   
User table: UserId primary, username, e-mail, passwordHash, salt  
User-Movie match table: Id primary, UserId, MovieId, like/dislike 

## Frontend
the frontend is located in a separate repo, to be able to publish the backend on heroku
[https://github.com/Cacciuc/MovInder](https://github.com/Cacciuc/MovInder)

