import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto py-6 px-4 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} EraCalc. All rights reserved.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground">
            About
          </Link>
          <Link to="/privacy-policy" className="text-sm text-muted-foreground hover:text-foreground">
            Privacy Policy
          </Link>
          <Link to="/terms-and-conditions" className="text-sm text-muted-foreground hover:text-foreground">
            Terms & Conditions
          </Link>
        </div>
      </div>
    </footer>
  );
}
