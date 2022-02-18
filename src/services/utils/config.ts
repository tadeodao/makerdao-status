import { useMemo, useState } from 'react';

// eslint-disable-next-line import/prefer-default-export
export const useLoadConfigs = () => {
  const collateralsConfigImported = useMemo(() => {
    try {
      // eslint-disable-next-line global-require
      return require('../../collateral-structure.yaml');
    } catch (error) {
      throw new Error('Error in file yaml');
    }
  }, []);

  const [collateralsConfig] = useState<Definitions.CollateralsStructure>(
    collateralsConfigImported,
  );

  return { collateralsConfig };
};
