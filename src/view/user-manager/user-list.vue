<style lang="less">
    @import "../../assets/style/common";
</style>

<template>
    <Card>
        <p slot="title">
            <Icon type="ios-keypad"></Icon>
            用户列表
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
import {userList, updateUserEnableState} from '../../api/user.js';
import pageHelper from '../components/page-helper/page-helper';

export default {
	name: "user-list",
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
					title: '用户名',
					key: 'username'
				},
				{
					title: '手机号',
					key: 'phone'
				},
				{
					title: '性别',
					key: 'sex',
					width: 100,
					align: 'center'
				},
				{
					title: '邮箱',
					key: 'email'
				},
				{
					title: '注册时间',
					key: 'gmtCreate',
					width: 150,
				},
				{
					title: '是否启用',
					key: 'enable',
					width: 100,
					render: (h, params) => {
						return h('i-switch', {
							props: {
								value: params.row.enable
							},
							on: {
								'on-change': (event) => {
									this.updateEnable(params.index, event);
								}
							}
						});
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
		getData(pageSize, pageNum) {
			this.pageSize = pageSize;
			this.pageNum = pageNum;
			this._adminList();
		},
		updateEnable(index, event) {
			let params = {
				id: this.data[index].id,
				enable: event
			};
			updateUserEnableState(params).then(res => {
				this.$Message.success('编辑管理员禁用/启用状态成功!');
			});
		},
		_userList() {
			let params = {
				params: {
					pageSize: this.pageSize,
					pageNum: this.pageNum
				}
			};
			userList(params).then(res => {
				this.total = res.result.total;
				this.data = res.result.data;
			});
		}
	},
	mounted() {
		this._userList();
	}
}
</script>
