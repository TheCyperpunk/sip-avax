import {
  makeContractCall,
  uintCV,
  standardPrincipalCV,
  PostConditionMode
} from '@stacks/transactions';
import { StacksNetwork } from '@stacks/network';
import { userSession, network, CONTRACT_ADDRESS, CONTRACT_NAME } from './auth';

export interface SIPPlan {
  planId: number;
  totalAmount: number;
  amountPerInterval: number;
  frequency: number;
  maturity: number;
  destAddress: string;
}

export const createSIPPlan = async (plan: SIPPlan) => {
  const functionArgs = [
    uintCV(plan.totalAmount),
    uintCV(plan.amountPerInterval),
    uintCV(plan.frequency),
    uintCV(plan.maturity),
    standardPrincipalCV(plan.destAddress)
  ];

  const txOptions = {
    network,
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: 'create-plan',
    functionArgs,
    postConditionMode: PostConditionMode.Deny,
    onFinish: (data: any) => {
      console.log('Transaction:', data);
    },
  };

  return await makeContractCall(txOptions);
};

export const executeSIP = async (planId: number) => {
  const txOptions = {
    network,
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: 'execute-sip',
    functionArgs: [uintCV(planId)],
    postConditionMode: PostConditionMode.Deny,
    onFinish: (data: any) => {
      console.log('Transaction:', data);
    },
  };

  return await makeContractCall(txOptions);
};

export const finalizeSIP = async (planId: number) => {
  const txOptions = {
    network,
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: 'finalize-sip',
    functionArgs: [uintCV(planId)],
    postConditionMode: PostConditionMode.Deny,
    onFinish: (data: any) => {
      console.log('Transaction:', data);
    },
  };

  return await makeContractCall(txOptions);
};

export const getPlan = async (planId: number) => {
  const result = await readContractData('get-plan', [uintCV(planId)]);
  return result.value;
};