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
            .then(res => res.body),
}

const Books = {
    create: (bookName,author, image) =>
        requests.post(API_ROOT + '/api/manage/book')
            .attach('image', image)
            .field('bookName', bookName)
            .field('author', author)
            .field('ISBN', 1)
            .field('storage', 1)
            .field('price', 1)
            .then(responseBody),

    show: () => requests.get(API_ROOT +'/api/manage/book')
        .then(res => res.body),

    update: (postId, title, content, image, token) =>
        requests.put(API_ROOT + '/api/posts/' + postId)
            .set('Authorization', 'Bearer ' + token)
            .attach('image', image, title)
            .field('id', postId)
            .field('title', title)
            .field('content', content)
            .then(responseBody),

    delete: (postId, token) =>
        requests.del(API_ROOT + '/api/posts/' + postId)
            .set('Authorization', 'Bearer ' + token)
            .then(responseBody),
}

export default {
    User,
    Books,
}

//Source: BPM-lab, lxyl.