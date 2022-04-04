export default class MoneyFormatter {
	static format (amount: number): string {
		return new Intl.NumberFormat("pt-BR", { currency: "BRL", style: "currency"}).format(amount);
	}
}
