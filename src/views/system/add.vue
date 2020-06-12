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
			<el-form-item label="系统名称" prop="name">
				<el-input v-model="form.name" class="el-text" />
			</el-form-item>

			<el-form-item label="系统对应域名" prop="domain">
				<el-input v-model="form.domain" class="el-text">
					<template slot="prepend">
						http://
					</template>
				</el-input>
			</el-form-item>

			<el-form-item label="页面加载阀值" prop="slowPageTime">
				<el-input v-model="form.slowPageTime" class="el-text">
					<template slot="append">
						(单位：s)
					</template>
				</el-input>
			</el-form-item>

			<el-form-item label="JS慢资源加载阀值" prop="slowJsTime">
				<el-input v-model="form.slowJsTime" class="el-text">
					<template slot="append">
						(单位：s)
					</template>
				</el-input>
			</el-form-item>

			<el-form-item label="CSS慢资源加载阀值" prop="slowCssTime">
				<el-input v-model="form.slowCssTime" class="el-text">
					<template slot="append">
						(单位：s)
					</template>
				</el-input>
			</el-form-item>

			<el-form-item label="IMG慢资源加载阀值" prop="slowImgTime">
				<el-input v-model="form.slowImgTime" class="el-text">
					<template slot="append">
						(单位：s)
					</template>
				</el-input>
			</el-form-item>

			<el-form-item label="AJAX慢资源加载阀值" prop="slowAajxTime">
				<el-input v-model="form.slowAajxTime" class="el-text">
					<template slot="append">
						(单位：s)
					</template>
				</el-input>
			</el-form-item>

			<el-form-item>
				<el-button type="primary" @click="onSubmit('form')">
					提交
				</el-button>
				<el-button @click="onCancel('form')">重置</el-button>
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
				slowPageTime: 8,
				slowJsTime: 2,
				slowCssTime: 1,
				slowImgTime: 2,
				slowAajxTime: 2,
				userId: this.$store.getters.userId || ''
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
						max: 10,
						message: '长度在 2 到 10 个字符',
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
						min: 8,
						message: '长度至少8个字符',
						trigger: 'blur'
					}
				],
				slowPageTime: [
					{
						required: true,
						message: '数据不能为空',
						trigger: 'blur'
					}
				]
			},
			addLoading: false
		}
	},
	methods: {
		onSubmit(formName) {
			console.log()
			this.$refs[formName].validate(valid => {
				if (valid) {
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
							this.$message({
								message: '添加成功!',
								type: 'success'
							})
						}, 1.5 * 1000)
					})
				} else {
					this.$message({
						message: '请检查输入项是否符合要求!',
						type: 'warning'
					})
					return false
				}
			})
		},
		onCancel(formName) {
			this.$refs[formName].resetFields()
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
