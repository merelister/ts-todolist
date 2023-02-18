export class Task {
  id: string;
  name: string;
  description?: string;
  assignedTo: "unassigned";
  priority: number;

  constructor(name: string) {
    this.name = name;
  }
}
