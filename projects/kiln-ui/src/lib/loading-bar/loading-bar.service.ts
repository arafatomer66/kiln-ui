import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class KnLoadingBarService {
  readonly progress = signal<number>(0);
  readonly active = signal<boolean>(false);

  private timer: ReturnType<typeof setInterval> | null = null;

  start(): void {
    this.cancel();
    this.active.set(true);
    this.progress.set(8);
    // Climb organically toward 90% — never reaches 100 until complete()
    this.timer = setInterval(() => {
      this.progress.update((p) => {
        if (p >= 90) return p;
        const inc = p < 30 ? 4 : p < 70 ? 2 : 0.5;
        return Math.min(p + inc, 90);
      });
    }, 220);
  }

  set(progress: number): void {
    this.cancel();
    this.active.set(true);
    this.progress.set(Math.max(0, Math.min(100, progress)));
  }

  complete(): void {
    this.cancel();
    this.progress.set(100);
    setTimeout(() => {
      this.active.set(false);
      this.progress.set(0);
    }, 280);
  }

  cancel(): void {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }
}
