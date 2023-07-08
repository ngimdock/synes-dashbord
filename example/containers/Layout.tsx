import React, { useCallback, useContext, useMemo } from "react";
import SidebarContext, { SidebarProvider } from "context/SidebarContext";
import Sidebar from "example/components/Sidebar";
import Header from "example/components/Header";
import Main from "./Main";
import Head from "next/head";
import useAuth from "hooks/useAuth";
import { useActions, useSignal } from "@dilane3/gx";
import { CurrentUserState } from "gx/signals/current-user";
import { LOGIN_PAGE_LINK } from "../../constants";
import { getModifiedCookieValues } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { getPostCategories } from "api/posts_categories";
import PostCategory, { postCategory } from "../../entities/post_categories/postCategory";

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

  const {loadPostCategories} = useActions("postCategories");

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


  const newCurrentUser = useMemo(() => currentUser, [currentUser])

  const cachedLoadPostCategories = useCallback( async () => {
    const result = await getPostCategories();

    let postCategories: PostCategory[] = [];

    if(result.data.count > 0) { 
      console.log(result.data.data);
      postCategories = result.data.data.map((postCategory: postCategory) => {        
        return new PostCategory(postCategory)
      })
    }

    loadPostCategories(postCategories);
    },[loadPostCategories]);

  React.useEffect(() => {
    if(newCurrentUser) {
      cachedLoadPostCategories();
    }
  }, [newCurrentUser]);

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
