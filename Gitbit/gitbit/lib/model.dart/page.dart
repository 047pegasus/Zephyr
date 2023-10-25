import 'package:flutter/material.dart';
import 'package:lottie/lottie.dart'; // Import the lottie package

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
            style: TextStyle(fontSize: 28, color: Colors.white),
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
  final TextEditingController githubUsernameController = TextEditingController();
  final TextEditingController emailController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();
  final TextEditingController ageController = TextEditingController();
  final TextEditingController bioController = TextEditingController();
  bool receiveNotifications = false;
  List<String> interests = [];

  void toggleInterest(String interest) {
    setState(() {
      if (interests.contains(interest)) {
        interests.remove(interest);
      } else {
        interests.add(interest);
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView( // Wrap the form in a SingleChildScrollView
      child: Container(
        padding: EdgeInsets.all(16.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            ElevatedTextField(usernameController, 'Username', Icons.person),
            ElevatedTextField(githubUsernameController, 'GitHub Username', Icons.code),
            ElevatedTextField(emailController, 'Email ID', Icons.email),
            ElevatedTextField(passwordController, 'Password', Icons.lock, isPassword: true),
            ElevatedTextField(ageController, 'Age', Icons.cake),
            ElevatedTextField(bioController, 'Bio', Icons.info, maxLines: 3),
            Row(
              children: [
                Text('Receive Notifications', style: TextStyle(color: Colors.white)),
                Switch(
                  value: receiveNotifications,
                  onChanged: (value) {
                    setState(() {
                      receiveNotifications = value;
                    });
                  },
                  activeColor: MyColors.tealGreen,
                ),
              ],
            ),
            SizedBox(height: 16.0),
            Text('Select Your Interests:', style: TextStyle(color: Colors.white, fontSize: 16)),
            InterestChips(interests, toggleInterest),
            ElevatedTextField(usernameController, 'Additional Field 1', Icons.person),
            ElevatedTextField(usernameController, 'Additional Field 2', Icons.person),
            ElevatedTextField(usernameController, 'Additional Field 3', Icons.person),
            SizedBox(height: 16.0),
            LottieButton(), // Add the LottieButton
          ],
        ),
      ),
    );
  }
}

class ElevatedTextField extends StatelessWidget {
  final TextEditingController controller;
  final String hintText;
  final IconData icon;
  final bool isPassword;
  final int maxLines;

  ElevatedTextField(this.controller, this.hintText, this.icon,
      {this.isPassword = false, this.maxLines = 1});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.only(bottom: 16.0),
      child: TextField(
        controller: controller,
        obscureText: isPassword,
        maxLines: maxLines,
        style: TextStyle(color: Colors.white),
        decoration: InputDecoration(
          hintText: hintText,
          hintStyle: TextStyle(color: MyColors.darkCyan),
          filled: true,
          fillColor: MyColors.navyBlue.withOpacity(0.5),
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(8.0),
            borderSide: BorderSide.none,
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

class InterestChips extends StatelessWidget {
  final List<String> interests;
  final Function(String) onInterestToggled;

  InterestChips(this.interests, this.onInterestToggled);

  @override
  Widget build(BuildContext context) {
    return Wrap(
      spacing: 8.0,
      children: interests.map((interest) {
        return InputChip(
          label: Text(interest),
          onSelected: (isSelected) {
            onInterestToggled(interest);
          },
          selected: interests.contains(interest),
          backgroundColor: MyColors.tealGreen,
          selectedColor: MyColors.navyBlue,
          labelStyle: TextStyle(color: Colors.white),
        );
      }).toList(),
    );
  }
}

class LottieButton extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: () {
        // Handle button click action and navigation
      },
      style: ButtonStyle(
        backgroundColor: MaterialStateProperty.all(MyColors.navyBlue),
      ),
      child: Lottie.asset(
        'assets/WkjuwJnoFw.json', // Replace with your Lottie animation file
        width: 100,
        height: 100,
      ),
    );
  }
}
