import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ApolloProvider, HttpLink } from '@apollo/client';
import { ApolloClient, InMemoryCache, Observable, from } from '@apollo/client';
import { onError } from "@apollo/client/link/error";
import { setContext as mySetContext } from "@apollo/client/link/context";

import App from './App.tsx'
import { ThemeProvider } from '@/components/theme-provider.tsx';
import { Separator } from '@/components/ui/separator.tsx';
import { NavBar } from '@/components/navbar.tsx';
import { Toaster } from '@/components/ui/sonner.tsx';
import axios from 'axios';
import { ContextProvider } from './context-provider.tsx';

const root = createRoot(document.getElementById("root")!);

function RootComponent() {
  let myToken: string;

  const link = new HttpLink({ uri: "http://localhost:8080/graphql/query", credentials: "include" });

  const authLink = mySetContext((_, { headers }) => {
    return myToken ? { headers: { ...headers, Authorization: myToken } } : { headers: { ...headers } };
  });

  const errorLink = onError(({ graphQLErrors, operation, forward }) => {
    if (!graphQLErrors) return;

    if (graphQLErrors[0].extensions.code === "NOT_ALLOWED" || graphQLErrors[0].extensions.code === "UNAUTHORIZED") {
      return new Observable((observer) => {
        (async () => {
          try {
            for (const err of graphQLErrors) {
              switch (err.extensions.code) {
                default:
                  return;
                case "NOT_ALLOWED":
                  checkUserAgain(operation, forward, observer);
                  break;
                case "UNAUTHORIZED":
                  checkUserAgain(operation, forward, observer);
                  break;
              }
            }
          } catch (error) {
            observer.error(error);
          }
        })();
      });
    }
  });

  async function checkUserAgain(operation: any, forward: any, observer: any) {
    const response = await axios.post(
      "http://localhost:8080/graphql/query",
      {
        operationName: "RefreshToken",
        query: "mutation RefreshToken {\n refreshToken\n}",
        variables: {},
      },
      {
        withCredentials: true,
      }
    );
    if (response) {
      const oldHeaders = operation.getContext().headers;
      operation.setContext({
        headers: {
          ...oldHeaders,
          Authorization: response.data.data.refreshToken,
        },
      });
      const subscriber = {
        next: observer.next.bind(observer),
        error: observer.error.bind(observer),
        complete: observer.complete.bind(observer),
      };
      myToken = response.data.data.refreshToken;
      forward(operation).subscribe(subscriber);
    }
  }

  const client = new ApolloClient({
    link: from([errorLink, authLink.concat(link)]),
    cache: new InMemoryCache(),
  });

  return (
    <StrictMode>
      <ApolloProvider client={client}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <ContextProvider>
            <div className="relative flex flex-col min-h-screen"> 
              <NavBar />

              <App />

              <Toaster />

              <footer className="py-6 md:px-8 md:py-0">
                <Separator />
                <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
                  <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
                    {"Built by "}
                    <a
                      href="https://portfolio-dupp.vercel.app/"
                      target="_blank"
                      rel="noreferrer"
                      className="font-medium underline underline-offset-4"
                    >
                      {"dupp"}
                    </a>
                    {"."}
                  </p>
                </div>
              </footer> 
            </div>
          </ContextProvider>
        </ThemeProvider>
      </ApolloProvider>
    </StrictMode>
  )
}

root.render(<RootComponent />);
