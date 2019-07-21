import {
	http
} from '@/utils/index.js'

/**
 * 查询拼多多热销商品
 */
export function getRepositories() {
	// let data = {
	// 	type: type
	// }
	return http.get('/repositories').then(res => res.data)
}