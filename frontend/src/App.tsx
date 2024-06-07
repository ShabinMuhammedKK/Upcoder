

import { Routes,Route } from "react-router-dom";
import UserRouters from "./Routes/UserRouters";
import NotFound from "./components/NotFound";
import AdminRouters from "./Routes/AdminRouters";
import Home from "./pages/userPages/Home";


const App = () => {
  return (
    <div className="body">
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/user/*" element={<UserRouters />} />
      <Route path="/admin/*" element={<AdminRouters />} />
      <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;

