<template>
    <Card>
        <p slot="title">
            <Icon type="ios-keypad"></Icon>
            添加板块
        </p>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
            <FormItem label="板块名称" prop="panelName">
                <Input v-model="formValidate.panelName" placeholder="请输入板块分类名称"/>
            </FormItem>
            <FormItem label="类型" prop="typeId">
                <Select v-model="formValidate.typeId" placeholder="请选择类型" clearable>
                    <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </FormItem>
            <FormItem label="排序值" prop="sort">
                <Input v-model="formValidate.sort" placeholder="0~,排序值越小越靠前"/>
            </FormItem>
            <FormItem label="是否启用" prop="status">
                <i-switch v-model="formValidate.switch" size="large">
                    <span slot="open">启用</span>
                    <span slot="close">禁用</span>
                </i-switch>
            </FormItem>
            <FormItem label="备注" prop="remark">
                <Input v-model="formValidate.remark" type="textarea" placeholder="请输入备注信息"/>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
                <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
            </FormItem>
        </Form>
    </Card>
</template>

<script>
    import {getAllPanelType, panelInsert} from '../../api/manager.js';
    import {SUCCESS} from '../../common/consts';
    export default {
        name: "add_panel",
        data() {
            return {
                typeList: [],
                formValidate: {
                    panelName: '',
                    typeId: '',
                    sort:'',
                    switch: true,
                    remark:''
                },
                ruleValidate: {
                    panelName: [
                        {required: true, message: '请输入板块分类名称', trigger: 'blur'}
                    ],
                    sort: [
                        {required: true, message: '请输入排序值', trigger: 'blur'}
                    ],
                }
            }
        },
        methods: {
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        let params = {
                            panelName: this.formValidate.panelName,
                            typeId: this.formValidate.typeId,
                            sort: this.formValidate.sort,
                            remark: this.formValidate.remark
                        };
                        if (this.formValidate.switch) {
                            params.status = 1;
                        }   else {
                            params.status = 0;
                        }
                        panelInsert(params).then(res => {
                            if (res.status === SUCCESS) {
                                this.$Message.success('添加数据成功');
                                this.$router.push({
                                    name: 'panel'
                                });
                            } else {
                                this.$Message.error(res.message);
                            }
                        });

                        console.log(JSON.stringify(params))
                    } else {
                        this.$Message.error('请输入正确的数据');
                    }
                })
            },
            handleReset(name) {
                this.$refs[name].resetFields();
            },
            _getAllPanelType () {
                getAllPanelType().then(res => {
                    if (res.status === SUCCESS) {
                        res.result.map(item =>{
                            this.typeList.push({
                                value: item.id,
                                label: item.typeName
                            })
                        });
                    } else {
                        this.$Message.error(res.message);
                    }
                });
            }
        },
        mounted() {
            this._getAllPanelType();
            this.formValidate = {
                typeName: '',
                typeId: '',
                sort:'',
                switch: true,
                remark:''
            }
        }
    }
</script>

<style scoped>

</style>