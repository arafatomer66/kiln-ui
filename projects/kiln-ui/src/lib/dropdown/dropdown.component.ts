import { CdkConnectedOverlay, CdkOverlayOrigin, ConnectedPosition } from '@angular/cdk/overlay';
import {
  ChangeDetectionStrategy,
  Component,
  output,
  signal,
} from '@angular/core';

const POSITIONS: ConnectedPosition[] = [
  { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top',    offsetY: 4 },
  { originX: 'end',   originY: 'bottom', overlayX: 'end',   overlayY: 'top',    offsetY: 4 },
  { originX: 'start', originY: 'top',    overlayX: 'start', overlayY: 'bottom', offsetY: -4 },
];

@Component({
  selector: 'kn-dropdown',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CdkConnectedOverlay, CdkOverlayOrigin],
  template: `
    <span class="kn-dropdown__trigger" cdkOverlayOrigin #origin="cdkOverlayOrigin" (click)="toggle()">
      <ng-content select="[kn-dropdown-trigger]" />
    </span>

    <ng-template
      cdkConnectedOverlay
      [cdkConnectedOverlayOrigin]="origin"
      [cdkConnectedOverlayOpen]="open()"
      [cdkConnectedOverlayPositions]="positions"
      [cdkConnectedOverlayHasBackdrop]="true"
      cdkConnectedOverlayBackdropClass="kn-overlay-transparent-backdrop"
      (backdropClick)="close()"
      (detach)="close()"
    >
      <div class="kn-dropdown__panel" role="menu">
        <ng-content />
      </div>
    </ng-template>
  `,
  styles: [`
    :host { display: inline-block; }

    .kn-dropdown__trigger { display: inline-flex; cursor: pointer; }

    .kn-dropdown__panel {
      min-width: 180px;
      background: var(--kn-bg);
      color: var(--kn-text);
      border: var(--kn-bw-2) solid var(--kn-border-strong);
      border-radius: var(--kn-r-sm);
      box-shadow: var(--kn-shadow-stamp-strong);
      padding: var(--kn-sp-1);
      font-family: var(--kn-font-sans);
      font-size: var(--kn-fs-base);
      animation: kn-dd-in 140ms cubic-bezier(0.2, 0.7, 0.2, 1);
    }

    @keyframes kn-dd-in {
      from { opacity: 0; transform: translateY(-4px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    :host ::ng-deep .kn-overlay-transparent-backdrop { background: transparent; }
  `],
})
export class KnDropdownComponent {
  readonly open = signal<boolean>(false);
  protected readonly positions = POSITIONS;

  readonly openChange = output<boolean>();

  toggle(): void {
    const next = !this.open();
    this.open.set(next);
    this.openChange.emit(next);
  }

  close(): void {
    if (this.open()) {
      this.open.set(false);
      this.openChange.emit(false);
    }
  }
}
