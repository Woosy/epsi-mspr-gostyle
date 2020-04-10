import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'dart:convert';

import 'util.dart';

class Success extends StatefulWidget {
  final data;
  Success({Key key, this.data}) : super(key: key);

  SuccessPage createState() => SuccessPage();
}

class SuccessPage extends State<Success> {
  String textReduc;
  String reduction;
  String textValid;

  @override
  initState() {
    Map<String, dynamic> dataJSON = jsonDecode(widget.data);

    textReduc = "- " + dataJSON['discount'].toString() + " ";
    reduction = dataJSON['discount'].toString();
    textValid = "Le code " + dataJSON['coupon'].toString().toUpperCase() + " est valide et correspond à une réduction de -" + reduction + "% sur les produits de la marque";
  }

@override
    Widget build(BuildContext context) {
      return Scaffold(
        appBar: AppBar(
          title: Text("Go-Style"),
          backgroundColor: CustomColors.HeaderBlueDark,
        ),
        body: Column(
          children: <Widget>[
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: <Widget>[
                Container(
                  margin: EdgeInsets.only(top: 50.0),
                  child: Text(
                    textReduc,
                    style: TextStyle(
                      fontSize: 90,
                      fontWeight: FontWeight.w500,
                      color: CustomColors.GreenLight),
                  )
                ),
                Container(
                  margin: EdgeInsets.only(top: 70.0),
                  child: Image(
                    image: AssetImage('assets/images/shopping.png'),
                    width: 80.0,
                  ),
                )
              ],
            ),
            Container(
              width: MediaQuery.of(context).size.width / 1.2,
              margin: EdgeInsets.only(top: 40.0),
              child: Text(
                textValid,
                textAlign: TextAlign.center,
                style: TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.w500),
              )
            ),
            Container(
              margin: EdgeInsets.only(top: 80.0),
              child: RaisedButton(
                onPressed: () {
                  showDialog(
                    context: context,
                    builder: (context) {
                      return AlertDialog(
                        content: Text("Le site n'est pas disponible actuellement"),
                      );
                    },
                  );
                },
                textColor: Colors.white,
                padding: const EdgeInsets.all(0.0),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(8.0),
                ),
                child: Container(
                  width: MediaQuery.of(context).size.width / 1.2,
                  height: 60,
                  decoration: const BoxDecoration(
                    gradient: LinearGradient(
                      colors: <Color>[
                        CustomColors.GreenLight,
                        CustomColors.GreenDark,
                      ],
                    ),
                    borderRadius: BorderRadius.all(
                      Radius.circular(8.0),
                    ),
                    boxShadow: [
                      BoxShadow(
                        color: CustomColors.GreenShadow,
                        blurRadius: 10.0,
                        spreadRadius: 1.5,
                        offset: Offset(0.0, 0.0),
                      ),
                    ],
                  ),
                  padding: const EdgeInsets.fromLTRB(20, 10, 20, 10),
                  child: Center(
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: <Widget>[
                        Icon(Icons.add_shopping_cart),
                        const Text(
                          'Aller sur le site',
                          style: TextStyle(
                              fontSize: 18, fontWeight: FontWeight.w500),
                        ),
                      ],
                    )
                  ),
                ),
              ),
            )
          ],
        )
      );
    }
}
