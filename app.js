function checkConnection() {
    var networkState = navigator.connection.type;
    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

    // alert('Connection type: ' + states[networkState]);
    myapp.networkType = states[networkState];
    if (networkState !== Connection.NONE) {
        myapp.network = true;
        navigator.vibrate([200, 400, 200]);
    }else{
        myapp.network = false;
    }
}

function onConfirm(buttonIndex) {
    if (buttonIndex == 1) {
        navigator.geolocation.getCurrentPosition(onSuccess, onError, geooptions);
    } else {
        alert('You selected button ' + buttonIndex);
    }
}

function onOffline() {
    console.log("lost connection");
    myapp.network = false;
    navigator.notification.alert("You lost connection!");
}

function onOnline() {
    myapp.network = true;
    navigator.vibrate([200, 400, 200]);
}

function onDeviceReady() {
    // alert("Device Ready!");

    checkConnection();

    /*network information*/
    document.addEventListener("offline", onOffline, false);
    document.addEventListener("online", onOnline, false);
}
