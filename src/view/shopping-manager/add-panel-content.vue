<template>
    <Card>
        <p slot="title">
            <Icon type="ios-keypad"></Icon>
            添加板块内容
        </p>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
            <FormItem label="排序值" prop="sort">
                <Input v-model="formValidate.sort" placeholder="0~,排序值越小越靠前"/>
            </FormItem>
            <FormItem label="跳转url" prop="jumpUrl">
                <Input v-model="formValidate.jumpUrl">
                <Select v-model="select1" slot="prepend" style="width: 80px">
                    <Option value="http://">http://</Option>
                    <Option value="https://">https://</Option>
                </Select>
                </Input>
            </FormItem>
            <FormItem label="关联商品id" prop="goodsId">
                <Input v-model="formValidate.goodsId" placeholder="输入关联的商品id"/>
            </FormItem>
            <FormItem label="图片url">
                <Upload type="drag" :action="uploadAction" :on-success="handleSuccess" :show-upload-list="false"
                        style="width: 60%;">
                    <div style="padding: 20px 0">
                        <img v-if="imageUrl" :src="imageUrl"/>
                        <Icon v-if="!imageUrl" type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                        <p v-if="!imageUrl">点击上传图片</p>
                    </div>
                </Upload>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
                <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
            </FormItem>
        </Form>
    </Card>
</template>

<script>
import {panelContentInsert} from '../../api/manager.js';
import {SUCCESS, UPLOAD_ACTION} from '../../common/consts';

export default {
	name: "add-panel-content",
	data() {
		return {
			select1: 'http://',
			uploadAction: UPLOAD_ACTION,
			imageUrl: '',
			formValidate: {
				sort: '',
				jumpUrl: '',
				goodsId: ''
			},
			ruleValidate: {
				sort: [
					{required: true, message: '请输入排序值', trigger: 'blur'}
				],
				jumpUrl: [
					{required: true, message: '请输入跳转链接', trigger: 'blur'}
				],
				goodsId: [
					{required: true, message: '请输关联商品id', trigger: 'blur'}
				]
			}
		}
	},
	methods: {
		handleSuccess(res, file) {
			file.url = res.result;
			file.name = res.result;
			this.imageUrl = res.result;
		},
		handleSubmit(name) {
			this.$refs[name].validate((valid) => {
				if (valid) {
					let params = {
						panelId: this.$route.params.id,
						sort: this.formValidate.sort,
						jumpUrl: this.select1 + this.formValidate.jumpUrl,
						goodsId: this.formValidate.goodsId,
						pictureUrl: this.imageUrl
					};
					panelContentInsert(params).then(res => {
						if (res.status === SUCCESS) {
							this.$Message.success('添加数据成功');
						} else {
							this.$Message.error(res.message);
						}
					});
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
			sort: '',
			jumpUrl: ''
		};
		this.select1 = 'http://';
		this.imageUrl = '';
	}
}
</script>

<style scoped>

</style>