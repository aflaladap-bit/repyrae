import React, { useState } from 'react';
import GarageDashboard from './GarageDashboard';
import ServiceRequestsScreen from './ServiceRequestsScreen';
import GarageProfileScreen from './GarageProfileScreen';
import GarageLayout from './GarageLayout';

type GarageTab = 'dashboard' | 'requests' | 'profile';

export default function GarageApp() {
  const [activeTab, setActiveTab] = useState<GarageTab>('dashboard');

  const handleTabChange = (tab: GarageTab) => {
    setActiveTab(tab);
  };

  return (
    <GarageLayout activeTab={activeTab} onTabChange={handleTabChange}>
      {activeTab === 'dashboard' && <GarageDashboard />}
      {activeTab === 'requests' && <ServiceRequestsScreen />}
      {activeTab === 'profile' && <GarageProfileScreen />}
    </GarageLayout>
  );
}