import { type Context } from '../context';

export class BoardsService {
  constructor(private ctx: Context) {}

  public getUserBoards() {
    const userId = this.ctx.session?.user.id;
    return this.ctx.prisma.board.findMany({
      where: { userId },
    });
  }

  public getBoardById(id: number) {
    return this.ctx.prisma.board.findFirst({
      where: { id },
      include: {
        columns: {
          include: { tasks: true },
        },
      },
    });
  }

  public createBoard(data: { title: string; order: number; userId: string }) {
    return this.ctx.prisma.board.create({ data });
  }

  public updateBoard(
    id: number,
    newData: {
      title?: string;
      order?: number;
    }
  ) {
    return this.ctx.prisma.board.update({
      where: { id },
      data: newData,
    });
  }

  public deleteBoard(id: number) {
    return this.ctx.prisma.board.delete({ where: { id } });
  }
}
