import Hero from '@/components/home/Hero';
import About from '@/components/home/About';
import Featured from '@/components/home/Featured';
import Contact from '@/components/home/Contact';

/**
 * Home Page - Landing page with hero, about, featured items, and contact
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Featured />
      <Contact />
    </>
  );
}
