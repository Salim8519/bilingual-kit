import { useState, useMemo } from 'react';

interface HistoryItem {
  id: string;
  title: string;
  description: string;
  time: string;
  type: 'project' | 'task' | 'user';
  status?: string;
}

export const useHistoryData = (language: 'en' | 'ar') => {
  const [activeFilter, setActiveFilter] = useState('all');

  const historyItems: HistoryItem[] = useMemo(() => {
    if (language === 'ar') {
      return [
        {
          id: '1',
          title: 'مشروع التصميم الجديد',
          description: 'تم إنشاء مشروع تطبيق الهاتف المحمول مع 5 أعضاء في الفريق',
          time: 'منذ ساعتين',
          type: 'project',
          status: 'نشط',
        },
        {
          id: '2',
          title: 'مراجعة التصميم',
          description: 'اكتملت مراجعة التصميم لصفحة الملف الشخصي',
          time: 'منذ 4 ساعات',
          type: 'task',
          status: 'مكتمل',
        },
        {
          id: '3',
          title: 'عضو جديد في الفريق',
          description: 'انضم أحمد محمد إلى فريق التطوير',
          time: 'أمس',
          type: 'user',
        },
        {
          id: '4',
          title: 'تحديث المشروع',
          description: 'تم تحديث متطلبات المشروع والجدول الزمني',
          time: 'منذ يومين',
          type: 'project',
          status: 'قيد المراجعة',
        },
        {
          id: '5',
          title: 'إكمال المهمة',
          description: 'تمت الموافقة على تكامل واجهة برمجة التطبيقات ودمجه',
          time: 'منذ 3 أيام',
          type: 'task',
          status: 'مكتمل',
        },
      ];
    }

    return [
      {
        id: '1',
        title: 'New Design Project',
        description: 'Created mobile app project with 5 team members',
        time: '2 hours ago',
        type: 'project',
        status: 'Active',
      },
      {
        id: '2',
        title: 'Design Review',
        description: 'Completed design review for profile page',
        time: '4 hours ago',
        type: 'task',
        status: 'Completed',
      },
      {
        id: '3',
        title: 'New Team Member',
        description: 'Ahmed Mohamed joined the development team',
        time: 'Yesterday',
        type: 'user',
      },
      {
        id: '4',
        title: 'Project Update',
        description: 'Updated project requirements and timeline',
        time: '2 days ago',
        type: 'project',
        status: 'In Review',
      },
      {
        id: '5',
        title: 'Task Completion',
        description: 'API integration approved and merged',
        time: '3 days ago',
        type: 'task',
        status: 'Completed',
      },
    ];
  }, [language]);

  const filteredItems = useMemo(() => {
    if (activeFilter === 'all') return historyItems;
    return historyItems.filter((item) => {
      if (activeFilter === 'projects') return item.type === 'project';
      if (activeFilter === 'tasks') return item.type === 'task';
      if (activeFilter === 'users') return item.type === 'user';
      return true;
    });
  }, [historyItems, activeFilter]);

  return {
    historyItems: filteredItems,
    activeFilter,
    setActiveFilter,
  };
};
