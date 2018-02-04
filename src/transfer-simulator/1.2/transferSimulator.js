var logger = require('./logger/logger');

var client = require('./rest_client/restClientHelper');

function getAccounts (callback) {
  var url = "http://microbank-account-system.microbank.svc.cluster.local/accounts";
  console.log ("Calling " + url);
   var req = client.get(url, function (data, response) {
     var accounts = data.accounts;
     if (response.statusCode == 200) {
      console.log ("Succeeded");
      callback (accounts);
     } else {
      console.log ("PROBLEM!!");
     }
   });

   req.on('error', function (err) {
      console.log('request error', err);
    }); 
}

function getRandom () {
  return Math.random();
}

function pickAccount (accounts) {
  r = Math.floor(getRandom() * accounts.length);
  return accounts[r];
}

function pickAmount () {
  r = Math.round(getRandom() * 100);
  return r;
}

function transfer (from, to, amount) {
  var url = "http://microbank-transfer.microbank.svc.cluster.local/transfer";
  console.log ("Calling " + url);
  args = {
    data: 
    { 
      from: from,
      to: to,
      amount: amount
    },
    headers: { "Content-Type": "application/json" }
  };

  var req = client.post(url, args, function (data, response) {
     if (response.statusCode == 200) {
      console.log ("Succeeded");
     } else {
      console.log ("PROBLEM!!");
      console.log ("Response:");
      console.log (response);
      console.log ("Data:");
      console.log (data);
     }
  });

  req.on('error', function (err) {
    console.log('request error', err);
  }); 

}

function generateTransfer() {
  console.log ("Generating a transfer");
  getAccounts (function (accounts) {
    console.log ("Accounts: ");
    console.log (accounts);

    if (accounts.length == 0) {
      console.log ("No account found");
    } else { 

      from = pickAccount(accounts);
      to = pickAccount(accounts);
      amount = pickAmount();

      console.log ("From " + from + " to " + to + " amount:" + amount);
      logger.logMessage ("Transfering " + amount + " from "+ from + " to " + to);
      transfer (from, to, amount);
    }
  });
}

function generatePeriodTransfer() {
  setInterval (generateTransfer, 60 * 1000);
}

generatePeriodTransfer(); 
