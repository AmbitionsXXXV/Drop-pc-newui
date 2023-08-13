export interface ILoginProps {}

export type LoginType = "phone" | "account"

export interface IAccountFormInputs {
  username: string
  password: string
  remPass: boolean
}

export interface IMsgCodeFormInputs {
  tel: string
  code: number
}
