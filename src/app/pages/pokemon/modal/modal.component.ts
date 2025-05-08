import { isPlatformBrowser, NgFor, NgIf, TitleCasePipe } from "@angular/common";
import { Component, ElementRef, Inject, Input, PLATFORM_ID, ViewChild } from "@angular/core";
import { Pokemon } from "../interfaces/pokemons";

@Component({
  selector: 'pokemon-modal',
  standalone: true,
  imports: [NgFor, TitleCasePipe, NgIf],
  templateUrl: './modal.component.html',
  styles: ``
})
export class ModalComponent {
  @Input() public pokemon: Pokemon = {
    name: '',
    height: 0,
    weight: 0,
    sprites: {
      front_default: ''
    },
  } as Pokemon;

  private boostrapModal: any;
   @ViewChild('modalElement') public modaElement!: ElementRef;
   constructor(@Inject(PLATFORM_ID) private platformId:Object){}

   ngAfterViewInit():void{
    if (isPlatformBrowser(this.platformId)){
        this.initializeModal();
    }
   }

   initializeModal(): void{
    import('bootstrap').then((bootstrap) =>{
    
      this.boostrapModal = new bootstrap.Modal(this.modaElement.nativeElement)
      
    })        
    }

    open(pokemon:Pokemon):void{
        this.pokemon = pokemon;
        if(isPlatformBrowser(this.platformId)){
            if(this.boostrapModal){
                this.boostrapModal.show();
            }else{
                this.initializeModal();
                setTimeout(()=>{
                    this.boostrapModal.show();
                    
                },0)
            }
        }
    }

    close():void{
            this.boostrapModal.hide();
    }
 }

