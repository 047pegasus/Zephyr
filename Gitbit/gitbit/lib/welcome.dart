
import 'package:flutter/material.dart';
import 'package:gitbit/screens/login.dart';
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
           
            Shimmer.fromColors(
              baseColor:Colors.white, // Change the base color as needed
              highlightColor:
               MyColors.tealGreen, // Change the highlight color as needed
              child: Text(
                "GITBIT>>",style:GoogleFonts.montserrat(fontSize:35,fontWeight:FontWeight.bold)
              ),
            ),
          ],
        ),
      
    );
  }
}
