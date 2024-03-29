export function abbrCenter(text = '', reduceValue = 4): string {
  if (text.length <= reduceValue * 2) {
    return text
  }
  return `${text.slice(0, reduceValue)}...${text.slice(-reduceValue)}`
}

export function extractRootDomain(url: string) {
  if (url.includes('localhost')) return 'localhost'
  else if (url.includes('127.0.0.1')) return '127.0.0.1'

  const domain = new URL(url).hostname
  const elems = domain.split('.')
  const iMax = elems.length - 1

  const elem1 = elems[iMax - 1]
  const elem2 = elems[iMax]

  const isSecondLevelDomain = iMax >= 3 && (elem1 + elem2).length <= 5
  return (
    (isSecondLevelDomain ? elems[iMax - 2] + '.' : '') + elem1 + '.' + elem2
  )
}
