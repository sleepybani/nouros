import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PROFILE } from '../../data/profile';

type SendStatus = 'idle' | 'sending' | 'sent' | 'error';

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}

@Component({
  selector: 'app-mail',
  imports: [ReactiveFormsModule],
  templateUrl: './mail.html',
  styleUrl: './mail.scss',
})
export class Mail {
  protected readonly profile = PROFILE;
  protected readonly status = signal<SendStatus>('idle');
  protected readonly canSend = !!(PROFILE.contactFormEndpoint || PROFILE.links.email);

  protected readonly form = inject(FormBuilder).nonNullable.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    subject: [''],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  protected async send(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const contactMessage: ContactMessage = this.form.getRawValue();
    if (PROFILE.contactFormEndpoint) {
      await this.postToFormEndpoint(contactMessage);
    } else {
      this.openEmailClient(contactMessage);
    }
  }

  protected showError(field: keyof ContactMessage): boolean {
    const control = this.form.controls[field];
    return control.invalid && control.touched;
  }

  private async postToFormEndpoint(contactMessage: ContactMessage): Promise<void> {
    this.status.set('sending');
    try {
      const response = await fetch(PROFILE.contactFormEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(contactMessage),
      });
      this.status.set(response.ok ? 'sent' : 'error');
      if (response.ok) {
        this.form.reset();
      }
    } catch {
      this.status.set('error');
    }
  }

  private openEmailClient({ name, subject, message }: ContactMessage): void {
    const mailtoUrl = new URL(`mailto:${PROFILE.links.email}`);
    mailtoUrl.searchParams.set('subject', subject || `Hello from ${name}`);
    mailtoUrl.searchParams.set('body', message);
    window.location.href = mailtoUrl.toString();
  }
}
