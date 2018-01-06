import { getJSON, postJSON } from './fetch'

export function getUser() {
  return getJSON('/api/auth/loggedin')
}

export function logout() {
  return postJSON('/api/auth/logout')
}
