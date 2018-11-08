<template>
    <Card>
        <p slot="title">
            <Icon type="ios-keypad"></Icon>
            添加管理员
        </p>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <FormItem label="登录名:" prop="username">
                <Input v-model="formValidate.username" placeholder="请输入登录名"/>
            </FormItem>
            <FormItem label="密码" prop="password">
                <Input type="password" v-model="formValidate.password" placeholder="请输入密码"/>
            </FormItem>
            <FormItem label="确认密码" prop="password2">
                <Input type="password" v-model="formValidate.password2" placeholder="请输入密码"/>
            </FormItem>
            <FormItem label="手机号" prop="phone">
                <Input v-model="formValidate.phone" placeholder="请输入手机号"/>
            </FormItem>
            <FormItem label="启用/禁用">
                <i-switch v-model="formValidate.enable" size="large">
                    <span slot="open">启用</span>
                    <span slot="close">禁用</span>
                </i-switch>
            </FormItem>
            <FormItem label="角色" prop="role">
                <Select v-model="formValidate.role" filterable>
                    <Option v-for="item in roleList" :value="item.value" :disabled="item.value === 1">{{ item.label }}
                    </Option>
                </Select>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
                <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
            </FormItem>
        </Form>
    </Card>
</template>

<script>
import {adminGet, adminUpdate, roleList} from '../../api/user';
export default {
	name: "edit-admin",
	data() {
		const validatePass = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请再次输入密码'));
			} else if (value !== this.formValidate.password) {
				callback(new Error('两次输入的密码不一致'));
			} else {
				callback();
			}
		};
		return {
			formValidate: {
				username: '',
				password: '',
				password2: '',
				phone: '',
				enable: true,
				role: ''
			},
			roleList: [],
			ruleValidate: {
				username: [
					{required: true, message: '请输入角色名称', trigger: 'blur'},
					{
						pattern: /^[A-Za-z0-9_\-\u4e00-\u9fa5]{3,15}$/,
						message: '用户名为3~15位字符,支持汉字、字母、数字及"_"、"-"',
						trigger: 'blur'
					}
				],
				password: [
					{
						pattern: /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)(?![a-zA-z\d]+$)(?![a-zA-z!@#$%^&*]+$)(?![\d!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$/,
						message: '密码必须为字母+数字+特殊字符',
						trigger: 'blur'
					}
				],
				password2: [
					{validator: validatePass, trigger: 'blur'},
				],
				phone: [
					{required: true, message: '请输入手机号', trigger: 'blur'},
					{
						pattern: /^1[3|4|5|7|8][0-9]\d{4,8}$/,
						message: '请输入正确的手机号',
						trigger: 'blur'
					}
				]
			}
		}
	},
	methods: {
		handleSubmit: function (name) {
			this.$refs[name].validate((valid) => {
				if (valid) {
					let params = {
						id:this.$route.params.id,
						username: this.formValidate.username,
						password: this.formValidate.password,
						phone: this.formValidate.phone,
						enable: this.formValidate.enable,
						roleId: this.formValidate.role
					};
					adminUpdate(params).then(res => {
						this.$Message.success('编辑管理员成功');
						this.$router.push({
							name: 'admin_list'
						});
					});
				} else {
					this.$Message.error('请填写正确的数据!');
				}
			});
		},
		handleReset(name) {
			this.$refs[name].resetFields();
		},
		_roleList() {
			roleList().then(res => {
				res.result.map(item => {
					let role = {
						value: item.id,
						label: item.name
					};
					this.roleList.push(role);
				});
			});
		},
		init() {
			adminGet(this.$route.params.id).then(res => {
				this.formValidate = {
					username: res.result.username,
					phone: res.result.phone,
					enable: res.result.enable,
					role: res.result.roleId,
				};
			});
		},
	},
	mounted() {
		this.roleList = [];
		this._roleList();
		this.init();
	}
}
</script>

<style scoped>

</style>