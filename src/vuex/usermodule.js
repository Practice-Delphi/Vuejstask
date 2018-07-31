
export const USER_FETCH_SUCCESS = 'USER_FETCH_SUCCESS';
export const USER_FETCH_FAILED = 'USER_FETCH_FALIED';
export const USER_FETCH_START = 'USER_FETCH_START';
export const TOKEN_FETCH_FAILED = 'TOKEN_FETCH_FAILED';
export const TOKEN_FETCH_SUCCESS = 'TOKEN_FETCH_SUCCESS';

export const TOKEN_DELETE = 'TOKEN_DELETE';
export const USER_DELETE = 'USER_DELETE';

export const CLOSE_ERROR = 'CLOSE_ERROR';

const apiurl = `http://localhost:3000`;

const getToken = (state) => {
    if (state.token) {
        return state.token;
    } else if (localStorage.getItem('token')) {
        return localStorage.getItem('token');
    }
    return null;
}

const isUserGetter = state => !!(state.user);
const isErrorGetter = state => !!(state.error);
const errorGetter = state => state.error;
const isLoadingGetter = state => state.loading;

const tokenAction = async (commit, email, password) => {
    return fetch(`${apiurl}/api/v1/auth/token`, {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
            email,
            password
        })
    })
        .then(res => res.json())
        .then(data => {
            if (data.message) {
                throw new Error(data.message);
            } else {
                localStorage.setItem('token', data.token);
                commit({
                    type: TOKEN_FETCH_SUCCESS,
                    token: data.token
                });
            }
        })
        .catch(err => {
            console.log(err.message);
            commit({
                type: TOKEN_FETCH_FAILED,
                error: err.message
            });
        });
};

const getUserAction = ({ commit, dispatch, state }) => {
    let token = getToken(state);
    if (!token) {
        dispatch('logoutAction');
    } else {
        fetch(`${apiurl}/api/v1/auth/getuser`, {
            method: 'GET',
            headers: new Headers({
                'Authorization': `Bearer ${token}`
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.message) {
                    throw new Error(data.message);
                } else {
                    // if (photo) {
                    //     dispatch('uploadUserPhotoAction', { photo });
                    // } else {
                        commit({
                            type: USER_FETCH_SUCCESS,
                            user: data.user
                        });
                    // }
                }
            })
            .catch(err => {
                console.log(err.message);
                commit({
                    type: USER_FETCH_FAILED,
                    error: err.message
                });
            });
    }
}

const loginAction = async ({ commit, state, dispatch }, { email, password }) => {
    commit({ type: USER_FETCH_START });
    let token = getToken(state);
    if (!token) {
        await tokenAction(commit, email, password);
        token = getToken(state);
    }
    if (token) {
        dispatch('getUserAction');
    } else {
        dispatch('logoutAction');
    }
};

const changeAction = async ({ commit, state, dispatch }, newinfo) => {
    commit({ type: USER_FETCH_START });
    let token = getToken(state);
    if (token) {
        fetch(`${apiurl}/api/v1/auth/update`, {
            method: 'POST',
            headers: new Headers({
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(Object.assign({}, newinfo))
        })
            .then(res => res.json())
            .then(data => {
                if (data.message) {
                    throw new Error(data.message);
                } else {
                    commit({
                        type: USER_FETCH_SUCCESS,
                        user: data.user
                    });
                }
            })
            .catch(err => {
                console.log(err.message);
                commit({
                    type: USER_FETCH_FAILED,
                    error: err.message
                });
            });
    } else {
        dispatch('logoutAction');
    }
};

const uploadUserPhotoAction = ({ commit, state, dispatch }, { photo }) => {
    commit({ type: USER_FETCH_START });
    let token = getToken(state);
    if (photo && token) {
        const form = new FormData();
        form.append('photo', photo, photo.name);
        fetch(`${apiurl}/api/v1/auth/uploadphoto`, {
            method: 'POST',
            headers: new Headers({
                'Authorization': `Bearer ${token}`
            }),
            body: form
        })
            .then(res => res.json())
            .then(data => {
                if (data.message) {
                    throw new Error(data.message);
                } else {
                    commit({
                        type: USER_FETCH_SUCCESS,
                        user: data.user
                    });
                }
            })
            .catch(err => {
                console.log(err.mesasge);
                commit({
                    type: USER_FETCH_FAILED,
                    error: err.message
                });
            });
    } else if (!photo) {
        commit({
            type: USER_FETCH_FAILED,
            error: 'Photo not choosed'
        })
    } else if (!token) {
        dispatch('logoutAction');
    }
};
const registerAction = ({ commit, dispatch }, newuser) => {
    commit({ type: USER_FETCH_START });
    fetch(`${apiurl}/api/v1/auth/register`, {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(Object.assign({}, newuser, { photo: undefined }))
    })
        .then(res => res.json())
        .then(async data => {
            // console.log(data);
            if (data.message) {
                throw new Error(data.message);
            } else {
                let payload = {
                    email: newuser.email,
                    password: newuser.password
                };
                if (newuser.photo) {
                    // console.log(newuser.photo);
                    // payload.photo = newuser.photo;
                    await dispatch('loginAction', payload);
                    dispatch('uploadUserPhotoAction', { photo: newuser.photo });
                } else {
                    dispatch('loginAction', payload);
                }
            }
        })
        .catch(err => {
            console.log(err.message);
            commit({
                type: USER_FETCH_FAILED,
                error: err.message
            });
        });
};

const logoutAction = ({ commit }) => {
    commit({ type: TOKEN_DELETE });
    commit({ type: USER_DELETE });
};

const usermodule = {
    state: {
        loading: false,
        error: null,
        user: null,
        token: null
    },
    getters: {
        isUserGetter,
        isErrorGetter,
        errorGetter,
        isLoadingGetter
    },
    mutations: {
        [USER_FETCH_START]: (state) => {
            state.loading = true; // Object.assign({}, state, { loading: true }); // { loading: true, error: null, user: null, token: state.token }
        },
        [USER_FETCH_FAILED]: (state, payload) => {
            state.loading = false;
            state.error = payload.error;
            // state = Object.assign({}, state, { error: payload.error });
        },
        [USER_FETCH_SUCCESS]: (state, payload) => {
            state.loading = false;
            state.user = payload.user;
            // state = Object.assign({}, state, { user: payload.user });
        },
        [TOKEN_FETCH_SUCCESS]: (state, payload) => {
            state.token = payload.token;
            // state = Object.assign({}, state, { token: payload.token });
        },
        [TOKEN_FETCH_FAILED]: (state, payload) => {
            state.token = null;
            state.loading = false;
            state.error = payload.error;
            if (localStorage.getItem('token')) {
                localStorage.removeItem('token');
            }
            state = Object.assign({}, state, { error: payload.error });
        },
        [TOKEN_DELETE]: (state) => {
            if (localStorage.getItem('token')) {
                localStorage.removeItem('token');
            }
            state.token = null;
        },
        [USER_DELETE]: (state) => {
            state.loading = false;
            state.user = null;
        },
        [CLOSE_ERROR]: (state) => {
            state.error = null;
            state.loading = false;
        }
    },
    actions: {
        loginAction,
        logoutAction,
        registerAction,
        changeAction,
        uploadUserPhotoAction,
        getUserAction
    }
};

export default usermodule;
