import { getTariffDataByCountry } from '../data/sampleTariffData';

// In a real application, this would involve complex calculations
// based on HS codes, trade agreements, and other factors
export const calculateDuty = (
  countryCode: string,
  tradeValue: number,
  entryDate: string,
  modeOfTransport: string,
  advanced: boolean = false
): { duty: number; rate: number; details: string } => {
  // Get the base duty rate for the country
  const tariffData = getTariffDataByCountry(countryCode);

  if (!tariffData) {
    return {
      duty: 0,
      rate: 0,
      details: 'No tariff data available for this country.'
    };
  }

  // Base duty rate
  let rate = tariffData.dutyPercentage;

  // In a more advanced implementation, we would apply:
  // - Specific tariffs for product categories (HS codes)
  // - Special trade agreements (like USMCA, etc.)
  // - Section 301 tariffs (for China)
  // - Other duties and fees

  // For now, we'll just apply a simple multiplier based on transport mode
  const transportMultiplier =
    modeOfTransport === 'OCEAN' ? 1.0 :
    modeOfTransport === 'AIR' ? 1.05 : 1.02;

  // Calculate the duty amount
  const duty = tradeValue * (rate / 100) * transportMultiplier;

  // Build details string
  const details = `
    Base duty rate: ${rate.toFixed(1)}%
    Trade value: $${tradeValue.toLocaleString()}
    Transport adjustment: ${((transportMultiplier - 1) * 100).toFixed(1)}%
    Total duty: $${duty.toLocaleString(undefined, { maximumFractionDigits: 2 })}
  `;

  return {
    duty,
    rate: rate * transportMultiplier,
    details: details.trim()
  };
};