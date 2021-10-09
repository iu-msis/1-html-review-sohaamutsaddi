const SomeApp = {
    data() {
      return {
        students: [],
      }
    },
    computed: {},
    methods: {
        prettyDollar(n) {
            const d = new Intl.NumberFormat("en-US").format(n);
            return "$ " + d;
        },
        
        fetchStudentData() {
            fetch('/api/books/')
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                console.log("here")
                this.students = responseJson;
            })
            .catch( (err) => {
                console.error(err);
            })
        },
    },
    created() {
        this.fetchStudentData();
    }
  
  }
  
  Vue.createApp(SomeApp).mount('#offerApp');