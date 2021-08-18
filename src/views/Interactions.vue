<template>
	<div>
		<!-- pollings -->
		<div v-if="activeRouteName === 'Pollings'">
			<div>
				<!-- section 1 -->
				<div v-if="!selectedPolling" class="disabled-section">
				</div>
				<div class="d-flex">
					<md-button class="btn-primary ml-0">Generate Embedable URL</md-button>
				</div>
				<div class="d-flex">
					<md-field class="input col-md-4 mr-4 mb-0">
							<label>Option</label>
						<md-input :disabled="contentPolling && contentPolling.length === 4" v-model="nameOption"></md-input>
					</md-field>
					<md-button @click="addOptions" :disabled="contentPolling && contentPolling.length === 4" class="btn-primary ml-0">Add Options <span v-if="selectedPolling">to {{selectedPolling.name}}</span></md-button>
				</div>
				<label class="text-small text-grey">Maximum Options is 4</label>

				<pollings @close="showPollingModal = false" @saved="insertItemPolling" v-if="showPollingModal" :data="selectedPolling"/>
				<section class="half"  style="overflow: hidden">
					<div v-for="item in contentPolling" :key="item.key">
						<md-field class="input w-58">
							{{item.name}}
						</md-field>
					</div>
					<div>Message</div>
					<textarea id="w3review" name="w3review" rows="3" class="w-58" style="margin-top: auto;"></textarea>
				</section>
				<!-- section 2 -->
				<section class="half">
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
								<td @click="selectPolling(item)" class="pt-3 pointer" :class="{'active-table': selectedPolling && selectedPolling.id === item.id}">{{ numberingList(index) }}</td>
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
				</section>
			</div>
		</div>
		<!-- qna -->
		<div v-if="activeRouteName === 'QNAS'">

		</div>
	</div>
</template>

<script>
import Pollings from '@/components/PollingForm.vue';
import QNAS from '@/components/QnAForm.vue';
import Pagination from '@/components/Pagination.vue';
import interactionsApi from '@/api/interaction';
import { getAxiosErrorMessage } from '@/lib/helper';


export default {
	name: 'Interactions',
	components: {
		Pollings,
		QNAS,
		Pagination,
	},
	data() {
		return {
			name: '',
			description: '',
			type: '',
			content: '',
			status: '',
			isPublish: true,
			// polling
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
			isRemovingPollling: false,
			isSavingOptionsPoling: false,
			nameOption: '',
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
			const content = this.selectedPolling && this.selectedPolling.content && this.selectedPolling.content.length > 0 ? 
			JSON.parse(this.selectedPolling.content) : null;
			return content;
		},
	},
	methods: {
		fetchPolling(reset = false, page) {
			this.isFetchingPolling = true;
			if (reset) {
				this.page = 1;
				this.pollings = [];
			}
			if (page) this.page = page;
			const params = this.fetchParams;
			const callback = (response) => {
				const pollings = response.data;
				if (pollings.length < this.limit) this.isAll = true;
				this.pollings = pollings;
				this.totalpollings = response.total;
				this.lastPage = response.lastPage;
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
			this.fetch(true, page);
		},
		numberingList(index) {
			if (this.page >= 1) {
				return index + 1 + (this.page * 10 - 10);
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
			console.log(index)
		},
		editItemPolling(item) {
			this.selectedPolling = item;
			this.showPollingModal = true;
		},
		removeItemPolling(item) {
			this.isRemovingPollling = true;
			const callback = (response) => {
				const message = response.message;
				const index = this.pollings.findIndex(({ id }) => id === item.id);
				if (index !== -1) {
					this.pollings.splice(index, 1);
				}
				this.isRemovingPollling = false;
				this.$notify({
					group: 'app',
					type: 'success',
					title: this.$t('Remove Category'),
					text: message,
				});
				this.fetchPolling();
			};
			const errorCallback = () => {
				this.isRemovingPollling = false;
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
			this.selectedPolling = item;
		},
		addOptions() {
			// const content = this.contentPolling;
			console.log(this.contentPolling)
			let options = this.contentPolling ? this.contentPolling : [];
			console.log(options)
			const option = {};
			option.name = this.nameOption;
			option.key = options.length + 1;
			options.push(option);
			const resultContent = JSON.stringify(options);
			// content.options = options;
			this.isSavingOptionsPoling = true;
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
				this.isSavingOptionsPoling = false;
			};
			const errorCallback = (e) => {
				const message = getAxiosErrorMessage(e);
				this.$notify({
					group: 'app',
					type: 'error',
					title: this.$t('polling'),
					text: message,
				});
				this.isSavingOptionsPoling = false;
			};
			if (this.selectedPolling) {
				interactionsApi.update(this.selectedPolling.id, params, callback, errorCallback);
			}
		}
	},
	watch: {},
	mounted() {},
	created() {
		this.fetchPolling();
	},
	destroyed() {},
	beforeDestroy() {},
};
</script>

