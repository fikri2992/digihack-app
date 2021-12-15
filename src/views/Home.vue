<template>
  <div class="page-container">
    <div v-show="!scanFinished" class="mt-half">
      <qrcode-stream @decode="onDecode"></qrcode-stream>
      <div class="title-score">
        Scan QR CODE yang tertera pada paket dengan kamera
      </div>
    </div>
    <!-- after scan barcode -->
    <div v-show="scanFinished">
      <div class="d-flex title-score">
        <div class="mb-3 mr-2">Skor Pengiriman:</div>
        <div v-if="score === 'mudah'" class="text-green sub-title">Mudah</div>
        <div v-if="score === 'm'" class="text-yellow sub-title">Menengah</div>
        <div v-if="score === 's'" class="text-red sub-title">Sulit</div>
      </div>
      <div class="cards d-flex">
        <!-- gambar rumah -->
        <div class="card--red">
          <div class="card-body"> 
            <img src="https://picsum.photos/370/173">
          </div>
        </div>
      </div>
      <!-- start & pengiriman -->
      <div class="d-flex mt-3">
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
      </div>
      <!-- listt details -->
      <div class="mt-4 title-score mb-2">
        Details
      </div>
      <div class="lists">
        <div class="list--silver">Lokasi</div>
        <div class="list--silver">Customer</div>
        <div class="list--silver">Patokan</div>
        <div class="list--silver">Lain-Lain</div>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from '@/components/Chart.vue';
import StarRating from 'vue-star-rating';

import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from 'vue-qrcode-reader';

export default {
  name: 'Home',
  data() {
		return {
      score: 'mudah',
      scanFinished: false,
    };
	},
  components: {
    Chart,
    StarRating,
    QrcodeStream,
    QrcodeDropZone,
    QrcodeCapture,
  },
  methods: {
    onDecode (decodedString) {
      this.scanFinished = true;
    },
  },
  mounted () {
  }
}
</script>
