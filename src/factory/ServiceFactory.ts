import type HttpClient from "@/infra/HttpClient";
import ItemService from "@/service/ItemService";
import OrderService from "@/service/OrderService";

export default class ServiceFactory {

	constructor (readonly httpClient: HttpClient, readonly baseUrl: string) {
	}

	createItemService() {
		return new ItemService(this.httpClient, this.baseUrl);
	}

	createOrderService() {
		return new OrderService(this.httpClient, this.baseUrl);
	}
}
