<template>
<div class="page page-template">
	<label class="btn btn-primary text-black pointer">'
		<span class="">Upload</span>
		<input type="file" class="hidden" @change="addMedia" accept=".png,.gif,.jpeg,.jpg"/>
	</label>
	<div>
		<div class="cards d-flex">
			<!-- offer -->
			<div v-for="item in medias" :key="item.id" class="card--blue mr-3">
				<div class="card-body"> 
					<div class="card-featured">
						<img alt="Engage More" :src="item.url">
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
</template>

<script>
import mediasApi from '@/api/media';


export default {
	name: 'AdMedia',
	components: {},
	data() {
		return {
			medias: [],
			isFetching: false,
			isUploadingPicture: false,
		};
	},
	sockets: {},
	computed: {},
	methods: {
		addMedia(e) {
			const files = e.target.files;
			if (files.length > 0) {
				if (files[0].type === 'image/jpeg' || files[0].type === 'image/gif' || files[0].type === 'image/png' || files[0].type === 'image/jpg') {
					this.isUploadingPicture = true;
					const file = files[0];
					if (!file) {
						this.$notify({
							group: 'app',
							type: 'warn',
							title: 'Upload File',
							text: 'Sorry, currently we cant upload the file',
						});
						return;
					}
					const params = new FormData();
					params.append('file', file);
					params.user_id = 3;
					params.filetype = 'png';  
					const callback = (response) => {
						console.log(response);
						this.isUploadingPicture = false;
					};
					const errorCallback = () => {
						this.isUploadingPicture = false;
					};
					mediasApi.upload(params, callback, errorCallback);

				} else {
					this.$notify({
						group: 'app',
						type: 'warning',
						title: 'Upload Media',
						text: 'Unsupported file',
					});
					// eslint-disable-next-line
					return;
				}
			}
		},
		fetchMedia() {
			this.isFetching = true;
			const callback = (response) => {
				const items = response.data;
				this.medias = items;
				this.isFetching = false;
			};
			const errorCallback = (e) => {
				const message = getAxiosErrorMessage(e);
				this.$notify({
					group: 'app',
					type: 'error',
					title: 'Users',
					text: message,
				});
				this.isFetching = false;
			};
			const params = {
				page: 1,
				limit: 8,
				order_by: 'created)at',
				sort_by: 'desc',
			}
			mediasApi.getList(params, callback, errorCallback);
		}
	},
	watch: {},
	mounted() {},
	created() {
		this.fetchMedia();
	},
	destroyed() {},
	beforeDestroy() {},
};
</script>

<style lang="scss" scoped>
.page-template {
}
</style>
