<template>
	<div class="page-container">
		<md-app>
		<md-app-toolbar class="md-primary">
			<span class="md-title">Engage More</span>
		</md-app-toolbar>

		<md-app-drawer md-permanent="clipped">
			<md-list>
				<md-list-item>
				<span class="md-list-item-text">Create Polling</span>
				</md-list-item>

				<md-list-item>
				<span class="md-list-item-text">Create QnA</span>
				</md-list-item>

				<md-list-item>
				<span class="md-list-item-text">Interaction Report</span>
				</md-list-item>

				<md-list-item>
				<span class="md-list-item-text">Offer</span>
				</md-list-item>

				<md-list-item>
				<span class="md-list-item-text">Profile</span>
				</md-list-item>

				<md-list-item>
				<span class="md-list-item-text">Logout</span>
				</md-list-item>
			</md-list>
		</md-app-drawer>
		</md-app>
	</div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex';
import { initialText } from '@/lib/helper';

export default {
	name: 'Navbar',
	components: {},
	data() {
		return {};
	},
	sockets: {
	},
	mounted() {},
	created() {},
	destroyed() {},
	beforeDestroy() {
	},
	computed: {
		...mapGetters({
			user: 'user',
		}),
		userName() {
			return this.user && this.user.profile ? this.user.profile.name : 'MM';
		},
		initialUserName() {
			return initialText(this.userName);
		},
		activeRouteName() {
			return this.$route.name;
		},
	},
	methods: {
		...mapActions({
			logout: 'logout',
		}),
	},
};
</script>

<style lang="scss" scoped>
</style>
