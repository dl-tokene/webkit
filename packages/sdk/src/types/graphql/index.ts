import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string | number; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  BigDecimal: { input: any; output: any; }
  BigInt: { input: any; output: any; }
  Bytes: { input: any; output: any; }
};

export type BlockChangedFilter = {
  number_gte: Scalars['Int']['input'];
};

export type Block_Height = {
  hash?: InputMaybe<Scalars['Bytes']['input']>;
  number?: InputMaybe<Scalars['Int']['input']>;
  number_gte?: InputMaybe<Scalars['Int']['input']>;
};

export type Constant = {
  __typename?: 'Constant';
  id: Scalars['ID']['output'];
  value: Scalars['Bytes']['output'];
};

export type Constant_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  value?: InputMaybe<Scalars['Bytes']['input']>;
  value_contains?: InputMaybe<Scalars['Bytes']['input']>;
  value_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  value_not?: InputMaybe<Scalars['Bytes']['input']>;
  value_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  value_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
};

export enum Constant_OrderBy {
  Id = 'id',
  Value = 'value'
}

export type Contract = {
  __typename?: 'Contract';
  address: Scalars['Bytes']['output'];
  id: Scalars['ID']['output'];
  isProxy: Scalars['Boolean']['output'];
};

export type Contract_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  address?: InputMaybe<Scalars['Bytes']['input']>;
  address_contains?: InputMaybe<Scalars['Bytes']['input']>;
  address_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  address_not?: InputMaybe<Scalars['Bytes']['input']>;
  address_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  address_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  isProxy?: InputMaybe<Scalars['Boolean']['input']>;
  isProxy_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  isProxy_not?: InputMaybe<Scalars['Boolean']['input']>;
  isProxy_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
};

export enum Contract_OrderBy {
  Address = 'address',
  Id = 'id',
  IsProxy = 'isProxy'
}

export type Global = {
  __typename?: 'Global';
  id: Scalars['ID']['output'];
  masterContractsRegistry: Scalars['Bytes']['output'];
  totalUsersCount: Scalars['BigInt']['output'];
};

export type Global_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  masterContractsRegistry?: InputMaybe<Scalars['Bytes']['input']>;
  masterContractsRegistry_contains?: InputMaybe<Scalars['Bytes']['input']>;
  masterContractsRegistry_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  masterContractsRegistry_not?: InputMaybe<Scalars['Bytes']['input']>;
  masterContractsRegistry_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  masterContractsRegistry_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  totalUsersCount?: InputMaybe<Scalars['BigInt']['input']>;
  totalUsersCount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalUsersCount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalUsersCount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalUsersCount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalUsersCount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalUsersCount_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalUsersCount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export enum Global_OrderBy {
  Id = 'id',
  MasterContractsRegistry = 'masterContractsRegistry',
  TotalUsersCount = 'totalUsersCount'
}

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type Query = {
  __typename?: 'Query';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  constant?: Maybe<Constant>;
  constants: Array<Constant>;
  contract?: Maybe<Contract>;
  contracts: Array<Contract>;
  global?: Maybe<Global>;
  globals: Array<Global>;
  request?: Maybe<Request>;
  requests: Array<Request>;
  requestsThread?: Maybe<RequestsThread>;
  requestsThreads: Array<RequestsThread>;
  resource?: Maybe<Resource>;
  resources: Array<Resource>;
  role?: Maybe<Role>;
  roles: Array<Role>;
  terc20?: Maybe<Terc20>;
  terc20S: Array<Terc20>;
  terc721?: Maybe<Terc721>;
  terc721S: Array<Terc721>;
  user?: Maybe<User>;
  users: Array<User>;
  wallet?: Maybe<Wallet>;
  walletTERC20?: Maybe<WalletTerc20>;
  walletTERC20S: Array<WalletTerc20>;
  walletTERC721?: Maybe<WalletTerc721>;
  walletTERC721S: Array<WalletTerc721>;
  wallets: Array<Wallet>;
};


export type Query_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type QueryConstantArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryConstantsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Constant_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Constant_Filter>;
};


export type QueryContractArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryContractsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Contract_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Contract_Filter>;
};


export type QueryGlobalArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryGlobalsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Global_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Global_Filter>;
};


export type QueryRequestArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryRequestsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Request_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Request_Filter>;
};


export type QueryRequestsThreadArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryRequestsThreadsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RequestsThread_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<RequestsThread_Filter>;
};


export type QueryResourceArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryResourcesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Resource_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Resource_Filter>;
};


export type QueryRoleArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryRolesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Role_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Role_Filter>;
};


export type QueryTerc20Args = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryTerc20SArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Terc20_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Terc20_Filter>;
};


export type QueryTerc721Args = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryTerc721SArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Terc721_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Terc721_Filter>;
};


export type QueryUserArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryUsersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<User_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<User_Filter>;
};


export type QueryWalletArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryWalletTerc20Args = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryWalletTerc20SArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<WalletTerc20_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<WalletTerc20_Filter>;
};


export type QueryWalletTerc721Args = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryWalletTerc721SArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<WalletTerc721_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<WalletTerc721_Filter>;
};


export type QueryWalletsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Wallet_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Wallet_Filter>;
};

export type Request = {
  __typename?: 'Request';
  acceptData: Scalars['Bytes']['output'];
  creator: Scalars['Bytes']['output'];
  description: Scalars['String']['output'];
  executor: Scalars['Bytes']['output'];
  id: Scalars['ID']['output'];
  misc: Scalars['String']['output'];
  rejectData: Scalars['Bytes']['output'];
  rejectReason: Scalars['String']['output'];
  requestId: Scalars['BigInt']['output'];
  status: Scalars['BigInt']['output'];
  thread: RequestsThread;
  timestamp: Scalars['BigInt']['output'];
};

