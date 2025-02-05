export function formatRupiah(amount: number, withSymbol: boolean = true): string {
    return (withSymbol ? 'Rp ' : '') + amount.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
  