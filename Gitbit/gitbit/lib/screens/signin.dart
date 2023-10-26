import 'package:flutter/material.dart';
import 'package:gitbit/model.dart/email.dart';
import 'package:gitbit/model.dart/page.dart';
import 'package:gitbit/screens/signup.dart';

class ButtonPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: MyColors.darkGrey,
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text(
              'Sign In',
              style: TextStyle(
                fontSize: 36,
                fontWeight: FontWeight.bold,
                color: Colors.white,
              ),
            ),
            SizedBox(height: 10.0), // Add spacing
            Text(
              'Welcome to Gitbit',
              style: TextStyle(
                fontSize: 18,
                color: Colors.white,
              ),
            ),
            SizedBox(height: 30.0),
            buildElevatedButtonWithIcon(
              onPressed: () {
                   Navigator.push(context,
                    MaterialPageRoute(builder: (_) =>EmailPasswordSignInPage()));
              },
              icon: Image.asset('assets/email_logo.png', width: 30, height: 30),
              label: 'Sign In with Email',
            ),
            SizedBox(height: 20.0),
            buildElevatedButtonWithIcon(
              onPressed: () {},
              icon:
                  Image.asset('assets/google_logo.png', width: 30, height: 30),
              label: 'Sign In with Google',
            ),
            SizedBox(height: 20.0),
            buildElevatedButtonWithIcon(
              onPressed: () {
                Navigator.pushReplacement(context,
                    MaterialPageRoute(builder: (_) => MyUserDetailsPage()));
              },
              icon:
                  Image.asset('assets/github_logo.png', width: 40, height: 40),
              label: 'Sign In with GitHub',
            ),
            SizedBox(height: 20.0),
            TextButton(
              onPressed: () {
                Navigator.push(
                    context, MaterialPageRoute(builder: (_) => Signup()));
              },
              child: Text(
                'New User? Sign Up',
                style: TextStyle(fontSize: 16, color: Colors.white),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget buildElevatedButtonWithIcon({
    required void Function() onPressed,
    required Widget icon,
    required String label,
  }) {
    return SizedBox(
      width: 300.0,
      height: 100,
      child: ElevatedButton.icon(
        onPressed: onPressed,
        icon: icon,
        label: Text(
          label,
          style: TextStyle(fontSize: 18),
        ),
        style: ButtonStyle(
          backgroundColor: MaterialStateProperty.all(Colors.transparent),
          shape: MaterialStateProperty.all(
            RoundedRectangleBorder(
              side: BorderSide(color: Colors.white, width: 2.0),
              borderRadius: BorderRadius.circular(10.0),
            ),
          ),
        ),
      ),
    );
  }
}

class MyColors {
  static const Color darkGrey = Color(0xFF0F0F0F);
  static const Color navyBlue = Color(0xFF232D3F);
  static const Color tealGreen = Color(0xFF005B41);
  static const Color darkCyan = Color(0xFF008170);
}
