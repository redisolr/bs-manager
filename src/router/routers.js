import Main from '@/view/main'
import parentView from '@/components/parent-view'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面不会缓存
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 * }
 */

export default [
    {
        path: '/login',
        name: 'login',
        meta: {
            title: 'Login - 登录',
            hideInMenu: true
        },
        component: () => import('@/view/login/login.vue')
    },
    {
        path: '/',
        name: 'home',
        redirect: '/home',
        component: Main,
        meta: {
            hideInMenu: true,
            notCache: true
        },
        children: [
            {
                path: 'home',
                name: 'home',
                meta: {
                    hideInMenu: true,
                    notCache: true
                },
                component: () => import('@/view/single-page/home')
            }
        ]
    },
    {
        path: '/components',
        name: 'components',
        meta: {
            icon: 'logo-buffer',
            title: '组件'
        },
        component: Main,
        children: [
            {
                path: 'count_to_page',
                name: 'count_to_page',
                meta: {
                    icon: 'md-trending-up',
                    title: '数字渐变'
                },
                component: () => import('@/view/components/count-to/count-to.vue')
            },
            {
                path: 'markdown_page',
                name: 'markdown_page',
                meta: {
                    icon: 'logo-markdown',
                    title: 'Markdown编辑器'
                },
                component: () => import('@/view/components/markdown/markdown.vue')
            },
            {
                path: 'editor_page',
                name: 'editor_page',
                meta: {
                    icon: 'ios-create',
                    title: '富文本编辑器'
                },
                component: () => import('@/view/components/editor/editor.vue')
            },
            {
                path: 'icons_page',
                name: 'icons_page',
                meta: {
                    icon: '_bear',
                    title: '自定义图标'
                },
                component: () => import('@/view/components/icons/icons.vue')
            }
        ]
    },
    {
        path: '/shopping_manager',
        name: '/shopping_manager',
        meta: {
            icon: 'ios-albums',
            title: '商城管理'
        },
        component: Main,
        children: [
            {
                path: 'panel_type',
                name: 'panel_type',
                meta: {
                    icon: 'ios-albums-outline',
                    title: '板块类型'
                },
                component: () => import('@/view/shopping-manager/panel-type.vue')
            },
            {
                path: 'add_panel_type',
                name: 'add_panel_type',
                meta: {
                    icon: 'ios-albums-outline',
                    hideInMenu: true,
                    title: '添加板块类型'
                },
                component: () => import('@/view/shopping-manager/add-panel-type.vue')
},
            {
                path: 'panel',
                name: 'panel',
                meta: {
                    icon: 'ios-albums-outline',
                    title: '板块定义'
                },
                component: () => import('@/view/shopping-manager/panel.vue')
            },
            {
                path: 'add_panel',
                name: 'add_panel',
                meta: {
                    icon: 'ios-albums-outline',
                    hideInMenu: true,
                    title: '添加板块'
                },
                component: () => import('@/view/shopping-manager/add-panel.vue')
            },
            {
                path: 'panel_content',
                name: 'panel_content',
                meta: {
                    icon: 'ios-albums-outline',
                    title: '板块内容'
                },
                component: () => import('@/view/shopping-manager/panel-content.vue')
            },
            {
                path: 'add_panel_content/:id',
                name: 'add_panel_content',
                meta: {
                    icon: 'ios-albums-outline',
                    hideInMenu: true,
                    title: '添加板块内容'
                },
                component: () => import('@/view/shopping-manager/add-panel-content.vue')
            },
	        {
		        path: 'edit_panel_content/:id',
		        name: 'edit_panel_content',
		        meta: {
			        icon: 'ios-albums-outline',
			        hideInMenu: true,
			        title: '编辑板块内容'
		        },
		        component: () => import('@/view/shopping-manager/edit-panel-content.vue')
	        }
        ]
    },
    {
        path: '/goods_manager',
        name: '/goods_manager',
        meta: {
            icon: 'ios-albums',
            title: '商品管理'
        },
        component: Main,
        children: [
            {
                path: 'goods_class',
                name: 'goods_class',
                meta: {
                    icon: 'ios-list',
                    title: '分类管理'
                },
                component: () => import('@/view/goods-manager/goods-class.vue')
            },
            {
                path: 'query_goods',
                name: 'query_goods',
                meta: {
                    icon: 'ios-list',
                    title: '商品管理'
                },
                component: () => import('@/view/goods-manager/query-goods.vue')
            },
            {
                path: 'add_goods',
                name: 'add_goods',
                meta: {
                    icon: 'ios-list',
                    title: '添加商品',
	                hideInMenu: true,
                },
                component: () => import('@/view/goods-manager/add-goods.vue')
            },
            {
                path: 'edit_goods/:id',
                name: 'edit_goods',
                meta: {
                    title: '編輯商品',
                    hideInMenu: true
                },
                component: () => import('@/view/goods-manager/edit-goods.vue')
            }

        ]
    },
	{
		path: '/order_manager',
		name: 'order_manager',
		meta: {
			icon: 'ios-albums',
			title: '订单管理'
		},
		component: Main,
		children: [
			{
				path: 'query_order',
				name: 'query_order',
				meta: {
					icon: 'ios-list',
					title: '订单管理'
				},
				component: () => import('@/view/order-manager/query-order.vue')
			},
			{
				path: 'order_count',
				name: 'order_count',
				meta: {
					icon: 'ios-stats',
					title: '订单统计'
				},
				component: () => import('@/view/order-manager/order-count.vue')
			}

		]
	},
	{
		path: '/user_manager',
		name: 'user_manager',
		meta: {
			icon: 'ios-person',
			title: '用户管理'
		},
		component: Main,
		children: [
			{
				path: 'user_list',
				name: 'user_list',
				meta: {
					icon: 'ios-person',
					title: '用户管理'
				},
				component: () => import('@/view/user-manager/user-list.vue')
			}
		]
	},
	{
		path: '/admin_manager',
		name: '/admin_manager',
		meta: {
			icon: 'ios-albums',
			title: '管理员管理'
		},
		component: Main,
		children: [
			{
				path: 'permission_manager',
				name: 'permission_manager',
				meta: {
					icon: 'ios-list',
					title: '权限管理'
				},
				component: () => import('@/view/admin-manager/permission-manager.vue')
			},
			{
				path: 'role_manager',
				name: 'role_manager',
				meta: {
					icon: 'ios-list',
					title: '角色管理'
				},
				component: () => import('@/view/admin-manager/role-manager.vue')
			},
			{
				path: 'add_role',
				name: 'add_role',
				meta: {
					icon: 'ios-list',
					title: '添加角色',
					hideInMenu: true
				},
				component: () => import('@/view/admin-manager/add-role.vue')
			},
			{
				path: 'edit_role/:id',
				name: 'edit_role',
				meta: {
					icon: 'ios-list',
					title: '编辑角色',
					hideInMenu: true
				},
				component: () => import('@/view/admin-manager/edit-role.vue')
			},
			{
				path: 'admin_list',
				name: 'admin_list',
				meta: {
					icon: 'ios-list',
					title: '管理员列表',
				},
				component: () => import('@/view/admin-manager/admin-list.vue')
			},
			{
				path: 'add_admin',
				name: 'add_admin',
				meta: {
					icon: 'ios-list',
					title: '添加管理员',
					hideInMenu: true
				},
				component: () => import('@/view/admin-manager/add-admin.vue')
			},
			{
				path: 'edit_admin/:id',
				name: 'edit_admin',
				meta: {
					icon: 'ios-list',
					title: '编辑管理员',
					hideInMenu: true
				},
				component: () => import('@/view/admin-manager/edit-admin.vue')
			},
		]
	},
    {
        path: '/401',
        name: 'error_401',
        meta: {
            hideInMenu: true
        },
        component: () => import('@/view/error-page/401.vue')
    },
    {
        path: '/500',
        name: 'error_500',
        meta: {
            hideInMenu: true
        },
        component: () => import('@/view/error-page/500.vue')
    },
    {
        path: '*',
        name: 'error_404',
        meta: {
            hideInMenu: true
        },
        component: () => import('@/view/error-page/404.vue')
    }
]
