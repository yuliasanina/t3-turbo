import { trpc } from '@utils';

export function useChangeTask(id?: string) {
  const utils = trpc.useContext();

  return trpc.task.update.useMutation({});
}
