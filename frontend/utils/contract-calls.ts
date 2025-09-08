import { 
  makeContractCall,
  broadcastTransaction,
  AnchorMode,
  FungibleConditionCode,
  makeStandardSTXPostCondition,
} from '@stacks/transactions';
import { userSession, network, CONTRACT_ADDRESS, CONTRACT_NAME } from './auth';

export const createSIP = async (
  amount: number,
  frequency: number,
  recipient: string
) => {
  const functionName = 'create-sip';
  const functionArgs = [
    uintCV(amount),
    uintCV(frequency),
    contractPrincipalCV(recipient)
  ];

  const postConditions = [
    makeStandardSTXPostCondition(
      userSession.loadUserData().profile.stxAddress.testnet,
      FungibleConditionCode.LessEqual,
      amount
    ),
  ];

  const txOptions = {
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName,
    functionArgs,
    network,
    anchorMode: AnchorMode.Any,
    postConditions,
    onFinish: (data: any) => {
      console.log('Transaction:', data);
    },
  };

  await makeContractCall(txOptions);
};

export const cancelSIP = async (sipId: number) => {
  const functionName = 'cancel-sip';
  const functionArgs = [uintCV(sipId)];

  const txOptions = {
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName,
    functionArgs,
    network,
    anchorMode: AnchorMode.Any,
    postConditions: [],
    onFinish: (data: any) => {
      console.log('Transaction:', data);
    },
  };

  await makeContractCall(txOptions);
};