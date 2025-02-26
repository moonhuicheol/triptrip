import { gql } from "@apollo/client";

const CREATE_USER = gql`
  mutation createUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      _id
      email
      name
      picture
      userPoint {
        _id
        amount
        user {
          _id
        }
      }
      createdAt
    }
  }
`;

export { CREATE_USER };
