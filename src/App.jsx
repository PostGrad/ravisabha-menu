import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EventList from "./components/EventList";
import Menubar from "./components/Menubar";
import EventEntryForm from "./components/EventEntryForm";

function App() {
  return (
    <Router>
      <div className="container">
        {/* <Menubar />
        <EventList /> */}
      </div>
      <Routes>
        {/* <Route exact path="/" element={<HomePage />} /> */}
        {/* {user.name && <Route exact path="/ppd" element={<PPDPage />} />}
        {user.name && (
          <Route exact path="/pregnancy" element={<PregnancyPage />} />
        )}
        <Route exact path="/contact-us" element={<ContactUsPage />} />
        {user.name && <Route exact path="/memories" element={<Memories />} />}
        <Route exact path="/login" element={<LoginPage />} /> */}
        <Route exact path="/evententryform" element={<EventEntryForm />} />

        {/* <Route path="*" element={<HomePage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
