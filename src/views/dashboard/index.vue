<template>
	<div class="dashboard-container">
		<div class=" clearfix">
			<pan-thumb :image="avatar" style="float: left">
				Your roles: admin
			</pan-thumb>
			<div class="dashboard-text">
				<p>welcome</p>
				<p>{{ name }}</p>
			</div>
		</div>
		<div class="dashboard-img">
			<img :src="emptyGif" class="emptyGif" />
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import PanThumb from '@/components/PanThumb'

export default {
	name: 'Dashboard',
	components: { PanThumb },
	data() {
		return {
			emptyGif:
				'https://wpimg.wallstcn.com/0e03b7da-db9e-4819-ba10-9016ddfdaed3'
		}
	},
	computed: {
		...mapGetters(['name', 'avatar'])
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
		margin-left: 190px;
		height: 150px;
		line-height: 50px;
	}
	&-img {
		.emptyGif {
			display: block;
			width: 45%;
			margin: 0 auto;
		}
	}
}
</style>
