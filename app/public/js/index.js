const SomeApp = {
  data() {
    return {
      students: [],
      offerForm: {},
      selectedOffer: null,

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

      postOffer(evt){
        if(this.selectedOffer){
            this.postEditOffer();
        }
        else{
            this.postNewOffer();
        }
      },

      postEditOffer(evt){
        // if you want to update you need an id
        this.offerForm.id = this.selectedOffer.id       
        console.log("Updating:", this.offerForm);
        
        // send it to a different api
        fetch('api/books/update.php', {
            method:'POST',
            body: JSON.stringify(this.offerForm),
            headers: {
              "Content-Type": "application/json; charset=utf-8"
            }
          })
          .then( response => response.json() )
          .then( json => {
            console.log("Returned from post:", json);
            this.offers = json;
            
            // clear out the form and selected offer
            this.handleResetEdit();
            this.fetchStudentData();
        });
      },

      handleEditOffer(offer) {
        this.selectedOffer = offer;
        this.offerForm = Object.assign({}, this.selectedOffer); //set form to data
      },
      handleResetEdit(){
        this.selectedOffer = null;
        this.offerForm = {}
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
      },

      postDeleteOffer(offer){
        if(!confirm("Are you sure you want to delete the book " +offer.title + "?")){
            return;
        } 
        this.selectedOffer = offer;
        // if you want to update you need an id
        this.offerForm.id = this.selectedOffer.id       
        console.log("Deleting:", this.offerForm);
        
        // send it to a different api
        fetch('api/books/delete.php', {
            method:'POST',
            body: JSON.stringify(this.offerForm),
            headers: {
              "Content-Type": "application/json; charset=utf-8"
            }
          })
          .then( response => response.json() )
          .then( json => {
            console.log("Returned from post:", json);
            this.offers = json;
            this.fetchStudentData();
            console.log("Fetched")
            // clear out the form and selected offer
            this.handleResetEdit();
           
        });
    },
  },
  created() {
      this.fetchStudentData();
  }

}

Vue.createApp(SomeApp).mount('#offerApp');