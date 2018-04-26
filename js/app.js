function loadApp() {
    document.addEventListener("deviceready", onDeviceReady, false);   
}

/*onSuccess Callback*/
var onSuccess = function(position) {
    alert('Latitude: '          + position.coords.latitude          + '\n' +
          'Longitude: '         + position.coords.longitude         + '\n' +
          'Altitude: '          + position.coords.altitude          + '\n' +
          'Accuracy: '          + position.coords.accuracy          + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
          'Heading: '           + position.coords.heading           + '\n' +
          'Speed: '             + position.coords.speed             + '\n' +
          'Timestamp: '         + position.timestamp                + '\n');
};

/*onError Callback receives a PositionError object*/
function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}

function onDeviceReady() {
    alert("Ready.");
	// alert("geolocation works well.");
	navigator.geolocation.getCurrentPosition(onSuccess, onError);
}


var myapp = new Vue({
    el: "#app",
    data: {
        page: "Story",
        posts: [],
        pages: [],
        errors: []
    },
    methods: {
        getPost: function() {
            axios.get('https://wowitsolutions.com/antardirshti/wp-json/wp/v2/posts')
                .then(response => {this.posts = response.data})
                .catch(e => {this.errors.push(e)});
        },
        getPages: function() {
            axios.get('https://wowitsolutions.com/antardirshti/wp-json/wp/v2/pages')
                .then(response => {this.pages = response.data})
                .catch(e => {this.errors.push(e)});
        }
    }
})