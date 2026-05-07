import { Injectable, signal } from '@angular/core';

export type KnToastTone = 'info' | 'success' | 'warn' | 'danger';

export interface KnToast {
  readonly id: number;
  readonly title: string;
  readonly message?: string;
  readonly tone: KnToastTone;
  readonly duration: number;
}

let nextToastId = 0;

@Injectable({ providedIn: 'root' })
export class KnToastService {
  readonly toasts = signal<KnToast[]>([]);

  show(toast: Omit<KnToast, 'id' | 'tone' | 'duration'> & Partial<Pick<KnToast, 'tone' | 'duration'>>): number {
    const id = ++nextToastId;
    const item: KnToast = {
      id,
      title: toast.title,
      message: toast.message,
      tone: toast.tone ?? 'info',
      duration: toast.duration ?? 4000,
    };
    this.toasts.update((list) => [...list, item]);
    if (item.duration > 0) {
      setTimeout(() => this.dismiss(id), item.duration);
    }
    return id;
  }

  success(title: string, message?: string, duration?: number): number {
    return this.show({ title, message, tone: 'success', duration });
  }

  warn(title: string, message?: string, duration?: number): number {
    return this.show({ title, message, tone: 'warn', duration });
  }

  danger(title: string, message?: string, duration?: number): number {
    return this.show({ title, message, tone: 'danger', duration });
  }

  info(title: string, message?: string, duration?: number): number {
    return this.show({ title, message, tone: 'info', duration });
  }

  dismiss(id: number): void {
    this.toasts.update((list) => list.filter((t) => t.id !== id));
  }

  clear(): void { this.toasts.set([]); }
}
