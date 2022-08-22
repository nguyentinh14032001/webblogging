import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { SignInProvider } from "./context/SignInContext";

const HomePage = React.lazy(() => import("./Pages/HomePage"));
const DashboardLayout = React.lazy(() =>
  import("./component/module/dashboard/DashboardLayout")
);
const CategoryPage = React.lazy(() => import("./Pages/CategoryPage"));
const DashboardPage = React.lazy(() => import("./Pages/DashboardPage"));
const SignInPage = React.lazy(() => import("./Pages/SignInPage"));
const SignUpPage = React.lazy(() => import("./Pages/SignUpPage"));
const PostDetailsPage = React.lazy(() => import("./Pages/PostDetailsPage"));
const NotFoundPage = React.lazy(() => import("./Pages/NotFoundPage"));
const UserUpdate = React.lazy(() =>
  import("./component/module/user/UserUpdate")
);
const UserAddNew = React.lazy(() =>
  import("./component/module/user/UserAddNew")
);
const UserManage = React.lazy(() =>
  import("./component/module/user/UserManage")
);
const PostAddNew = React.lazy(() =>
  import("./component/module/post/PostAddNew")
);
const PostManage = React.lazy(() =>
  import("./component/module/post/PostManage")
);
const PostUpdate = React.lazy(() =>
  import("./component/module/post/PostUpdate")
);
const PostUser = React.lazy(() => import("./component/module/post/PostUser"));
const CategoryAddNew = React.lazy(() =>
  import("./component/module/category/CategoryAddNew")
);
const CategoryManage = React.lazy(() =>
  import("./component/module/category/CategoryManage")
);
const CategoryUpdate = React.lazy(() =>
  import("./component/module/category/CategoryUpdate")
);

function App() {
  return (
    <div>
      <AuthProvider>
        <SignInProvider>
          <Suspense>
            <Routes>
              <Route path="/" element={<HomePage></HomePage>}></Route>
              <Route
                path="/sign-up"
                element={<SignUpPage></SignUpPage>}
              ></Route>
              <Route
                path="/sign-in"
                element={<SignInPage></SignInPage>}
              ></Route>
              <Route
                path="/category/:slug"
                element={<CategoryPage></CategoryPage>}
              ></Route>
              <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
              <Route
                path="/:slug"
                element={<PostDetailsPage></PostDetailsPage>}
              ></Route>
              <Route element={<DashboardLayout></DashboardLayout>}>
                <Route
                  path="/dashboard"
                  element={<DashboardPage></DashboardPage>}
                ></Route>
                <Route
                  path="/manage/post"
                  element={<PostManage></PostManage>}
                ></Route>
                <Route
                  path="/manage/postUser"
                  element={<PostUser></PostUser>}
                ></Route>
                <Route
                  path="/manage/add-post"
                  element={<PostAddNew></PostAddNew>}
                ></Route>
                <Route
                  path="/manage/category"
                  element={<CategoryManage></CategoryManage>}
                ></Route>
                <Route
                  path="/manage/add-category"
                  element={<CategoryAddNew></CategoryAddNew>}
                ></Route>
                <Route
                  path="/manage/update-category"
                  element={<CategoryUpdate></CategoryUpdate>}
                ></Route>
                <Route
                  path="/manage/user"
                  element={<UserManage></UserManage>}
                ></Route>
                <Route
                  path="/manage/add-user"
                  element={<UserAddNew></UserAddNew>}
                ></Route>
                <Route
                  path="/manage/update-user"
                  element={<UserUpdate></UserUpdate>}
                ></Route>
                <Route
                  path="/manage/update-post"
                  element={<PostUpdate></PostUpdate>}
                ></Route>
              </Route>
            </Routes>
          </Suspense>
        </SignInProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
