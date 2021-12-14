<template>
  <div class="page-container">
    <!-- rating alamat -->
    <div class="mt-3">
      <div class="title-score pl-1 mb-2">Nilai Akses Alamat</div>
      <div>
        <star-rating
          v-model="scoreAlamat" 
          v-bind:increment="1"
          v-bind:max-rating="5"
          :rating="0"
          inactive-color="#CDCDCD"
          active-color="#FAD901"
          v-bind:star-size="25"
          :show-rating="false"
          :rounded-corners="true">
        </star-rating>
      </div>
    </div>
    <!-- rating responsif -->
    <div class="mt-3">
      <div class="title-score pl-1 mb-2">Nilai Tingkat Responsif Customer</div>
      <div>
        <star-rating
          v-model="scoreResponsif" 
          v-bind:increment="1"
          v-bind:max-rating="5"
          :rating="0"
          inactive-color="#CDCDCD"
          active-color="#FAD901"
          v-bind:star-size="25"
          :show-rating="false"
          :rounded-corners="true">
        </star-rating>
      </div>
    </div>
    <!-- rating kemanan -->
    <div class="mt-3">
      <div class="title-score pl-1 mb-2">Nilai Tingkat Keamanan lokasi</div>
      <div>
        <star-rating
          v-model="scoreKeamanan" 
          v-bind:increment="1"
          v-bind:max-rating="5"
          :rating="0"
          inactive-color="#CDCDCD"
          active-color="#FAD901"
          v-bind:star-size="25"
          :show-rating="false"
          :rounded-corners="true">
        </star-rating>
      </div>
    </div>
    <!-- Lain-Lain -->
    <div class="mt-3">
      <div class="title-score pl-1 mb-2">Kekurangan:</div>
      <!-- baris 1 -->
      <div class="d-flex">
          <label class="custom-control custom-checkbox mb-3 mr-4">
            <input type="checkbox" class="custom-control-input" v-model="arrayKekurangan" value="1">
            <span class="custom-control-label pt-0">{{ $t('Masuk Gang') }}</span>
          </label>
          <label class="custom-control custom-checkbox mb-3 mr-4">
            <input type="checkbox" class="custom-control-input" v-model="arrayKekurangan" value="2">
            <span class="custom-control-label pt-0">{{ $t('Parkir Jauh') }}</span>
          </label>
      </div>
      <!-- baris 2 -->
      <div class="d-flex">
          <label class="custom-control custom-checkbox mb-3 mr-4">
            <input type="checkbox" class="custom-control-input" v-model="arrayKekurangan" value="3">
            <span class="custom-control-label pt-0">{{ $t('Masuk Hutan') }}</span>
          </label>
          <label class="custom-control custom-checkbox mb-3 mr-4">
            <input type="checkbox" class="custom-control-input" v-model="arrayKekurangan" value="4">
            <span class="custom-control-label pt-0">{{ $t('Alamat Fiktif') }}</span>
          </label>
      </div>
      <div class="title-score pl-1 mb-2 mt-3">Kelebihan:</div>
      <!-- baris 1 -->
      <div class="d-flex">
          <label class="custom-control custom-checkbox mb-3 mr-4">
            <input type="checkbox" class="custom-control-input" v-model="arrayKelebihan" value="1">
            <span class="custom-control-label pt-0">{{ $t('Bisa dititip receptionist') }}</span>
          </label>
          <label class="custom-control custom-checkbox mb-3 mr-4">
            <input type="checkbox" class="custom-control-input" v-model="arrayKelebihan" value="2">
            <span class="custom-control-label pt-0">{{ $t('Parkir Gratis') }}</span>
          </label>
      </div>
      <!-- baris 2 -->
      <div class="d-flex">
          <label class="custom-control custom-checkbox mb-3 mr-4">
            <input type="checkbox" class="custom-control-input" v-model="arrayKelebihan" value="3">
            <span class="custom-control-label pt-0">{{ $t('Samping jalan besar') }}</span>
          </label>
          <label class="custom-control custom-checkbox mb-3 mr-4">
            <input type="checkbox" class="custom-control-input" v-model="arrayKelebihan" value="4">
            <span class="custom-control-label pt-0">{{ $t('Ramah') }}</span>
          </label>
      </div>
    </div>
    <button
      type="submit"
      class="btn btn-submit btn-primary mt-3"
      :class="{ 'is-loading': isSaving }">
      {{ $t('Submit Rating') }}
    </button>
  </div>
</template>

<script>
import Chart from '@/components/Chart.vue';
import StarRating from 'vue-star-rating';

export default {
  name: 'Rating',
  data() {
		return {
      scoreAlamat: 0,
      scoreResponsif: 0,
      scoreKeamanan: 0,
      arrayKekurangan: [],
      arrayKelebihan: [],
      isSaving: false,
    };
	},
  components: {
    Chart,
    StarRating,
  },
  mounted () {
  }
}
</script>
