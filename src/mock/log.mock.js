import '../utils/MockGlobal'
import fetchMock from 'fetch-mock'
import mockjs, { Random } from 'mockjs'

var hourTimestamp = 60 * 60 * 100;

let result = new mockjs.mock({
	page: 1,
	pageSize: 10,
	total: 1000,
	'list|1-10': [{
		'title': () => Random.cname(),
		'content': () => Random.cparagraph(1, 3),
		'date': () => Random.datetime(),
		'avatar': () => Random.image('125x125'),
		'id': () => Random.id(),
		'type': () => Random.integer(1, 6)
	}]
})

fetchMock.mock(`${APP_SERVER}/log/listJson`, new mockjs.mock({
	page: 1,
	pageSize: 10,
	total: 1000,
	'list|10-20': [{
		'title': () => Random.cname(),
		'content': () => Random.cparagraph(1, 3),
		'date': () => Random.datetime(),
		'avatar': () => Random.image('125x125'),
		'id': () => Random.id(),
		'type': () => Random.integer(1, 6)
	}]
}));
fetchMock.mock(`${APP_SERVER}/memberLog/listJson`, new mockjs.mock({
	page: 1,
	pageSize: 10,
	total: 1000,
	'list|10-20': [{
		'title': () => Random.cname(),
		'content': () => Random.cparagraph(1, 3),
		'date': () => Random.datetime(),
		'avatar': () => Random.image('125x125'),
		'id': () => Random.id(),
		'type': () => Random.integer(1, 5)
	}]
}));
// fetchMock.get(`${APP_SERVER}/log/listJson`, function getSession(url, opts) {
// 	const jwt = extractToken(opts)
// 	if (!jwt || jwt !== fakeToken) {
// 		return delay({
// 			status: 401,
// 			body: JSON.stringify({
// 				details: 'Unauthorized'
// 			})
// 		})
// 	}
// 	return delay({
// 		status: 200,
// 		body: JSON.stringify({
// 			success: true,
// 			data: result
// 		})
// 	})
// })
// .catch(unmatchedUrl => {
// 	// fallover call original fetch, because fetch-mock treats
// 	// any unmatched call as an error - its target is testing
// 	return realFetch(unmatchedUrl)
// })
