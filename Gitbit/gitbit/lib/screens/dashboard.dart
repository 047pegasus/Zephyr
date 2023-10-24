import 'package:flutter/material.dart';
import 'package:gitbit/main.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class Dashboard extends StatelessWidget {
  final String username;

  const Dashboard(this.username, {Key? key}) : super(key: key);

  Future<Map<String, dynamic>> fetchUserData() async {
    final response =
        await http.get(Uri.parse('https://api.github.com/users/$username'));

    if (response.statusCode == 200) {
      return json.decode(response.body);
    } else {
      throw Exception('Failed to load user data');
    }
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
      future: fetchUserData(),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const Center(child: CircularProgressIndicator());
        } else if (snapshot.hasError) {
          return Center(child: Text('Error: ${snapshot.error}'));
        } else {
          Map<String, dynamic> userData = snapshot.data as Map<String, dynamic>;

          return Scaffold(
            backgroundColor: MyColors.darkGrey,
            appBar: AppBar(
              title: const Text("GitHub Profile"),
              backgroundColor: MyColors.navyBlue,
            ),
            body: SingleChildScrollView(
              child: Center(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    Padding(
                      padding: const EdgeInsets.all(20),
                      child: CircleAvatar(
                        backgroundImage: NetworkImage(userData['avatar_url']),
                        radius: 60,
                      ),
                    ),
                    const SizedBox(height: 20),
                    buildInfoTile(
                        "Name", userData['name'] ?? 'N/A', Icons.person),
                    buildInfoTile("Location", userData['location'] ?? 'N/A',
                        Icons.location_on),
                    buildInfoTile("Bio", userData['bio'] ?? 'N/A', Icons.info),
                    buildInfoTile("Followers", "${userData['followers'] ?? 0}",
                        Icons.people),
                    buildInfoTile("Following", "${userData['following'] ?? 0}",
                        Icons.people),
                    buildInfoTile("Public Repositories",
                        "${userData['public_repos'] ?? 0}", Icons.folder),
                    buildInfoTile("Public Gists",
                        "${userData['public_gists'] ?? 0}", Icons.code),
                    buildInfoTile(
                        "Website", userData['blog'] ?? 'N/A', Icons.web),
                  ],
                ),
              ),
            ),
            floatingActionButton: Align(
              alignment: Alignment.topRight,
              child: Padding(
                padding: const EdgeInsets.all(34.0),
                child: ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: MyColors.tealGreen,
                    shape: const StadiumBorder(),
                    padding: const EdgeInsets.symmetric(horizontal: 20),
                  ),
                  onPressed: () {
                    Navigator.pushReplacement(
                        context, MaterialPageRoute(builder: (_) => const MyApp()));
                  },
                  child: const Text(
                    "Login",
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                      fontFamily: 'Pacifico',
                    ),
                  ),
                ),
              ),
            ),
          );
        }
      },
    );
  }

  Widget buildInfoTile(String title, String value, IconData icon) {
    return Container(
      width: double.infinity,
      margin: const EdgeInsets.all(10),
      padding: const EdgeInsets.all(10),
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          colors: [MyColors.navyBlue, MyColors.tealGreen],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(10),
      ),
      child: ListTile(
        leading: Icon(
          icon,
          color: Colors.white,
        ),
        title: Text(
          title,
          style: const TextStyle(
            fontWeight: FontWeight.bold,
            color: Colors.white,
          ),
        ),
        subtitle: Text(
          value,
          style: const TextStyle(
            color: Colors.white,
          ),
        ),
      ),
    );
  }
}

class MyColors {
  static const Color darkGrey = Color(0xFF0F0F0F);
  static const Color navyBlue = Color(0xFF232D3F);
  static const Color tealGreen = Color(0xFF005B41);
}

