interface GetOneRoleInterfaceInput {
  id: number;
}

interface CreateRoleInterfaceInput {
  input: {
    name: string;
  };
}

interface UpdateRoleInterfaceInput {
  input: {
    id: number;

    name: string;

    updated_at: string;
  };
}

interface DeleteRoleInterfaceInput {
  id: number;
}

interface RoleInterfaceOutput {
  id: number;
  name: string;

  created_at: string;
  update_at: string;
}

export {
  GetOneRoleInterfaceInput,
  CreateRoleInterfaceInput,
  UpdateRoleInterfaceInput,
  DeleteRoleInterfaceInput,
  RoleInterfaceOutput,
};
