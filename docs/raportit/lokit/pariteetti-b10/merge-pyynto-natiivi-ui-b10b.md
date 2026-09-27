# Merge-pyyntö: natiivi-ui/b10-jono 0e8ff30 (testi/b10e a5b7aa7), Natiivi-UI 24.9.2026 klo 17.4x

Kuvaparit otettu testi/b10e:stä (asennettu klo 17.13), iPhone 17 FB234D08 ja iPad Pro 11" 503000D1. Web on tuotannosta
(matkakirja.app), Playwright, dpr 2. Kuvausskriptit: `pariteetti-b9/kierros-b10e.sh`, web
`Matkakirja-laitetestaaja/tools/.natiivi-ui-b10e-{lehti,lehtiotsikot,maailmanappi}.mjs`.

| Kohta | Kuvapari | Tulos |
|---|---|---|
| Yläpalkki iPhone: pysty, veto, vaaka | kuvapari-b10e-ylapalkki-iphone.jpg | Ruskea palkki, logo ja pilleri, ei ⚙ (omistajan päätös). Kun palkki on piilossa (veto tai vaaka), näkyvissä on vain ☰. Karttaselite- ja linssinappi ovat piilossa (omistajan päätös). Webin vaaka näyttää ne, mikä on hyväksytty ero. Vaaka on pakotettu komennolla `ui ylapalkki vaaka`, koska simulaattoria ei käännetty. |
| Yläpalkki iPad 61 pt | kuvapari-b10e-ylapalkki-ipad.jpg | Logo, pilleri ja ☰ samoilla paikoilla kuin webissä. ⚙ puuttuu (päätös). |
| Lehti etusivu ja s. 2 | kuvapari-b10e-lehti-iphone.jpg, -ipad.jpg | Arkkipaperi ja leipäteksti (Iowan 16,32 #211d18 lh 1,62, anfangi) vastaavat webiä. Build 11:een jää 4 eroa, ks. alla. |
| Nostokortti vaihe 1 ja 2 | kuvapari-b10e-nostokortti-iphone.jpg, -ipad.jpg | Tekstin riviväli 1,58 on webin mukainen. Asetteluerot ovat alla (build 11). |
| Maailmanappi (kehittäjätila) | kuvapari-b10e-maailmanappi.jpg | Rivi "Maailma" (maapallo, POIS) on KOKEET-osiossa. Webissä se on hammasratasvalikon Kehittäjä-ryhmässä, mutta Fablen päätöksellä natiivissa KOKEET. Ilman kehittäjätilaa rivi ei näy. |
| Hytinä (löydös 27) | ei kuvaparia | Simulaattorissa ei todennettu: `veto`-komento heitti kameran kauas, eikä nostomerkkejä ollut näkyvissä. Todennus vaatii laitteen tuntumatestin tai Laitetestaajan liikemittarin. |

## Uudet erot build 11:een (mitattu webistä: web-lehti-otsikot-mitat.txt)

1. **Lehden etusivun esittely on väärä teksti.** Web `kaupunginEsittely` = `ARTIKKELIT[city.wiki ?? city.name].intro`
   (europe-artikkelit: "Ateena on Euroopan vanhimpia…"). Natiivi näyttää kategorian "kaupunki" johdannon ("Kaupunki,
   jossa marmoritorni…"), joka webissä on sivun 1 ingressi. Korjaus: `WikiArtikkelit.Intro(...)`, ja jos sitä ei ole,
   LEHDEN_VAKIOESITTELY.
2. Lehden nimiö on web American Typewriter **700**, 30,4 px (iPad 44,8), harvennus 0,1 em, #16130f. Aiheen nimi on 700,
   23,2 px, harvennus 0,06 em. Natiivissa molemmat ovat ohuita.
3. Kuvateksti on web AT 14,08 #46331f lh 1,4 **pystyssä**. Lähderivi ("Matkakirjan havainnekuva") näkyy vain
   suurennoksessa. Natiivissa kuvateksti on kursiivi harmaalla, ja lähde näkyy lehdessä ja nostokortissa.
4. Säärivi ja maaliite ovat webissä font-weight 600. iPadin etusivun esittely on webissä kahdella palstalla tasattuna.
   Aihesivulla kuva on oikealla ja teksti vasemmalla.
5. Nostokortin vaihe 1: webissä kuvateksti on keskitetty ja LISÄÄ-nappi sen alla keskellä. Natiivissa kuvateksti on
   vasemmalla ja nappi oikealla. Vaihe 2: webissä on HISTORIA-rivi tyyppikuvakkeella ruskealla kapiteelilla, otsikko on
   lihavoitu, ✕ on kehystetyssä neliössä ja laskuri 1/2 näkyy. iPadin vaihe 2 on webissä leveä kaksipalstainen arkki,
   natiivissa kapea kortti oikealla.
