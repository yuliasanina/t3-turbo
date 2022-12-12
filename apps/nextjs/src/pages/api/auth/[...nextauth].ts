import NextAuth from 'next-auth';

import { authOptions } from '@test/auth';

export default NextAuth(authOptions);
