<template>
	<div style="background-color:transparent">
		<chart v-if="contentPolling && contentPolling.length >0 && userInteractions" 
		:interactionId="pollingId" 
		:polling="contentPolling" :userPolling="userInteractions"></chart>
	</div>
</template>

<script>
import interactionsApi from '../api/interaction.js'
import userInteractionApi from '../api/userInteraction.js'
import Chart from '@/components/Chart.vue';

export default {
	name: 'InteractionLive',
	components: {
        Chart
    },
	data() {
		return {
            polling: null,
            selectedPolling: null,
            pollingId: null,
			env: process.env.VUE_APP_API_URL,
            userInteractions:null,
        };
	},
	sockets: {
		connect() {
			console.log('connnected')
		},
		create(data) {
			console.log(data);
		}
	},
	mounted() {

    },
	created() {
        this.pollingId = this.$route && this.$route.params && this.$route.params.id ? this.$route.params.id: null;
        this.getPolling(this.pollingId)
        
    },
	destroyed() {

    },
	beforeDestroy() {

	},
	computed: {
        contentPolling() {
			const content = this.polling && this.polling.content && this.polling.content.length > 0 ? 
			JSON.parse(this.polling.content) : null;
			return content;
		},
    },
	methods: {
        fetchUserInteractions() {
            const callback = (response) => {
				this.userInteractions = response.data;
                console.log(this.userInteractions)
			}
			const errCallback = () => {
			}
			const id = this.pollingId;
			userInteractionApi.getByInteractionId(id, callback, errCallback)
        },
        getPolling(id) {
			const callback = (response) => {
				const polling = response.data;
				this.polling = polling;
                this.connectToSocket()
                this.fetchUserInteractions()
			};
			const errorCallback = (e) => {
				const message = getAxiosErrorMessage(e);
				this.$notify({
					group: 'app',
					type: 'error',
					title: this.$t('Pooling'),
					text: message,
				});
			};
			interactionsApi.get(id, callback, errorCallback);
		},
		connectToSocket() {
			const roomId = `room_interaction_${this.polling.id}`;
			this.$socket.client.emit('join', roomId);
		},
    }
}
</script>

<style lang="scss" scoped>
.page-error {
}
</style>
