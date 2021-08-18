<template>
  <div class="page-container">
    <div class="cards d-flex">
      <!-- offer -->
      <div class="card--blue mr-3">
        <div class="card-body"> 
          Count Offer
            <div class="card-featured">
                99
            </div>
        </div>
      </div>
      <!-- interaction -->
      <div class="card--blue">
        <div class="card-body"> 
          Count Interaction
          <div class="card-featured">
              99
          </div>
        </div>
      </div>
    </div>
    <!-- statistrics -->
    <div class="mt-7">
      <chart></chart>
    </div>
  </div>
</template>

<script>
import Chart from '@/components/Chart.vue';

export default {
  name: 'Home',
  data() {
		return {
    };
	},
  components: {
    Chart
  },
  mounted () {
  }
}
</script>
