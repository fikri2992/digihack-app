<template>
	<div>
		<!-- pollings -->
		<div v-if="activeRouteName === 'Pollings'">
			<div>
				<!-- section 1 -->
				<!-- polling modal -->
				<pollings @close="showPollingModal = false" @saved="insertItemPolling" v-if="showPollingModal" :data="selectedPolling"/>
				<section class="half"  style="overflow-y: auto; overflow-x:hidden">
					<div class="grid-container">
						<div>
							<div class="d-flex justify-content-between">
								<md-button class="btn-primary ml-0" @click="copyUrl(`${envAPP}/pollings/live/${selectedPolling.id}`)" :disabled="!selectedPolling">Generate Embedable URL</md-button>
								<md-button class="btn-primary ml-0" @click="copyUrl(`${envAPP}/pollings/preview/${selectedPolling.id}`)" :disabled="!selectedPolling">Generate Shareable URL</md-button>
							</div>
							<div class="d-flex">
								<md-field class="input mb-0">
									<label>Option</label>
									<md-input :disabled="contentPolling && contentPolling.length === 4" v-model="nameOption"></md-input>
								</md-field>
								<label class="btn btn-primary pointer mr-3 ml-4" :class="{'disabled': !selectedPolling || !nameOption}">
									<svg style="width:24px;height:24px" viewBox="0 0 24 24" class="pt-1">
										<path fill="currentColor"  d="M5,3A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H14.09C14.03,20.67 14,20.34 14,20C14,19.32 14.12,18.64 14.35,18H5L8.5,13.5L11,16.5L14.5,12L16.73,14.97C17.7,14.34 18.84,14 20,14C20.34,14 20.67,14.03 21,14.09V5C21,3.89 20.1,3 19,3H5M19,16V19H16V21H19V24H21V21H24V19H21V16H19Z" />
									</svg>
									<input type="file" @change="addmedia" class="hidden" accept=".png,.gif,.jpeg,.jpg"/>
								</label>
								<md-button @click="addOptions" :disabled="(contentPolling && contentPolling.length === 4) || !selectedPolling || !nameOption" class="btn-primary ml-0 pl-2 pr-2 mt-0 text-black" style="height: 45px">
									<span class="pl-2 pr-2">Add Options</span>
								</md-button>
							</div>
							<label class="text-small text-grey">Maximum Options is 4</label>
							<div v-for="(item, index) in contentPolling" :key="index">
								<div class="d-flex">
									<md-field class="input">
										{{item.name}}
									</md-field>
									<div class="text-center mt-3 mr-3 ml-3" style="height: 40px; width: 40px">
										<img v-if="item.url" alt="Engage More" width="60px" height="60px" :src="`${env}/uploads/${item.url}`">
									</div>
									<div @click="removeOption(item.key)" class="mt-3 pointer">
										<svg style="width:24px;height:24px" viewBox="0 0 24 24">
											<path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
										</svg>
									</div>
								</div>
							</div>
							<div>Message</div>
							<textarea id="w3review" name="w3review" v-model="message" rows="1" style="width: 100%; margin-top: auto;" @blur="onKeywordChange"></textarea>
						</div>
						<!-- table list -->
						<div>
							<!-- Table Menu -->
							<div class="action-container row">
								<div class="col-md-6 mb-2">
									<div class="d-flex justify-content-start">
										<div>
											<button
												class="btn btn-submit btn-default text-white mr-2"
												@click="addItemPolling">
												{{ $t('Add Polling') }}
											</button>
										</div>
									</div>
								</div>
							</div>
							<!-- Main Table -->
							<div class="table-responsive">
								<table class="table table-striped mb-4 mt-2">
									<thead>
										<tr>
											<th>{{ $t('No') }}</th>
											<th width="30%">{{ $t('Name') }}</th>
											<th width="40%">{{ $t('Description') }}</th>
											<th width="10%">{{ $t('') }}</th>
										</tr>
									</thead>
									<div class="p-5 text-center absolute" v-if="isFetchingPolling">
										<div class="is-loading large"></div>
									</div>
									<tr
										v-for="(item, index) in pollings"
										:key="item.id">
										<td @click="selectPolling(item)" class="pt-3 pointer" :class="{'active-table': selectedPolling && selectedPolling.id === item.id}">{{ numberingListPolling(index) }}</td>
										<td @click="selectPolling(item)" class="pt-3 pointer" :class="{'active-table': selectedPolling && selectedPolling.id === item.id}"><div class="truncate-description-category">{{item.name }}</div></td>
										<td @click="selectPolling(item)" class="pt-3 pointer" :class="{'active-table': selectedPolling && selectedPolling.id === item.id}"><div class="truncate-description-category">{{item.description }}</div></td>
										<td :class="{'active-table': selectedPolling && selectedPolling.id === item.id}">
											<md-menu md-align-trigger :md-offset-x="-40" class="pointer">
												<div md-menu-trigger>
													<svg style="width:24px;height:24px" viewBox="0 0 24 24">
														<path fill="currentColor" d="M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z" />
													</svg>
												</div>
												<md-menu-content>
													<md-menu-item @click="editItemPolling(item)"><span class="minw-87">{{ $t('Edit') }}</span></md-menu-item>
													<md-menu-item @click="removeItemPolling(item)"><span class="minw-87">{{ $t('Delete') }}</span></md-menu-item>
												</md-menu-content>
											</md-menu>
										</td>
										<!-- sub categories -->
									</tr>
								</table>
							</div>
							<!-- no data available -->
							<div class="text-center" v-if="pollings.length === 0 && !isFetchingPolling">{{$t('No Polling available')}}</div>
							<!-- Table Pagination -->
							<pagination
								:total-pages="totalPagesPolling"
								:current-page="pagePolling"
								:last-page="lastPagePolling"
								@select="onPageSelectedPolling">
							</pagination>
						</div>
					</div>
				</section>
				<!-- section 2 -->
				<section class="half">
					<div>
						<chart v-if="contentPolling && contentPolling.length>0 && selectedPolling" :interactionId="selectedPolling.id" :polling="contentPolling" :userPolling="filteredUserInteraction"></chart>
					</div>
				</section>
			</div>
		</div>
		<!-- qna -->
		<div v-if="activeRouteName === 'QNAS'">
						<div>
				<!-- section 1 -->
				<!-- QNA modal -->
				<QNAS @close="showQNAModal = false" @saved="insertItemQNA" v-if="showQNAModal" :data="selectedQNA"/>
				<section class="half"  style="overflow: hidden">
					<div class="grid-container">
						<div>
							<div class="d-flex">
								<md-button class="btn-primary ml-0" :disabled="!selectedQNA">Generate Embedable URL</md-button>
							</div>
							<div class="d-flex">
								<md-field class="input mb-0">
										<label>Question</label>
									<md-input :disabled="contentQNA && contentQNA.length === 4" v-model="nameOptionQNA"></md-input>
								</md-field>
								<md-button @click="addOptionsQNA" :disabled="(contentQNA && contentQNA.length === 4) || !selectedQNA || !nameOptionQNA" class="btn-primary ml-0 pl-2 pr-2 text-black">
									<span class="pl-2 pr-2">Add Question</span>
								</md-button>
							</div>
							<label class="text-small text-grey">Maximum Question is 4</label>
							<div v-for="(item,index) in contentQNA" :key="index">
								<div class="d-flex">
									<md-field class="input">
										{{item.name}}
									</md-field>
									<div @click="removeOptionQNA(item.key)" class="mt-3 pointer">
										<svg style="width:24px;height:24px" viewBox="0 0 24 24">
											<path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
										</svg>
									</div>
								</div>
							</div>
							<div>Message</div>
							<textarea id="w3review" name="w3review" v-model="messageQNA" rows="3" style="width: 100%; margin-top: auto;" @blur="onKeywordChangeQNA"></textarea>
						</div>
						<!-- table list -->
						<div>
							<!-- Table Menu -->
							<div class="action-container row">
								<div class="col-md-6 mb-2">
									<div class="d-flex justify-content-start">
										<div>
											<button
												class="btn btn-submit btn-default text-white mr-2"
												@click="addItemQNA">
												{{ $t('Add QnA') }}
											</button>
										</div>
									</div>
								</div>
							</div>
							<!-- Main Table -->
							<div class="table-responsive">
								<table class="table table-striped mb-4 mt-2">
									<thead>
										<tr>
											<th>{{ $t('No') }}</th>
											<th>{{ $t('Name') }}</th>
											<th>{{ $t('Description') }}</th>
											<th>{{ $t('') }}</th>
										</tr>
									</thead>
									<div class="p-5 text-center absolute" v-if="isFetchingQNA">
										<div class="is-loading large"></div>
									</div>
									<tr
										v-for="(item, index) in filteredQNAS"
										:key="item.id">
										<td @click="selectQNA(item)" class="pt-3 pointer" :class="{'active-table': selectedQNA && selectedQNA.id === item.id}">{{ numberingListQNA(index) }}</td>
										<td @click="selectQNA(item)" class="pt-3 pointer" :class="{'active-table': selectedQNA && selectedQNA.id === item.id}"><div class="truncate-description-category">{{item.name }}</div></td>
										<td @click="selectQNA(item)" class="pt-3 pointer" :class="{'active-table': selectedQNA && selectedQNA.id === item.id}"><div class="truncate-description-category">{{item.description }}</div></td>
										<td :class="{'active-table': selectedQNA && selectedQNA.id === item.id}">
											<md-menu md-align-trigger :md-offset-x="-40" class="pointer">
												<div md-menu-trigger>
													<svg style="width:24px;height:24px" viewBox="0 0 24 24">
														<path fill="currentColor" d="M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z" />
													</svg>
												</div>
												<md-menu-content>
													<md-menu-item @click="editItemQNA(item)"><span class="minw-87">{{ $t('Edit') }}</span></md-menu-item>
													<md-menu-item @click="removeItemQNA(item)"><span class="minw-87">{{ $t('Delete') }}</span></md-menu-item>
												</md-menu-content>
											</md-menu>
										</td>
									</tr>
								</table>
							</div>
							<!-- no data available -->
							<div class="text-center" v-if="QNAS.length === 0 && !isFetchingQNA">{{$t('No QNA available')}}</div>
							<!-- Table Pagination -->
							<pagination
								:total-pages="totalPagesQNA"
								:current-page="pageQNA"
								:last-page="lastPageQNA"
								@select="onPageSelectedQNA">
							</pagination>
						</div>
					</div>
				</section>
				<!-- section 2 -->
				<section class="half">
				
				</section>
			</div>
		</div>
	</div>
