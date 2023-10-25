import 'package:flutter/material.dart';

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
    return Container(
      padding: EdgeInsets.all(16.0),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          UserDetailsTextField(usernameController, 'Username', Icons.person),
          UserDetailsTextField(githubUsernameController, 'GitHub Username', Icons.code),
          UserDetailsTextField(emailController, 'Email ID', Icons.email),
          UserDetailsTextField(passwordController, 'Password', Icons.lock, isPassword: true),
          UserDetailsTextField(ageController, 'Age', Icons.cake),
          UserDetailsTextField(bioController, 'Bio', Icons.info, maxLines: 3),
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
          InterestCheckboxListTile('Technology', interests, toggleInterest),
          InterestCheckboxListTile('Sports', interests, toggleInterest),
          InterestCheckboxListTile('Art', interests, toggleInterest),
          UserDetailsTextField(usernameController, 'Additional Field 1', Icons.person),
          UserDetailsTextField(usernameController, 'Additional Field 2', Icons.person),
          UserDetailsTextField(usernameController, 'Additional Field 3', Icons.person),
          SizedBox(height: 16.0),
          ElevatedButton(
            onPressed: () {
              // Handle form submission, including interests
              print('Interests: $interests');
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
  final int maxLines;

  UserDetailsTextField(this.controller, this.hintText, this.icon,
      {this.isPassword = false, this.maxLines = 1});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.only(bottom: 16.0),
      child: TextFormField(
        controller: controller,
        obscureText: isPassword,
        maxLines: maxLines,
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

class InterestCheckboxListTile extends StatelessWidget {
  final String title;
  final List<String> selectedInterests;
  final Function(String) onInterestToggled;

  InterestCheckboxListTile(this.title, this.selectedInterests, this.onInterestToggled);

  @override
  Widget build(BuildContext context) {
    return CheckboxListTile(
      title: Text(title, style: TextStyle(color: Colors.white)),
      value: selectedInterests.contains(title),
      onChanged: (value) {
        onInterestToggled(title);
      },
    );
  }
}
