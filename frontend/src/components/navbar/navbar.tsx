import { UserMenu } from './user';
import { ModeToggle } from '../theme-toggle';
import { User } from '@/graphql/types/graphql';

export function NavBar({ user } : {user : User | undefined}): JSX.Element {
  return (
    <header className="border-grid sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container-wrapper">
        <div className="container mx-auto flex h-14 max-w-screen-2xl items-center">
          <div className="mr-4 md:flex">
            <a className='text-xl font-semibold mr-4 space-x-2 lg:mr-6' href='/'>Go + Graphql + React</a>
          </div>

          <div className='flex flex-1 items-center justify-between space-x-2 md:justify-end'>
            <div className='flex items-center'>
              {user ? (
                <UserMenu className="mx-6 my-3" />
              ) : (
                <ModeToggle />
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
