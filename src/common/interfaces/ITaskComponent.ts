interface ITaskComponent {
  getName(): string;
  getDescription(): string;
  getSubTasks(): ITaskComponent[];
  addSubTask(task: ITaskComponent): void;
  removeSubTask(task: ITaskComponent): void;
}
