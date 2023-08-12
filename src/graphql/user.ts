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
