interface GetAllTokensPaginationInputInterface {
  input: {
    take: number;
    skip: number;
  };
}

interface GetOneTokenByIDInputInterface {
  id: number;
}

interface GetOneTokenByUserIDInputInterface {
  user_id: string;
}

interface CreateTokenInputInterface {
  input: {
    refresh: string;
    secret: string;
    user_id: string;
  };
}

interface UpdateTokenInputInterface {
  input: {
    id: number;
    refresh: string;
    secret: string;
    user_id: string;
  };
}

interface DeleteTokenByIDInputInterface {
  id: number;
}

interface DeleteTokenByUserIDInputInterface {
  user_id: string;
}

interface TokenOutputInterface {
  id: number;
  refresh: string;
  secret: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export {
  GetAllTokensPaginationInputInterface,
  GetOneTokenByIDInputInterface,
  GetOneTokenByUserIDInputInterface,
  CreateTokenInputInterface,
  UpdateTokenInputInterface,
  DeleteTokenByIDInputInterface,
  DeleteTokenByUserIDInputInterface,
  TokenOutputInterface,
};
