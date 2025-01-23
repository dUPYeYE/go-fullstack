import { useEffect } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import LoginPage from '@/app/login/page'
import { useAppContext } from '@/hooks/use-context'
import { userRoutes } from './routes';
import { NavBar } from './components/navbar/navbar';
import { LoaderCircle } from 'lucide-react';

function App() {
  const { user, isAppInitialized, initApp } = useAppContext();

  useEffect(() => {
    initApp();
  }, []);

  if (!isAppInitialized) {
    return (
      <>
        <NavBar user={undefined} />
        <div className="container-wrapper">
          <div className="container">
            <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
              <LoaderCircle className="animate-spin h-12 w-12" />
            </div>
          </div>
        </div>
      </>
    )
  }

  if (!user) {
    return (
      <>
        <NavBar user={undefined} />
        <div className="container-wrapper">
          <div className="container">
            <LoginPage />
          </div>
        </div>
      </>
    )
  }

  return <RouterProvider router={createBrowserRouter(userRoutes)} />;
}

export default App;
