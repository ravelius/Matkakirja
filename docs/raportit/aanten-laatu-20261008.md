# Äänten kuulematon laaduntarkistus ja ammattikirjastot, 8.10.2026 (Pelikoodari)

Omistajan kysymys 19.5x: "Kuinka hyviä noista äänistä tulee rehellisesti?"

## Rehellinen vastaus
- **Sateet, ukkonen, räystäs, kello ja uinti ovat hyviä.** Luokitin tunnistaa ne oikein vahvasti (0,70–0,89), eikä niissä ole puhetta, liikennettä, lintuja eikä musiikkia. Ne ovat oikeita kenttätallenteita, ja saumat on mitattu naksahduksettomiksi.
- **Lyhyet tehosteet (aanet-fp-v2: tiili, köysi, avaimet, sukellus) ovat heikoin kohta.** Luokitin ei tunnista niitä luotettavasti (tavallista 0,3 s:n äänille). Silti köysi-kiinnitys luokittui "pieruksi" (0,26), köysi-lasku "vetoketjuksi" ja sukellus ei vedeksi. Ne ovat ilmaiskirjastojen yleistehosteita tai Freesoundin esikuuntelulaatua, ja juuri tässä maksullinen kirjasto auttaisi eniten.
- **Ensimmäinen versio (v2) ei läpäissyt kaikkea.** Muurin tippuminen luokittui musiikiksi, ja märät askeleet kuulostivat mallista rumpukoneelta, koska niissä oli tasainen tahti ja hiljaisuus askelten välillä. Ne korjattiin versioon v3 (polku seikkailu/olavinlinna/aanet-saa-v3, vienti Julkaisijalla).
- Mallin rajoitus: AST ei tunnista askelia edes oikeasta märän polun tallenteesta (kuulee "rouhintaa"). Askelissa kriteeri on siksi "ei puhetta eikä musiikkia" ja oikea kävely lähteenä.

## Menetelmä
_tyo/aani-qa/tarkista.py (venv-aaniluokitin): AST-luokitin (MIT/ast-finetuned-audioset-10-10-0.4593, AudioSet 527 luokkaa) 10 s:n ikkunoissa; silmukat toistettuina 10 s:iin. Vieraat luokat: puhe, musiikki, liikenne, linnut ja eläimet (näytetään ≥ 0,10). Leikkautuminen on näytteitä |x| ≥ 0,999 stereona. Kohinapohja on 50 ms RMS:n 5. persentiili (silmukka) tai häntä (kerta). Sauma on viimeinen → ensimmäinen näyte paikallisen näytevaihtelun kerrannaisena (≤ ~3 = normaali) ja suhteessa silmukan tasoon.

