<template>
    <div>
        <Tree v-if="isEdit" :data="data" @click.native="getSelectedNodes" :render="renderContent" ref="tree"></Tree>
        <Tree v-else :data="data" @click.native="getSelectedNodes" ref="tree"></Tree>
        <Modal
                v-model="modal"
                title="添加分类"
                @on-ok="appendOk"
                @on-cancel="cancel"
                width="335">
            <Input v-model="value" placeholder="请输入分类名称..." style="width: 300px"/>
        </Modal>
    </div>
</template>

<script>
    import {getAllGoodsClass, goodsClassInsert, goodsClassDelete} from '../../../api/goods.js';
    export default {
        name: 'goods-class-tree',
        props: {
            isEdit: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {
                value: '',
                modal: false,
                treeData: '',
                data: [],
                selectedNodes: [],
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
            renderContent (h, {root, node, data}) {
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
                                icon: 'ios-add',
                                type: data.parent ? 'primary' : 'success'
                            }),
                            style: {
                                marginRight: data.parent ? '' : '8px',
                                width: data.parent ? '64px' : ''
                            },
                            on: {
                                click: () => {
                                    this.append(data);
                                }
                            }
                        }),
                        h('Button', {
                            props: Object.assign({}, this.buttonPropsError, {
                                icon: 'ios-remove'
                            }),
                            style: {
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
            append (data) {
                this.modal = true;
                this.treeData = data;
            },
            appendOk () {
                let value = this.value;
                const children = this.treeData.children || [];
                children.push({
                    title: value,
                    expand: true
                });
                this.$set(this.treeData, 'children', children);

                let params = {
                    parentId: this.treeData.id,
                    className: value,
                    isParent: 0
                };
                goodsClassInsert(params).then(res => {
                    if (res.status === 0) {
                        this.$Message.success('添加分类成功!');
                        this.modal = false;
                        this.value = '';
                        this._getAllGoodsClass();
                    } else {
                        this.$Message.error(res.message);
                    }
                });
            },
            cancel () {
                this.modal = false;
                this.value = '';
            },
            remove (root, node, data) {
                let params = {
                	params: {
		                id: data.id,
		                parentId: data.parentId
                    }
                };
                goodsClassDelete(params).then(res => {
                    if (res.status === 0) {
                        this.$Message.success('删除分类成功!');
                        this._getAllGoodsClass();
                    } else {
                        this.$Message.error(res.message);
                    }
                });
            },
            _getAllGoodsClass () {
                getAllGoodsClass().then(res => {
                    if (res.status === 0) {
                        this.data = res.result;
                    } else {
                        this.$Message.error(res.message);
                    }
                });
            },
            getSelectedNodes () {
                let selectedNodes = this.$refs.tree.getSelectedNodes();
                if (selectedNodes.length === 0) {
                    return;
                }
                if (selectedNodes[0].parent) {
                    this.$Message.error('请选择子分类');
                } else {
                    this.selectedNodes = this.$refs.tree.getSelectedNodes();
                    this.$emit('on-select', this.selectedNodes);
                }
            }
        },
        mounted () {
            this._getAllGoodsClass();
        }
    };
</script>
