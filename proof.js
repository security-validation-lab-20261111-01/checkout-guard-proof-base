const crypto = require('node:crypto')
const fs = require('node:fs')

const expectedHash = process.env.EXPECTED_CANARY_SHA256
if (expectedHash) {
  const observedHash = crypto
    .createHash('sha256')
    .update(process.env.SECOND_JOB_CANARY ?? '')
    .digest('hex')
    .toUpperCase()
  const matched = observedHash === expectedHash
  console.log(`WORKFLOW_RUN_CANARY_SHA256_MATCH=${matched}`)
  if (!matched) process.exitCode = 1
}

fs.mkdirSync('proof-cache', {recursive: true})
fs.writeFileSync(
  'proof-cache/payload.cjs',
  "console.log('fork-payload-executed-in-consume-job')\n",
  {flag: 'wx'}
)
console.log('fork-controlled payload prepared')
