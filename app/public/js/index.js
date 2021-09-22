const Offer = {
  data() {
    return {
      "person":undefined
    } 
  },

  //like a getter function
  computed:{
    prettyBirthday(){
      return dayjs(this.person.dob.date).format('DD MMMM YYYY') ;
    },
    prettyimg(){
      return this.person.picture.large
    }
  },

  methods:{
    fetchUserData(){
      fetch('https://randomuser.me/api/')
    .then(response => response.json())
    .then ((parsedJson) => {
      this.person = parsedJson.results[0]
      console.log('Here')
    })
    .catch(err =>{
      console.error(error)
    });
    }
  },

  // This will fire after our vue app is created
  created(){
    this.fetchUserData();
  }
}

Vue.createApp(Offer).mount('#offerApp');