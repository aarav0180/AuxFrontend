import React from 'react';

export const TermsOfService: React.FC = () => {
  return (
    <div className="w-full h-full overflow-y-auto p-8 lg:p-16 pt-24">
      <div className="max-w-3xl mx-auto space-y-8 text-white/80">
        <h1 className="font-serif text-4xl lg:text-5xl text-white mb-8">Terms of Service</h1>
        
        <section className="space-y-4">
          <h2 className="text-2xl text-white font-medium">1. Acceptance of Terms</h2>
          <p>By accessing and using aux, you accept and agree to be bound by the terms and provision of this agreement.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl text-white font-medium">2. User Conduct</h2>
          <p>You agree not to use the service to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Upload or transmit any content that is unlawful, harmful, or objectionable.</li>
            <li>Disrupt or interfere with the security or use of the service.</li>
            <li>Harass or troll other users in the room.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl text-white font-medium">3. Content Ownership</h2>
          <p>We do not claim ownership of the music streamed. All rights belong to their respective owners. This service is a synchronization tool.</p>
        </section>
        
        <div className="pt-8 border-t border-white/10">
          <p className="text-sm text-white/40">Last updated: December 2025</p>
        </div>
      </div>
    </div>
  );
};
