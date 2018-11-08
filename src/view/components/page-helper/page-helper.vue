/**
* 分页组件
*
*
<page :total="total" @getData="getData"></page>
:total  >>总条数
@getData="getData"   >> 获取数据方法，返回(每页多少条，第N页开始)
*/

<template>
    <div class="page">
        <Page placement="top" @on-change="changePageNum" :page-size="pageSize" :current="pageNum" :total="total"
              size="small" show-total show-elevator></Page>
    </div>
</template>

<script>
	export default {
		props: {
			total: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				pageNum: 1,
				pageSize: 10
			}
		},
		methods: {
			changePageNum(v) {
				this.$emit('get-data', this.pageSize, v);
			}
		}
	}
</script>