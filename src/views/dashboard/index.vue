<template>
	<div class="dashboard-container">
		<!-- <div class="dashboard-text">{{ name }}</div> -->
		<div class="dashboard-img">
			<img :src="emptyGif" class="emptyGif" />
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
	name: 'Dashboard',
	data() {
		return {
			emptyGif:
				'https://wpimg.wallstcn.com/0e03b7da-db9e-4819-ba10-9016ddfdaed3'
		}
	},
	computed: {
		...mapGetters(['name'])
	}
}
</script>

<style lang="scss" scoped>
.dashboard {
	&-container {
		// margin: 30px;
		background-color: #e3e3e3;
		min-height: 100vh;
		padding: 50px 60px 0px;
	}
	&-text {
		font-size: 30px;
		height: 150px;
		line-height: 50px;
	}
	&-img {
		.emptyGif {
			display: block;
			width: 45%;
			margin: 5% auto;
		}
	}
}
</style>
