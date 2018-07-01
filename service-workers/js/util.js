const amount = document.getElementById( "amount" );
const currency_from = document.getElementById( "currency_from" );
const current_to = document.getElementById( "currency_to" );
const converted_val = document.getElementById( "currency_val" );
const ele = document.getElementById( "bttn_convert" );

ele.onclick = ( e ) => {
    let key = `${currency_from.value}_${currency_to.value}`;
    fetch(`https://free.currencyconverterapi.com/api/v5/convert?q=${key}&compact=ultra`)
    .then( (response) => response.json()) // Transform the data into json
    .then( (response) => {
        converted_val.value = response[key] * currency.value;
    });
};

fetch('https://free.currencyconverterapi.com/api/v5/currencies')
.then( (response) => response.json()) // Transform the data into json
.then( (response) => {
    Object.entries( response.results ).forEach( ([key, value] ) => {
        let currencyfromOption = new Option(`${value.currencyName} (${value.currencySymbol})`, key);
        let currencytoOption = new Option(`${value.currencyName} (${value.currencySymbol})`, key);
        currency_from.add(currencyfromOption);
        currency_to.add(currencytoOption);
    });

//setup IndexedDB for different browsers
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

if ( !window.indexedDB ) {
    console.log("indexedDB unavailable");
}

let request = window.indexedDB.open( 'CurrDB', 1 ), 
db,
tx,
store;

//onupgradeneeded event
request.onupgradeneeded = ( e ) => {
    let db = request.result;
    store = db.createObjectStore( "CurrDBStore",  {
        keypath: "currID"
    }),
    store = db.createObjectStore( "CurrDBStore", { autoIncrement: true } );
};

//onerror event
request.onerror = ( e ) => {
    console.log( " There was an error: " + e.target.errorCode );
}

request.onsuccess = ( e ) => {
    db = request.result;
    tx = db.transaction( "CurrDBStore", "readwrite" );
    store = tx.objectStore( "CurrDBStore" );

    db.onerror = ( e ) => {
        console.log( "ERROR: " + e.target.errorCode );
    }

    Object.entries( response.results ).forEach( ([key, value] ) => {
        store.put( `${value.currencyName} (${value.currencySymbol})`, key );
        currency_val.value = response[ key ] * currency.value;
    });
    
    //close database connection
    tx.oncomplete = function() {
        db.close();
    };
}

});



