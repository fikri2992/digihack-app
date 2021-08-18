import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

const CancelToken = axios.CancelToken;

export const duplicateVar = value => JSON.parse(JSON.stringify(value));

/**
 * Slugify
 * @see https://gist.github.com/mathewbyrne/1280286
 */
export const slugify = (text) => {
	const slugged = text
		.toString()
		.toLowerCase()
		.replace(/\s+/g, '-') // Replace spaces with -
		// eslint-disable-next-line
		.replace(/[^\w\-]+/g, '') // Remove all non-word chars
		// eslint-disable-next-line
		.replace(/\-\-+/g, '-') // Replace multiple - with single -

		.replace(/^-+/, '') // Trim - from start of text
		.replace(/-+$/, '');
	return slugged;
};

/**
 * Build Query String
 * @param params
 * @see https://stackoverflow.com/a/34209399/5627904
 */
export const buildQuery = (params) => {
	const esc = encodeURIComponent;
	const query = Object.keys(params)
		.map(k => `${esc(k)}=${esc(params[k])}`)
		.join('&');
	return query;
};

/**
 * Detect Mobile Browser
 * @see https://stackoverflow.com/a/11381730/5627904
 */
export const isMobile = () => {
	let check = false;
	// eslint-disable-next-line
	(function(a) {
		if (
			/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
				a,
			)
			|| /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
				a.substr(0, 4),
			)
		) check = true;
	})(navigator.userAgent || navigator.vendor || window.opera);
	return check;
};

/**
 * Detect Mobile and Tab Browser
 * @see https://stackoverflow.com/a/11381730/5627904
 */
export const isMobileOrTablet = () => {
	let check = false;
	// eslint-disable-next-line
	(function(a) {
		if (
			/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
				a,
			)
			|| /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
				a.substr(0, 4),
			)
		) check = true;
	})(navigator.userAgent || navigator.vendor || window.opera);
	return check;
};

/**
 * Get YouTube ID from various YouTube URL
 * @author takien
 * @see http://takien.com
 */
export const getYoutubeId = (url) => {
	let ID = '';
	const urlFormatted = url.replace(/(>|<)/gi, '').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
	if (urlFormatted[2] !== undefined) {
		// eslint-disable-next-line
		ID = urlFormatted[2].split(/[^0-9a-z_\-]/i);
		ID = ID[0];
	} else {
		ID = urlFormatted;
	}
	return ID;
};

/**
 * Is Valid URL
 * @see https://www.w3resource.com/javascript-exercises/javascript-regexp-exercise-9.php
 */
export const isValidURL = (str) => {
	const pattern = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
	return pattern.test(str);
};

/**
 * Is Number
 * @description Check if string is contain number only
 */
export const isNumber = (str) => {
	const reg = new RegExp(/^\d+$/);
	const isNumber = reg.test(str);
	return isNumber;
};

/**
 * Delay
 */
export const delay = (function startDelay() {
	let timer = 0;
	const call = function (callback, ms) {
		clearTimeout(timer);
		timer = setTimeout(callback, ms);
	};
	return call;
}());

// Download Blob
export const downloadBlob = (contents, config) => {
	const { name = 'contents', type = 'excel' } = config;
	const fileURL = window.URL.createObjectURL(new Blob([contents]));
	const fileLink = document.createElement('a');
	fileLink.href = fileURL;
	let extension = 'xlsx';
	if (type === 'docx') {
		extension = 'docx';
	}
	const fileName = `${name}.${extension}`;
	fileLink.setAttribute('download', fileName);
	document.body.appendChild(fileLink);
	fileLink.click();
};

/**
 * Email Validation
 */
export const isValidEmail = (email) => {
	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
};

export const triggerEvent = (el, type) => {
	if ('createEvent' in document) {
		// modern browsers, IE9+
		const e = document.createEvent('HTMLEvents');
		e.initEvent(type, false, true);
		el.dispatchEvent(e);
	} else {
		// IE 8
		const e = document.createEventObject();
		e.eventType = type;
		el.fireEvent(`on${e.eventType}`, e);
	}
};

export const formatMonth = (month, lang = 'US') => {
	const months = {
		ID: [
			'',
			'Jan',
			'Feb',
			'Mar',
			'Apr',
			'Mei',
			'Jun',
			'Jul',
			'Agu',
			'Sep',
			'Okt',
			'Nov',
			'Des',
		],
		US: [
			'',
			'Jan',
			'Feb',
			'Mar',
			'Apr',
			'May',
			'Jun',
			'Jul',
			'Aug',
			'Sep',
			'Oct',
			'Nov',
			'Dec',
		],
	};
	return months[lang][month];
};

