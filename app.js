
var myapp = new Vue({
    el: "#app",
    data: {
        page: "Story App",
        posts: [],
        pages: [],
        errors: [],
        loading: false,
        lat:'',
        long:'',
        model:'',
        platform:'',
        version:'',
        mfg:''
    },
    methods: {
        getPost: function() {
            this.loading = true;
            axios.get('https://wowitsolutions.com/antardirshti/wp-json/wp/v2/posts')
                .then(response => {
                    this.posts = response.data;
                    this.loading = false})
                .catch(e => {this.errors.push(e)});
        },
        getPages: function() {
            this.loading = true,
            axios.get('https://wowitsolutions.com/antardirshti/wp-json/wp/v2/pages')
                .then(response => {
                    this.pages = response.data;
                    this.loading = false})
                .catch(e => {this.errors.push(e)});
        }
    }
})