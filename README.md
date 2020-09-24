# MovInder-Backend

## Backend
Backend is still open for ideas. (Maybe Express)

### Database setup:
Movie table: MovieId primary, name, description, image  
Category table: CategoryId primary, name  
Movie-Category match table: Id primary, CategoryId, MovieId   
User table: UserId primary, username, e-mail, passwordHash, salt  
User-Movie match table: Id primary, UserId, MovieId, like/dislike 
