<template>
  <div>
    <div class="page-container" v-if="!isRating">
      <div v-show="!scanFinished" class="mt-half">
        <qrcode-stream @decode="onDecode"></qrcode-stream>
        <div class="title-score">
          Scan QR CODE yang tertera pada paket dengan kamera
        </div>
      </div>
      <!-- after scan barcode -->
      <div v-show="scanFinished && alamat">
        <!-- <div class="d-flex title-score">
          <div class="mb-3 mr-2">Skor Pengiriman:</div>
          <div v-if="score === 'mudah'" class="text-green sub-title">Mudah</div>
          <div v-if="score === 'm'" class="text-yellow sub-title">Menengah</div>
          <div v-if="score === 's'" class="text-red sub-title">Sulit</div>
        </div> -->
        <div class="cards d-flex mt-3">
          <!-- gambar rumah -->
          <div class="card--red">
            <div class="card-body"> 
              <!-- <img src="https://picsum.photos/370/173"> -->
              <carousel :per-page="1" :mouse-drag="false">
                <slide v-if="pictures[0]">
                  <img :src="pictures[0]" style="width: 367px; height: 170px;">
                </slide>
                <slide v-if="pictures[1]">
                  <img :src="pictures[1]" style="width: 367px; height: 170px;">
                </slide>
                <slide v-if="pictures[2]">
                  <img :src="pictures[2]" style="width: 367px; height: 170px;">
                </slide>
                <slide v-if="pictures[3]">
                  <img :src="pictures[3]" style="width: 367px; height: 170px;">
                </slide>
              </carousel>
            </div>
          </div>
        </div>
        <!-- start & pengiriman -->
        <!-- <div class="d-flex mt-3">
          <star-rating
            v-bind:max-rating="1"
            :read-only="true"
            :rating="1"
            inactive-color="#000"
            active-color="#FAD901"
            v-bind:star-size="25"
            :show-rating="false"
            :rounded-corners="true">
          </star-rating>
          <div class="ml-2">4.5</div>
          <div class="v-divider"></div>
          <div class="ml-3">Terkirim: 289</div>
        </div> -->
        <!-- listt details -->
        <div class="mt-7 pt-3 title-score mb-2">
          Details
        </div>
        <div class="lists">
          <div class="list--silver">
            <div>Akses Lokasi:</div>
            <div>
              <star-rating
                :read-only="true"
                :rating="1"
                inactive-color="#000"
                active-color="#FAD901"
                v-bind:star-size="25"
                :show-rating="false"
                :rounded-corners="true"
                v-model="akses"
                >
              </star-rating>
            </div>
          </div>
          <div class="list--silver">
            <div>
              Customer Responsif:
            </div>
            <div>
              <star-rating
                :read-only="true"
                :rating="1"
                inactive-color="#000"
                active-color="#FAD901"
                v-bind:star-size="25"
                :show-rating="false"
                :rounded-corners="true"
                v-model="customer"
                >
              </star-rating>
            </div>
          </div>
          <div class="list--silver">
            <div>
              Keamanan:
            </div>
            <div>
              <star-rating
                :read-only="true"
                :rating="1"
                inactive-color="#000"
                active-color="#FAD901"
                v-bind:star-size="25"
                :show-rating="false"
                :rounded-corners="true"
                v-model="keamanan"
                >
              </star-rating>
            </div>
          </div>
          <div class="list--silver">
            <div>
              Kelebihan:
            </div>
            <div class="text-small">
              {{kelebihans}}
            </div>
            <div>
              Kekurangan:
            </div>
            <div class="text-small">
              {{kekurangans}}
            </div>
          </div>
        </div>
      </div>
    </div>
    <button
      v-if="alamat"
      type="submit"
      @click="submitScore"
      class="btn btn-submit btn-primary mt-3">
      {{ $t('Pengiriminan Selesai') }}
    </button>
    <!-- rating -->
    <div class="page-container" v-if="isRating">
      <rating :alamatId="alamat && alamat.id ? alamat.id : null" @finish="finishedScore"></rating>
    </div>
  </div>
