import React from 'react'
import Navbar from '../Navbar/Navbar'
import Hero from '../Hero/Hero'
import WhyOurs from '../whyOurs/WhyOurs'
import OurPopularCourses from '../OurPopularCourses/OurPopularCourses'
import LookingFor from '../Looking/LookingFor'
import Faqs from '../Faq/Faqs'
import Footer from '../footer/Footer'

const Home = () => {
  return (
    <>
    <Hero />
    <WhyOurs />
    <OurPopularCourses heading='Our Popular Courses'/>
    <LookingFor />
    <Faqs />

    </>
  )
}

export default Home