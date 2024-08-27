import { Card, CardContent } from "@/components/ui/card";

const AboutUs = () => {
  return (
    <div className="bg-[#49674a] mt-40 md:mt-0 text-white py-16">
      {/* Our Mission Section */}
      <div className="container mx-auto px-6 mb-16">
        <h2 className="text-4xl font-bold mb-4 text-center">Our Mission</h2>
        <p className="text-lg leading-relaxed text-center max-w-2xl mx-auto">
          Our mission is to empower our clients by providing innovative
          solutions that drive growth and success. We are committed to
          excellence, integrity, and continuous improvement in all that we do.
        </p>
      </div>

      {/* Meet the Team Section */}
      <div className="container mx-auto px-6 mb-16">
        <h2 className="text-4xl font-bold mb-8 text-center">Meet the Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Team Member 1 */}
          <Card className="bg-[#c8d1c9] shadow-lg">
            <CardContent>
              <img
                src="https://i.ibb.co/nQgzmys/photo-1506277886164-e25aa3f4ef7f.jpg"
                alt="Mik "
                // size="lg"
                className="mb-4 mt-5 w-16 h-16  rounded-full mx-auto"
              />
              <h3 className="text-xl font-semibold text-center">Mik Roy</h3>
              <p className="text-sm text-center">CEO & Founder</p>
              <p className="text-sm text-center mt-2">
                John has over 20 years of experience in the industry and is the
                visionary behind our company. He is passionate about driving
                innovation and excellence.
              </p>
            </CardContent>
          </Card>

          {/* Team Member 2 */}
          <Card className="bg-[#c8d1c9] shadow-lg">
            <CardContent>
              <img
                src="https://i.ibb.co/yFVRZLv/young-beautiful-girl-posing-black-leather-jacket-park-1153-8104.jpg"
                alt="Kaushani"
                className="mb-4 mt-5 w-16 h-16  rounded-full mx-auto"
              />
              <h3 className="text-xl font-semibold text-center">
                {" "}
                Kaushani Chowdhury
              </h3>
              <p className="text-sm text-center">Chief Operations Officer</p>
              <p className="text-sm text-center mt-2">
                Jane oversees our operations with a focus on efficiency and
                client satisfaction. Her leadership ensures that our projects
                are delivered on time and to the highest standards.
              </p>
            </CardContent>
          </Card>

          {/* Team Member 3 */}
          <Card className="bg-[#c8d1c9] shadow-lg">
            <CardContent>
              <img
                src="https://i.ibb.co/2MTGttP/photo-1618306842557-a2515acf2112.jpg"
                alt="ARC"
                className="mb-4 mt-5 w-16 h-16  rounded-full mx-auto"
              />
              <h3 className="text-xl font-semibold text-center">Sanu Singha</h3>
              <p className="text-sm text-center">Chief Technology Officer</p>
              <p className="text-sm text-center mt-2">
                Mike leads our technology team with a focus on innovation and
                quality. His expertise in software development drives our
                technical excellence.
              </p>
            </CardContent>
          </Card>

          {/* Add more team members here as needed */}
        </div>
      </div>

      {/* Our Story Section */}
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold mb-4 text-center">Our Story</h2>
        <p className="text-base leading-relaxed text-center max-w-2xl mx-auto">
          Our story began in 2010 when a group of passionate professionals came
          together to create something extraordinary. Since then, we have grown
          into a leading company in our industry, achieving milestones and
          making a positive impact on our clients and the community. We continue
          to evolve and innovate, driven by our commitment to excellence and our
          desire to make a difference.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
