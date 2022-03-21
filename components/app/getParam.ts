import { ParsedUrlQuery } from 'querystring'
export const getParam = (
  params: ParsedUrlQuery | undefined,
  key: string,
  _default: string | null = null,
) => {
  if (!params) {
    return _default
  }
  let p = params[key]
  if (p == null) {
    return _default
  }
  if (Array.isArray(p)) {
    return p[0]
  }
  return p
}
