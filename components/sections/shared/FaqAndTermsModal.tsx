
import React, { useState } from 'react';
import Accordion from '../../ui/Accordion';

const faqData = [
  {
    question: 'What is this platform?',
    answer: 'This is the Pomegranate Trade Dashboard, a comprehensive web application providing insights into pomegranate market trends, trade data, and seasonality. All data presented is simulated for demonstration purposes.',
  },
  {
    question: 'How accurate are the price updates?',
    answer: 'The prices displayed are simulated and updated frequently to mimic a real-time market environment. They are for demonstration purposes only and should not be used for actual trading decisions.',
  },
  {
    question: 'How often is the data updated?',
    answer: 'Different data points have different update frequencies. Market prices may update every few minutes, while trade volume data is updated less frequently. All updates are simulated.',
  },
  {
    question: 'Which countries are covered?',
    answer: 'We track data from key pomegranate exporting and importing countries, including but not limited to Turkey, India, USA, Spain, Peru, Germany, and the Netherlands.',
  },
  {
    question: 'Can I use this data for real trading?',
    answer: 'No. The data on this platform is entirely simulated and intended for demonstration purposes only. It does not represent real market data and should not be used for any financial or trading decisions.',
  },
  {
    question: 'How do I contact support?',
    answer: 'For inquiries, feedback, or support, please use the "Early Access" form to get in touch with our team. We\'re eager to hear from you!',
  },
];

const FaqContent = () => (
  <div>
    <h3 className="text-lg font-semibold text-gray-800 mb-4">Frequently Asked Questions</h3>
    {faqData.map((item) => (
      <Accordion key={item.question} title={item.question}>
        {item.answer}
      </Accordion>
    ))}
  </div>
);

const TermsContent = () => (
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Terms of Use</h3>
      <div className="prose prose-sm max-w-none text-gray-600 space-y-4 prose-a:text-gray-800 hover:prose-a:underline">
        <p>Welcome to the Pomegranate Trade Dashboard. By accessing or using our service, you agree to be bound by these terms. If you disagree with any part of the terms, then you may not access the service.</p>
        
        <h4>1. Service Purpose</h4>
        <p>The service and all its content, including but not limited to data, charts, and articles, are provided for informational and demonstration purposes only. The data is simulated and not intended for real-world application, financial advice, or trading decisions.</p>

        <h4>2. Accuracy of Information</h4>
        <p>While we strive to provide realistic simulated data, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose. Any reliance you place on such information is therefore strictly at your own risk.</p>

        <h4>3. Intellectual Property</h4>
        <p>The service and its original content, features, and functionality are and will remain the exclusive property of the Pomegranate Trade Dashboard and its licensors. The service is protected by copyright, trademark, and other laws of both the United States and foreign countries.</p>
        
        <h4>4. Limitation of Liability</h4>
        <p>In no event will we be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this website.</p>
      </div>
    </div>
  );


const FaqAndTermsModal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'faq' | 'terms'>('faq');

  return (
    <div>
      <div className="p-1 bg-gray-100 rounded-lg flex space-x-1 mb-8">
        <button
          onClick={() => setActiveTab('faq')}
          className={`w-full py-2 text-sm font-medium rounded-md transition-colors focus:outline-none ${
            activeTab === 'faq'
              ? 'bg-white text-gray-800 shadow-sm border border-gray-200'
              : 'bg-transparent text-gray-600 hover:bg-gray-200'
          }`}
        >
          FAQ
        </button>
        <button
          onClick={() => setActiveTab('terms')}
          className={`w-full py-2 text-sm font-medium rounded-md transition-colors focus:outline-none ${
            activeTab === 'terms'
              ? 'bg-white text-gray-800 shadow-sm border border-gray-200'
              : 'bg-transparent text-gray-600 hover:bg-gray-200'
          }`}
        >
          Terms of Use
        </button>
      </div>

      {activeTab === 'faq' ? <FaqContent /> : <TermsContent />}
    </div>
  );
};

export default FaqAndTermsModal;