export type Request_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  acceptData?: InputMaybe<Scalars['Bytes']['input']>;
  acceptData_contains?: InputMaybe<Scalars['Bytes']['input']>;
  acceptData_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  acceptData_not?: InputMaybe<Scalars['Bytes']['input']>;
  acceptData_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  acceptData_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  creator?: InputMaybe<Scalars['Bytes']['input']>;
  creator_contains?: InputMaybe<Scalars['Bytes']['input']>;
  creator_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  creator_not?: InputMaybe<Scalars['Bytes']['input']>;
  creator_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  creator_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  description?: InputMaybe<Scalars['String']['input']>;
  description_contains?: InputMaybe<Scalars['String']['input']>;
  description_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  description_ends_with?: InputMaybe<Scalars['String']['input']>;
  description_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  description_gt?: InputMaybe<Scalars['String']['input']>;
  description_gte?: InputMaybe<Scalars['String']['input']>;
  description_in?: InputMaybe<Array<Scalars['String']['input']>>;
  description_lt?: InputMaybe<Scalars['String']['input']>;
  description_lte?: InputMaybe<Scalars['String']['input']>;
  description_not?: InputMaybe<Scalars['String']['input']>;
  description_not_contains?: InputMaybe<Scalars['String']['input']>;
  description_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  description_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  description_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  description_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  description_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  description_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  description_starts_with?: InputMaybe<Scalars['String']['input']>;
  description_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  executor?: InputMaybe<Scalars['Bytes']['input']>;
  executor_contains?: InputMaybe<Scalars['Bytes']['input']>;
  executor_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  executor_not?: InputMaybe<Scalars['Bytes']['input']>;
  executor_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  executor_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  misc?: InputMaybe<Scalars['String']['input']>;
  misc_contains?: InputMaybe<Scalars['String']['input']>;
  misc_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  misc_ends_with?: InputMaybe<Scalars['String']['input']>;
  misc_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  misc_gt?: InputMaybe<Scalars['String']['input']>;
  misc_gte?: InputMaybe<Scalars['String']['input']>;
  misc_in?: InputMaybe<Array<Scalars['String']['input']>>;
  misc_lt?: InputMaybe<Scalars['String']['input']>;
  misc_lte?: InputMaybe<Scalars['String']['input']>;
  misc_not?: InputMaybe<Scalars['String']['input']>;
  misc_not_contains?: InputMaybe<Scalars['String']['input']>;
  misc_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  misc_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  misc_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  misc_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  misc_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  misc_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  misc_starts_with?: InputMaybe<Scalars['String']['input']>;
  misc_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  rejectData?: InputMaybe<Scalars['Bytes']['input']>;
  rejectData_contains?: InputMaybe<Scalars['Bytes']['input']>;
  rejectData_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  rejectData_not?: InputMaybe<Scalars['Bytes']['input']>;
  rejectData_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  rejectData_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  rejectReason?: InputMaybe<Scalars['String']['input']>;
  rejectReason_contains?: InputMaybe<Scalars['String']['input']>;
  rejectReason_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  rejectReason_ends_with?: InputMaybe<Scalars['String']['input']>;
  rejectReason_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  rejectReason_gt?: InputMaybe<Scalars['String']['input']>;
  rejectReason_gte?: InputMaybe<Scalars['String']['input']>;
  rejectReason_in?: InputMaybe<Array<Scalars['String']['input']>>;
  rejectReason_lt?: InputMaybe<Scalars['String']['input']>;
  rejectReason_lte?: InputMaybe<Scalars['String']['input']>;
  rejectReason_not?: InputMaybe<Scalars['String']['input']>;
  rejectReason_not_contains?: InputMaybe<Scalars['String']['input']>;
  rejectReason_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  rejectReason_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  rejectReason_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  rejectReason_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  rejectReason_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  rejectReason_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  rejectReason_starts_with?: InputMaybe<Scalars['String']['input']>;
  rejectReason_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  requestId?: InputMaybe<Scalars['BigInt']['input']>;
  requestId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  requestId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  requestId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  requestId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  requestId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  requestId_not?: InputMaybe<Scalars['BigInt']['input']>;
  requestId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  status?: InputMaybe<Scalars['BigInt']['input']>;
  status_gt?: InputMaybe<Scalars['BigInt']['input']>;
  status_gte?: InputMaybe<Scalars['BigInt']['input']>;
  status_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  status_lt?: InputMaybe<Scalars['BigInt']['input']>;
  status_lte?: InputMaybe<Scalars['BigInt']['input']>;
  status_not?: InputMaybe<Scalars['BigInt']['input']>;
  status_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  thread?: InputMaybe<Scalars['String']['input']>;
  thread_?: InputMaybe<RequestsThread_Filter>;
  thread_contains?: InputMaybe<Scalars['String']['input']>;
  thread_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  thread_ends_with?: InputMaybe<Scalars['String']['input']>;
  thread_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  thread_gt?: InputMaybe<Scalars['String']['input']>;
  thread_gte?: InputMaybe<Scalars['String']['input']>;
  thread_in?: InputMaybe<Array<Scalars['String']['input']>>;
  thread_lt?: InputMaybe<Scalars['String']['input']>;
  thread_lte?: InputMaybe<Scalars['String']['input']>;
  thread_not?: InputMaybe<Scalars['String']['input']>;
  thread_not_contains?: InputMaybe<Scalars['String']['input']>;
  thread_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  thread_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  thread_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  thread_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  thread_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  thread_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  thread_starts_with?: InputMaybe<Scalars['String']['input']>;
  thread_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export enum Request_OrderBy {
  AcceptData = 'acceptData',
  Creator = 'creator',
  Description = 'description',
  Executor = 'executor',
  Id = 'id',
  Misc = 'misc',
  RejectData = 'rejectData',
  RejectReason = 'rejectReason',
  RequestId = 'requestId',
  Status = 'status',
  Thread = 'thread',
  Timestamp = 'timestamp'
}

