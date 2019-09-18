/*  Project 01_11_02

    Author: 
    Date:   

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

function stopSubmission(evt){
    if(evt.preventDefault){
        evt.preventDefault();
    }
    else{
        evt.returnValue = false;
    }
    getQuote();
}

function getQuote(){
    if(document.getElementsByTagName("input")[0].value){
        entry = document.getElementsByTagName("input")[0].value;
    }
    else{
        document.getElementsByTagName("input")[0].value = entry;
    }
    if(!httpRequest){
        httpRequest = getRequestObject();
    }
    var dd = new Date();
    httpRequest.abort();
    httpRequest.open("get", "StockCheck.php?t=" + entry + `&s=2017-09-14&e=2017-09-18`, true);
    httpRequest.send(null);
    httpRequest.onreadystatechange = displayData;
}

function displayData(){
    if(httpRequest.readyState === 4 && httpRequest.status === 200){
        var stockResults = httpRequest.responseText;
        console.log(stockResults);
        var stockItems = JSON.parse(stockResults);
        console.log(stockItems);
        document.getElementById("openingPrice").innerHTML = stockItems.dataset.data[0][1];
        document.getElementById("lastTrade").innerHTML = stockItems.dataset.data[1][4];
        document.getElementById("lastTradeDT").innerHTML = stockItems.dataset.data[1][0];
        document.getElementById("change").innerHTML = ((parseFloat(stockItems.dataset.data[1][4])-parseFloat(stockItems.dataset.data[0][1]))).toFixed(2);
        document.getElementById("range").innerHTML = "Low " + stockItems.dataset.data[0][3] + "<br>High " + stockItems.dataset.data[0][2];
        document.getElementById("volume").innerHTML = stockItems.dataset.data[0][5];
    }
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

function getLastDay(date){
    if(date - 3 < 1){
        return 27;
    }
    else return date - 3;
}

function getLastMonthDay(date, month){
    if(date - 3 < 1) return 
}