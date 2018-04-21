
import nock from 'nock'
import { readFileSync } from 'fs'

const htmlDocument = readFileSync(`${__dirname}/src/__mockdata__/wookets.html`)
const fontStylesheet = readFileSync(`${__dirname}/src/__mockdata__/font.css`)
const kubeStylesheet = readFileSync(`${__dirname}/src/__mockdata__/kube.min.css`)
const jqueryJs = readFileSync(`${__dirname}/src/__mockdata__/jquery.js`)
const tocbotJs = readFileSync(`${__dirname}/src/__mockdata__/tocbot.min.js`)

nock('https://mock.com').persist().get('/').reply(200, htmlDocument)
nock('https://mock.com').persist().get('/css/font.css').reply(200, fontStylesheet)
nock('https://mock.com').persist().get('/css/kube.min.css').reply(200, kubeStylesheet)
nock('https://mock.com').persist().get('/js/jquery-2.1.4.min.js').reply(200, jqueryJs)
nock('https://mock.com').persist().get('/js/tocbot.min.js').reply(200, tocbotJs)