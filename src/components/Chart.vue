<script>
export default {
	extends: VueChartJs.Bar,
	props: {
		polling: {
			
		},
		userPolling: {
			
		},
		interactionId: {

		}
	},
	sockets: {
		create(data) {
			this.localUserPolling.push(data)
			this.$nextTick(()=>{
			this.chartData = {
				labels: this.filteredPolling,
				datasets: [
					{
						label: 'Polling Data',
						backgroundColor: '#f87979',
						data: [this.filteredUserInteractionOne, this.filteredUserInteractionTwo, this.filteredUserInteractionThree, this.filteredUserInteractionFour]
					}
				]
			}
				this.$data._chart.data = this.chartData
				this.$data._chart.update()
			})

			//this.renderChart(this.data, this.options);
			// this.renderChartData();
		}
	},
	components: {
    },
	data() {
		return {
			chartData:{},
			localPolling:[],
			localUserPolling:[]
						
		};
	},
	created() {
		this.localPolling = this.polling; 
		this.localUserPolling = this.userPolling; 
		this.connectSocket()
	},
	methods: {
		renderChartData() {
			this.$nextTick(()=>{
				this.chartData = {
					labels: this.filteredPolling,
					datasets: [
						{
							label: 'Data One',
							backgroundColor: '#f87979',
							data: [this.filteredUserInteractionOne, this.filteredUserInteractionTwo, this.filteredUserInteractionThree, this.filteredUserInteractionFour]
						}
					]
				}
				this.renderChart(this.chartData, {responsive: true, maintainAspectRatio: false})
			})
		},
		connectSocket() {
			console.log(`room_interaction_${this.interactionId}`)
			const roomId = `room_interaction_${this.interactionId}`;
			this.$socket.client.emit('join', roomId);
		},
	},
	mounted () {
		this.chartData = {
				labels: this.filteredPolling,
				datasets: [
					{
						label: 'Data One',
						backgroundColor: '#f87979',
						data: [this.filteredUserInteractionOne, this.filteredUserInteractionTwo, this.filteredUserInteractionThree, this.filteredUserInteractionFour]
					}
				]
			}
		this.renderChart(this.chartData, {responsive: true, maintainAspectRatio: false})
	},
	computed: {
		filteredPolling() {
			let mappedPolling = []
			if ( this.localPolling && this.localPolling.length>0 ) {
				mappedPolling = this.localPolling.map((value)=>{
					return value.name
				})
				
			}
			return mappedPolling;
		},
		filteredUserInteractionOne () {
			return this.localUserPolling.reduce((a, c) => c.answer === '1' ? ++a : a, 0);
		},
		filteredUserInteractionTwo () {
			return this.localUserPolling.reduce((a, c) => c.answer === '2' ? ++a : a, 0);
		},
		filteredUserInteractionThree () {
			return this.localUserPolling.reduce((a, c) => c.answer === '3' ? ++a : a, 0);
		},
		filteredUserInteractionFour () {
			return this.localUserPolling.reduce((a, c) => c.answer === '4' ? ++a : a, 0);
		}
	},
	watch: {
		// chartData() {
		// 	if (this.chartData) {
		// 			this.chartData = {
		// 		labels: this.filteredPolling,
		// 		datasets: [
		// 			{
		// 				label: 'Data One',
		// 				backgroundColor: '#f87979',
		// 				data: [this.filteredUserInteractionOne, this.filteredUserInteractionTwo, this.filteredUserInteractionThree, this.filteredUserInteractionFour]
		// 			}
		// 		]
		// 	}
		// 	}
		// },
		filteredPolling() {
			if (this.filteredPolling) console.log(this.filteredPolling)
		}
	}
}
</script>