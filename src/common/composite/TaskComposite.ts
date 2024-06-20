import { TaskWithSubTasks } from "../interfaces/TaskWithSubTasks";

export class TaskComposite implements ITaskComponent {
  private subTasks: ITaskComponent[] = [];

  constructor(private name: string, private description: string) {}

  getName(): string {
    return this.name;
  }

  getDescription(): string {
    return this.description;
  }

  getSubTasks(): ITaskComponent[] {
    return this.subTasks;
  }

  addSubTask(task: ITaskComponent): void {
    this.subTasks.push(task);
  }

  removeSubTask(task: ITaskComponent): void {
    const index = this.subTasks.indexOf(task);
    if (index > -1) {
      this.subTasks.splice(index, 1);
    }
  }
}

export const convertToComposite = (task: TaskWithSubTasks): ITaskComponent => {
  const taskComposite = new TaskComposite(task.name, task.description);
  if (task.subTasks) {
    task.subTasks.forEach((subTask) => {
      taskComposite.addSubTask(convertToComposite(subTask));
    });
  }
  return taskComposite;
};