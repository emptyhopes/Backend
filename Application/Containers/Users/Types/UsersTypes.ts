interface GetAllUsersPaginationInputInterface {
  input: {
    take: number;
    skip: number;
  };
}

interface GetOneUserByIDInputInterface {
  id: string;
}

interface GetOneUserByUsernameInputInterface {
  username: string;
}

interface GetOneUserByEmailInputInterface {
  email: string;
}

interface CreateUserInputInterface {
  input: {
    email: string;
    username: string;
    password: string;
    role_id?: number;
  };
}

interface UpdateUserInputInterface {
  input: {
    id: string;
    email: string;
    username: string;
    password: string;
    role_id: number;
  };
}

interface DeleteUserByIDInputInterface {
  id: string;
}

interface DeleteUserByUsernameInputInterface {
  username: string;
}

interface DeleteUserByEmailInputInterface {
  email: string;
}

interface UserOutputInterface {
  id: string;
  email: string;
  username: string;
  password: string;
  role_id: number;
  created_at: string;
  updated_at: string;
}

export {
  GetAllUsersPaginationInputInterface,
  GetOneUserByIDInputInterface,
  GetOneUserByUsernameInputInterface,
  GetOneUserByEmailInputInterface,
  CreateUserInputInterface,
  UpdateUserInputInterface,
  DeleteUserByIDInputInterface,
  DeleteUserByUsernameInputInterface,
  DeleteUserByEmailInputInterface,
  UserOutputInterface,
};
