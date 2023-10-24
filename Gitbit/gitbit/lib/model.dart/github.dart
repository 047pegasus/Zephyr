
import 'dart:convert';

import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter_webview_plugin/flutter_webview_plugin.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();
  runApp(const Mypp());
}

class Mypp extends StatelessWidget {
  const Mypp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      home: LoginScreen(),
    );
  }
}

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  // ignore: library_private_types_in_public_api
  _LoginScreenState createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final FirebaseAuth _auth = FirebaseAuth.instance;
  final flutterWebviewPlugin = FlutterWebviewPlugin();
  final String clientId = 'f45fb04da2a051747526';
  final String clientSecret = '6fb82d9fff9d1b610ce0a68b0dd4fe5211e95ec0';
  final String redirectUrl = 'http://localhost:8080';

  Future<User?> signInWithGitHub(BuildContext context) async {
    final authUrl =
        'https://github.com/login/oauth/authorize?client_id=$clientId&redirect_uri=$redirectUrl&scope=user';

    flutterWebviewPlugin.launch(
      authUrl,
    
      clearCookies: true,
    );

    flutterWebviewPlugin.onUrlChanged.listen((url) async {
      if (url.startsWith(redirectUrl)) {
        final code = Uri.parse(url).queryParameters['code'];
        const tokenUrl = 'https://github.com/login/oauth/access_token';
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
          // ignore: use_build_context_synchronously
          Navigator.pop(context, userCredential.user);
        } else {
          // Handle login error.
          // ignore: use_build_context_synchronously
          Navigator.pop(context, null);
        }
        flutterWebviewPlugin.close();
      }
    });
    return null;
  }
Future<void> registerUserOnFirebase(User user) async {
  final userCollection = FirebaseFirestore.instance.collection('users');

  // Check if the user already exists in the Firestore database.
  final userDoc = await userCollection.doc(user.uid).get();

  if (!userDoc.exists) {
    // If the user does not exist, create a new user document in Firestore.
    await userCollection.doc(user.uid).set({
      'uid': user.uid,
      'displayName': user.displayName,
      'email': user.email,
      // Add other user data you want to store.
    });
  }
}

  Future<void> saveLoginStatus(bool isLoggedIn) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setBool('loggedIn', isLoggedIn);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('GitHub Login'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            ElevatedButton(
              onPressed: () async {
                final user = await signInWithGitHub(context);
                if (user != null) {
                  // ignore: use_build_context_synchronously
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
              child: const Text('GitHub Login'),
            ),
          ],
        ),
      ),
    );
  }
}

class ProfilePage extends StatelessWidget {
  final User user;

  ProfilePage(this.user, {super.key});

  final FirebaseAuth _auth = FirebaseAuth.instance;

  Future<void> _logOut(BuildContext context) async {
    await _auth.signOut();
    await clearLoginStatus();
    // ignore: use_build_context_synchronously
    Navigator.of(context).pushReplacement(MaterialPageRoute(
      builder: (context) => const LoginScreen(),
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
        title: const Text('User Profile'),
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
              child: const Text('Log Out'),
            ),
          ],
        ),
      ),
    );
  }
}
