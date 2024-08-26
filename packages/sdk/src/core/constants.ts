export enum ChainId {
  GNOSIS_MAINNET = 100,
}

/**
 * Gnosis Pay Spend Address: the address that receives EURe, GBP and USDC from other GP Safes
 */
export const gnosisPaySpendAddress = '0x4822521E6135CD2599199c83Ea3517929A172EE' as const;

/**
 * Gnosis Pay Spender Module Address
 */
export const gnosisPaySpenderModuleAddress = '0xcFF260bfbc199dC82717494299b1AcADe25F549b' as const;

/**
 * GNO token address on Gnosis Chain
 */
export const gnoTokenAddress = '0x9c58bacc331c9aa871afd802db6379a98e80cedb' as const;

/**
 * Gnosis Pay start block, use this for indexing Gnosis Pay events.
 * This block https://gnosisscan.io/block/35652320
 * Aug-25-2024 12:00:40 AM +UTC
 */
export const gnosisPayStartBlock = 35_652_320n;
