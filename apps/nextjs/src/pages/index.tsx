import type { NextPage } from 'next';
import { signIn, signOut } from 'next-auth/react';
import { useState } from 'react';

import { BoardCard, BasePage, BaseButton, BasePopup } from '@components';
import { trpc } from '@utils';

const Home: NextPage = () => {
  const utils = trpc.useContext();
  const { data: boards, isLoading } = trpc.board.all.useQuery();

  const { mutate: createBoard } = trpc.board.create.useMutation({
    onSuccess: () => {
      utils.board.all.invalidate();
    },
  });

  return (
    <BasePage title="Home page" isLoading={isLoading}>
      <>
        <AuthShowcase />
        <div className="flex justify-center px-4 text-2xl">
          <div className="mt-[20px] flex flex-col gap-4">
            <BaseButton onClick={() => setIsPopupOpen(true)}>
              Add a board
            </BaseButton>

            {boards?.map((board) => {
              return <BoardCard key={board.id} board={board} />;
            })}
          </div>
        </div>
      </>
    </BasePage>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: session } = trpc.auth.getSession.useQuery();

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {session?.user && (
        <p className="text-center text-2xl text-white">
          <span>Logged in as {session.user.name}.</span>
          <span> Manage your boards here!</span>
        </p>
      )}
      <BaseButton
        className="absolute top-5 right-5"
        onClick={session ? () => signOut() : () => signIn()}
      >
        {session ? 'Sign out' : 'Sign in'}
      </BaseButton>
    </div>
  );
};
