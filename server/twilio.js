twilio = Twilio("AC881f9d69d52c78cb668da673ca434ed9" ,"47cc71df786246229daf8c79d517c600");

sendSMS = function(notificationObj) {
  var meal = "dinner";
  var item = "braised pork";
  var college = "Scripps"
  twilio.sendSms({
    to: '+14155154630',
    // to:'+19145890035', // Any number Twilio can deliver to
    from: '+14156695849',
    body: college + ' has ' + item + ' for ' + meal + ' tonight!' // body of the SMS message
  }, function(err, responseData) { //this function is executed when a response is received from Twilio
    if (err) console.log(err);
    if (!err) {
      console.log(responseData.from); // outputs "a string of the person it's sent from"
      console.log(responseData.body); // outputs "body."
    }
  });
}
