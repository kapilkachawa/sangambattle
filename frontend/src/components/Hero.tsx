// import { Button } from '@/components/ui/button';
// import { motion } from 'framer-motion';

// export function Hero() {
//   return (
//     <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
//       {/* Background Image */}
//       <div
//         className="absolute inset-0 bg-cover bg-center bg-no-repeat"
//         style={{
//           backgroundImage: 'url("https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80")',
//         }}
//       >
//         <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
//       </div>

//       {/* Content */}
//       <div className="relative z-10 text-center text-white px-4">
//         <motion.img
//           src="/logo.png"
//           alt="Sangam Battlefest Logo"
//           className="w-48 h-48 mx-auto mb-8"
//           initial={{ scale: 0 }}
//           animate={{ scale: 1 }}
//           transition={{ duration: 0.5 }}
//         />

//         <motion.h1
//           className="text-5xl md:text-7xl font-bold mb-4"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2 }}
//         >
//           Sangam Battlefest
//         </motion.h1>

//         <motion.p
//           className="text-xl md:text-2xl mb-8 text-gray-300"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.4 }}
//         >
//           Join the Ultimate BGMI Tournament
//         </motion.p>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.6 }}
//         >
//           <Button
//             size="lg"
//             className="bg-green-500 text-white hover:bg-green-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-green-500/50"
//             onClick={() => document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' })}
//           >
//             Register Now
//           </Button>
//         </motion.div>
//       </div>

//       {/* Scroll Indicator */}
//       <motion.div
//         className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
//         animate={{ y: [0, 10, 0] }}
//         transition={{ repeat: Infinity, duration: 1.5 }}
//       >
//         <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
//           <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
//         </div>
//       </motion.div>
//     </section>
//   );
// }

import { useState } from 'react'; // Import useState from React
import { Button } from '@/components/ui/button';
import { Register } from './Register'; // Import the modal
import { motion } from 'framer-motion';

export function Hero() {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  return (

    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4">
        <motion.img
          src="/logo.png"
          alt="Sangam Battlefest Logo"
          className="w-48 h-48 mx-auto mb-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        />

        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Sangam Battlefest
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl mb-8 text-gray-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Join the Ultimate BGMI Tournament
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Button
            variant="outline"
            className="bg-green-500 text-white hover:bg-green-600"
            onClick={() => setIsRegisterModalOpen(true)}
          >
            Register Now
          </Button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
        </div>
      </motion.div>


      {/* Register Modal */}
      <Register isOpen={isRegisterModalOpen} onClose={() => setIsRegisterModalOpen(false)} />
    </section>
  );
}
