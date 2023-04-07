import "./App.scss";
import { Dashboard } from "./components/Dashboard";
import { observer } from "mobx-react-lite";

function App() {
  return <Dashboard />;
}

export default observer(App);
