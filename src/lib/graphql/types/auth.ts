// Auth GraphQL Types

export interface User {
  _id: string;
  name: string;
  email: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface LoginResponse {
  loginUser: {
    accessToken: string;
  };
}

export interface CreateUserInput {
  email: string;
  password: string;
  name: string;
}

export interface CreateUserResponse {
  _id: string;
}

export interface CreateUserMutationVariables {
  createUserInput: CreateUserInput;
}

export interface CreateUserMutationResponse {
  createUser: CreateUserResponse;
}

export interface FetchUserLoggedInResponse {
  fetchUserLoggedIn: User;
}