export type RequestsThread = {
  __typename?: 'RequestsThread';
  id: Scalars['ID']['output'];
  requests: Array<Request>;
};


export type RequestsThreadRequestsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Request_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Request_Filter>;
};

export type RequestsThread_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  requests_?: InputMaybe<Request_Filter>;
};

export enum RequestsThread_OrderBy {
  Id = 'id',
  Requests = 'requests'
}

export type Resource = {
  __typename?: 'Resource';
  allows: Array<Scalars['String']['output']>;
  allowsCount: Scalars['BigInt']['output'];
  disallows: Array<Scalars['String']['output']>;
  disallowsCount: Scalars['BigInt']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type Resource_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  allows?: InputMaybe<Array<Scalars['String']['input']>>;
  allowsCount?: InputMaybe<Scalars['BigInt']['input']>;
  allowsCount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  allowsCount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  allowsCount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  allowsCount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  allowsCount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  allowsCount_not?: InputMaybe<Scalars['BigInt']['input']>;
  allowsCount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  allows_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  allows_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
  allows_not?: InputMaybe<Array<Scalars['String']['input']>>;
  allows_not_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  allows_not_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
  disallows?: InputMaybe<Array<Scalars['String']['input']>>;
  disallowsCount?: InputMaybe<Scalars['BigInt']['input']>;
  disallowsCount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  disallowsCount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  disallowsCount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  disallowsCount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  disallowsCount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  disallowsCount_not?: InputMaybe<Scalars['BigInt']['input']>;
  disallowsCount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  disallows_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  disallows_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
  disallows_not?: InputMaybe<Array<Scalars['String']['input']>>;
  disallows_not_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  disallows_not_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_contains?: InputMaybe<Scalars['String']['input']>;
  name_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  name_ends_with?: InputMaybe<Scalars['String']['input']>;
  name_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_gt?: InputMaybe<Scalars['String']['input']>;
  name_gte?: InputMaybe<Scalars['String']['input']>;
  name_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_lt?: InputMaybe<Scalars['String']['input']>;
  name_lte?: InputMaybe<Scalars['String']['input']>;
  name_not?: InputMaybe<Scalars['String']['input']>;
  name_not_contains?: InputMaybe<Scalars['String']['input']>;
  name_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  name_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_starts_with?: InputMaybe<Scalars['String']['input']>;
  name_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum Resource_OrderBy {
  Allows = 'allows',
  AllowsCount = 'allowsCount',
  Disallows = 'disallows',
  DisallowsCount = 'disallowsCount',
  Id = 'id',
  Name = 'name'
}

export type Role = {
  __typename?: 'Role';
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  resources: Array<Resource>;
  resourcesCount: Scalars['BigInt']['output'];
  users: Array<User>;
  usersCount: Scalars['BigInt']['output'];
};


export type RoleResourcesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Resource_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Resource_Filter>;
};


export type RoleUsersArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<User_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<User_Filter>;
};

export type Role_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  description?: InputMaybe<Scalars['String']['input']>;
  description_contains?: InputMaybe<Scalars['String']['input']>;
  description_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  description_ends_with?: InputMaybe<Scalars['String']['input']>;
  description_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  description_gt?: InputMaybe<Scalars['String']['input']>;
  description_gte?: InputMaybe<Scalars['String']['input']>;
  description_in?: InputMaybe<Array<Scalars['String']['input']>>;
  description_lt?: InputMaybe<Scalars['String']['input']>;
  description_lte?: InputMaybe<Scalars['String']['input']>;
  description_not?: InputMaybe<Scalars['String']['input']>;
  description_not_contains?: InputMaybe<Scalars['String']['input']>;
  description_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  description_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  description_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  description_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  description_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  description_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  description_starts_with?: InputMaybe<Scalars['String']['input']>;
  description_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  resources?: InputMaybe<Array<Scalars['String']['input']>>;
  resourcesCount?: InputMaybe<Scalars['BigInt']['input']>;
  resourcesCount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  resourcesCount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  resourcesCount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  resourcesCount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  resourcesCount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  resourcesCount_not?: InputMaybe<Scalars['BigInt']['input']>;
  resourcesCount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  resources_?: InputMaybe<Resource_Filter>;
  resources_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  resources_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
  resources_not?: InputMaybe<Array<Scalars['String']['input']>>;
  resources_not_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  resources_not_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
  users?: InputMaybe<Array<Scalars['String']['input']>>;
  usersCount?: InputMaybe<Scalars['BigInt']['input']>;
  usersCount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  usersCount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  usersCount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  usersCount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  usersCount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  usersCount_not?: InputMaybe<Scalars['BigInt']['input']>;
  usersCount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  users_?: InputMaybe<User_Filter>;
  users_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  users_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
  users_not?: InputMaybe<Array<Scalars['String']['input']>>;
  users_not_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  users_not_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
};

export enum Role_OrderBy {
  Description = 'description',
  Id = 'id',
  Resources = 'resources',
  ResourcesCount = 'resourcesCount',
  Users = 'users',
  UsersCount = 'usersCount'
}

export type Subscription = {
  __typename?: 'Subscription';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  constant?: Maybe<Constant>;
  constants: Array<Constant>;
  contract?: Maybe<Contract>;
  contracts: Array<Contract>;
  global?: Maybe<Global>;
  globals: Array<Global>;
  request?: Maybe<Request>;
  requests: Array<Request>;
  requestsThread?: Maybe<RequestsThread>;
  requestsThreads: Array<RequestsThread>;
  resource?: Maybe<Resource>;
  resources: Array<Resource>;
  role?: Maybe<Role>;
  roles: Array<Role>;
  terc20?: Maybe<Terc20>;
  terc20S: Array<Terc20>;
  terc721?: Maybe<Terc721>;
  terc721S: Array<Terc721>;
  user?: Maybe<User>;
  users: Array<User>;
  wallet?: Maybe<Wallet>;
  walletTERC20?: Maybe<WalletTerc20>;
  walletTERC20S: Array<WalletTerc20>;
  walletTERC721?: Maybe<WalletTerc721>;
  walletTERC721S: Array<WalletTerc721>;
  wallets: Array<Wallet>;
};


