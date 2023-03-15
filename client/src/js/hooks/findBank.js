import { banks } from './banks'

export const findBank = (banco) => {
  return banks.find((bank) => {
    return bank.name === banco
  })
}
