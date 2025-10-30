import { gql } from '@apollo/client';
import type {
  CreateUserMutationResponse,
  CreateUserMutationVariables,
} from '@/lib/graphql/types/auth';

// createUser Mutation Document
export const CREATE_USER = gql`
  mutation CreateUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      _id
    }
  }
`;

// Re-export types for convenience
export type { CreateUserMutationResponse, CreateUserMutationVariables };
export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      accessToken
    }
  }
`;

