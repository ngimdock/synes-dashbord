import React, { useContext } from "react";
import SidebarContext, { SidebarProvider } from "context/SidebarContext";
import Sidebar from "example/components/Sidebar";
import Header from "example/components/Header";
import Main from "./Main";
import Head from "next/head";
import useAuth from "hooks/useAuth";
import { useSignal } from "@dilane3/gx";
import { CurrentUserState } from "gx/signals/current-user";
import { LOGIN_PAGE_LINK } from "../../constants";
import { useSynesPostsCategories } from "hooks/useSynesCategories";

interface ILayout {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

function Layout({ children, title, description }: ILayout) {
  const { isSidebarOpen } = useContext(SidebarContext);

  // Global auth state
  const { user: currentUser, loading } =
    useSignal<CurrentUserState>("current-user");

  // Get current user data
  useAuth();

  React.useEffect(() => {
    if (!loading && !currentUser) {
      window.location.href = LOGIN_PAGE_LINK;
    }
  }, [loading, currentUser]);

  React.useEffect(() => {
    if (!loading && !currentUser) {
      window.location.href = LOGIN_PAGE_LINK;
    }
  }, [loading, currentUser]);

  useSynesPostsCategories();

  return (
    <>
      <Head>
        <title>{title} | SYNES</title>
        <meta name="description" content={description} />
      </Head>

      {loading || !currentUser ? null : (
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
      )}
    </>
  );
}

export default Layout;

Layout.defaultProps = {
  title: "SYNES",
  description: "SYNES",
};
