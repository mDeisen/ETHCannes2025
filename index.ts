import { Graph, Ipfs, type Op, SystemIds, getWalletClient } from "@graphprotocol/grc-20";
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Get environment variables
const addressPrivateKey = process.env.PRIVATE_KEY as `0x${string}`;
const addressEnv = process.env.ADDRESS as `0x${string}`;

if (!addressPrivateKey) {
  throw new Error('PRIVATE_KEY environment variable is required');
}

if (!addressEnv) {
  throw new Error('ADDRESS environment variable is required');
}

if (!addressEnv.startsWith('0x')) {
  throw new Error('ADDRESS must start with 0x');
}

// Type guard to ensure proper typing
function isValidAddress(addr: string): addr is `0x${string}` {
  return addr.startsWith('0x') && addr.length === 42;
}

if (!isValidAddress(addressEnv)) {
  throw new Error('ADDRESS must be a valid Ethereum address (0x followed by 40 hex characters)');
}

const address = addressEnv;

const ops: Array<Op> = [];

// create properties and types
const { id: domainPropertyId, ops: createDomainPropertyOps } = Graph.createProperty({
  name: 'domain',
  dataType: 'TEXT',
});

ops.push(...createDomainPropertyOps);

const { id: applicationTypeId, ops: createApplicationEntityOps } = Graph.createType({
  name: 'Application',
  properties: [SystemIds.NAME_PROPERTY, domainPropertyId],
});

ops.push(...createApplicationEntityOps);


const { id: userTypeId, ops: createUserEntityOps } = Graph.createType({
  name: 'User',
  properties: [SystemIds.NAME_PROPERTY],
});

ops.push(...createUserEntityOps);

const { id: usersPropertyId, ops: createUsersPropertyOps } = Graph.createProperty({
  name: 'users',
  dataType: 'RELATION',
  relationValueTypes: [userTypeId],
});

ops.push(...createUsersPropertyOps);

const { id: groupTypeId, ops: createGroupEntityOps } = Graph.createType({
  name: 'Group',
  properties: [SystemIds.NAME_PROPERTY, usersPropertyId],
});

ops.push(...createGroupEntityOps);

const { id: groupPropertyId, ops: createGroupPropertyOps } = Graph.createProperty({
  name: 'group',
  dataType: 'RELATION',
  relationValueTypes: [groupTypeId],
});

ops.push(...createGroupPropertyOps);

const { id: applicationPropertyId, ops: createApplicationPropertyOps } = Graph.createProperty({
  name: 'application',
  dataType: 'RELATION',
  relationValueTypes: [applicationTypeId],
});

ops.push(...createApplicationPropertyOps);

const { id: permissionTypePropertyId, ops: createPermissionTypePropertyOps } = Graph.createProperty({
  name: 'permissionType',
  dataType: 'TEXT',
});

ops.push(...createPermissionTypePropertyOps);

const { id: permissionTypeId, ops: createPermissionEntityOps } = Graph.createType({
  name: 'Permission',
  properties: [SystemIds.NAME_PROPERTY, applicationPropertyId, groupPropertyId, permissionTypePropertyId],
});

ops.push(...createPermissionEntityOps);


console.log({
  domainIdPropertyId: domainPropertyId,
  appTypeId: applicationTypeId,
  userTypeId: userTypeId,
  groupTypeId: groupTypeId,
  usersPropertyId: usersPropertyId,
  groupPropertyId: groupPropertyId,
  applicationPropertyId: applicationPropertyId,
  permissionTypePropertyId: permissionTypePropertyId,
  permissionTypeId: permissionTypeId,
})

const smartAccountWalletClient = await getWalletClient({
  privateKey: addressPrivateKey,
});

const { id: spaceId } = await Graph.createSpace({
  editorAddress: address,
  name: 'eth-global-hackathon-2025 v2',
  network: 'TESTNET',
});

console.log('spaceId', spaceId);

const { cid } = await Ipfs.publishEdit({
  name: 'Create properties and types',
  ops: ops,
  author: address, 
  network: 'TESTNET', // optional, defaults to MAINNET
})

const result = await fetch(`https://hypergraph-v2-testnet.up.railway.app/space/${spaceId}/edit/calldata`, {
  method: 'POST',
  body: JSON.stringify({ cid }),
});

console.log('edit result', result);

const editResultJson = await result.json();
console.log('editResultJson', editResultJson);
const { to, data } = editResultJson;

console.log('to', to);
console.log('data', data);

const txResult = await smartAccountWalletClient.sendTransaction({
  // @ts-expect-error - TODO: fix the types error
  account: smartAccountWalletClient.account,
  to: to,
  value: 0n,
  data: data,
});

console.log('txResult', txResult);