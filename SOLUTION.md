Aman's Solution Documentation
===========================

## Running the app
- Running `docker-compose up -d` from repo root will bring up all the required containers and the UI can be accessed on port 3000
- (NOTE: Even though the containers start almost instantly, the UI build may take a couple of minutes to come online)
- Check the docker container logs for progress info


## Frameworks used
- React with JS for the front end
- Koa with TS for the back end

## Design Choices (BACKEND)
- The backend has been separated into 2 main parts, the database logic and the API logic
- The database folder contains the database logic and contains all the helper functions that interact with the database
- The api folder contains all the routers and the handlers, ie, the functions that are executed when a certain endpoint is executed
- API's should be segregated based on functionality, and since in this case all the functions operate on leads directly or indirectly, they have been grouped into one router
- The `apiRouter.ts` file is a collection of all the routers available, in this case, its only one
- `middleware.ts` contains all the middlewares that are required by the application, like `koa-body` which allows request body to be processed (as an example)
- Joi is used to validate the incoming requests to avoid manual object checks


## Design Choices (FRONTEND)
- The front end is rather barebones, it just is made up of one component which handles the majority of the fucntionaities
- Each entry is assigned its own card so that there is a clear separation of the data entries fetched by the API request
- There is a button to reset all the leads to new as there is no view to see declined offers

## Improvements 
There are a few improvements that could be made (given no time constraint and this being a coding challenge)
- The database password is supplied in plaintext when the connection is established. This should NEVER be done for obvious reasons
- The HTTP status codes are defaulted to 404. Depending on the error, these should be changed
- HTTP should redirect to HTTPS and there should be proper SSL certificates attached to the domain
- The database connection errors are not accounted for, ie, if the connection fails , the API requests will fail
- Rare edge cases will not generate proper error messages
- Use of an ORM to enforce types (eg: prisma), although this has its pros and cons
    
