import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'package:http/http.dart' as http;
import 'package:barcode_scan/barcode_scan.dart';
import 'package:flutter/services.dart';
import 'package:mspr/success.dart';
import 'util.dart';

class Error extends StatefulWidget {
  final data;
  Error({Key key, this.data}) : super(key: key);

  ErrorPage createState() => ErrorPage();
}

class ErrorPage extends State<Error> {
String barcode = "";

@override
    Widget build(BuildContext context) {
      return Scaffold(
        appBar: AppBar(
          title: Text("Go-Style"),
          backgroundColor: CustomColors.HeaderBlueDark,
        ),
        body: Column(
          children: <Widget>[
            Container(
              margin: EdgeInsets.only(top: 60.0),
              child: Center(
                child: Image(
                  image: AssetImage('assets/images/error.png'),
                  width: MediaQuery.of(context).size.width / 1.7,
                )
              ),
            ),
            Container(
              margin: EdgeInsets.only(top: 20.0),
              child: Text(
                'Code Invalide',
                style: TextStyle(
                  fontSize: 40,
                  fontWeight: FontWeight.w500,
                  color: CustomColors.TrashRed),
              )
            ),
            Container(
              margin: EdgeInsets.only(top: 40.0),
              child: Column(
                children: <Widget>[
                  Center(
                    child: Text(
                      "Le scan n'est pas valide ou",
                      style: TextStyle(
                        fontSize: 20,
                        fontWeight: FontWeight.w500,
                        color: CustomColors.TrashRed),
                    )
                  ),
                  Center(
                    child: Text(
                      "ne correspond à aucune réduction",
                      style: TextStyle(
                        fontSize: 20,
                        fontWeight: FontWeight.w500,
                        color: CustomColors.TrashRed),
                    )
                  )
                ],
              ) 
            ),
            Container(
              margin: EdgeInsets.only(top: 80.0),
              child: RaisedButton(
                onPressed: () {
                  scan();
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
                        CustomColors.BlueLight,
                        CustomColors.BlueDark,
                      ],
                    ),
                    borderRadius: BorderRadius.all(
                      Radius.circular(8.0),
                    ),
                    boxShadow: [
                      BoxShadow(
                        color: CustomColors.BlueShadow,
                        blurRadius: 10.0,
                        spreadRadius: 1.5,
                        offset: Offset(0.0, 0.0),
                      ),
                    ],
                  ),
                  padding: const EdgeInsets.fromLTRB(20, 10, 20, 10),
                  child: Center(
                    child: const Text(
                      'Scan QR Code',
                      style: TextStyle(
                          fontSize: 18, fontWeight: FontWeight.w500),
                    ),
                  ),
                ),
              ),
            )
          ],
        )
      );
    }

      
    Future scan() async {
    try {
      String barcode;
      await BarcodeScanner.scan().then((onValue) {
        setState(() {
          barcode = onValue.toString();
        });
      checkCoupon(barcode);
      }).catchError((onError) {
        print(onError);
      });
      setState(() => this.barcode = barcode);
    } on PlatformException catch (e) {
      if (e.code == BarcodeScanner.CameraAccessDenied) {
        setState(() {
          this.barcode = 'camera permission not granted!';
        });
      } else {
        setState(() => this.barcode = 'Unknown error: $e');
      }
    } on FormatException {
      setState(() => this.barcode = '(User returned)');
    } catch (e) {
      setState(() => this.barcode = 'Unknown error: $e');
    }
  }

  void checkCoupon(code) async {
    var url = "https://gostyle.arthurdufour.com/coupons/" + code;
    var response = await http.get(url);

    if (response.statusCode == 200) {
      Navigator.push(
        context,
        MaterialPageRoute(builder: (context) => Success(data: response.body)),
      );
    } else {
      Navigator.push(
        context,
        MaterialPageRoute(builder: (context) => Error(data: response.body)),
      );
    }
  }
}


