import 'package:flutter/material.dart';
import 'package:gitbit/model.dart/email.dart';
import 'package:google_sign_in/google_sign_in.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: ButtonPage(),
    );
  }
}

class ButtonPage extends StatelessWidget {
  final GoogleSignIn googleSignIn = GoogleSignIn(scopes: ['email']);

  Future<void> _handleSignInWithGoogle(BuildContext context) async {
    try {
      await googleSignIn.signOut(); // Sign out if already signed in

      final GoogleSignInAccount? googleUser = await googleSignIn.signIn();

      if (googleUser != null) {
        // User signed in, you can access their information in googleUser
        print('Google User ID: ${googleUser.id}');
        print('Google User Display Name: ${googleUser.displayName}');
        print('Google User Email: ${googleUser.email}');
        // You can proceed to sign in or register the user within your app.
      }
    } catch (error) {
      print('Google Sign-In Error: $error');
    }
  }

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
            SizedBox(height: 10.0),
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
                   Navigator.pushReplacement(context,
                    MaterialPageRoute(builder: (_) =>EmailPasswordSignInForm()));
          
              },
              icon: Image.asset('assets/email_logo.png', width: 30, height: 30),
              label: 'Sign In with Email',
            ),
            SizedBox(height: 20.0),
            buildElevatedButtonWithIcon(
              onPressed: () => _handleSignInWithGoogle(context),
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
                Navigator.push(context,
                    MaterialPageRoute(builder: (_) => MyUserDetailsPage()));
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

class MyUserDetailsPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('User Details'),
      ),
      body: Center(
        child: Text(
          'User Details Page',
          style: TextStyle(fontSize: 24),
        ),
      ),
    );
  }
}

class Signup extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Sign Up'),
      ),
      body: Center(
        child: Text(
          'Sign Up Page',
          style: TextStyle(fontSize: 24),
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
