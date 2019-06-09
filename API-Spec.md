# API Spec.

## Authentication header:

```
Authorization: Bearer jwt.token.here
```

## Sign in

`POST /api/users/signin`

example request body (no authentication required):

```json
{
    "username": "tbc",
    "password": "123456"
}
```

example response body:

+ when succeed:

  ``` json
  {
      "userId": 65536,
      "username": "ICS-loser",
      "identity": 0,
      "validity": 1
  }
  ```

+ when forbidden:

  ``` json
  {
      "error": "You are forbidden!"
  }
  ```

+ wrong username or password:

  ``` json
  {
      "error": "Wrong username or password!"
  }
  ```

## Sign up

`POST /api/users/signup`

example request body (no authentication required):

``` json
{
    "username": "tbc",
    "password": "123456",
    "email": "tbc@126.com"
}
```

example response body:

+ when succeed:

  ``` json
  {
      "message": "Sign up successfully!"
  }
  ```

+ when fail:

  ``` json
  {
      "error": "Username has existed!"
  }
  ```

## Create a book

`POST /api/books/manage`

example request body (note that it is a **FormData** and authentication required):

``` formdata
{
    "bookName": "The Wandering Earth",
    "author": "Liu Cixin",
    "image": ${file},
	"ISBN": "1234-5678-9-0",
	"storage": 20,
    "price": 15.5,
    "introduction": "It's really a fantastic book!"
}
```

example response body:

``` json
{
    "message": "Add book successfully!"
}
```

## Show books

`GET /api/books/show`

example response body (no authentication required):

``` json
{
    "books": [
        {
            "bookId": 1,
        	"bookName": "The Wandering Earth",
    		"author": "Liu Cixin",
    		"coverPath": "The-Wandering-Earth.jpg",
			"ISBN": "1234-5678-9-0",
			"storage": 20,
    		"price": 15.5,
    		"introduction": "It's really a fantastic book!",
            "comment": {
                "bookId": 1,
                "userId": 1,
                "time": "2000-12-31T16:00:00.000+0000",
                "content": "I like this!",
                "followup": null //or can be another comment
            }
        },
        {
            "bookId": 2,
        	"bookName": "The Wandering Earth II",
    		"author": "Liu Cixin",
    		"coverPath": "The-Wandering-Earth.jpg",
			"ISBN": "1234-5678-9-1",
			"storage": 20,
    		"price": 17.5,
    		"introduction": "It's also really a fantastic book!",
            "comment": null
        }
    ]
}
```

## Update a book

`PUT /api/books/manage`

example request body (note that it is a **FormData** and authentication required):

```formdata
{
	"bookId": 1,
    "bookName": "The Wandering Earth",
    "author": "Liu Cixin",
    "image": ${file},
	"ISBN": "1234-5678-9-0",
	"storage": 30,
    "price": 15.5,
    "introduction": "It's totally a fantastic book!!"
}
```

example response body:

```json
{
    "message": "Update book successfully!",
    "newBook": {
        "bookId": 1,
        "bookName": "The Wandering Earth",
    	"author": "Liu Cixin",
    	"coverPath": "The-Wandering-Earth.jpg",
		"ISBN": "1234-5678-9-0",
		"storage": 30,
    	"price": 15.5,
    	"introduction": "It's totally a fantastic book!!"
    }
}
```

## Delete books

`DELETE /api/books/manage`

example request body (authentication required):

``` json
{
    books: [1, 2, 3, 5]
}
```

example response body:

```json
{
    "message": "Delete book successfully!"
}
```

## Show customers

`GET /api/users/show`

example response body (authentication required):

```json
{
    "users": [
        {
            "userId": 1,
            "username": "tbc",
            "email": "tbc@126.com",
            "validity": 1
        },
        {
            "userId": 2,
            "username": "tbc2",
            "email": "tbc2@126.com",
            "validity": 1
        }
    ]
}
```

## Ban/Unban customers

`PUT /api/users/manage`

example request body (authentication required):

```json
{
    "userId": 1,
    "targetValidity": 0
}
```

example response body:

```json
{
    "message": "Update validity successfully!"
}
```

## Add books to cart

`POST /api/carts/manage`

example request body (authentication required):

```json
{
    "userId": 1,
    "bookId": 1,
    "quantity": 1024
}
```

example response body:

```json
{
    "message": "Add to cart successfully!"
}
```

## Show books in cart

`GET /api/carts/show?userId=1`

example response body (authentication required):

```json
{
    "cart": [
        {
            "bookId": 1,
            "quantity": 12
        },
        {
            "bookId": 3,
            "quantity": 147
        }
    ]
}
```

## Purchase from cart

`PUT /api/carts/manage/buy`

example request body (authentication required):

```json
{
    "userId": 1,
    "books": [
        {
            "bookId": 1,
            "quantity": 2
        },
        {
            "bookId": 3,
            "quantity": 47
        }
    ]
}
```

example response body:

```json
{
    "message": "Purchase successfully!"
}
```

## Empty cart

`PUT /api/carts/manage/empty`

example request body (authentication required):

``` JSON
{
    "userId": 1
}
```

example response body:

```JSON
{
    "message": "Empty cart successfully!"
}
```

## Delete books in cart

`DELETE /api/carts/manage`

example request body (authentication required):

```json
{
    "userId": 1,
    "books": [1, 3]
}
```

example response body:

```json
{
    "message": "Delete successfully!"
}
```

## Purchase from booklist

`POST /api/orders/add`

example request body (authentication required):

```json
{
    "userId": 1,
    "bookId": 3,
    "quantity": 7
}
```

example response body:

```json
{
    "message": "Purchase successfully!"
}
```

## Show orders of someone

`GET /api/orders/show?userId=${id}`

example response body (authentication required):

```json
{
    "orders": [
        {
            "orderId": "155790397421400033",
            "userId": 33,
            "time": "2019-05-15 15:06:14",
            "orderItem": {
                "1": 2
            }
        },
        {
            "orderId": "155790406639800033",
            "userId": 33,
            "time": "2019-05-15 15:07:46",
            "orderItem": {
                "1": 2,
                "2": 1
            }
        }
    ]
}
```

## Show all orders

`GET /api/orders/show/all`

example response body (authentication required):

```json
{
    "orders": [
        {
            "orderId": "155790397421400033",
            "userId": 33,
            "time": "2019-05-15 15:06:14",
            "orderItem": {
                "1": 2
            }
        },
        {
            "orderId": "155790406639800002",
            "userId": 2,
            "time": "2019-05-15 15:07:42",
            "orderItem": {
                "1": 2,
                "2": 3
            }
        }
    ]
}
```

##### Last-modified date: 2019.6.9, 2 p.m.