| paketti | tunnus | luokitin #1 | odotettu luokka | vieraat ≥ 0,10 | leikk. | huippu dBFS | pohja dBFS | sauma | arvio |
|---|---|---|---|---|---|---|---|---|---|
| saa-v3 | ukkonen-jyly | Thunder 0.79 | Thunder 0.79 | – | 0 | -3.6 | -56.6 | 0.1× / -41.0 dB | hyvä |
| saa-v3 | sade-vesi | Rain 0.78 | Rain 0.78 | – | 0 | -8.1 | -26.6 | 0.2× / -23.4 dB | hyvä |
| saa-v3 | sade-pressu | Rain on surface 0.89 | Rain on surface 0.89 | – | 0 | -3.6 | -26.7 | 2.0× / -11.5 dB | hyvä |
| saa-v3 | sade-kivi | Raindrop 0.82 | Raindrop 0.82 | – | 0 | -2.2 | -31.6 | 0.4× / -16.4 dB | hyvä |
| saa-v3 | sade-puu | Rain on surface 0.76 | Rain on surface 0.76 | – | 0 | -3.5 | -27.5 | 2.0× / -9.9 dB | hyvä |
| saa-v3 | tippuminen-raystas | Raindrop 0.70 | Raindrop 0.70 | – | 0 | -0.9 | -29.6 | 0.6× / -13.1 dB | hyvä (v3) |
| saa-v3 | tippuminen-muuri | Drip 0.13 | Drip 0.13 | – | 0 | -2.8 | -29.8 | 0.1× / -30.3 dB | kelpaa (v3; tippumista, välillä tikitystä) |
| saa-v3 | askel-kivi-marka | Crunch 0.41 | Shuffle 0.00 | – | 0 | -10.5 | -65.9 | 0.3× / -39.5 dB | kelpaa (v3; malli kuulee rouhintaa, ei askelia — samoin oikeasta tallenteesta) |
| saa-v3 | askel-puu-marka | Scissors 0.12 | Walk, footsteps 0.00 | – | 0 | -10.9 | -86.6 | 1.3× / -50.4 dB | kelpaa (v3) |
| saa-v3 | askel-laituri-marka | Chopping (food) 0.26 | Walk, footsteps 0.00 | – | 0 | -14.3 | -82.0 | 13.7× / -33.7 dB | heikko-kelpaa (lankkujen kopina kuin koputus) |
| saa-v3 | vihje-kimallus | Sound effect 0.17 | Bell 0.00 | musiikki 0.15 | 0 | -14.8 | -66.5 | – | kelpaa (tehoste, lievä musiikki 0,15) |
| fp-v2 | tiili-raapaisu | Speech 0.07 | Rub 0.03 | – | 0 | -9.1 | -53.0 | – | epävarma (lyhyt, malli ei tunnista) |
| fp-v2 | tiili-raapaisu-2 | Speech 0.06 | Scrape 0.06 | – | 0 | -9.0 | -37.5 | – | epävarma (lyhyt) |
| fp-v2 | tiili-putoaa | Tearing 0.15 | Scrape 0.01 | – | 0 | -9.2 | -61.3 | – | epävarma (lyhyt) |
| fp-v2 | tiili-lasku | Crack 0.66 | Scrape 0.01 | – | 0 | -9.3 | -50.6 | – | kelpaa (kivi rasahtaa) |
| fp-v2 | koysi-otto | Chopping (food) 0.33 | Rustle 0.00 | – | 0 | -9.3 | -49.5 | – | heikko |
| fp-v2 | koysi-kiinnitys | Fart 0.26 | Creak 0.01 | – | 0 | -9.3 | -35.5 | – | HEIKKO: luokittui pieruksi (esikuuntelu) |
| fp-v2 | koysi-katkeaa | Rub 0.10 | Rub 0.10 | – | 0 | -9.2 | -49.1 | – | epävarma |
| fp-v2 | avainnippu | Crunch 0.24 | Coin (dropping) 0.02 | – | 0 | -9.2 | -50.4 | – | heikko (ei avaimia) |
| fp-v2 | kulho-poyta | Coin (dropping) 0.58 | Dishes, pots, and pans 0.00 | – | 0 | -9.4 | -47.1 | – | kelpaa (kolikko/kilahdus) |
| fp-v2 | ovi-narahdus | Sound effect 0.23 | Squeak 0.20 | – | 0 | -9.3 | -55.4 | – | kelpaa (narahdus) |
| fp-v2 | sukellus | Crunch 0.06 | Water 0.00 | – | 0 | -9.2 | -62.6 | – | HEIKKO (ei vettä) |
| fp-v2 | uinti | Water 0.56 | Water 0.56 | – | 0 | -12.0 | -26.4 | 0.2× / -24.5 dB | hyvä |
| fp-v2 | koysi-lasku | Zipper (clothing) 0.41 | Rub 0.01 | – | 0 | -4.3 | -38.8 | 1.4× / -37.4 dB | heikko (vetoketju) |
| fp-v2 | kello-halytys | Church bell 0.79 | Church bell 0.79 | – | 0 | -9.2 | -32.4 | 3.3× / -12.3 dB | hyvä |
| fp-v2 | tuuli-muuri | Rustling leaves 0.24 | Wind 0.19 | – | 0 | -4.3 | -47.5 | 4.1× / -22.3 dB | kelpaa (lehtien kahina + tuuli) |
| fp-v2 | tuuli-puuska | Rustling leaves 0.17 | Wind noise (microphone) 0.11 | – | 0 | -9.3 | -59.9 | – | kelpaa |
| fp-v2 | molskahdus | Slosh 0.23 | Slosh 0.23 | – | 0 | -9.3 | -52.5 | – | kelpaa |
| fp-v2 | airot | Water 0.15 | Water 0.15 | – | 0 | -4.3 | -49.8 | 0.9× / -28.1 dB | kelpaa |

Huomiot: laiturin saumaluku 13,7× johtuu askelten välisestä lähes äänettömästä kohdasta (−82 dBFS); hyppy on −34 dB silmukan tasosta, eli ei kuulu. Kellon (3,3×) ja tuulen (4,1×) sauma on hieman yli normaalin, mutta −12 / −22 dB, eli tarkkaile laitteella.

## Ammattikirjastot (omistaja ostaa; hinnat verkkokaupoista, tarkistettava ennen ostoa)
1. **Soundsnap, vuositilaus noin 249 $ / v** (rajaton lataus, yli 500 000 ääntä). Kattaa kaiken pyydetyn: askeleet, ovet, avaimet, liekit, kivi, puu ja vesi. Lisenssi on rojaltivapaa kaupalliseen käyttöön myös peleissä; ladatut äänet saa pitää tilauksen jälkeen (tarkistettava soundsnap.com:in ehdoista). **Suositus:** laajin kattavuus yhdellä ostolla, ja tilauksen voi lopettaa vuoden jälkeen.
2. **Krotos Ultimate Footsteps, noin 179 $** (8 341 ääntä, 24-bit/48 kHz, märkä betoni, lätäköt, muta, ontto ja kiinteä puu). Vaihtoehto on Pro Sound Effects Game Audio Collection: Footsteps (noin 299 $, 10 695 tiedostoa, myös kivi ja vesi). Nämä ovat vain askeleita, mutta ammattilaatua ja pelikäyttöön tehtyjä.
- Ilmainen lisä: **Sonniss GDC -paketit** (2015–2026, yli 200 Gt ammattiääniä, rojaltivapaa, ei nimeämisvaatimusta, ilmainen). Lisenssi on oma, ei CC, joten se on omistajan päätös kuten ostotkin.
- **Mobiilipeliin sopivuus:** kaikki ovat rojaltivapaita ja sallivat äänet pelin sisällä. Yhteinen ehto: ääniä ei saa jakaa erillisinä tiedostoina. Meidän mp3:t ovat julkisessa ämpärissä suorilla URL:eilla (media.matkakirja.app). Ennen ostoa kannattaa tarkistaa myyjältä, lasketaanko pelin oma latauspalvelin jakeluksi. Tavallisesti ei, kun äänet ovat pelin käytössä eikä kirjastona, mutta ehto kannattaa varmistaa kirjallisesti.

Lähteet: boomlibrary.com, krotosaudio.com/products/ultimate-footsteps-sound-effects-library, prosoundeffects.com/libraries/game-audio-collection-footsteps, nofilmschool.com/soundsnap, rekkerd.org (Sonniss GDC 2026).


