<style lang="less">
    @import "../../assets/style/common";
</style>

<template>
    <Card>
        <p slot="title">
            <Icon type="ios-keypad"></Icon>
            订单管理
        </p>
        <div class="margin-top-10">
            <Table border ref="selection" :columns="columns" :data="data"
                   @on-selection-change="selectionChange"></Table>
            <p class="margin-top-10">
                <page-helper :total="total" @get-data="getData"></page-helper>
            </p>
        </div>
    </Card>
</template>

<script>
import {getAllOrder, delOrder, deliverGoods} from '../../api/order.js';
import pageHelper from '../components/page-helper/page-helper';

export default {
	name: "query-order",
	components: {
		pageHelper
	},
	data() {
		return {
			ids: [],
			columns: [
				{
					type: 'selection',
					width: 60,
					align: 'center'
				},
				{
					title: '订单号',
					key: 'orderNum'
				},
				{
					title: '用户名',
					width: 80,
					key: 'username'
				},
				{
					title: '订单金额',
					key: 'payment'
				},
				{
					title: '支付方式',
					key: 'paymentType'
				},
				{
					title: '创建时间',
					key: 'gmtCreate'
				},
				{
					title: '支付时间',
					key: 'paymentTime'
				},
				{
					title: '关闭时间',
					key: 'closeTime'
				},
				{
					title: '完成时间',
					key: 'finishTime'
				},

				{
					title: '订单状态',
					key: 'status',
					width: 90,
					render: (h, params) => {
						const row = params.row;
						let value;
						let type;
						if (row.status === 0) {
							value = '待支付';
							type = 'default';
						} else if (row.status === 1) {
							value = '已付款';
							type = 'warning';
						} else if (row.status === 3) {
							value = '待收货';
							type = 'info';
						} else if (row.status === 4) {
							value = '交易成功';
							type = 'success';
						} else if (row.status === 5) {
							value = '交易关闭';
							type = 'info';
						} else if (row.status === 6) {
							value = '交易失败';
							type = 'error';
						} else if (row.status === 7) {
							value = '删除';
							type = 'error';
						}
						return h('Button', {
							props: {
								type: type,
								size: 'small'
							}
						}, value);
					}
				},
				{
					title: '操作',
					key: 'action',
					width: 100,
					align: 'center',
					render: (h, params) => {
						return h('div', [
							h('Icon', {
								props: {
									type: 'md-redo',
									color: 'green'
								},
								style: {
									marginRight: '5px',
								},
								on: {
									click: () => {
										this.delivery(params.index);
									}
								}
							}, '发货'),
							h('Icon', {
								props: {
									type: 'ios-trash',
									color: 'red'
								},
								on: {
									click: () => {
										this.deleteOrder(params.index);
									}
								}
							}, '删除')
						]);
					}
				}
			],
			data: [],
			pageNum: 1,
			pageSize: 10,
			total: 0
		};
	},
	methods: {
		selectionChange(selection) {
			this.ids = [];
			selection.map(item => this.ids.push(item.id));
		},
		deleteOrder(index) {
			let params = {
				params: {
					id: this.data[index].id
				}
			};
			delOrder(params).then(res => {
				if (res.status === 0) {
					this.$Message.success('删除订单成功成功!');
					this.getData();
				}
			});
		},
		delivery(index) {
			let params = {
				params: {
					id: this.data[index].id
				}
			};
			deliverGoods(params).then(res => {
				if (res.status === 0) {
					this.$Message.success('发货成功!');
					this.getData();
				}
			});
		},
		getData(pageSize, pageNum) {
			this.pageSize = pageSize;
			this.pageNum = pageNum;
			this._adminList();
		},
		_getAllOrder() {
			let params = {
				params: {
					pageSize: this.pageSize,
					pageNum: this.pageNum
				}
			};
			getAllOrder(params).then(res => {
				this.total = res.result.total;
				this.data = res.result.data;
			});
		}
	},
	mounted() {
		this._getAllOrder();
	}
}
</script>
