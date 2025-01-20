// src/App.js
import AdminDashboard from "./components/admindashboard";
import ResponderDashboard from "./components/responderdashboard";
import UserPortal from "./components/userportal";

const App = () => {
  return (
    <div>
      <h1>Emergency Services Application</h1>
      <AdminDashboard />
      <ResponderDashboard />
      <UserPortal />
    </div>
  );
};

export default App;
