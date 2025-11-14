export const getHistoryItems = (language: 'en' | 'ar', filter: string) => {
  const allItems = {
    en: [
      {
        type: 'U',
        title: 'User Account Created',
        description: 'New user account was successfully created',
        timestamp: '2 hours ago',
      },
      {
        type: 'P',
        title: 'Project Updated',
        description: 'Marketing campaign project status changed',
        timestamp: '5 hours ago',
      },
      {
        type: 'T',
        title: 'Task Completed',
        description: 'Design review task marked as complete',
        timestamp: '1 day ago',
      },
      {
        type: 'D',
        title: 'Document Uploaded',
        description: 'New proposal document added to resources',
        timestamp: '2 days ago',
      },
    ],
    ar: [
      {
        type: 'م',
        title: 'تم إنشاء حساب المستخدم',
        description: 'تم إنشاء حساب مستخدم جديد بنجاح',
        timestamp: 'منذ ساعتين',
      },
      {
        type: 'ش',
        title: 'تم تحديث المشروع',
        description: 'تم تغيير حالة مشروع الحملة التسويقية',
        timestamp: 'منذ 5 ساعات',
      },
      {
        type: 'م',
        title: 'اكتملت المهمة',
        description: 'تم وضع علامة على مهمة مراجعة التصميم كمكتملة',
        timestamp: 'منذ يوم واحد',
      },
      {
        type: 'و',
        title: 'تم رفع المستند',
        description: 'تمت إضافة وثيقة اقتراح جديدة إلى الموارد',
        timestamp: 'منذ يومين',
      },
    ],
  };

  // Simple filter logic - in real app would filter by date
  return allItems[language];
};
