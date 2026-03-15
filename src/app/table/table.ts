import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-table',
  imports: [CommonModule],
  templateUrl: './table.html',
  styleUrl: './table.scss',
})
export class Table {
items = [
  { Title: "قصة سيدنا يوسف عليه السلام ", type: "قصة", date: "2/5/2026" },
  { Title: "تعليم اداب الطعام للاطفال", type: "فيديو", date: "3/4/2026" },
  { Title: " مساعدة ماما في البيت  ", type: "مهمة", date: "13/7/2026" }
];

checkOfType(item:any, type:string):boolean {
 return Boolean(
  item.type == type || false
 )
}

iconMap:any = {
  "قصة": "fa-solid fa-book-open text-blue-500",
  "فيديو": "fa-regular fa-circle-play text-rose-500",
  "مهمة": "fa-solid fa-list-check text-orange-500"
};


}
