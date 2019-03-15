const requests = require('superagent');

const API_ROOT = 'http://localhost:8080';

const responseBody = res => {
    return res.body
}
const handleError = err => {
    switch (err.status) {
        case 401:
            alert('Incorrect email or password!')
            return;
        case 500:
            alert('Email has been signed up!')
            return;
        default:
            alert('Something wrong occured!')
    }
}

/*const requests = {
    get: url =>
        superagent.get(`${API_ROOT}${url}`).then(responseBody),
    del: url =>
        superagent.del(`${API_ROOT}${url}`).then(responseBody),
    post: (url, body) =>
        superagent.post(`${API_ROOT}${url}`).send(body).then(responseBody).catch(handleError),
    put: (url, body) =>
        superagent.put(`${API_ROOT}${url}`).send(body).then(responseBody)
};*/

const User = {
    signUp: (username, password, email) =>
        requests.post(API_ROOT + '/api/user/signup')
            .send({ username, password, email })
            .then(res => res.body),
    signIn: (username, password) =>
        requests.post(API_ROOT + '/api/user/signin')
            .send({ username, password })
            .then(res => res.body)
            .catch(err => err.status),
}

const Books = {
    create: (bookName, author, image, ISBN, storage, price, introduction) =>
        requests.post(API_ROOT + '/api/manage/book')
            .attach('image', image)
            .field('bookName', bookName)
            .field('author', author)
            .field('ISBN', ISBN)
            .field('storage', storage)
            .field('price', price)
            .field('introduction', introduction)
            .then(responseBody),

    show: () => requests.get(API_ROOT + '/api/manage/book')
        .then(res => res.body),

    update: (postId, title, content, image, token) =>
        requests.put(API_ROOT + '/api/posts/' + postId)
            .set('Authorization', 'Bearer ' + token)
            .attach('image', image, title)
            .field('id', postId)
            .field('title', title)
            .field('content', content)
            .then(responseBody),

    delete: (bookIdOfDeleted) =>
        requests.del(API_ROOT + '/api/manage/book')
            .send({ books: bookIdOfDeleted })
            .then(responseBody),
}

const Customers = {
    show: () => requests.get(API_ROOT + '/api/manage/user')
        .then(res => res.body),
    toggle: (userId, targetValidity) =>
        requests.put(API_ROOT + '/api/manage/user')
            .send({ userId, targetValidity })
            .then(res => res.body)
}

const Cart = {
    add: (userId, bookId, quantity) =>
        requests.post(API_ROOT + '/api/cart')
            .send({ userId, bookId, quantity })
            .then(res => res.body)
}

export default {
    User,
    Books,
    Customers,
    Cart,
}

//Source: BPM-lab, lxyl.