import type { NextPage } from 'next';
import { signIn, signOut } from 'next-auth/react';

import { BoardCard, BasePage } from '@components';
import { trpc } from '@utils';

const Home: NextPage = () => {
  const { data: boards } = trpc.board.all.useQuery();

  return (
    <BasePage title="Home page">
      <>
        <AuthShowcase />
        <div className="flex justify-center px-4 text-2xl ">
          {boards ? (
            <div className="flex flex-col gap-4">
              {boards?.map((board) => {
                return <BoardCard key={board.id} board={board} />;
              })}
            </div>
          ) : (
            <p>Loading..</p>
          )}
        </div>
      </>
    </BasePage>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: session } = trpc.auth.getSession.useQuery();

  const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: !!session?.user }
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {session?.user && (
        <p className="text-center text-2xl text-white">
          <span>Logged in as {session.user.name}.</span>
          <span> Manage your boards here!</span>
        </p>
      )}
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={session ? () => signOut() : () => signIn()}
      >
        {session ? 'Sign out' : 'Sign in'}
      </button>
    </div>
  );
};
