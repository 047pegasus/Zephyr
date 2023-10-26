import 'package:flutter/material.dart';

void main() {
  runApp(MaterialApp(
    home: EmailPasswordSignInPage(),
  ));
}

class EmailPasswordSignInPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: MyColors.darkGrey,
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: EmailPasswordSignInForm(),
        ),
      ),
    );
  }
}

class EmailPasswordSignInForm extends StatefulWidget {
  @override
  _EmailPasswordSignInFormState createState() => _EmailPasswordSignInFormState();
}

class _EmailPasswordSignInFormState extends State<EmailPasswordSignInForm> {
  final TextEditingController emailController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();

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
                "Email & Password Sign In",
                style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
              ),
              SizedBox(height: 20),
              buildTextField(emailController, 'Email', Icons.email),
              buildTextField(passwordController, 'Password', Icons.lock),
              SizedBox(height: 20),
              ElevatedButton(
                onPressed: () {
                  // Handle sign-in logic here
                  // You can add authentication logic to check the email and password
                  // If successful, you can navigate to the HomeScreen.
                  Navigator.pushReplacement(context, MaterialPageRoute(builder: (_) => HomeScreen()));
                },
                style: ButtonStyle(
                  backgroundColor: MaterialStateProperty.all(MyColors.navyBlue),
                ),
                child: Text('Sign In', style: TextStyle(color: Colors.white)),
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
}

class HomeScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Home Screen'),
      ),
      body: Center(
        child: Text('Welcome to the Home Screen'),
      ),
    );
  }
}

class MyColors {
  static const Color darkGrey = Color(0xFF0F0F0F);
  static const Color navyBlue = Color(0xFF232D3F);
  static const Color tealGreen = Color(0xFF005B41);
}
