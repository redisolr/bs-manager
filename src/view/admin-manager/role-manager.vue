<style lang="less">
    @import "../../assets/style/common";
</style>

<template>
    <div>
        <Row class="margin-top-10">
            <Col span="24">
                <Card>
                    <p slot="title">
                        <Icon type="ios-keypad"></Icon>
                        角色管理
                    </p>
                    <Button @click="goAdd" type="primary" icon="md-add">添加角色</Button>
                    <div class="margin-top-10">
                        <Table border ref="selection" :columns="columns" :data="data"
                               @on-selection-change="selectionChange"></Table>
                        <p class="margin-top-10">
                            <page-helper :total="total" @get-data="getData"></page-helper>
                        </p>
                    </div>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
import {roleList,roleDelete} from '../../api/user.js';
import pageHelper from '../components/page-helper/page-helper';

export default {
	name: "role-manager",
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
					title: 'id',
					key: 'id'
				},
				{
					title: '角色名',
					key: 'name'
				},
				{
					title: '创建时间',
					key: 'gmtCreate'
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
									size: 'small',
									disabled: params.row.id === 1
								},
								style: {
									marginRight: '5px'
								},
								on: {
									click: () => {
										this.editRole(params.index);
									}
								}
							}, '编辑'),
							h('Button', {
								props: {
									type: 'error',
									size: 'small',
									disabled: params.row.id === 1
								},
								on: {
									click: () => {
										this.deleteRole(params.index);
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
		editRole(index) {
			let query = {id: this.data[index].id};
			this.$router.push({
				name: 'edit_role',
				params: query
			});
		},
		deleteRole(index) {
			let params = {
				params: {
					id: this.data[index].id
				}
			};
			roleDelete(params).then(res => {
				if (res.status === 0) {
					this.$Message.success('删除权限成功!');
					this._roleList();
				}
			});
		},
		goAdd() {
			this.$router.push({
				name: 'add_role'
			});
		},
		getData(pageSize, pageNum) {
			this.pageSize = pageSize;
			this.pageNum = pageNum;
			this._adminList();
		},
		_roleList() {
			let params = {
				params: {
					pageNum: this.pageNum,
					pageSize: this.pageSize
				}
			};
			roleList(params).then(res => {
				this.total = res.result.total;
				this.data = res.result.data;
			});
		}
	},
	mounted() {
		this._roleList();
	}
}
</script>
