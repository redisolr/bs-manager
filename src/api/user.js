import http from './public';
import {UserAPI} from './domain';

// 登录
export const login = (params) => {
	return http.fetchPost(UserAPI + '/admin/login', params);
};

// 管理员列表
export const adminList = (params) => {
	return http.fetchGet(UserAPI + '/admin/list', params);
};
// 更新用户禁用启用状态
export const updateEnableState = (params) => {
	return http.fetchPut(UserAPI + '/admin/update/enable', params);
};
// 添加管理员
export const adminInsert = (params) => {
	return http.fetchPost(UserAPI + '/admin/insert', params);
};
// 管理員详情
export const adminGet = (params) => {
	return http.fetchGet(UserAPI + '/admin/get/'+ params);
};
// 編輯管理员
export const adminUpdate = (params) => {
	return http.fetchPut(UserAPI + '/admin/update', params);
};
// 删除管理員
export const adminDelete = (params) => {
	return http.fetchDelete(UserAPI + '/admin/delete', params);
};


// 查询所有权限
export const selectAllPermission = (params) => {
	return http.fetchGet(UserAPI + '/permission/selectAll', params);
};
// 添加权限
export const permissionInsert = (params) => {
	return http.fetchPost(UserAPI + '/permission/insert', params);
};
// 查询权限详情
export const permissionGet = (params) => {
	return http.fetchGet(UserAPI + '/permission/get/' + params);
};
// 编辑权限
export const permissionUpdate = (params) => {
	return http.fetchPut(UserAPI + '/permission/update', params);
};
// 删除权限
export const permissionDelete = (params) => {
	return http.fetchDelete(UserAPI + '/permission/delete', params);
};

// 角色列表
export const roleList = (params) => {
	return http.fetchGet(UserAPI + '/role/list', params);
};
// 添加角色
export const roleInsert = (params) => {
	return http.fetchPost(UserAPI + '/role/insert', params);
};
// 角色详情
export const roleGet = (params) => {
	return http.fetchGet(UserAPI + '/role/get/'+ params);
};
// 编辑角色
export const roleUpdate = (params) => {
	return http.fetchPut(UserAPI + '/role/update', params);
};
// 删除角色
export const roleDelete = (params) => {
	return http.fetchDelete(UserAPI + '/role/delete', params);
};

//用户列表
export const userList = (params) => {
	return http.fetchGet(UserAPI + '/user/list', params);
};
// 更新用户禁用启用状态
export const updateUserEnableState = (params) => {
	return http.fetchPut(UserAPI + '/user/update/enable', params);
};
