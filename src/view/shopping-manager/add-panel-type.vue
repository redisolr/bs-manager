<style lang="less">
    @import "../../assets/style/common";

    .row_image img {
        width: 100%;
        height: 20%;
        border-radius: 15px;
        border: 2px solid dodgerblue;
    }
    .row_image p {
        text-align: center;
        margin-bottom: 10px;
    }
</style>
<template>
    <div>
        <Card>
            <p slot="title">
                <Icon type="ios-keypad"></Icon>
                添加模块类型
            </p>
            <Row :gutter="16" class="row_image">
                <RadioGroup v-model="panelType">
                    <Col span="6">
                        <div>
                            <p>
                                <Radio label="轮播图"></Radio>
                            </p>
                            <img :src="images[0]"/>
                        </div>
                    </Col>
                    <Col span="6">
                        <div>
                            <p>
                                <Radio label="类型1"></Radio>
                            </p>
                            <img :src="images[1]"/>
                        </div>
                    </Col>
                    <Col span="6">
                        <div>
                            <p>
                                <Radio label="类型2"></Radio>
                            </p>
                            <img :src="images[2]"/>
                        </div>
                    </Col>
                    <Col span="6">
                        <div>
                            <p>
                                <Radio label="类型3"></Radio>
                            </p>
                            <img :src="images[3]"/>
                        </div>
                    </Col>
                </RadioGroup>
            </Row>
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
                <FormItem label="板块分类名称" prop="typeName">
                    <Input v-model="formValidate.typeName" placeholder="请输入板块分类名称"/>
                </FormItem>
                <FormItem label="最大图片数量" prop="maxPicture">
                    <Input v-model="formValidate.maxPicture" placeholder="请输入板块最大容纳图片数量"/>
                </FormItem>

                <FormItem>
                    <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
                    <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
                </FormItem>
            </Form>
        </Card>
    </div>
</template>

<script>
    import {panelTypeInsert} from '../../api/manager.js';
    import {SUCCESS} from '../../common/consts';
    let images = [
        "https://bs-pantel-type.oss-cn-beijing.aliyuncs.com/p_t_lbt.png",
        "https://bs-pantel-type.oss-cn-beijing.aliyuncs.com/p_t1.png",
        "https://bs-pantel-type.oss-cn-beijing.aliyuncs.com/p_t2.png",
        "https://bs-pantel-type.oss-cn-beijing.aliyuncs.com/p_t3.png"
    ];
    export default {
        name: "add-panel-type",
        data() {
            return {
                images: images,
                panelType:'轮播图',
                formValidate: {
                    typeName: '',
                    maxPicture: ''
                },
                ruleValidate: {
                    typeName: [
                        {required: true, message: '请输入板块分类名称', trigger: 'blur'}
                    ],
                    maxPicture: [
                        {required: true, message: '请输入板块最大容纳图片数量', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        let params = {
                            typeName: this.formValidate.typeName,
                            maxPicture: this.formValidate.maxPicture
                        };
                        if (this.panelType === '轮播图'){
                            params.typeImage = this.images[0];
                        } else if (this.panelType === '类型1') {
                            params.typeImage = this.images[1];
                        } else if (this.panelType === '类型2') {
                            params.typeImage = this.images[2];
                        } else if (this.panelType === '类型3') {
                            params.typeImage = this.images[3];
                        }
                        panelTypeInsert(params).then(res => {
                            if (res.status === SUCCESS){
                                this.$Message.success('添加数据成功');
                                this.$router.push({
                                    name: 'panel_type'
                                });
                            } else {
                                this.$Message.error('添加数据失败');
                            }
                        })
                    } else {
                        this.$Message.error('请输入正确的数据');
                    }
                })
            },
            handleReset(name) {
                this.$refs[name].resetFields();
            }
        },
        mounted() {
            this.formValidate = {
                typeName: '',
                maxPicture: ''
            }
        }
    }
</script>

