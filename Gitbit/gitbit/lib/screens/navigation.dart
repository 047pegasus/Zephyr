import 'package:curved_navigation_bar/curved_navigation_bar.dart';
import 'package:flutter/material.dart';

import 'package:gitbit/screens/dashboard.dart';
import 'package:gitbit/screens/leaderboard.dart';
import 'package:gitbit/screens/tools.dart';

class Homescreen extends StatefulWidget {
  final String username;

  const Homescreen(this.username, {Key? key}) : super(key: key);

  @override
  // ignore: library_private_types_in_public_api
  _HomescreenState createState() => _HomescreenState();
}

class _HomescreenState extends State<Homescreen> {
  int _selectedIndex = 0;

  late List<Widget> _pages;

  @override
  void initState() {
    super.initState();

    _pages = [
      Dashboard(widget.username),
      const Leaderboard(),
       // Use the passed username
      const Tools(),
    ];
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      bottomNavigationBar: CurvedNavigationBar(
        height: 60,
        backgroundColor: MyColors.navyBlue,
        items: const <Widget>[
          Icon(Icons.home, size: 30),
          Icon(Icons.leaderboard, size: 30),
          Icon(Icons.person, size: 30),
        ],
        onTap: (index) {
          setState(() {
            _selectedIndex = index;
          });
        },
      ),
      body: _pages[_selectedIndex],
    );
  }
}
class MyColors {
  static const Color darkGrey = Color(0xFF0F0F0F);
  static const Color navyBlue = Color(0xFF232D3F);
  static const Color tealGreen = Color(0xFF005B41);
  static const Color darkCyan = Color(0xFF008170);
}
