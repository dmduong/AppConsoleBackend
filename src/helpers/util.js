class Utils {
  timeToString(dateTime) {
    var date = new Date(Number(dateTime));
    return (
      date.getDate() +
      "/" +
      (date.getMonth() + 1) +
      "/" +
      date.getFullYear() +
      " " +
      date.getHours() +
      ":" +
      date.getMinutes() +
      ":" +
      date.getSeconds()
    );
  }
}

module.exports = new Utils();
