import dotenv from 'dotenv'
import dotenvExpand, { DotenvExpandOptions } from 'dotenv-expand'

export function loadEnv() {
  const path =
    process.env.NODE_ENV === 'test'
      ? '.env.test'
      : process.env.NODE_ENV === 'development'
      ? '.env.development'
      : '.env'

  const currentEnv = dotenv.config({ path })
  dotenvExpand.expand(currentEnv as DotenvExpandOptions)
}

loadEnv()
