<template>
	<div class="app-container">
		<el-form
			ref="form"
			v-loading="addLoading"
			:model="form"
			:rules="rules"
			label-width="150px"
			element-loading-text="Loading"
		>
			<el-form-item label="系统名称">
				<el-input v-model="form.name" prop="name" class="el-text" />
			</el-form-item>

			<el-form-item label="系统对应域名">
				<el-input v-model="form.domain" prop="domain" class="el-text">
					<template slot="prepend">
						http://
					</template>
				</el-input>
			</el-form-item>

			<el-form-item label="页面加载阀值">
				<el-input v-model="form.slowPageTime" class="el-text">
					<template slot="append">
						(单位：s)
					</template>
				</el-input>
			</el-form-item>

			<el-form-item label="JS慢资源加载阀值">
				<el-input v-model="form.slowJsTime" class="el-text">
					<template slot="append">
						(单位：s)
					</template>
				</el-input>
			</el-form-item>

			<el-form-item label="CSS慢资源加载阀值">
				<el-input v-model="form.slowCssTime" class="el-text">
					<template slot="append">
						(单位：s)
					</template>
				</el-input>
			</el-form-item>

			<el-form-item label="IMG慢资源加载阀值">
				<el-input v-model="form.slowImgTime" class="el-text">
					<template slot="append">
						(单位：s)
					</template>
				</el-input>
			</el-form-item>

			<el-form-item label="AJAX慢资源加载阀值">
				<el-input v-model="form.slowAajxTime" class="el-text">
					<template slot="append">
						(单位：s)
					</template>
				</el-input>
			</el-form-item>

			<el-form-item>
				<el-button type="primary" @click="onSubmit('form')">
					Create
				</el-button>
				<el-button @click="onCancel">Cancel</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
import { addSystem } from '@/api/system'

export default {
	data() {
		return {
			form: {
				name: '',
				domain: '',
				slowPageTime: '',
				slowJsTime: '',
				slowCssTime: '',
				slowImgTime: '',
				slowAajxTime: ''
			},
			rules: {
				name: [
					{
						required: true,
						message: '请输入系统名称',
						trigger: 'blur'
					},
					{
						min: 2,
						max: 5,
						message: '长度在 2 到 5 个字符',
						trigger: 'blur'
					}
				],
				domain: [
					{
						required: true,
						message: '请输入域名Url',
						trigger: 'blur'
					},
					{
						min: 10,
						message: '长度至少10个字符',
						trigger: 'blur'
					}
				]
			},
			addLoading: false
		}
	},
	methods: {
		onSubmit(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					console.log(this.form)

					if (this.form.domain) {
						this.form.domain = 'http://' + this.form.domain
					}

					this.addLoading = true
					addSystem(this.form).then(response => {
						this.list = response.data
						console.log(this.list)

						// Just to simulate the time of the request
						setTimeout(() => {
							this.addLoading = false
						}, 1.5 * 1000)
					})
				} else {
					console.log('error submit!!')
					return false
				}
			})
		},
		onCancel() {
			this.$message({
				message: 'cancel!',
				type: 'warning'
			})
		}
	}
}
</script>

<style scoped>
.line {
	text-align: center;
}
.el-text {
	width: 50%;
}
</style>
