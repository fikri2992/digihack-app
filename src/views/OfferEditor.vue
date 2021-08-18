<template>
    <div class="page-container">
        <div class="cards d-flex">
            <!-- offer -->
            <div class="card--blue mr-3" @click="offerType('Polling')">
                <div class="card-body pointer"> 
                    Polling
                    <div class="card-featured">
                        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M7,5H21V7H7V5M7,13V11H21V13H7M4,4.5A1.5,1.5 0 0,1 5.5,6A1.5,1.5 0 0,1 4,7.5A1.5,1.5 0 0,1 2.5,6A1.5,1.5 0 0,1 4,4.5M4,10.5A1.5,1.5 0 0,1 5.5,12A1.5,1.5 0 0,1 4,13.5A1.5,1.5 0 0,1 2.5,12A1.5,1.5 0 0,1 4,10.5M7,19V17H21V19H7M4,16.5A1.5,1.5 0 0,1 5.5,18A1.5,1.5 0 0,1 4,19.5A1.5,1.5 0 0,1 2.5,18A1.5,1.5 0 0,1 4,16.5Z" />
                        </svg>
                    </div>
                </div>
            </div>
            <!-- interaction -->
            <div class="card--blue-light mr-3" @click="offerType('QnA')">
                <div class="card-body pointer"> 
                    QnA
                    <div class="card-featured">
                        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M16.5 11L13 7.5L14.4 6.1L16.5 8.2L20.7 4L22.1 5.4L16.5 11M11 7H2V9H11V7M21 13.4L19.6 12L17 14.6L14.4 12L13 13.4L15.6 16L13 18.6L14.4 20L17 17.4L19.6 20L21 18.6L18.4 16L21 13.4M11 15H2V17H11V15Z" />
                        </svg>
                    </div>
                </div>
            </div>
            <!-- banner / media -->
            <div class="card--brown" @click="offerType('Ad Banner')">
                <div class="card-body pointer"> 
                    Ad Banner
                    <div class="card-featured">
                        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M8.5,13.5L11,16.5L14.5,12L19,18H5M21,19V5C21,3.89 20.1,3 19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19Z" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
        <!-- content -->
        <h1 class="mt-5">
            {{titleOffer}}
        </h1>
        <section class="half"  style="overflow: hidden">
            <div class="grid-container">
                <div>
                    <!-- polling -->
                    <div v-if="titleOffer === 'Polling'" class="col-md-6 ml-0 pl-0">
                        <md-field class="input mb-0">
                            <label>Name</label>
                            <md-input v-model="name"></md-input>
                        </md-field>
                        <md-field class="input mb-0">
                            <label>Description</label>
                            <md-input v-model="description"></md-input>
                        </md-field>
                        <div class="md-layout-item">
                            <md-field>
                                <label>Select Polling</label>
                                <md-select v-model="interactionId" name="interantionId">
                                    <div v-for="item in interactions" :key="item.id">
                                        <md-option value="item.id" >{{item.name}}</md-option>
                                    </div>
                                </md-select>
                            </md-field>
                        </div>
                        <label class="custom-control custom-checkbox mb-3 mt-3">
                            <input type="checkbox" class="custom-control-input" v-model="isPublish">
                            <span class="custom-control-label pt-1">{{ $t('Published') }}</span>
                        </label>
                    </div>
                    <!-- qna -->
                    <div>

                    </div>
                    <!-- banner -->
                    <div>

                    </div>
                </div>
                <!-- table list -->
                <div>
                    <!-- Main Table -->
                    <div class="table-responsive">
                        <table class="table table-striped mb-4 mt-2">
                            <thead>
                                <tr>
                                    <th>{{ $t('No') }}</th>
                                    <th width="30%">{{ $t('Name') }}</th>
                                    <th width="40%">{{ $t('Description') }}</th>
                                    <th width="40%">{{ $t('Type') }}</th>
                                    <th width="10%">{{ $t('') }}</th>
                                </tr>
                            </thead>
                            <div class="p-5 text-center absolute" v-if="isFetching">
                                <div class="is-loading large"></div>
                            </div>
                            <tr
                                v-for="(item, index) in offers"
                                :key="item.id">
                                <td @click="selectOffer(item)" class="pt-3 pointer" :class="{'active-table': selectedOffer && selectedOffer.id === item.id}">{{ numberingListPolling(index) }}</td>
                                <td @click="selectOffer(item)" class="pt-3 pointer" :class="{'active-table': selectedOffer && selectedOffer.id === item.id}"><div class="truncate-description-category">{{item.name }}</div></td>
                                <td @click="selectOffer(item)" class="pt-3 pointer" :class="{'active-table': selectedOffer && selectedOffer.id === item.id}"><div class="truncate-description-category">{{item.description }}</div></td>
                                <td @click="selectOffer(item)" class="pt-3 pointer" :class="{'active-table': selectedOffer && selectedOffer.id === item.id}"><div class="truncate-description-category">{{item.type }}</div></td>
                                <td :class="{'active-table': selectedOffer && selectedOffer.id === item.id}">
                                    <md-menu md-align-trigger :md-offset-x="-40" class="pointer">
                                        <div md-menu-trigger>
                                            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                                                <path fill="currentColor" d="M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z" />
                                            </svg>
                                        </div>
                                        <md-menu-content>
                                            <md-menu-item @click="editItemOffer(item)"><span class="minw-87">{{ $t('Edit') }}</span></md-menu-item>
                                            <md-menu-item @click="removeItemOffer(item)"><span class="minw-87">{{ $t('Delete') }}</span></md-menu-item>
                                        </md-menu-content>
                                    </md-menu>
                                </td>
                                <!-- sub categories -->
                            </tr>
                        </table>
                    </div>
                    <!-- no data available -->
                    <div class="text-center" v-if="offers.length === 0 && !isFetching">{{$t('No Offer available')}}</div>
                    <!-- Table Pagination -->
                    <pagination
                        :total-pages="totalPages"
                        :current-page="page"
                        :last-page="lastPage"
                        @select="onPageSelected">
                    </pagination>
                </div>
            </div>
        </section>
        <!-- section 2 -->
        <section class="half">
        
        </section>
    </div>