# Osa 2: kaikki pelin tehosteäänet (8.10.2026 ilta, PT:n tilaus)

Laajuus 118 ääntä: natiivin masteriin pakatut (pallon kori ja liekki, kävely, radio, Mylly, Tavli, käyttöliittymän efekti-*, Candle) ja ämpärin paketit,
joihin master viittaa (Olavinlinna aanet-e3-v1 ja aanet-fp-v1, ukkonen, äänimaisema-v1, ihmisen matka, cupola-humina). Puhe ja musiikki pois.
Työkalut _tyo/aani-qa/inventaario.py ja kaikki.py (sama AST-luokitin ja mittarit kuin osassa 1; huiput stereona).
Huom.: alle 0,5 s:n äänissä luokitin on epäluotettava (esim. "puhe 0,15" 0,1 s:n naksussa ei ole puhetta), joten ne arvioitiin vain selvistä virheistä.
Kaupunkien äänimaisemissa puhe ja liikenne kuuluvat asiaan (tori, kahvila, raitiovaunu), joten niitä ei hylätty.

## Hylätyt (19), korjattavat
| ääni | ryhmä | syy | korjaus |
|---|---|---|---|
| candle-crackling | Candle (Asset Store, repo) | sauma naksahtaa 40,8× / +9,8 dB | ristihäivytetty sauma, repoon |
| sydan | Olavinlinna e3 | sauma naksahtaa 19,3× | ristihäivytetty sauma, aanet-e3-v2 |
| efekti-laiva, efekti-voitto | käyttöliittymä (repo) | leikkautuu (+0,5…+0,6 dBFS) | taso −1 dBFS, repoon |
| luola | ihmisen matka | leikkautuu (+0,8 dBFS) | taso −1 dBFS, uusi polku |
| tuuli-rako | Olavinlinna e3 | sireeni 0,54 | uusi CC0-tuuli, aanet-e3-v2 |
| luukku-narahdus, liina-avaus | Olavinlinna e3 | huuto 0,15 / pilkkominen 0,62 | uusi CC0, aanet-e3-v2 |
| askel-olki, askel-porras-1 | Olavinlinna fp-v1 | ilotulite 0,15 / mekaaninen rumpukone | oikea kävely (kuten märät askeleet), uusi polku |
| kirjasto-liekin-humahdus, eleven-korin-narina | pallo (repo) | ajoneuvo 0,24 ja kohina −13 dBFS / pieru 0,17 | uusi CC0, repoon |
| mylly-siirto | Mylly (repo) | ankka/eläin 0,18 | uusi CC0, repoon |
| tuuli-01, kirkko-01 | äänimaisema-v1 | linnut eikä tuulta / musiikki 0,61 | kirkko tarkistettava (urut?), tuuli uusi, aanimaisema-v2 |
| tundratuuli, kylma-tuuli, arktinen-tuuli, hiljainen-tuuli | ihmisen matka | juna 0,73 / purkaus+liikenne / räjähdys / sade | uudet CC0-tuulet, uusi polku |

## Muut löydökset
- **aanet/tulen-rasina.mp3 palauttaa 404**, vaikka master viittaa siihen.
- **Maisemakori striimaa tuotannossa 27 ääntä suoraan Freesoundin CDN:stä ja 3 archive.orgista** (AaniTaulut.cs, lq-esikuuntelut). Niiden lisenssejä ei ole tarkistettu (Freesoundissa myös CC BY ja CC BY-NC), laatu on matala, ja ne riippuvat kolmannen osapuolen CDN:stä. Suositus: lisenssit Freesound-API:lla, CC0-versiot omaan ämpäriin ja muut korvataan.
- Hyviä (≥ 0,7): ukkoset 0,77–0,87, aallot 0,86, sade 0,77, kello 0,82, sydämen ääni 0,91, ontto koputus 0,84, nopat 0,67–0,95, kolikot 0,69, sumutorvi 0,65, meri 0,83–0,84, metsäsade 0,81.

