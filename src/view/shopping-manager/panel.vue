<style lang="less">
    @import "../../assets/style/common";
</style>

<template>
    <div>
        <Card>
            <p slot="title">
                <Icon type="ios-keypad"></Icon>
                板块定义
            </p>
            <Button @click="goAdd" type="primary" icon="md-add">添加板块</Button>
            <div class="margin-top-10">
                <Table border :columns="columns" :data="data"></Table>
            </div>
        </Card>
    </div>
</template>

<script>
    import {getAllPanel} from '../../api/manager.js';
    import {SUCCESS} from '../../common/consts';
    export default {
        name: 'panel',
        data () {
            return {
                columns: [
                    {
                        title: '类型ID',
                        width: 120,
                        key: 'id'
                    },
                    {
                        title: '板块名称',
                        key: 'panelName'
                    },
                    {
                        title: '板块名称',
                        key: 'typeName'
                    },
                    {
                        title: '排序值',
                        key: 'sort'
                    },
                    {
                        title: '状态',
                        key: 'status',
                        render: (h, params) => {
                            const row = params.row;
                            const type = row.status === 1 ? 'success' : 'error';
                            const icon = row.status === 1 ? 'ios-checkmark-circle-outline' : 'ios-close-circle-outline';
                            const text = row.status === 1 ? '启用' : '禁用';
                            return h('Button', {
                                props: {
                                    type: type,
                                    icon: icon
                                }
                            }, text);
                        }
                    },
                    {
                        title: '备注',
                        key: 'remark'
                    }
                ],
                data: []
            };
        },
        methods: {
            goAdd () {
                this.$router.push({
                    name: 'add_panel'
                });
            },
            _getAllPanel () {
                getAllPanel().then(res => {
                    if (res.status === SUCCESS) {
                        this.data = res.result;
                    } else {
                        this.$Message.error(res.message);
                    }
                });
            }
        },
        mounted () {
            this._getAllPanel();
        }
    };
</script>