export type Subscription_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type SubscriptionConstantArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionConstantsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Constant_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Constant_Filter>;
};


export type SubscriptionContractArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionContractsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Contract_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Contract_Filter>;
};


export type SubscriptionGlobalArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionGlobalsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Global_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Global_Filter>;
};


export type SubscriptionRequestArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionRequestsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Request_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Request_Filter>;
};


export type SubscriptionRequestsThreadArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionRequestsThreadsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RequestsThread_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<RequestsThread_Filter>;
};


export type SubscriptionResourceArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionResourcesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Resource_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Resource_Filter>;
};


export type SubscriptionRoleArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionRolesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Role_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Role_Filter>;
};


export type SubscriptionTerc20Args = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionTerc20SArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Terc20_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Terc20_Filter>;
};


export type SubscriptionTerc721Args = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionTerc721SArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Terc721_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Terc721_Filter>;
};


export type SubscriptionUserArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionUsersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<User_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<User_Filter>;
};


export type SubscriptionWalletArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionWalletTerc20Args = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionWalletTerc20SArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<WalletTerc20_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<WalletTerc20_Filter>;
};


export type SubscriptionWalletTerc721Args = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionWalletTerc721SArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<WalletTerc721_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<WalletTerc721_Filter>;
};


export type SubscriptionWalletsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Wallet_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Wallet_Filter>;
};

export type Terc20 = {
  __typename?: 'TERC20';
  balances: Array<WalletTerc20>;
  contractURI: Scalars['String']['output'];
  decimals: Scalars['BigInt']['output'];
  id: Scalars['Bytes']['output'];
  name: Scalars['String']['output'];
  symbol: Scalars['String']['output'];
  totalSupply: Scalars['BigInt']['output'];
  totalSupplyCap: Scalars['BigInt']['output'];
};


export type Terc20BalancesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<WalletTerc20_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<WalletTerc20_Filter>;
};

export type Terc20_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  balances_?: InputMaybe<WalletTerc20_Filter>;
  contractURI?: InputMaybe<Scalars['String']['input']>;
  contractURI_contains?: InputMaybe<Scalars['String']['input']>;
  contractURI_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  contractURI_ends_with?: InputMaybe<Scalars['String']['input']>;
  contractURI_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  contractURI_gt?: InputMaybe<Scalars['String']['input']>;
  contractURI_gte?: InputMaybe<Scalars['String']['input']>;
  contractURI_in?: InputMaybe<Array<Scalars['String']['input']>>;
  contractURI_lt?: InputMaybe<Scalars['String']['input']>;
  contractURI_lte?: InputMaybe<Scalars['String']['input']>;
  contractURI_not?: InputMaybe<Scalars['String']['input']>;
  contractURI_not_contains?: InputMaybe<Scalars['String']['input']>;
  contractURI_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  contractURI_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  contractURI_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  contractURI_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  contractURI_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  contractURI_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  contractURI_starts_with?: InputMaybe<Scalars['String']['input']>;
  contractURI_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  decimals?: InputMaybe<Scalars['BigInt']['input']>;
  decimals_gt?: InputMaybe<Scalars['BigInt']['input']>;
  decimals_gte?: InputMaybe<Scalars['BigInt']['input']>;
  decimals_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  decimals_lt?: InputMaybe<Scalars['BigInt']['input']>;
  decimals_lte?: InputMaybe<Scalars['BigInt']['input']>;
  decimals_not?: InputMaybe<Scalars['BigInt']['input']>;
  decimals_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_contains?: InputMaybe<Scalars['String']['input']>;
  name_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  name_ends_with?: InputMaybe<Scalars['String']['input']>;
  name_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_gt?: InputMaybe<Scalars['String']['input']>;
  name_gte?: InputMaybe<Scalars['String']['input']>;
  name_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_lt?: InputMaybe<Scalars['String']['input']>;
  name_lte?: InputMaybe<Scalars['String']['input']>;
  name_not?: InputMaybe<Scalars['String']['input']>;
  name_not_contains?: InputMaybe<Scalars['String']['input']>;
  name_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  name_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_starts_with?: InputMaybe<Scalars['String']['input']>;
  name_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol?: InputMaybe<Scalars['String']['input']>;
  symbol_contains?: InputMaybe<Scalars['String']['input']>;
  symbol_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_ends_with?: InputMaybe<Scalars['String']['input']>;
  symbol_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_gt?: InputMaybe<Scalars['String']['input']>;
  symbol_gte?: InputMaybe<Scalars['String']['input']>;
  symbol_in?: InputMaybe<Array<Scalars['String']['input']>>;
  symbol_lt?: InputMaybe<Scalars['String']['input']>;
  symbol_lte?: InputMaybe<Scalars['String']['input']>;
  symbol_not?: InputMaybe<Scalars['String']['input']>;
  symbol_not_contains?: InputMaybe<Scalars['String']['input']>;
  symbol_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  symbol_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  symbol_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  symbol_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_starts_with?: InputMaybe<Scalars['String']['input']>;
  symbol_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  totalSupply?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupplyCap?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupplyCap_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupplyCap_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupplyCap_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalSupplyCap_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupplyCap_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupplyCap_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupplyCap_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalSupply_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalSupply_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export enum Terc20_OrderBy {
  Balances = 'balances',
  ContractUri = 'contractURI',
  Decimals = 'decimals',
  Id = 'id',
  Name = 'name',
  Symbol = 'symbol',
  TotalSupply = 'totalSupply',
  TotalSupplyCap = 'totalSupplyCap'
}

