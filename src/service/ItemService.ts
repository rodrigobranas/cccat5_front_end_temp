import type Item from "@/domain/entity/Item";
import type HttpClient from "@/infra/HttpClient";

export default class ItemService {

	constructor (readonly httpClient: HttpClient, readonly baseUrl: string) {
	}

	async getAll(): Promise<Item[]> {
		const itemsData = await this.httpClient.get(`${this.baseUrl}/items`);
		return itemsData;
	}
}
