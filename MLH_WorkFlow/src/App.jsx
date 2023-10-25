// import './App.css'
import { useState , useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from './Components/LandingPage';
import { RecoilRoot, useSetRecoilState} from 'recoil';
import axios from 'axios';

function App() {

  return (
    <RecoilRoot>
        <div>
                <Router>
                  {/* <ActiveUser/> */}
                    <Routes>
                        <Route path={"/"} element={<LandingPage/>}/>
                    </Routes>
                </Router>
            </div>
      </RecoilRoot>
  )
}

function ActiveUser() {
    const setUser = useSetRecoilState(userState);
    const AU = async() => {
        try {
            const response = axios.get("http://localhost:3000/me",{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            })

            if (response.data.username) {
                setUser({
                    isLoading: false,
                    userEmail: response.data.username
                })
            } else {
                setUser({
                    isLoading: false,
                    userEmail: null
                })
            }
        } catch (e) {

            setUser({
                isLoading: false,
                userEmail: null
            })
        }
    };

    useEffect(() => {
        AU();
    }, []);

    return <></>
}

export default App
