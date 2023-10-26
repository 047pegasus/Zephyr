import 'package:flutter/material.dart';
import 'package:gitbit/screens/navigation.dart';

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
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: MyUserDetailsForm(),
        ),
      ),
    );
  }
}

class MyUserDetailsForm extends StatefulWidget {
  @override
  _MyUserDetailsFormState createState() => _MyUserDetailsFormState();
}

class _MyUserDetailsFormState extends State<MyUserDetailsForm> {
  final TextEditingController nameController = TextEditingController();
  final TextEditingController emailController = TextEditingController();
  final TextEditingController githubIdController = TextEditingController();
  final TextEditingController interestsController = TextEditingController();
  final TextEditingController languagesController = TextEditingController();
  final TextEditingController ageController = TextEditingController();
  final TextEditingController linkedinController = TextEditingController();

  // List of available interest options
  final List<String> availableInterests = [
    'Technology',
    'Sports',
    'Art',
    'Music',
    'Cooking',
    'Travel',
    'Photography',
    'Gaming',
    'Fashion',
    'Books',
    'Fitness',
    'Movies',
    'Science',
    'Nature',
    'Food',
  ];

  // List of available programming languages
  final List<String> availableLanguages = [
    'JavaScript',
    'Python',
    'Java',
    'C++',
    'Swift',
    'Ruby',
    'Go',
    'Kotlin',
    'Dart',
    'PHP',
    'C#',
    'Rust',
  ];

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Card(
        elevation: 4.0,
                shape: RoundedRectangleBorder(

                  
          borderRadius: BorderRadius.circular(16.0),
        ),
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Text(
                "User Details",
                style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
              ),
              SizedBox(height: 20),
              buildTextField(nameController, 'Name', Icons.person),
              buildTextField(emailController, 'Email', Icons.email),
              buildTextField(githubIdController, 'GitHub ID', Icons.code),
              buildTextField(interestsController, 'Interests', Icons.star),
              buildInterestOptions(availableInterests, interestsController),
              buildTextField(languagesController, 'Languages', Icons.language),
              buildInterestOptions(availableLanguages, languagesController),
              buildTextField(ageController, 'Age', Icons.cake),
              buildTextField(linkedinController, 'LinkedIn', Icons.link),
              SizedBox(height: 20),
              ElevatedButton(
                onPressed: () {
                Navigator.pushReplacement(context, MaterialPageRoute(builder: (_)=>Homescreen()));
                },
                style: ButtonStyle(
                  backgroundColor: MaterialStateProperty.all(MyColors.navyBlue),
                ),
                child: Text('Save', style: TextStyle(color: Colors.white)),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget buildTextField(
      TextEditingController controller, String hintText, IconData icon) {
    return Container(
      margin: EdgeInsets.only(bottom: 16.0),
      child: TextField(
        controller: controller,
        style: TextStyle(color: Colors.black),
        decoration: InputDecoration(
          hintText: hintText,
          prefixIcon: Icon(icon, color: MyColors.tealGreen),
          filled: true,
          fillColor: Colors.white,
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(8.0),
            borderSide: BorderSide.none,
          ),
        ),
      ),
    );
  }

  Widget buildInterestOptions(List<String> options, TextEditingController controller) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16.0),
      child: Wrap(
        spacing: 8.0,
        children: options.map((option) {
          return GestureDetector(
            onTap: () {
              controller.text = option;
            },
            child: Chip(
              label: Text(option),
            ),
          );
        }).toList(),
      ),
    );
  }
}

void main() {
  runApp(MaterialApp(
    home: MyUserDetailsPage(),
  ));
}
