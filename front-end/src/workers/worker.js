import {
  Account,
  ProgramManager,
  PrivateKey,
  initThreadPool,
  AleoKeyProvider,
  AleoNetworkClient,
  NetworkRecordProvider,
} from "@aleohq/sdk";
import {
  Transaction,
  WalletAdapterNetwork,
  WalletNotConnectedError
} from "@demox-labs/aleo-wallet-adapter-base";
import { expose, proxy } from "comlink";

await initThreadPool();

async function localProgramExecution(program, aleoFunction, inputs) {
  const programManager = new ProgramManager();

  // Create a temporary account for the execution of the program
  const account = new Account();
  programManager.setAccount(account);

  const executionResponse = await programManager.executeOffline(
    program,
    aleoFunction,
    inputs,
    false
  );
  return executionResponse.getOutputs();
}

async function onlineProgramExecution(serverNameInt,record) {
  const account = new Account({

  });
  // Create a key provider that will be used to find public proving & verifying keys for Aleo programs
  const keyProvider = new AleoKeyProvider();
  keyProvider.useCache = true;
  
  // Create a record provider that will be used to find records and transaction data for Aleo programs
  const networkClient = new AleoNetworkClient("https://api.explorer.aleo.org/v1");
  const recordProvider = new NetworkRecordProvider(account, networkClient);
  
  // Initialize a program manager to talk to the Aleo network with the configured key and record providers
  const programName = "dns_esollabs_v3.aleo";
  const programManager = new ProgramManager("https://api.explorer.aleo.org/v1", keyProvider, recordProvider);
  programManager.setAccount(account)

  // Provide a key search parameter to find the correct key for the program if they are stored in a memory cache
  const tx_id = await programManager.execute(programName, "mint_domain", 1,false ,[record,serverNameInt+"u128"]);
  console.log(tx_id,'tx_id');
  return tx_id;
}


async function getPrivateKey() {
  const key = new PrivateKey();
  return proxy(key);
}

async function deployProgram(program) {
  const keyProvider = new AleoKeyProvider();
  keyProvider.useCache(true);

  // Create a record provider that will be used to find records and transaction data for Aleo programs
  const networkClient = new AleoNetworkClient("https://vm.aleo.org/api");

  // Use existing account with funds
  const account = new Account({
    privateKey: "APrivateKey1zkpEHjJtvyVLqRbDcV4rU6C23jgc1TcV9vsCXenxdG9JJtH",
  });

  const recordProvider = new NetworkRecordProvider(account, networkClient);

  // Initialize a program manager to talk to the Aleo network with the configured key and record providers
  const programManager = new ProgramManager(
    "https://vm.aleo.org/api",
    keyProvider,
    recordProvider
  );

  programManager.setAccount(account);

  // Define a fee to pay to deploy the program
  const fee = 1.9; // 1.9 Aleo credits

  // Deploy the program to the Aleo network
  const tx_id = await programManager.deploy(program, fee);

  // Optional: Pass in fee record manually to avoid long scan times
  // const feeRecord = "{  owner: aleo1xxx...xxx.private,  microcredits: 2000000u64.private,  _nonce: 123...789group.public}";
  // const tx_id = await programManager.deploy(program, fee, undefined, feeRecord);

  return tx_id;
}

const workerMethods = { localProgramExecution, getPrivateKey, deployProgram,onlineProgramExecution };
expose(workerMethods);
