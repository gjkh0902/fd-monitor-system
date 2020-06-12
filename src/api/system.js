import request from '@/utils/request'

export function getList(params) {
    return request({
        url: '/listSystem',
        method: 'get',
        params
    })
}

export function addSystem(data) {
    return request({
        url: '/addSystem',
        method: 'post',
        data
    })
}
