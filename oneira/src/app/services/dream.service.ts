export class DreamService{
    DreamList: Dream[] = [];

    addDream(dream: Dream): void {
        this.DreamList.push(dream);
    }

    getDreams(): Dream[] {
        return this.DreamList;
    }

    getDreamById(id: number): Dream | undefined {
        return this.DreamList.find(dream => dream.id === id);
    }

    deleteDream(id: number): void {
        this.DreamList = this.DreamList.filter(dream => dream.id !== id);
    }

    updateDream(id: number, updatedDream: Partial<Dream>): void {
        const dreamIndex = this.DreamList.findIndex(dream => dream.id === id);  
        if (dreamIndex !== -1) {
            this.DreamList[dreamIndex] = { ...this.DreamList[dreamIndex], ...updatedDream };
        }
    }

    
}