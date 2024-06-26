import { Component, Input, OnInit } from '@angular/core';
import { BackendErrorsInterface } from '../../backendErrors.nterface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'mc-backend-error-messages',
  templateUrl: './backendErrorMessages.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class backendErrorMessages implements OnInit {
  @Input() backendError: BackendErrorsInterface = {};

  errorMessages: string[] = [];

  ngOnInit(): void {
    this.errorMessages = Object.keys(this.backendError).map((name: string) => {
      const messages = this.backendError[name].join('');
      return `${name} ${messages}`;
    });
  }
}
