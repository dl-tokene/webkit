const extensions = require('../assets/extensions.json')
const { JsonApiClient } = require("@distributedlab/jac")

const main = async () => {
  try {
    const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZGRyZXNzIjoiMHhjODdiMDM5OGY4NjI3NmQzZDU5MGExNGFiNTNmZjU3MTg1ODk5YzQyIiwicHVycG9zZSI6InNlc3Npb24iLCJleHAiOjE2ODU1NTYwMjB9.zXj0u1WpJynHcMBlEFTAU-N_HL6hYJmft9zmVq-XyoI'

    const api = new JsonApiClient(
      {
        baseUrl: 'https://api.tokene.io',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      },
    )


    await api.post(`/integrations/key-value-svc/values/extensions`, {
      body: {
        value: JSON.stringify(extensions),
      },
    })
  } catch (error) {
    console.error({ ...error })
  }
}

main()
