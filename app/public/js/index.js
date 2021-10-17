const SomeApp = {
  data() {
    return {
      students: [],
      offerForm: {}
    }
  },
  computed: {},
  methods: {
      prettyData(d) {
          return dayjs(d)
          .format('D MMM YYYY')
      },
      prettyDollar(n) {
          const d = new Intl.NumberFormat("en-US").format(n);
          return "$ " + d;
      },
  
      fetchStudentData() {
          fetch('/api/books/')
          .then( response => response.json() )
          .then( (responseJson) => {
              console.log(responseJson);
              this.students = responseJson;
          })
          .catch( (err) => {
              console.error(err);
          })
      },
      
      postNewOffer(evt) {
        // this.offerForm.studentId = this.selectedStudent.id;        
        console.log("Posting:", this.offerForm);
        // alert("Posting!");

        fetch('api/books/create.php', {
            method:'POST',
            body: JSON.stringify(this.offerForm),
            headers: {
              "Content-Type": "application/json; charset=utf-8"
            }
          })
          .then( response => response.json() )
          .then( json => {
            console.log("Returned from post:", json);
            // TODO: test a result was returned!
            this.offers = json;
            
            // reset the form
            this.offerForm = {};
            console.log("form reset");
            this.fetchStudentData()
          });
      }
  },
  created() {
      this.fetchStudentData();
  }

}

Vue.createApp(SomeApp).mount('#offerApp');