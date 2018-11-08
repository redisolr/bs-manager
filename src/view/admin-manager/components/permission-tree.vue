<template>
    <div>
        <Tree v-if="isEdit" :data="data" @click.native="getCheckedNodes" :render="renderContent" ref="tree"></Tree>
        <Tree v-else :data="data" @click.native="getCheckedNodes" ref="tree" show-checkbox multiple></Tree>
        <Modal
                v-model="modal"
                title="添加权限"
                @on-ok="appendOk"
                @on-cancel="cancel"
                width="400">
            <Form :model="formItem" :label-width="80">
                <FormItem label="权限名">
                    <Input v-model="formItem.name" placeholder="请输入权限名称"/>
                </FormItem>
                <FormItem label="权限路径">
                    <Input v-model="formItem.path" placeholder="请输入权限路径"/>
                </FormItem>
            </Form>
        </Modal>
        <Modal
                v-model="modal1"
                title="修改权限"
                @on-ok="editOk"
                @on-cancel="cancel"
                width="400">
            <Form :model="formItem" :label-width="80">
                <FormItem label="权限名">
                    <Input v-model="formItem.name" placeholder="请输入权限名称"/>
                </FormItem>
                <FormItem label="权限路径">
                    <Input v-model="formItem.path" placeholder="请输入权限路径"/>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>

<script>
import {
	permissionDelete,
	permissionInsert,
	selectAllPermission,
	permissionGet,
	permissionUpdate
} from '../../../api/user.js';

export default {
	name: 'permission-tree',
	props: {
		isEdit: {
			type: Boolean,
			default: false
		},
		data:{
			type: Array,
			default: []
		}
	},
	data() {
		return {
			formItem: {
				name: '',
				path: '',
			},
			modal: false,
			modal1: false,
			treeData: '',
			checkedNodes: [],
			buttonPropsSuccess: {
				type: 'success',
				size: 'small'
			},
			buttonPropsError: {
				type: 'error',
				size: 'small'
			},
		};
	},
	methods: {
		renderContent(h, {root, node, data}) {
			return h('span', {
				style: {
					display: 'inline-block',
					width: '100%'
				}
			}, [
				h('span', [
					h('Icon', {
						props: {
							type: data.parent ? 'ios-folder-outline' : 'ios-paper-outline'
						},
						style: {
							marginRight: '8px'
						}
					}),
					h('span', data.title)
				]),
				h('span', {
					style: {
						display: 'inline-block',
						float: 'right',
						marginRight: '32px'
					}
				}, [
					h('Button', {
						props: Object.assign({}, this.buttonPropsSuccess, {
							icon: 'md-add',
							type: 'primary'
						}),
						style: {
							marginRight: '8px',
							width: data.parent ? '46px' : ''
						},
						on: {
							click: () => {
								this.append(data);
							}
						}
					}),
					h('Button', {
						props: Object.assign({}, this.buttonPropsSuccess, {
							icon: 'md-brush',
							type: 'success'
						}),
						style: {
							marginRight: '8px',
							width: data.parent ? '46px' : ''
						},
						on: {
							click: () => {
								this.edit(data);
							}
						}
					}),
					h('Button', {
						props: Object.assign({}, this.buttonPropsError, {
							icon: 'md-remove'
						}),
						style: {
							marginRight: '8px',
							display: data.parent ? 'none' : 'inline'
						},
						on: {
							click: () => {
								this.remove(root, node, data);
							}
						}
					})
				])
			]);
		},
		append(data) {
			this.modal = true;
			this.treeData = data;
		},
		edit(data) {
			this.treeData = data;
			permissionGet(data.id).then(res => {
				this.formItem.name = res.result.name;
				this.formItem.path = res.result.path;
				this.modal1 = true;
            })
		},
		appendOk() {
			let value = this.formItem.name;
			let params = {
				parentId: this.treeData.id,
				name: value,
				path: this.formItem.path,
				isParent: 0
			};
			permissionInsert(params).then(res => {
                this.$Message.success('添加权限成功!');
				/*const children = this.treeData.children || [];
				children.push({
					title: value,
					expand: true
				});
				this.$set(this.treeData, 'children', children);*/
				this._selectAllPermission();
                this.modal = false;
                this.formItem.name = '';
                this.formItem.path = '';
			});
		},
		editOk() {
			let value = this.formItem.name;
			let params = {
				id: this.treeData.id,
				name: value,
				path: this.formItem.path
			};
			permissionUpdate(params).then(res => {
                this.$Message.success('编辑权限成功!');
				/*this.treeData.title = value;*/
				this._selectAllPermission();
                this.modal1 = false;
                this.formItem.name = '';
                this.formItem.path = '';
			});
		},
		cancel() {
			this.modal = false;
			this.formItem.name = '';
			this.formItem.path = '';
		},
		remove(root, node, data) {
			let params = {
				params: {
					id: data.id,
					parentId: data.parentId
                }
			};
			permissionDelete(params).then(res => {
                this.$Message.success('删除权限成功!');
                /*const parentKey = root.find(el => el === node).parent;
                const parent = root.find(el => el.nodeKey === parentKey).node;
                const index = parent.children.indexOf(data);*/
                this._selectAllPermission();
                parent.children.splice(index, 1);
			});
		},
		_selectAllPermission() {
			selectAllPermission().then(res => {
				this.data = res.result;
			});
		},
		getCheckedNodes() {
            this.checkedNodes = this.$refs.tree.getCheckedNodes();
            this.$emit('on-check', this.checkedNodes);
		}
	}
};
</script>
