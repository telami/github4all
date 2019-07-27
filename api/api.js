import {
	http
} from '@/utils/index.js'

/**
 * Get repositories
 */
export function getRepositories(language, since) {

	let data = {
		language: language === undefined ? '' : language,
		since: since === undefined ? '' : since,
	}

	return http.get('/repositories', data).then(res => res.data)
}

/**
 * Get all languages
 */
export function getLanguages() {
	return http.get('/languages').then(res => res.data)
}

/**
 * Get all languages
 */
export function getReadme(author, repository) {
	return http.get('https://api.github.com/repos/' + author + '/' + repository + '/contents/README.md').then(res => res.data)
}
