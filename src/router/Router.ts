import type ServiceFactory from '@/factory/ServiceFactory'
import { createRouter, createWebHistory } from 'vue-router'

export default class Router {

	constructor (readonly serviceFactory: ServiceFactory) {
	}

	build () {
		const router = createRouter({
			history: createWebHistory(process.env.BASE_URL),
			routes: [
				{
					path: '/',
					name: 'main',
					component: () => import('../views/MainView.vue'),
					props: {
						serviceFactory: this.serviceFactory
					}
				}
			]
		});
		return router;
	}
}