| ryhmä | tunnus | kesto s | luokitin #1; #2 | vieraat ≥ 0,10 | leikk. | huippu dBFS | pohja dBFS | sauma | arvio |
|---|---|---|---|---|---|---|---|---|---|
| pallo | eleven-kankaan-huokaus | 2.0 | Zipper (clothing) 0.06; Whoosh, swoosh, swish 0.04 | – | 0 | -32.7 | -82.7 | – | ok |
| pallo | eleven-korin-narina | 2.48 | Fart 0.17; Zipper (clothing) 0.15 | – | 0 | -6.7 | -62.0 | – | VÄÄRÄ: pieru 0,17 |
| pallo | eleven-koyden-kiristys | 2.0 | Sound effect 0.22; Scrape 0.13 | – | 0 | -7.2 | -41.8 | – | ok |
| pallo | eleven-liekin-humahdus | 1.48 | Explosion 0.65; Burst, pop 0.32 | – | 0 | -3.7 | -57.0 | – | ok |
| pallo | kirjasto-liekin-humahdus | 1.88 | Vehicle 0.24; Car 0.12 | liikenne 0.24 | 0 | -6.4 | -13.1 | – | VÄÄRÄ: ajoneuvo 0,24, kohinapohja −13 dBFS |
| kavely | hengitys-silmukka | 7.0 | Breathing 0.37; Snort 0.30 | – | 0 | -8.4 | -30.6 | 0.3× / -48.5 dB | ok |
| kavely | ilmalukko-luukku | 1.28 | Bang 0.50; Sound effect 0.26 | – | 0 | -6.1 | -78.6 | – | ok |
| kavely | ilmalukko-paine | 2.56 | Spray 0.36; Hiss 0.29 | – | 0 | -11.9 | -49.3 | – | ok |
| kavely | karabiini | 0.48 | Single-lens reflex camera 0.17; Sound effect 0.13 | – | 0 | -6.1 | -79.9 | – | ok |
| kavely | pulu-1 | 7.92 | Speech 0.93; Speech synthesizer 0.17 | puhe 0.93 | 0 | -4.4 | -48.7 | – | puhetta (Pulun ääni), ei tarkisteta |
| kavely | pulu-2 | 8.8 | Speech 0.72; Female speech, woman speaking 0.13 | puhe 0.72 | 0 | -3.6 | -45.7 | – | puhetta (Pulun ääni), ei tarkisteta |
| kavely | pulu-3 | 7.12 | Speech 0.93; Female speech, woman speaking 0.10 | puhe 0.93 | 0 | -3.3 | -31.0 | – | puhetta (Pulun ääni), ei tarkisteta |
| kavely | suljin | 0.48 | Creak 0.08; Coin (dropping) 0.06 | – | 0 | -6.1 | -20.2 | – | ok |
| radio | radio-kohina-silmukka | 8.0 | White noise 0.51; Static 0.17 | – | 0 | -11.9 | -22.4 | 0.0× / -40.1 dB | ok |
| radio | radio-kytkin-paalle | 0.48 | Tick 0.11; Scissors 0.10 | – | 0 | -6.1 | -75.9 | – | ok |
| radio | radio-kytkin-pois | 0.48 | Clang 0.24; Ding 0.07 | – | 0 | -6.1 | -60.5 | – | ok |
| radio | radio-lampeneminen | 2.4 | Music 0.13; Sound effect 0.07 | musiikki 0.13 | 0 | -8.4 | -52.0 | – | ok |
| radio | radio-lukittuminen | 1.0 | Hum 0.14; Static 0.13 | – | 0 | -6.1 | -57.6 | – | ok |
| mylly | mylly-asetus | 0.13 | Sound effect 0.15; Speech 0.14 | puhe 0.14, musiikki 0.10 | 0 | -4.5 | -34.8 | – | ok |
| mylly | mylly-havio | 1.73 | Ringtone 0.60; Sound effect 0.13 | – | 0 | -9.0 | -32.0 | – | ok |
| mylly | mylly-mylly | 0.4 | Sound effect 0.06; Speech 0.04 | – | 0 | -9.0 | -68.0 | – | ok |
| mylly | mylly-poisto | 0.18 | Sound effect 0.16; Music 0.11 | musiikki 0.11 | 0 | -4.5 | -33.3 | – | ok |
| mylly | mylly-siirto | 0.31 | Animal 0.18; Quack 0.13 | – | 0 | -9.0 | -24.5 | – | VÄÄRÄ: eläin/ankka 0,18 |
| mylly | mylly-voitto | 0.47 | Music 0.36; Ringtone 0.34 | musiikki 0.36 | 0 | -9.0 | -57.2 | – | ok |
| tavli | tavli-havio | 1.61 | Music 0.21; Sound effect 0.07 | musiikki 0.21 | 0 | -9.0 | -41.4 | – | ok |
| tavli | tavli-lyonti | 0.44 | Door 0.40; Knock 0.23 | – | 0 | -9.0 | -52.5 | – | ok |
| tavli | tavli-noppa-1 | 0.84 | Coin (dropping) 0.67; Crack 0.06 | – | 0 | -9.0 | -31.2 | – | ok |
| tavli | tavli-noppa-2 | 0.97 | Coin (dropping) 0.95; Sound effect 0.02 | – | 0 | -9.0 | -44.7 | – | ok |
| tavli | tavli-noppa-3 | 0.65 | Breaking 0.12; Clapping 0.10 | – | 0 | -9.0 | -47.0 | – | ok |
| tavli | tavli-poisto | 0.26 | Crack 0.31; Crackle 0.05 | – | 0 | -9.0 | -56.3 | – | ok |
| tavli | tavli-siirto | 0.1 | Speech 0.15; Music 0.07 | puhe 0.15 | 0 | -9.0 | -35.6 | – | ok |
| tavli | tavli-voitto | 1.25 | Sound effect 0.26; Music 0.25 | musiikki 0.25 | 0 | -9.0 | -42.1 | – | ok |
| ui | efekti-aikaloppui | 1.48 | Whoosh, swoosh, swish 0.07; Slosh 0.06 | – | 0 | -8.1 | -58.2 | – | ok |
| ui | efekti-jalokivi | 1.48 | Coin (dropping) 0.25; Sound effect 0.12 | – | 0 | -4.6 | -81.2 | – | ok |
| ui | efekti-jumissa | 1.0 | Door 0.28; Knock 0.19 | – | 0 | -3.8 | -76.7 | – | ok |
| ui | efekti-kaanto | 0.8 | Knock 0.48; Plop 0.09 | – | 0 | -7.1 | -77.7 | – | ok |
| ui | efekti-klik | 0.6 | Tick 0.17; Tick-tock 0.15 | – | 0 | -2.0 | -77.4 | – | ok |
| ui | efekti-kolikot | 1.36 | Coin (dropping) 0.69; Breaking 0.09 | – | 0 | -3.1 | -81.8 | – | ok |
| ui | efekti-laiva | 2.48 | Foghorn 0.65; Vehicle horn, car horn, honking 0.55 | – | 102 | 0.6 | -81.9 | – | LEIKKAUTUU (102 näytettä, +0,6 dBFS) |
| ui | efekti-lento | 2.0 | Sound effect 0.13; Vehicle 0.06 | – | 0 | -0.7 | -69.5 | – | ok |
| ui | efekti-naksu | 0.48 | Sound effect 0.16; Coin (dropping) 0.12 | – | 0 | -6.0 | -82.4 | – | ok |
| ui | efekti-oikein | 1.48 | Ding 0.49; Sound effect 0.11 | – | 0 | -12.5 | -81.6 | – | ok |
| ui | efekti-paperi | 1.2 | Scrape 0.07; Zipper (clothing) 0.06 | – | 0 | -17.7 | -81.0 | – | ok |
| ui | efekti-pyyhkaisy | 0.68 | Scrape 0.07; Sound effect 0.06 | – | 0 | -9.1 | -82.7 | – | ok |
| ui | efekti-tahti | 2.48 | Ding 0.24; Music 0.11 | musiikki 0.11 | 0 | -0.5 | -78.9 | – | ok |
| ui | efekti-tikitys | 0.48 | Clang 0.09; Sound effect 0.07 | – | 0 | -4.6 | -76.4 | – | ok |
| ui | efekti-tyhja | 1.0 | Clang 0.49; Ding 0.15 | – | 0 | -23.5 | -82.5 | – | ok |
| ui | efekti-vaarin | 1.0 | Door 0.44; Slam 0.22 | – | 0 | -0.6 | -79.4 | – | ok |
| ui | efekti-vihje | 1.0 | Sound effect 0.07; Music 0.04 | – | 0 | -23.7 | -58.5 | – | ok |
| ui | efekti-voitto | 3.48 | Music 0.77; Television 0.17 | musiikki 0.77 | 52 | 0.5 | -80.2 | – | LEIKKAUTUU (52 näytettä, +0,5 dBFS) |
| ui | efekti-vuoro | 1.0 | Door 0.16; Sliding door 0.08 | – | 0 | -27.2 | -77.7 | – | ok |
| ui | freesound-315660 | 78.74 | Vehicle 0.84; Fixed-wing aircraft, airplane 0.67 | liikenne 0.84 | 0 | -0.8 | -37.9 | – | ok |
| ui | freesound-842183 | 0.56 | Crunch 0.35; Speech 0.13 | puhe 0.13 | 0 | -23.2 | -71.1 | – | ok |
| ui | freesound-856165 | 5.0 | Tick 0.37; Tick-tock 0.35 | – | 0 | -4.7 | -67.4 | – | ok |
| ui | freesound-94031 | 2.98 | Coin (dropping) 0.19; Crack 0.06 | – | 0 | -0.0 | -79.7 | – | ok |
| olavinlinna-e3 | luukku-narahdus | 1.9 | Screaming 0.15; Squeak 0.10 | – | 0 | -6.5 | -30.2 | – | VÄÄRÄ: huuto 0,15 |
| olavinlinna-e3 | luukku-kolahdus | 0.56 | Door 0.50; Slam 0.22 | – | 0 | -6.6 | -54.2 | – | ok |
| olavinlinna-e3 | tuuli-rako | 8.0 | Siren 0.54; Civil defense siren 0.14 | – | 0 | -14.5 | -29.1 | 0.6× / -26.0 dB | VÄÄRÄ: sireeni 0,54 |
| olavinlinna-e3 | koputus-umpi | 0.5 | Sound effect 0.18; Music 0.06 | – | 0 | -6.5 | -62.0 | – | ok |
| olavinlinna-e3 | koputus-ontto | 0.6 | Knock 0.84; Wood block 0.09 | – | 0 | -6.5 | -45.3 | – | ok |
| olavinlinna-e3 | raapaisu | 0.48 | Crunch 0.35; Scrape 0.10 | – | 0 | -6.5 | -79.8 | – | ok |
| olavinlinna-e3 | kivi-irtoaa | 1.39 | Breaking 0.14; Crack 0.09 | – | 0 | -6.6 | -40.8 | – | ok |
| olavinlinna-e3 | kivi-lasku | 0.44 | Bird 0.15; Bird vocalization, bird call, bird song 0.10 | linnut 0.15 | 0 | -6.4 | -60.2 | – | ok |
| olavinlinna-e3 | kivi-kolahdus | 0.83 | Sound effect 0.20; Music 0.04 | – | 0 | -6.4 | -99.9 | – | ok |
| olavinlinna-e3 | sammutin | 0.45 | Scissors 0.12; Sound effect 0.06 | – | 0 | -6.4 | -61.0 | – | ok |
| olavinlinna-e3 | puhallus | 0.6 | Burst, pop 0.18; Explosion 0.13 | – | 0 | -6.3 | -32.6 | – | ok |
| olavinlinna-e3 | lyhty-narina | 1.89 | Oink 0.06; Speech 0.03 | – | 0 | -6.5 | -27.7 | – | ok |
| olavinlinna-e3 | avain-lukko | 0.45 | Finger snapping 0.28; Scissors 0.22 | – | 0 | -6.8 | -103.6 | – | ok |
| olavinlinna-e3 | liina-avaus | 1.03 | Chopping (food) 0.62; Sound effect 0.04 | – | 0 | -6.5 | -53.5 | – | VÄÄRÄ: pilkkominen 0,62 |
| olavinlinna-e3 | hopea-kilahdus | 0.55 | Clang 0.13; Cowbell 0.06 | – | 0 | -6.3 | -55.2 | – | ok |
| olavinlinna-e3 | sydan | 2.99 | Heart sounds, heartbeat 0.91; Throbbing 0.40 | – | 0 | -6.1 | -50.0 | 19.3× / -20.0 dB | SAUMA naksahtaa (19,3×, −20 dB) |
| olavinlinna-e3 | pulu-kujerrus | 1.75 | Animal 0.64; Howl 0.60 | linnut 0.15, eläimet 0.45 | 0 | -6.5 | -28.1 | – | ok |
| olavinlinna-e3 | pulu-hammastys | 0.8 | Owl 0.20; Whistle 0.11 | – | 0 | -6.5 | -33.1 | – | ok |
| olavinlinna-e3 | pulu-nokka | 0.26 | Sound effect 0.15; Grunt 0.12 | – | 0 | -6.5 | -114.7 | – | ok |
| olavinlinna-fp-v1 | askel-olki | 2.0 | Fireworks 0.15; Firecracker 0.07 | – | 0 | -9.5 | -62.4 | 0.4× / -46.8 dB | VÄÄRÄ: ilotulite 0,15 |
| olavinlinna-fp-v1 | askel-sora | 2.08 | Walk, footsteps 0.22; Sound effect 0.12 | – | 0 | -12.4 | -51.5 | 1.5× / -29.1 dB | ok |
| olavinlinna-fp-v1 | askel-vesi | 2.4 | Liquid 0.19; Crunch 0.11 | – | 0 | -14.7 | -131.3 | 2.0× / -47.3 dB | ok |
| olavinlinna-fp-v1 | askel-porras-1 | 2.4 | Knock 0.13; Drum machine 0.07 | – | 0 | -9.4 | -180.0 | 137815.0× / -42.5 dB | MEKAANINEN: tasainen tahti + digitaalinen hiljaisuus (rumpukone) |
| olavinlinna-fp-v1 | loyto-kantele | 2.71 | Music 0.20; Bell 0.15 | musiikki 0.20 | 0 | -9.5 | -146.7 | – | ok |
| pallo | ukkonen-01 | 7.98 | Thunderstorm 0.87; Thunder 0.86 | – | 0 | -4.7 | -33.5 | – | ok |
| pallo | ukkonen-02 | 6.0 | Thunder 0.77; Thunderstorm 0.77 | – | 0 | -4.7 | -37.1 | – | ok |
| pallo | ukkonen-03 | 5.5 | Thunder 0.86; Thunderstorm 0.85 | – | 0 | -4.7 | -45.2 | – | ok |
| pallo | ukkonen-04 | 5.5 | Thunderstorm 0.83; Thunder 0.78 | – | 0 | -4.7 | -43.3 | – | ok |
| aanimaisema | aallot-01 | 90.0 | Ocean 0.86; Waves, surf 0.80 | – | 0 | -6.1 | -31.1 | 1.7× / -2.4 dB | ok |
| aanimaisema | kahvila-01 | 90.0 | Speech 0.75; Chink, clink 0.32 | puhe 0.75, liikenne 0.18 | 0 | -1.7 | -23.0 | 2.3× / -12.3 dB | ok |
| aanimaisema | kanava-01 | 90.0 | Train 0.33; Railroad car, train wagon 0.17 | liikenne 0.15 | 0 | -7.8 | -24.5 | 4.0× / -11.9 dB | ok |
| aanimaisema | kello-01 | 34.34 | Church bell 0.82; Bell 0.65 | liikenne 0.32 | 0 | -1.9 | -35.4 | – | ok |
| aanimaisema | kirkko-01 | 90.0 | Music 0.61; Scary music 0.33 | musiikki 0.61, liikenne 0.12 | 0 | -1.9 | -25.2 | 1.0× / -34.4 dB | TARKISTA: musiikki 0,61 (urut tarkoituksella?) |
| aanimaisema | liikenne_hiljainen-01 | 90.0 | Vehicle 0.58; Field recording 0.53 | liikenne 0.58 | 0 | -5.9 | -21.1 | 0.7× / -32.0 dB | ok |
| aanimaisema | liikenne_vilkas-01 | 90.0 | Traffic noise, roadway noise 0.74; Vehicle 0.64 | liikenne 0.74 | 0 | -3.2 | -34.8 | 0.5× / -33.5 dB | ok |
| aanimaisema | puisto-01 | 84.0 | Caw 0.49; Crow 0.47 | puhe 0.10, musiikki 0.19, liikenne 0.31, linnut 0.23 | 0 | -3.1 | -23.8 | 3.0× / -17.5 dB | ok |
| aanimaisema | raitiovaunu-01 | 90.0 | Speech 0.57; Vehicle 0.51 | puhe 0.57, musiikki 0.39, liikenne 0.51 | 0 | -2.4 | -29.9 | 0.3× / -43.4 dB | ok |
| aanimaisema | rautatie-01 | 90.0 | Subway, metro, underground 0.50; Speech 0.48 | puhe 0.48, musiikki 0.17, liikenne 0.19 | 0 | -2.1 | -22.9 | 0.2× / -38.3 dB | ok |
| aanimaisema | sade-01 | 90.0 | Rain on surface 0.77; Rain 0.74 | puhe 0.22 | 0 | -1.8 | -23.3 | 1.8× / -12.1 dB | ok |
| aanimaisema | satama-01 | 90.0 | Vehicle 0.65; Rumble 0.53 | liikenne 0.65 | 0 | -7.9 | -19.4 | 6.0× / -25.7 dB | ok |
| aanimaisema | suihkulahde-01 | 53.89 | Water 0.53; Trickle, dribble 0.44 | – | 0 | -1.9 | -25.9 | 1.6× / -6.5 dB | ok |
| aanimaisema | tori-01 | 90.0 | Speech 0.66; Vehicle 0.25 | puhe 0.66, musiikki 0.13, liikenne 0.25, linnut 0.10 | 0 | -2.0 | -22.8 | 0.6× / -28.9 dB | ok |
| aanimaisema | tuuli-01 | 90.0 | Animal 0.42; Bird 0.39 | puhe 0.11, liikenne 0.21, linnut 0.39 | 0 | -2.0 | -23.9 | 0.1× / -45.8 dB | VÄÄRÄ: linnut/eläin 0,42, ei tuulta |
| aanimaisema | vakijoukko-01 | 90.0 | Speech 0.83; Music 0.56 | puhe 0.83, musiikki 0.56 | 0 | -4.6 | -25.6 | 2.8× / -13.2 dB | ok |
| ihmisen-matka | savanni | 63.63 | Bird 0.77; Chirp, tweet 0.72 | linnut 0.77 | 0 | -15.1 | -56.8 | 0.0× / -65.7 dB | ok |
| ihmisen-matka | jokilaakso | 94.05 | Pour 0.74; Bird 0.41 | linnut 0.41 | 0 | -8.6 | -39.9 | 0.0× / -59.8 dB | ok |
| ihmisen-matka | meren-ranta | 59.68 | Ocean 0.83; Waves, surf 0.74 | – | 0 | -12.0 | -43.4 | 0.1× / -56.4 dB | ok |
| ihmisen-matka | vuoristotuuli | 108.58 | Insect 0.97; Cricket 0.90 | linnut 0.31, eläimet 0.97 | 0 | -15.3 | -33.8 | 0.0× / -83.5 dB | ok |
| ihmisen-matka | ruohikko-jarvi | 84.1 | Duck 0.63; Crow 0.57 | puhe 0.41, linnut 0.52 | 0 | -6.9 | -45.4 | 0.1× / -103.4 dB | ok |
| ihmisen-matka | sademetsa | 64.0 | Insect 0.42; Cricket 0.36 | eläimet 0.42 | 0 | -19.0 | -37.4 | 0.0× / -53.3 dB | ok |
| ihmisen-matka | rannikkomeri | 89.44 | Ocean 0.84; Waves, surf 0.78 | – | 0 | -15.0 | -37.6 | 0.1× / -170.3 dB | ok |
| ihmisen-matka | luola | 89.82 | Sonar 0.39; Drip 0.29 | musiikki 0.27 | 8 | 0.8 | -76.9 | 0.0× / -240.0 dB | LEIKKAUTUU (8 näytettä, +0,8 dBFS); musiikki 0,27 |
| ihmisen-matka | arktinen-tuuli | 59.0 | Explosion 0.21; Eruption 0.21 | – | 0 | -15.0 | -33.4 | 3.0× / -92.4 dB | VÄÄRÄ: räjähdys 0,21 |
| ihmisen-matka | tundratuuli | 41.14 | Train 0.73; Rail transport 0.66 | liikenne 0.55 | 0 | -12.0 | -30.6 | 0.1× / -62.3 dB | VÄÄRÄ: juna 0,73 |
| ihmisen-matka | metsasade | 73.27 | Rain on surface 0.81; Rain 0.71 | – | 0 | -2.8 | -39.8 | 0.0× / -83.6 dB | ok |
| ihmisen-matka | kylma-tuuli | 85.43 | Eruption 0.53; Field recording 0.52 | liikenne 0.42 | 0 | -4.8 | -32.5 | 0.0× / -115.4 dB | VÄÄRÄ: purkaus 0,53, liikenne 0,42 |
| ihmisen-matka | avomeri | 75.69 | Boat, Water vehicle 0.73; Ocean 0.64 | liikenne 0.40 | 0 | -8.1 | -41.6 | 0.3× / -52.8 dB | ok |
| ihmisen-matka | rantalinnut | 49.07 | Ocean 0.75; Waves, surf 0.65 | – | 0 | -14.0 | -38.8 | 0.1× / -53.8 dB | ok |
| ihmisen-matka | hiljainen-tuuli | 62.0 | Rain 0.50; Rain on surface 0.43 | – | 0 | -15.9 | -34.2 | 0.0× / -128.4 dB | VÄÄRÄ: sade 0,50 |
| muu | cupola-humina | 90.0 | Eruption 0.25; White noise 0.18 | liikenne 0.16 | 0 | -12.4 | -26.1 | 0.5× / -46.4 dB | ok |
| muu | freesound-731249 | 131.03 | Speech 0.90; Clip-clop 0.34 | puhe 0.90 | 0 | -11.4 | -40.6 | – | ok |
| muu | freesound-315660-ampari | 78.74 | Vehicle 0.84; Fixed-wing aircraft, airplane 0.67 | liikenne 0.84 | 0 | -0.8 | -37.9 | – | ok |
| muu | candle-crackling | 30.0 | Rain on surface 0.44; Rain 0.25 | – | 0 | -3.3 | -35.6 | 40.8× / 9.8 dB | SAUMA naksahtaa (40,8×, +9,8 dB) |

