
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: LoginScreen(),
    );
  }
}

class LoginScreen extends StatefulWidget {
  @override
  _LoginScreenState createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final FirebaseAuth _auth = FirebaseAuth.instance;
  final flutterWebviewPlugin = FlutterWebviewPlugin();
  final String clientId = 'YOUR_GITHUB_CLIENT_ID';
  final String clientSecret = 'YOUR_GITHUB_CLIENT_SECRET';
  final String redirectUrl = 'YOUR_REDIRECT_URL';

  Future<User?> signInWithGitHub(BuildContext context) async {
    final authUrl =
        'https://github.com/login/oauth/authorize?client_id=$clientId&redirect_uri=$redirectUrl&scope=user';

    flutterWebviewPlugin.launch(
      authUrl,
      fullScreen: false,
      clearCookies: true,
    );

    flutterWebviewPlugin.onUrlChanged.listen((url) async {
      if (url.startsWith(redirectUrl)) {
        final code = Uri.parse(url).queryParameters['code'];
        final tokenUrl = 'https://github.com/login/oauth/access_token';
        final response = await http.post(
          Uri.parse(tokenUrl),
          headers: {
            'Accept': 'application/json',
          },
          body: {
            'client_id': clientId,
            'client_secret': clientSecret,
            'code': code,
          },
        );

        final accessToken = json.decode(response.body)['access_token'];
        final credential = GithubAuthProvider.credential(accessToken);
        final userCredential = await _auth.signInWithCredential(credential);

        if (userCredential.user != null) {
          // User is logged in with GitHub.
          await registerUserOnFirebase(userCredential.user!);
          saveLoginStatus(true);
          Navigator.pop(context, userCredential.user);
        } else {
          // Handle login error.
          Navigator.pop(context, null);
        }
        flutterWebviewPlugin.close();
      }
    });
    return null;
  }

  Future<void> registerUserOnFirebase(User user) async {
    // You can register the user on Firebase here.
    // For example, you can use Firebase Realtime Database or Firestore.
  }

  Future<void> saveLoginStatus(bool isLoggedIn) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setBool('loggedIn', isLoggedIn);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('GitHub Login'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            ElevatedButton(
              onPressed: () async {
                final user = await signInWithGitHub(context);
                if (user != null) {
                  Navigator.pushReplacement(
                    context,
                    MaterialPageRoute(
                      builder: (context) => ProfilePage(user),
                    ),
                  );
                } else {
                  // Handle login error.
                }
              },
              child: Text('GitHub Login'),
            ),
          ],
        ),
      ),
    );
  }
}

class ProfilePage extends StatelessWidget {
  final User user;

  ProfilePage(this.user);

  final FirebaseAuth _auth = FirebaseAuth.instance;

  Future<void> _logOut(BuildContext context) async {
    await _auth.signOut();
    await clearLoginStatus();
    Navigator.of(context).pushReplacement(MaterialPageRoute(
      builder: (context) => LoginScreen(),
    ));
  }

  Future<void> clearLoginStatus() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('loggedIn');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('User Profile'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text('Welcome, ${user.displayName}'),
            ElevatedButton(
              onPressed: () {
                _logOut(context);
              },
              child: Text('Log Out'),
            ),
          ],
        ),
      ),
    );
  }
}
