import React from 'react';

const CustomerPrivacyPolicy = () => {
  return (
    <div style={{
      fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
      lineHeight: 1.6,
      color: '#333',
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px'
    }}>
      <header style={{
        textAlign: 'center',
        marginBottom: '30px',
        borderBottom: '2px solid #f0f0f0',
        paddingBottom: '20px'
      }}>
        <h1 style={{ color: '#2c3e50' }}>Gowmoo Privacy Policy</h1>
        <div style={{ fontStyle: 'italic', color: '#7f8c8d', textAlign: 'right' }}>
          Effective Date: April 15, 2025
        </div>
      </header>

      <section>
        <p>
          Gowmoo ("we", "our", or "us") is committed to protecting your privacy.
          This Privacy Policy describes how we collect, use, and disclose your
          personal information.
        </p>
      </section>

      <section>
        <h2 style={{ color: '#3498db', marginTop: '25px', borderBottom: '1px solid #eee', paddingBottom: '5px' }}>
          Information We Collect
        </h2>
        <ul style={{ paddingLeft: '20px' }}>
          <li>Name, Phone Number, Alternate Number</li>
          <li>Address or Location</li>
          <li>Analytics data (via Google Analytics)</li>
          <li>Payment details (via Razorpay)</li>
        </ul>
      </section>

      <section>
        <h2 style={{ color: '#3498db', marginTop: '25px', borderBottom: '1px solid #eee', paddingBottom: '5px' }}>
          How We Use Your Information
        </h2>
        <ul style={{ paddingLeft: '20px' }}>
          <li>To provide and manage your daily/alternate milk delivery service</li>
          <li>To process wallet-based subscription payments</li>
          <li>To communicate with you for support or updates</li>
          <li>For internal analytics and improvement</li>
        </ul>
      </section>

      <section>
        <h2 style={{ color: '#3498db', marginTop: '25px', borderBottom: '1px solid #eee', paddingBottom: '5px' }}>
          Data Sharing
        </h2>
        <p>We may share your information with:</p>
        <ul style={{ paddingLeft: '20px' }}>
          <li>Razorpay (for payment processing)</li>
          <li>Google Cloud (infrastructure hosting)</li>
          <li>Google Analytics (app usage data collection)</li>
        </ul>
      </section>

      <section>
        <h2 style={{ color: '#3498db', marginTop: '25px', borderBottom: '1px solid #eee', paddingBottom: '5px' }}>
          Security
        </h2>
        <p>
          We store data securely on Google Cloud and follow industry standards to
          protect it.
        </p>
      </section>

      <section>
        <h2 style={{ color: '#3498db', marginTop: '25px', borderBottom: '1px solid #eee', paddingBottom: '5px' }}>
          Your Rights
        </h2>
        <p>
          You may request deletion or modification of your personal data by
          contacting us at
          <a href="mailto:support@freshmoo.in">support@freshmoo.in</a>.
        </p>
      </section>

      <section style={{
        backgroundColor: '#f9f9f9',
        padding: '15px',
        borderRadius: '5px',
        marginTop: '20px'
      }}>
        <h2 style={{ color: '#3498db', marginTop: '25px', borderBottom: '1px solid #eee', paddingBottom: '5px' }}>
          Contact Us
        </h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us
          at:
        </p>
        <p>Email: <a href="mailto:support@freshmoo.in">support@freshmoo.in</a></p>
        <p>Phone: <a href="tel:9392049966">9392049966</a></p>
      </section>

      <footer style={{
        textAlign: 'center',
        marginTop: '40px',
        paddingTop: '20px',
        borderTop: '2px solid #f0f0f0',
        color: '#7f8c8d',
        fontSize: '0.9em'
      }}>
        <p>&copy; 2025 Gowmoo. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default CustomerPrivacyPolicy;