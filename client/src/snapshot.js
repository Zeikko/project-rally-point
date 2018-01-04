import renderer from 'react-test-renderer'
import 'jest-styled-components'

export function matchComponentToSnapshot(component) {
  const json = renderer.create(component).toJSON()
  expect(json).toMatchSnapshot()
}
