<template>
	<div class="dashboard-container">
		<div class="dashboard-text">hi，{{ name }}</div>
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
		display: flex;
		align-items: center; /*定义body的元素垂直居中*/
		justify-content: center; /*定义body的里的元素水平居中*/
	}
	&-text {
		font-size: 30px;
		line-height: 50px;
		position: absolute;
		left: 30px;
		top: 30px;
	}
	&-img {
		display: block;
		margin: 0 auto;

		.emptyGif {
			display: block;
			width: 80%;
			margin: 0 auto;
		}
	}
}
</style>
