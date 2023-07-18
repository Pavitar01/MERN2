import React from "react";
import "../css/footer.css"
import ProductList from "./categories/ProductList";
const Footer = () => {
  return (
    
    <div>
      <ProductList />

      <footer id="footer" class="footer-1">
        <div class="main-footer widgets-dark typo-light">
          <div class="container">
            <div class="row" style={{padding:"20px"}}>
              <div class="col-xs-12 col-sm-6 col-md-3">
                <div class="widget subscribe no-box">
                  <h5 class="widget-title">
                    Shopo.in<span></span>
                  </h5>
                  <p style={{textAlign:"left"}}>Shopo, The one of the best brand for shopping <br/>
                  Best for clothing and Beauty Products </p>
                </div>
              </div>

              <div class="col-xs-12 col-sm-6 col-md-3">
                <div class="widget no-box">
                  <h5 class="widget-title">
                    Quick Links<span></span>
                  </h5>
                  <ul class="thumbnail-widget">
                    <li>
                      <div class="thumb-content">
                        <a href="#.">Get Started</a>
                      </div>
                    </li>
                    <li>
                      <div class="thumb-content">
                        <a href="#.">Top Leaders</a>
                      </div>
                    </li>
                    <li>
                      <div class="thumb-content">
                        <a href="#.">Success Stories</a>
                      </div>
                    </li>
                    <li>
                      <div class="thumb-content">
                        <a href="#.">Event/Tickets</a>
                      </div>
                    </li>
                    <li>
                      <div class="thumb-content">
                        <a href="#.">News</a>
                      </div>
                    </li>
                    <li>
                      <div class="thumb-content">
                        <a href="#.">Lifestyle</a>
                      </div>
                    </li>
                    <li>
                      <div class="thumb-content">
                        <a href="#.">About</a>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div class="col-xs-12 col-sm-6 col-md-3">
                <div class="widget no-box">
                  <h5 class="widget-title">
                    Get Started<span></span>
                  </h5>
                  <p style={{textAlign:"left",marginBottom:"20px"}}>Get access to our all cloths realted, electrical related,beauty realted and many more category products </p>
                  <a class="btn" href="" target="_blank">
                    Subscribe Now
                  </a>
                </div>
              </div>

              <div class="col-xs-12 col-sm-6 col-md-3">
                <div class="widget no-box">
                  <h5 class="widget-title">
                    Contact Us<span></span>
                  </h5>

                  <p style={{textAlign:"left",flexDirection:"column"}}>
                    <a href="mailto:info@domain.com" title="glorythemes" style={{color:"white"}} >
                    <i class="fa-solid fa-envelope"></i>&nbsp; Shopoinfo@zenmonk.tech
                    </a>
                 
                  </p>
                  <p style={{textAlign:"left",gap:"20px",display:"flex",fontSize:"20px"}}>
                  <i class="fa-brands fa-facebook"></i>
                  <i class="fa-brands fa-instagram"></i>
                  <i class="fa-brands fa-github"></i>
                 
                  </p>
             
                  <ul class="social-footer2"></ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="footer-copyright">
          <div class="container">
            <div class="row">
              <div class="col-md-12 text-center">
                <p>Copyright Company Name © 2022. All rights reserved.</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
