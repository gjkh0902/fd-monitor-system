import request from '@/utils/request'

export function login(data) {
    return request({
        url: '/userLogin',
        method: 'post',
        data
    })
}

export function getInfo(token) {
    console.log(token)
    return request({
        url: '/userInfo',
        method: 'get',
        params: { token }
    })
}

export function logout() {
    return request({
        url: '/userLogout',
        method: 'post'
    })
}
