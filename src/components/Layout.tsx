import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, MessageCircle, BookOpen, Bell, HelpCircle, Phone } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', icon: Home, label: 'Home', labelHindi: 'घर' },
    { path: '/chat', icon: MessageCircle, label: 'Chat', labelHindi: 'बात' },
    { path: '/learn', icon: BookOpen, label: 'Learn', labelHindi: 'सीखें' },
    { path: '/reminders', icon: Bell, label: 'Reminders', labelHindi: 'याद' },
    { path: '/help', icon: HelpCircle, label: 'Help', labelHindi: 'सहायता' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Main Content */}
      <main className="flex-1 pb-20">
        {children}
      </main>

      {/* Emergency Help Button */}
      <Link 
        to="/emergency" 
        className="emergency-help"
        aria-label="Emergency Help - Call ASHA Worker"
      >
        <Phone className="w-6 h-6" />
      </Link>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border px-2 py-2 z-40">
        <div className="flex justify-around items-center max-w-md mx-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center justify-center p-3 rounded-full transition-all touch-friendly ${
                  active 
                    ? 'bg-primary text-primary-foreground shadow-sm' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
                aria-label={`${item.label} - ${item.labelHindi}`}
              >
                <Icon className={`w-6 h-6 ${active ? 'scale-110' : ''}`} />
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default Layout;