export const getAxiosErrorMessage = e => e.response.data.message;
export const getRequestErrors = e => e.response.data.errorMessage || [];

// Create Combinations
export const createCombinations = (data) => {
	const result = data.reduce((a, b) => a.reduce((r, v) => r.concat(b.map(w => [].concat(v, w))), []));
	return result;
};

/**
 * Convert Image URL into Base64 Data
 *
 * @param url Image URL
 * @param callback Retrieve Base64 as Param
 *
 * @see https://stackoverflow.com/a/50155915/5627904 StackOverflow
 */
export const imageURLtoBase64 = (url, callback) => {
	const img = new Image();
	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d');

	img.crossOrigin = 'Anonymous';
	// img.setAttribute('crossOrigin', 'Anonymous');
	img.src = url;

	img.onload = () => {
		canvas.width = img.width;
		canvas.height = img.height;
		ctx.drawImage(img, 0, 0);
		const dataURL = canvas.toDataURL('image/png');
		callback(dataURL);
	};
};

/**
 * Download File URL
 */
export const downloadFile = (url) => {
	const a = document.createElement('A');
	a.href = url;
	a.download = url.substr(url.lastIndexOf('/') + 1);
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
};

// nl2br
export const nl2br = (str) => {
	const breakTag = '<br>';
	return `${str}`.replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, `$1${breakTag}$2`);
};

// Get Date Range
export const getDateRange = () => {
	const today = new Date();
	const startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 30);
	const endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

	const filterDate = {
		start: startDate,
		end: endDate,
	};

	return filterDate;
};

export const dateFormat = (value, format = 'YYYY-MM-DD') => {
	const date = dayjs(value).format(format);
	return date;
};


// elipsis long name in modal
export const elpisisString = (str) => {
	if (str.length > 35) {
		return `${str.substr(0, 50)} ... ${str.substr(str.length - 10, str.length)}`;
	}
	return str;
};

// Format Time (Seconds) to display as clock format
export const formatTime = (originalTime) => {
	let time = originalTime ? parseInt(originalTime) : 0;
	const isMinus = time < 0;
	const sign = isMinus ? '-' : '';
	if (isMinus) {
		time = Math.abs(time);
	}
	const oneMinute = 60;
	const oneHour = oneMinute * 60;
	let hours = Math.floor(time / oneHour);
	let minutes = Math.floor((time / oneMinute) % 60);
	if (Number.isNaN(minutes)) {
		minutes = 0;
	}
	let seconds = time % 60;
	if (hours > 0 && hours < 10) {
		hours = `0${hours}`;
	}
	if (minutes < 10) {
		minutes = `0${minutes}`;
	}
	if (seconds < 10) {
		seconds = `0${seconds}`;
	}
	const displayTime =	hours === 0 || hours === '0' ? `${minutes}:${seconds}` : `${hours}:${minutes}:${seconds}`;
	return `${sign}${displayTime}`;
};

// Convert String to Title Case
export const toTitleCase = (str) => {
	const string = str === null || str === '' ? '-' : str;
	return string.replace(
		/\w\S*/g,
		txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
	);
};

export const textSplitter = (str, l) => {
	let content = str;
	const strs = [];
	while (content.length > l) {
		const newlinePosition = content.substring(0, l).lastIndexOf('\n');
		const isGotNewline = newlinePosition !== -1;
		// If there is a newline within the text range, then get the newline position
		let pos = isGotNewline ? newlinePosition : content.substring(0, l).lastIndexOf(' ');
		pos = pos <= 0 ? l : pos;
		strs.push(content.substring(0, pos));
		if (isGotNewline) {
			strs.push('');
		}
		let i = isGotNewline ? content.indexOf('\n', pos) + 1 : content.indexOf(' ', pos) + 1;
		if (i < pos || i > pos + l) i = pos;
		content = content.substring(i);
	}
	strs.push(content);
	return strs;
};

// Filter User
export const filterUser = keyword => (user) => {
	const firstName = user.profile ? user.profile.firstName.toLowerCase() : '';
	const lastName = user.profile ? user.profile.lastName.toLowerCase() : '';
	const fullName = `${firstName} ${lastName}`;
	const email = user.email.toLowerCase();
	const isFirstNameMatch = firstName.includes(keyword);
	const isLastNameMatch = lastName.includes(keyword);
	const isFullNameMatch = fullName.includes(keyword);
	const isEmailMatch = email.includes(keyword);
	const isMatch = isFullNameMatch || isFirstNameMatch || isLastNameMatch || isEmailMatch;
	return isMatch;
};

