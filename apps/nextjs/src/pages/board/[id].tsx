import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import { BoardCard, BasePage, Column, BaseButton } from '@components';
import { trpc } from '@utils';

const Board: NextPage = () => {
  const router = useRouter();

  const {
    data: board,
    isLoading,
    isError,
  } = trpc.board.byId.useQuery(Number(router.query.id));

  const mutation = trpc.board.delete.useMutation();

  console.log(board);

  if (isError) {
    return <div>Error</div>;
  }

  if (!board) {
    return <BasePage title="Loading.." />;
  }

  return (
    <BasePage title={board.title} isLoading={isLoading}>
      <div className="flex w-full justify-center px-4 text-2xl">
        <div className="flex flex-col gap-4">
          <BaseButton
            className="absolute top-5 right-5 text-sm"
            onClick={() => {
              mutation.mutate(board.id);
              router.push('/');
            }}
          >
            Remove
          </BaseButton>
          <div className="flex h-[600px] w-[1000px] justify-between p-5">
            {board.columns?.map((column) => (
              <Column key={column.id} column={column} />
            ))}
          </div>
        </div>
      </div>
    </BasePage>
  );
};

export default Board;
