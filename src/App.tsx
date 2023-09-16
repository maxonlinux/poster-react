import { Routes, Route } from "react-router-dom";
import RouteProtector from "./components/RouteProtector/RouteProtector";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginPage from "./routes/LoginPage";
import ArticlePage from "./routes/ArticlePage";
import AdminPage from "./routes/AdminPage";
import NotFoundPage from "./routes/NotFoundPage";
import Toaster from "./components/Toaster/Toaster";
import { UserContext } from "./components/Context/UserContext";
import { useContext } from "react";
import MainPage from "./routes/MainPage";

function App() {
  // Contexts
  const { user } = useContext(UserContext);

  return (
    <>
      <Toaster />
      <Header />
      <div className="flex-1 flex flex-col overflow-x-hidden overflow-y-scroll">
        <Routes>
          <Route
            path="/login"
            element={
              <RouteProtector onlyForRoles={[0]}>
                <LoginPage />
              </RouteProtector>
            }
          />
          <Route
            path="/admin"
            element={
              <RouteProtector onlyForRoles={[1]}>
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
