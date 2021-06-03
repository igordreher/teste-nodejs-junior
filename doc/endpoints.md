# Endpoints 

All endpoints **only** receives and responds with JSON.

## List users

List all users

```HTTP
GET /api/v1/users
```

### Response: 

```HTTP
Status: 200 OK
```

```JSON
[
{
    "id": "60b96186368ff22d8e78b7ff",
    "email": "user@email.com",
    "password": "userPassword"
}
...]
```


## Get user 

```HTTP
GET /api/v1/users/{user_id}
```

### Parameters:

| Name    | Type     | In   | Description         |
| ------- | -------- | ---- | ------------------- |
| user_id | ObjectId | path | A 12-byte BSON type |

### Response: 

```HTTP
Status: 200 OK
```

```JSON
{
    "id": "60b96186368ff22d8e78b7ff",
    "email": "user@email.com",
    "password": "userPassword"
}
```


## Create user 

```HTTP
POST /api/v1/users
```

### Parameters:

| Name     | Type   | In   | Description                  |
| -------- | ------ | ---- | ---------------------------- |
| email    | string | body | **Required**. Must be unique |
| password | string | body | **Required**                 |

### Response: 

```HTTP
Status: 201 Created
```

```JSON
{
    "id": "60b96186368ff22d8e78b7ff",
    "email": "user@email.com",
    "password": "userPassword"
}
```


## Replace user 

Creates a new user or replaces existing one's data

```HTTP
PUT /api/v1/users/{user_id}
```

### Parameters:

| Name     | Type     | In   | Description                  |
| -------- | -------- | ---- | ---------------------------- |
| user_id  | ObjectId | path | A 12-byte BSON type          |
| email    | string   | body | **Required**. Must be unique |
| password | string   | body | **Required**                 |
   
### Response: 
```HTTP
Status: 204 No Content
```

### Created: 

```HTTP
Status: 201 Created
```


## Delete user 

```HTTP
DELETE /api/v1/users/{user_id}
```

### Parameters:
| Name    | Type     | In   | Description         |
| ------- | -------- | ---- | ------------------- |
| user_id | ObjectId | path | A 12-byte BSON type |

### Response: 

```HTTP
Status: 204 No Content
```


## Delete users

Deletes **all** users

```HTTP
DELETE /api/v1/users
```

### Response: 

```HTTP
Status: 204 No Content
```