// Filter Invited Student
export const filterInvitedStudent = keyword => (invited) => {
	const hasProfile = invited.user && invited.user.profile;
	const firstName = hasProfile ? invited.user.profile.firstName.toLowerCase() : '';
	const lastName = hasProfile ? invited.user.profile.lastName.toLowerCase() : '';
	const fullName = `${firstName} ${lastName}`;
	const email = invited.user ? invited.user.email.toLowerCase() : '';
	const isFirstNameMatch = firstName.includes(keyword);
	const isLastNameMatch = lastName.includes(keyword);
	const isFullNameMatch = fullName.includes(keyword);
	const isEmailMatch = email.includes(keyword);
	const isMatch = isFullNameMatch || isFirstNameMatch || isLastNameMatch || isEmailMatch;
	return isMatch;
};

// Filter Invited Student
export const filterInvitedStudents = keyword => (invited) => {
	const hasProfile = invited.student && invited.student.profile;
	const firstName = hasProfile ? invited.student.profile.firstName.toLowerCase() : '';
	const lastName = hasProfile ? invited.student.profile.lastName.toLowerCase() : '';
	const fullName = `${firstName} ${lastName}`;
	const email = invited.student ? invited.student.email.toLowerCase() : '';
	const isFirstNameMatch = firstName.includes(keyword);
	const isLastNameMatch = lastName.includes(keyword);
	const isFullNameMatch = fullName.includes(keyword);
	const isEmailMatch = email.includes(keyword);
	const isMatch = isFullNameMatch || isFirstNameMatch || isLastNameMatch || isEmailMatch;
	return isMatch;
};

// Get Alphabet
export const getAlphabet = (index) => {
	const alphabet = 'abcdefghijklmnopqrstuvwxyz';
	return alphabet[index].toUpperCase();
};

// Axios Global Request Handler
export const globalRequestHandler = (config) => {
	const newConfig = config;
	if (config.params) {
		const newParams = config.params;
		const keys = Object.keys(newParams);
		const boolFormatter = (key) => {
			let val = newParams[key];
			if (typeof val === 'boolean') {
				val = val ? 1 : 0;
				newParams[key] = val;
			}
		};
		keys.forEach(boolFormatter);
		newConfig.params = newParams;
	}
	return newConfig;
};

/**
 * Delete Item from Array
 *
 * @param {string} needle Item
 * @param {string[]} haystack Array
 */
export const deleteFromArr = (needle, haystack) => {
	const index = haystack.findIndex(item => item === needle);
	if (index !== -1) {
		haystack.splice(index, 1);
	}
};

/**
 * Get Random Integer between to values
 *
 * @param {Int} minValue Min Value
 * @param {Int} maxValue Max Value
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 */
export const getRandomInt = (minValue, maxValue) => {
	const min = Math.ceil(minValue);
	const max = Math.floor(maxValue);
	return Math.floor(Math.random() * (max - min)) + min;
};
export const randomString = (len) => {
	let text = ' ';
	const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	for (let i = 0; i < len; i++) {
		text += chars.charAt(Math.floor(Math.random() * chars.length));
	}
	return text;
};
/*
	URLFY
 */
export const urlify = (text) => {
	let description = '';
	if (text) {
		description = text;
	}
	const urlRegex = /(https?:\/\/[^\s]+)/g;
	return description.replace(urlRegex, url => `<a href="${url}" target="blank">${url}</a>`);
};

// Group By
export const groupBy = (arr, property) => {
	const grouped = arr.reduce((memo, x) => {
		const temp = memo;
		if (!temp[x[property]]) { temp[x[property]] = []; }
		temp[x[property]].push(x);
		return temp;
	}, {});
	return grouped;
};

// Generate Dates
export const generateDates = (value, type, format = 'YYYY-MM-DD', endDate) => {
	const dates = [];
	const firstIndex = value > 0 ? 0 : value;
	const lastIndex = value > 0 ? value : 0;
	for (let index = firstIndex; index <= lastIndex; index++) {
		const day = endDate || dayjs();
		const date = day.add(index, type).format(format);
		dates.push(date);
	}
	return dates;
};

// Scroll to Top
export const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

// Show Notif
export const showNotif = (title, message, link, icon = 'https://lms-app.ajak.in/img/logo-small.png') => {
	if (window.Notification) {
		const { permission } = Notification;
		const options = {
			body: message,
			icon,
		};
		const onClick = (event) => {
			event.preventDefault(); // prevent the browser from focusing the Notification's tab
			if (link) {
				window.open(link, '_blank');
			}
		};
		if (permission === 'granted') {
			const notification = new Notification(title, options);
			notification.onclick = onClick;
		} else if (permission !== 'denied') {
			Notification.requestPermission().then((permission) => {
				if (permission === 'granted') {
					const notification = new Notification(title, options);
					notification.onclick = onClick;
				}
			});
		}
	} else {
		// eslint-disable-next-line
		console.log('This browser does not support notification');
	}
};

