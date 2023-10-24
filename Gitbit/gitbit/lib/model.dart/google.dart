import 'package:http/http.dart' as http;
import 'dart:convert';

Future<void> sendUserDataToServer(Map<String, dynamic> userData) async {
  final response = await http.post(
    Uri.parse('http://your_server/login'),
    headers: <String, String>{
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: jsonEncode({'userData': userData}),
  );

  if (response.statusCode == 200) {
    // Handle success
  } else {
    // Handle errors
  }
}