export type Terc721 = {
  __typename?: 'TERC721';
  balances: Array<WalletTerc721>;
  baseURI: Scalars['String']['output'];
  contractURI: Scalars['String']['output'];
  id: Scalars['Bytes']['output'];
  name: Scalars['String']['output'];
  symbol: Scalars['String']['output'];
  totalSupply: Scalars['BigInt']['output'];
  totalSupplyCap: Scalars['BigInt']['output'];
};


export type Terc721BalancesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<WalletTerc721_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<WalletTerc721_Filter>;
};

export type Terc721_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  balances_?: InputMaybe<WalletTerc721_Filter>;
  baseURI?: InputMaybe<Scalars['String']['input']>;
  baseURI_contains?: InputMaybe<Scalars['String']['input']>;
  baseURI_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  baseURI_ends_with?: InputMaybe<Scalars['String']['input']>;
  baseURI_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  baseURI_gt?: InputMaybe<Scalars['String']['input']>;
  baseURI_gte?: InputMaybe<Scalars['String']['input']>;
  baseURI_in?: InputMaybe<Array<Scalars['String']['input']>>;
  baseURI_lt?: InputMaybe<Scalars['String']['input']>;
  baseURI_lte?: InputMaybe<Scalars['String']['input']>;
  baseURI_not?: InputMaybe<Scalars['String']['input']>;
  baseURI_not_contains?: InputMaybe<Scalars['String']['input']>;
  baseURI_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  baseURI_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  baseURI_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  baseURI_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  baseURI_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  baseURI_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  baseURI_starts_with?: InputMaybe<Scalars['String']['input']>;
  baseURI_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  contractURI?: InputMaybe<Scalars['String']['input']>;
  contractURI_contains?: InputMaybe<Scalars['String']['input']>;
  contractURI_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  contractURI_ends_with?: InputMaybe<Scalars['String']['input']>;
  contractURI_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  contractURI_gt?: InputMaybe<Scalars['String']['input']>;
  contractURI_gte?: InputMaybe<Scalars['String']['input']>;
  contractURI_in?: InputMaybe<Array<Scalars['String']['input']>>;
  contractURI_lt?: InputMaybe<Scalars['String']['input']>;
  contractURI_lte?: InputMaybe<Scalars['String']['input']>;
  contractURI_not?: InputMaybe<Scalars['String']['input']>;
  contractURI_not_contains?: InputMaybe<Scalars['String']['input']>;
  contractURI_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  contractURI_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  contractURI_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  contractURI_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  contractURI_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  contractURI_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  contractURI_starts_with?: InputMaybe<Scalars['String']['input']>;
  contractURI_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_contains?: InputMaybe<Scalars['String']['input']>;
  name_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  name_ends_with?: InputMaybe<Scalars['String']['input']>;
  name_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_gt?: InputMaybe<Scalars['String']['input']>;
  name_gte?: InputMaybe<Scalars['String']['input']>;
  name_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_lt?: InputMaybe<Scalars['String']['input']>;
  name_lte?: InputMaybe<Scalars['String']['input']>;
  name_not?: InputMaybe<Scalars['String']['input']>;
  name_not_contains?: InputMaybe<Scalars['String']['input']>;
  name_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  name_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_starts_with?: InputMaybe<Scalars['String']['input']>;
  name_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol?: InputMaybe<Scalars['String']['input']>;
  symbol_contains?: InputMaybe<Scalars['String']['input']>;
  symbol_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_ends_with?: InputMaybe<Scalars['String']['input']>;
  symbol_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_gt?: InputMaybe<Scalars['String']['input']>;
  symbol_gte?: InputMaybe<Scalars['String']['input']>;
  symbol_in?: InputMaybe<Array<Scalars['String']['input']>>;
  symbol_lt?: InputMaybe<Scalars['String']['input']>;
  symbol_lte?: InputMaybe<Scalars['String']['input']>;
  symbol_not?: InputMaybe<Scalars['String']['input']>;
  symbol_not_contains?: InputMaybe<Scalars['String']['input']>;
  symbol_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  symbol_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  symbol_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  symbol_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_starts_with?: InputMaybe<Scalars['String']['input']>;
  symbol_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  totalSupply?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupplyCap?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupplyCap_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupplyCap_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupplyCap_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalSupplyCap_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupplyCap_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupplyCap_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupplyCap_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalSupply_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalSupply_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export enum Terc721_OrderBy {
  Balances = 'balances',
  BaseUri = 'baseURI',
  ContractUri = 'contractURI',
  Id = 'id',
  Name = 'name',
  Symbol = 'symbol',
  TotalSupply = 'totalSupply',
  TotalSupplyCap = 'totalSupplyCap'
}

export type User = {
  __typename?: 'User';
  id: Scalars['Bytes']['output'];
  roles: Array<Role>;
  rolesCount: Scalars['BigInt']['output'];
};


export type UserRolesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Role_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Role_Filter>;
};

export type User_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  roles?: InputMaybe<Array<Scalars['String']['input']>>;
  rolesCount?: InputMaybe<Scalars['BigInt']['input']>;
  rolesCount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  rolesCount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  rolesCount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  rolesCount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  rolesCount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  rolesCount_not?: InputMaybe<Scalars['BigInt']['input']>;
  rolesCount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  roles_?: InputMaybe<Role_Filter>;
  roles_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  roles_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
  roles_not?: InputMaybe<Array<Scalars['String']['input']>>;
  roles_not_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  roles_not_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
};

export enum User_OrderBy {
  Id = 'id',
  Roles = 'roles',
  RolesCount = 'rolesCount'
}

