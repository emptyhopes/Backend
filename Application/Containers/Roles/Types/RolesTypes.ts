interface GetAllRolesPaginationInputInterface {
  input: {
    take: number;
    skip: number;
  };
}

interface GetOneRoleByIDInputInterface {
  id: number;
}

interface GetOneRoleByNameInputInterface {
  name: string;
}

interface CreateRoleInputInterface {
  input: {
    name: string;
  };
}

interface UpdateRoleInputInterface {
  input: {
    id: number;
    name: string;
  };
}

interface DeleteRoleByIDInputInterface {
  id: number;
}

interface DeleteRoleByNameInputInterface {
  name: string;
}

interface RoleOutputInterface {
  id: number;
  name: string;
  created_at: string;
  update_at: string;
}

export {
  GetAllRolesPaginationInputInterface,
  GetOneRoleByIDInputInterface,
  GetOneRoleByNameInputInterface,
  CreateRoleInputInterface,
  UpdateRoleInputInterface,
  DeleteRoleByIDInputInterface,
  DeleteRoleByNameInputInterface,
  RoleOutputInterface,
};
