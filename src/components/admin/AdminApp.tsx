import React, { useState } from 'react';
import AdminDashboard from './AdminDashboard';
import UsersManagement from './UsersManagement';
import GaragesManagement from './GaragesManagement';
import DiagnosticReportsScreen from './DiagnosticReportsScreen';
import AdminLayout from './AdminLayout';

type AdminTab = 'dashboard' | 'users' | 'garages' | 'reports';

export default function AdminApp() {
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');

  const handleTabChange = (tab: AdminTab) => {
    setActiveTab(tab);
  };

  return (
    <AdminLayout activeTab={activeTab} onTabChange={handleTabChange}>
      {activeTab === 'dashboard' && <AdminDashboard />}
      {activeTab === 'users' && <UsersManagement />}
      {activeTab === 'garages' && <GaragesManagement />}
      {activeTab === 'reports' && <DiagnosticReportsScreen />}
    </AdminLayout>
  );
}