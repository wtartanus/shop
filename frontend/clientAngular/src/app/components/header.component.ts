import {Component, OnInit, OnDestroy, Input, Output, EventEmitter, HostBinding} from '@angular/core';
import {IMyOptions, IMyDateModel} from 'mydatepicker';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';
declare var jquery:any;
declare var $ :any;
declare var FilmRoll:any;
// import 'rxjs/add/operator/toPromise';

import { ModelSliderComponent } from "./../components/modelSlider.component.js"
import { HeaderSliderComponent } from "./../components/headerSlider.component.js";
import { BasketService } from '../services/basket.service.js';
import { MessageService } from '../services/message.service.js';


@Component({
  selector: 'ng-header',
  templateUrl: 'src/app/views/header.component.html'
})
export class HeaderComponent implements OnInit {
    @Input() selectedCategory: string;
    @Input() selectedBasket: boolean;
    @Output() onCategoryChange = new EventEmitter<string>();
    public basketValues: any = {itemsCount: 0, totalCost: 0};
    public itemsCount: number = this.basket.itemsCount;
    subscription: Subscription;
    public categories: any = [
        {
            name: "Sex Toys",
            subCategories: [
                {
                    name: "Sex Toys For Ladies",
                    img: "images/categories/sex-toys-for-ladies.jpg"
                },
                {
                    name: "Sex Toys For Men",
                    img: "images/categories/sex-toys-for-men.jpg"
                }, 
                {
                    name: "Realistic Dildos and Vibes",
                    img: "images/categories/realistic-dildos-and-vibes.jpg"
                }, 
                {
                    name: "Other Dildos",
                    img: "images/categories/other-dildos.jpg"
                }, 
                {
                    name: "Glass",
                    img: "images/categories/glass.jpg"
                },
                {
                    name: "Anal Range",
                    img: "images/categories/anal-range.jpg"
                },
                {
                    name: "Sex Kits",
                    img: "images/categories/sex-kits.jpg"
                },
                {
                    name: "Sex Dolls",
                    img: "images/categories/sex-dolls.jpg"
                },
                {
                    name: "Branded Toys",
                    img: "images/categories/branded-toys.jpg"
                }
            ]
        },
        {
            name: "Clothes",
            subCategories: [
                {
                    name: "Babydolls",
                    img: "images/categories/babydolls.jpg"
                }, 
                {
                    name: "Basques and Corsets",
                    img: "images/categories/basques-and-corsets.jpg"
                }, 
                {
                    name: "Bodies and Playsuits",
                    img: "images/categories/bodies-and-playsuits.jpg"
                },
                {
                    name: "Bra Sets",
                    img: "images/categories/bra-sets.jpg"
                }, 
                {
                    name: "Dresses and Chemises",
                    img: "images/categories/dresses-and-chemises.jpg"
                },
                {
                    name: "Sexy Briefs",
                    img: "images/categories/sexy-briefs.jpg"
                },
                {
                    name: "Fantasy",
                    img: "images/categories/fantasy.jpg"
                },
                {
                    name: "Stockings",
                    img: "images/categories/stockings.jpg"
                },
                {
                    name: "Plus Size Lingerie",
                    img: "images/categories/plus-size-lingerie.jpg"
                },
                {
                    name: "Leather",
                    img: "images/categories/leather.jpg"
                }, 
                {
                    name: "Latex",
                    img: "images/categories/latex.jpg"
                }, 
                {
                    name: "Accessories",
                    img: "images/categories/accessories.jpg"
                }, 
                {
                    name: "Body Jewellery",
                    img: "images/categories/body-jewellery.jpg"
                }
            ]
        },
        {
            name: "Bondage Gear",
            subCategories: [
                {
                    name: "Restraints",
                    img: "images/categories/restraints.jpg"
                }, 
                {
                    name: "Handcuffs",
                    img: "images/categories/handcuffs.jpg"
                }, 
                {
                    name: "Whips",
                    img: "images/categories/whips.jpg"
                }, 
                {
                    name: "Collars",
                    img: "images/categories/collars.jpg"
                }, 
                {
                    name: "Gags and Bits",
                    img: "images/categories/gags-and-bits.jpg"
                }, 
                {
                    name: "Nipple Clamps",
                    img: "images/categories/nipple-clamps.jpg"
                }, 
                {
                    name: "Masks",
                    img: "images/categories/masks.jpg"
                }, 
                {
                    name: "Bondage Cock Rings",
                    img: "images/categories/bondage-cock-rings.jpg"
                },
                {
                    name: "Bondage Hoods",
                    img: "images/categories/bondage-hoods.jpg"
                },
                {
                    name: "Bondage Kits",
                    img: "images/categories/bondage-kits.jpg"
                },
                {
                    name: "Cock and Ball Bondage",
                    img: "images/categories/cock-and-ball-bondage.jpg"
                },
                {
                    name: "Electro Sex Stimulation",
                    img: "images/categories/electro-sex-stimulation.jpg"
                },
                {
                    name: "Fetish Fantasy Series",
                    img: "images/categories/fetish-fantasy-series.jpg"
                },
                {
                    name: "Large Accessories",
                    img: "images/categories/large-accessories.jpg"
                },
                {
                    name: "Male Chasity",
                    img: "images/categories/male-chasity.jpg"
                },
                {
                    name: "Medical Instruments",
                    img: "images/categories/medical-instruments.jpg"
                },
                {
                    name: "Paddles",
                    img: "images/categories/paddles.jpg"
                },
                {
                    name: "PVC Orgy Beddingk",
                    img: "images/categories/pvc-orgy-bedding.jpg"
                }
            ]
        },
        {
            name: "Other",
            subCategories: [
                {
                    name: "Media",
                    img: "images/categories/media.jpg"
                }, 
                {
                    name: "Games",
                    img: "images/categories/games.jpg"
                }, 
                {
                    name: "Brands",
                    img: "images/categories/novelties.jpg"
                },
                {
                    name: "Relaxation Zone",
                    img: "images/categories/hen-and-stag-nights.jpg"
                }, 
                {
                    name: "Hen and Stag Nights",
                    img: "images/categories/relaxation-zone.jpg"
                }, 
                {
                    name: "Lubricants",
                    img: "images/categories/lubricants.jpg"
                }, 
                {
                    name: "Condoms",
                    img: "images/categories/condoms.jpg"
                }
            ]
        }
    ];

    constructor (public basket: BasketService, private messageService: MessageService) {
        this.subscription = this.messageService.getMessage().subscribe(message => this.processMessage(message));
    }

    processMessage(message: any): void{
      if (message.text === "basket-update") {
          this.basketValues.itemsCount = message.body.itemsCount;
          this.basketValues.totalCost = message.body.totalCost;
      }
    }

    ngOnInit() {
      console.log("category header", this.selectedCategory);
    }

    changeCategory(category: string): void {
        this.selectedCategory = category;
        this.onCategoryChange.emit(this.selectedCategory);
    }

    goToHomePage(): void{
        this.selectedCategory = null;
        this.onCategoryChange.emit(this.selectedCategory);
    }
}
