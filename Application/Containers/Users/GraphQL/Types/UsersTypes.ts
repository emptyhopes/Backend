interface GetOneUserInterface {
  id: string;
}

interface CreateUserInterface {
  input: {
    email: string;
    username: string;
    password: string;
    role: number;
  };
}

interface UpdateUserInterface {
  input: {
    id: string;

    email: string;
    username: string;
    password: string;

    role_id: number;

    is_activated: boolean;
    is_protected: boolean;

    created_at: string;
    updated_at: string;
  };
}

interface DeleteUserInterface {
  id: string;
}

export { GetOneUserInterface, CreateUserInterface, UpdateUserInterface, DeleteUserInterface };
