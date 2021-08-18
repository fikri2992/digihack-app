<template>
    <div class="page-container">
        <div class="cards d-flex " v-for="(user, index) in users" :key="index">
            <!-- offer -->
            <div class="card--blue mr-3 pointer" >
                <div class="card-body" > 
                    <div class="card-featured">
                        <img   :src="user.picture ? user.picture: 'logo.png'" width="70"> 
                    </div>
                   {{ user.name }}
                </div>
            </div>
        </div>
  </div>
</template>

<script>
import userApi from '../api/users'
export default {
	name: 'OfferEditor',
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
    },
	destroyed() {},
	beforeDestroy() {
	},
	computed: {},
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
        }
    },
};
</script>

<style lang="scss" scoped>
.page-error {
}
</style>
