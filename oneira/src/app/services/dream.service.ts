import { computed, inject, Injectable, signal} from '@angular/core';
import { Dream } from '../models/dream.model';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DreamService {

    private http = inject(HttpClient);
    readonly url = 'http://localhost:8080/api/dreams';
    readonly DreamList = signal<Dream[]>([]);

    selectedType = signal<"tous" | "normal" | "nightmare" | "lucid" | "recurring">("tous");
    selectedDreamToEdit = signal<Dream | undefined>(undefined);
    editOrCreateLabel = signal<"Ajouter un rêve" | "Modifier un rêve">("Ajouter un rêve");
    searchQuery = signal<string>("");
    filteredDreams = computed(() => {
        const type = this.selectedType();
        const query = this.searchQuery().toLowerCase();
        if (query) {
            return this.DreamList().filter(dream => 
                (type === "tous" || dream.type === type) &&
                (dream.title.toLowerCase().includes(query) || dream.content.toLowerCase().includes(query))
            );
        } else
        if (type === "tous") {
            return this.DreamList();
        } 
        return this.DreamList().filter(dream => dream.type === type);
    });


    //METHODS

    getDreams(): Observable<Dream[]> {
        return this.http.get<Dream[]>(this.url).pipe(
          tap(dreams => this.DreamList.set(dreams))
        );
    }
    

    addDream(dream:Dream): Observable<Dream> {
        return this.http.post<Dream>(this.url,dream).pipe(
            tap(createdDream => this.DreamList.update(dreams => [...dreams, createdDream]))
        );
    }


    updateDream(id: number, dream: Dream): Observable<Dream> {
        return this.http.put<Dream>(`${this.url}/${id}`, dream).pipe(
            tap(updatedDream =>  this.DreamList.update(dreams => dreams.map(dream => dream.id === id ? updatedDream : dream)))
        );
    }


    deleteDream(id: number): Observable<void> {
        return this.http.delete<void>(`${this.url}/${id}`).pipe(
            tap(() => this.DreamList.update(dreams => dreams.filter(dream => dream.id !== id)))
        )
    }


    getDreamById(id: number): Dream | undefined {
        return this.DreamList().find(dream => dream.id === id);
    }

    startEditingDream(id : number) {
        const dream = this.getDreamById(id);

        if (dream) {
            this.selectedDreamToEdit.set(dream);
            this.editOrCreateLabel.set("Modifier un rêve")
        }
        
    }

    exportDreams(): void {
        const exportedDreams= JSON.stringify(this.DreamList(), null, 2);
        const exportedDreamsBlob = new Blob([exportedDreams], {
        type: "application/json",
        });

        const url = URL.createObjectURL(exportedDreamsBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'oneira-dreams.json';
        a.click();

        URL.revokeObjectURL(url);
    }

        replaceDreams(dreams: Dream[]): void {
            
        this.DreamList.set(dreams);
    }
}