const superagent = require('superagent');

const API_ROOT = 'http://meandemo-env.2ammmpcvep.ap-southeast-1.elasticbeanstalk.com';

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

const requests = {
    get: url =>
        superagent.get(`${API_ROOT}${url}`).then(responseBody),
    del: url =>
        superagent.del(`${API_ROOT}${url}`).then(responseBody),
    post: (url, body) =>
        superagent.post(`${API_ROOT}${url}`).send(body).then(responseBody).catch(handleError),
    put: (url, body) =>
        superagent.put(`${API_ROOT}${url}`).send(body).then(responseBody)
};

const User = {
    signUp: (email, password) =>
        requests.post('/api/user/signup', { email, password }),
    signIn: (email, password) =>
        requests.post('/api/user/login', { email, password }),
}

const Posts = {
    create: (title, content, image, token) =>
        superagent.post(API_ROOT + '/api/posts')
            .set('Authorization', 'Bearer ' + token)
            .attach('image', image, title)
            .field('title', title)
            .field('content', content)
            .then(responseBody),

    show: () => requests.get('/api/posts'),

    update: (postId, title, content, image, token) =>
        superagent.put(API_ROOT + '/api/posts/' + postId)
            .set('Authorization', 'Bearer ' + token)
            .attach('image', image, title)
            .field('id', postId)
            .field('title', title)
            .field('content', content)
            .then(responseBody),

    delete: (postId, token) =>
        superagent.del(API_ROOT + '/api/posts/' + postId)
            .set('Authorization', 'Bearer ' + token)
            .then(responseBody),
}

export default {
    User,
    Posts,
}

//Source: BPM-lab, lxyl.