  <!-- Site footer -->
    <template>
    <footer class="site-footer">
      <div class="container">
        <div class="row">
          <div class="col-sm-12 col-md-6">
            <h6>A propos</h6>
            <p>Bienvenue sur le réseau social de Groupomania</p>
          </div>

          <div class="liens">
            <h6>Categories</h6>
            <ul class="footer-links">
              <li><a href="" onclick="return false;">Site web</a></li>
              <li><a href="" onclick="return false;">Rejoignez-nous</a></li>
              <li><a href="" onclick="return false;">Nos partenaires</a></li>
            </ul>
          </div>
        </div>
        <hr>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-md-8 col-sm-6 col-xs-12">
            <p class="copyright-text">Copyright © 2021 All Rights Reserved by Groupomania</p>
          </div>
        </div>
      </div>
</footer>
</template>

<style lang="scss">
@import "src/scss/_variables.scss";

.site-footer
{
  background-color: $header-color;
  padding: 10px;
  width: 100%;
  font-size:15px;
  color: white;
  border-radius: 16px;;
  text-align: center;
  box-shadow: 2px 2px 5px black;
 .footer-links a {
    text-decoration: none;
    color: white;
  }
}
.site-footer hr
{
  border-top-color:#bbb;
  opacity:0.5;
  margin: 1em;
}
.site-footer h6
{
  color:#fff;
  font-size:16px;
  text-transform:uppercase;
  margin-top:5px;
  letter-spacing:2px;
  text-shadow: 1px 1px 1px #333;
}
.site-footer a:hover
{
  color:#3366cc;
  text-decoration:none;
}
.footer-links li
{
  display:block
}
.footer-links a:active,.footer-links a:focus,.footer-links a:hover
{
  color:#3366cc;
  text-decoration:none;
}
.copyright-text
{
  margin:0
}
@media (max-width:991px)
{
  .site-footer [class^=col-]
  {
    margin-bottom:30px
  }
}
@media (max-width:767px)
{
  .site-footer
  {
    padding-bottom:0
  }
}
</style>