import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Trophy, Users, Calendar, Target } from 'lucide-react';

export function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const features = [
    {
      icon: Trophy,
      title: "Tournament Format",
      description: "Multiple rounds of intense BGMI matches with custom room settings"
    },
    {
      icon: Users,
      title: "Team Size",
      description: "Squad matches (4 players per team) with substitute options"
    },
    {
      icon: Calendar,
      title: "Event Duration",
      description: "Two days of non-stop gaming action and excitement"
    },
    {
      icon: Target,
      title: "Skill Level",
      description: "Open to all skill levels, from beginners to pro players"
    }
  ];

  return (
    <section id="about" className="py-20 bg-black/40 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-6">About Sangam Battlefest</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Join us for the most exciting BGMI tournament of the year, hosted by the Technical Society
            of Sangam University. Experience intense battles, strategic gameplay, and amazing prizes!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-lg rounded-lg p-6 text-center hover:bg-white/10 transition-all duration-300"
            >
              <feature.icon className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}