# Osa 3: ulkoisten kenttä-äänitysten lisenssit (8.10.2026 ilta, PT kiireellinen)

- **Laajuus:** kaikki pelin ulkoiset äänet: js/aani-ehdokkaat.js (kaupunkien kenttä-äänitykset ja oletuskorit), jotka natiivi lukee sisältöpaketista ja AaniTaulut.cs:n oletuksista. Käytössä 154: 56 Freesound + 98 radio aporee (archive.org). Lisenssit on haettu Freesound-API:lla ja archive.orgin metadata-API:lla (robots sallii).
- **Tulos:** 108 CC0/PD, 43 CC BY / BY-SA ja **3 CC BY-NC**: 723081 (basaari, kaupunki), 848927 (meri) ja 411996 (savanni). NC-äänet olivat vain oletuskoreissa ilman ehdokasriviä, joten webin lisenssiportti ei tuntenut niitä, eikä natiivissa ole porttia. Ne soivat tuotannossa noin 104 maisemakorissa.
- **Korjaus:**
  - web ravelius/Matkakirja#4229: NC pois, POISTETUT-bugi korjattu ja data/aanilahteet.json (43 nimeämistä).
  - natiivi: proto-haara pelikoodari/maisemakori-nc (AaniTaulut.cs, aanijalki.json, paketin fixture).
  - tuotannon sisältöpaketti korjautuu seuraavassa viennissä.
