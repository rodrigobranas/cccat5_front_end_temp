<script setup lang="ts">
import { reactive, defineProps, onMounted } from 'vue';
import type Item from "@/domain/entity/Item";
import Order from '@/domain/entity/Order';
import MoneyFormatter from '@/service/MoneyFormatter';

const { serviceFactory } = defineProps(['serviceFactory']);

const items: Item[] = reactive([]);
const itemsIndex: { [idItem: number]: Item } = {};
const order: Order = reactive(new Order());
const formatMoney = MoneyFormatter.format;

const placeOrder = async function (order: Order) {
	const orderService = serviceFactory.createOrderService();
	const output = await orderService.placeOrder(order);
	order.setCode(output.code);
};

onMounted(async () => {
	const itemService = serviceFactory.createItemService();
	const itemsData = await itemService.getAll();
	for (const itemData of itemsData) {
		items.push(itemData);
	}
	for (const item of items) {
		itemsIndex[item.idItem] = item;
	}
});

</script>

<template>
	<div>
		<div class="row">
			<div class="col-md-8 items">
				<div class="row">
					<div class="col-md-4" v-for="item of items">
						<div class="card card-default text-center">
							<h3>{{ item.description }}</h3>
							<h5>{{ item.formattedPrice }}</h5>
							<br />
							<button class="btn btn-info" @click="order.addItem(item)">Buy</button>
						</div>
					</div>
				</div>
			</div>
			<div class="col-md-4 order">
				<h4>Order</h4>
				<hr/>
				<div v-if="order.code">
					{{ order.code }}
				</div>
				<div v-if="!order.code">
					<div class="row" v-for="orderItem in order.orderItems">
						<div class="col-md-2">
							{{ orderItem.quantity }}
						</div>
						<div class="col-md-6">
							{{ itemsIndex[orderItem.idItem].description }}
						</div>
						<div class="col-md-4 text-right">
							{{ formatMoney(itemsIndex[orderItem.idItem].price * orderItem.quantity) }}
						</div>
					</div>
					<hr/>
					<h4>Total: {{ formatMoney(order.getTotal()) }}</h4>
					<br/>
					<button class="btn btn-info btn-lg" @click="placeOrder(order)">Place Order</button>
				</div>
			</div>
		</div>
	</div>
</template>

<style>

.items {
	padding: 20px;
}

.order {
	background-color: #EEE;
	min-height: 100vh;
	padding: 20px;
}

.card {
	padding: 20px;
}
</style>
