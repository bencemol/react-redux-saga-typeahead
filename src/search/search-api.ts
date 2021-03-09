export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export const searchApi = {
  async getResults(query: string): Promise<Todo[]> {
    const res = await fetch('https://jsonplaceholder.typicode.com/todos');
    const todos: Todo[] = await res.json();
    return todos.filter((todo) => todo.title.includes(query));
  },
};
