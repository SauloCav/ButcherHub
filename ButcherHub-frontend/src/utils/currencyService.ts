const API_URL = "https://economia.awesomeapi.com.br/json/last";

export async function getBRLRates(): Promise<{ BRL:1; USD: number; EUR: number }> {
  const [usdRes, eurRes] = await Promise.all([
    fetch(`${API_URL}/USD-BRL`),
    fetch(`${API_URL}/EUR-BRL`)
  ]);
  const [usdJson, eurJson] = await Promise.all([
    usdRes.json(),
    eurRes.json()
  ]);
  const usdRate = parseFloat(usdJson["USDBRL"]?.bid ?? "1");
  const eurRate = parseFloat(eurJson["EURBRL"]?.bid ?? "1");
  return { BRL: 1, USD: usdRate, EUR: eurRate };
}