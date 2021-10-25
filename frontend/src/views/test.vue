  submit(){
     
  // POST request using axios with set headers
  const formCreate = document.getElementsByClassName("createMessage")[0] 
  const token = this.$store.state.user.token
  let data = new FormData(formCreate)
  const headers = { 
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  };
  axios.post("http://localhost:3000/api/messages/new", data, { headers })
   .then(res => 
      {
          if (res) 
          {
              this.$router.push("/feed")
          }
      })
      .catch(error => 
      {
          console.log( error.message )
      })
    }
  }
}