// Get Notif Link
export const getNotifLink = (notif) => {
	let link = process.env.VUE_APP_URL || 'https://lms-app.ajak.in';
	const payload = notif.payload ? JSON.parse(notif.payload) : null;
	if (payload && payload !== '') {
		const type = notif.type;
		if (type === 'course') {
			const courseSlug = payload.module_slug;
			link += `/courses/${courseSlug}`;
		} else if (type === 'local_training_register') {
			const trainingSlug = payload.training_slug;
			link += `/trainings/${trainingSlug}`;
		}
	}
	return link;
};

// Get Video Blob
export const getVideoBlob = async (url, cancelCallback = null) => {
	const promise = new Promise((resolve, reject) => {
		axios.get(`${url}?id=${randomString(8)}`, {
			responseType: 'blob',
			cancelToken: new CancelToken(((c) => {
				// An executor function receives a cancel function as a parameter
				if (cancelCallback) {
					// eslint-disable-next-line no-param-reassign
					cancelCallback(c);
				}
			})),
		}).then((response) => {
			const result = response.data;
			resolve(result);
		}).catch(() => {
			reject(new Error('Error When Downloading Video or Media not found'));
		});
	});
	return promise;
};

// Get Video Blob
export const getJSON = async (url, cancelCallback = null) => {
	const promise = new Promise((resolve, reject) => {
		axios.get(`${url}?id=${randomString(8)}`, {
			cancelToken: new CancelToken(((c) => {
				// An executor function receives a cancel function as a parameter
				if (cancelCallback) {
					// eslint-disable-next-line no-param-reassign
					cancelCallback(c);
				}
			})),
		}).then((response) => {
			const result = response.data;
			resolve(result);
		}).catch(() => {
			reject(new Error('Error When Downloading Video or Media not found'));
		});
	});
	return promise;
};
// Toggle Full Screen
export const toggleFullScreen = () => {
	if (!document.fullscreenElement) {
		document.documentElement.requestFullscreen();
	} else if (document.exitFullscreen) {
		document.exitFullscreen();
	}
};

// Copy to Clipboard
export const copyToClipboard = (str) => {
	const el = document.createElement('textarea');	// Create a <textarea> element
	el.value = str;									// Set its value to the string that you want copied
	el.setAttribute('readonly', '');				// Make it readonly to be tamper-proof
	el.style.position = 'absolute';
	el.style.left = '-9999px';						// Move outside the screen to make it invisible
	document.body.appendChild(el);					// Append the <textarea> element to the HTML document
	const selected = document.getSelection().rangeCount > 0		// Check if there is any content selected previously
		? document.getSelection().getRangeAt(0)	// Store selection if found
		: false;								// Mark as false to know no selection existed before
	el.select();									// Select the <textarea> content
	document.execCommand('copy');					// Copy - only works as a result of a user action (e.g. click events)
	document.body.removeChild(el);					// Remove the <textarea> element
	if (selected) {									// If a selection existed before copying
		document.getSelection().removeAllRanges();	// Unselect everything on the HTML document
		document.getSelection().addRange(selected);	// Restore the original selection
	}
};

// Share
// export const share = ({ title, text, url }) => {
// 	if (navigator.share) {
// 		navigator.share({ title, text, url })
// 			.then(() => console.log('Successful share'))
// 			.catch(error => console.log('Error sharing', error));
// 	} else {
// 		console.log('No Web Share API');
// 	}
// };

export const share = () => {
	// if (navigator.share) {
	// 	navigator.share({ title, text, url })
	// 		.then(() => console.log('Successful share'))
	// 		.catch(error => console.log('Error sharing', error));
	// } else {
	// }
};

// Get Rundown Item Icon
export const getRundownItemIcon = (type) => {
	let icon = '';
	if (type === 'media' || type === 'image') {
		icon = 'image';
	} else if (type === 'video') {
		icon = 'movie';
	} else if (type === 'lower_third') {
		icon = 'alpha-a';
	} else if (type === 'zoom_meeting') {
		icon = 'radio-tower';
	} else if (type === 'ticker') {
		icon = 'format-text-rotation-none';
	} else if (type === 'video_input') {
		icon = 'video';
	} else if (type === 'lottie') {
		icon = 'transition';
	} else if (type === 'composition') {
		icon = 'view-compact';
	} else if (type === 'timer') {
		icon = 'clock';
	} else if (type === 'custom_page') {
		icon = 'earth';
	} else if (type === 'rundown') {
		icon = 'playlist-play';
	} else if (type === 'virtual_cam') {
		icon = 'webcam';
	} else if (type === 'custom_command') {
		icon = 'cube';
	} else if (type === 'audio') {
		icon = 'music';
	}
	return icon;
};

