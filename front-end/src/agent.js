const requests = require('superagent');

const API_ROOT = 'http://localhost:8080';

const User = {
    signUp: (username, password, email) =>
        requests.post(API_ROOT + '/api/users/signup')
            .send({ username, password, email })
            .then(res => res.body)
            .catch(err => err.response.body),
    signIn: (username, password) =>
        requests.post(API_ROOT + '/api/users/signin')
            .send({ username, password })
            .then(res => res.body)
            .catch(err => err.response.body),
}

const Books = {
    create: (bookName, author, image, isbn, storage, price, introduction, token) =>
        requests.post(API_ROOT + '/api/books/manage')
            .set('Authorization', 'Bearer ' + token)
            .attach('image', image)
            .field('bookName', bookName)
            .field('author', author)
            .field('isbn', isbn)
            .field('storage', storage)
            .field('price', price)
            .field('introduction', introduction)
            .then(res => res.body),

    show: (token) => requests.get(API_ROOT + '/api/books/show')
        .then(res => res.body),

    update: (bookId, bookName, author, image, isbn, storage, price, introduction, token) =>
        requests.put(API_ROOT + '/api/books/manage')
            .set('Authorization', 'Bearer ' + token)
            .attach('image', image)
            .field('bookId', bookId)
            .field('bookName', bookName)
            .field('author', author)
            .field('isbn', isbn)
            .field('storage', storage)
            .field('price', price)
            .field('introduction', introduction)
            .then(res => res.body),

    delete: (bookIdOfDeleted, token) =>
        requests.del(API_ROOT + '/api/books/manage')
            .set('Authorization', 'Bearer ' + token)
            .send({ books: bookIdOfDeleted })
            .then(res => res.body),
}

const Customers = {
    show: (token) => requests.get(API_ROOT + '/api/users/show')
        .set('Authorization', 'Bearer ' + token)
        .then(res => res.body),

    toggle: (userId, targetValidity, token) =>
        requests.put(API_ROOT + '/api/users/manage')
            .set('Authorization', 'Bearer ' + token)
            .send({ userId, targetValidity })
            .then(res => res.body)
}

const Cart = {
    add: (userId, bookId, quantity, token) =>
        requests.post(API_ROOT + '/api/carts/manage')
            .set('Authorization', 'Bearer ' + token)
            .send({ userId, bookId, quantity })
            .then(res => res.body),

    show: (userId, token) =>
        requests.get(API_ROOT + '/api/carts/show')
            .query({ userId })
            .set('Authorization', 'Bearer ' + token)
            .then(res => res.body),

    buy: (userId, bookIdOfBuy, quantity, token) =>
        requests.put(API_ROOT + '/api/carts/manage/buy')
            .set('Authorization', 'Bearer ' + token)
            .send({
                userId,
                books: bookIdOfBuy.map((bookId, index) => ({
                    bookId,
                    quantity: quantity[index],
                }))
            })
            .then(res => res.body)
            .catch(err => err.response.body),

    empty: (userId, token) =>
        requests.put(API_ROOT + '/api/carts/manage/empty')
            .set('Authorization', 'Bearer ' + token)
            .send({ userId })
            .then(res => res.body)
            .catch(err => err.response.body),

    delete: (userId, bookIdOfDelete, token) =>
        requests.delete(API_ROOT + '/api/carts/manage')
            .set('Authorization', 'Bearer ' + token)
            .send({
                userId,
                books: bookIdOfDelete
            })
            .then(res => res.body)
}

const Orders = {
    buy: (userId, bookId, quantity, token) =>
        requests.post(API_ROOT + '/api/orders/add')
            .set('Authorization', 'Bearer ' + token)
            .send({ userId, bookId, quantity })
            .then(res => res.body)
            .catch(err => err.response.body),

    showAll: (token) => requests.get(API_ROOT + '/api/orders/show/all')
        .set('Authorization', 'Bearer ' + token)
        .then(res => res.body),

    showById: (userId, token) =>
        requests.get(API_ROOT + '/api/orders/show')
            .query({ userId })
            .set('Authorization', 'Bearer ' + token)
            .then(res => res.body),
}

export default {
    User,
    Books,
    Customers,
    Cart,
    Orders,
}