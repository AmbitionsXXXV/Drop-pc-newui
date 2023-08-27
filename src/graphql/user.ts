import { gql } from "@apollo/client"

export const FIND = gql`
  query find($id: String!) {
    find(id: $id) {
      name
      desc
      codeCreateTimeAt
    }
  }
`

export const GET_USER_INFO = gql`
  query getUserInfo {
    getUserInfo {
      id
      tel
    }
  }
`
