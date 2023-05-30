import { Provider, PROVIDERS, RawProvider } from '@distributedlab/w3p'
import { increaseGasLimit } from '@tokene/toolkit'
import { providers } from 'ethers'
import { computed } from 'vue-demi'

import { MasterAccessManagement__factory } from '@/types'
import { IRBAC } from '@/types/contracts/MasterAccessManagement'

export const useMasterAccessManagement = (
  contractAddress: string,
  provider: Provider,
  rawProvider: RawProvider,
) => {
  const providerInstance = computed(() =>
    provider.providerType !== PROVIDERS.Fallback
      ? new providers.Web3Provider(
          rawProvider as providers.ExternalProvider,
          'any',
        )
      : (rawProvider as unknown as providers.JsonRpcProvider),
  )

  const contractInstance = computed(
    () =>
      (!!providerInstance.value! &&
        MasterAccessManagement__factory.connect(
          contractAddress,
          providerInstance.value!,
        )) ||
      undefined,
  )

  const contractInterface = MasterAccessManagement__factory.createInterface()

  const addCombinedPermissionsToRole = async (
    role: string,
    description: string,
    allowedPermissions: IRBAC.ResourceWithPermissionsStruct[],
    disallowedPermissions: IRBAC.ResourceWithPermissionsStruct[],
  ) => {
    const data = contractInterface.encodeFunctionData(
      'addCombinedPermissionsToRole',
      [role, description, allowedPermissions, disallowedPermissions],
    )

    const txBody = {
      to: contractAddress,
      data,
    }

    return provider.signAndSendTx({
      ...txBody,
      gasLimit: await increaseGasLimit(
        provider.address!,
        providerInstance.value!,
        txBody,
        1.5,
      ),
    })
  }

  const removePermissionsFromRole = async (
    role: string,
    permissionsToRemove: IRBAC.ResourceWithPermissionsStruct[],
    allowed: boolean,
  ) => {
    const data = contractInterface.encodeFunctionData(
      'removePermissionsFromRole',
      [role, permissionsToRemove, allowed],
    )

    const txBody = {
      to: contractAddress,
      data,
    }

    return provider.signAndSendTx({
      ...txBody,
      gasLimit: await increaseGasLimit(
        provider.address!,
        providerInstance.value!,
        txBody,
        1.5,
      ),
    })
  }

  const updateRolePermissions = async (
    role: string,
    description: string,
    allowedToRemove: IRBAC.ResourceWithPermissionsStruct[],
    disallowedToRemove: IRBAC.ResourceWithPermissionsStruct[],
    allowedToAdd: IRBAC.ResourceWithPermissionsStruct[],
    disallowedToAdd: IRBAC.ResourceWithPermissionsStruct[],
  ) => {
    const data = contractInterface.encodeFunctionData('updateRolePermissions', [
      role,
      description,
      allowedToRemove,
      disallowedToRemove,
      allowedToAdd,
      disallowedToAdd,
    ])

    const txBody = {
      to: contractAddress,
      data,
    }

    return provider.signAndSendTx({
      ...txBody,
      gasLimit: await increaseGasLimit(
        provider.address!,
        providerInstance.value!,
        txBody,
        1.5,
      ),
    })
  }

  const grantRoles = async (to: string, roles: string[]) => {
    const data = contractInterface.encodeFunctionData('grantRoles', [to, roles])

    const txBody = {
      to: contractAddress,
      data,
    }

    return provider.signAndSendTx({
      ...txBody,
      gasLimit: await increaseGasLimit(
        provider.address!,
        providerInstance.value!,
        txBody,
        1.5,
      ),
    })
  }

  const revokeRoles = async (from: string, roles: string[]) => {
    const data = contractInterface.encodeFunctionData('revokeRoles', [
      from,
      roles,
    ])

    const txBody = {
      to: contractAddress,
      data,
    }

    return provider.signAndSendTx({
      ...txBody,
      gasLimit: await increaseGasLimit(
        provider.address!,
        providerInstance.value!,
        txBody,
        1.5,
      ),
    })
  }

  const getMasterRoleId = async () => {
    return contractInstance.value?.MASTER_ROLE()
  }

  const getBannedRoleId = async () => {
    return 'BANNED' // FIXME
  }

  return {
    addCombinedPermissionsToRole,
    removePermissionsFromRole,
    updateRolePermissions,
    grantRoles,
    revokeRoles,

    getMasterRoleId,
    getBannedRoleId,
  }
}
