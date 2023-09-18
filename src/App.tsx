import { Routes, Route } from "react-router-dom";
import RouteProtector from "./components/RouteProtector/RouteProtector";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginPage from "./routes/LoginPage";
import ArticlePage from "./routes/ArticlePage";
import AdminPage from "./routes/AdminPage";
import NotFoundPage from "./routes/NotFoundPage";
import Toaster from "./components/Toaster/Toaster";
import MainPage from "./routes/MainPage";
import RegisterPage from "./routes/RegisterPage";
import { UserRole } from "./types/user";

function App() {
  return (
    <>
      <Toaster />
      <Header />
      <div className="flex-1 flex flex-col overflow-x-hidden overflow-y-scroll">
        <Routes>
          <Route
            path="/login"
            element={
              <RouteProtector onlyForRoles={[UserRole.Guest]}>
                <LoginPage />
              </RouteProtector>
            }
          />
          <Route
            path="/register"
            element={
              <RouteProtector onlyForRoles={[UserRole.Guest]}>
                <RegisterPage />
              </RouteProtector>
            }
          />
          <Route
            path="/admin"
            element={
              <RouteProtector onlyForRoles={[UserRole.Admin]}>
                <AdminPage />
              </RouteProtector>
            }
          />
          <Route path="/" element={<MainPage />} />
          <Route path="/articles/:id" element={<ArticlePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
