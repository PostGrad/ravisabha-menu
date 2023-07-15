import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EventList from "./components/EventList";
import Menubar from "./components/Menubar";
import EventEntryForm from "./components/EventEntryForm";
import DetailedEvent from "./components/DetailedEvent";
import ItemRow from "./components/itemList/ItemRow";

function App() {
  return (
    <Router>
      <div className="container">
        <Menubar />
      </div>
      <Routes>
        <Route exact path="/" element={<EventList />} />
        {/* {user.name && <Route exact path="/ppd" element={<PPDPage />} />}
        {user.name && (
          <Route exact path="/pregnancy" element={<PregnancyPage />} />
        )}
        <Route exact path="/contact-us" element={<ContactUsPage />} />
        {user.name && <Route exact path="/memories" element={<Memories />} />}
        <Route exact path="/login" element={<LoginPage />} /> */}
        <Route exact path="/evententryform" element={<EventEntryForm />} />
        <Route exact path="/detailedevent" element={<DetailedEvent />} />
        <Route exact path="/itemrow" element={<ItemRow />} />

        {/* <Route path="*" element={<HomePage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
