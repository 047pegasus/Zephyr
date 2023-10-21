import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Appbar from "./AppBar.jsx";
import LandingPage from "./Pages/LandingPage.jsx";
import Gsoc from "./Pages/Gsoc.jsx"
function App() {
    return (
        <>
            <Router>
                <Appbar></Appbar>
                <Routes>
                    <Route path="/gsoc" element={<Gsoc />} />
                    <Route path="/" element={<LandingPage/>}/>
                </Routes>
            </Router>
        </>
    )
}

export default App