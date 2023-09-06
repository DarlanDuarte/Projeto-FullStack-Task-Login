export interface IUser {
  id: number;
  nome: string;
  email: string;
  password: string;
}

export interface ICreateUser {
  nome: string;
  email: string;
  hashPassword: string;
}

export type IJwtPayload = {
  userId: number;
};

export interface ITarefas {
  id: number;
  tasks: string;
  task_id: number;
}
