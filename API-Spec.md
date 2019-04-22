# API Spec.

## Sign in

`POST /api/users/signin`

example request body:

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
      "username": ICS-loser,
      "identity": 1,
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

example request body:

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

example request body (note that it is a **FormData**):

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
    "message": "Add book successfully!",
    "newBook": {
        "bookId": 1,
        "bookName": "The Wandering Earth",
    	"author": "Liu Cixin",
    	"coverPath": "The-Wandering-Earth.jpg",
		"ISBN": "1234-5678-9-0",
		"storage": 20,
    	"price": 15.5,
    	"introduction": "It's really a fantastic book!"
    }
}
```

## Show books

`GET /api/books/show`

example response body:

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
    		"introduction": "It's really a fantastic book!"
        },
        {
            "bookId": 2,
        	"bookName": "The Wandering Earth II",
    		"author": "Liu Cixin",
    		"coverPath": "The-Wandering-Earth.jpg",
			"ISBN": "1234-5678-9-1",
			"storage": 20,
    		"price": 17.5,
    		"introduction": "It's also really a fantastic book!"
        }
    ]
}
```

## Update a book

`PUT /api/books/manage`

example request body (note that it is a **FormData**):

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

`DELETE /api/manage/book`

example request body:

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

`GET /api/manage/user`

example response body:

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

`PUT /api/manage/user`

example request body:

```json
{
    "userId": "tbc",
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

`POST /api/cart`

example request body:

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

`GET /api/cart?userId=1`

example response body:

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

`PUT /api/cart`

example request body:

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

## Delete books in cart:

`DELETE /api/cart`

example request body:

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

`POST /api/order`

example request body:

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

## Show orders

`GET /api/order`

example response body:

```json
{
    "orders": [
        {
        	"orderId": "1533251122300001",
        	"userId": 1,
        	"bookId": 12,
        	"quantity": 20,
        	"time": "2019-3-28 21:53:00"
        },
        {
        	"orderId": "1533254622300001",
        	"userId": 1,
        	"bookId": 1,
        	"quantity": 1,
        	"time": "2019-3-28 21:55:00"
        },
    ]
}
```

Filter by userId:

```
?userId=1
```

##### Last-modified date: 2019.3.30, 9 p.m.

