import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { BoardCard, BasePage, ArrowIcon } from '@components';
import { trpc } from '@utils';

const Board: NextPage = () => {
  const router = useRouter();
  const {
    data: board,
    isLoading,
    isError,
  } = trpc.board.byId.useQuery(Number(router.query.id));
  const mutation = trpc.board.delete.useMutation();

  if (isError) {
    return <div>Error</div>;
  }

  if (!board) {
    return <BasePage title="Loading.." />;
  }

  return (
    <BasePage title={board.title}>
      <div className="flex justify-center px-4 text-2xl ">
        {board ? (
          <div className="flex flex-col gap-4">
            <button
              className="absolute top-0 right-2 hover:scale-[110%]"
              onClick={() => {
                mutation.mutate(board.id);
                router.push('/');
              }}
            >
              x
            </button>
            <BoardCard board={board} />
          </div>
        ) : (
          <p>Loading..</p>
        )}
      </div>
    </BasePage>
  );
};

export default Board;
