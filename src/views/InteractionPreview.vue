<template>
	<div>
		<div class="text-center"><h1 v-if="polling && polling.message">{{ polling.message  }}</h1></div>
		<div class="d-flex" style="margin-top:35vh; margin-left:29vh">
			<div class="d-flex">
				<div v-for="(polling, index) in contentPolling" :key="index" class="text-center">
					<div>
						<img  style="width:300px; height:150px;"  class="mb-3 mr-4" v-if="polling && polling.url" :src="`${env}/uploads/${polling.url}`" alt="">
					</div>
					<button style="width:300px; height:150px;" @click="showPolling(index+1)" class="mb-2 mr-4 btn btn-primary" > {{ polling.name }} </button>
				</div>
			</div>
		</div>
		<modal
			size="small-medium"
			:hide-footer="true"
			@close="close"
			v-if="showVerifyModal"
			>
			<template slot="header">
				<h3 class="text-white">{{ $t('Verifikasi Polling') }}</h3>
			</template>
			<template slot="body">
				Untuk melanjutkan polling <span class="text-primary">{{namePolling}}</span>, silahkan isi nomor Hp. untuk dikirimkan kode verifikasi
				<form @submit.prevent="save" style="max-height: 550px; overflow-y: auto">
					<div class="text-center">
						<md-field class="input text-center">
							<md-input type="number" class="text-center" v-model="phone" style="font-size: 2em; color: orange;"></md-input>
						</md-field>
					</div>
				</form>
				<!-- Submit -->
				<button
					@click="sendSms"
					type="submit"
					class="btn btn-submit btn-primary mt-3 text-center"
					:disabled="!phone"
					:class="{ 'is-loading': isSaving }">
					{{ $t('Kirim Kode') }}
				</button>
			</template>
		</modal>
		<modal
			size="small-medium"
			:hide-footer="true"
			@close="close"
			v-if="showVerifyCodeModal"
			>
			<template slot="header">
				<h3 class="text-white">{{ $t('Verifikasi Polling') }}</h3>
			</template>
			<template slot="body">
				Untuk melanjutkan polling <span class="text-primary">{{namePolling}}</span>, silahkan isi verifikasi kode yang dikirimkan melalui SMS
				<form @submit.prevent="save" style="max-height: 550px; overflow-y: auto">
					<div class="text-center">
						<md-field class="input text-center">
							<md-input type="number" class="text-center" v-model="codesms" style="font-size: 2em; color: orange;"></md-input>
						</md-field>
					</div>
				</form>
				<!-- Submit -->
				<button
					@click="verifyCode"
					type="submit"
					class="btn btn-submit btn-primary mt-3 text-center"
					:disabled="!codesms"
					:class="{ 'is-loading': isSaving }">
					{{ $t('Verifikasi') }}
				</button>
			</template>
		</modal>
	</div>
</template>

<script>
import interactionsApi from '../api/interaction.js'
import userInteraction from '../api/userInteraction.js'
import Modal from '@/components/Modal.vue';

export default {
	name: 'InteractionPreview',
	components: {
		Modal,
    },
	data() {
		return {
            polling: null,
            selectedPolling: null,
            pollingId: null,
			env: process.env.VUE_APP_API_URL,
			showVerifyModal: false,
			showVerifyCodeModal: false,
			phone: 62,
			codesms: '',
			codesmsResponse: '',
			isSaving: false,
			indexPolling: 0,
			namePolling: '',
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
		close() {
			this.showVerifyModal = false;
			this.showVerifyCodeModal = false;
		},
		showPolling(indexPolling) {
			this.indexPolling = index;
			const isCannotAccess = localStorage.getItem('isCannotAccess');
			if (isCannotAccess == this.polling.id) {
				this.$notify({
					group: 'app',
					type: 'warning',
					title: this.$t('polling'),
					text: 'You are already polling on this section',
				});
			} else {
				this.showVerifyModal = true;
			}
			const index = this.contentPolling.findIndex(({ key }) => key === indexPolling);
			if (index !== -1) {
				this.namePolling = this.contentPolling[index] && this.contentPolling[index].name ? this.contentPolling[index].name : '';
			}
		},
		sendSms() {
			const callback = (data) => {
				this.codesmsResponse = data;
				this.showVerifyModal = false;
				this.showVerifyCodeModal = true;
				this.codesmsResponse = `${this.polling.id}${this.phone.substring(1, 4)}`;

			};
			const errCallback = (e) => {
				console.log(e)
			};
			const params = {
				interaction_id: this.polling.id,
				phone: this.phone,
				message: `${this.polling.id}${this.phone.substring(1, 4)}`
			}
			userInteraction.sendSmsVerif(params, callback, errCallback)
		},
		verifyCode() {
			if (this.codesms === this.codesmsResponse) this.pick(this.indexPolling);
			this.showVerifyModal = false;
			this.showVerifyCodeModal = false;
			this.codesms = '';
		},
		pick(key) {
			const callback = (data) => {
				this.$notify({
					group: 'app',
					type: 'success',
					title: this.$t('polling'),
					text: 'Polling success',
				});
				localStorage.setItem('isCannotAccess', this.polling.id);
			};
			const errCallback = (e) => {
				this.$notify({
					group: 'app',
					type: 'error',
					title: this.$t('polling'),
					text: 'Polling went wrong',
				});
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
