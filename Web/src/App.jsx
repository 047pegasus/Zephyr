import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from "./Pages/LandingPage.jsx";
import Gsoc from "./Pages/Gsoc.jsx"
import Trending from "./Pages/Trending";
function App() {
    return (
        <>
            <Router>
                {/*<Appbar></Appbar><Appbar></Appbar>*/}
                <Routes>
                    <Route path="/gsoc" element={<Gsoc />} />
                    <Route path="/" element={<LandingPage/>}/>
                    <Route path="/trending" element={<Trending/>}/>
                </Routes>
            </Router>
        </>
    )
}

export default App