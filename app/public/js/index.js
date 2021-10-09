const SomeApp = {
  data() {
    return {
      students: [],
      selectedStudent: null,
      offers: []
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
      selectStudent(s) {
          if (s == this.selectedStudent) {
              return;
          }
          this.selectedStudent = s;
          this.offers = [];
          this.fetchOfferData(this.selectedStudent);
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

  },
  created() {
      this.fetchStudentData();
  }

}

Vue.createApp(SomeApp).mount('#offerApp');