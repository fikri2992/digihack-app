import router from '../../router';
import client from '../../lib/http-client';
import { removeCookie } from '../../lib/cookie';
import { loadLanguageAsync } from '@/setup/i18n-setup';


const TOKEN_KEY = 'access_token';
const LOGIN = 'LOGIN';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILED = 'LOGIN_FAILED';
const LOGOUT = 'LOGOUT';
const SET_USER = 'SET_USER';
const SET_ROLE = 'SET_ROLE';
const FETCH_USER_START = 'FETCH_USER_START';
const FETCH_USER_END = 'FETCH_USER_END';
const NAVIGATE = 'NAVIGATE';
const SET_NAV_STATE = 'SET_NAV_STATE';
const SET_LOCALE = 'SET_LOCALE';
const SET_IS_BOTTOM = 'SET_IS_BOTTOM';
const SET_SWITCHER_STATE = 'SET_SWITCHER_STATE';
const SET_HELP_STATE = 'SET_HELP_STATE';
const SET_ONLINE_STATUS = 'SET_ONLINE_STATUS';
const SET_DRAWER_VISIBLE = 'SET_DRAWER_VISIBLE';
const SET_NAVBAR_VISIBLE = 'SET_NAVBAR_VISIBLE';
const SET_CLIENT_USER = 'SET_CLIENT_USER';
const sessionCookieName = 'mp_user';


const state = function () {
	return {
		location: '/',
		user: null,
		role: '',
		isLoggingIn: !!localStorage.getItem(TOKEN_KEY),
		locale: 'en',
	};
};

const mutations = {
	[LOGIN](state) {
		state.loginError = false;
		state.isLoggingIn = true;
	},
	[LOGIN_SUCCESS](state) {
		state.isLoggedIn = true;
		state.isLoggingIn = true;
		state.loginError = false;
	},
	[SET_LOCALE](state, locale) {
		state.locale = locale;
	},
	[SET_USER](state, user) {
		state.user = user;
		state.locale = user.language;

		// Load Language
		loadLanguageAsync(user.language);
	},
	[NAVIGATE](state, to) {
		state.location = to;
	},
};

const actions = {
	setToken({ commit }, data) {
		const jwt = data.token;
		localStorage.setItem(TOKEN_KEY, jwt);
		client.defaults.headers.Authorization = `Bearer ${jwt}`;
		commit(LOGIN_SUCCESS);
	},
	setLocale({ commit }, locale) {
		commit(SET_LOCALE, locale);
	},
	navigate({ commit }, to) {
		commit(NAVIGATE, to);
	},
	setLoggedIn({ commit }) {
		commit(LOGIN_SUCCESS);
	},
};

const getters = {
	user: state => state.user,
	role: state => state.role,
	locale: state => state.locale,
	isLoggingIn: state => state.isLoggingIn,
};

export default {
	state,
	getters,
	actions,
	mutations,
};
