import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PROFILE } from '../../data/profile';
import { Mail } from './mail';

describe('Mail', () => {
  const originalEndpoint = PROFILE.contactFormEndpoint;
  let fixture: ComponentFixture<Mail>;

  const page = () => fixture.nativeElement as HTMLElement;
  const sendButton = () => page().querySelector<HTMLButtonElement>('button[type="submit"]')!;

  const fillField = (name: string, value: string) => {
    const field = page().querySelector<HTMLInputElement>(`[formControlName="${name}"]`)!;
    field.value = value;
    field.dispatchEvent(new Event('input'));
  };

  const fillValidForm = () => {
    fillField('name', 'Ada');
    fillField('email', 'ada@example.com');
    fillField('message', 'Hello Nour, I love your portfolio!');
  };

  const submit = async () => {
    page().querySelector('form')!.dispatchEvent(new Event('submit'));
    await fixture.whenStable();
  };

  const createMail = async (endpoint: string) => {
    PROFILE.contactFormEndpoint = endpoint;
    fixture = TestBed.createComponent(Mail);
    await fixture.whenStable();
  };

  afterEach(() => {
    PROFILE.contactFormEndpoint = originalEndpoint;
    vi.restoreAllMocks();
  });

  describe('when the contact form is not configured', () => {
    beforeEach(() => createMail(''));

    it('explains it and disables the send button', () => {
      expect(page().textContent).toContain('not plugged in yet');
      expect(sendButton().disabled).toBe(true);
    });
  });

  describe('when the contact form is configured', () => {
    beforeEach(() => createMail('https://formspree.io/f/test'));

    it('shows validation errors instead of sending an empty form', async () => {
      const fetchSpy = vi.spyOn(globalThis, 'fetch');

      await submit();

      expect(page().textContent).toContain('Please tell me your name.');
      expect(page().textContent).toContain('I need a valid email');
      expect(fetchSpy).not.toHaveBeenCalled();
    });

    it('sends the message and shows a confirmation', async () => {
      const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response('{}'));
      fillValidForm();

      await submit();
      await fixture.whenStable();

      expect(fetchSpy).toHaveBeenCalledWith('https://formspree.io/f/test', expect.anything());
      expect(page().textContent).toContain('Message sent!');
    });

    it('shows an error when sending fails', async () => {
      vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response('', { status: 500 }));
      fillValidForm();

      await submit();
      await fixture.whenStable();

      expect(page().querySelector('[role="alert"]')?.textContent).toContain('could not be sent');
    });
  });
});
