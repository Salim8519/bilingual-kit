export const getActivities = (language: 'en' | 'ar') => {
  const activities = {
    en: [
      {
        title: 'New user registered',
        description: 'John Doe joined the platform',
        time: '2 hours ago',
      },
      {
        title: 'Project completed',
        description: 'Website redesign project marked as complete',
        time: '5 hours ago',
      },
      {
        title: 'Task assigned',
        description: 'New task assigned to development team',
        time: '1 day ago',
      },
    ],
    ar: [
      {
        title: 'مستخدم جديد مسجل',
        description: 'انضم جون دو إلى المنصة',
        time: 'منذ ساعتين',
      },
      {
        title: 'اكتمل المشروع',
        description: 'تم وضع علامة على مشروع إعادة تصميم الموقع كمكتمل',
        time: 'منذ 5 ساعات',
      },
      {
        title: 'تم تعيين المهمة',
        description: 'تم تعيين مهمة جديدة لفريق التطوير',
        time: 'منذ يوم واحد',
      },
    ],
  };

  return activities[language];
};
