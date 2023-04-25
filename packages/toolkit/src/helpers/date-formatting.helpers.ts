import { time } from '@distributedlab/tools'

export function formatDateFromNow(date: string) {
  return time(date).fromNow
}

export function formatDMY(date: string, format = 'DD/MM/YYYY') {
  return time(date).format(format)
}

export function formatDMYT(
  date: string | number,
  format = 'DD.MM.YYYY, hh:mm:ss',
) {
  return time(date).format(format)
}
