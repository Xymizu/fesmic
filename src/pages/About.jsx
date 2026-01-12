import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const About = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-[1200px] mx-auto px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4">About Fesmic</h1>
          <div className="w-24 h-1.5 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto rounded-full" />
        </div>

        <div className="space-y-8 text-white/80">
          <section>
            <h2 className="text-3xl font-bold text-white mb-4">Who We Are</h2>
            <p className="text-lg leading-relaxed">
              Fesmic is your premier destination for discovering and booking
              tickets to the most exciting music events and festivals. We
              connect music lovers with unforgettable live experiences, from
              intimate concerts to massive music festivals.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-lg leading-relaxed">
              Our mission is to make live music accessible to everyone. We
              strive to provide a seamless ticket booking experience while
              showcasing the best events happening around you. Whether you're
              into rock, pop, electronic, or jazz, we've got something for every
              music enthusiast.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-white mb-4">
              Why Choose Fesmic?
            </h2>
            <ul className="space-y-3 text-lg">
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">✓</span>
                <span>Easy and secure ticket booking process</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">✓</span>
                <span>Wide selection of events across multiple genres</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">✓</span>
                <span>Real-time event updates and notifications</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">✓</span>
                <span>Digital e-tickets for convenient access</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">✓</span>
                <span>Customer support ready to help</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-white mb-4">
              Join the Community
            </h2>
            <p className="text-lg leading-relaxed">
              Join thousands of music lovers who trust Fesmic to discover their
              next favorite event. Follow us on social media to stay updated
              with the latest events and exclusive offers.
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;
