
sendEmail = function(arrayOfAllUserNotifications) {
  // check([to, from, subject, text], [String]);
  // (to, from, subject, text)
  arrayOfAllUserNotifications.forEach(function(userArray) {
    var to = "samcorcos@gmail.com"; // Going to have to add user email to notification object as well
    var from = "notifications@ccmenu.com";
    var date = ""
    var subject = "Dining Hall Notifications for " + date;
    var body = "";
    var text = "<ul>" + body + "</ul>";
    userArray.forEach(function(userNotificationObj) {
      date = userNotificationObj.date;
      console.log(userNotificationObj);
      body += "<li>" + userNotificationObj.college + " has " + userNotificationObj.itemName + " for " + userNotificationObj.meal + " today!</li>";
    })
    Email.send({
      to: to,
      from: from,
      subject: subject,
      text: text
    });
  })

  console.log("Emails sent...");

  // Let other method calls from the same client start running,
  // without waiting for the email sending to complete.

}
