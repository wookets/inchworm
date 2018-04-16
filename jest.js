
import nock from 'nock'
import { readFileSync } from 'fs'
const htmlDocument = readFileSync(`${__dirname}/src/__mockdata__/wookets.html`)

nock('https://mock.com').persist().get('/').reply(200, htmlDocument);