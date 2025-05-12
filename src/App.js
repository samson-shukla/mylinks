import { Routes, Route } from "react-router-dom";

import { MylinksPage } from "./components";

function App() {
  return (
    <div className="">
      <Routes>
        <Route path="*" element={<MylinksPage />} />
      </Routes>
    </div>
  );
}

export default App;
