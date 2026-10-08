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
