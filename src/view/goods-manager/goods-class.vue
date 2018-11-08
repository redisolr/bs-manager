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
                        商品分类
                    </p>
                    <Button type="primary" @click="rootModal = true">添加根分类</Button>
                    <div class="margin-top-10">
                        <goods-class-tree is-edit></goods-class-tree>
                    </div>
                    <Modal
                            v-model="rootModal"
                            title="添加根分类"
                            @on-ok="confirmRootClass"
                            @on-cancel="cancelRootClass"
                            width="335">
                        <Input v-model="rootValue" placeholder="请输入根分类名称..." style="width: 300px"/>
                    </Modal>
                </Card>
            </Col>
        </Row>

    </div>
</template>

<script>
    import {getAllGoodsClass, goodsClassInsert} from '../../api/goods.js';
    import goodsClassTree from './components/goods-class-tree';

    export default {
        components: {
            goodsClassTree
        },
        data () {
            return {
                rootValue: '',
                rootModal: false
            };
        },
        methods: {
            confirmRootClass () {
                let params = {
                    parentId: 0,
                    className: this.rootValue,
                    isParent: 0
                };
                goodsClassInsert(params).then(res => {
                    if (res.status === 0) {
                        this.$Message.success('添加根分类成功!');
                        this.rootModal = false;
                        this.rootValue = '';
                        this._getAllGoodsClass();
                    } else {
                        this.$Message.error(res.message);
                    }
                });
            },
            cancelRootClass () {
                this.rootModal = false;
                this.rootValue = '';
            },
            _getAllGoodsClass () {
                getAllGoodsClass().then(res => {
                    if (res.status === 0) {
                        this.data = res.result;
                    } else {
                        this.$Message.error(res.message);
                    }
                });
            }
        }
    }
</script>
