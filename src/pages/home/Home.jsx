import Featured from "../../components/featured/Featured";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import PropertyList from "../../components/propertyList/PropertyList";
import "./home.css";
import React from "react";

const Home = () => {
  return (
    <div className="home-page">
      <Navbar />
      <Header/>
      <div className="homeContainer">
        <section className="featured-section">
          <h2 className="section-title">Discover Amazing Destinations</h2>
          <p className="section-description">Explore our handpicked selection of stunning locations</p>
          <Featured/>
        </section>
        <section className="property-types-section">
          <h2 className="section-title">Find Your Perfect Stay</h2>
          <p className="section-description">Browse through a variety of accommodation options</p>
          <PropertyList/>
        </section>
        <section className="loved-homes-section">
          <h2 className="section-title">Top-Rated Guest Favorites</h2>
          <p className="section-description">Experience the comfort of our most beloved properties</p>
          <FeaturedProperties/>
        </section>
        <section className="newsletter-section">
          <h2 className="section-title">Stay Updated</h2>
          <p className="section-description">Subscribe to our newsletter for exclusive deals and travel tips</p>
          <MailList/>
        </section>
        <Footer/>
      </div>
    </div>
  );
};

export default Home;