</template>

<script>
import userApi from '../api/users';
import offersApi from '../api/offer';
import Pagination from '@/components/Pagination.vue';
import interactionsApi from '@/api/interaction';


export default {
	name: 'OfferEditor',
	components: {
        Pagination,
    },
	data() {
		return {
            users: null,
            titleOffer: '',
            offers: [],
            isFetching: false,
            page: 1,
            limit: 8,
            lastPage: 0,
            order_by: 'created_at',
            sort_by: 'desc',
            interactionId: '',
            status: '',
            name: '',
            description: '',
            isPublish: false,
            interactions: [],
        };
	},
	sockets: {
	},
	mounted() {},
	created() {
        this.fetchOffer();
    },
	destroyed() {},
	beforeDestroy() {
	},
	computed: {
        createParamsPolling() {
			const params = {
                user_id: this.user.id,
                client_id: this.user.id,
				name: this.name,
                description: this.description,
				type: 'Polling',
                interaction_id: this.interactionId,
                is_published: this.isPublished,
                content: this.content,
                status: this.status,
			};
			return params;
		},
		createParamsQNA() {
			const params = {
                user_id: this.user.id,
                client_id: this.user.id,
				name: this.name,
                description: this.description,
				type: 'QnA',
                interaction_id: this.interactionId,
                is_published: this.isPublished,
                content: this.content,
                status: this.status,
			};
			return params;
		},
        createParamsBanner() {
			const params = {
                user_id: this.user.id,
                client_id: this.user.id,
				name: this.name,
                description: this.description,
				type: 'Ad Banner',
                is_published: this.isPublished,
                content: this.content,
                status: this.status,

			};
			return params;
		},
        fetchParams() {
			const params = {
				page: this.pageQNA,
				limit: this.limitQNA,
				order_by: 'created_at',
				sort_by: this.sortByQNA,
			};
			return params;
		},
        totalPages() {
			const total = Math.ceil(this.totalItems / this.limit);
			return total;
		},
    },
	methods: {
        goTo(id) {
            console.log("asdasdasd")
            this.$router.push(`/${id}`)
        },
        getAllStreamer() {
            const callback = (response)=>{
                this.users = response.data;
            }
            const errCallback = (e) => {

            }
            const params = {
                role: 'user'
            }
            userApi.getList(params,callback,errCallback)
        },
        offerType(type) {
            this.titleOffer = type;
            this.fetchInteractions(type);
        },
        fetchOffer(reset = false, page) {
			this.isFetching = true;
			if (reset) {
				this.page = 1;
				this.Offers = [];
			}
			if (page) this.page = page;
			const params = this.fetchParamsOffer;
			const callback = (response) => {
				const offers = response.data;
				if (offers.length < this.limit) this.isAll = true;
				this.offers = offers;
				this.totalItems = response.total;
				this.lastPage = response.lastPage;
				this.isFetching = false;
			};
			const errorCallback = (e) => {
				const message = getAxiosErrorMessage(e);
				this.$notify({
					group: 'app',
					type: 'error',
					title: this.$t('Pooling'),
					text: message,
				});
				this.isFetching = false;
			};
			offersApi.getList(params, callback, errorCallback);
		},
        onPageSelected() {
			this.fetchOffer(true, page);
		},
        fetchInteractions(type) {
			const callback = (response) => {
				const items = response.data;
				this.interactions = items;
                if (type === 'Polling') {
                    const filter = item => (item.type === 'polling');
                    return this.interactions.filter(filter);
                }
                if (type === 'qna') {
                    const filter = item => (item.type === 'qna');
                    return this.interactions.filter(filter);
                }
			};
			const errorCallback = (e) => {
				const message = getAxiosErrorMessage(e);
				this.$notify({
					group: 'app',
					type: 'error',
					title: 'Users',
					text: message,
				});
			};
			const params = {
				page: 1,
				order_by: 'created_at',
				sort_by: 'desc',
			}
			interactionsApi.getAll(params, callback, errorCallback);
		}
    },
};
</script>

<style lang="scss" scoped>
.page-error {
}
</style>
