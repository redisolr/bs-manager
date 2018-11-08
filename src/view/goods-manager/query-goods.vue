<style lang="less">
    @import "../../assets/style/common";
    @import './components/table.less';
</style>

<template>
    <div>
        <Row class="margin-top-10">
            <Col span="24">
                <Card>
                    <p slot="title">
                        <Icon type="ios-keypad"></Icon>
                        商品列表
                    </p>
                    <Button @click="deleteGoodsBatch" type="error" icon="trash-b">批量删除</Button>
                    <Button @click="goAdd" type="primary" icon="toggle-filled">添加商品</Button>
                    <div class="margin-top-10">
                        <Table border ref="selection" :columns="columns" :data="data" @on-selection-change="selectionChange"></Table>
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
    import {getAllGoods, deleteById, deleteBatch} from '../../api/goods.js';
    import pageHelper from '../components/page-helper/page-helper';
    export default {
        components: {
            pageHelper
        },
        data () {
            return {
                ids : [],
                columns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '商品ID',
                        width: 120,
                        key: 'id'
                    },
                    {
                        title: '商品标题',
                        key: 'goodsName'
                    },
                    {
                        title: '商品价格',
                        key: 'goodsPrice'
                    },
                    {
                        title: '库存数量',
                        key: 'goodsNum'
                    },
                    {
                        title: '条形码',
                        key: 'goodsBarcode'
                    },
                    {
                        title: '状态',
                        key: 'goodsStatus',
                        render: (h, params) => {
                            const row = params.row;
                            const color = row.goodsStatus === 1 ? 'green' : row.status === 2 ? 'blue' : 'red';
                            const text = row.goodsStatus === 1 ? '上架' : row.status === 2 ? '下架' : '删除';
                            return h('Tag', {
                                props: {
                                    color: color
                                }
                            }, text);
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
                                            this.editGoods(params.index);
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
                                            this.deleteGoods(params.index);
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
            selectionChange (selection) {
                this.ids = [];
                selection.map(item => this.ids.push(item.id));
            },
            editGoods (index) {
                let query = {id: this.data[index].id};
                this.$router.push({
                    name: 'edit_goods',
                    params: query
                });
            },
            deleteGoods (index) {
                let params = {
                    params: {
                        id: this.data[index].id
                    }
                };
                deleteById(params).then(res => {
                    if (res.status === 0) {
                        this.$Message.success('删除商品成功!');
                        this._getAllGoods();
                    }
                });
            },
            deleteGoodsBatch () {
                if (this.ids.length === 0) {
                    this.$Message.error('请选择要操作的商品!');
                    return;
                }
                let params = {
                    ids: this.ids
                };
                deleteBatch(params).then(res => {
                    if (res.status === 0) {
                        this.$Message.success('批量删除商品成功!');
                        this._getAllGoods();
                    }
                });
            },
            goAdd () {
                this.$router.push({
                    name: 'add_goods'
                });
            },
            getData (pageSize, pageNum) {
                this.pageSize = pageSize;
                this.pageNum = pageNum;
                this._getAllGoods();
            },
            _getAllGoods () {
                let params = {
                    pageSize: this.pageSize,
                    pageNum: this.pageNum
                }
                getAllGoods(params).then(res => {
                    if (res.status === 0) {
                        this.total = res.result.total;
                        this.data = res.result.data;
                    } else {
                        this.$Message.error(res.message);
                    }
                });
            }
        },
        mounted () {
            this._getAllGoods();
        }
    }
</script>
