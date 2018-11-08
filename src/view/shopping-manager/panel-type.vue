<style lang="less">
    @import "../../assets/style/common";
</style>

<template>
    <div>
        <Card>
            <p slot="title">
                <Icon type="ios-keypad"></Icon>
                板块类型
            </p>
            <Button @click="goAdd" type="primary" icon="md-add">添加板块类型</Button>
            <div class="margin-top-10">
                <Table border :columns="columns" :data="data"></Table>
            </div>
        </Card>
    </div>
</template>

<script>
    import {getAllPanelType} from '../../api/manager.js';
    import {SUCCESS} from '../../common/consts';
    export default {
        name: 'panel-type',
        data () {
            return {
                columns: [
                    {
                        title: '类型ID',
                        width: 120,
                        key: 'id'
                    },
                    {
                        title: '类型名称',
                        key: 'typeName'
                    },
                    {
                        title: '最大图片数',
                        key: 'maxPicture'
                    },
                    {
                        title: '类型图片',
                        key: 'typeImage'
                    }
                ],
                data: []
            };
        },
        methods: {
            goAdd () {
                this.$router.push({
                    name: 'add_panel_type'
                });
            },
            _getAllPanelType () {
                getAllPanelType().then(res => {
                    if (res.status === SUCCESS) {
                        this.data = res.result;
                    } else {
                        this.$Message.error(res.message);
                    }
                });
            }
        },
        mounted () {
            this._getAllPanelType();
        }
    };
</script>
