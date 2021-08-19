<template>
    <div class="d-flex" style="margin-top:35vh; margin-left:25vh">
		
        <div v-for="(polling, index) in contentPolling" :key="index" class="text-center">
			<div>
           		<img  style="width:300px; height:150px;"  class="mb-3 mr-4" v-if="polling && polling.url" :src="`${env}/uploads/${polling.url}`" alt="">
        	</div>
            <button style="width:300px; height:150px;" @click="pick(index+1)" class="mb-2 mr-4" > {{ polling.name }} </button> 
        </div>
    </div>
</template>

<script>
import interactionsApi from '../api/interaction.js'
import userInteraction from '../api/userInteraction.js'

export default {
	name: 'InteractionPreview',
	components: {

    },
	data() {
		return {
            polling: null,
            selectedPolling: null,
            pollingId: null,
			env: process.env.VUE_APP_API_URL,
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
		pick(key) {

			const callback = (data) => {
				console.log(data)
			};
			const errCallback = (e) => {
				console.log(e)
			};

			const params = {
				interaction_id: this.polling.id,
				phone:'',
				answer:key,
				price:0,
			}

			userInteraction.create(params, callback, errCallback)
		},

        getPolling(id) {
			const callback = (response) => {
				const polling = response.data;
				this.polling = polling;
                this.connectToSocket()
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
