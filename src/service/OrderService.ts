import type Item from "@/domain/entity/Item";
import type Order from "@/domain/entity/Order";
import type HttpClient from "@/infra/HttpClient";

export default class OrderService {

	constructor (readonly httpClient: HttpClient, readonly baseUrl: string) {
	}

	async placeOrder(order: Order): Promise<Item[]> {
		const placeOrderData = await this.httpClient.post(`${this.baseUrl}/orders`, order);
		return placeOrderData;
	}
}
