<template>
<div class="page page-auth">
	<div class="card auth-box text-center">
		<div class="card-body">
			<h3 class="card-title mb-4 mt-4">{{ $t('Your register has been successfully') }}</h3>
            <div class="mt-8 text-small" style="margin-top: 2em;">
                <router-link to="/login">{{ $t('Login now') }}</router-link>
            </div>
		</div>
	</div>
</div>
</template>

<script>
</script>

<style lang="scss" scoped>
</style>
