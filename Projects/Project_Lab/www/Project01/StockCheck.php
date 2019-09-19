<?php
$TickerSymbol = $_GET["t"];
// handles the data for date one and two.
$DateOne = $_GET["s"];
$DateTwo = $_GET["e"];
header("Cache-Control: no-cache");
header("Content-Type: text/csv");
//Get the data from quandl
$Quote = "https://www.quandl.com/api/v3/datasets/WIKI/$TickerSymbol.json?end_date=$DateTwo&start_date=$DateOne";
$QuoteString = file_get_contents($Quote);
echo $QuoteString;
?>