import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../components/ui/button';

export default function TermsAndConditionsPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-center mb-8">Terms and Conditions</h1>
        <div className="prose prose-zinc mx-auto">
          <p>Last updated: August 26, 2025</p>
          <p>
            Please read these terms and conditions carefully before using Our Service.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Acknowledgment</h2>
          <p>
            These are the Terms and Conditions governing the use of this Service and the agreement that operates
            between You and the Company. These Terms and Conditions set out the rights and obligations of all users
            regarding the use of the Service.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Disclaimer</h2>
          <p>
            The Service is provided to You "AS IS" and "AS AVAILABLE" and with all faults and defects without warranty
            of any kind. To the maximum extent permitted under applicable law, the Company, on its own behalf and on
            behalf of its Affiliates and its and their respective licensors and service providers, expressly disclaims
            all warranties, whether express, implied, statutory or otherwise, with respect to the Service.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Changes to These Terms and Conditions</h2>
          <p>
            We reserve the right, at Our sole discretion, to modify or replace these Terms at any time. If a revision
            is material We will make reasonable efforts to provide at least 30 days' notice prior to any new terms
            taking effect. What constitutes a material change will be determined at Our sole discretion.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Contact Us</h2>
          <p>
            If you have any questions about these Terms and Conditions, You can contact us by visiting the About page
            on our website.
          </p>
        </div>
        <div className="text-center mt-8 flex justify-center gap-4">
          <Button onClick={() => navigate(-1)}>Back</Button>
          <Button asChild>
            <Link to="/">Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