export type Wallet = {
  __typename?: 'Wallet';
  erc20: Array<WalletTerc20>;
  erc721: Array<WalletTerc721>;
  id: Scalars['Bytes']['output'];
};


export type WalletErc20Args = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<WalletTerc20_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<WalletTerc20_Filter>;
};


export type WalletErc721Args = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<WalletTerc721_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<WalletTerc721_Filter>;
};

export type WalletTerc20 = {
  __typename?: 'WalletTERC20';
  balance: Scalars['BigInt']['output'];
  id: Scalars['ID']['output'];
  token: Terc20;
  usersWallet: Wallet;
};

export type WalletTerc20_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  balance?: InputMaybe<Scalars['BigInt']['input']>;
  balance_gt?: InputMaybe<Scalars['BigInt']['input']>;
  balance_gte?: InputMaybe<Scalars['BigInt']['input']>;
  balance_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  balance_lt?: InputMaybe<Scalars['BigInt']['input']>;
  balance_lte?: InputMaybe<Scalars['BigInt']['input']>;
  balance_not?: InputMaybe<Scalars['BigInt']['input']>;
  balance_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  token?: InputMaybe<Scalars['String']['input']>;
  token_?: InputMaybe<Terc20_Filter>;
  token_contains?: InputMaybe<Scalars['String']['input']>;
  token_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token_ends_with?: InputMaybe<Scalars['String']['input']>;
  token_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token_gt?: InputMaybe<Scalars['String']['input']>;
  token_gte?: InputMaybe<Scalars['String']['input']>;
  token_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token_lt?: InputMaybe<Scalars['String']['input']>;
  token_lte?: InputMaybe<Scalars['String']['input']>;
  token_not?: InputMaybe<Scalars['String']['input']>;
  token_not_contains?: InputMaybe<Scalars['String']['input']>;
  token_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  token_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  token_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token_starts_with?: InputMaybe<Scalars['String']['input']>;
  token_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  usersWallet?: InputMaybe<Scalars['String']['input']>;
  usersWallet_?: InputMaybe<Wallet_Filter>;
  usersWallet_contains?: InputMaybe<Scalars['String']['input']>;
  usersWallet_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  usersWallet_ends_with?: InputMaybe<Scalars['String']['input']>;
  usersWallet_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  usersWallet_gt?: InputMaybe<Scalars['String']['input']>;
  usersWallet_gte?: InputMaybe<Scalars['String']['input']>;
  usersWallet_in?: InputMaybe<Array<Scalars['String']['input']>>;
  usersWallet_lt?: InputMaybe<Scalars['String']['input']>;
  usersWallet_lte?: InputMaybe<Scalars['String']['input']>;
  usersWallet_not?: InputMaybe<Scalars['String']['input']>;
  usersWallet_not_contains?: InputMaybe<Scalars['String']['input']>;
  usersWallet_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  usersWallet_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  usersWallet_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  usersWallet_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  usersWallet_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  usersWallet_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  usersWallet_starts_with?: InputMaybe<Scalars['String']['input']>;
  usersWallet_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum WalletTerc20_OrderBy {
  Balance = 'balance',
  Id = 'id',
  Token = 'token',
  UsersWallet = 'usersWallet'
}

export type WalletTerc721 = {
  __typename?: 'WalletTERC721';
  id: Scalars['ID']['output'];
  nftIds: Array<Scalars['BigInt']['output']>;
  token: Terc721;
  usersWallet: Wallet;
};

export type WalletTerc721_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  nftIds?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  nftIds_contains?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  nftIds_contains_nocase?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  nftIds_not?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  nftIds_not_contains?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  nftIds_not_contains_nocase?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  token?: InputMaybe<Scalars['String']['input']>;
  token_?: InputMaybe<Terc721_Filter>;
  token_contains?: InputMaybe<Scalars['String']['input']>;
  token_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token_ends_with?: InputMaybe<Scalars['String']['input']>;
  token_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token_gt?: InputMaybe<Scalars['String']['input']>;
  token_gte?: InputMaybe<Scalars['String']['input']>;
  token_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token_lt?: InputMaybe<Scalars['String']['input']>;
  token_lte?: InputMaybe<Scalars['String']['input']>;
  token_not?: InputMaybe<Scalars['String']['input']>;
  token_not_contains?: InputMaybe<Scalars['String']['input']>;
  token_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  token_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  token_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token_starts_with?: InputMaybe<Scalars['String']['input']>;
  token_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  usersWallet?: InputMaybe<Scalars['String']['input']>;
  usersWallet_?: InputMaybe<Wallet_Filter>;
  usersWallet_contains?: InputMaybe<Scalars['String']['input']>;
  usersWallet_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  usersWallet_ends_with?: InputMaybe<Scalars['String']['input']>;
  usersWallet_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  usersWallet_gt?: InputMaybe<Scalars['String']['input']>;
  usersWallet_gte?: InputMaybe<Scalars['String']['input']>;
  usersWallet_in?: InputMaybe<Array<Scalars['String']['input']>>;
  usersWallet_lt?: InputMaybe<Scalars['String']['input']>;
  usersWallet_lte?: InputMaybe<Scalars['String']['input']>;
  usersWallet_not?: InputMaybe<Scalars['String']['input']>;
  usersWallet_not_contains?: InputMaybe<Scalars['String']['input']>;
  usersWallet_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  usersWallet_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  usersWallet_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  usersWallet_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  usersWallet_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  usersWallet_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  usersWallet_starts_with?: InputMaybe<Scalars['String']['input']>;
  usersWallet_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum WalletTerc721_OrderBy {
  Id = 'id',
  NftIds = 'nftIds',
  Token = 'token',
  UsersWallet = 'usersWallet'
}

