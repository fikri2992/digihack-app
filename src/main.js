import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Notifications from 'vue-notification';
import io from 'socket.io-client';
import VueSocketio from 'vue-socket.io-extended';
import {
	MdField,
	MdButton,
	MdIcon,
	MdRadio,
	MdCheckbox,
	MdDatepicker,
	MdMenu,
	MdList,
	MdDivider,
	MdDialog,
	MdContent,
	MdSwitch,
	MdChips,
	// MdMenuContent,
	// MdSubheader,
	// MdProgress,
} from 'vue-material/dist/components';
import 'vue-material/dist/vue-material.min.css';

const SOCKET_URL = process.env.VUE_APP_SOCKET_URL || 'http://localhost:3000';

// Socket
const socket = io(SOCKET_URL, {
	transports: ['websocket'],
	// reconnection: true, // whether to reconnect automatically
	// reconnectionAttempts: Infinity, // number of reconnection attempts before giving up
	// reconnectionDelay: 1000, // how long to initially wait before attempting a new reconnection
	// reconnectionDelayMax: 5000, // maximum amount of time to wait between reconnection attempts. Each attempt increases the reconnection delay by 2x along with a randomization factor
	// randomizationFactor: 0.5,
});
Vue.use(Notifications);
Vue.use(VueSocketio, socket, { store });
// Material Design Components
Vue.use(MdField);
Vue.use(MdButton);
Vue.use(MdIcon);
Vue.use(MdRadio);
Vue.use(MdCheckbox);
Vue.use(MdDatepicker);
Vue.use(MdMenu);
// Vue.use(MdMenuContent);
Vue.use(MdList);
Vue.use(MdDivider);
Vue.use(MdDialog);
Vue.use(MdContent);
Vue.use(MdSwitch);
Vue.use(MdChips);
Vue.use(AxiosPlugin);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
