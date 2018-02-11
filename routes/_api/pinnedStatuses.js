import { get, paramsString } from '../_utils/ajax'

export async function getPinnedStatuses (instanceName, accessToken, accountId) {
  let url = `https://${instanceName}/api/v1/accounts/${accountId}/statuses`
  url += '?' + paramsString({
    limit: 40,
    pinned: true
  })
  return get(url, {
    'Authorization': `Bearer ${accessToken}`
  })
}
