import client from '@/lib/http-client';

const endpoint = '/auth';

export default {
	// Login
	login(params, cb, errorCb) {
		const url = `${endpoint}/login`;
		client.post(url, params)
			.then((response) => {
				if (cb) cb(response.data);
			})
			.catch((e) => {
				if (errorCb) errorCb(e);
			});
	},

	// Logout
	logout(cb, errorCb) {
		const url = `${endpoint}/logout`;
		client.post(url)
			.then((response) => {
				if (cb) cb(response.data);
			})
			.catch((e) => {
				if (errorCb) errorCb(e);
			});
	},

	// Get User Profile
	getProfile(cb, errorCb) {
		const url = `${endpoint}/profile`;
		client.get(url)
			.then((response) => {
				if (cb) cb(response.data);
			})
			.catch((e) => {
				if (errorCb) errorCb(e);
			});
	},

	/**
	 * Register
	*/
	register(params, cb, errorCb) {
		const url = `${endpoint}/register`;
		client.post(url, params)
			.then((response) => {
				if (cb) cb(response.data);
			})
			.catch((e) => {
				if (errorCb) errorCb(e);
			});
	},

	/**
	 * Update profile
	*/
	updateProfile(params, cb, errorCb) {
		const url = `${endpoint}/profile`;
		client.put(url, params)
			.then((response) => {
				if (cb) cb(response.data);
			})
			.catch((e) => {
				if (errorCb) errorCb(e);
			});
	},
};
