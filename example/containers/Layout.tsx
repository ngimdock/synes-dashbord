import { useContext } from "react";
import SidebarContext, { SidebarProvider } from "context/SidebarContext";
import Sidebar from "example/components/Sidebar";
import Header from "example/components/Header";
import Main from "./Main";
import Head from "next/head";
import useAuth from "hooks/useAuth";

interface ILayout {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

function Layout({ children, title, description }: ILayout) {
  const { isSidebarOpen } = useContext(SidebarContext);

  // Get current user data
  useAuth();

  return (
    <>
      <Head>
        <title>{ title } | SYNES</title>
        <meta name="description" content={ description } />
      </Head>
      
      <SidebarProvider>
        <div
          className={`flex h-screen bg-gray-50 dark:bg-gray-900 ${
            isSidebarOpen && "overflow-hidden"
          }`}
        >
          <Sidebar />
          <div className="flex flex-col flex-1 w-full">
            <Header />
            <Main>{children}</Main>
          </div>
        </div>
      </SidebarProvider>
    </>
  );
}

export default Layout;

Layout.defaultProps = {
  title: "SYNES",
  description: "SYNES",
};
