
var myapp = new Vue({
    el: "#app",
    data: {
        page: "Geolocation App",
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