import { useState } from "react"
import "../App.css"
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import {TextField , Button} from "@mui/material";
import { LogInPop } from "../store/atoms/LogInPop";
import { lodge } from "../store/atoms/signUpPop";
import { useRecoilState , useSetRecoilState } from "recoil";
import { userState } from "../store/atoms/user";
import axios from "axios";
import {account} from "../Backend/appwriteConfig.js";

export function SignUpPop()
{
    const [popup , setPopup] = useRecoilState(LogInPop)
    const [signuppopup , setSignUpPopup] = useRecoilState(lodge)
    const setUser = useSetRecoilState(userState);
    const [ email , setEmail] = useState("");
    const [ password , setPassword] = useState("");
    return (
        <>
            <div className="popUp">
                <div className="overlay" onClick={() =>
                {
                    setSignUpPopup(!signuppopup)
                }}></div>
                    <div className="popUp-content1">
                        <div className="popUP-content-div1">
                            <h2>Welcome!</h2>
                            <div>
                                <img src="src\assets\logo.jpg" alt=""/>
                                <h1>GITBIT.</h1>
                            </div>
                                <aside>
                                <p>Already a member?</p>
                                <span onClick={() =>
                                {
                                    setPopup(!popup)
                                    setSignUpPopup(!signuppopup)
                                }}>Log In</span>
                                </aside>
                        </div>
                                {/* </div> */}
                    {/* <div className="popUp-content2">        */}
                        <div className="popUP-content-div2">
                            <h2>Register Now</h2>
                            {/*************************  Input box 1 ***********************/}
                            <div>
                            <Button variant="outlined" style={{backgroundColor : "#09b399" , color : "black" , border : "2px solid black" , fontWeight : "600"}} id="LPSignIn" onClick={ async () =>
                            {
                                try {
                                    let sendData = {
                                        username : email,
                                        password : password
                                    }
                                    const res = await axios.post("http://localhost:3000/signup",sendData,{
                                        headers: {
                                            "Content-Type": "application/json",
                                        },
                                    });
                                    const data = res.data;
                                    localStorage.setItem("token", data.token);
                                    setUser({
                                        userEmail: email,
                                        isLoading: false
                                    })
                                } catch (error) {
                                    console.error();
                                }
                                setSignUpPopup(!signuppopup)
                            }}>SignUp</Button> 
                            </div>
                            <div style={{display : "flex"}}>
                                <p >
                                    <GitHubIcon/>
                                </p>
                                <p style={{marginLeft : "30px"}}>
                                <GoogleIcon/>
                                </p>
                                </div>
                        </div>
                    </div>
                </div>
        </>
    )
}
