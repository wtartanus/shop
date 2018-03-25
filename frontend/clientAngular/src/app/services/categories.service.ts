import {Injectable} from '@angular/core';

@Injectable()
export class CategoriesService {
     public categoriesTree: any = [
        {
            name: "Novelties",
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
                    img: "images/categories/hen-and-stag-nights.jpg",
                    subCategories: [
                        {
                            name: "Lubricants and Oils",
                            img: "images/categories/lubricants-and-oils.jpg"
                        },
                        {
                            name: "Flavoured Lubricants and Oils",
                            img: "images/categories/flavoured-lubricants-and-oils.jpg"
                        },
                        {
                            name: "Personal Hygiene",
                            img: "images/categories/personal-hygiene.jpg"
                        },
                        {
                            name: "Anal Lubricants",
                            img: "images/categories/anal-lubricants.jpg"
                        },
                        {
                            name: "Edible Treats",
                            img: "images/categories/edible-treats.jpg"
                        },
                        {
                            name: "Bath and Massage",
                            img: "images/categories/bath-and-massage.jpg"
                        },
                        {
                            name: "Kama Sutra",
                            img: "images/categories/kama-sutra.jpg"
                        }
                    ]
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
                    img: "images/categories/condoms.jpg",
                    subCategories: [
                        {
                            name: "Control Condoms",
                            img: "images/categories/control-condoms.jpg"
                        },
                        {
                            name: "Flavoured, Coloured, Novelty",
                            img: "images/categories/flavoured-coloured-novelty.jpg"
                        },
                        {
                            name: "Large and X-Large",
                            img: "images/categories/large-and-x-large.jpg"
                        },
                        {
                            name: "Natural and Regular",
                            img: "images/categories/natural-and-regular.jpg"
                        },
                        {
                            name: "Safe and Strong",
                            img: "images/categories/safe-and-strong.jpg"
                        },
                        {
                            name: "Stimulating, Ribbed, Warming",
                            img: "images/categories/stimulating-ribbed-warming.jpg"
                        },
                        {
                            name: "Ultra Thin",
                            img: "images/categories/ultra-thin.jpg"
                        }
                    ]
                }
            ]
        },
        {
            name: "Sex Toys",
            subCategories: [
                {
                    name: "Sex Toys For Ladies",
                    img: "images/categories/sex-toys-for-ladies.jpg",
                    subCategories: [
                        {
                            name: "Bunny Vibrators",
                            img: "images/categories/bunny-vibrators.jpg"
                        },
                        {
                            name: "Female Pumps",
                            img: "images/categories/female-pumps.jpg"
                        },
                        {
                            name: "Finger Vibrators",
                            img: "images/categories/finger-vibrators.jpg"
                        },
                        {
                            name: "G-Spot Vibrators",
                            img: "images/categories/g-spot-vibrators.jpg"
                        },
                        {
                            name: "Kegel Exercise",
                            img: "images/categories/kegel-exercise.jpg"
                        },
                        {
                            name: "Mini Vibrators",
                            img: "images/categories/mini-vibrators.jpg"
                        },
                        {
                            name: "Nipple Vibrators",
                            img: "images/categories/nipple-vibrators.jpg"
                        },
                        {
                            name: "Remote Control Toys",
                            img: "images/categories/remote-control-toys.jpg"
                        },
                        {
                            name: "Vibrators With Clit Stims",
                            img: "images/categories/vibrators-with-clit-stims.jpg"
                        },
                        {
                            name: "Wand Massagers and Attachments",
                            img: "images/categories/wand-massagers-and-attachments.jpg"
                        },
                        {
                            name: "Standard Vibrators",
                            img: "images/categories/standard-vibrators.jpg"
                        },
                        {
                            name: "Orgasm Balls",
                            img: "images/categories/orgasm-balls.jpg"
                        },
                        {
                            name: "Other Style Vibrators",
                            img: "images/categories/other-style-vibrators.jpg"
                        },
                        {
                            name: "Clitoral Vibrators and Stimulators",
                            img: "images/categories/clitoral-vibrators-and-stimulators.jpg"
                        },
                        {
                            name: "Duo Penetrator",
                            img: "images/categories/duo-penetrator.jpg"
                        },
                        {
                            name: "Vibrating Eggs",
                            img: "images/categories/vibrating-eggs.jpg"
                        }
                    ]
                },
                {
                    name: "Sex Toys For Men",
                    img: "images/categories/sex-toys-for-men.jpg",
                    subCategories: [
                        {
                            name: "Fleshlight Range",
                            img: "images/categories/fleshlight-range.jpg"
                        },
                        {
                            name: "Penis Developers",
                            img: "images/categories/penis-developers.jpg"
                        },
                        {
                            name: "Vibrating Masturbators",
                            img: "images/categories/vibrating-masturbators.jpg"
                        },
                        {
                            name: "Realistic Masturbators",
                            img: "images/categories/realistic-masturbators.jpg"
                        },
                        {
                            name: "Love Rings",
                            img: "images/categories/love-rings.jpg"
                        },
                        {
                            name: "Vibrating Vaginas",
                            img: "images/categories/vibrating-vagina.jpgs"
                        },
                        {
                            name: "Love Ring Vibrators",
                            img: "images/categories/love-ring-vibrators.jpg"
                        },
                        {
                            name: "Penis Extenders",
                            img: "images/categories/penis-extenders.jpg"
                        },
                        {
                            name: "Masturbators",
                            img: "images/categories/masturbators.jpg"
                        },
                        {
                            name: "Penis Enlargers",
                            img: "images/categories/penis-enlargers.jpg"
                        },
                        {
                            name: "Penis Sleeves",
                            img: "images/categories/penis-sleeves.jpg"
                        }
                    ]
                },
                {
                    name: "Branded Toys",
                    img: "images/categories/branded-toys.jpg",
                    subCategories: [
                        {
                            name: "Berman Centre",
                            img: "images/categories/berman-centre.jpg"
                        },
                        {
                            name: "Big Tease Toys",
                            img: "images/categories/big-tease-toys.jpg"
                        },
                        {
                            name: "Bijoux Indiscrets",
                            img: "images/categories/bijoux-indiscrets.jpg"
                        },
                        {
                            name: "Colt",
                            img: "images/categories/colt.jpg"
                        },
                        {
                            name: "Feelztoys",
                            img: "images/categories/feelztoys.jpg"
                        },
                        {
                            name: "Fifty Shades of Grey",
                            img: "images/categories/fifty-shades-of-grey.jpg"
                        },
                        {
                            name: "Jimmy Jane",
                            img: "images/categories/jimmy-jane.jpg"
                        },
                        {
                            name: "Lelo",
                            img: "images/categories/lelo.jpg"
                        },
                        {
                            name: "Nexus",
                            img: "images/categories/nexus.jpg"
                        },
                        {
                            name: "Njoy",
                            img: "images/categories/njoy.jpg"
                        },
                        {
                            name: "OVO",
                            img: "images/categories/ovo.jpg"
                        },
                        {
                            name: "Rends",
                            img: "images/categories/rends.jpg"
                        },
                        {
                            name: "Rocks Off",
                            img: "images/categories/rocks-off.jpg"
                        },
                        {
                            name: "Screaming O",
                            img: "images/categories/screaming-o.jpg"
                        },
                        {
                            name: "Tantus",
                            img: "images/categories/tantus.jpg"
                        },
                        {
                            name: "Tenga Masturbators",
                            img: "images/categories/tenga-masturbators.jpg"
                        },
                        {
                            name: "Toy Joy",
                            img: "images/categories/toy-joy.jpg"
                        },
                        {
                            name: "VacuLock Sex System",
                            img: "images/categories/vacuLock-sex-system.jpg"
                        },
                        {
                            name: "Vibratex",
                            img: "images/categories/vibratex.jpg"
                        },
                        {
                            name: "We-Vibe",
                            img: "images/categories/we-vibe.jpg"
                        },
                        {
                            name: "Zini",
                            img: "images/categories/zini.jpg"
                        }
                    ]
                },
                {
                    name: "Realistic Dildos and Vibes",
                    img: "images/categories/realistic-dildos-and-vibes.jpg",
                    subCategories: [
                        {
                            name: "Penis Vibrators",
                            img: "images/categories/penis-vibrators.jpg"
                        },
                        {
                            name: "Realistic Dildos",
                            img: "images/categories/realistic-dildos.jpg"
                        },
                        {
                            name: "Strap on Dildo",
                            img: "images/categories/strap-on-dildo.jpg"
                        },
                        {
                            name:"Strapless Strap Ons",
                            img: "images/categories/strapless-strap-ons.jpg"
                        },
                        {
                            name:"Hollow Strap Ons",
                            img: "images/categories/hollow-strap-ons.jpg"
                        },
                        {
                            name:"Mould your own kits",
                            img: "images/categories/mould-your-own-kits.jpg"
                        },
                        {
                            name:"Strap On Harnesses",
                            img: "images/categories/strap-on-harnesses.jpg"
                        },
                        {
                            name:"Vibrating Strap Ons",
                            img: "images/categories/vibrating-strap-ons.jpg"
                        },
                        {
                            name:"Penis Dildo",
                            img: "images/categories/penis-dildo.jpg"
                        },
                        {
                            name:"Squirting Dildos",
                            img: "images/categories/squirting-dildos.jpg"
                        },
                        {
                            name: "Double Dildos",
                            img: "images/categories/double-dildos.jpg"
                        },
                        {
                            name: "Realistic Vibrators",
                            img: "images/categories/realistic-vibrators.jpg"
                        }
                    ]
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
                    img: "images/categories/anal-range.jpg",
                    subCategories: [
                        {
                            name: "Butt Plugs",
                            img: "images/categories/butt-plugs.jpg"
                        },
                        {
                            name: "Prostate Massagers",
                            img: "images/categories/prostate-massagers.jpg"
                        },
                        {
                            name: "Anal Probes",
                            img: "images/categories/anal-probes.jpg"
                        },
                        {
                            name: "Anal Inflatables",
                            img: "images/categories/anal-inflatables.jpg"
                        },
                        {
                            name: "Anal Beads",
                            img: "images/categories/anal-beads.jpg"
                        },
                        {
                            name: "Tunnel and Stretchers",
                            img: "images/categories/tunnel-and-stretchers.jpg"
                        },
                        {
                            name: "Tail Butt Plugs",
                            img: "images/categories/tail-butt-plugs.jpg"
                        },
                        {
                            name: "Vibrating Buttplug",
                            img: "images/categories/vibrating-buttplug.jpg"
                        }
                    ]
                },
                {
                    name: "Sex Kits",
                    img: "images/categories/sex-kits.jpg"
                },
                {
                    name: "Sex Dolls",
                    img: "images/categories/sex-dolls.jpg",
                    subCategories: [
                        {
                            name: "Female Love Dolls",
                            img: "images/categories/female-love-dolls.jpg"
                        },
                        {
                            name: "Male Love Dolls",
                            img: "images/categories/male-love-dolls.jpg"
                        }
                    ]
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
        }
    ];
}
