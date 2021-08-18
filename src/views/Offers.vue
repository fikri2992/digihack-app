<template>
<div>
    <div class="page-container">
        <div class="cards d-flex " v-for="(user, index) in users" :key="index">
            <!-- offer -->
            <div class="card--blue mr-3 pointer" @click="goTo(user.id)">
                <div class="card-body"> 
                    <div class="card-featured">
                        <img  :src="user.picture ? user.picture: 'logo.png'" width="70"> 
                    </div>
                   {{ user.name }}
                </div>
            </div>
        </div>
    <!-- <md-table v-model="users" md-card>
    <md-table-toolbar>
        <h1 class="md-title">Users</h1>
    </md-table-toolbar>
    <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>
        <md-table-cell md-label="Name" md-sort-by="name">{{ item.name }}</md-table-cell>
        <md-table-cell md-label="Email" md-sort-by="email">{{ item.email }}</md-table-cell>
    </md-table-row>
    </md-table> -->
    </div>
</div>
</template>

<script>
import userApi from '../api/users'
export default {
	name: 'Error404',
	components: {

    },
	data() {
		return {
            users: null,
        };
	},
	sockets: {
	},
	mounted() {},
	created() {
        this.getAllStreamer();
    },
	destroyed() {},
	beforeDestroy() {
	},
	computed: {},
	methods: {
        goTo(id) {
            console.log("asdasdasd")
            this.$router.push(`/offer/${id}`)
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
        }
    },
};
</script>

<style lang="scss" scoped>
.page-error {
}
</style>
