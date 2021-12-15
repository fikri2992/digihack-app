<template>
    <div id="app" style="max-width: 400px;" class="ml-a mr-a">
	<!-- <div v-if="activeRouteName === 'Login'" class="absolute" style="width: 100vh; height: 100vh; background-color: #DC3545;"></div> -->
		<!-- Navbar -->
		<md-app>
        <md-app-toolbar class="md-primary btn-primary" v-if="isLoggingIn && !hideToolbar">
			<div class="ml-a mr-a">
				<img src="/logo-sicepat-2.png">
			</div>
        </md-app-toolbar>

        <!-- <md-app-drawer md-permanent="clipped" v-if="isLoggingIn && !hideToolbar">
			<md-list class="text-nav">
			<router-link to="/" class="text-nav">
				<md-list-item :class="{'bg-primary': activeRouteName === 'Home'}">
					<span class="md-list-item-text">Dashboard</span>
				</md-list-item>
			</router-link>


            <router-link to="/pollings" class="text-nav">
				<md-list-item :class="{'bg-primary': activeRouteName === 'Pollings'}">
					<span class="md-list-item-text">Create Polling</span>
				</md-list-item>
			</router-link>

			<router-link to="/qnas" class="text-nav">
				<md-list-item :class="{'bg-primary': activeRouteName === 'QNAS'}">
					<span class="md-list-item-text">Create QnA</span>
				</md-list-item>
			</router-link>

			<router-link to="/qnas" class="text-nav">
				<md-list-item>
					<span class="md-list-item-text">Interaction Report</span>
				</md-list-item>
			</router-link>
			
			<router-link to="/offer">
				<md-list-item class="text-nav" :class="{'bg-primary': activeRouteName === 'Offer'}">
					<span class="md-list-item-text">Offer</span>
				</md-list-item>
			</router-link>

			<router-link to="/ad-media">
				<md-list-item class="text-nav" :class="{'bg-primary': activeRouteName === 'AdMedia'}">
					<span class="md-list-item-text">Ad Media</span>
				</md-list-item>
			</router-link>
			
			<div class="text-nav pointer" @click="logout">
				<md-list-item>
					<span class="md-list-item-text">Logout</span>
				</md-list-item>
			</div>
			
		</md-list>
        </md-app-drawer> -->

        <md-app-content>
			<!-- main content -->
			<router-view/>
        </md-app-content>
	</md-app>
	<VueBottomNavigation style="max-width: 400px" v-if="isLoggingIn && !hideToolbar && selectedBottomNav" :options="options" v-model="selectedBottomNav" foregroundColor="#D51B24"/>
		<!-- Notifications -->
		<notifications group="app" :ignoreDuplicates="true" position="bottom right" :max="3" :duration="4000" style="z-index: 99989!important;">
			<template slot="body" slot-scope="props">
				<div class="vue-notification" :class="props.item.type">
					<div class="d-flex justify-space-between">
						<div v-if="props.item.type === 'warning'" class="material-icons mr-2 mtb-a">
							<svg style="width:24px;height:24px" viewBox="0 0 24 24">
								<path fill="currentColor" d="M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z" />
							</svg>
						</div>
						<div v-if="props.item.type === 'success'" class="material-icons mr-2 mtb-a">
							<svg style="width:24px;height:24px" viewBox="0 0 24 24">
								<path fill="currentColor" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
							</svg>
						</div>
						<div v-if="props.item.type === 'error'" class="material-icons mr-2 mtb-a">
							<svg style="width:24px;height:24px" viewBox="0 0 24 24">
								<path fill="currentColor" d="M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z" />
							</svg>
						</div>
						<div class="title pt-1"> {{ props.item.text }}</div>
					</div>
				</div>
			</template>
		</notifications>
	<!-- modal -->
		<modal
			size="small"
			@close="cancelingLogout"
			v-if="isConfirmLogout"
			>
			<template slot="header">
				<h3 class="text-white">{{ $t('Logout') }}</h3>
			</template>
			<template slot="body">
				Are you sure want to logout?
				<!-- Submit -->
			</template>
			<template slot="footer">
				<button
					@click="logout"
					type="submit"
					class="btn btn-submit btn-primary mt-3 text-center">
					{{ $t('Logout') }}
				</button>
				<button
					@click="cancelingLogout"
					type="submit"
					class="btn btn-submit btn-secondary mt-3 text-center">
					{{ $t('Cancel') }}
				</button>
			</template>
		</modal>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import VueBottomNavigation from "bottom-navigation-vue";
import Modal from '@/components/Modal.vue';
import _Template from './components/_Template.vue';

export default {
	name: 'App',
	components: {
		VueBottomNavigation,
		Modal,
    },
	data() {
		return {
			selectedBottomNav: 1,
			options: [
				{
					id: 1,
					icon: "fas fa-camera",
					title: "Capture",
				},
				{
					id: 2,
					icon: "fas fa-sign-out-alt",
					title: "Logout",
				},
			],
			isConfirmLogout: false,
		};
	},
	sockets: {
	},
	mounted() {},
	created() {
	},
	destroyed() {},
	beforeDestroy() {},
	watch: {
		selectedBottomNav() {
			if (this.selectedBottomNav === 2) {
				this.isConfirmLogout = true;
			}
		},
	},
	computed: {
		...mapGetters({
			user: 'user',
			isLoggingIn: 'isLoggingIn',
		}),
		activeRouteName() {
			return this.$route.name;
		},
		hideToolbar() {
			const hideNavbar = [
				'PollingPreview',
				'pollingLive'
			]
			return hideNavbar.includes(this.activeRouteName)
			
		}
	},
	methods: {
		...mapActions({
		}),
		logout() {
			localStorage.clear();
			location.reload();
		},
		cancelingLogout() {
			this.selectedBottomNav = 1;
			this.isConfirmLogout = false;
		},
	},
};
</script>

<style lang="scss">
    @import '@/assets/scss/main.scss';
	[v-cloak] {
		display: none;
	}
</style>
