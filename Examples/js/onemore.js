(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        var cols = [ {
            id: "market",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "candle_acc_trade_volume",
	alisa: "volume",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "candle_date_time_kst",
            alias: "date",
            dataType: tableau.dataTypeEnum.date
        }, {
            id: "change_price",
            alias: "price change",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "change_rate",
            alias: "rate",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "high_price",
            alias: "price high",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "low_price",
            alias: "price low",
            dataType: tableau.dataTypeEnum.float
        }];

        var tableSchema = {
            id: "upbit",
            alias: "upbit 180days data",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    // Download the data
    myConnector.getData = function(table, doneCallback) {
        $.getJSON("https://github.com/junkoh74/webdataconnector/blob/master/Examples/json/onemore.json", function(resp) {
            var feat = resp.features,
                tableData = [];

            // Iterate over the JSON object
            for (var i = 0, len = feat.length; i < len; i++) {
                tableData.push({
                    "candle_acc_trade_volume": feat[i].properties.candle_acc_trade_volume,
                    "candle_date_time_kst": feat[i].properties.candle_date_time_kst,
                    "change_price": feat[i].properties.change_price,
                    "change_rate": feat[i].properties.change_rate,
                    "high_price": feat[i].properties.high_price,
                    "low_price": feat[i].properties.low_price
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
            tableau.connectionName = "USGS Earthquake Feed"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();
