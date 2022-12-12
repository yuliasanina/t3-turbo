import { router } from '../trpc';
import { protectedProcedure, publicProcedure } from './index';

export const authRouter = router({
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.session;
  }),
  getSecretMessage: protectedProcedure.query(() => {
    // testing type validation of overridden next-auth Session in @test/auth package
    return 'you can see this secret message!';
  }),
});
