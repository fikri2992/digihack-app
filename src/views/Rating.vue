<template>
  <div class="page-container">
    <!-- rating alamat -->
    <div class="mt-3">
      <input class="btn btn-submit btn-primary mt-3 mr-4 mb-3" style="width: 100%" id="myFileInput" type="file" accept="image/*; capture=camera" @change="addMedia">
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
      @click="scoring"
      class="btn btn-submit btn-primary mt-3"
      :class="{ 'is-loading': isSaving }">
      {{ $t('Submit Rating') }}
    </button>
    <modal
			size="small"
			@close="backToHome"
			v-if="isBackToHome"
			>
			<template slot="header">
				<h3 class="text-white">{{ $t('Penilaian alamat') }}</h3>
			</template>
			<template slot="body">
				Penilaian sudah terkirim
				<!-- Submit -->
			</template>
			<template slot="footer">
				<button
					@click="backToHome"
					type="submit"
					class="btn btn-submit btn-primary mt-3 text-center">
					{{ $t('Kembali ke scan QR') }}
				</button>
			</template>
		</modal>
  </div>
</template>

<script>
import Chart from '@/components/Chart.vue';
import StarRating from 'vue-star-rating';
import scoringApi from '@/api/scoring';
import fileApi from '@/api/file';
import Modal from '@/components/Modal.vue';

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
      media: null,
      isUploadingPicture: false,
      isBackToHome: false,
    };
	},
  components: {
    Chart,
    StarRating,
    Modal,
  },
  props: {
    alamatId: {
    }
  },
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
					params.append('file_name', file.name);
					const callback = (response) => {
						const item = response.name;
            this.media = item;
						this.isUploadingPicture = false;
					};
					const errorCallback = () => {
						this.isUploadingPicture = false;
					};
          console.log(params);
					fileApi.upload(params, callback, errorCallback);

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
    scoring() {
			const callback = (data) => {
				this.$notify({
					group: 'app',
					type: 'success',
					title: this.$t('scoring'),
					text: 'scoring success',
				});
        this.isBackToHome = true;
			};
			const errCallback = (e) => {
				this.$notify({
					group: 'app',
					type: 'error',
					title: this.$t('scoring'),
					text: 'scoring went wrong',
				});
			};

			const params = {
				alamat_id: this.alamatId ? this.alamatId : 1,
				nilai_akses: this.scoreAlamat,
				nilai_responsif: this.scoreResponsif,
				nilai_keamanan: this.scoreKeamanan,
        kekurangan: JSON.stringify(this.arrayKekurangan),
        kelebihan: JSON.stringify(this.arrayKelebihan),
        picture: this.media,
			}

			scoringApi.create(params, callback, errCallback)
		},
    backToHome() {
      this.$emit('finish');
      this.isBackToHome = false;
    },
  },
  mounted () {
  }
}
</script>
