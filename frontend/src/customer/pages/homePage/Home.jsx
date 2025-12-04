import React from 'react'
import MainCorousel from "../../components/AliceCorousel/MainCorousel"
import HomeSectionCorousel from '../../components/homeSectionCorousel/HomeSectionCorousel'
import {mens_kurta} from "../../Data/Men/Men_kurta" 
import Footer from '../../components/Footer/Footer'

const Home = () => {
  return (
    <div>
      <MainCorousel/>
      <div className='space-y-10 flex flex-col justify-center'>
        <HomeSectionCorousel data={mens_kurta} sectionName={"Men's Kurta"}/>
        <HomeSectionCorousel data={mens_kurta} sectionName={"Men's Shirt"}/>
        <HomeSectionCorousel data={mens_kurta} sectionName={"Men's T-shirt"}/>
        <HomeSectionCorousel data={mens_kurta} sectionName={"Men's Jeans"}/>
        <HomeSectionCorousel data={mens_kurta} sectionName={"Men's Shoes"}/>
        <Footer/>
      </div>
    </div>
  )
}

export default Home