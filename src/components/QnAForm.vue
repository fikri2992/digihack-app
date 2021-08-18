<template>
	<modal
		size="small-medium"
		:hide-footer="true"
		@close="close">
		<template slot="header">
			<h3 class="text-white" v-if="!data">{{ $t('Add QNA') }}</h3>
			<h3 class="text-white" v-else-if="data && !status">{{ $t('Edit QNA') }}</h3>
		</template>
		<template slot="body">
			<form @submit.prevent="save" style="max-height: 550px; overflow-y: auto">
				<div>
					<md-field class="input">
						<label>name</label>
						<md-input v-model="name"></md-input>
					</md-field>
				</div>
				<div>
					<md-field class="input">
						<label>Description</label>
						<md-input v-model="description"></md-input>
					</md-field>
				</div>
				<!-- <div>
					<md-field class="input">
						<label>Content</label>
						<md-input v-model="content"></md-input>
					</md-field>
				</div>
				<div>
					<md-field class="input">
						<label>Status</label>
						<md-input v-model="status"></md-input>
					</md-field>
				</div> -->
				<!-- checkbox -->
				<div class="d-flex justify-content-between mt-2">
					<!-- Is Publish -->
					<label class="custom-control custom-checkbox mb-3">
						<input type="checkbox" class="custom-control-input" v-model="isPublish">
						<span class="custom-control-label pt-1">{{ $t('Published') }}</span>
					</label>
				</div>
			</form>
			<!-- Submit -->
			<button v-if="!data"
				@click="save"
				type="submit"
				class="btn btn-submit btn-primary mt-3"
				:disabled="isFormValid"
				:class="{ 'is-loading': isSaving }">
				{{ $t('Create QNA') }}
			</button>
			<button v-else-if="data && !status"
				@click="save"
				type="submit"
				:disabled="isFormValid"
				class="btn btn-submit btn-primary mt-3"
				:class="{ 'is-loading': isSaving }">
				{{ $t('Update QNA') }}
			</button>
			<button v-else-if="status"
				@click="save"
				type="submit"
				:disabled="isFormValid"
				class="btn btn-submit btn-primary mt-3"
				:class="{ 'is-loading': isSaving }">
				{{ $t('Create Sub QNA') }}
			</button>
		</template>
	</modal>
</template>

<script>
import Modal from '@/components/Modal.vue';
import { getAxiosErrorMessage } from '@/lib/helper';
import interactionsApi from '@/api/interaction';

export default {
	name: 'InteractionForm',
	props: {
		data: {
			type: Object,
		},
	},
	components: {
		Modal,
	},
	data() {
		return {
			name: '',
			description: '',
			type: 'qna',
			content: '',
			status: '',
			isPublish: true,
			isSaving: false,
		};
	},
	methods: {
		save() {
			this.isSaving = true;
			const params = this.params;
			const callback = (response) => {
				const qna = response.data;
				const message = response.message;
				this.$emit('saved', qna);
				this.$notify({
					group: 'app',
					type: 'success',
					title: this.$t('qna'),
					text: message,
				});
				this.isSaving = false;
				this.close();
			};
			const errorCallback = (e) => {
				const message = getAxiosErrorMessage(e);
				this.$notify({
					group: 'app',
					type: 'error',
					title: this.$t('qna'),
					text: message,
				});
				this.isSaving = false;
			};
			if (this.data) {
				interactionsApi.update(this.data.id, params, callback, errorCallback);
			} else {
				interactionsApi.create(params, callback, errorCallback);
			}
		},
		close() {
			this.$emit('close');
		},
		initData() {
			this.reset();
			if (this.data) {
				this.setData(this.data);
			}
		},
		reset() {
			this.name = '';
			this.description = '';
			this.type = 'qna';
			this.content = '';
			this.status = '';
			this.isPublish = true;
		},
		setData(data) {
			this.name = data.name;
			this.description = data.description;
			this.type = data.type;
			this.content = data.content;
			this.status = data.status;
			this.isPublish = data.is_published;
		},
	},
	computed: {
		params() {
			const params = {
				name: this.name,
				description: this.description,
				type: this.type,
				content: this.content,
				status: this.status,
				is_published: this.isPublish,
			};
			return params;
		},
		isFormValid() {
			return (
				!this.name
			);
		},
	},
	created() {
		this.initData();
	},
};
</script>
