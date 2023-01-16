import { oneRay, ZERO_ADDRESS } from '../../helpers/constants';
import { INeonConfiguration, eNeonNetwork } from '../../helpers/types';

import { CommonsConfig } from './commons';
import {
  strategyUSDC,
  strategyUSDT,
  strategyWETH,
} from './reservesConfigs';

// ----------------
// POOL--SPECIFIC PARAMS
// ----------------

export const NeonConfig: INeonConfiguration = {
  ...CommonsConfig,
  MarketId: 'Aave genesis market',
  ProviderId: 1,
  ReservesConfig: {
    USDC: strategyUSDC,
    USDT: strategyUSDT,
    WETH: strategyWETH,
  },
  ReserveAssets: {
    [eNeonNetwork.neonlabs]: {
      USDC: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
      USDT: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
      WETH: '0xd0a1e359811322d97991e03f863a0c30c2cf029c',
    },
  },
};

export default NeonConfig;
