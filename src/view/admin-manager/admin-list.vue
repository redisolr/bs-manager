<style lang="less">
    @import "../../assets/style/common";
</style>

<template>
    <Card>
        <p slot="title">
            <Icon type="ios-keypad"></Icon>
            管理员列表
        </p>
        <Button @click="goAdd" type="primary" icon="md-add">添加管理员</Button>
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
import {adminList, updateEnableState, adminDelete} from '../../api/user.js';
import pageHelper from '../components/page-helper/page-helper';

export default {
	name: "admin-list",
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
					title: '登录名',
					key: 'username'
				},
				{
					title: '手机号',
					key: 'phone'
				},
				{
					title: '角色名',
					key: 'roleName'
				},
				{
					title: '创建时间',
					key: 'gmtCreate'
				},
				{
					title: '是否启用',
					key: 'enable',
					width: 100,
					render: (h, params) => {
						return h('i-switch', {
							props: {
								value: params.row.enable,
								disabled: params.row.id === 1
							},
							on: {
								'on-change': (event) => {
									this.updateEnable(params.index, event);
								}
							}
						});
					}
				},
				{
					title: '操作',
					key: 'action',
					width: 200,
					align: 'center',
					render: (h, params) => {
						return h('div', [
							h('Button', {
								props: {
									type: 'primary',
									size: 'small'
								},
								style: {
									marginRight: '5px'
								},
								on: {
									click: () => {
										this.editAdmin(params.index);
									}
								}
							}, '编辑'),
							h('Button', {
								props: {
									type: 'error',
									size: 'small'
								},
								on: {
									click: () => {
										this.deleteAdmin(params.index);
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
		editAdmin(index) {
			let query = {id: this.data[index].id};
			this.$router.push({
				name: 'edit_admin',
				params: query
			});
		},
		deleteAdmin(index) {
			let params = {
				params: {
					id: this.data[index].id
				}
			};
			adminDelete(params).then(res => {
				if (res.status === 0) {
					this.$Message.success('删除管理员成功!');
					this._adminList();
				}
			});
		},
		goAdd() {
			this.$router.push({
				name: 'add_admin'
			});
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
			updateEnableState(params).then(res => {
				this.$Message.success('编辑管理员禁用/启用状态成功!');
			});
		},
		_adminList() {
			let params = {
				params: {
					pageSize: this.pageSize,
					pageNum: this.pageNum
				}
			};
			adminList(params).then(res => {
				this.total = res.result.total;
				this.data = res.result.data;
			});
		}
	},
	mounted() {
		this._adminList();
	}
}
</script>
