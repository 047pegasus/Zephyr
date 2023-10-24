import 'package:flutter/material.dart';
import 'package:gitbit/screens/login2.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:shimmer/shimmer.dart';

class Welcome extends StatefulWidget {
  const Welcome({super.key});

  @override
  State<Welcome> createState() => _WelcomeState();
}

class _WelcomeState extends State<Welcome> {
  @override
  void initState() {
    super.initState();
    Future.delayed(const Duration(seconds: 3), () {
      {
        Navigator.of(context).pushReplacement(
          MaterialPageRoute(builder: (context) => SignInPage()),
        );
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          CircleAvatar(
            radius: 55,
            backgroundImage: AssetImage("assets/gitbit.jpeg"),
          ),
          SizedBox(height: 20), // Space between image and text
          Shimmer.fromColors(
            baseColor: Colors.white, // Change the base color as needed
            highlightColor: MyColors.tealGreen, // Change the highlight color as needed
            child: Text("GITBIT",
                style: GoogleFonts.montserrat(
                    fontSize: 35, fontWeight: FontWeight.bold)),
          ),
        ],
      ),
    );
  }
}

class MyColors {
  static const Color darkGrey = Color(0xFF0F0F0F);
  static const Color navyBlue = Color(0xFF232D3F);
  static const Color tealGreen = Color(0xFF005B41);
  static const Color darkCyan = Color(0xFF008170);
}
