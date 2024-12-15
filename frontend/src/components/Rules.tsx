import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function Rules() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const rules = [
    {
      title: "General Rules",
      content: [
        "All players must be registered with their original BGMI IDs",
        "Teams must join the custom room 15 minutes before match time",
        "Use of any hacks or cheats will result in immediate disqualification",
        "Tournament officials' decisions are final"
      ]
    },
    {
      title: "Match Rules",
      content: [
        "Classic Erangel Map",
        "Squad matches only (4 players)",
        "Maximum of 25 teams per match",
        "Points system: Kills (1 point each) + Position points"
      ]
    },
    {
      title: "Scoring System",
      content: [
        "Winner Winner Chicken Dinner: 15 points",
        "2nd Place: 12 points",
        "3rd Place: 10 points",
        "4th-5th Place: 8 points",
        "6th-10th Place: 5 points"
      ]
    },
    {
      title: "Fair Play",
      content: [
        "No teaming with other squads",
        "No use of glitches or exploits",
        "Maintain sportsmanship throughout the tournament",
        "Report suspicious behavior to admins"
      ]
    }
  ];

  return (
    <section id="rules" className="py-20 bg-gradient-to-b from-black/40 to-black/60 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-6">Rules & Guidelines</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Please read and understand all rules carefully. Violation of any rules may result in
            disqualification from the tournament.
          </p>
          <Button
            variant="outline"
            className="bg-green-500 hover:bg-green-600 text-white border-none mt-5"
            onClick={() => window.open('/rulebook.pdf', '_blank')}
          >
            <FileText className="mr-2 h-4 w-4" />
            View Complete Rulebook
          </Button>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {rules.map((rule, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <AccordionItem value={`item-${index}`} className="bg-white/5 backdrop-blur-lg rounded-lg border-none">
                  <AccordionTrigger className="px-6 py-4 text-white hover:text-green-500 transition-colors">
                    {rule.title}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <ul className="list-disc list-inside text-gray-300 space-y-2">
                      {rule.content.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}