export type Wallet_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  erc20_?: InputMaybe<WalletTerc20_Filter>;
  erc721_?: InputMaybe<WalletTerc721_Filter>;
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
};

export enum Wallet_OrderBy {
  Erc20 = 'erc20',
  Erc721 = 'erc721',
  Id = 'id'
}

export type _Block_ = {
  __typename?: '_Block_';
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']['output']>;
  /** The block number */
  number: Scalars['Int']['output'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']['output']>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  __typename?: '_Meta_';
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String']['output'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean']['output'];
};

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = 'deny'
}

export type ConstantFragment = { __typename?: 'Constant', id: string, value: any };

export type GetConstantsPaginatedQueryVariables = Exact<{
  offset?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetConstantsPaginatedQuery = { __typename?: 'Query', constants: Array<{ __typename?: 'Constant', id: string, value: any }> };

export type GetConstantsByIdPaginatedQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetConstantsByIdPaginatedQuery = { __typename?: 'Query', constants: Array<{ __typename?: 'Constant', id: string, value: any }> };

export type GetMasterContractRegistryAddressQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMasterContractRegistryAddressQuery = { __typename?: 'Query', globals: Array<{ __typename?: 'Global', masterContractsRegistry: any }> };

export type GetCoreContractsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCoreContractsQuery = { __typename?: 'Query', contracts: Array<{ __typename?: 'Contract', id: string, address: any, isProxy: boolean }> };

export type GetGlobalQueryVariables = Exact<{ [key: string]: never; }>;


export type GetGlobalQuery = { __typename?: 'Query', global?: { __typename?: 'Global', masterContractsRegistry: any } | null };

export type GetKycRequestsQueryVariables = Exact<{
  creator: Scalars['Bytes']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetKycRequestsQuery = { __typename?: 'Query', requests: Array<{ __typename?: 'Request', id: string, requestId: any, creator: any, executor: any, acceptData: any, rejectData: any, misc: string, description: string, status: any, rejectReason: string, timestamp: any }> };

export type GetKycRequestByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetKycRequestByIdQuery = { __typename?: 'Query', request?: { __typename?: 'Request', id: string, requestId: any, creator: any, executor: any, acceptData: any, rejectData: any, misc: string, description: string, status: any, rejectReason: string, timestamp: any } | null };

export type GetKycRequestsByAddressQueryVariables = Exact<{
  address: Scalars['String']['input'];
}>;


export type GetKycRequestsByAddressQuery = { __typename?: 'Query', requests: Array<{ __typename?: 'Request', id: string, requestId: any, creator: any, executor: any, acceptData: any, rejectData: any, misc: string, description: string, status: any, rejectReason: string, timestamp: any }> };

export type GetKycRequestsByAddressAndStatusQueryVariables = Exact<{
  address: Scalars['String']['input'];
  status: Scalars['BigInt']['input'];
}>;


export type GetKycRequestsByAddressAndStatusQuery = { __typename?: 'Query', requests: Array<{ __typename?: 'Request', id: string, requestId: any, creator: any, executor: any, acceptData: any, rejectData: any, misc: string, description: string, status: any, rejectReason: string, timestamp: any }> };

export type RequestCommonFieldsFragment = { __typename?: 'Request', id: string, requestId: any, creator: any, executor: any, acceptData: any, rejectData: any, misc: string, description: string, status: any, rejectReason: string, timestamp: any };

export type GetRolesWithResourcesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRolesWithResourcesQuery = { __typename?: 'Query', roles: Array<{ __typename?: 'Role', id: string, description: string, resources: Array<{ __typename?: 'Resource', id: string, name: string, allows: Array<string>, disallows: Array<string> }> }> };

export type RoleWithResourcesFragment = { __typename?: 'Role', id: string, description: string, resources: Array<{ __typename?: 'Resource', id: string, name: string, allows: Array<string>, disallows: Array<string> }> };

export type GetUsersByIdPaginatedQueryVariables = Exact<{
  id: Scalars['Bytes']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetUsersByIdPaginatedQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: any, roles: Array<{ __typename?: 'Role', id: string, description: string }> }> };

export type GetUserByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetUserByIdQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: any, roles: Array<{ __typename?: 'Role', id: string, description: string }> } | null };

export type GetUsersByRoleIdsPaginatedQueryVariables = Exact<{
  roleIds?: InputMaybe<Array<Scalars['ID']['input']> | Scalars['ID']['input']>;
  id: Scalars['Bytes']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetUsersByRoleIdsPaginatedQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: any, roles: Array<{ __typename?: 'Role', id: string, description: string }> }> };

export type UserCommonFieldsFragment = { __typename?: 'User', id: any, roles: Array<{ __typename?: 'Role', id: string, description: string }> };

export type Terc20CommonFragment = { __typename?: 'TERC20', id: any, name: string, symbol: string, decimals: any, contractURI: string, totalSupplyCap: any, totalSupply: any };

