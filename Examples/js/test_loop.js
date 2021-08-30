(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        var cols = {
            id: "candle_date_time_kst",
            alias: "date",
            dataType: tableau.dataTypeEnum.datetime
        };
		
		var cols = {
            id: "market",
            dataType: tableau.dataTypeEnum.String
        };

        var tableSchema = {
            id: "upbit",
            alias: "upbit markets",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    // Download the data
    myConnector.getData = function(table, doneCallback) {
        $.getJSON("https://raw.githubusercontent.com/junkoh74/webdataconnector/master/Examples/json/test_loop.json", function(resp) {
            var feat = resp,
                tableData = [];

            // Iterate over the JSON object
            for (var i = 0, len = feat.length; i < len; i++) {
                tableData.push({
                    "candle_date_time_kst": feat[i].candle_date_time_kst,
					"market": feat[i].market
                });
            }

            table.appendRows(tableData);
            doneCallback();
        });
    };

    tableau.registerConnector(myConnector);

    // Create event listeners for when the user submits the form
    $(document).ready(function() {
        $("#submitButton").click(function() {
            tableau.connectionName = "upbit 180days data"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();
