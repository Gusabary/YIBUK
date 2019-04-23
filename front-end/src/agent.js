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
    create: (bookName, author, image, ISBN, storage, price, introduction) =>
        requests.post(API_ROOT + '/api/books/manage')
            .attach('image', image)
            .field('bookName', bookName)
            .field('author', author)
            .field('ISBN', ISBN)
            .field('storage', storage)
            .field('price', price)
            .field('introduction', introduction)
            .then(res => res.body),

    show: () => requests.get(API_ROOT + '/api/books/show')
        .then(res => res.body),

    update: (bookId, bookName, author, image, ISBN, storage, price, introduction) =>
        requests.put(API_ROOT + '/api/books/manage')
            .attach('image', image)
            .field('bookId', bookId)
            .field('bookName', bookName)
            .field('author', author)
            .field('ISBN', ISBN)
            .field('storage', storage)
            .field('price', price)
            .field('introduction', introduction)
            .then(res => res.body),

    delete: (bookIdOfDeleted) =>
        requests.del(API_ROOT + '/api/books/manage')
            .send({ books: bookIdOfDeleted })
            .then(res => res.body),
}

const Customers = {
    show: () => requests.get(API_ROOT + '/api/users/show')
        .then(res => res.body),

    toggle: (userId, targetValidity) =>
        requests.put(API_ROOT + '/api/users/manage')
            .send({ userId, targetValidity })
            .then(res => res.body)
}

const Cart = {
    add: (userId, bookId, quantity) =>
        requests.post(API_ROOT + '/api/carts/manage')
            .send({ userId, bookId, quantity })
            .then(res => res.body),

    show: (userId) =>
        requests.get(API_ROOT + '/api/carts/show')
            .query({ userId })
            .then(res => res.body),

    buy: (userId, bookIdOfBuy, quantity) =>
        requests.put(API_ROOT + '/api/carts/manage')
            .send({
                userId,
                books: bookIdOfBuy.map((bookId, index) => ({
                    bookId,
                    quantity: quantity[index],
                }))
            })
            .then(res => res.body),

    delete: (userId, bookIdOfDelete) =>
        requests.delete(API_ROOT + '/api/carts/manage')
            .send({
                userId,
                books: bookIdOfDelete
            })
            .then(res => res.body)
}

const Orders = {            
    buy: (userId, bookId, quantity) =>
        requests.post(API_ROOT + '/api/orders/add')
            .send({ userId, bookId, quantity })
            .then(res => res.body),

    showAll: () => requests.get(API_ROOT + '/api/orders/show')
        .then(res => res.body),

    showById: (userId) =>
        requests.get(API_ROOT + '/api/orders/show')
            .query({ userId })
            .then(res => res.body),
}

export default {
    User,
    Books,
    Customers,
    Cart,
    Orders,
}