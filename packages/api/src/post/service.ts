import { type Context } from '../context';

export class PostService {
  constructor(private ctx: Context) {}

  public getPosts() {
    return this.ctx.prisma.post.findMany();
  }
  public getPostById(id: string) {
    return this.ctx.prisma.post.findFirst({ where: { id } });
  }
  public createPost(title: string, content: string) {
    return this.ctx.prisma.post.create({ data: { title, content } });
  }
  public updatePost({
    id,
    title,
    content,
  }: {
    id: string;
    title?: string;
    content?: string;
  }) {
    return this.ctx.prisma.post.update({
      where: { id },
      data: { title, content },
    });
  }
  public deletePost(id: string) {
    return this.ctx.prisma.post.delete({ where: { id } });
  }
}
