import { isPlatformBrowser, NgClass, NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { Component, ElementRef, Inject, Input, PLATFORM_ID, ViewChild } from '@angular/core';
import { Dbz } from '../interfaces/db';

@Component({
  selector: 'dbz-modal',
  standalone: true,
  imports: [NgFor, NgIf, TitleCasePipe,NgClass],
  templateUrl: './modal.component.html',
  styles: [`
    .modal-content {
      border-radius: 1.5rem;
      box-shadow: 0 0 20px rgba(255, 215, 0, 0.7);
      border: 2px solid #FFD700;
    }
  
    .modal-saiyan {
      background: linear-gradient(to right, #300505, #800000);
      color: #FFD700;
    }
  
    .modal-namekian {
      background: linear-gradient(to right, #003300, #228B22);
      color: #C0FFEE;
    }
  
    .modal-human {
      background: linear-gradient(to right, #1a1a1a, #333333);
      color: #FFFFFF;
    }
  
    .modal-default {
      background: radial-gradient(circle, #1c1c3c, #000);
      color: #FFFFFF;
    }
  
    .img-fluid {
      border: 2px solid #FFA500;
      border-radius: 0.5rem;
      box-shadow: 0 0 10px rgba(255, 165, 0, 0.6);
    }
  
    .modal-footer .btn {
      background-color: #FF5722;
      color: white;
      font-weight: bold;
      border: none;
      box-shadow: 0 0 8px #FF9800;
    }
  
    .modal-footer .btn:hover {
      background-color: #e64a19;
      box-shadow: 0 0 12px #FF9800;
    }
  `]
  
  
  
})
export class ModalComponent {
  @Input() public personaje: Dbz = {
    id: 0,
    name: '',
    ki: '',
    maxKi: '',
    race: '',
    gender: '',
    description: '',
    image: '',
    affiliation: '',
    deletedAt: null,
    originPlanet: {
      id: 0,
      name: '',
      isDestroyed: false,
      description: '',
      image: '',
      deletedAt: null
    },
    transformations: []
  };

  private bootstrapModal: any;
  @ViewChild('modalElement') public modalElement!: ElementRef;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeModal();
    }
  }

  initializeModal(): void {
    import('bootstrap').then((bootstrap) => {
      this.bootstrapModal = new bootstrap.Modal(this.modalElement.nativeElement);
    });
  }

  open(personaje: Dbz): void {
    this.personaje = personaje;
    if (isPlatformBrowser(this.platformId)) {
      if (this.bootstrapModal) {
        this.bootstrapModal.show();
      } else {
        this.initializeModal();
        setTimeout(() => {
          this.bootstrapModal.show();
        }, 0);
      }
    }
  }

  close(): void {
    if (this.bootstrapModal) {
      this.bootstrapModal.hide();
    }
  }
  getModalClass(): string {
    const race = this.personaje.race?.toLowerCase();
    switch (race) {
    case 'saiyan':
    return 'modal-saiyan';
    case 'namekian':
    return 'modal-namekian';
    case 'human':
    return 'modal-human';
    default:
    return 'modal-default';
    }
    }
}