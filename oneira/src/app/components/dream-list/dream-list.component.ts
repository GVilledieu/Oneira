import { Component, inject, effect, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DreamService } from '../../services/dream.service';
import { DreamTypeFilter } from '../../models/dream-filters.model';
import { Dream } from '../../models/dream.model';

@Component({
  selector: 'app-dream-list',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './dream-list.component.html',
  styleUrl: './dream-list.component.css'
})

export class DreamListComponent {

  private dreamService = inject(DreamService);

  dreams= this.dreamService.DreamList;

  filteredDreams = this.dreamService.filteredDreams;

  selectedType = this.dreamService.selectedType;  

  filters: { label: string; value: DreamTypeFilter; activeClass: string }[] = [
      { label: 'Tous', value: "tous", activeClass: "bg-blue-600" },
      { label: 'Normal', value: "normal", activeClass: "bg-slate-600" },
      { label: 'Cauchemar', value: "nightmare", activeClass: "bg-red-600" },
      { label: 'Lucide', value: "lucid", activeClass: "bg-purple-600" },
      { label: 'Récurrent', value: "recurring", activeClass: "bg-yellow-600" },
  ];

  searchQuery = this.dreamService.searchQuery;

  onSearchUpdate(searchContent: string): void {
    console.log("Search query updated:", searchContent);
    this.searchQuery.set(searchContent);
  }


  selectType(type: DreamTypeFilter): void {
    this.dreamService.selectedType.set(type);
    
  }
  
  deleteDream(id: number): void {
    this.dreamService.deleteDream(id);
  }

  countDreamsType(type: DreamTypeFilter) : number {

    if (type =="tous"){
      return this.dreams().length;
    } else {

      return this.dreams().filter(x => x.type === type).length;
    }

  }


}
