export const getDashboardStats = (language: 'en' | 'ar') => {
  if (language === 'ar') {
    return [
      { value: '1,234', trend: '+12% من الشهر الماضي' },
      { value: '42', trend: '+5 مشاريع جديدة' },
      { value: '87%', trend: '+3% هذا الأسبوع' },
      { value: '15', trend: '8 عاجلة' },
    ];
  }
  
  return [
    { value: '1,234', trend: '+12% from last month' },
    { value: '42', trend: '+5 new projects' },
    { value: '87%', trend: '+3% this week' },
    { value: '15', trend: '8 urgent' },
  ];
};

export const getRecentActivities = (language: 'en' | 'ar') => {
  if (language === 'ar') {
    return [
      {
        id: '1',
        title: 'تم إنشاء مشروع جديد',
        description: 'مشروع Mobile App UI',
        time: 'منذ ساعتين',
      },
      {
        id: '2',
        title: 'تم تحديث المهمة',
        description: 'مراجعة التصميم - مكتمل',
        time: 'منذ 5 ساعات',
      },
      {
        id: '3',
        title: 'عضو فريق جديد',
        description: 'أحمد انضم إلى الفريق',
        time: 'أمس',
      },
    ];
  }

  return [
    {
      id: '1',
      title: 'New project created',
      description: 'Mobile App UI project',
      time: '2 hours ago',
    },
    {
      id: '2',
      title: 'Task updated',
      description: 'Design review - Completed',
      time: '5 hours ago',
    },
    {
      id: '3',
      title: 'New team member',
      description: 'Ahmed joined the team',
      time: 'Yesterday',
    },
  ];
};
