interface GetOneUserInterfaceInput {
  id: string;
}

interface CreateUserInterfaceInput {
  input: {
    email: string;
    username: string;
    password: string;

    role_id: number;
  };
}

interface UpdateUserInterfaceInput {
  input: {
    id: string;

    email: string;
    username: string;
    password: string;

    role_id: number;

    is_activated: boolean;
    is_protected: boolean;

    updated_at: string;
  };
}

interface DeleteUserInterfaceInput {
  id: string;
}

interface UserInterfaceOutput {
  id: string;

  email: string;
  username: string;
  password: string;

  role_id: number;

  is_activated: boolean;
  is_protected: boolean;

  updated_at: string;
  created_at: string;
}

export {
  GetOneUserInterfaceInput,
  CreateUserInterfaceInput,
  UpdateUserInterfaceInput,
  DeleteUserInterfaceInput,
  UserInterfaceOutput,
};
