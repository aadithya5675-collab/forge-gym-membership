import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { PolicyDialog } from './components/ui/PolicyDialog';
import { HomePage } from './features/home/HomePage';
import { FacilitiesPage } from './features/facilities/FacilitiesPage';
import { ClassesPage } from './features/classes/ClassesPage';
import { TrainersPage } from './features/trainers/TrainersPage';
import { ContactPage } from './features/contact/ContactPage';
import { MembershipFlow } from './features/membership/MembershipFlow';
import { PageView } from './types/navigation';
import { PolicyModalType } from './types/membership';

const ease = [0.22, 1, 0.36, 1] as const;

export default function App() {
  const [activeView, setActiveView] = useState<PageView>('home');
  const [activePolicyModal, setActivePolicyModal] = useState<PolicyModalType>(null);

  // Sync state with URL hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageView;
      if (['home', 'facilities', 'classes', 'trainers', 'membership', 'contact'].includes(hash)) {
        setActiveView(hash);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (view: PageView) => {
    setActiveView(view);
    window.location.hash = view;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen w-full bg-[#070806] text-[#F3F5ED] font-sans antialiased flex flex-col justify-between">
      {/* Top Fixed Header Navbar */}
      <Navbar activeView={activeView} onNavigate={handleNavigate} />

      {/* Main Content Area */}
      <div className="pt-20 px-3 sm:px-6 lg:px-8 mx-auto w-full max-w-7xl flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease }}
          >
            {activeView === 'home' && <HomePage onNavigate={handleNavigate} />}
            {activeView === 'facilities' && <FacilitiesPage onNavigate={handleNavigate} />}
            {activeView === 'classes' && <ClassesPage onNavigate={handleNavigate} />}
            {activeView === 'trainers' && <TrainersPage onNavigate={handleNavigate} />}
            {activeView === 'membership' && <MembershipFlow />}
            {activeView === 'contact' && <ContactPage />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Site-Wide Footer */}
      <Footer onNavigate={handleNavigate} onOpenPolicy={(type) => setActivePolicyModal(type)} />

      {/* Site-Wide Policy Dialog */}
      <PolicyDialog
        type={activePolicyModal}
        onClose={() => setActivePolicyModal(null)}
      />
    </div>
  );
}
