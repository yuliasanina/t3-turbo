import type { inferProcedureOutput } from '@trpc/server';
import Link from 'next/link';

import type { AppRouter } from '@test/api';

export const BoardCard: React.FC<{
  board: inferProcedureOutput<AppRouter['board']['all']>[number];
}> = ({ board }) => {
  const { title } = board;
  return (
    <Link
      href={`/board/${board.id}`}
      className=" relative w-72 px-10 border-2 border-gray-500 py-5 rounded-lg cursor-pointer hover:bg-violet-900 active:bg-violet-800 transition duration-300"
    >
      <h2 className="text-xl font-bold text-[hsl(280,100%,70%)]">{title}</h2>
    </Link>
  );
};
