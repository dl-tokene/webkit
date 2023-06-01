const extensions = require('../assets/extensions.json')
const { JsonApiClient } = require("@distributedlab/jac")

const main = async () => {
  try {
    const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZGRyZXNzIjoiMHgzYWQ5MjYwNjI2YWYwZTlmOGRhNGYwOTE4NTI5MTJiNWE2YzQ3ZmE2IiwicHVycG9zZSI6InNlc3Npb24iLCJleHAiOjE2ODU2MzU3NTl9.fs0eKOnwzca6RbeYTSfqRe483jmULTZ43DuTa46OGx4"


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
