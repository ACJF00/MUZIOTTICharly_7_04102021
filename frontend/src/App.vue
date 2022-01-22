<template>
<link rel="shortcut icon" type="image/png" href="/favicon.png"/>
<header>
	<div class="overlay">
    <img alt="Groupomania banner" src="./assets/icon-left-font-monochrome-white.png">
    <h3>Bienvenue sur le réseau social de Groupomania</h3>
	<br>
		</div>
    <nav>
    <router-link to="/Profile">Profil</router-link> |
    <router-link to="/feed">Mur de messages</router-link> |
    <router-link to="/message">Poster un message</router-link> |
    <router-link to="/UsersList" v-if="this.$store.state.user.isAdmin == 1"> Liste des utilisateurs</router-link>
  </nav>
</header>
     <router-view />
     <Footer />
</template>

<script>

import Footer from "@/components/Footer"

export default {
  name: 'App',
  components: { Footer }
}
</script>

<style lang="scss">
@import "src/scss/_variables.scss";
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;800&display=swap');
* {
  font-family: 'Poppins', sans-serif;
  margin:0;
  padding: 0;
  box-sizing: border-box;
}


header {
	text-align: center;
	width: 100%;
  height: auto;
  .overlay{
	width: 100%;
	height: 100%;
	color: #FFF;
	text-shadow: 1px 1px 1px #333;
  background-color: $header-color;
  border-radius: 16px;
  box-shadow: 2px 2px 5px black;
  padding: 10px;
  h3 {
    font-size: xx-large;
  }
}

header h1 {
	font-size: 80px;
	margin-bottom: 30px;
}

header h3, p {
	margin-bottom: 30px;
}
}
#app {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 38px;
  align-items: center;
}

nav {
    padding: 20px;
  a { 
  text-decoration: none;
  color: $nav-txt-color; 
  }
}
body {
  background-color: $main-color;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding:32px;
}
img {
  max-width: 100%;
  border-radius: 8px;
  height: 10em;
  width: auto
}
.general {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.card {
  background: $card-color;
  border-radius: 16px;
  display: flex;
  box-shadow: 0px 0px 5px 2px #d14f59;
  flex-direction: column;
  margin-bottom: 2em;
  width: 90%;
  color: $card-txt;
  max-width: 34em;

  a{
  text-decoration: none;
  }

  .card__username {
  display: flex;
  justify-content: right;
  font-weight: normal;
}

.card__content{
  font-size: 1.5em;
  text-align: center;
  margin: 20px;
  font-weight: normal;
} 

.card__title {
  text-align:center;
  font-weight: 800;
  font-size: 2em;
}
.card__subtitle {
  text-align: center;
  font-weight: 500;
  padding: 1em;
}

.displayMessage {
display: flex;
flex-direction: column;
padding: 10px;
img{
    height: auto;
}
.publishedBy {
    display: flex;
    font-size: 0.7em;
    width: 100%;
    #username {
    color: #d14f59;
    font-weight: bold;
    padding-left: 1%;
    }
}
}
  .button {
    background: $btn-color;
    color:white;
    border-radius: 8px;
    font-weight: 800;
    font-size: 15px;
    border: none;
    padding: 16px;
    transition: .4s background-color;
  }
  .card__action {
    color: $btn-color;
    text-decoration: underline;
  }
  .card__action:hover {
    cursor:pointer;
  }
  .button:hover {
    cursor:pointer;
    background: $btn-hover;
  }

.deletePost {
  display: flex;
  justify-content: right;
  width: 100%;
}

#datePost{
  font-size: 0.7em;
  justify-content: right;
  display: flex;
}
.displayLikes{
  color: $btn-color;
  display: flex;
  flex-direction: row;
  font-size: 0.9em;
    p{
    padding-left: 0.5em;
  }
}
.attachment{
  img{
  width: 100%;
  height: auto;
  }
}
}
</style>
