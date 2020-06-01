import React from 'react';

import SettingsForm from 'Components/SettingsForm/SettingsForm.component';

import './HomePage.styles.scss';

const HomePage = () => {
  return (
    <section className="home-page">
      <h1>Home Page</h1>
      <SettingsForm />
    </section>
  );
};

export default HomePage;