</template>

<script>
import Pollings from '@/components/PollingForm.vue';
import QNAS from '@/components/QnAForm.vue';
import Pagination from '@/components/Pagination.vue';
import interactionsApi from '@/api/interaction';
import userInteractionApi from '@/api/userInteraction.js';

import { getAxiosErrorMessage, delay, copyToClipboard } from '@/lib/helper';
import mediasApi from '@/api/media';
import { mapGetters } from 'vuex';

import Chart from '@/components/Chart.vue';

export default {
	name: 'Interactions',
	components: {
		Pollings,
		QNAS,
		Pagination,
		Chart
	},
	data() {
		return {
			env: process.env.VUE_APP_API_URL,
			envAPP: process.env.VUE_APP_URL,
			// polling
			name: '',
			description: '',
			type: '',
			status: '',
			isPublish: true,
			showPollingModal: false,
			pollings: [],
			pagePolling: 1,
			limitPolling: 10,
			orderByPolling: 'id',
			sortByPolling: 'asc',
			keywordPolling: '',
			selectedPolling: null,
			totalItemsPolling: 0,
			lastPagePolling: 1,
			isFetchingPolling: false,
			isRemovingPolling: false,
			isSavingOptionsPolling: false,
			nameOption: '',
			message: '',
			isUploadingPicture: false,
			// QNAS
			nameQNA: '',
			descriptionQNA: '',
			typeQNA: '',
			statusQNA: '',
			isPublishQNA: true,
			showQNAModal: false,
			QNAS: [],
			pageQNA: 1,
			limitQNA: 10,
			orderByQNA: 'id',
			sortByQNA: 'asc',
			keywordQNA: '',
			selectedQNA: null,
			totalItemsQNA: 0,
			lastPageQNA: 1,
			isFetchingQNA: false,
			isRemovingQNA: false,
			isSavingOptionsQNA: false,
			nameOptionQNA: '',
			messageQNA: '',
			urlImage: '',
			userInteractions:[],
		};
	},
	sockets: {},
	computed: {
		activeRouteName() {
			return this.$route.name;
		},
		totalPagesPolling() {
			const total = Math.ceil(this.totalItemsPolling / this.limitPolling);
			return total;
		},
		contentPolling() {
			const content = this.selectedPolling && this.selectedPolling.content && this.selectedPolling.content.length > 0 ? JSON.parse(this.selectedPolling.content) : null;
			
			return content;
		},
		totalPagesQNA() {
			const total = Math.ceil(this.totalItemsQNA / this.limitQNA);
			return total;
		},
		contentQNA() {
			const content = this.selectedQNA && this.selectedQNA.content && this.selectedQNA.content.length > 0 ? JSON.parse(this.selectedQNA.content) : null;
			return content;
		},
		filteredQNAS() {
			const filter = item => (item.type === 'qna');
			return this.QNAS.filter(filter);
			
		},
		fetchParamsPolling() {
			const params = {
				page: this.pagePolling,
				limit: this.limitPolling,
				order_by: 'created_at',
				sort_by: this.sortByPolling,
				type: 'polling',
			};
			return params;
		},
		fetchParamsQNA() {
			const params = {
				page: this.pageQNA,
				limit: this.limitQNA,
				order_by: 'created_at',
				sort_by: this.sortByQNA,
				type: 'qna',
			};
			return params;
		},
		filteredUserInteraction() {
			return this.userInteractions;
		},
		...mapGetters({
			user: 'user',
		}),
	},
	methods: {
		fetchPolling(reset = false, page) {
			this.isFetchingPolling = true;
			if (reset) {
				this.pagePolling = 1;
				this.pollings = [];
			}
			if (page) this.pagePolling = page;
			const params = this.fetchParamsPolling;
			const callback = (response) => {
				const pollings = response.data;
				if (pollings.length < this.limit) this.isAll = true;
				this.pollings = pollings;
				const filter = item => (item.type === 'polling');
				this.pollings.filter(filter);
				this.totalItemsPolling = response.total;
				this.lastPagePolling = response.lastPage;
				this.isFetchingPolling = false;
			};
			const errorCallback = (e) => {
				const message = getAxiosErrorMessage(e);
				this.$notify({
					group: 'app',
					type: 'error',
					title: this.$t('Pooling'),
					text: message,
				});
				this.isFetchingPolling = false;
			};
			interactionsApi.getAll(params, callback, errorCallback);
		},
		addItemPolling() {
			this.selectedPolling = null;
			this.showPollingModal = true;
		},
		onPageSelectedPolling() {
			this.fetchPolling(true, page);
		},
		numberingListPolling(index) {
			if (this.pagePolling >= 1) {
				return index + 1 + (this.pagePolling * 10 - 10);
			}
			return index + 1;
		},
		insertItemPolling(item) {
			const index = this.pollings.findIndex(({ id }) => id === item.id);
			if (index === -1) {
				this.pollings.push(item);
				this.selectedPolling = item;
			} else {
				this.selectedPolling = (item);
				this.$set(this.pollings, index, item);
			}
		},
		editItemPolling(item) {
			this.selectedPolling = item;
			this.showPollingModal = true;
		},
		removeItemPolling(item) {
			this.isRemovingPolling = true;
			const callback = (response) => {
				const message = response.message;
				const index = this.pollings.findIndex(({ id }) => id === item.id);
				if (index !== -1) {
					this.pollings.splice(index, 1);
				}
				this.isRemovingPolling = false;
				this.$notify({
					group: 'app',
					type: 'success',
					title: this.$t('Remove Category'),
					text: message,
				});
				this.fetchPolling();
			};
			const errorCallback = () => {
				this.isRemovingPolling = false;
				this.$notify({
					group: 'app',
					type: 'error',
					title: this.$t('Remove Category'),
					text: 'Something Wrong',
				});
			};
			interactionsApi.delete(item.id, callback, errorCallback);
		},
		selectPolling(item) {
			
			const callback = (response)=> {
				this.userInteractions = response.data;
				this.selectedPolling = item;
			}
			const errCallback = () => {

			}
			const id= item.id;
			userInteractionApi.getByInteractionId(id, callback, errCallback)
		},	
		addmedia(e) {
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
					params.append('user_id', this.user && this.user.id ? this.user.id : '');
					const type = files[0].type.replace('image/','');
					params.append('filetype', type);  
					const callback = (response) => {
						const item = response.data;
						this.urlImage = item.url;
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
		addOptions() {
			// const content = this.contentPolling;
			let options = this.contentPolling ? this.contentPolling : [];
			console.log(options)
			const option = {};
			option.name = this.nameOption;
			option.key = options.length + 1;
			option.url = this.urlImage;
			options.push(option);
			const resultContent = JSON.stringify(options);
			// content.options = options;
			this.isSavingOptionsPolling = true;
			const params = {
				name: this.selectedPolling.name,
				description: this.selectedPolling.description,
				type: this.selectedPolling.type,
				content: resultContent,
				status: this.selectedPolling.status,
				is_published: this.selectedPolling.isPublish,
			}
			const callback = (response) => {
				const polling = response.data;
				const message = response.message;
				this.insertItemPolling(polling);
				this.$notify({
					group: 'app',
					type: 'success',
					title: this.$t('polling'),
					text: message,
				});
				this.nameOption = '';
				this.isSavingOptionsPolling = false;
			};
			const errorCallback = (e) => {
				const message = getAxiosErrorMessage(e);
				this.$notify({
					group: 'app',
					type: 'error',
					title: this.$t('polling'),
					text: message,
				});
				this.isSavingOptionsPolling = false;
			};
			if (this.selectedPolling) {
				interactionsApi.update(this.selectedPolling.id, params, callback, errorCallback);
			}
		},
		updatePolling(content) {
			const params = {
				name: this.selectedPolling.name,
				description: this.selectedPolling.description,
				type: this.selectedPolling.type,
				content: content,
				status: this.selectedPolling.status,
				is_published: this.selectedPolling.isPublish,
				message: this.message,
			}
			const callback = (response) => {
				const polling = response.data;
				const message = response.message;
				this.insertItemPolling(polling);
				this.$notify({
					group: 'app',
					type: 'success',
					title: this.$t('polling'),
					text: message,
				});
				this.nameOption = '';
				this.isSavingOptionsPolling = false;
			};
			const errorCallback = (e) => {
				const message = getAxiosErrorMessage(e);
				this.$notify({
					group: 'app',
					type: 'error',
					title: this.$t('polling'),
					text: message,
				});
				this.isSavingOptionsPolling = false;
			};
			if (this.selectedPolling) {
				interactionsApi.update(this.selectedPolling.id, params, callback, errorCallback);
			}
		},
		removeOption(keyOption) {
			const index = this.contentPolling.findIndex(({ key }) => key === keyOption);
			if (index !== -1) {
				this.contentPolling.splice(index, 1);
			}
			const content = JSON.stringify(this.contentPolling);
			this.updatePolling(content);
		},
		onKeywordChange() {
			this.updatePolling();
		},
		fetchQNA(reset = false, page) {
			this.isFetchingQNA = true;
			if (reset) {
				this.pageQNA = 1;
				this.QNAS = [];
			}
			if (page) this.pageQNA = page;
			const params = this.fetchParamsQNA;
			const callback = (response) => {
				const QNAS = response.data;
				if (QNAS.length < this.limit) this.isAll = true;
				this.QNAS = QNAS;
				this.totalQNAS = response.total;
				this.lastPageQNAS = response.lastPage;
				this.isFetchingQNA = false;
			};
			const errorCallback = (e) => {
				const message = getAxiosErrorMessage(e);
				this.$notify({
					group: 'app',
					type: 'error',
					title: this.$t('Pooling'),
					text: message,
				});
				this.isFetchingQNA = false;
			};
			interactionsApi.getAll(params, callback, errorCallback);
		},
		addItemQNA() {
			this.selectedQNA = null;
			this.showQNAModal = true;
		},
		onPageSelectedQNA() {
			this.fetchQNA(true, page);
		},
		numberingListQNA(index) {
			if (this.pageQNA >= 1) {
				return index + 1 + (this.pageQNA * 10 - 10);
			}
			return index + 1;
		},
		insertItemQNA(item) {
			const index = this.QNAS.findIndex(({ id }) => id === item.id);
			if (index === -1) {
				this.QNAS.push(item);
				this.selectedQNA = item;
			} else {
				this.selectedQNA = (item);
				this.$set(this.QNAS, index, item);
			}
		},
		editItemQNA(item) {
			this.selectedQNA = item;
			this.showQNAModal = true;
		},
		removeItemQNA(item) {
			this.isRemovingQNA = true;
			const callback = (response) => {
				const message = response.message;
				const index = this.QNAS.findIndex(({ id }) => id === item.id);
				if (index !== -1) {
					this.QNAS.splice(index, 1);
				}
				this.isRemovingQNA = false;
				this.$notify({
					group: 'app',
					type: 'success',
					title: this.$t('Remove QNA'),
					text: message,
				});
				this.fetchQNA();
			};
			const errorCallback = () => {
				this.isRemovingQNA = false;
				this.$notify({
					group: 'app',
					type: 'error',
					title: this.$t('Remove QNA'),
					text: 'Something Wrong',
				});
			};
			interactionsApi.delete(item.id, callback, errorCallback);
		},
		selectQNA(item) {
			this.selectedQNA = item;
		},
		addOptionsQNA() {
			// const content = this.contentPolling;
			let options = this.contentQNA ? this.contentQNA : [];
			const option = {};
			option.name = this.nameOptionQNA;
			option.key = options.length + 1;
			options.push(option);
			const resultContent = JSON.stringify(options);
			// content.options = options;
			this.isSavingOptionsQNA = true;
			const params = {
				name: this.selectedQNA.name,
				description: this.selectedQNA.description,
				type: this.selectedQNA.type,
				content: resultContent,
				status: this.selectedQNA.status,
				is_published: this.selectedQNA.isPublish,
			}
			const callback = (response) => {
				const qna = response.data;
				const message = response.message;
				this.insertItemQNA(qna);
				this.$notify({
					group: 'app',
					type: 'success',
					title: this.$t('QnA'),
					text: message,
				});
				this.nameOptionQNA = '';
				this.isSavingOptionsQNA = false;
			};
			const errorCallback = (e) => {
				const message = getAxiosErrorMessage(e);
				this.$notify({
					group: 'app',
					type: 'error',
					title: this.$t('QnA'),
					text: message,
				});
				this.isSavingOptionsQNA = false;
			};
			if (this.selectedQNA) {
				interactionsApi.update(this.selectedQNA.id, params, callback, errorCallback);
			}
		},
		updateQNA(content) {
			const params = {
				name: this.selectedQNA.name,
				description: this.selectedQNA.description,
				type: this.selectedQNA.type,
				content: content,
				status: this.selectedQNA.status,
				is_published: this.selectedQNA.isPublish,
				message: this.messageQNA,
			}
			const callback = (response) => {
				const qna = response.data;
				const message = response.message;
				this.insertItemQNA(qna);
				this.$notify({
					group: 'app',
					type: 'success',
					title: this.$t('QnA'),
					text: message,
				});
				this.nameOption = '';
				this.isSavingOptionsQNA = false;
			};
			const errorCallback = (e) => {
				const message = getAxiosErrorMessage(e);
				this.$notify({
					group: 'app',
					type: 'error',
					title: this.$t('qna'),
					text: message,
				});
				this.isSavingOptionsQNA = false;
			};
			if (this.selectedQNA) {
				interactionsApi.update(this.selectedQNA.id, params, callback, errorCallback);
			}
		},
		removeOptionQNA(keyOption) {
			const index = this.contentQNA.findIndex(({ key }) => key === keyOption);
			if (index !== -1) {
				this.contentQNA.splice(index, 1);
			}
			const content = JSON.stringify(this.contentQNA);
			this.updateQNA(content);
		},
		onKeywordChangeQNA() {
			this.updateQNA();
		},
		copyUrl(data) {
			copyToClipboard(data);
			this.$notify({
				group: 'app',
				type: 'success',
				title: this.$t('URL'),
				text: 'Copied to clipboard',
			});
		},
	},
	watch: {
		selectedPolling() {
			this.message = this.selectedPolling.message;
		},
		selectedQNA() {
			this.messageQNA = this.selectedQNA.message;
		},
		activeRouteName() {
			if (this.activeRouteName === 'Pollings') {
				this.fetchPolling();
			}
			if (this.activeRouteName === 'QNAS') {
				this.fetchQNA();
			}
		}
	},
	mounted() {},
	created() {
		this.fetchQNA();
		this.fetchPolling();
	},
	destroyed() {},
	beforeDestroy() {},
};
</script>

