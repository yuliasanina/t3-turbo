import { expect, test, beforeEach, afterEach, afterAll } from 'vitest';

import { createContext } from '../context';
import { PostService } from './service';

const ctx = await createContext();
const postService = new PostService(ctx);

afterEach(async () => {
  await ctx.prisma.post.deleteMany();
});
beforeEach(async () => {
  await ctx.prisma.post.create({
    data: { title: 'hello test', content: 'hello test' },
  });
});

const getPostId = async () => {
  return (
    await ctx.prisma.post.findFirst({
      where: { title: 'hello test' },
      select: { id: true },
    })
  )?.id;
};
test('getPosts', async () => {
  const posts = await postService.getPosts();
  expect(posts).toHaveLength(1);
  expect(posts[0]).toMatchObject({
    title: 'hello test',
    content: 'hello test',
  });
});
test('getPostById', async () => {
  const postId = await getPostId();

  const post = await postService.getPostById(postId!);
  expect(post).toMatchObject({
    title: 'hello test',
    content: 'hello test',
  });
});

test('createPost', async () => {
  const post = await postService.createPost('hello test 2', 'hello test 2');
  expect(post).toMatchObject({
    title: 'hello test 2',
    content: 'hello test 2',
  });
});

test('updatePost', async () => {
  const postId = await getPostId();
  const post = await postService.updatePost({
    id: postId!,
    title: 'hello test 2',
    content: 'hello test 2',
  });
  expect(post).toMatchObject({
    title: 'hello test 2',
    content: 'hello test 2',
  });
});
test('deletePost', async () => {
  const postId = await getPostId();
  const post = await postService.deletePost(postId!);
  expect(post).toMatchObject({
    title: 'hello test',
    content: 'hello test',
  });
  const isDeleted = await ctx.prisma.post.findFirst({
    where: { id: postId },
  });
  expect(isDeleted).toBeNull();
});
