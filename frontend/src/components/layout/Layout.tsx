import { ReactNode } from 'react';
import { NavBar } from '../navbar/navbar';
import { useAppContext } from '@/hooks/use-context';

function Layout({ children }: { children: ReactNode }) {
  const  { user } = useAppContext();
  return (
    <>
      <NavBar user={user} />
      <div className="content">
        {children}
      </div>
    </>
  );
}

export default Layout; 
