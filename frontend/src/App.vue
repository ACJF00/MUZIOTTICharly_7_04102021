<template>
<header>
	<div class="overlay">
<h1>Groupomania</h1>
<h3>Bienvenue sur le réseau social de Groupomania</h3>
	<br>
		</div>
    <nav>
    <router-link to="/Profile">Profil</router-link> |
    <router-link to="/feed">Mur de messages</router-link> |
    <router-link to="/message">Poster un message</router-link> |
  </nav>
</header>
     <router-view />
</template>

<script>
export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;800&display=swap');
* {
  font-family: 'Poppins', sans-serif;
  margin:0;
  padding: 0;
  box-sizing: border-box;
}


header {
  background-image: url("../src/assets/icon-left-font-monochrome-black.png");
	text-align: center;
	width: 100%;
	height: auto;
	background-size: cover;
	background-attachment: fixed;
	position: relative;
	border-radius: 5% 5% 5% 5%;
}
header .overlay{
	width: 100%;
	height: 100%;
	padding: 50px;
	color: #FFF;
	text-shadow: 1px 1px 1px #333;
  background-image: linear-gradient( 135deg, #9f05ff69 10%, #fd5e086b 100%);
	
}

header h1 {
	font-size: 80px;
	margin-bottom: 30px;
}

header h3, p {
	margin-bottom: 30px;
}
#app {
  max-width: 100%;
}
body {
  background-image: linear-gradient(62deg, #76CDCD 0%, #2CCED2 30%);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding:32px;
}
img {
  max-width: 100%;
  border-radius: 8px;
}
.card {
  max-width: 100%;
  width: 540px;
  background:white;
  border-radius: 16px;
  padding:32px;
}
.card__title {
  text-align:center;
  font-weight: 800;
}
.card__subtitle {
  text-align: center;
  color:#666;
  font-weight: 500;
}
  .button {
    background: #2196F3;
    color:white;
    border-radius: 8px;
    font-weight: 800;
    font-size: 15px;
    border: none;
    width: 100%;
    padding: 16px;
    transition: .4s background-color;
  }
  .card__action {
    color:#2196F3;
    text-decoration: underline;
  }
  .card__action:hover {
    cursor:pointer;
  }
  .button:hover {
    cursor:pointer;
    background: #1976D2;
  }
  .button--disabled {
    background:#cecece;
    color:#ececec
  }
  .button--disabled:hover {
    cursor:not-allowed;
    background:#cecece;
  }
</style>
