import type { inferProcedureOutput } from '@trpc/server';

import type { AppRouter } from '@test/api';
import { Task } from '@test/db';

import { TaskCard } from '../task-card';

export const Column: React.FC<{
  column: inferProcedureOutput<AppRouter['column']['all']>[number] & {
    tasks: Task[];
  };
}> = ({ column }) => {
  const { title } = column;
  return (
    <div className="relative h-full w-[300px] rounded-lg border border-gray-500 py-[10px] px-[15px] transition duration-300">
      <h2 className="text-xl font-bold text-[hsl(280,100%,70%)]">{title}</h2>
      <div className="my-[10px] h-[1px] w-full bg-white" />
      <div className="flex">
        {column.tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};