- **Suora haku:** peli ei hae ääniä suoraan Freesoundista eikä archive.orgista. AaniOsoite.Url ohjaa ne omaan peiliin media.matkakirja.app/aanet/freesound-<id>.mp3 ja aporee-…, ja kaikki käytössä olevat peilit vastaavat 200. Alkuperäinen osoite on vain varareitti, jos peili puuttuu. Puuttuvat 7 aporee-peiliä ovat pelkästään työkalulistassa (tools/korvaajat.json), eivät pelissä.
- **CC BY / BY-SA:** nimeämiset pitää näyttää ☰ › Lähteet -näkymässä (Natiivi-UI, data/aanilahteet.json). BY-SA koskee vain itse äänitiedostoa, eli muokattu ääni jaetaan samalla lisenssillä. Pelin koodiin se ei leviä.
- **tulen-rasina.mp3 404 oli väärä hälytys:** se on testiaineiston (DioraamaTestit.cs) suhteellinen polku dioraamapaketin sisällä.
- **AaniTaulut.cs on Pelikoodarin portti** (tools/natiivi-kultaiset: "Pelikoodari päivittää natiivin portin").

# Osa 4: korvaukset (8.10.2026 ilta)

**Tarkennus hylkäyksiin:** alle 0,5 s:n äänissä ja narina- tai kangasäänissä AST antaa luonnostaan vääriä luokkia (esim. Kenneyn kangasäänet ovat "pilkkomista", narinat "huutoa" tai "pierua"). Siksi korvattiin vain vahvat signaalit. Seurantaan, ei korvausta: mylly-siirto (0,3 s), liina-avaus, luukku-narahdus, askel-olki (ilotulite 0,15), ihmisen matkan arktinen ja hiljainen tuuli (ei vieraita ääniä) sekä äänimaiseman kirkko-01 (musiikki 0,61, ehkä urut tarkoituksella).

