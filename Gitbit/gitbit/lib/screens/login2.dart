import 'package:flutter/material.dart';
import 'package:carousel_slider/carousel_slider.dart';
import 'package:gitbit/screens/signin.dart';
import 'package:lottie/lottie.dart';

void main() {
  runApp(MaterialApp(
    home: SignInPage(),
  ));
}

class SignInPage extends StatefulWidget {
  @override
  _SignInPageState createState() => _SignInPageState();
}

class _SignInPageState extends State<SignInPage> {
  final List<String> welcomeTexts = [
    'Welcome to GitBit',
    'Leaderboard',
    'Use Our Tools',
  ];

  int _currentSlideIndex = 0; // Track the current slide index

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: MyColors.darkGrey,
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text(
              welcomeTexts[
                  _currentSlideIndex], // Use the current slide index to get the welcome text
              style: TextStyle(
                fontSize: 20,
                color: Colors.white,
                fontWeight: FontWeight.bold,
              ),
            ),
            SizedBox(
              height: 200,
              child: CarouselSlider(
                items: [
                  _buildSlide('assets/xwirnzarW3.json', 'Text 1'),
                  _buildSlide('assets/ULflzJpeCU.json', 'Text 2'),
                  _buildSlide('assets/kpEG3IE5gY.json', 'Text 3'),
                ],
                options: CarouselOptions(
                  height: 200,
                  enlargeCenterPage: true,
                  onPageChanged: (index, reason) {
                    setState(() {
                      _currentSlideIndex = index;
                    });
                  },
                ),
              ),
            ),
            SizedBox(height: 20.0),
            ElevatedButton(
              onPressed: () {
                Navigator.push(
                    context, MaterialPageRoute(builder: (_) => ButtonPage()));
              },
              child: Text(
                'Sign In',
                style: TextStyle(
                  fontSize: 18,
                  color: Colors.white,
                ),
              ),
              style: ButtonStyle(
                backgroundColor: MaterialStateProperty.all(MyColors.tealGreen),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildSlide(String animationAsset, String text) {
    return Lottie.asset(animationAsset);
  }
}

class MyColors {
  static const Color darkGrey = Color(0xFF0F0F0F);
  static const Color navyBlue = Color(0xFF232D3F);
  static const Color tealGreen = Color(0xFF005B41);
  static const Color darkCyan = Color(0xFF008170);
}
