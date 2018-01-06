export function matchBodyToSnapshot(response) {
  expect(response.body).toMatchSnapshot()
}
