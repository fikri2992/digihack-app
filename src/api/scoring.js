import client from '../lib/http-client';

const endpoint = '/alamatscoring';

export default {
	// Get
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
	// Get
	get(id, cb, errorCb) {
		const url = `${endpoint}/${id}`;
		const responseHandler = (response) => {
			if (cb) cb(response.data);
		};
		const errorHandler = (e) => {
			if (errorCb) errorCb(e);
		};
		client.get(url)
			.then(responseHandler)
			.catch(errorHandler);
	},

	// Get by Slug
	getBySlug(slug, cb, errorCb) {
		// console.log(slug);
		const url = `${endpoint}/slug/${slug}`;
		const responseHandler = (response) => {
			if (cb) cb(response.data);
		};
		const errorHandler = (e) => {
			if (errorCb) errorCb(e);
		};
		client.get(url)
			.then(responseHandler)
			.catch(errorHandler);
	},

	// Get List
	getList(params, cb, errorCb) {
		const responseHandler = (response) => {
			if (cb) cb(response.data);
		};
		const errorHandler = (e) => {
			if (errorCb) errorCb(e);
		};
		const url = endpoint;
		client.get(url, { params })
			.then(responseHandler)
			.catch(errorHandler);
	},

	// Update
	update(id, params, cb, errorCb) {
		const url = `${endpoint}/${id}`;
		client.put(url, params)
			.then((response) => {
				if (cb) cb(response.data);
			})
			.catch((e) => {
				if (errorCb) errorCb(e);
			});
	},
	
	// Delete
	delete(id, cb, errorCb) {
		const url = `${endpoint}/${id}`;
		client.delete(url)
			.then((response) => {
				if (cb) cb(response.data);
			})
			.catch((e) => {
				if (errorCb) errorCb(e);
			});
	},
	
};