**Tuulet:** aidoillekin CC0-tuulille AST antaa Wind-luokkaa enintään 0,54 ja sekoittaa tuulen kohinan ajoneuvoon ja mereen. ≥ 0,7 ei siis ole tuulille realistinen raja. Korvauksissa iso virhe poistui (sireeni 0,54, juna 0,73, liikenne 0,42), ja Wind on kärkiluokka. Tuulet ovat ostokirjaston paras kohde.

| ääni | ennen | korvaus | jälkeen |
|---|---|---|---|
| efekti-laiva, efekti-voitto | leikkautuu +0,6 / +0,5 dBFS | taso −1,5 dB | huippu −1,3 / −1,5 dBFS |
| luola | leikkautuu +3,8 dBFS | pehmeä huippurajoitin | −2,8 dBFS, taso säilyi |
| Candle-silmukka | sauma 41× / +9,8 dB | 0,2 s ristihäivytys | 1,5× |
| sydan | sauma 19× | 0,1 s ristihäivytys | 1,4×, Heart sounds 0,90 |
| tuuli-rako | sireeni 0,54 | freesound:617558 12–28 s | Wind kärjessä, liikenne ≤ 0,10 |
| eleven-korin-narina | pieru 0,17 | freesound:264306 5,9–7,5 s | Creak 0,71, pieru 0 |
| askel-porras-1 | rumpukone (tasainen tahti + digitaalinen hiljaisuus) | freesound:580706, oikea kävely kivirappusissa | Walk 0,15 (kärki), ei vieraita |
| tundratuuli | juna 0,73 | freesound:617558 10–31 s | Wind kärjessä, linnut 0,18 alussa |
| kylma-tuuli | purkaus 0,53, liikenne 0,42 | freesound:474894 1–17 s | Wind kärjessä, liikenne 0,24 |
| tuuli-01 (äänimaisema) | linnut 0,42, liikenne | freesound:617558 (kaupungin lumimyrsky) | Wind 0,52, liikenne 0,24 (kaupunki) |

**Viennit ja polut:**
- ämpäri: aanet-e3-v2 ja aanet-fp-v1b (Siirtoseppä vaihtaa DioraamaSovittimen polut), ihmisen-matka-v2 (IhmisenMatka2Maisema.Juuri) ja aanimaisema-v2 (KaupunkiAanimaisemaSoitin).
- repo: proto-haara pelikoodari/tehoste-korvaukset f059db199 (efekti-laiva, efekti-voitto, Candle, korin narina).
- kirjasto-liekin-humahdus (ajoneuvo 0,24, kohinapohja −13 dBFS) jää paikalleen: sitä soitetaan vain debug-sarjassa "kirjasto", oletus on eleven-sarja.
Työkalut: _tyo/tehoste-korjaus/ (tekniset.py, korvaukset.py, paketoi.py).
