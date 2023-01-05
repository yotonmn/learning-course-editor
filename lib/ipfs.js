import { create } from 'ipfs-http-client'

const projectId = '2FTbSaO0oPJNG9eY7HXKK3kKBgf'
const projectSecret = '124b4cadfb006bbcdc2383521f8ff3e8'
const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64')
export const client = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: auth,
  },
})
