export function isValidCPF(cpf: string): boolean {
  if (!/^\d{11}$/.test(cpf)) return false;
  if (/^(\d)\1{10}$/.test(cpf)) return false;
  const nums = cpf.split("").map((d) => +d);
  for (let j = 9; j < 11; j++) {
    let sum = 0;
    for (let i = 0; i < j; i++) {
      sum += nums[i] * ((j + 1) - i);
    }
    let rev = (sum * 10) % 11;
    if (rev === 10) rev = 0;
    if (rev !== nums[j]) return false;
  }
  return true;
}

export function isValidCNPJ(cnpj: string): boolean {
  if (!/^\d{14}$/.test(cnpj)) return false;
  if (/^(\d)\1{13}$/.test(cnpj)) return false;
  const nums = cnpj.split("").map((d) => +d);
  const calc = (pos: number): number => {
    const weights = pos === 12
      ? [5,4,3,2,9,8,7,6,5,4,3,2]
      : [6,5,4,3,2,9,8,7,6,5,4,3,2];
    let sum = 0;
    for (let i = 0; i < weights.length; i++) {
      sum += nums[i] * weights[i];
    }
    const r = sum % 11;
    return r < 2 ? 0 : 11 - r;
  };
  return calc(12) === nums[12] && calc(13) === nums[13];
}