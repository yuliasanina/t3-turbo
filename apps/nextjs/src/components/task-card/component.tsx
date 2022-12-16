import type { inferProcedureOutput } from '@trpc/server';

import type { AppRouter } from '@test/api';

export const TaskCard: React.FC<{
  task: inferProcedureOutput<AppRouter['task']['all']>[number];
}> = ({ task }) => {
  const { title, description } = task;
  return (
    <div className="w-full cursor-pointer rounded-lg border border-gray-500 px-[15px] py-[10px] hover:bg-violet-900 active:bg-violet-800">
      <h2 className="text-xl font-bold text-[hsl(280,100%,70%)]">{title}</h2>

      {description && <p className="pt-2 text-sm">{description}</p>}
    </div>
  );
};
