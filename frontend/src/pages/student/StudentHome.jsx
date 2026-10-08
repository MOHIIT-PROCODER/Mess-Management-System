import React from 'react';
import { WelcomeCard } from '../../components/student/dashboard/WelcomeCard';
import { TodayMenu } from '../../components/student/dashboard/TodayMenu';
import { AttendanceSummary } from '../../components/student/dashboard/AttendanceSummary';
import { StreakCard } from '../../components/student/dashboard/StreakCard';
import { TrophyCard } from '../../components/student/dashboard/TrophyCard';
import { useMenu } from '../../hooks/useMenu';

export const StudentHome = () => {
  const { todayMenu } = useMenu('a1b2c3d4-0000-0000-0000-000000000001');

  return (
    <div className="space-y-6">
      <WelcomeCard />
      <StreakCard />
      <TodayMenu menuItems={todayMenu} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AttendanceSummary />
        <TrophyCard />
      </div>
    </div>
  );
};
