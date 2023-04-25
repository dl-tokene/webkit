import { errors as serverErrors } from '@distributedlab/jac'
import { errors as providerErrors } from '@distributedlab/w3p'

import * as runtimeErrors from './runtime.errors'

export const errors = {
  ...runtimeErrors,
  ...serverErrors,
  ...providerErrors,
}
