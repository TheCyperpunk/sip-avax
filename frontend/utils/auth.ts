import { AppConfig, UserSession, showConnect } from '@stacks/connect';
import { StacksTestnet } from '@stacks/network';
import { 
  callReadOnlyFunction, 
  contractPrincipalCV,
  uintCV 
} from '@stacks/transactions';

// Configure the network (Stacks Testnet)
export const network = new StacksTestnet();

// Contract details
export const CONTRACT_ADDRESS = 'ST2ZRX0K27GW0SP3GJCEMHD95TQGJMKB7G9Y0X1MH';
export const CONTRACT_NAME = 'sip-contract';

// Configure the app with required scopes
const appConfig = new AppConfig([
  'store_write',
  'publish_data',
  'transfer_stx',
  'contract_deploy'
]);

// Create and export the userSession
export const userSession = new UserSession({ appConfig });

// Helper function to authenticate with Leather wallet
export const authenticate = () => {
  showConnect({
    appDetails: {
      name: 'StacksSIP',
      icon: '/icon.png',
    },
    redirectTo: '/',
    onFinish: () => {
      window.location.reload();
    },
    userSession,
  });
};

// Helper function to check if user is signed in
export const getUserData = () => {
  return userSession.isUserSignedIn() 
    ? userSession.loadUserData()
    : null;
};

// Helper function to sign out
export const disconnect = () => {
  userSession.signUserOut('/');
};

// Helper function to read contract data
export const readContractData = async (functionName: string, args: any[] = []) => {
  try {
    const result = await callReadOnlyFunction({
      network,
      contractAddress: CONTRACT_ADDRESS,
      contractName: CONTRACT_NAME,
      functionName,
      functionArgs: args,
      senderAddress: userSession.loadUserData().profile.stxAddress.testnet,
    });
    return result;
  } catch (error) {
    console.error('Error reading contract data:', error);
    throw error;
  }
};