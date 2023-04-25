import { EthereumProviderInternalErrors } from '@/enums'
import { i18n } from '@/localization'

export function handleEthereumProviderInternalError(errorMsg: string) {
  const { t } = i18n.global
  const errorValue = errorMsg.split(':')[2]?.trim()

  const permissionForResourceRegexp = new RegExp(
    /no ([^\s]+) permission for resource ([^\s]+)/gm,
  )
  const permissionForResource = permissionForResourceRegexp.exec(errorValue)
  if (permissionForResource) {
    return t('errors.provider-internal-errors.no-permission-for-resource', {
      permission: permissionForResource[1],
      resource: permissionForResource[2],
    })
  }
  switch (errorValue) {
    case EthereumProviderInternalErrors.accessDenied:
      return t('errors.provider-internal-errors.access-denied')
    case EthereumProviderInternalErrors.failedAcceptRequest:
      return t('errors.provider-internal-errors.failed-accept-request')
    case EthereumProviderInternalErrors.failedRejectRequest:
      return t('errors.provider-internal-errors.failed-reject-request')
    case EthereumProviderInternalErrors.invalidRequestStatus:
      return t('errors.provider-internal-errors.invalid-request-status')
    case EthereumProviderInternalErrors.zeroExecutor:
      return t('errors.provider-internal-errors.zero-executor')
    case EthereumProviderInternalErrors.notRequestCreator:
      return t('errors.provider-internal-errors.not-request-creator')
    case EthereumProviderInternalErrors.emptyValue:
      return t('errors.provider-internal-errors.empty-value')
    case EthereumProviderInternalErrors.constantNotExist:
      return t('errors.provider-internal-errors.constant-not-exist')
    case EthereumProviderInternalErrors.mappingNotExist:
      return t('errors.provider-internal-errors.mapping-not-exist')
    case EthereumProviderInternalErrors.notProxyContract:
      return t('errors.provider-internal-errors.not-proxy-contract')
    case EthereumProviderInternalErrors.zeroAddressForbidden:
      return t('errors.provider-internal-errors.zero-address-forbidden')
    case EthereumProviderInternalErrors.emptyRoles:
      return t('errors.provider-internal-errors.empty-roles')
    case EthereumProviderInternalErrors.capExceeded:
      return t('errors.provider-internal-errors.cap-exceeded')
    case EthereumProviderInternalErrors.callerNotFactory:
      return t('errors.provider-internal-errors.caller-not-factory')
    case EthereumProviderInternalErrors.badProxyBeacon:
      return t('errors.provider-internal-errors.bad-proxy-beacon')
    case EthereumProviderInternalErrors.noPoolsInject:
      return t('errors.provider-internal-errors.no-pools-inject')
    case EthereumProviderInternalErrors.failedRegisterContract:
      return t('errors.provider-internal-errors.failed-register-contract')
    case EthereumProviderInternalErrors.userHasPendingRequests:
      return t('errors.provider-internal-errors.user-has-pending-requests')
    case EthereumProviderInternalErrors.userHasNoRequests:
      return t('errors.provider-internal-errors.user-has-no-requests')
    case EthereumProviderInternalErrors.userHasNoPendingRequests:
      return t('errors.provider-internal-errors.user-has-no-pending-requests')
    case EthereumProviderInternalErrors.emptyKycRole:
      return t('errors.provider-internal-errors.empty-kyc-role')
    default:
      return t('errors.provider-internal-errors.default')
  }
}
