<template>
    <div>
        <div v-for="(polling, index) in contentPolling" :key="index" class="d-flex">
            <button @click="pick(polling.key)" class="mb-4 mr-4" > {{ polling.key }} </button> {{ polling.name }}
        </div>
    </div>
</template>

<script>
import interactionsApi from '../api/interaction.js'


export default {
	name: 'InteractionPreview',
	components: {

    },
	data() {
		return {
            polling: null,
            selectedPolling: null,
            pollingId: null
        };
	},
	sockets: {

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
        getPolling(id) {
			const callback = (response) => {
				const polling = response.data;
                console.log(polling)
				this.polling = polling;
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
    }
}
</script>

<style lang="scss" scoped>
.page-error {
}
</style>
