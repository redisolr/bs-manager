<template>
    <Card>
        <p slot="title">
            <Icon type="ios-keypad"></Icon>
            编辑角色
        </p>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <FormItem label="角色名称:" prop="name">
                <Input v-model="formValidate.name" placeholder="请输入角色名称"/>
            </FormItem>
            <FormItem label="选择权限:">
                <permission-tree @on-check="handleCheck" :data="data"></permission-tree>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
                <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
            </FormItem>
        </Form>
    </Card>
</template>

<script>
import {roleUpdate, roleGet, selectAllPermission} from '../../api/user';
import permissionTree from './components/permission-tree';

export default {
	name: "edit-role",
	components: {
		permissionTree
	},
	data() {
		return {
			formValidate: {
				name: ''
			},
			rolePermissionList: [],
			checkedData:[],
			data: [],
			ruleValidate: {
				name: [
					{required: true, message: '请输入角色名称', trigger: 'blur'}
				]
			}
		}
	},
	methods: {
		handleCheck(nodes) {
			this.rolePermissionList = [];
			nodes.map(item => {
				let permissionMap = {
					permissionId: item.id
				};
				this.rolePermissionList.push(permissionMap);
			});
		},
		handleSubmit: function (name) {
			this.$refs[name].validate((valid) => {
				if (valid) {
					if (this.rolePermissionList.length === 0) {
						this.$Message.error('请选择权限!');
						return;
					}
					let params = {
						id:this.$route.params.id,
						name: this.formValidate.name,
						rolePermissionList: this.rolePermissionList
					};
					console.log(JSON.stringify(params))
					roleUpdate(params).then(res => {
						this.$Message.success('修改权限成功');
						this.$router.push({
							name: 'role_manager'
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
		init() {
			roleGet(this.$route.params.id).then(res => {
				this.checkedData = [];
				this.formValidate = {
					name: res.result.name,
				};
				res.result.rolePermissionList.map(item => {
					this.rolePermissionList.push(item);
					this.checkedData.push(item.permissionId);
                });
				selectAllPermission().then(res => {
                    this._checkedData(res.result);
					this.data = res.result;
				});
			});
		},
		_checkedData(result){
			result.map(item => {
				if (item.parent){
					this._checkedData(item.children);
				} else {
					item.checked = this.checkedData.indexOf(item.id) > -1;
				}
			})
		},
	},
	mounted() {
		this.init();
	}
}
</script>

<style scoped>

</style>