import { useState } from "react"
import "../App.css"
import {TextField , Button} from "@mui/material";
import { LogInPop } from "../store/atoms/LogInPop";
import { lodge } from "../store/atoms/signUpPop";
import { useRecoilState , useSetRecoilState } from "recoil";
import { userState } from "../store/atoms/user";
import axios from "axios";

export function SignInPop()
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
                    setPopup(!popup)
                }}></div>
                    <div className="popUp-content1">
                        <div className="popUP-content-div1">
                            <h2>Welcome!</h2>
                            <div>
                                <img src="src\assets\logo.jpg" alt=""/>
                                <h1>GITBIT.</h1>
                            </div>
                                <aside>
                                <p>Not a member yet?</p>
                                <span onClick={() =>
                                {
                                    setPopup(!popup)
                                    setSignUpPopup(!signuppopup)
                                }}>Register now</span>
                                </aside>
                        </div>

                        <div className="popUP-content-div2">
                            <h2>Log in</h2>
                            {/*************************  Input box 1 ***********************/}
                            <div>
                                <h4>Your Email</h4>
                            <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Email Address"
                                    autoComplete="email"    
                                    className='inputField'
                                    sx={{
                                        "& .MuiInputLabel-root": {color: 'white'},//styles the label
                                        "& .MuiOutlinedInput-root": {
                                            "& > fieldset": { borderColor: "black" },
                                        },
                                    }}
                                    autoFocus
                                    onChange={(e)=>{
                                        setEmail(e.target.value);
                                    }}
                                    InputLabelProps={{
                                        style: { color: 'black' , backgroundColor : "white"} 
                                    }}
                                    InputProps={{
                                        style: { color: 'black'  , backgroundColor : "white"},
                                    }}
                                />
                                {/**********************  Password ***************************/}
                                <h4>Password</h4>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Password"
                                    type="password"
                                    autoComplete="current-password"
                                    sx={{
                                        "& .MuiInputLabel-root": {color: 'white'},//styles the label
                                        "& .MuiOutlinedInput-root": {
                                            "& > fieldset": { borderColor: "black" },
                                        },
                                    }}
                                    onChange={(e)=>{
                                        setPassword(e.target.value);
                                    }}
                                    InputLabelProps={{
                                        style: { color: 'black' , backgroundColor : "white"} 
                                    }}
                                    InputProps={{
                                        style: { color: 'black'  , backgroundColor : "white"},
                                    }}
                                />
                            <Button variant="outlined" id="LPSignIn" onClick={ async () =>
                            {
                                try {
                                    let sendData = {
                                        username : email,
                                        password : password
                                    }
                                    const res = await axios.post("http://localhost:3000/login",sendData,{
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
                                setPopup(!popup)
                            }}>Login</Button> 
                            </div>
                            <div className="OAuth">
                                <h2 style={{color : "#900800"}}>OAuth coming Soon</h2>
                            </div>
                        </div>
                    </div>
                </div>
        </>
    )
}
