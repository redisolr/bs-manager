import http from './public';
import {ManagerAPI} from './domain';
// 查询板块类型
export const getAllPanelType = (params) => {
    return http.fetchGet(ManagerAPI + '/panelType/list', params);
};
// 添加板块类型
export const panelTypeInsert = (params) => {
    return http.fetchPost(ManagerAPI + '/panelType/insert', params);
};

// 查询板块
export const getAllPanel = (params) => {
    return http.fetchGet(ManagerAPI + '/panel/list', params);
};
// 添加板块
export const panelInsert = (params) => {
    return http.fetchPost(ManagerAPI + '/panel/insert', params);
};
// 查询板块内容
export const getPanelContentByPanelId = (params) => {
    return http.fetchGet(ManagerAPI + '/panelContent/get/'+ params);
};
// 添加板块内容
export const panelContentInsert = (params) => {
    return http.fetchPost(ManagerAPI + '/panelContent/insert', params);
};
// 获取板块内容
export const getPanelContent = (params) => {
	return http.fetchGet(ManagerAPI + '/panelContent/getPanelContent/'+ params);
};
// 编辑板块内容
export const panelContentUpdate = (params) => {
	return http.fetchPut(ManagerAPI + '/panelContent/update', params);
};
// 删除板块内容
export const panelContentDelete = (params) => {
	return http.fetchDelete(ManagerAPI + '/panelContent/delete/', params);
};