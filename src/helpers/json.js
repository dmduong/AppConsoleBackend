class JsonParser {
    arrayToJson (data = new Array()) {
        if (data.length == 0 || !data) {

        } else {
            let myJsonString = JSON.parse(JSON.stringify(data));
            return myJsonString;
        }
    }
}

module.exports = new JsonParser();