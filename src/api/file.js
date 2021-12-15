import client from '../lib/http-client';

const endpoint = '/upload';

export default {
	// Create
	upload(params, cb, errorCb) {
		const url = '/upload';
		
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
