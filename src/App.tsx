import { Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./pages/Layout";
import RecentAds from "./components/RecentAds";
import About from "./pages/About";
import AdDetails from "./pages/AdDetails";
import NewAdFormPage from "./pages/NewAdFormPage";
import NewCat from "./pages/NewCat";
import AdSearchPage from "./pages/AdSearchPage";
import AdsByCategory from "./pages/AdsByCategory";
import EditAd from "./pages/EditAd";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<RecentAds />} />
          <Route path="about" element={<About />} />
          <Route path="/ad/new" element={<NewAdFormPage />} />
          <Route path="ad/edit/:id" element={<EditAd />} />
          <Route path="/ad/search/:keyword" element={<AdSearchPage />} />
          <Route path="ad/:id" element={<AdDetails />} />
          <Route path="category/new" element={<NewCat />} />
          <Route path="/ads/category/:name" element={<AdsByCategory />} /> */
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}
