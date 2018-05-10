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
                navigator.notification.alert("No internet available!");
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
                navigator.notification.alert("No internet available!");
            }
        },
        showMessage: function(msg) {
            this.message = true;
            this.msgtext = msg;
            setInterval(function (argument) {
                this.message = false;
                this.msgtext = '';
            },5000)
        }
    }
})