// Generate Random ID
export const generateRandomId = () => uuidv4();

// Get Rundown Item Duration
export const getDuration = (rundownItem) => {
	let duration = 0;
	if (rundownItem) {
		const content = rundownItem.content && rundownItem.content !== ''
			? JSON.parse(rundownItem.content) : null;

		if (rundownItem.type === 'video' || rundownItem.type === 'audio') {
			duration = content ? content.duration : 0;
		} else if (rundownItem.type === 'lower_third') {
			const key = rundownItem.type === 'timer' ? 'time' : 'duration';
			const time = content && content[key] ? content[key] : '00:00';
			const times = time.split(':');
			const minutes = times[0] ? parseInt(times[0]) : 0;
			const seconds = times[1] ? parseInt(times[1]) : 0;
			duration = (minutes * 60) + seconds;
		} else {
			const key = rundownItem.type === 'timer' ? 'time' : 'duration';
			const time = content && content[key] ? content[key] : '00:00:00';
			const times = time.split(':');
			const hours = times[0] ? parseInt(times[0]) : 0;
			const minutes = times[1] ? parseInt(times[1]) : 0;
			const seconds = times[2] ? parseInt(times[2]) : 0;
			duration = (hours * 3600) + (minutes * 60) + seconds;
		}
	}
	return duration;
};

export const convertTimezone = (date, timezone) => {
	const storedDate = date;
	const userFormat = 'D-M-YYYY/HH:mm:ss'; // Standard Day.js format
	let displayedDate = dayjs(new Date(storedDate).toLocaleString('en-US')).format(userFormat);
	try {
		if (timezone) displayedDate = dayjs(new Date(storedDate).toLocaleString('en-US', { timeZone: timezone })).format(userFormat);
	} catch (err) {
		displayedDate = dayjs(new Date(storedDate).toLocaleString('en-US')).format(userFormat);
	}
	return displayedDate;
};

export const addZeroUTC = (i) => {
	if (i < 10) {
		// eslint-disable-next-line
		i = `0${i}`;
	}
	return i;
};

