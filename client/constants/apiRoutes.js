const routes = {
    USER_SIGN_UP: {
        url: '/api/users/signup',
        method: 'post',
    },
    USER_SIGN_IN: {
        url: '/api/users/signin',
        method: 'post',
    },
    USER_SIGN_OUT: {
        url: '/api/users/signout',
        method: 'post',
    },
    GET_CURRENT_USER: {
        url: '/api/users/currentuser',
        method: 'get',
    },
};

export default routes;