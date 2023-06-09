export enum EthereumProviderInternalErrors {
  accessDenied = 'access denied',
  failedAcceptRequest = 'failed to accept request',
  failedRejectRequest = 'failed to reject request',
  invalidRequestStatus = 'invalid request status',
  zeroExecutor = 'zero executor',
  notRequestCreator = 'not a request creator',
  emptyValue = 'empty value',
  // eslint-disable-next-line prettier/prettier
  mappingNotExist = 'this mapping doesn\'t exist',
  constantNotExist = 'constant does not exist',
  notProxyContract = 'not a proxy contract',
  zeroAddressForbidden = 'zero address is forbidden',
  emptyRoles = 'empty roles',
  capExceeded = 'cap exceeded',
  callerNotFactory = 'caller is not a factory',
  badProxyBeacon = 'bad ProxyBeacon',
  noPoolsInject = 'no pools to inject',
  failedRegisterContract = 'failed to register contract',
  userHasPendingRequests = 'user has a pending requests',
  userHasNoRequests = 'user has no request',
  userHasNoPendingRequests = 'user has no pending requests',
  emptyKycRole = 'empty KYC role',
}
