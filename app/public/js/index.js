const Offer = {
  data() {
    return {
      "person":{},
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


// const Offer = {
//   data() {
//     return {
//       "person":{},
//       // "dob":null
//     } 
//   },
//   // This will fire after our vue app is created
  // the function is asynchronous because it has an http call in its body.
  // async created(){  
  //   try {
  //     // the execution waits till the lines with await are executed 
  //     let response = await fetch('https://randomuser.me/api/')
  //     let json = await response.json()
  //     this.person = json.results[0]
  //     let date = new Date(json.results[0].dob.date)
  //     this.person.dob = date.toLocaleDateString('en-US', {
  //       year: 'numeric',
  //       month: 'long',
  //       day:'numeric',
  //     })
  //     console.log(this.person)
  //   } catch(err){
  //     console.error(error)
  //   }
  // }


Vue.createApp(Offer).mount('#offerApp');