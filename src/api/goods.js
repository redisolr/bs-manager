import http from './public';
import {GoodsAPI} from './domain';
// 商品列表
export const getAllGoods = (params) => {
    return http.fetchPost(GoodsAPI + '/goods/list', params);
};
// 添加商品
export const goodsInsert = (params) => {
    return http.fetchPost(GoodsAPI + '/goods/insert', params);
};
// 获取商品详情
export const goodsGet = (params) => {
    return http.fetchGet(GoodsAPI + '/goods/get', params);
};
// 编辑商品
export const goodsUpdate = (params) => {
    return http.fetchPut(GoodsAPI + '/goods/update', params);
};
// 删除商品
export const deleteById = (params) => {
    return http.fetchDelete(GoodsAPI + '/goods/deleteById', params);
};
// 批量删除商品
export const deleteBatch = (params) => {
    return http.fetchDelete(GoodsAPI + '/goods/deleteByIds', params);
};
// 商品分类
export const getAllGoodsClass = (params) => {
    return http.fetchGet(GoodsAPI + '/goodsClass/all', params);
};
// 添加商品分类
export const goodsClassInsert = (params) => {
    return http.fetchPost(GoodsAPI + '/goodsClass/insert', params);
};
// 删除商品分类
export const goodsClassDelete = (params) => {
    return http.fetchDelete(GoodsAPI + '/goodsClass/delete', params);
};
