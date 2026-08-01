import BecomeFarmer from "../../components/HomeComponent/becomeFarmer/BecomeFarmer";
import Categories from "../../components/HomeComponent/Categories/Categories";
import FeaturedCrops from "../../components/HomeComponent/FeaturedProducts/FeaturedProducts";
import Hero from "../../components/HomeComponent/Hero";
import HowItWorks from "../../components/HomeComponent/HowItWorks/HowItWorks";
import Newsletter from "../../components/HomeComponent/newsletter/Newsletter";
import OurImpact from "../../components/HomeComponent/our-impact/OurImpact";
import Testimonials from "../../components/HomeComponent/testimonials/Testimonials";
import WhyChoose from "../../components/HomeComponent/WhyChoose/WhyChoose";

const Home = () => {
    return (
        <div>
            <Hero></Hero>
            <Categories></Categories>
            <FeaturedCrops></FeaturedCrops>
            <WhyChoose></WhyChoose>
            <HowItWorks></HowItWorks>
            <OurImpact></OurImpact>
            <Testimonials></Testimonials>
            <BecomeFarmer></BecomeFarmer>
            <Newsletter></Newsletter>
        </div>
    );
};

export default Home;