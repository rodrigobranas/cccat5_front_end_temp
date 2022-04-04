import Item from '@/domain/entity/Item';
import Order from '@/domain/entity/Order';

describe('test', () => {
	it('test', () => {
		const order = new Order();
		order.addItem(new Item(1, "Guitarra", 1000, "R$1.000,00"));
		order.addItem(new Item(2, "Amplificador", 5000, "R$5.000,00"));
		order.addItem(new Item(3, "Cabo", 30, "R$30,00"));
		order.addItem(new Item(3, "Cabo", 30, "R$30,00"));
		order.addItem(new Item(3, "Cabo", 30, "R$30,00"));
		const total = order.getTotal();
		expect(total).toBe(6090);
	})
});