</template>

<script>
import Chart from '@/components/Chart.vue';
import StarRating from 'vue-star-rating';
import pengantaranApi from '@/api/pengantaran';
import alamatApi from '@/api/alamat';
import Rating from '@/views/Rating.vue';
import { Carousel, Slide } from 'vue-carousel';


import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from 'vue-qrcode-reader';

export default {
  name: 'Home',
  data() {
		return {
      score: 'mudah',
      scanFinished: false,
      alamat: null,
      keamanan: null,
      akses: null,
      customer: null,
      kekurangans: [],
      kelebihans: [],
      pictures: [],
      isRating: false,
    };
	},
  components: {
    Chart,
    StarRating,
    QrcodeStream,
    QrcodeDropZone,
    QrcodeCapture,
    Carousel,
    Slide,
    Rating,
  },
  methods: {
    onDecode (decodedString) {
      this.scanFinished = true;
      this.scoring(decodedString);
    },
    scoring(url) {
			const callback = (response) => {
        const item = response.data;
        this.alamat = item;
        this.keamanan = item.avg_nilai_keamanan ? item.avg_nilai_keamanan : 0;
        this.akses = item.avg_nilai_akses ? item.avg_nilai_akses : 0;
        this.customer = item.avg_nilai_responsif ? item.avg_nilai_responsif : 0;
        for (let index = 0; index < item.kekurangans.length; index++) {
          const element = item.kekurangans[index];
          if (parseInt(element) === 1) this.kekurangans.push('Masuk Gang');
          if (parseInt(element) === 2) this.kekurangans.push('Parkir Jauh');
          if (parseInt(element) === 3) this.kekurangans.push('Masuk Hutan');
          if (parseInt(element) === 4) this.kekurangans.push('Alamat Fiktif');
        }
        for (let index = 0; index < item.kelebihans.length; index++) {
          const element = item.kelebihans[index];
          if (parseInt(element) === 1) this.kelebihans.push('Bisa dititip receptionist');
          if (parseInt(element) === 2) this.kelebihans.push('Parkir Gratis');
          if (parseInt(element) === 3) this.kelebihans.push('Samping jalan besar');
          if (parseInt(element) === 4) this.kelebihans.push('Ramah');
        }
        let resultKer = '';
        let resultKel = '';
        resultKer = [this.kekurangans.slice(0, -1).join(', '), this.kekurangans.slice(-1)[0]].join(this.kekurangans.length < 2 ? '' : ' and ');
        resultKel = [this.kelebihans.slice(0, -1).join(', '), this.kelebihans.slice(-1)[0]].join(this.kelebihans.length < 2 ? '' : ' and ');
        this.kelebihans = resultKel;
        this.kekurangans = resultKer;
        this.pictures = this.alamat.pictures;
				this.$notify({
					group: 'app',
					type: 'success',
					title: this.$t('scoring'),
					text: 'scoring success',
				});
			};
			const errCallback = (e) => {
        this.isRating = true;
			};
			alamatApi.get(url, callback, errCallback)
		},
    submitScore() {
      const callback = () => {
				this.$notify({
					group: 'app',
					type: 'success',
					title: this.$t('pengantaran'),
					text: 'pengantaran success',
				});
        this.isRating = false;
        this.scanFinished = false;
        this.alamat = null;
        const routeData = this.$router.resolve(`/`);
				window.open(routeData.href, '_self');
			};
			const errCallback = (e) => {
				this.$notify({
					group: 'app',
					type: 'error',
					title: this.$t('pengantaran'),
					text: 'pengantaran went wrong',
				});
			};

			const params = {
				alamat_id: this.alamat && this.alamat.id ? this.alamat.id : null,
			}
			pengantaranApi.create(params, callback, errCallback)
		},
    finishedScore() {
      this.isRating = false;
      this.scanFinished = false;
      this.alamat = null;
      const routeData = this.$router.resolve(`/`);
      window.open(routeData.href, '_self');
    },
  },
  mounted () {
  }
}
</script>
