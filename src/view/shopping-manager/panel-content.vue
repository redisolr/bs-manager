<style lang="less">
    @import "../../assets/style/common";
</style>

<template>
    <div>
        <Row class="margin-top-10">
            <Col span="5">
                <Card title="首页版块" icon="ios-options">
                    <CellGroup @on-click="clickPanel">
                        <Cell v-for="(item, index) in data" :title="item.panelName" :name="index"
                              :disabled="item.status === 0" :selected="item.id === panelId" label="最大上传图片数">
                            <Badge :count="item.maxPicture" slot="extra" type="primary"/>
                        </Cell>
                    </CellGroup>
                </Card>
            </Col>
            <Col span="19">
                <Card>
                    <p slot="title">
                        <Icon type="ios-keypad"></Icon>
                        板块内容
                    </p>
                    <Button @click="goAdd" type="primary" icon="md-add" :disabled="buttonDisabled">添加板块内容</Button>
                    <div class="margin-top-10">
                        <Table border :columns="columns" :data="contentData"></Table>
                    </div>
                </Card>
            </Col>
        </Row>

    </div>
</template>

<script>
import {getAllPanel, getPanelContentByPanelId, panelContentDelete} from '../../api/manager.js';
import {SUCCESS} from '../../common/consts';

export default {
	name: "panel-content",
	data() {
		return {
			panelId: '',
			buttonDisabled: false,
			columns: [
				{
					title: '类型ID',
					width: 120,
					key: 'id'
				},
				{
					title: '图片',
					key: 'pictureUrl',
					width: 80,
					render: (h, params) => {
						const row = params.row;
						return h('img', {
							style: {
								width: "50px",
								height: "50px",
								margin: "5px",
								borderRadius: "12px"
							},
							attrs: {
								src: row.pictureUrl
							}
						},);
					}
				},
				{
					title: '链接',
					tooltip: true,
					key: 'jumpUrl',
					render: (h, params) => {
						const row = params.row;
						return h('a', {
							attrs: {
								href: row.jumpUrl,
								target: "view_window"
							}
						}, row.jumpUrl);
					}
				},
				{
					title: '排序值',
					key: 'sort',
					width: 100,
					sortable: true
				},
				{
					title: '创建时间',
					key: 'gmtCreate',
					width: 200,
					sortable: true
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
										this.editPanelContent(params.index);
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
										this.deletePanelContent(params.index);
									}
								}
							}, '删除')
						]);
					}
				}
			],
			data: [],
			contentData: []
		};
	},
	methods: {
		goAdd() {
			if (this.panelId) {
				let query = {id: this.panelId};
				this.$router.push({
					name: 'add_panel_content',
					params: query
				});
			} else {
				this.$Message.error("请选择左侧版块");
			}
		},
		clickPanel(name) {
			this.panelId = this.data[name].id;
			let maxPicture = this.data[name].maxPicture;
			getPanelContentByPanelId(this.panelId).then(res => {
				if (res.status === SUCCESS) {
					this.buttonDisabled = res.result.length === maxPicture;
					this.contentData = res.result;
				} else {
					this.$Message.error(res.message);
				}
			});
		},
		editPanelContent(index) {
			let query = {id: this.contentData[index].id};
			this.$router.push({
				name: 'edit_panel_content',
				params: query
			});
		},
		deletePanelContent(index) {
			let params = {
				params: {
					id: this.contentData[index].id
				}
			}
			panelContentDelete(params).then(res => {
				if (res.status === SUCCESS) {
					this.contentData.splice(index, 1);
					this.$Message.success('删除板块内容成功!');
				} else {
					this.$Message.error(res.message);
				}
			});
		},
		_getAllPanel() {
			getAllPanel().then(res => {
				if (res.status === SUCCESS) {
					this.data = res.result;
				} else {
					this.$Message.error(res.message);
				}
			});
		}
	},
	mounted() {
		this._getAllPanel();
	}
};
</script>
