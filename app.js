var onSuccess = function(position) {
    alert('Latitude: ' + position.coords.latitude + '\n' +
        'Longitude: ' + position.coords.longitude + '\n' +
        'Altitude: ' + position.coords.altitude + '\n' +
        'Accuracy: ' + position.coords.accuracy + '\n' +
        'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '\n' +
        'Heading: ' + position.coords.heading + '\n' +
        'Speed: ' + position.coords.speed + '\n' +
        'Timestamp: ' + position.timestamp + '\n');
    myapp.lat = position.coords.latitude;
    myapp.long = position.coords.longitude;
};

/*onError Callback receives a PositionError object*/
function onError(error) {
    alert('error code: ' + error.code + '\n' +
        ' message: ' + error.message);
}
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

var geooptions = { maximumAge: 10000, timeout: 10000, enableHighAccuracy: true };

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

    navigator.notification.confirm(
        'Confirm location access!', // message
        onConfirm, // callback to invoke with index of button pressed
        'Geolocation', // title
        ['Allow', 'Deny'] // buttonLabels
    );

    /*get device details*/
    myapp.model = device.model;
    myapp.platform = device.platform;
    myapp.version = device.version;
    myapp.mfg = device.manufacturer;
    /*network information*/
    document.addEventListener("offline", onOffline, false);
    document.addEventListener("online", onOnline, false);
}

/*vue instance*/
var myapp = new Vue({
    el: "#app",
    data: {
        page: "Story App",
        posts: [],
        pages: [],
        errors: [],
        loadingPost: false,
        loadingPage: false,
        message:false,
        msgtext:'',
        lat:'',
        long:'',
        model:'',
        platform:'',
        version:'',
        mfg:'',
        network:'',
        networkType:''
    },
    methods: {
        getPost: function() {
            if (this.network == true) {
                this.loadingPost = true;
                axios.get('https://wowitsolutions.com/antardirshti/wp-json/wp/v2/posts')
                    .then(response => {
                        this.posts = response.data;
                        this.loadingPost = false;
                        this.showMessage("Posts loaded successfully.");
                    })
                    .catch(e => {this.errors.push(e)});

            } else {
                // alert("No network available.");
                alert("No internet available!");
            }
        },
        getPages: function() {
            if (this.network == true) {
                this.loadingPage = true,
                axios.get('https://wowitsolutions.com/antardirshti/wp-json/wp/v2/pages')
                    .then(response => {
                        this.pages = response.data;
                        this.loadingPage = false;
                        // this.message = true;
                        this.showMessage("Pages loaded successfully.");
                    })
                    .catch(e => {this.errors.push(e)});
                
            } else {
                alert("No internet available!");
            }
        },
        getMedia: function(id) {
            axios.get('http://demo.wp-api.org/wp-json/wp/v2/media/'+id).
            then(response=>{
                return response;
                console.log(response);
            })
        },
        showMessage: function(msg) {
            this.message = true;
            this.msgtext = msg;
            var closedelay = setTimeout(() => {
                this.msgtext = '';
                this.message = false;
            },5000);
        }
    }
})