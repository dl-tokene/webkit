import { BN, BnFormatCfg, BnLike } from '@distributedlab/tools'
import { BigNumber } from '@ethersproject/bignumber'

import { DECIMALS } from '@/enums'

export const formatNumber = (
  value: BigNumber | BnLike,
  decimals: number,
  cfg: BnFormatCfg,
) => {
  if (!value || (value instanceof BigNumber && value.isZero()) || isNaN(+value))
    return BN.fromRaw(0, DECIMALS.TOKEN).toString()

  const finalDecimals =
    value instanceof BN ? value.decimals : decimals || DECIMALS.TOKEN
  const finalAmount =
    value instanceof BN
      ? value
      : BN.fromBigInt(value?.toString() || 0, finalDecimals)

  return finalAmount.fromFraction(finalDecimals).format(cfg)
}

export const formatTokenAmount = (
  value: BigNumber | BnLike,
  decimals = DECIMALS.TOKEN,
) => {
  const finalDecimals =
    value instanceof BN ? value.decimals : decimals || DECIMALS.TOKEN
  const finalAmount =
    value instanceof BN
      ? value
      : BN.fromBigInt(value?.toString() || 0, finalDecimals)

  if (finalAmount.isLessThan(BN.fromRaw(0.000001, finalDecimals))) {
    return trimDecimalZeros(
      formatNumber(finalAmount, finalDecimals, {
        decimals: 12,
        groupSeparator: ',',
        decimalSeparator: '.',
      }),
    )
  }

  return trimDecimalZeros(
    formatNumber(finalAmount, finalDecimals, {
      decimals: 6,
      groupSeparator: ',',
      decimalSeparator: '.',
    }),
  )
}

export const formatTokenBalance = (
  value: BigNumber | BnLike,
  decimals = DECIMALS.TOKEN,
) => {
  const finalDecimals =
    value instanceof BN ? value.decimals : decimals || DECIMALS.TOKEN
  const finalAmount =
    value instanceof BN
      ? value
      : BN.fromBigInt(value?.toString() || 0, finalDecimals)

  if (finalAmount.isLessThan(BN.fromRaw(0.01, finalDecimals))) {
    return formatTokenAmount(finalAmount)
  }

  return convertNumberWithPrefix(
    formatNumber(value, finalDecimals, {
      decimals: finalDecimals,
      groupSeparator: '',
      decimalSeparator: '.',
      noGroupSeparator: true,
    }),
    {
      decimals: 2,
      groupSeparator: ',',
      decimalSeparator: '.',
    },
  )
}

export const formatPercentageAmount = (
  value: BigNumber | BnLike,
  decimals = DECIMALS.PERCENTAGE,
) => {
  const finalDecimals =
    value instanceof BN ? value.decimals : decimals || DECIMALS.PERCENTAGE
  const finalAmount =
    value instanceof BN
      ? value
      : BN.fromBigInt(value?.toString() || 0, finalDecimals)

  if (finalAmount.isLessThan(BN.fromRaw(0.0001, finalDecimals))) {
    trimDecimalZeros(
      formatNumber(finalAmount, finalDecimals, {
        decimals: 14,
      }),
    )
  }

  return trimDecimalZeros(
    formatNumber(finalAmount, finalDecimals, {
      decimals: 2,
    }),
  )
}

// FIXME
export const trimDecimalZeros = (value: string): string => {
  const splittedString = value.split('.')

  if (splittedString[1] === '0') return splittedString[0]

  if (splittedString[1]) {
    const reversed = splittedString[1].split('').reverse()

    while (reversed[0] === '0') {
      reversed.shift()
    }

    if (reversed.length !== 0)
      return splittedString[0] + '.' + reversed.reverse().join('')

    return splittedString[0]
  }

  return value.replace('.', '')
}

export const convertNumberWithPrefix = (value: string, cfg: BnFormatCfg) => {
  if (isNaN(+value)) return

  const isKKPrefix =
    +value >= 10_000 ? { prefix: 'K', divider: 1_000 } : undefined

  const isMillionPrefix =
    +value >= 1_000_000 ? { prefix: 'M', divider: 1_000_000 } : undefined

  const isBillionPrefix =
    +value >= 1_000_000_000
      ? { prefix: 'B', divider: 1_000_000_000 }
      : undefined

  const isTrillionPrefix =
    +value >= 1_000_000_000_000
      ? { prefix: 'T', divider: 1_000_000_000_000 }
      : undefined

  const prefix =
    isTrillionPrefix?.prefix ||
    isBillionPrefix?.prefix ||
    isMillionPrefix?.prefix ||
    isKKPrefix?.prefix ||
    ''

  const divider =
    isTrillionPrefix?.divider ||
    isBillionPrefix?.divider ||
    isMillionPrefix?.divider ||
    isKKPrefix?.divider ||
    1

  return `${trimDecimalZeros(
    formatNumber(
      BN.fromRaw(
        +value >= 10_000 ? Number(value) / divider : value,
        cfg.decimals,
      ),
      cfg.decimals,
      cfg,
    ),
  )}${prefix}`
}
