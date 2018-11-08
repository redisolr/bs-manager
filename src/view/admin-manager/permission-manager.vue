<style lang="less">
    @import "../../assets/style/common";
</style>

<template>
    <Card>
        <p slot="title">
            <Icon type="ios-keypad"></Icon>
            权限管理
        </p>
        <Button type="primary" @click="rootModal = true" icon="md-add">添加模块</Button>
        <div class="margin-top-10">
            <permission-tree is-edit :data="data"></permission-tree>
        </div>
        <Modal
                v-model="rootModal"
                title="添加模块"
                @on-ok="confirmRootClass"
                @on-cancel="cancelRootClass"
                width="335">
            <Input v-model="rootValue" placeholder="请输入模块名称..." style="width: 300px"/>
        </Modal>
    </Card>
</template>

<script>
import {permissionInsert, selectAllPermission} from '../../api/user.js';
import permissionTree from './components/permission-tree';

export default {
	name: 'permission-manager',
	components: {
		permissionTree
	},
	data() {
		return {
			rootValue: '',
			rootModal: false,
            data: []
		};
	},
	methods: {
		confirmRootClass() {
			let params = {
				parentId: 0,
				name: this.rootValue,
				isParent: 0
			};
			permissionInsert(params).then(res => {
				if (res.status === 0) {
					this.$Message.success('添加模块成功!');
					this.rootModal = false;
					this.rootValue = '';
					this._selectAllPermission();
				} else {
					this.$Message.error(res.message);
				}
			});
		},
		cancelRootClass() {
			this.rootModal = false;
			this.rootValue = '';
		},
		_selectAllPermission() {
			selectAllPermission().then(res => {
				if (res.status === 0) {
					this.data = res.result;
				} else {
					this.$Message.error(res.message);
				}
			});
		}
	},
	mounted() {
		this._selectAllPermission();
	}
}
</script>
