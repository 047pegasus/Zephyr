
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'package:gitbit/firebase_options.dart';
import 'package:gitbit/welcome.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      debugShowCheckedModeBanner: false,
      title:'Gitbit',
    home: Scaffold(
      backgroundColor: Color(0xff0F0F0F),
      body: Welcome(),
    ),);
  }
}
