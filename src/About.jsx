import React from "react";
import HeroSection from "./components/HeroSection";
import { useProductContext } from "./context/Productcontext";


const About = () => {
    const {myName} = useProductContext();

    const data ={
        name:"Ecommerce Shop",
    };

    return (
             <>
                {myName}
                <HeroSection myData={data}/>
             </>
           );
};

export default About;