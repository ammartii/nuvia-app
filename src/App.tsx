// Herramientas de React Router para gestionar las rutas.
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Importa componentes
import AvatarRegistration from "./auth/Register/AvatarRegistration";
import Achievements from "./views/Achievements/Achievements";
import Calendar from "./views/Calendar/Calendar";
import Entries from "./views/Entries/Entries";
import FeaturedDays from "./views/FeaturedDays/FeaturedDays";
import MoodAnalysis from "./views/MoodAnalysis/MoodAnalysis";
import Motivations from "./views/Motivations/Motivations";
import MotivationsRegistration from "./auth/Register/MotivationsRegistration";
import NotesFolder from "./views/NotesFolder/NotesFolder";
import NotesInsideFolder from "./views/NotesInsideFolder/NotesInsideFolder";
import PhotoGalery from "./views/PhotoGalery/PhotoGalery";
import Profile from "./views/Profile/Profile";
import Landing from "./views/Landing/Landing";
import Login from "./auth/Login/Login";
import ProfileRegistration from "./auth/Register/ProfileRegistration";
import Welcome from "./views/Welcome/Welcome";
import ScrollToTop from "./utils/scrollToTop";

function App() {
  return (
    <Router>
      <div>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/avatar-registration" element={<AvatarRegistration />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/entries" element={<Entries />} />
          <Route path="/featured-days" element={<FeaturedDays />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mood-analysis" element={<MoodAnalysis />} />
          <Route path="/motivations" element={<Motivations />} />
          <Route
            path="/motivations-registration"
            element={<MotivationsRegistration />}
          />
          <Route path="/notes-folder" element={<NotesFolder />} />
          <Route
            path="/notes-folder/:folderId"
            element={<NotesInsideFolder />}
          />
          <Route path="/photo-gallery" element={<PhotoGalery />} />
          <Route path="/profile" element={<Profile />} />

          <Route
            path="/profile-registration"
            element={<ProfileRegistration />}
          />
          <Route path="/welcome" element={<Welcome />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
