# About
In this project, you will create use a PHP script as a proxy to fetch market information for a stock based on a stock symbol that a user specifies.

![image](https://user-images.githubusercontent.com/52793815/64494975-529bc600-d283-11e9-88bb-8939686dfff8.png)


# Instructions
In this Exercise, we will learn how to open files from a web server. we will also learn how to retrieve dynamic data from the server to update the client application. We will make use of AJAX to accomplish this.

1.	Copy the `Project01` folder into the `Projects/Project_Lab/www` folder; this will contain all of the files you will need. Open all of the necessary files in your IDE and complete the documentation at the top.  
    
## Section One: Fixing the PHP file
In the last version of this tutorial they had you using yahoo and iextrading, which are both no longer working. This can be fixed by using another API called Quandl.  

1. Open up the StockCheck.php file.
2. Since we are not learning PHP yet just copy the new code below that uses the Quandl api.
```php
<?php
    $TickerSymbol = $_GET["t"];
    $DateOne = $_GET["s"];
    $DateTwo = $_GET["e"];

    header("Cache-Control: no-cache");
    header("Content-Type: text/csv");

    $Quote = "https://www.quandl.com/api/v3/datasets/WIKI/$TickerSymbol.json?end_date=$DateTwo&start_date=$DateOne";
    $QuoteString = file_get_contents($Quote);

    echo $QuoteString;
?>
```

## Section Two: Opening the XMLHttpRequest

1.	Open the script.js file and got to the bottom of the empty file. Then add the global variable `httpRequest` and set its value to false. Create a second global named `entry` with a text value of `"MSFT"` (MSFT is the ticker symbol for Microsoft):
```js
/* global variables */
var httpRequest = false;
var entry = "MSFT";
```
2.	Directly below that, create a function named `getRequestObject()`. Fill the function with a try / catch structure to create an XHR object. Add an console.log() that we will use to test the function:
```js
    function getRequestObject(){
        try {
            httpRequest = new XMLHttpRequest();
        }
        catch (requestError) {
            return false;
        }

        console.log(httpRequest);

        return httpRequest;
    }
```
3.	Let’s set up a test for this by setting up a temporary event handler for the page load event. At the __bottom__ of the file, create the following code:
```js
if (window.addEventListener) {
    window.addEventListener("load", getRequestObject, false);
} 
else if (window.attachEvent) {
    window.attachEvent("onload", getRequestObject);
}
```

If you test the code it should trigger the console.log().  
   
4.	To stop any default submission from executing, let’s build a function to stop it __below__ the `getRequestObject()` function and __above__ what we just wrote in step 3, with an console.log() test:
```js
function stopSubmission(evt) {
    console.log("stopSubmission()");
    if (evt.preventDefault) {
        evt.preventDefault();
    }
    else {
        evt.returnValue = false;
    }
}
```
5.	Let’s modify our event handler creation code (what we created in step 3) to call that function as an event handler on the submit event. This is what it should look like when done:

```js
var form = document.getElementsByTagName("form")[0];
if (form.addEventListener) {
    form.addEventListener("submit", stopSubmission, false);
    window.addEventListener("load", getRequestObject, false);
} 
else if (form.attachEvent) {
    form.attachEvent("onsubmit", stopSubmission);
    window.attachEvent("onload", getRequestObject);
}
```

Let’s test for syntax and to make sure that both our load event and submit event are acting correctly.  

6.	Now let’s start to build out a function that will request stock quote data from the server. It will use the stock symbol the user enters in the `<input>` field, or the default if nothing is entered. We will start it by having it create our XHR object if necessary, or re-use it if already created. __Below__ stopSubmission() enter:

```js
function getQuote() {
    console.log("getQuote()");
    if (document.getElementsByTagName("input")[0].value) {
        entry = document.getElementsByTagName("input")[0].value;
    }
    if (!httpRequest) {
        httpRequest = getRequestObject();
    }
}
```

7.	To test this, let’s first call the function at the __bottom__ of our `stopSubmission()` function:
```js
    getQuote();
```
8.	Let’s also modify our load event (from step 3) to use it as an event handler instead of `getRequestObject()`. This is what the final code should look like:
```js
var form = document.getElementsByTagName("form")[0];
if (form.addEventListener) {
    form.addEventListener("submit", stopSubmission, false);
    window.addEventListener("load", getQuote, false);
} 
else if (form.attachEvent) {
    form.attachEvent("onsubmit", stopSubmission);
    window.attachEvent("onload", getQuote);
}
```
Now we test both the load event, which should produce a getQuote() console log and a valid XHR object console log, and the submit event, which should produce a `stopSubmission()` console log and a `getQuote()` console log. 

9. If everything looks good let’s __remove all__ of the console logs from the code and go on.

## Section Three: Generating the AJAX request
1. Go to your `getQuote()` function and below the last if statement put the following:
```js
let current = new Date();
let threeDaysAgo = new Date();
threeDaysAgo.setDate(current.getDate() - 3);
```
That will creates two variables storing dates. One stores the current date while the other stores the date from three days ago.  

2. Go down below the `getQuote()` function but above the load code from section 2 step 3. Insert a new function called `getMonth()`:
```js
function getMonth(month){
    var curMonth = month > 0 ? month + 1 : 12;
    return curMonth < 10 ? "0" + curMonth : curMonth;
}
```
That function adds one to the month and adds a zero out in front if the month number is less than 10.
  
3.	Now go back up to the bottom of the `getQuote()` function and add in the following code:
```js
    let dateOne = `2017-${getMonth(threeDaysAgo.getMonth())}-${threeDaysAgo.getDate()}`;
    let dateTwo = `2017-${getMonth(current.getMonth())}-${current.getDate()}`

    httpRequest.abort();
    httpRequest.open("get", `StockCheck.php?t=${entry}&s=${dateOne}&e=${dateTwo}`, true);
    httpRequest.send(null);
```

Using the Browser Developer Tools we can see the request being sent.

4.	Now we need to get our data, so we need to set our onreadystatechange event handler: (This goes underneath the code from section 3 step 3)

```js
    httpRequest.onreadystatechange = displayData;
```

5.	Let's start to build out the `displayData()` function __below__ the `getQuote()` function. First we will see if we can get data back, before we attempt to start placing that data on the page with the DOM:

```js
function displayData() {
    if (httpRequest.readyState === 4 && httpRequest.status === 200) {
        var stockResults = httpRequest.responseText;
        console.log(stockResults);
     }
}
```

Using the Developer Tools in the Console tab we should see the output of the stockResults. Make sure there are no syntax errors. We should get good console.log() data.

6. Since stockResults is just a string right now we need to convert it into JSON. There can be an error while parsing the JSON if the Ticker Symbol does not exist so we need to surround it in a try/catch statement. To do that use this: (Below what we just added while __still inside__ the if statement)
```js
var stockItems;
try{
    stockItems = JSON.parse(stockResults);
}catch(error){
    
}
```
  
7. Now let's add in the error message to let the user know they entered an incorrect Ticker Symbol:
```js
document.getElementById("ticker").innerHTML = "Error: Invalid Ticker.";
document.getElementById("openingPrice").innerHTML = "-";
document.getElementById("lastTrade").innerHTML = "-";
document.getElementById("lastTradeDT").innerHTML = "-";
document.getElementById("change").innerHTML = "-";
document.getElementById("range").innerHTML = "-";
document.getElementById("volume").innerHTML = "-";
return;
```
The code above should be __inside__ the catch(){} statement.

8.	Now let’s see if we can get some data onto the page by placing it into the DOM nodes. We will start with a single element by placing the following code directly below the catch statement:
```js
document.getElementById("ticker").innerHTML = stockItems.dataset.dataset_code;
```

A test should give us the stock symbol in the right place.

9.	Now let’s get the rest of the data up on the page by placing them in the DOM nodes:
```js
document.getElementById("openingPrice").innerHTML = stockItems.dataset.data[0][1];
document.getElementById("lastTrade").innerHTML = stockItems.dataset.data[1][4];
document.getElementById("lastTradeDT").innerHTML = stockItems.dataset.data[1][0].replace("2017", new Date().getFullYear());
document.getElementById("change").innerHTML = ((parseFloat(stockItems.dataset.data[1][4])-parseFloat(stockItems.dataset.data[0][1]))).toFixed(2);
document.getElementById("range").innerHTML = "Low " + stockItems.dataset.data[0][3] + "<br>High " + stockItems.dataset.data[0][2];
document.getElementById("volume").innerHTML = stockItems.dataset.data[0][5];
```

For the last trade date we replace 2017 with the current year to make it look like we are getting recent data. (We do this because Quandl only goes up to 2017 data).
 

10.	Now let’s get a little better style into the stock data. To do that, we will build a `formatTable()` function directly below the `displayData()` function:

```js
function formatTable() {
    var rows = document.getElementsByTagName("tr");
    for (var i = 0; i < rows.length; i++) {
        rows[i].style.background = "#9FE098";
    }
}
```

11.	New we will update the load code from section 2 step 3. (At the bottom of the file.)
```js
var form = document.getElementsByTagName("form")[0];
if (form.addEventListener) {
    form.addEventListener("submit", stopSubmission, false);
    window.addEventListener("load", formatTable, false);
    window.addEventListener("load", getQuote, false);
} 
else if (form.attachEvent) {
    form.attachEvent("onsubmit", stopSubmission);
    window.attachEvent("onload", formatTable);
    window.attachEvent("onload", getQuote);
}
```

Let’s give this a test, and we should get a good effect.

### Testing the final product
Give the code a test. It should display everything you need. (See the figure below for more details.) Try testing it with the following codes:
- GOOGL
- A
- F
- APPL

This is a screen shot of what the final product should look like:
![image](https://i.imgur.com/UZgPZCd.png)

### Final Notes
- Since Quandl only works with old data it is not needed to update the quote.
- Quandl can move up to 2018 in the future.
- Some stocks (like Nintendo) are not stored thus will not work.

Finally, remove all of the console logs.