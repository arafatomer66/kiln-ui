import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormControl } from '@angular/forms';
import {
  KnAccordionComponent, KnAccordionItemComponent, KnAlertComponent,
  KnAvatarComponent, KnBadgeComponent, KnButtonComponent, KnCardComponent,
  KnCheckboxComponent, KnDatePickerComponent, KnDividerComponent,
  KnFileUploadComponent, KnFileItem, KnInputComponent,
  KnOtpInputComponent, KnPhoneInputComponent,
  KnRadioComponent, KnRadioGroupComponent, KnSelectComponent, KnSelectOption,
  KnStepperComponent, KnStep, KnSwitchComponent, KnTabsComponent, KnTabComponent,
  KnTabContentDirective, KnTextareaComponent, KnToastService,
} from 'kiln-ui';

@Component({
  selector: 'app-admin-settings',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule, ReactiveFormsModule,
    KnTabsComponent, KnTabComponent, KnTabContentDirective,
    KnCardComponent, KnButtonComponent, KnInputComponent, KnTextareaComponent,
    KnSelectComponent, KnCheckboxComponent, KnSwitchComponent, KnRadioGroupComponent,
    KnRadioComponent, KnDatePickerComponent, KnAccordionComponent, KnAccordionItemComponent,
    KnAlertComponent, KnAvatarComponent, KnBadgeComponent, KnDividerComponent,
    KnStepperComponent, KnFileUploadComponent, KnOtpInputComponent, KnPhoneInputComponent,
  ],
  template: `
    <header class="page-head">
      <div>
        <div class="page-head__eyebrow">SETTINGS · সেটিংস</div>
        <h1 class="page-head__title">Workspace settings</h1>
        <p class="page-head__sub">Manage profile, billing, notifications, and team preferences.</p>
      </div>
      <kn-button variant="solid" (clicked)="save()">Save changes</kn-button>
    </header>

    <kn-card padding="md">
      <kn-tabs>
        <!-- Profile -->
        <kn-tab label="Profile">
          <ng-template knTabContent>
            <div class="profile">
              <div class="profile__avatar">
                <kn-avatar size="xl" name="Omer Arafat" />
                <kn-file-upload
                  label="Upload new photo"
                  hint="JPG or PNG, up to 2MB"
                  [multiple]="false"
                  accept="image/jpeg,image/png"
                  [maxSize]="2 * 1024 * 1024"
                  [maxFiles]="1"
                />
              </div>
              <div class="profile__form">
                <div class="form-row">
                  <kn-input label="Display name" [formControl]="name" />
                  <kn-input label="Email" type="email" [formControl]="email" />
                </div>
                <div class="form-row">
                  <kn-phone-input label="Mobile number" defaultCountry="BD" />
                  <kn-select label="Timezone" [options]="timezones" [(ngModel)]="timezone" />
                </div>
                <kn-textarea label="Bio" [rows]="3" placeholder="Tell us about yourself…" />
              </div>
            </div>
          </ng-template>
        </kn-tab>

        <!-- Notifications -->
        <kn-tab label="Notifications">
          <ng-template knTabContent>
            <kn-alert tone="info" title="Email digest">
              We'll send a single summary at your chosen time, not one email per event.
            </kn-alert>

            <div class="prefs">
              <div class="pref">
                <div>
                  <div class="pref__label">New order</div>
                  <div class="pref__hint">Notified when a customer places an order.</div>
                </div>
                <kn-switch [(ngModel)]="notifyOrder" />
              </div>
              <kn-divider />
              <div class="pref">
                <div>
                  <div class="pref__label">Cancellations &amp; refunds</div>
                  <div class="pref__hint">High-priority alerts.</div>
                </div>
                <kn-switch [(ngModel)]="notifyCancel" />
              </div>
              <kn-divider />
              <div class="pref">
                <div>
                  <div class="pref__label">Weekly performance summary</div>
                  <div class="pref__hint">Every Sunday at 9:00 AM Asia/Dhaka.</div>
                </div>
                <kn-switch [(ngModel)]="notifyWeekly" />
              </div>
              <kn-divider />
              <div class="pref">
                <div>
                  <div class="pref__label">Product launch announcements</div>
                  <div class="pref__hint">Occasional updates from the Kiln UI team.</div>
                </div>
                <kn-switch [(ngModel)]="notifyProduct" />
              </div>
            </div>

            <kn-divider />

            <div class="form-row">
              <kn-radio-group [(ngModel)]="digestFreq" ariaLabel="Digest frequency">
                <kn-radio [value]="'realtime'" label="Real-time (each event)" />
                <kn-radio [value]="'hourly'" label="Hourly digest" />
                <kn-radio [value]="'daily'" label="Daily digest" />
                <kn-radio [value]="'weekly'" label="Weekly digest" />
              </kn-radio-group>
            </div>
          </ng-template>
        </kn-tab>

        <!-- Billing -->
        <kn-tab label="Billing">
          <ng-template knTabContent>
            <div class="form-row">
              <kn-card padding="md" variant="soft" class="plan">
                <kn-badge variant="solid" tone="brand">Current plan</kn-badge>
                <h3 class="plan__name">Pro · ৳2,400/mo</h3>
                <ul class="plan__features">
                  <li>Up to 10,000 orders/mo</li>
                  <li>5 team seats</li>
                  <li>API access · Webhooks</li>
                  <li>Priority support</li>
                </ul>
                <kn-button variant="outline" size="sm">Compare plans</kn-button>
              </kn-card>

              <kn-card padding="md" class="usage">
                <h3 class="card-h3">Usage this month</h3>
                <div class="usage__row"><span>Orders</span><strong>2,814 / 10,000</strong></div>
                <div class="usage__row"><span>Storage</span><strong>4.2 GB / 50 GB</strong></div>
                <div class="usage__row"><span>API calls</span><strong>148,302 / unlimited</strong></div>
                <kn-divider />
                <kn-date-picker label="Next invoice" />
              </kn-card>
            </div>

            <h3 class="card-h3">Recent invoices</h3>
            <kn-accordion>
              <kn-accordion-item heading="Invoice #2026-04 · ৳2,400 · Paid">
                <p class="muted">Issued 2026-04-01 · paid via card ending 4242. Period: April 2026.</p>
                <kn-button variant="outline" size="sm">Download PDF</kn-button>
              </kn-accordion-item>
              <kn-accordion-item heading="Invoice #2026-03 · ৳2,400 · Paid">
                <p class="muted">Issued 2026-03-01 · paid via card ending 4242. Period: March 2026.</p>
                <kn-button variant="outline" size="sm">Download PDF</kn-button>
              </kn-accordion-item>
              <kn-accordion-item heading="Invoice #2026-02 · ৳2,400 · Paid">
                <p class="muted">Issued 2026-02-01 · paid via card ending 4242.</p>
                <kn-button variant="outline" size="sm">Download PDF</kn-button>
              </kn-accordion-item>
            </kn-accordion>
          </ng-template>
        </kn-tab>

        <!-- Team -->
        <kn-tab label="Team">
          <ng-template knTabContent>
            <h3 class="card-h3">Onboarding flow</h3>
            <p class="muted">Three steps to add a teammate. They'll get an email with a one-time link.</p>

            <kn-stepper [steps]="onboardingSteps" [activeIndex]="step()" (activeChange)="step.set($event)" />

            <kn-divider />

            @switch (step()) {
              @case (0) {
                <div class="form-row">
                  <kn-input label="Email" type="email" placeholder="teammate@example.com" />
                  <kn-select label="Role" [options]="roles" [(ngModel)]="role" />
                </div>
                <kn-checkbox label="Send welcome guide along with the invite" [(ngModel)]="sendGuide" />
              }
              @case (1) {
                <kn-alert tone="info" title="Verify your number">
                  We need to confirm you have access to the team owner's phone before sending invitations.
                </kn-alert>
                <div class="otp-wrap">
                  <kn-otp-input
                    label="Verification code"
                    helperText="Enter the 6-digit code we sent to +880 1711 234567"
                    (completed)="onOtp($event)"
                  />
                </div>
              }
              @case (2) {
                <kn-textarea
                  label="Welcome message"
                  [rows]="4"
                  placeholder="Hi! Welcome to the team. Here's a quick onboarding guide…"
                />
              }
            }

            <div class="actions">
              <kn-button variant="outline" [disabled]="step() === 0" (clicked)="step.set(step() - 1)">Back</kn-button>
              <kn-button variant="solid" (clicked)="nextStep()">
                {{ step() === onboardingSteps.length - 1 ? 'Send invite' : 'Continue' }}
              </kn-button>
            </div>
          </ng-template>
        </kn-tab>
      </kn-tabs>
    </kn-card>
  `,
  styles: [`
    :host { display: block; color: var(--kn-text); font-family: var(--kn-font-sans); }

    .page-head { display: flex; align-items: flex-end; justify-content: space-between; gap: var(--kn-sp-4); margin-bottom: var(--kn-sp-5); }
    .page-head__eyebrow { font-family: var(--kn-font-mono); font-size: var(--kn-fs-xs); font-weight: var(--kn-fw-bold); letter-spacing: var(--kn-tracking-mono); text-transform: uppercase; color: var(--kn-brand); margin-bottom: var(--kn-sp-2); }
    .page-head__title { font-family: var(--kn-font-display); font-size: var(--kn-fs-3xl); font-weight: var(--kn-fw-bold); margin: 0; }
    .page-head__sub { color: var(--kn-text-muted); margin: 4px 0 0; }

    .profile { display: grid; grid-template-columns: 200px 1fr; gap: var(--kn-sp-6); margin-top: var(--kn-sp-3); }
    @media (max-width: 720px) { .profile { grid-template-columns: 1fr; } }
    .profile__avatar { display: flex; flex-direction: column; align-items: center; gap: var(--kn-sp-3); }
    .profile__form { display: flex; flex-direction: column; gap: var(--kn-sp-4); }

    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: var(--kn-sp-4); }
    @media (max-width: 720px) { .form-row { grid-template-columns: 1fr; } }

    .prefs { margin: var(--kn-sp-5) 0; }
    .pref { display: flex; align-items: center; justify-content: space-between; gap: var(--kn-sp-3); padding: var(--kn-sp-3) 0; }
    .pref__label { font-weight: var(--kn-fw-semibold); }
    .pref__hint { font-size: var(--kn-fs-sm); color: var(--kn-text-muted); margin-top: 2px; }

    .plan__name { font-family: var(--kn-font-display); font-size: var(--kn-fs-2xl); font-weight: var(--kn-fw-bold); margin: var(--kn-sp-2) 0; }
    .plan__features { list-style: none; padding: 0; margin: 0 0 var(--kn-sp-3); color: var(--kn-text-muted); font-size: var(--kn-fs-sm); }
    .plan__features li { padding: 4px 0; }
    .plan__features li::before { content: '✓ '; color: var(--kn-success); font-weight: bold; margin-right: 4px; }

    .usage__row { display: flex; justify-content: space-between; padding: var(--kn-sp-2) 0; font-size: var(--kn-fs-sm); }
    .usage__row strong { color: var(--kn-text); }

    .card-h3 { font-family: var(--kn-font-display); font-size: var(--kn-fs-lg); font-weight: var(--kn-fw-bold); margin: 0 0 var(--kn-sp-3); }
    .muted { color: var(--kn-text-muted); font-size: var(--kn-fs-sm); }

    .actions { display: flex; gap: var(--kn-sp-2); margin-top: var(--kn-sp-5); }
    .otp-wrap { padding: var(--kn-sp-5) 0; }
  `],
})
export class SettingsPage {
  private readonly toast = inject(KnToastService);
  private readonly fb = inject(FormBuilder);

