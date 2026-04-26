import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksFiltersComponent } from '../tasks-filters/tasks-filters'
import { TasksTableComponent, Task } from '../tasks-table/tasks-table'
import { Router } from '@angular/router'; 


@Component({
  selector: 'app-tasks-page',
  standalone: true,
  imports: [CommonModule, TasksFiltersComponent, TasksTableComponent],
  templateUrl: './tasks.html',
    styleUrl: './tasks.scss',

})
export class TasksPageComponent  {
constructor(private router: Router) {}
  allTasks: Task[] = [
    { id: 1, name: 'أداء الصلوات في وقتها', category: 'دينية',  stars: 100, date: '٢٠٢٣/١٠/٠٥' },
    { id: 2, name: 'ترتيب غرفتك',           category: 'منزلية', stars: 20,  date: '٢٠٢٣/١٠/٠٨' },
    { id: 3, name: 'قراءة قصة قبل النوم',   category: 'مدرسية', stars: 50,  date: '٢٠٢٣/١٠/١٠' },
    { id: 4, name: 'إتمام الواجبات المنزلية', category: 'مدرسية', stars: 40, date: '٢٠٢٣/١٠/١٢' },
  ];

  filteredTasks = this.allTasks;
  

  onFilterChange(category: string) {
    this.filteredTasks = category === 'الكل'
      ? this.allTasks
      : this.allTasks.filter(t => t.category === category);
  }

addTask() {
  this.router.navigate(['/tasks/add']);
}  
onEditTask(task: Task) { console.log('تعديل:', task); }
  onDeleteTask(id: number) {
    this.allTasks     = this.allTasks.filter(t => t.id !== id);
    this.filteredTasks = this.filteredTasks.filter(t => t.id !== id);
  }
}
