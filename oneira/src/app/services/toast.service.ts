import { computed, Injectable, signal } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class ToastService{

    message = signal<string>("");
    type = signal<"success" | "error" | "info">("info");
    visible = signal(false);
    toastColor = computed(() => {

    switch (this.type()) {
        case 'success':
            return 'bg-green-500';

        case 'error':
            return 'bg-red-500';

        default:
            return 'bg-blue-500';
    }
    });

    show(message : string, type: "success" | "error" | "info"): void{
        this.message.set(message);
        this.type.set(type);
        this.visible.set(true);

        setTimeout(()=>{this.visible.set(false);}, 5000);
    }


}