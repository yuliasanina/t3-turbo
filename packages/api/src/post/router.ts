import { z } from 'zod';

import { publicProcedure, protectedProcedure } from '../auth';
import { router } from '../trpc';
import { PostService } from './service';

export const postRouter = router({
  all: publicProcedure.query(({ ctx }) => {
    const post = new PostService(ctx);
    return post.getPosts();
  }),
  byId: publicProcedure.input(z.string().uuid()).query(({ ctx, input }) => {
    const post = new PostService(ctx);
    return post.getPostById(input);
  }),
  create: protectedProcedure
    .input(z.object({ title: z.string(), content: z.string() }))
    .mutation(({ ctx, input }) => {
      const post = new PostService(ctx);
      return post.createPost(input.title, input.content);
    }),
  update: protectedProcedure
    .input(
      z.object({
        title: z.string().optional(),
        content: z.string().optional(),
        id: z.string().cuid(),
      })
    )
    .mutation(({ ctx, input }) => {
      const post = new PostService(ctx);
      return post.updatePost(input);
    }),
  delete: protectedProcedure
    .input(z.string().cuid())
    .mutation(({ ctx, input }) => {
      const post = new PostService(ctx);
      return post.deletePost(input);
    }),
});
export type PostRouter = typeof postRouter;
