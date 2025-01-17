import { ModeToggle } from '@/components/theme-toggle';

export function NavBar() {
  return (
    <header className="sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 max-w-screen-2xl items-center">
      <div className="mr-4 md:flex">
          <a className='text-xl font-semibold mr-4 space-x-2 lg:mr-6' href='/'>Go + Graphql + React</a>
        </div>

        <div className='flex flex-1 items-center justify-between space-x-2 md:justify-end'>
          <div className='flex items-center'>
            <ul className='flex items-center gap-1'>
              <li>
                <ModeToggle />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};
