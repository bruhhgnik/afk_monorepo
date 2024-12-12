import {useEffect, useMemo, useState} from 'react';

import {LaunchDataMerged} from '../types/keys';
import {useGetDeployToken} from './api/indexer/useDeployToken';
import {useGetTokenLaunch} from './api/indexer/useLaunchTokens';

export const useCombinedTokenData = (token?: string, launch?: string) => {
  const {
    data: deployData,
    isLoading: isLoadingDeploy,
    isError: isErrorDeploy,
    isFetching: tokenIsFetching,
  } = useGetDeployToken(token);
  const {
    data: launchData,
    isLoading: isLoadingLaunch,
    isError: isErrorLaunch,
    isFetching: launchIsFetching,
  } = useGetTokenLaunch(launch);

  const [tokens, setTokens] = useState<LaunchDataMerged[]>([]);
  const [launches, setLaunches] = useState<LaunchDataMerged[]>([]);

  const combinedData = useMemo(() => {
    return [
      ...(deployData?.data || []),
      //  ...(launchData?.data || [])
    ];
  }, [deployData, launchData]);

  const launchDataCombined = useMemo(() => {
    return [
      ...(launchData?.data || []),
      //  ...(launchData?.data || [])
    ];
  }, [deployData, launchData]);

  useEffect(() => {
    setTokens(combinedData);
    setLaunches(launchDataCombined);
  }, [combinedData]);

  return {
    tokens,
    launches: launchDataCombined,
    isLoading: isLoadingDeploy || isLoadingLaunch,
    isError: isErrorDeploy || isErrorLaunch,
    isFetching: launchIsFetching || tokenIsFetching,
  };
};
