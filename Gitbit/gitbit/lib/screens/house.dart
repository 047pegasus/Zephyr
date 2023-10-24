import 'package:flutter/material.dart';

class Home extends StatefulWidget {
  const Home({super.key});

  @override
  State<Home> createState() => _HomeState();
}

class _HomeState extends State<Home> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
     backgroundColor:Colors.black,
      body: Container(
        alignment: Alignment.center,
        child: const Text("leaderboard1",style: TextStyle(color: Colors.white)),)
    );
  }
  
}