import { task } from 'hardhat/config';
import { checkVerification } from '../../helpers/etherscan-verification';
import { ConfigNames } from '../../helpers/configuration';
import { printContracts } from '../../helpers/misc-utils';

import { getChainlinkOracle } from '../../helpers/contracts-getters';

task('aave:dev', 'Deploy development enviroment')
  .addFlag('verify', 'Verify contracts at Etherscan')
  .setAction(async ({ verify }, localBRE) => {
    const POOL_NAME = ConfigNames.Neon;

    await localBRE.run('set-DRE');

    // Prevent loss of gas verifying all the needed ENVs for Etherscan verification
    if (verify) {
      checkVerification();
    }

    console.log('Migration started\n');
    // NOTE: checking chainlink oracle

    console.log('1. Deploy mock tokens');
    await localBRE.run('dev:deploy-mock-tokens', { verify });

    console.log('2. Deploy address provider');
    await localBRE.run('dev:deploy-address-provider', { verify });

    console.log('3. Deploy lending pool');
    await localBRE.run('dev:deploy-lending-pool', { verify, pool: POOL_NAME });

    console.log('4. Deploy oracles');
    await localBRE.run('dev:deploy-oracles', { verify, pool: POOL_NAME });

    console.log('5. Deploy WETH Gateway');
    await localBRE.run('full-deploy-weth-gateway', { verify, pool: POOL_NAME });

    console.log('6. Initialize lending pool');
    await localBRE.run('dev:initialize-lending-pool', { verify, pool: POOL_NAME });

    let chainlinkOracle = await getChainlinkOracle('0x80662336874834355167abA8f524093e6ff77024');
    let price = (await chainlinkOracle.latestRoundData())[1];
    console.log(`Token price: ${price}`);

    console.log('\nFinished migration');
    printContracts();
  });
