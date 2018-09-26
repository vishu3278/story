const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }
const PostDetail = { template:'<div><section>Post detail</section></div>'}

Vue.component('post-detail', { 
    props:['id'],
    data:function() {
        return {
            postDetail:[]
        }
    },
    template:'<div><section>Post #{{id}} detail</section></div>',
    mounted:function () {
        this.showDetail(id);
    },
    methods:{
        showDetail: function(id) {
            axios.get('http://tellmeastorymom.com/wp-json/wp/v2/posts/'+id+'')
            .then(result=>{
                console.log(result.data);
                this.postDetail = result.data
            }, (error)=>{console.log(error)})
            .catch(error=>{alert(error)});
        }
    }
})
const routes = [
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar },
  { path: '/detail', component: PostDetail}
]

const router = new VueRouter({
  routes // short for `routes: routes`
})

var myapp = new Vue({
    el: "#app",
    router,
    data: {
        page: "Story App",
        categories:[],
        posts: [],
        headers:[],
        totalposts:0,
        totalpages:0,
        perpage:4,
        currentpage:1,
        postdetail:'',
        paging:[],
        pages: [],
        errors: []
    },
    mounted: function () {
        axios.get('http://tellmeastorymom.com/wp-json/wp/v2/posts?_embed&page='+this.currentpage+'&per_page='+this.perpage)
        .then(response => {
            // console.log(response);
            this.posts = response.data
            this.headers = response.headers;
            for(k in this.headers){
                if (k == 'x-wp-total') {
                    this.totalposts = Number(this.headers[k]);
                }else if(k == 'x-wp-totalpages'){
                    this.totalpages = Number(this.headers[k]);
                }
            }
        })
        .catch(e => {this.errors.push(e)});

        axios.get('http://tellmeastorymom.com/wp-json/wp/v2/categories')
        .then(response => {this.categories = response.data})
        .catch(e => {this.errors.push(e)});

    },
    computed:{
        pagination:function(totalpages) {
            var pages=[];
            for (var i = 0; i < totalpages; i++) {
                pages.push(totalpages[i]);
            }
            return pages;
        }
    },
    methods: {
        
        /*getFeatureMedia:function(id) {
            axios.get('http://wowitsolutions.com/wp-json/wp/v2/media/'+id)
            .then(result=>{
                console.log(result.data.source_url);
                return result.data.source_url;
            }, (eror)=>{
                alert(error)
            })
        },*/
        featuredMedia:function(data) {
            // console.log(data);
            var newobj = {};
            for(var k in data){
                var key = k.replace(":","");
                var val = data[k];
                newobj[key] = val;
            }
            // console.log(newobj);
            var returnobj = {};

            function category(loopobject) {
                var output = [];
                for (var i = 0; i < loopobject.length; i++) {
                    output.push(loopobject[i].name);
                }
                return output;
            }
                returnobj.media = newobj.wpfeaturedmedia[0].media_details.sizes.full.source_url;
                returnobj.category = category(newobj.wpterm[0]); //newobj.wpterm[0][0].name;
                returnobj.tags = category(newobj.wpterm[1]); //[0].name;
            // console.log(returnobj);
            return returnobj;
        },
        postDetail:function(id) {
            axios.get('http://tellmeastorymom.com/wp-json/wp/v2/posts/'+id+'')
            .then(result=>{
                console.log(result.data);
                this.postdetail = result.data
            }, (error)=>{console.log(error)})
            .catch(error=>{alert(error)});
        },
        paginate:function(headers) {
            var pager = {};
            for(k in headers){
                var key = key.replace('\-\g','');
                var value = headers[k]
                paging[key] = value;
            }
            this.paging = pager;
        },
        getPages: function() {
            axios.get('http://tellmeastorymom.com/wp-json/wp/v2/pages')
            .then(response => {this.pages = response.data})
            .catch(e => {this.errors.push(e)});
        }
    }
})