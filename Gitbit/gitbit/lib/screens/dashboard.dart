import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class Dashboard extends StatelessWidget {
  final String username;

  Dashboard(this.username);

  Future<Map<String, dynamic>> fetchUserData() async {
    final response = await http.get(Uri.parse('https://api.github.com/users/$username'));

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
          return Center(child: CircularProgressIndicator());
        } else if (snapshot.hasError) {
          return Center(child: Text('Error: ${snapshot.error}'));
        } else {
          Map<String, dynamic> userData = snapshot.data as Map<String, dynamic>;

          return Scaffold(
            body: Center(
              child: Column(
                children: [
                  CircleAvatar(
                    backgroundImage: NetworkImage(userData['avatar_url']),
                    radius: 50,
                  ),
                  SizedBox(height: 20),
                  Text(
                    "Name: ${userData['name'] ?? 'N/A'}",
                    style: TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                      color: MyColors.navyBlue, // Updated text color
                    ),
                  ),
                  Expanded(
                    child: GridView.builder(
                      gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                        crossAxisCount: 2,
                      ),
                      itemCount: 7, // Adjust the number of data fields as needed
                      itemBuilder: (context, index) {
                        String fieldTitle;
                        String fieldValue;

                        switch (index) {
                          case 0:
                            fieldTitle = 'Location';
                            fieldValue = userData['location'] ?? 'N/A';
                            break;
                          case 1:
                            fieldTitle = 'Bio';
                            fieldValue = userData['bio'] ?? 'N/A';
                            break;
                          case 2:
                            fieldTitle = 'Followers';
                            fieldValue = '${userData['followers'] ?? 0}';
                            break;
                          case 3:
                            fieldTitle = 'Following';
                            fieldValue = '${userData['following'] ?? 0}';
                            break;
                          case 4:
                            fieldTitle = 'Public Repositories';
                            fieldValue = '${userData['public_repos'] ?? 0}';
                            break;
                          case 5:
                            fieldTitle = 'Public Gists';
                            fieldValue = '${userData['public_gists'] ?? 0}';
                            break;
                          case 6:
                            fieldTitle = 'Website';
                            fieldValue = userData['blog'] ?? 'N/A';
                            break;
                          // Add more data fields here
                          default:
                            fieldTitle = '';
                            fieldValue = '';
                            break;
                        }

                        return Container(
                          margin: EdgeInsets.all(10),
                          padding: EdgeInsets.all(10),
                          decoration: BoxDecoration(
                            color: MyColors.tealGreen, // Updated container color
                            borderRadius: BorderRadius.circular(10),
                          ),
                          child: Column(
                            children: [
                              Text(
                                fieldTitle,
                                style: TextStyle(
                                  fontWeight: FontWeight.bold,
                                  color: Colors.white,
                                ),
                              ),
                              Text(
                                fieldValue,
                                style: TextStyle(
                                  color: Colors.white,
                                ),
                              ),
                            ],
                          ),
                        );
                      },
                    ),
                  ),
                ],
              ),
            ),
          );
        }
      },
    );
  }
}

class MyColors {
  static const Color darkGrey = Color(0xFF0F0F0F);
  static const Color navyBlue = Color(0xFF232D3F);
  static const Color tealGreen = Color(0xFF005B41);
  static const Color darkCyan = Color(0xFF008170);
}