// get ip
export const getIpAddr = () => {
	const findIP = new Promise((r) => {
		const w = window;
		const a = new (w.RTCPeerConnection || w.mozRTCPeerConnection || w.webkitRTCPeerConnection)({ iceServers: [] });
		// eslint-disable-next-line no-empty
		const b = () => {}; a.createDataChannel(''); a.createOffer(c => a.setLocalDescription(c, b, b), b); a.onicecandidate = (c) => { try { c.candidate.candidate.match(/([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g).forEach(r); } catch (e) {} };
	});
	return findIP;
};

// csv injection
export const csvInjection = (str) => {
	try {
		const riskyChars = ['=', '+', '-', '@', '%', '|'];
		const firstChar = str.charAt(0);
		const isInjected = riskyChars.includes(firstChar);
		if (!isInjected) return str;
		return str.slice(1);
	} catch (error) {
		return str;
	}
};

export const disposableEmail = (str) => {
	try {
		const disposableDomain = [
			'0815.ru',
			'0wnd.net',
			'0wnd.org',
			'10minutemail.co.za',
			'10minutemail.com',
			'123-m.com',
			'1fsdfdsfsdf.tk',
			'1pad.de',
			'20minutemail.com',
			'21cn.com',
			'2fdgdfgdfgdf.tk',
			'2prong.com',
			'30minutemail.com',
			'33mail.com',
			'3trtretgfrfe.tk',
			'4gfdsgfdgfd.tk',
			'4warding.com',
			'5ghgfhfghfgh.tk',
			'6hjgjhgkilkj.tk',
			'6paq.com',
			'7tags.com',
			'9ox.net',
			'a-bc.net',
			'agedmail.com',
			'ama-trade.de',
			'amilegit.com',
			'amiri.net',
			'amiriindustries.com',
			'anonmails.de',
			'anonymbox.com',
			'antichef.com',
			'antichef.net',
			'antireg.ru',
			'antispam.de',
			'antispammail.de',
			'armyspy.com',
			'artman-conception.com',
			'azmeil.tk',
			'baxomale.ht.cx',
			'beefmilk.com',
			'bigstring.com',
			'binkmail.com',
			'bio-muesli.net',
			'bobmail.info',
			'bodhi.lawlita.com',
			'bofthew.com',
			'bootybay.de',
			'boun.cr',
			'bouncr.com',
			'breakthru.com',
			'brefmail.com',
			'bsnow.net',
			'bspamfree.org',
			'bugmenot.com',
			'bund.us',
			'burstmail.info',
			'buymoreplays.com',
			'byom.de',
			'c2.hu',
			'card.zp.ua',
			'casualdx.com',
			'cek.pm',
			'centermail.com',
			'centermail.net',
			'chammy.info',
			'childsavetrust.org',
			'chogmail.com',
			'choicemail1.com',
			'clixser.com',
			'cmail.net',
			'cmail.org',
			'coldemail.info',
			'cool.fr.nf',
			'courriel.fr.nf',
			'courrieltemporaire.com',
			'crapmail.org',
			'cust.in',
			'cuvox.de',
			'd3p.dk',
			'dacoolest.com',
			'dandikmail.com',
			'dayrep.com',
			'dcemail.com',
			'deadaddress.com',
			'deadspam.com',
			'delikkt.de',
			'despam.it',
			'despammed.com',
			'devnullmail.com',
			'dfgh.net',
			'digitalsanctuary.com',
			'dingbone.com',
			'disposableaddress.com',
			'disposableemailaddresses.com',
			'disposableinbox.com',
			'dispose.it',
			'dispostable.com',
			'dodgeit.com',
			'dodgit.com',
			'donemail.ru',
			'dontreg.com',
			'dontsendmespam.de',
			'drdrb.net',
			'dump-email.info',
			'dumpandjunk.com',
			'dumpyemail.com',
			'e-mail.com',
			'e-mail.org',
			'e4ward.com',
			'easytrashmail.com',
			'einmalmail.de',
			'einrot.com',
			'eintagsmail.de',
			'emailgo.de',
			'emailias.com',
			'emaillime.com',
			'emailsensei.com',
			'emailtemporanea.com',
			'emailtemporanea.net',
			'emailtemporar.ro',
			'emailtemporario.com.br',
			'emailthe.net',
			'emailtmp.com',
			'emailwarden.com',
			'emailx.at.hm',
			'emailxfer.com',
			'emeil.in',
			'emeil.ir',
			'emz.net',
			'ero-tube.org',
			'evopo.com',
			'explodemail.com',
			'express.net.ua',
			'eyepaste.com',
			'fakeinbox.com',
			'fakeinformation.com',
			'fansworldwide.de',
			'fantasymail.de',
			'fightallspam.com',
			'filzmail.com',
			'fivemail.de',
			'fleckens.hu',
			'frapmail.com',
			'friendlymail.co.uk',
			'fuckingduh.com',
			'fudgerub.com',
			'fyii.de',
			'garliclife.com',
			'gehensiemirnichtaufdensack.de',
			'get2mail.fr',
			'getairmail.com',
			'getmails.eu',
			'getonemail.com',
			'giantmail.de',
			'girlsundertheinfluence.com',
			'gishpuppy.com',
			'gmial.com',
			'goemailgo.com',
			'gotmail.net',
			'gotmail.org',
			'gotti.otherinbox.com',
			'great-host.in',
			'greensloth.com',
			'grr.la',
			'gsrv.co.uk',
			'guerillamail.biz',
			'guerillamail.com',
			'guerrillamail.biz',
			'guerrillamail.com',
			'guerrillamail.de',
			'guerrillamail.info',
			'guerrillamail.net',
			'guerrillamail.org',
			'guerrillamailblock.com',
			'gustr.com',
			'harakirimail.com',
			'hat-geld.de',
			'hatespam.org',
			'herp.in',
			'hidemail.de',
			'hidzz.com',
			'hmamail.com',
			'hopemail.biz',
			'ieh-mail.de',
			'ikbenspamvrij.nl',
			'imails.info',
			'inbax.tk',
			'inbox.si',
			'inboxalias.com',
			'inboxclean.com',
			'inboxclean.org',
			'infocom.zp.ua',
			'instant-mail.de',
			'ip6.li',
			'irish2me.com',
			'iwi.net',
			'jetable.com',
			'jetable.fr.nf',
			'jetable.net',
			'jetable.org',
			'jnxjn.com',
			'jourrapide.com',
			'jsrsolutions.com',
			'kasmail.com',
			'kaspop.com',
			'killmail.com',
			'killmail.net',
			'klassmaster.com',
			'klzlk.com',
			'koszmail.pl',
			'kurzepost.de',
			'lawlita.com',
			'letthemeatspam.com',
			'lhsdv.com',
			'lifebyfood.com',
			'link2mail.net',
			'litedrop.com',
			'lol.ovpn.to',
			'lolfreak.net',
			'lookugly.com',
			'lortemail.dk',
			'lr78.com',
			'lroid.com',
			'lukop.dk',
			'm21.cc',
			'mail-filter.com',
			'mail-temporaire.fr',
			'mail.by',
			'mail.mezimages.net',
			'mail.zp.ua',
			'mail1a.de',
			'mail21.cc',
			'mail2rss.org',
			'mail333.com',
			'mailbidon.com',
			'mailbiz.biz',
			'mailblocks.com',
			'mailbucket.org',
			'mailcat.biz',
			'mailcatch.com',
			'mailde.de',
			'mailde.info',
			'maildrop.cc',
			'maileimer.de',
			'mailexpire.com',
			'mailfa.tk',
			'mailforspam.com',
			'mailfreeonline.com',
			'mailguard.me',
			'mailin8r.com',
			'mailinater.com',
			'mailinator.com',
			'mailinator.net',
			'mailinator.org',
			'mailinator2.com',
			'mailincubator.com',
			'mailismagic.com',
			'mailme.lv',
			'mailme24.com',
			'mailmetrash.com',
			'mailmoat.com',
			'mailms.com',
			'mailnesia.com',
			'mailnull.com',
			'mailorg.org',
			'mailpick.biz',
			'mailrock.biz',
			'mailscrap.com',
			'mailshell.com',
			'mailsiphon.com',
			'mailtemp.info',
			'mailtome.de',
			'mailtothis.com',
			'mailtrash.net',
			'mailtv.net',
			'mailtv.tv',
			'mailzilla.com',
			'makemetheking.com',
			'manybrain.com',
			'mayhco.com',
			'mbx.cc',
			'mega.zik.dj',
			'meinspamschutz.de',
			'meltmail.com',
			'messagebeamer.de',
			'mezimages.net',
			'ministry-of-silly-walks.de',
			'mintemail.com',
			'misterpinball.de',
			'moncourrier.fr.nf',
			'monemail.fr.nf',
			'monmail.fr.nf',
			'monumentmail.com',
			'mt2009.com',
			'mt2014.com',
			'mycard.net.ua',
			'mycleaninbox.net',
			'mymail-in.net',
			'mypacks.net',
			'mypartyclip.de',
			'myphantomemail.com',
			'mysamp.de',
			'mytempemail.com',
			'mytempmail.com',
			'mytrashmail.com',
			'nabuma.com',
			'neomailbox.com',
			'nepwk.com',
			'nervmich.net',
			'nervtmich.net',
			'netmails.com',
			'netmails.net',
			'neverbox.com',
			'nice-4u.com',
			'nincsmail.hu',
			'nnh.com',
			'no-spam.ws',
			'noblepioneer.com',
			'nomail.pw',
			'nomail.xl.cx',
			'nomail2me.com',
			'nomorespamemails.com',
			'nospam.ze.tc',
			'nospam4.us',
			'nospamfor.us',
			'nospammail.net',
			'notmailinator.com',
			'nowhere.org',
			'nowmymail.com',
			'nurfuerspam.de',
			'nus.edu.sg',
			'objectmail.com',
			'obobbo.com',
			'odnorazovoe.ru',
			'oneoffemail.com',
			'onewaymail.com',
			'onlatedotcom.info',
			'online.ms',
			'opayq.com',
			'ordinaryamerican.net',
			'otherinbox.com',
			'ovpn.to',
			'owlpic.com',
			'pancakemail.com',
			'pcusers.otherinbox.com',
			'pjjkp.com',
			'plexolan.de',
			'poczta.onet.pl',
			'politikerclub.de',
			'poofy.org',
			'pookmail.com',
			'privacy.net',
			'privatdemail.net',
			'proxymail.eu',
			'prtnx.com',
			'putthisinyourspamdatabase.com',
			'putthisinyourspamdatabase.com',
			'qq.com',
			'quickinbox.com',
			'rcpt.at',
			'reallymymail.com',
			'realtyalerts.ca',
			'recode.me',
			'recursor.net',
			'reliable-mail.com',
			'rhyta.com',
			'rmqkr.net',
			'royal.net',
			'rtrtr.com',
			's0ny.net',
			'safe-mail.net',
			'safersignup.de',
			'safetymail.info',
			'safetypost.de',
			'saynotospams.com',
			'schafmail.de',
			'schrott-email.de',
			'secretemail.de',
			'secure-mail.biz',
			'senseless-entertainment.com',
			'services391.com',
			'sharklasers.com',
			'shieldemail.com',
			'shiftmail.com',
			'shitmail.me',
			'shitware.nl',
			'shmeriously.com',
			'shortmail.net',
			'sibmail.com',
			'sinnlos-mail.de',
			'slapsfromlastnight.com',
			'slaskpost.se',
			'smashmail.de',
			'smellfear.com',
			'snakemail.com',
			'sneakemail.com',
			'sneakmail.de',
			'snkmail.com',
			'sofimail.com',
			'solvemail.info',
			'sogetthis.com',
			'soodonims.com',
			'spam4.me',
			'spamail.de',
			'spamarrest.com',
			'spambob.net',
			'spambog.ru',
			'spambox.us',
			'spamcannon.com',
			'spamcannon.net',
			'spamcon.org',
			'spamcorptastic.com',
			'spamcowboy.com',
			'spamcowboy.net',
			'spamcowboy.org',
			'spamday.com',
			'spamex.com',
			'spamfree.eu',
			'spamfree24.com',
			'spamfree24.de',
			'spamfree24.org',
			'spamgoes.in',
			'spamgourmet.com',
			'spamgourmet.net',
			'spamgourmet.org',
			'spamherelots.com',
			'spamherelots.com',
			'spamhereplease.com',
			'spamhereplease.com',
			'spamhole.com',
			'spamify.com',
			'spaml.de',
			'spammotel.com',
			'spamobox.com',
			'spamslicer.com',
			'spamspot.com',
			'spamthis.co.uk',
			'spamtroll.net',
			'speed.1s.fr',
			'spoofmail.de',
			'stuffmail.de',
			'super-auswahl.de',
			'supergreatmail.com',
			'supermailer.jp',
			'superrito.com',
			'superstachel.de',
			'suremail.info',
			'talkinator.com',
			'teewars.org',
			'teleworm.com',
			'teleworm.us',
			'temp-mail.org',
			'temp-mail.ru',
			'tempe-mail.com',
			'tempemail.co.za',
			'tempemail.com',
			'tempemail.net',
			'tempemail.net',
			'tempinbox.co.uk',
			'tempinbox.com',
			'tempmail.eu',
			'tempmaildemo.com',
			'tempmailer.com',
			'tempmailer.de',
			'tempomail.fr',
			'temporaryemail.net',
			'temporaryforwarding.com',
			'temporaryinbox.com',
			'temporarymailaddress.com',
			'tempthe.net',
			'thankyou2010.com',
			'thc.st',
			'thelimestones.com',
			'thisisnotmyrealemail.com',
			'thismail.net',
			'throwawayemailaddress.com',
			'tilien.com',
			'tittbit.in',
			'tizi.com',
			'tmailinator.com',
			'toomail.biz',
			'topranklist.de',
			'tradermail.info',
			'trash-mail.at',
			'trash-mail.com',
			'trash-mail.de',
			'trash2009.com',
			'trashdevil.com',
			'trashemail.de',
			'trashmail.at',
			'trashmail.com',
			'trashmail.de',
			'trashmail.me',
			'trashmail.net',
			'trashmail.org',
			'trashymail.com',
			'trialmail.de',
			'trillianpro.com',
			'twinmail.de',
			'tyldd.com',
			'uggsrock.com',
			'umail.net',
			'uroid.com',
			'us.af',
			'venompen.com',
			'veryrealemail.com',
			'viditag.com',
			'viralplays.com',
			'vpn.st',
			'vsimcard.com',
			'vubby.com',
			'wasteland.rfc822.org',
			'webemail.me',
			'weg-werf-email.de',
			'wegwerf-emails.de',
			'wegwerfadresse.de',
			'wegwerfemail.com',
			'wegwerfemail.de',
			'wegwerfmail.de',
			'wegwerfmail.info',
			'wegwerfmail.net',
			'wegwerfmail.org',
			'wh4f.org',
			'whyspam.me',
			'willhackforfood.biz',
			'willselfdestruct.com',
			'winemaven.info',
			'wronghead.com',
			'www.e4ward.com',
			'www.mailinator.com',
			'wwwnew.eu',
			'x.ip6.li',
			'xagloo.com',
			'xemaps.com',
			'xents.com',
			'xmaily.com',
			'xoxy.net',
			'yep.it',
			'yogamaven.com',
			'yopmail.com',
			'yopmail.fr',
			'yopmail.net',
			'yourdomain.com',
			'yuurok.com',
			'z1p.biz',
			'za.com',
			'zehnminuten.de',
			'zehnminutenmail.de',
			'zippymail.info',
			'zoemail.net',
			'zomg.info',
			'lidte.com'];
		if (disposableDomain.includes(str)) {
			return true;
		}
		return false;
	} catch (error) {
		return false;
	}
};
