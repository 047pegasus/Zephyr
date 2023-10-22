import 'package:flutter/material.dart';

class Tools extends StatefulWidget {
  const Tools({super.key});

  @override
  State<Tools> createState() => _ToolsState();
}

class _ToolsState extends State<Tools> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor:Colors.black,
      body: Container(
        alignment: Alignment.center,
        child: const Text("Tools Page",style: TextStyle(color: Colors.white)),
      ),
    );
  }
}
