import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeaturedItems from '@/components/FeaturedItems';
import AboutSection from '@/components/AboutSection';
import LocationsSection from '@/components/LocationsSection';
import Testimonials from '@/components/Testimonials';
import ContactSection from '@/components/ContactSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import GoogleSignInModal from '@/components/GoogleSignInModal'; 
import AOS from 'aos';
import 'aos/dist/aos.css';
import OffersSection from '@/components/OffersSection';

const Index = () => {
  const [showSignIn, setShowSignIn] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease',
    });
  }, []);

  return (
    <div className="min-h-screen relative">
      <Navbar onSignInClick={() => setShowSignIn(true)} />
      <Hero />
      <OffersSection/>
      <FeaturedItems />
      <AboutSection />
      <LocationsSection />
      <Testimonials />
      <CTASection />
      <ContactSection />
      <Footer />

      <GoogleSignInModal
        isOpen={showSignIn}
        onClose={() => setShowSignIn(false)}
      />
    </div>
  );
};

export default Index;
