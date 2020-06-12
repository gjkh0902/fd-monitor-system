<template>
	<div class="app-container">
		<el-table
			v-loading="listLoading"
			:data="list"
			element-loading-text="Loading"
			border
			fit
			highlight-current-row
		>
			<el-table-column type="expand">
				<template slot-scope="props">
					<el-form
						label-position="left"
						inline
						class="demo-table-expand"
					>
						<el-form-item label="错误信息">
							<span>{{ props.row.msg }}</span>
						</el-form-item>

						<el-form-item label="错误资源URL">
							<span>{{ props.row.resourceUrl }}</span>
						</el-form-item>

						<el-form-item
							v-if="props.row.line"
							label="“错误所在行数”"
						>
							<span>{{ props.row.line }}</span>
						</el-form-item>
						<el-form-item
							v-if="props.row.col"
							label="“错误所在列数"
						>
							<span>{{ props.row.col }}</span>
						</el-form-item>
						<el-form-item label="请求类型">
							<span>{{ props.row.method }}</span>
						</el-form-item>

						<el-form-item label="所属系统ID">
							<span>{{ props.row.systemId }}</span>
						</el-form-item>

						<el-form-item label="自定义信息">
							<span>{{ props.row.extendsInfo }}</span>
						</el-form-item>

						<el-form-item label="设备信息">
							<span>{{ props.row.deviceInfo }}</span>
						</el-form-item>
					</el-form>
				</template>
			</el-table-column>
			<el-table-column align="center" label="ID" width="80">
				<template slot-scope="scope">
					{{ scope.row.id }}
				</template>
			</el-table-column>
			<el-table-column label="错误信息">
				<template slot-scope="scope">
					<span class="error-msg">{{ scope.row.msg }}</span>
				</template>
			</el-table-column>

			<el-table-column label="Http状态码" width="100" align="center">
				<template slot-scope="scope">
					{{ scope.row.status || '无' }}
				</template>
			</el-table-column>

			<el-table-column label="所属域名">
				<template slot-scope="scope">
					<span>{{ scope.row.origin }}</span>
				</template>
			</el-table-column>

			<el-table-column label="来源URL">
				<template slot-scope="scope">
					<span>{{ scope.row.referer }}</span>
				</template>
			</el-table-column>

			<el-table-column
				class-name="status-col"
				label="日志级别"
				width="110"
				align="center"
			>
				<template slot-scope="scope">
					<el-tag :type="scope.row.logType | statusFilter">{{
						scope.row.logType
					}}</el-tag>
				</template>
			</el-table-column>
			<el-table-column label="错误类型" width="110" align="center">
				<template slot-scope="scope">
					{{ scope.row.category }}
				</template>
			</el-table-column>
			<el-table-column
				align="center"
				prop="created_at"
				label="创建时间"
				width="200"
			>
				<template slot-scope="scope">
					<i class="el-icon-time" />
					<span>{{ scope.row.createTime }}</span>
				</template>
			</el-table-column>
		</el-table>
		<pagination
			v-show="total > 0 && !listLoading"
			:total="total"
			:page.sync="listQuery.page"
			:limit.sync="listQuery.limit"
			@pagination="fetchData"
		/>
	</div>
</template>
<style scoped>
.demo-table-expand {
	font-size: 0;
}
.demo-table-expand label {
	width: 100px;
	color: #99a9bf;
}
.demo-table-expand .el-form-item {
	margin-right: 0;
	margin-bottom: 0;
	width: 80%;
}
.app-container .error-msg {
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
}
</style>
<script>
import { getList } from '@/api/table'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
	name: 'ListError',
	components: { Pagination },
	filters: {
		statusFilter(status) {
			const statusMap = {
				Info: 'success',
				Warning: 'warning',
				Error: 'danger'
			}
			return statusMap[status]
		}
	},
	data() {
		return {
			list: null,
			listLoading: true,
			total: 0,
			listQuery: {
				page: 1,
				limit: 10,
				importance: undefined,
				title: undefined,
				type: undefined,
				sort: '+id'
			}
		}
	},
	created() {
		this.fetchData()
	},
	methods: {
		fetchData() {
			this.listLoading = true
			getList(this.listQuery).then(response => {
				this.list = response.data.item
				this.total = response.data.total
				console.log(this.list)

				// Just to simulate the time of the request
				setTimeout(() => {
					this.listLoading = false
				}, 1.5 * 1000)
			})
		}
	}
}
</script>
