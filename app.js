
var myapp = new Vue({
    el: "#app",
    data: {
        page: "Story App",
        posts: [],
        pages: [],
        errors: [],
        loadingPost: false,
        loadingPage: false,
        lat:'',
        long:'',
        model:'',
        platform:'',
        version:'',
        mfg:'',
        network:''
    },
    methods: {
        getPost: function() {
            this.loadingPost = true;
            axios.get('https://wowitsolutions.com/antardirshti/wp-json/wp/v2/posts')
                .then(response => {
                    this.posts = response.data;
                    this.loadingPost = false})
                .catch(e => {this.errors.push(e)});
        },
        getPages: function() {
            this.loadingPage = true,
            axios.get('https://wowitsolutions.com/antardirshti/wp-json/wp/v2/pages')
                .then(response => {
                    this.pages = response.data;
                    this.loadingPage = false})
                .catch(e => {this.errors.push(e)});
        }
    }
})