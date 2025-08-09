import React, { useState } from 'react';
import RoleSelector from './components/RoleSelector';
import SignupScreen from './components/SignupScreen';
import GarageApp from './components/garage/GarageApp';
import AdminApp from './components/admin/AdminApp';
import Layout from './components/Layout';
import HomeScreen from './components/HomeScreen';
import DiagnosisScreen from './components/DiagnosisScreen';
import ServicesScreen from './components/ServicesScreen';
import ProfileScreen from './components/ProfileScreen';
import LiveChatScreen from './components/LiveChatScreen';
import DiagnosticTimelineScreen from './components/DiagnosticTimelineScreen';
import PredictiveMaintenanceScreen from './components/PredictiveMaintenanceScreen';
import LoyaltyProgramScreen from './components/LoyaltyProgramScreen';
import FleetManagementScreen from './components/FleetManagementScreen';
import WarrantyTrackingScreen from './components/WarrantyTrackingScreen';
import ServiceFinancingScreen from './components/ServiceFinancingScreen';
import CompletedJobsScreen from './components/CompletedJobsScreen';
import VehicleInspectionScreen from './components/VehicleInspectionScreen';
import AIDiagnosticsScreen from './components/AIDiagnosticsScreen';
import CheckoutScreen from './components/CheckoutScreen';
import { UserRole } from './types';

type AppState = 'role-selection' | 'signup' | 'main';
type MainTab = 'home' | 'diagnosis' | 'services' | 'profile';
type ProfileScreen = 'live-chat' | 'timeline' | 'predictive' | 'export' | 'loyalty' | 'fleet' | 'warranty' | 'financing' | 'completed-jobs' | 'ai-diagnostics';
type InspectionScreen = 'options' | 'booking';

function App() {
  const [appState, setAppState] = useState<AppState>('role-selection');
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [activeTab, setActiveTab] = useState<MainTab>('home');
  const [servicesAction, setServicesAction] = useState<string | undefined>();
  const [profileScreen, setProfileScreen] = useState<ProfileScreen | null>(null);
  const [showInspection, setShowInspection] = useState(false);
  const [inspectionScreen, setInspectionScreen] = useState<InspectionScreen>('options');
  const [inspectionType, setInspectionType] = useState<'visit-me' | 'visit-location' | null>(null);
  const [showAIDiagnostics, setShowAIDiagnostics] = useState(false);

  const handleRoleSelect = (role: UserRole) => {
    setUserRole(role);
    setAppState('signup');
  };

  const handleSignupComplete = () => {
    setAppState('main');
  };

  const handleTabChange = (tab: MainTab) => {
    setActiveTab(tab);
    setServicesAction(undefined);
    setProfileScreen(null);
    setShowInspection(false);
  };

  const handleNavigate = (tab: MainTab, action?: string) => {
    setActiveTab(tab);
    setServicesAction(action);
    setProfileScreen(null);
    setShowAIDiagnostics(false);
    if (action === 'vehicle-inspection') {
      setShowInspection(true);
      setInspectionScreen('options');
    } else if (action === 'ai-diagnostics') {
      setShowAIDiagnostics(true);
    }
  };

  const handleBack = () => {
    if (profileScreen) {
      setProfileScreen(null);
    } else if (showAIDiagnostics) {
      setShowAIDiagnostics(false);
    } else if (showInspection) {
      if (inspectionScreen === 'booking') {
        setInspectionScreen('options');
      } else {
        setShowInspection(false);
      }
    } else {
      setActiveTab('home');
      setServicesAction(undefined);
    }
  };

  const handleProfileNavigate = (screen: ProfileScreen) => {
    setProfileScreen(screen);
  };

  const handleInspectionSelect = (type: 'visit-me' | 'visit-location') => {
    setInspectionType(type);
    setInspectionScreen('booking');
  };

  const handleInspectionBack = () => {
    setInspectionScreen('options');
  };

  if (appState === 'role-selection') {
    return <RoleSelector onRoleSelect={handleRoleSelect} />;
  }

  if (appState === 'signup') {
    return <SignupScreen onComplete={handleSignupComplete} userRole={userRole} />;
  }

  // Role-based app rendering
  if (userRole === 'garage') {
    return <GarageApp />;
  }

  if (userRole === 'admin') {
    return <AdminApp />;
  }

  // Customer app (default)
  return (
    <Layout activeTab={activeTab} onTabChange={handleTabChange}>
      {showAIDiagnostics && (
        <AIDiagnosticsScreen onBack={handleBack} />
      )}
      {showInspection && (
        <VehicleInspectionScreen 
          screen={inspectionScreen}
          inspectionType={inspectionType}
          onBack={inspectionScreen === 'booking' ? handleInspectionBack : handleBack}
          onSelectType={handleInspectionSelect}
        />
      )}
      {profileScreen === 'completed-jobs' && (
        <CompletedJobsScreen onBack={handleBack} />
      )}
      {profileScreen === 'live-chat' && (
        <LiveChatScreen onBack={handleBack} />
      )}
      {profileScreen === 'timeline' && (
        <DiagnosticTimelineScreen onBack={handleBack} />
      )}
      {profileScreen === 'predictive' && (
        <PredictiveMaintenanceScreen onBack={handleBack} />
      )}
      {profileScreen === 'loyalty' && (
        <LoyaltyProgramScreen onBack={handleBack} />
      )}
      {profileScreen === 'fleet' && (
        <FleetManagementScreen onBack={handleBack} />
      )}
      {profileScreen === 'warranty' && (
        <WarrantyTrackingScreen onBack={handleBack} />
      )}
      {profileScreen === 'financing' && (
        <ServiceFinancingScreen onBack={handleBack} />
      )}
      {profileScreen === 'ai-diagnostics' && (
        <AIDiagnosticsScreen onBack={handleBack} />
      )}
      {!profileScreen && !showInspection && !showAIDiagnostics && activeTab === 'home' && (
        <HomeScreen onNavigate={handleNavigate} onProfileNavigate={handleProfileNavigate} />
      )}
      {!profileScreen && !showInspection && !showAIDiagnostics && activeTab === 'diagnosis' && (
        <DiagnosisScreen onBack={handleBack} onNavigate={handleNavigate} />
      )}
      {!profileScreen && !showInspection && !showAIDiagnostics && activeTab === 'services' && (
        <ServicesScreen onBack={handleBack} initialAction={servicesAction} />
      )}
      {!profileScreen && !showInspection && !showAIDiagnostics && activeTab === 'profile' && (
        <ProfileScreen onBack={handleBack} onNavigate={handleProfileNavigate} />
      )}
    </Layout>
  );
}

export default App;