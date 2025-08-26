import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../components/ui/button';

export default function PrivacyPolicyPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-center mb-8">Privacy Policy</h1>
        <div className="prose prose-zinc mx-auto">
          <p>Last updated: August 26, 2025</p>
          <p>
            This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your
            information when You use the Service and tells You about Your privacy rights and how the law protects You.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Interpretation and Definitions</h2>
          <h3 className="text-xl font-bold mt-4 mb-2">Interpretation</h3>
          <p>
            The words of which the initial letter is capitalized have meanings defined under the following conditions.
            The following definitions shall have the same meaning regardless of whether they appear in singular or in
            plural.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Collecting and Using Your Personal Data</h2>
          <p>
            We do not collect any personally identifiable information from our users. All calculations are performed
            client-side, and we do not store any data you enter.
          </p>
          <p>
            We use local storage to save your last used conversion rate for your convenience. This data is stored only
            on your browser and is not transmitted to our servers.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Third-Party Services</h2>
          <p>
            We may use third-party services such as Google AdSense to serve ads. These services may use cookies to
            serve ads based on a user's prior visits to your website or other websites.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Changes to this Privacy Policy</h2>
          <p>
            We may update Our Privacy Policy from time to time. We will notify You of any changes by posting the new
            Privacy Policy on this page.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, You can contact us by visiting the About page on our
            website.
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
