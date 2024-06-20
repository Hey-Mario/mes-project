export interface TaskWithSubTasks {
  id: number;
  name: string;
  description: string;
  subTasks?: TaskWithSubTasks[];
}
