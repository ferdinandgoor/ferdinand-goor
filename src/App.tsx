import { Navigate, Route, Routes } from "react-router-dom";
// @ts-ignore
import Page from "./app/Page";

const App = () => (
  <Routes>
    <Route path="/" element={<Page />} />
    <Route path="/video" element={<Page />} />
    <Route path="/music" element={<Page />} />
    <Route path="/youtube" element={<Page />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default App;