export type GetTerc20SByNameQueryVariables = Exact<{
  name?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetTerc20SByNameQuery = { __typename?: 'Query', terc20S: Array<{ __typename?: 'TERC20', id: any, name: string, symbol: string, decimals: any, contractURI: string, totalSupplyCap: any, totalSupply: any }> };

export type Terc721CommonFragment = { __typename?: 'TERC721', id: any, name: string, symbol: string, contractURI: string, baseURI: string, totalSupplyCap: any, totalSupply: any };

export type GetTerc721SByNameQueryVariables = Exact<{
  name?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetTerc721SByNameQuery = { __typename?: 'Query', terc721S: Array<{ __typename?: 'TERC721', id: any, name: string, symbol: string, contractURI: string, baseURI: string, totalSupplyCap: any, totalSupply: any }> };

export type GetTerc20SByNamePaginatedQueryVariables = Exact<{
  name?: InputMaybe<Scalars['String']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetTerc20SByNamePaginatedQuery = { __typename?: 'Query', terc20S: Array<{ __typename?: 'TERC20', id: any, name: string, symbol: string, decimals: any, contractURI: string, totalSupplyCap: any, totalSupply: any }> };

export type GetTerc721SByNamePaginatedQueryVariables = Exact<{
  name?: InputMaybe<Scalars['String']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetTerc721SByNamePaginatedQuery = { __typename?: 'Query', terc721S: Array<{ __typename?: 'TERC721', id: any, name: string, symbol: string, contractURI: string, baseURI: string, totalSupplyCap: any, totalSupply: any }> };

export const Constant = gql`
    fragment constant on Constant {
  id
  value
}
    `;
export const RequestCommonFields = gql`
    fragment requestCommonFields on Request {
  id
  requestId
  creator
  executor
  acceptData
  rejectData
  misc
  description
  status
  rejectReason
  timestamp
}
    `;
export const RoleWithResources = gql`
    fragment roleWithResources on Role {
  id
  description
  resources {
    id
    name
    allows
    disallows
  }
}
    `;
export const UserCommonFields = gql`
    fragment userCommonFields on User {
  id
  roles {
    id
    description
  }
}
    `;
export const Terc20Common = gql`
    fragment TERC20Common on TERC20 {
  id
  name
  symbol
  decimals
  contractURI
  totalSupplyCap
  totalSupply
}
    `;
export const Terc721Common = gql`
    fragment TERC721Common on TERC721 {
  id
  name
  symbol
  contractURI
  baseURI
  totalSupplyCap
  totalSupply
}
    `;
export const GetConstantsPaginated = gql`
    query getConstantsPaginated($offset: Int, $limit: Int) {
  constants(first: $limit, skip: $offset, orderBy: id, orderDirection: desc) {
    ...constant
  }
}
    ${Constant}`;
export const GetConstantsByIdPaginated = gql`
    query getConstantsByIdPaginated($id: ID!, $offset: Int, $limit: Int) {
  constants(
    where: {id: $id}
    first: $limit
    skip: $offset
    orderBy: id
    orderDirection: desc
  ) {
    ...constant
  }
}
    ${Constant}`;
export const GetMasterContractRegistryAddress = gql`
    query GetMasterContractRegistryAddress {
  globals {
    masterContractsRegistry
  }
}
    `;
export const GetCoreContracts = gql`
    query GetCoreContracts {
  contracts {
    id
    address
    isProxy
  }
}
    `;
export const GetGlobal = gql`
    query getGlobal {
  global(id: "global") {
    masterContractsRegistry
  }
}
    `;
export const GetKycRequests = gql`
    query getKycRequests($creator: Bytes!, $id: String, $offset: Int, $limit: Int) {
  requests(
    where: {creator: $creator, misc_contains: $id}
    orderBy: requestId
    orderDirection: desc
    first: $limit
    skip: $offset
  ) {
    ...requestCommonFields
  }
}
    ${RequestCommonFields}`;
export const GetKycRequestById = gql`
    query getKycRequestById($id: ID!) {
  request(id: $id) {
    ...requestCommonFields
  }
}
    ${RequestCommonFields}`;
export const GetKycRequestsByAddress = gql`
    query getKycRequestsByAddress($address: String!) {
  requests(where: {misc: $address}, orderBy: requestId, orderDirection: desc) {
    ...requestCommonFields
  }
}
    ${RequestCommonFields}`;
export const GetKycRequestsByAddressAndStatus = gql`
    query getKycRequestsByAddressAndStatus($address: String!, $status: BigInt!) {
  requests(
    where: {misc: $address, status: $status}
    orderBy: requestId
    orderDirection: desc
  ) {
    ...requestCommonFields
  }
}
    ${RequestCommonFields}`;
export const GetRolesWithResources = gql`
    query getRolesWithResources {
  roles {
    ...roleWithResources
  }
}
    ${RoleWithResources}`;
export const GetUsersByIdPaginated = gql`
    query getUsersByIdPaginated($id: Bytes!, $offset: Int, $limit: Int) {
  users(
    where: {id_contains: $id}
    first: $limit
    skip: $offset
    orderBy: id
    orderDirection: desc
  ) {
    ...userCommonFields
  }
}
    ${UserCommonFields}`;
export const GetUserById = gql`
    query getUserById($id: ID!) {
  user(id: $id) {
    ...userCommonFields
  }
}
    ${UserCommonFields}`;
export const GetUsersByRoleIdsPaginated = gql`
    query getUsersByRoleIdsPaginated($roleIds: [ID!], $id: Bytes!, $offset: Int, $limit: Int) {
  users(
    where: {id_contains: $id, roles_: {id_in: $roleIds}}
    first: $limit
    skip: $offset
    orderBy: id
    orderDirection: desc
  ) {
    ...userCommonFields
  }
}
    ${UserCommonFields}`;
export const GetTerc20SByName = gql`
    query getTerc20SByName($name: String) {
  terc20S(where: {name_contains: $name}) {
    ...TERC20Common
  }
}
    ${Terc20Common}`;
export const GetTerc721SByName = gql`
    query getTerc721SByName($name: String) {
  terc721S(where: {name_contains: $name}) {
    ...TERC721Common
  }
}
    ${Terc721Common}`;
export const GetTerc20SByNamePaginated = gql`
    query getTerc20SByNamePaginated($name: String, $offset: Int, $limit: Int) {
  terc20S(where: {name_contains: $name}, first: $limit, skip: $offset) {
    ...TERC20Common
  }
}
    ${Terc20Common}`;
export const GetTerc721SByNamePaginated = gql`
    query getTerc721SByNamePaginated($name: String, $offset: Int, $limit: Int) {
  terc721S(where: {name_contains: $name}, first: $limit, skip: $offset) {
    ...TERC721Common
  }
}
    ${Terc721Common}`;