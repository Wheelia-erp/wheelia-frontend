import { SignupWizard } from '@/components/signup/SignupWizard';
import Image from 'next/image';

export default function SignupPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="fixed top-0 left-0 right-0 z-30 h-16 flex justify-between items-center px-6 bg-[#1E293B] text-white shadow">
        <div className="flex items-left space-x-2">
          <Image
            src="/logo-wheelia.svg"
            alt="Wheelia"
            height={32}
            width={180}
            priority
          />
        </div>        
      </div> 
      <SignupWizard />
    </main>
  );
}
