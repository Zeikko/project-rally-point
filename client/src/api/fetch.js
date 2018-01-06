export function getJSON(endpoint) {
  return fetchJSONWithCredentials(endpoint, 'GET')
}

export function postJSON(endpoint, body) {
  return fetchJSONWithCredentials(endpoint, 'POST', {
    body,
  })
}

export function fetchJSONWithCredentials(endpoint, method, options) {
  return fetch(`${endpoint}`, {
    ...options,
    method,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (response.status >= 400) {
        return Promise.reject(Error(`Error fetching data status code: ${response.status}`))
      }
      return response.json()
    })
}
