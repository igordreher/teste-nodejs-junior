# Junior NodeJS Test

## Endpoints  

* [`GET /api/v1/users`](/doc/endpoints.md#list-users)
* [`GET /api/v1/users/{user_id}`](/doc/endpoints.md#get-user)
* [`POST /api/v1/users`](/doc/endpoints.md#create-user)
* [`PUT /api/v1/users/{user_id}`](/doc/endpoints.md#replace-user)
* [`DELETE /api/v1/users`](/doc/endpoints.md#delete-users)
* [`DELETE /api/v1/users/{user_id}`](/doc/endpoints.md#delete-user)

## Installing

You will need [Docker](https://www.docker.com/) and [Docker
Compose](https://docs.docker.com/compose/) to run this project.  
    
Run the project in docker containers:
```bash
docker-compose up
```  

Now you can access the endpoints at 
[localhost](http://localhost:3000/) 
   
To run test:
```bash
yarn test
# or 
npm run test
```