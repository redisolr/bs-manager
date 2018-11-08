import http from './public';
import {OrderAPI} from './domain';

// 商品列表
export const getAllOrder = (params) => {
	return http.fetchGet(OrderAPI + '/order/managerList', params);
};
// 删除订单
export const delOrder = (params) => {
	return http.fetchDelete(OrderAPI + '/order/delete', params)
};
// 订单发货
export const deliverGoods = (params) => {
	return http.fetchGet(OrderAPI + '/order/deliver', params)
};
// 根据订单状态统计订单数量
export const countByStatus = (params) => {
	return http.fetchGet(OrderAPI + '/order/countByStatus', params)
};