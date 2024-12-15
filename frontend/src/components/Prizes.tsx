import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Trophy, Gift, Medal } from 'lucide-react';

export function Prizes() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const prizes = [
    {
      position: "1st",
      amount: "₹5100/-",
      icon: Trophy,
      color: "from-yellow-500 to-amber-500"
    },
    {
      position: "2nd",
      amount: "₹3100/-",
      icon: Medal,
      color: "from-gray-300 to-gray-400"
    },
    {
      position: "3rd",
      amount: "₹2100/-",
      icon: Gift,
      color: "from-amber-700 to-amber-800"
    }
  ];

  return (
    <section id="prizes" className="py-20 bg-black/40 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-6">Prize Pool</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Compete for glory and amazing prizes! Total prize pool worth ₹10,300
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {prizes.map((prize, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group"
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${prize.color} rounded-lg blur opacity-50 group-hover:opacity-75 transition-opacity`}></div>
              <div className="relative bg-black/50 backdrop-blur-sm rounded-lg p-8 text-center border border-white/10">
                <prize.icon className="w-16 h-16 mx-auto mb-4 text-white" />
                <h3 className="text-2xl font-bold text-white mb-2">{prize.position} Position</h3>
                <p className="text-4xl font-bold text-green-500 mb-4">{prize.amount}</p>
                <p className="text-gray-300">+ Special Gifts</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}