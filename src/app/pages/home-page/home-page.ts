import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-page',
  imports: [CommonModule],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {
  stats = [
    {
      label: 'إجمالي القصص',
      value: '1,284',
      badge: '12%+ هذا الشهر',
      badgeClass: 'bg-green-50 text-green-600',
      badgeIcon: '↗',
      valueClass: 'text-[#0058be]',
      borderHover: 'hover:border-[#0058be]',
      iconBg: 'bg-blue-50 group-hover:bg-[#0058be]',
      iconColor: 'text-[#0058be]',
      delay: 'animate-[fadeSlideUp_0.5s_0.1s_ease_both]',
      icon: 'book',
    },
    {
      label: 'إجمالي الفيديوهات',
      value: '856',
      badge: '5%+ هذا الأسبوع',
      badgeClass: 'bg-green-50 text-green-600',
      badgeIcon: '↗',
      valueClass: 'text-[#6b38d4]',
      borderHover: 'hover:border-[#6b38d4]',
      iconBg: 'bg-purple-50 group-hover:bg-[#6b38d4]',
      iconColor: 'text-[#6b38d4]',
      delay: 'animate-[fadeSlideUp_0.5s_0.2s_ease_both]',
      icon: 'video',
    },
    {
      label: 'إجمالي المهام',
      value: '3,412',
      badge: 'معدل إنجاز عالي',
      badgeClass: 'bg-blue-50 text-[#0058be]',
      badgeIcon: '✔',
      valueClass: 'text-[#4648d4]',
      borderHover: 'hover:border-[#4648d4]',
      iconBg: 'bg-indigo-50 group-hover:bg-[#4648d4]',
      iconColor: 'text-[#4648d4]',
      delay: 'animate-[fadeSlideUp_0.5s_0.3s_ease_both]',
      icon: 'check',
    },
  ];

  activities = [
    {
      title: 'مغامرة في الغابة',
      emoji: '🦁',
      emojiBg: 'bg-amber-100',
      type: 'قصة',
      typeBg: 'bg-blue-50 text-[#0058be]',
      stars: 50,
      status: 'منشور',
      statusClass: 'text-green-600',
      dotClass: 'bg-green-500',
    },
    {
      title: 'ترتيب المكعبات',
      emoji: '🧩',
      emojiBg: 'bg-pink-100',
      type: 'مهمة',
      typeBg: 'bg-indigo-50 text-[#4648d4]',
      stars: 30,
      status: 'منشور',
      statusClass: 'text-green-600',
      dotClass: 'bg-green-500',
    },
    {
      title: 'تعلم الحروف العربية',
      emoji: '🎥',
      emojiBg: 'bg-gray-900',
      type: 'فيديو',
      typeBg: 'bg-purple-50 text-[#6b38d4]',
      stars: 100,
      status: 'قيد المراجعة',
      statusClass: 'text-amber-600',
      dotClass: 'bg-amber-500',
    },
  ];
}
