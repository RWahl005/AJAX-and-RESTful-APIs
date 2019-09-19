/*  Project 01_11_02

    Author: Ryan W
    Date:   9.19.19

    Filename: script.js
*/

"use strict";

// le global variables
var httpRequest = false;
var entry = "MSFT";

/**
 * Create the XMLHttp Request.
 */
function getRequestObject(){
    try{
        httpRequest = new XMLHttpRequest();
    }
    catch(err){
        return false;
    }
    return httpRequest;
}

/**
 * Stops the submission.
 * @param {*} evt 
 */
function stopSubmission(evt){
    if(evt.preventDefault){
        evt.preventDefault();
    }
    else{
        evt.returnValue = false;
    }
    getQuote();
}

/**
 * Sends the request to get the data from quandl.
 */
function getQuote(){
    if(document.getElementsByTagName("input")[0].value){
        entry = document.getElementsByTagName("input")[0].value.replace(".", "_");
    }
    else{
        document.getElementsByTagName("input")[0].value = entry;
    }
    if(!httpRequest){
        httpRequest = getRequestObject();
    }
    // Calculates the current and previous dates.
    let current = new Date();
    let threeDaysAgo = new Date();
    threeDaysAgo.setDate(current.getDate() - 3);
    httpRequest.abort();
    httpRequest.open("get", "StockCheck.php?t=" + entry + `&s=2017-${getMonth(threeDaysAgo.getMonth())}-${threeDaysAgo.getDate()}&e=2017-${getMonth(current.getMonth())}-${current.getDate()}`, true);
    httpRequest.send(null);
    httpRequest.onreadystatechange = displayData;
}

/**
 * Displays the data that was recieved from the request to quandl.
 */
function displayData(){
    if(httpRequest.readyState === 4 && httpRequest.status === 200){
        var stockResults = httpRequest.responseText;
        var stockItems;
        try{
            stockItems = JSON.parse(stockResults);
        }
        catch(error){
            // If the ticker symbol inputed is not valid.
            document.getElementById("ticker").innerHTML = "Error: Invalid Ticker.";
            document.getElementById("openingPrice").innerHTML = "-";
            document.getElementById("lastTrade").innerHTML = "-";
            document.getElementById("lastTradeDT").innerHTML = "-";
            document.getElementById("change").innerHTML = "-";
            document.getElementById("range").innerHTML = "-";
            document.getElementById("volume").innerHTML = "-";
            return;
        }
        document.getElementById("ticker").innerHTML = stockItems.dataset.dataset_code;
        document.getElementById("openingPrice").innerHTML = stockItems.dataset.data[0][1];
        document.getElementById("lastTrade").innerHTML = stockItems.dataset.data[1][4];
        // Sets the last date. (A little trickery is used so they don't know it is 2017 data.)
        document.getElementById("lastTradeDT").innerHTML = stockItems.dataset.data[1][0].replace("2017", new Date().getFullYear());
        // Calculates the change in prices.
        document.getElementById("change").innerHTML = ((parseFloat(stockItems.dataset.data[1][4])-parseFloat(stockItems.dataset.data[0][1]))).toFixed(2);
        document.getElementById("range").innerHTML = "Low " + stockItems.dataset.data[0][3] + "<br>High " + stockItems.dataset.data[0][2];
        document.getElementById("volume").innerHTML = stockItems.dataset.data[0][5];
    }
}

/**
 * Calculates month (adds in a zero in front if needed)
 * @param {Number} month The month that needs to be formated.
 * @returns the formated month.
 */
function getMonth(month){
    var curMonth = month > 0 ? month + 1 : 12;
    return curMonth < 10 ? curMonth = "0" + curMonth : curMonth;
}

/*
 * Bottom load code 
 */
var form = document.getElementsByTagName("form")[0];
if(form.addEventListener){
    form.addEventListener("submit", stopSubmission, false);
    window.addEventListener("load", getQuote, false);
}
// if they are using Internet Explorer.
else if(form.attachEvent){
    form.attachEvent("onsubmit", stopSubmission);
    window.attachEvent("onload", getQuote);
}