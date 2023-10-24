import 'package:flutter/material.dart';

class Leaderboard extends StatefulWidget {
  const Leaderboard({super.key});

  @override
  State<Leaderboard> createState() => _LeaderboardState();
}

class _LeaderboardState extends State<Leaderboard> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
    backgroundColor:Colors.black,
      body: Container(
        alignment: Alignment.center,
        child: const Text("leaderboard",style: TextStyle(color: Colors.white)),)
    );
  }
}
