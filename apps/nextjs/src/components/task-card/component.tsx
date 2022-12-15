import type { inferProcedureOutput } from '@trpc/server';

import type { AppRouter } from '@test/api';

export const TaskCard: React.FC<{
  post: inferProcedureOutput<AppRouter['post']['all']>[number];
}> = ({ post }) => {
  const { title, content } = post;
  return (
    <div className="px-10 border-2 border-gray-500 py-5 rounded-lg cursor-pointer">
      <h2 className="text-xl font-bold text-[hsl(280,100%,70%)]">{title}</h2>

      {content && <p className="text-sm pt-2">{content}</p>}
    </div>
  );
};
