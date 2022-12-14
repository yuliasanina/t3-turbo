import { type Context } from '../context';

export class TaskService {
  constructor(private ctx: Context) {}

  public getColumnTasks(columnId: number) {
    return this.ctx.prisma.task.findMany({ where: { columnId } });
  }

  public getTaskById(id: number) {
    return this.ctx.prisma.task.findFirst({ where: { id } });
  }

  public createTask(data: {
    title: string;
    order: number;
    columnId: number;
    description?: string;
  }) {
    return this.ctx.prisma.task.create({ data });
  }

  public updateTask(
    id: number,
    newData: {
      title?: string;
      order?: number;
      description?: string;
    }
  ) {
    return this.ctx.prisma.task.update({
      where: { id },
      data: newData,
    });
  }

  public deleteTask(id: number) {
    return this.ctx.prisma.task.delete({ where: { id } });
  }
}
