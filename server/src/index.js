import { server } from './app'
import './socket'

server.listen(8080, () => console.log('Project Rally Point listening on port 8080!')) // eslint-disable-line no-console
