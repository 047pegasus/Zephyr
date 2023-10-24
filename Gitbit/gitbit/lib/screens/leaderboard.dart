import 'package:flutter/material.dart';
import 'package:gitbit/model.dart/page.dart';

class Leaderboard extends StatefulWidget {
  const Leaderboard({super.key});

  @override
  State<Leaderboard> createState() => _LeaderboardState();
}

class _LeaderboardState extends State<Leaderboard> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
    backgroundColor: MyColors.darkGrey,
      body: Container(
        alignment: Alignment.center,
        child: const Text("leaderboard",style: TextStyle(color: Colors.white)),)
    );
  }
}
