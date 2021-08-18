<template>
    <div id="app">
      <!-- Navbar -->
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

        <md-app-content>
          <!-- main content -->
          <router-view/>
        </md-app-content>
      </md-app>
		<!-- Notifications -->
		<notifications group="app" :ignoreDuplicates="true" position="bottom right" :max="3" :duration="4000" style="z-index: 99989!important;">
			<template slot="body" slot-scope="props">
				<div class="vue-notification" :class="props.item.type">
					<div class="d-flex justify-space-between">
						<div v-if="props.item.type === 'warning'" class="material-icons mr-2 mtb-a">error_outline</div>
						<div v-if="props.item.type === 'success'" class="material-icons mr-2 mtb-a">check</div>
						<div v-if="props.item.type === 'error'" class="material-icons mr-2 mtb-a">clear</div>
						<div class="title pt-1"> {{ props.item.text }}</div>
					</div>
				</div>
			</template>
		</notifications>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
	name: 'App',
	components: {
    },
	data() {
		return {};
	},
	sockets: {
	},
	mounted() {},
	created() {
	},
	destroyed() {},
	beforeDestroy() {},
	watch: {},
	computed: {
		...mapGetters({
			user: 'user',
			isLoggingIn: 'isLoggingIn',
		}),
	},
	methods: {
		...mapActions({
		}),
	},
};
</script>

<style lang="scss">
    @import '@/assets/scss/main.scss';
	[v-cloak] {
		display: none;
	}
</style>
