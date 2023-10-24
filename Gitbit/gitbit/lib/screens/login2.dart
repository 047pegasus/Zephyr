import 'package:flutter/material.dart';
import 'package:gitbit/screens/signin.dart';
import 'package:google_fonts/google_fonts.dart';


class SignInPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: MyColors.darkGrey,
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text(
              'WELCOME TO GITBIT',
              style: GoogleFonts.montserrat(
                fontSize: 24,
                color: Colors.white,
                fontWeight: FontWeight.bold,
              ),
            ),
            Container(
              height: 200,
              child: AutoSlider(),
            ),
            SizedBox(height: 20.0),
            ElevatedButton(
              onPressed: () {
                Navigator.pushReplacement(context, MaterialPageRoute(builder: (_) =>ButtonPage()));
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
}

class AutoSlider extends StatefulWidget {
  @override
  _AutoSliderState createState() => _AutoSliderState();
}

class _AutoSliderState extends State<AutoSlider> {
  PageController _controller = PageController();
  int _currentPage = 0;

  List<Widget> slides = [
    SlideItem(
      icon: Icons.code,
      text: 'Code it ',
    ),
    SlideItem(
      icon: Icons.work,
      text: 'Work it',
    ),
    SlideItem(
      icon: Icons.leaderboard,
      text: 'leaderboard',
    ),
  ];

  @override
  void initState() {
    super.initState();
    _autoSlide();
  }

  Future<void> _autoSlide() async {
    await Future.delayed(const Duration(seconds: 5));
    if (_currentPage < slides.length - 1) {
      _currentPage++;
    } else {
      _currentPage = 0;
    }
    _controller.animateToPage(
      _currentPage,
      duration: Duration(milliseconds: 200),
      curve: Curves.easeInOut,
    );
    _autoSlide();
  }

  @override
  Widget build(BuildContext context) {
    return PageView.builder(
      controller: _controller,
      itemCount: slides.length,
      itemBuilder: (context, index) {
        return slides[index];
      },
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }
}

class SlideItem extends StatelessWidget {
  final IconData icon;
  final String text;

  SlideItem({required this.icon, required this.text});

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: <Widget>[
        Icon(
          icon,
          size: 60,
          color: Colors.white,
        ),
        SizedBox(height: 20.0),
        Text(
          text,
          style: TextStyle(
            color: Colors.white,
            fontSize: 18,
          ),
        ),
      ],
    );
  }
}

class MyColors {
  static const Color darkGrey = Color(0xFF0F0F0F);
  static const Color navyBlue = Color(0xFF232D3F);
  static const Color tealGreen = Color(0xFF005B41);
  static const Color darkCyan = Color(0xFF008170);
}
