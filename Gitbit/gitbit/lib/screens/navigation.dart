import 'package:curved_navigation_bar/curved_navigation_bar.dart';
import 'package:flutter/material.dart';
import 'package:gitbit/screens/colors.dart';



import 'package:gitbit/screens/leaderboard.dart';
import 'package:gitbit/screens/tools.dart';

class Homescreen extends StatefulWidget {
  const Homescreen({Key? key});

  @override
  _HomescreenState createState() => _HomescreenState();
}

class _HomescreenState extends State<Homescreen> {
  int _selectedIndex = 0;
  
  final List<Widget> _pages = [

    Leaderboard(),
    Tools(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      bottomNavigationBar: CurvedNavigationBar(
        height: 60,
        backgroundColor:MyColors.tealGreen, // Set the background color here
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
