import 'package:flutter/material.dart';
import 'package:gitbit/screens/navigation.dart';
import 'package:google_fonts/google_fonts.dart';

class MyColors {
  static const Color darkGrey = Color(0xFF0F0F0F);
  static const Color navyBlue = Color(0xFF232D3F);
  static const Color tealGreen = Color(0xFF005B41);
  static const Color darkCyan = Color(0xFF008170);
}


class MyUserDetailsPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: MyColors.darkGrey,
      body: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text(
            "USER DETAILS",
            style: GoogleFonts.montserrat(fontSize: 28, color: Colors.white),
          ),
          SizedBox(height: 20),
          UserDetailsForm(),
        ],
      ),
    );
  }
}

class UserDetailsForm extends StatefulWidget {
  @override
  _UserDetailsFormState createState() => _UserDetailsFormState();
}

class _UserDetailsFormState extends State<UserDetailsForm> {
  final TextEditingController usernameController = TextEditingController();
  final TextEditingController githubUsernameController =
      TextEditingController();
  final TextEditingController emailController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.all(16.0),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          UserDetailsTextField(usernameController, 'Username', Icons.person),
          UserDetailsTextField(
              githubUsernameController, 'GitHub Username', Icons.code),
          UserDetailsTextField(emailController, 'Email ID', Icons.email),
          UserDetailsTextField(passwordController, 'Password', Icons.lock,
              isPassword: true),
          SizedBox(height: 16.0),
          ElevatedButton(
            onPressed: () {
              Navigator.pushReplacement(
                  context, MaterialPageRoute(builder: (_) => Homescreen()));
            },
            style: ButtonStyle(
              backgroundColor: MaterialStateProperty.all(MyColors.navyBlue),
            ),
            child: Text('Save', style: TextStyle(color: Colors.white)),
          ),
        ],
      ),
    );
  }
}

class UserDetailsTextField extends StatelessWidget {
  final TextEditingController controller;
  final String hintText;
  final IconData icon;
  final bool isPassword;

  UserDetailsTextField(this.controller, this.hintText, this.icon,
      {this.isPassword = false});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.only(bottom: 16.0),
      child: TextFormField(
        controller: controller,
        obscureText: isPassword,
        style: TextStyle(color: Colors.white),
        decoration: InputDecoration(
          hintText: hintText,
          hintStyle: TextStyle(color: MyColors.darkCyan),
          focusedBorder: OutlineInputBorder(
            borderSide: BorderSide(color: Colors.white),
            borderRadius: BorderRadius.circular(8.0),
          ),
          enabledBorder: OutlineInputBorder(
            borderSide: BorderSide(color: MyColors.navyBlue),
            borderRadius: BorderRadius.circular(8.0),
          ),
          prefixIcon: Icon(
            icon,
            color: MyColors.tealGreen,
          ),
        ),
      ),
    );
  }
}
