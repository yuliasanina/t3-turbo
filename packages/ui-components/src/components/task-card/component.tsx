import type { inferProcedureOutput } from '@trpc/server';

import type { AppRouter } from '@test/api';

export const TaskCard: React.FC<{
  post: inferProcedureOutput<AppRouter['post']['all']>[number];
}> = ({ post }) => {
  return (
    <div className="p-4 border-2 border-gray-500 rounded-lg max-w-2xl hover:scale-[101%] transition-all">
      <h2 className="text-2xl font-bold text-[hsl(280,100%,70%)]">
        {post.title}
      </h2>

      <p>{post.content}</p>
      {/* {post.content && <p>{post.content}</p>} */}
    </div>
  );
};
