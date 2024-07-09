
import Header from './Header';
import Hero from './Hero';
import Clients from './Clients';
import Features from './Features';
import Testimonials from './Testimonials';
import FAQ from './FAQ';
import Footer from './Footer';

export default function LandingPage() {
  return (
    <div className='bg-white dark:text-white dark:bg-boxdark-2'>
      <Header></Header>
      <main className='isolate dark:bg-boxdark-2'>
        <Hero></Hero>
        <Clients></Clients>
        <Features></Features>
        <Testimonials></Testimonials>
        <FAQ></FAQ>
      </main>
      <Footer></Footer>
    </div>
  );
}