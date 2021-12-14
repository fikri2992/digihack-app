<template>
<div class="page page-auth">
	<div class="card auth-box">
		<div class="card-body">
			<div class="separator text-small mt-3 mb-3">Login Sicepat</div>
			<div class="card-text">
				<form @submit.prevent="login()">
					<div class="form-group">
						<label for="inputEmail">{{ $t('Email address') }}</label>
						<input type="email" class="form-control" id="inputEmail" aria-describedby="emailHelp" v-model="email">
					</div>
					<div class="form-group">
						<label for="inputPassword">{{ $t('Password') }}</label>
						<input type="password" class="form-control" id="inputPassword" autocomplete="true" v-model="password">
					</div>
					<!-- <div class="d-flex justify-content-between">
						<div><router-link to="/register" class="forgot-password-link mb-2">Daftar Streamer</router-link></div>
						<div><router-link to="/register-advetiser" class="forgot-password-link mb-2">Daftar Advetiser</router-link></div>
					</div> -->
					<hr>
					<button type="submit" class="btn btn-primary btn-block mt-4 mb-4" :class="{ 'is-loading': isSubmitting}">Login</button>
				</form>
			</div>
		</div>
	</div>
</div>
</template>

<script>

import { mapActions } from 'vuex';
import authApi from '@/api/auth';
import { getAxiosErrorMessage } from '@/lib/helper';

export default {
	name: 'Login',
	components: {},
	data() {
		return {
			email: null,
			password: null,
			lang: 'en',
			isSubmitting: false,
		};
	},
	sockets: {},
	mounted() {},
	created() {},
	destroyed() {},
	beforeDestroy() {},
	computed: {},
	methods: {
		...mapActions({
			setToken: 'setToken',
		}),
		login() {
			const params = {
				email: this.email,
				password: this.password,
				lang: this.lang,
			};
			this.isSubmitting = true;
			const callback = (response) => {
				const data = response.data;
				this.setToken(data);
				this.$router.push('/').catch(() => {});
				this.isSubmitting = false;
			};
			const errorCallback = (e) => {
				const message = getAxiosErrorMessage(e);
				this.$notify({
					group: 'app',
					type: 'error',
					title: this.$t('Login'),
					text: message,
				});
				this.isSubmitting = false;
			};
			authApi.login(params, callback, errorCallback);
		},
	},
};
</script>

<style lang="scss" scoped>
.page-login {
}
</style>
