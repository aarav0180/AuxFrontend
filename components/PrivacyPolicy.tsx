import React from 'react';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="w-full h-full overflow-y-auto p-8 lg:p-16 pt-24">
      <div className="max-w-3xl mx-auto space-y-8 text-white/80">
        <h1 className="font-serif text-4xl lg:text-5xl text-white mb-8">Privacy Policy</h1>
        
        <section className="space-y-4">
          <h2 className="text-2xl text-white font-medium">1. Information We Collect</h2>
          <p>We collect minimal information necessary to provide our service. This includes:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Temporary session data</li>
            <li>Songs added to the queue</li>
            <li>Usernames provided for the session</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl text-white font-medium">2. How We Use Your Information</h2>
          <p>Your information is used solely for the purpose of synchronizing music playback and managing the collaborative queue within your room.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl text-white font-medium">3. Data Retention</h2>
          <p>Room data is ephemeral and is deleted once the room is closed or inactive for a certain period.</p>
        </section>
        
        <div className="pt-8 border-t border-white/10">
          <p className="text-sm text-white/40">Last updated: December 2025</p>
        </div>
      </div>
    </div>
  );
};
