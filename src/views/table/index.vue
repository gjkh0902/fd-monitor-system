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
			<el-table-column align="center" label="ID" width="95">
				<template slot-scope="scope">
					{{ scope.row.id }}
				</template>
			</el-table-column>
			<el-table-column label="Msg">
				<template slot-scope="scope">
					{{ scope.row.msg }}
				</template>
			</el-table-column>
			<el-table-column label="Origin" align="center">
				<template slot-scope="scope">
					<span>{{ scope.row.origin }}</span>
				</template>
			</el-table-column>
			<el-table-column
				class-name="status-col"
				label="LogType"
				width="110"
				align="center"
			>
				<template slot-scope="scope">
					<el-tag :type="scope.row.logType | statusFilter">{{
						scope.row.logType
					}}</el-tag>
				</template>
			</el-table-column>
			<el-table-column label="Category" width="110" align="center">
				<template slot-scope="scope">
					{{ scope.row.category }}
				</template>
			</el-table-column>
			<el-table-column
				align="center"
				prop="created_at"
				label="CreateTime"
				width="200"
			>
				<template slot-scope="scope">
					<i class="el-icon-time" />
					<span>{{ scope.row.createTime }}</span>
				</template>
			</el-table-column>
		</el-table>
		<pagination
			v-show="total > 0"
			:total="total"
			:page.sync="listQuery.page"
			:limit.sync="listQuery.limit"
			@pagination="fetchData"
		/>
	</div>
</template>

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
