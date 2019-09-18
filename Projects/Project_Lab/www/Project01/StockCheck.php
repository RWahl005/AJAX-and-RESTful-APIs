<?php
$TickerSymbol = $_GET["t"];
$DateOne = $_GET["s"];
$DateTwo = $_GET["e"];
header("Cache-Control: no-cache");
header("Content-Type: text/csv");
$Quote = "https://www.quandl.com/api/v3/datasets/WIKI/$TickerSymbol.json?end_date=$DateTwo&start_date=$DateOne";
// $Quote = "http://quote.yahoo.com/d/quotes.csv?s=$TickerSymbol&f=sl1d1t1c1p2ohgv";
$QuoteString = file_get_contents($Quote);
echo $QuoteString;
?>