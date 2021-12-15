import client from '../lib/http-client';

const endpoint = '/pengantaran';

export default {
	// create
	create(params, cb, errorCb) {
		const url = `${endpoint}/create`;
		const responseHandler = (response) => {
			if (cb) cb(response.data);
		};
		const errorHandler = (e) => {
			if (errorCb) errorCb(e);
		};
		client.post(url, params)
			.then(responseHandler)
			.catch(errorHandler);
	},
};
