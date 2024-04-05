import ReactDOM from "react-dom/client";
import CombineRouter from "./CombineRouter.tsx";
import ProviderStore from "../store/ProviderStore.tsx";
import "./index.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ProviderStore>
    <CombineRouter />
  </ProviderStore>
);
