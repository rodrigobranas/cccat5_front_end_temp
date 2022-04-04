import type Item from "./Item";
import OrderItem from "./OrderItem";

export default class Order {
	cpf: string;
	orderItems: OrderItem[];
	total: number;
	code: string | undefined;

	constructor () {
		this.cpf = "853.243.359-67";
		this.orderItems = [];
		this.total = 0;
	}

	setCode (code: string) {
		this.code = code;
	}

	addItem (item: Item) {
		const orderItem = this.orderItems.find(orderItem => orderItem.idItem === item.idItem);
		if (orderItem) {
			orderItem.quantity++;
		} else {
			this.orderItems.push(new OrderItem(item.idItem, 1));
		}
		this.total += item.price;
	}

	removeItem (item: Item) {
		const orderItem = this.orderItems.find(orderItem => orderItem.idItem === item.idItem);
		if (orderItem) {
			orderItem.quantity--;
			this.total -= item.price;
			if (orderItem.quantity === 0) {
				this.orderItems.splice(this.orderItems.indexOf(orderItem), 1);
			}
		}
	}

	getTotal () {
		return this.total;
	}
}
