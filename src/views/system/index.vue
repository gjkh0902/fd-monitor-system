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
						<el-form-item label="慢页面加载阀值">
							<span>{{ props.row.slowPageTime }}s</span>
						</el-form-item>

						<el-form-item label="JS慢资源阀值">
							<span>{{ props.row.slowJsTime }}s</span>
						</el-form-item>

						<el-form-item label="CSS慢资源阀值">
							<span>{{ props.row.slowCssTime }}s</span>
						</el-form-item>

						<el-form-item label="IMG慢资源阀值">
							<span>{{ props.row.slowImgTime }}s</span>
						</el-form-item>

						<el-form-item label="AJAX慢资源阀值">
							<span>{{ props.row.slowAajxTime }}s</span>
						</el-form-item>
					</el-form>
				</template>
			</el-table-column>

			<el-table-column align="center" label="ID" width="80">
				<template slot-scope="scope">
					{{ scope.row.id }}
				</template>
			</el-table-column>
			<el-table-column label="系统名称" align="left">
				<template slot-scope="scope">
					{{ scope.row.name }}
				</template>
			</el-table-column>
			<el-table-column label="系统域名" align="left">
				<template slot-scope="scope">
					<span>{{ scope.row.domain }}</span>
				</template>
			</el-table-column>

			<el-table-column label="AppId系统标识" align="left" name="directly">
				<template slot-scope="scope">
					<span class="appid">{{ scope.row.appId }}</span>
					<el-button
						size="mini"
						type="primary"
						plain
						@click="showAppid(scope.row.appId, $event)"
					>
						点击复制
					</el-button>
				</template>
			</el-table-column>

			<el-table-column
				align="left"
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
	width: 120px;
	color: #99a9bf;
}
.demo-table-expand .el-form-item {
	margin-right: 0;
	margin-bottom: 0;
	width: 30%;
}
.app-container .appid {
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 1;
}
</style>
<script>
import { getList } from '@/api/system'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import clip from '@/utils/clipboard' // use clipboard directly

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
		},
		showAppid(appId, event) {
			clip(appId, event)
		}
	}
}
</script>
