export interface ITask {
  id: number;
  title: string;
  date: string;
  status: string;
}

export interface ITodo {
  id: number;
  title: string;
  tasks: ITask[];
  icon: string;
  color: string;
}
