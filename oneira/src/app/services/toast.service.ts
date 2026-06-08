import { computed, Injectable, signal } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class ToastService{

    message = signal<string>("");
    type = signal<"success" | "error" | "info">("info");
    visible = signal(false);
    toastColor = computed(() => {

    switch (this.type()) {
        case 'success':
            return 'bg-green-500 text-white';

        case 'error':
            return 'bg-red-500 text-white';

        default:
            return 'bg-blue-500 text-white';
    }
    });

    show(message : string, type: "success" | "error" | "info"){
        this.message.set(message);
        this.type.set(type);
        this.visible.set(true);
        setTimeout(()=>{this.visible.set(false);}, 5000);
    }


}