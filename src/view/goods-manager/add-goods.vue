<style lang="less">
    @import "../../assets/style/common";
    @import 'add-goods';
</style>

<template>
    <div>
        <Row class="margin-top-10">
            <Col span="5">
                <Card>
                    <p slot="title">
                        <Icon type="ios-keypad"></Icon>
                        选择分类
                    </p>
                    <div class="margin-top-10">
                        <goods-class-tree @on-select="handleSelect"></goods-class-tree>

                    </div>
                </Card>
            </Col>
            <Col span="19">
                <Card>
                    <p slot="title">
                        <Icon type="ios-keypad"></Icon>
                        添加商品
                    </p>
                    <div class="margin-top-10">
                        <Form :model="formItem" ref="formItem" :rules="ruleValidate" :label-width="100">
                            <FormItem label="商品名称" prop="goodsName">
                                <Input v-model="formItem.goodsName" placeholder="请输入商品名称"/>
                            </FormItem>
                            <FormItem label="商品分类" prop="goodsClass">
                                <Input v-model="formItem.goodsClass" placeholder="请选择左侧商品分类" disabled/>
                            </FormItem>
                            <FormItem label="商品价格" prop="goodsPrice">
                                <Input v-model="formItem.goodsPrice" placeholder="请输入商品价格"/>
                            </FormItem>
                            <FormItem label="库存数量" prop="goodsNum">
                                <Input v-model="formItem.goodsNum" placeholder="请输入商品库存数量"/>
                            </FormItem>
                            <FormItem label="商品条形码" prop="goodsBarcode">
                                <Input v-model="formItem.goodsBarcode" placeholder="请输入商品条形码"/>
                            </FormItem>
                            <FormItem label="上/下架">
                                <i-switch v-model="formItem.switch" size="large">
                                    <span slot="open">上架</span>
                                    <span slot="close">下架</span>
                                </i-switch>
                            </FormItem>
                            <FormItem label="商品图片" prop="goodsImage">
                                <div class="add-goods-upload-list" v-for="item in uploadList">
                                    <template v-if="item.status === 'finished'">
                                        <img :src="item.url">
                                        <div class="add-goods-upload-list-cover">
                                            <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                                            <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                                        </div>
                                    </template>
                                    <template v-else>
                                        <Progress v-if="item.showProgress" :percent="item.percentage"
                                                  hide-info></Progress>
                                    </template>
                                </div>
                                <Upload
                                        ref="upload"
                                        :show-upload-list="false"
                                        :default-file-list="defaultList"
                                        :on-success="handleSuccess"
                                        :format="['jpg','jpeg','png']"
                                        :max-size="2048"
                                        :on-format-error="handleFormatError"
                                        :on-exceeded-size="handleMaxSize"
                                        :before-upload="handleBeforeUpload"
                                        multiple
                                        type="drag"
                                        :action="uploadAction"
                                        style="display: inline-block;width:58px;">
                                    <div style="width: 58px;height:58px;line-height: 58px;">
                                        <Icon type="camera" size="20"></Icon>
                                    </div>
                                </Upload>
                                <Modal title="View Image" v-model="visible">
                                    <img :src="imgName" v-if="visible" style="width: 100%">
                                </Modal>
                            </FormItem>
                            <FormItem label="商品描述" prop="goodsDesc">
                                <editor v-model="content" @on-change="handleChange"/>
                            </FormItem>
                            <FormItem>
                                <Button type="primary" @click="handleSubmit('formItem')">提交</Button>
                                <Button type="warning" @click="handleReset('formItem')" style="margin-left: 8px">重置
                                </Button>
                            </FormItem>
                        </Form>
                    </div>
                </Card>
            </Col>
        </Row>

    </div>
</template>

<script>
    import {goodsInsert} from '../../api/goods';
    import goodsClassTree from './components/goods-class-tree';
    import Editor from '_c/editor'
    import {SUCCESS, UPLOAD_ACTION} from '../../common/consts';

    export default {
        components: {
            goodsClassTree,
            Editor
        },
        data() {
            return {
                formItem: {
                    goodsName: '',
                    goodsClass: '',
                    goodsCid: '',
                    goodsPrice: '',
                    goodsNum: '',
                    goodsBarcode: '',
                    switch: true
                },
                content: '',
                defaultList: [],
                imgName: '',
                visible: false,
                uploadList: [],
                imageList: [],
                uploadAction: UPLOAD_ACTION,
                ruleValidate: {
                    goodsName: [
                        {required: true, message: '请填写商品名称', trigger: 'blur'}
                    ],
                    goodsClass: [
                        {required: true, message: '请选择商品分类', trigger: 'change'}
                    ],
                    goodsPrice: [
                        {required: true, message: '请填写商品价格', trigger: 'blur'}
                    ],
                    goodsNum: [
                        {required: true, message: '请填写库存数量', trigger: 'blur'}
                    ],
                    goodsBarcode: [
                        {required: true, message: '请填写商品条形码', trigger: 'blur'}
                    ]
                }
            };
        },
        methods: {
            handleView(name) {
                this.imgName = name;
                this.visible = true;
            },
            handleRemove(file) {
                const fileList = this.$refs.upload.fileList;
                this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
                this.imageList.splice(fileList.indexOf(file), 1);
            },
            handleSuccess(res, file) {
                file.url = res.result;
                file.name = res.result;
                this.imageList.push(res.result);
            },
            handleFormatError(file) {
                this.$Notice.warning({
                    title: '图片格式不正确',
                    desc: '文件' + file.name + '后缀名不正确,请上传.jpg或.png.'
                });
            },
            handleMaxSize(file) {
                this.$Notice.warning({
                    title: '图片大小超出限制',
                    desc: '文件' + file.name + '太大,不能超过2M.'
                });
            },
            handleBeforeUpload() {
                const check = this.uploadList.length < 5;
                if (!check) {
                    this.$Notice.warning({
                        title: '最多上传5张商品图片.'
                    });
                }
                return check;
            },
            handleChange(html, text) {
                this.formItem.goodsDesc = html;
            },
            handleSubmit: function (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        /*if (this.uploadList.length < 1) {
                            this.$Notice.warning({
                                title: '最少上传1张商品图片.'
                            });
                            return;
                        }*/
                        let params = {
                            goodsName: this.formItem.goodsName,
                            goodsCid: this.formItem.goodsCid,
                            goodsNum: this.formItem.goodsNum,
                            goodsBarcode: this.formItem.goodsBarcode,
                            goodsPrice: this.formItem.goodsPrice,
                            goodsDesc: this.formItem.goodsDesc
                        };
                        if (this.formItem.switch) {
                            params.goodsStatus = 1;
                        } else {
                            params.goodsStatus = 2;
                        }
                        params.goodsImage = this.imageList.join(',');
                        goodsInsert(params).then(res => {
                            if (res.status === SUCCESS) {
                                this.$Message.success('添加商品成功');
                                /*this.$router.push({
                                    name: 'query-goods'
                                });*/
                            } else {
                                this.$Message.error(res.message);
                            }
                        });
                    } else {
                        this.$Message.error('请填写正确的数据!');
                    }
                });
            },
            handleReset(name) {
                this.$refs[name].resetFields();
                this.$refs.upload.clearFiles();
                localStorage.editorContent = '';
            },
            handleSelect(selectedNodes) {
                this.formItem.goodsClass = selectedNodes[0].title;
                this.formItem.goodsCid = selectedNodes[0].id;
            }
        },
        mounted() {
            this.content = '';
            localStorage.editorCache = '';
            this.uploadList = this.$refs.upload.fileList;
        }
    };
</script>
