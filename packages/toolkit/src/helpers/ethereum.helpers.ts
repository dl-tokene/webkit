import { BN, DECIMALS } from '@distributedlab/tools'
import type { TransactionRequest } from '@ethersproject/abstract-provider'
import type { Deferrable } from '@ethersproject/properties'
import { type providers, utils } from 'ethers'

import { EthereumProviderInternalErrors } from '@/enums'
import { i18next } from '@/localization'

export function verifyEthAddress(address: string) {
  return utils.isAddress(address)
}

export function handleEthereumProviderInternalError(errorMsg: string) {
  const errorValue = errorMsg.split(':')[2]?.trim()

  const permissionForResourceRegexp = new RegExp(
    /no ([^\s]+) permission for resource ([^\s]+)/gm,
  )
  const permissionForResource = permissionForResourceRegexp.exec(errorValue)
  if (permissionForResource) {
    return i18next.t(
      'errors.provider-internal-errors.no-permission-for-resource',
      {
        permission: permissionForResource[1],
        resource: permissionForResource[2],
      },
    )
  }
  switch (errorValue) {
    case EthereumProviderInternalErrors.accessDenied:
      return i18next.t('errors.provider-internal-errors.access-denied')
    case EthereumProviderInternalErrors.failedAcceptRequest:
      return i18next.t('errors.provider-internal-errors.failed-accept-request')
    case EthereumProviderInternalErrors.failedRejectRequest:
      return i18next.t('errors.provider-internal-errors.failed-reject-request')
    case EthereumProviderInternalErrors.invalidRequestStatus:
      return i18next.t('errors.provider-internal-errors.invalid-request-status')
    case EthereumProviderInternalErrors.zeroExecutor:
      return i18next.t('errors.provider-internal-errors.zero-executor')
    case EthereumProviderInternalErrors.notRequestCreator:
      return i18next.t('errors.provider-internal-errors.not-request-creator')
    case EthereumProviderInternalErrors.emptyValue:
      return i18next.t('errors.provider-internal-errors.empty-value')
    case EthereumProviderInternalErrors.constantNotExist:
      return i18next.t('errors.provider-internal-errors.constant-not-exist')
    case EthereumProviderInternalErrors.mappingNotExist:
      return i18next.t('errors.provider-internal-errors.mapping-not-exist')
    case EthereumProviderInternalErrors.notProxyContract:
      return i18next.t('errors.provider-internal-errors.not-proxy-contract')
    case EthereumProviderInternalErrors.zeroAddressForbidden:
      return i18next.t('errors.provider-internal-errors.zero-address-forbidden')
    case EthereumProviderInternalErrors.emptyRoles:
      return i18next.t('errors.provider-internal-errors.empty-roles')
    case EthereumProviderInternalErrors.capExceeded:
      return i18next.t('errors.provider-internal-errors.cap-exceeded')
    case EthereumProviderInternalErrors.callerNotFactory:
      return i18next.t('errors.provider-internal-errors.caller-not-factory')
    case EthereumProviderInternalErrors.badProxyBeacon:
      return i18next.t('errors.provider-internal-errors.bad-proxy-beacon')
    case EthereumProviderInternalErrors.noPoolsInject:
      return i18next.t('errors.provider-internal-errors.no-pools-inject')
    case EthereumProviderInternalErrors.failedRegisterContract:
      return i18next.t(
        'errors.provider-internal-errors.failed-register-contract',
      )
    case EthereumProviderInternalErrors.userHasPendingRequests:
      return i18next.t(
        'errors.provider-internal-errors.user-has-pending-requests',
      )
    case EthereumProviderInternalErrors.userHasNoRequests:
      return i18next.t('errors.provider-internal-errors.user-has-no-requests')
    case EthereumProviderInternalErrors.userHasNoPendingRequests:
      return i18next.t(
        'errors.provider-internal-errors.user-has-no-pending-requests',
      )
    case EthereumProviderInternalErrors.emptyKycRole:
      return i18next.t('errors.provider-internal-errors.empty-kyc-role')
    default:
      return i18next.t('errors.provider-internal-errors.default')
  }
}

export async function increaseGasLimit(
  addressFrom: string,
  rawProvider: providers.JsonRpcProvider,
  txBody: Deferrable<TransactionRequest>,
  multiplier: string | number,
) {
  const estimatedGas = await rawProvider.estimateGas({
    ...txBody,
    from: addressFrom,
  })

  return BN.fromRaw(estimatedGas?.toString(), DECIMALS.WEI)
    .mul(BN.fromRaw(multiplier, DECIMALS.WEI))
    .fromFraction(DECIMALS.WEI)
    .format({
      decimals: 0,
    })
}
