import "../App.css"
import * as React from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { SignInPop } from "./SignInPopup";
import { SignUpPop } from "./SignUpPopup";
import { useRecoilState , useRecoilValue , useSetRecoilState} from "recoil";
import { LogInPop } from "../store/atoms/LogInPop";
import { lodge } from "../store/atoms/signUpPop";
import { useEffect } from "react";
import { emailSelector } from "../store/selectors/userEmail";
import Button from '@mui/material/Button';
import { userState } from "../store/atoms/user";
import Avatar from '@mui/material/Avatar';
import { useNavigate } from "react-router-dom";

export function StaticNavBar()
{
    const userEmail = useRecoilValue(emailSelector)
    const [popup , setPopup] = useRecoilState(LogInPop)
    const [signuppopup , setSignUpPopup] = useRecoilState(lodge)
    const setUser = useSetRecoilState(userState);
    const navigate = useNavigate();
    useEffect(() =>
    {
        AOS.init({duration : 700})
    } ,[])

    if(userEmail)
    {
        return (
            <>
            <div className="navbar">
                    <h2>
                    <Avatar alt="Remy Sharp" src="../assets/logo.jpg" />
                    <span>GITBIT</span>
                    </h2>
                    <div id="typing">
                        
                    </div>
                    <p className="navbarLinks"><a href="https://sih.gov.in/sih2023PS" target="_blank">SIH</a></p>
                    <Avatar alt="Remy Sharp" src="src\assets\avatar.jpg" style={{marginRight : "2vh" , marginTop : "1.5vh" , borderRadius : "30px" , border : "2px solid grey"}}/>
                    <Button variant="contained" id="LPSignIn" onClick={() =>
                    {
                        localStorage.setItem("token" , null);
                        setUser({
                            userEmail: null,
                            isLoading: false
                        })
                        navigate("/");
                    }}>LogOut</Button>
                    <Button variant="outlined" id="LPSignUp">Contribute</Button>
                </div>
            </>
        )
    }
    else
    {
        return (
            <>
            <div className="navbar">
                    <h2>
                    <Avatar style={{height : "10vh" , width : "auto" , padding : "0px"}} alt="Remy Sharp" src="src\assets\logo.jpg" />
                    <span>GITBIT</span>
                    </h2>
                    <div id="typing">
                        
                    </div>
                    <Button variant="contained" id="LPSignIn"onClick={() =>
                    {
                        setPopup(!popup);
                    }}>LogIn</Button>
                    <Button variant="outlined" id="LPSignUp" onClick={() =>
                    {
                        setSignUpPopup(!signuppopup)
                    }}>Get Started</Button>
                </div>
                {popup==false && (
                    <SignInPop/>
                )}
        
                {signuppopup==false && (
                    <SignUpPop/>
                )}
            </>
        )
    }
}




{/* <Spline scene="https://prod.spline.design/cBnRtsxZJ9FhITyx/scene.splinecode" /> */}
          {/* <Spline scene="https://prod.spline.design/LH5tU9Y6IGc2aAVR/scene.splinecode" /> */}
          {/* <Spline style={{ width : "250vh" , height : "auto"}} scene="https://prod.spline.design/LH5tU9Y6IGc2aAVR/scene.splinecode" /> */}
          {/* <Spline scene="https://prod.spline.design/kjWydBzPqCFLhVKK/scene.splinecode" /> */}
          {/* <Spline scene="https://prod.spline.design/kjWydBzPqCFLhVKK/scene.splinecode" /> */}
          {/* <Spline scene="https://prod.spline.design/xKOZAZMJcau8xiSG/scene.splinecode" /> */}