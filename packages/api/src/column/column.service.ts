import { type Context } from '../context';

export class ColumnsService {
  constructor(private ctx: Context) {}

  public getBoardColumns(boardId: number) {
    return this.ctx.prisma.column.findMany({ where: { boardId } });
  }

  public getColumnById(id: number) {
    return this.ctx.prisma.column.findFirst({ where: { id } });
  }

  public createColumn(data: { title: string; order: number; boardId: number }) {
    return this.ctx.prisma.column.create({ data });
  }

  public updateColumn(
    id: number,
    newData: {
      title?: string;
      order?: number;
    }
  ) {
    return this.ctx.prisma.column.update({
      where: { id },
      data: newData,
    });
  }

  public deleteColumn(id: number) {
    return this.ctx.prisma.column.delete({ where: { id } });
  }
}