  protected readonly Math = Math;

  protected readonly name = new FormControl('Omer Arafat');
  protected readonly email = new FormControl('omer@sharedeal.app');

  protected readonly timezone = signal<string>('Asia/Dhaka');
  protected readonly notifyOrder = signal(true);
  protected readonly notifyCancel = signal(true);
  protected readonly notifyWeekly = signal(true);
  protected readonly notifyProduct = signal(false);
  protected readonly digestFreq = signal<string>('daily');
  protected readonly role = signal<string>('member');
  protected readonly sendGuide = signal(true);
  protected readonly step = signal(0);

  protected readonly timezones: KnSelectOption<string>[] = [
    { value: 'Asia/Dhaka',    label: 'Asia/Dhaka (GMT+6)' },
    { value: 'Asia/Kolkata',  label: 'Asia/Kolkata (GMT+5:30)' },
    { value: 'Asia/Karachi',  label: 'Asia/Karachi (GMT+5)' },
    { value: 'Asia/Singapore',label: 'Asia/Singapore (GMT+8)' },
    { value: 'Europe/London', label: 'Europe/London (GMT+0)' },
    { value: 'America/NY',    label: 'America/New_York (GMT−5)' },
  ];

  protected readonly roles: KnSelectOption<string>[] = [
    { value: 'admin',   label: 'Admin · full access' },
    { value: 'member',  label: 'Member · read & write' },
    { value: 'viewer',  label: 'Viewer · read only' },
    { value: 'support', label: 'Support · customer ops' },
  ];

  protected readonly onboardingSteps: KnStep[] = [
    { title: 'Invite',     description: 'Email and role' },
    { title: 'Permissions',description: 'Choose access scopes' },
    { title: 'Welcome',    description: 'Customize the welcome message' },
  ];

  protected save(): void {
    this.toast.success('Settings saved', 'All changes are live.');
  }

  protected nextStep(): void {
    const max = this.onboardingSteps.length - 1;
    if (this.step() < max) {
      this.step.update((s) => s + 1);
    } else {
      this.toast.success('Invite sent', 'Your teammate will receive an email shortly.');
    }
  }

  protected onOtp(code: string): void {
    this.toast.success('Code verified', `Accepted ${code}. Continue to the welcome step.`);
    if (this.step() === 1) this.step.set(2);
  }
}
