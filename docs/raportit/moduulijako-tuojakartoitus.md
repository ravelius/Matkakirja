# Moduulijaon tuojakartoitus (M0, Fable max 17.8.2026)

Kertaraportti moduulirakenne-suunnitelman vaiheen M0 kohdasta c:
mikä kaikki riippuu js/ui.js:stä tiedostona tai sen vienneistä.
Jokainen M1–M7-siirto tarkistaa tämän listan ja päivittää osumat
SAMASSA PR:ssä. Rivinumerot mainin v808 mukaan — ne elävät, joten
siirtohetkellä ajetaan tuoreet haut (komennot lopussa).

## 1. ui.js:ää TEKSTINÄ lukevat (readFileSync + regex)

Nämä hajoavat hiljaa tai äänekkäästi, kun haettu koodi muuttaa
tiedostoa. Siirron PR päivittää polun JA varmistaa, että testi
edelleen LÖYTÄÄ kohteensa (ei hiljaista ohitusta).

| Lukija | Kohta | Mitä hakee ui.js:stä |
|---|---|---|
| tests/rules.test.mjs | 3448, 3515, 3613, 3641, 3670, 3725, 3784, 3809, 3863, 3902, 4167, 4256, 4299 | luennan häivytys, kehittäjätila, zoomiportaat ja -painikkeet, rasterointi, suodatinkielto, arkin mitoitus, näkymävahti — eli KARTTA- ja NÄKYMÄRYPPÄIDEN koodia (M7 ja iOS-alue) |
| tests/aanitasot.test.mjs | 104, 174 | kertojan väistö ja laskuri (LUENTA-alue, M6) |
| tests/alkureitit.test.mjs | 20 (+ tuonnit 14–17) | alkuanimaation reitit ja kehysmatikka (M2) |
| tests/lento-ajoitus.test.mjs | 14, 16 | kirjoituksenKesto + lentoanimaation vakiot (M2/ydin) |
| tests/maa-otsikot.test.mjs | 219 | maalehden otsikkorakennus (M5) |
| tests/ruudutus.test.mjs | 30 | ruutujen täydennys (M7) |
| tests/vertailutila.test.mjs | 17 | vertailutila (M3!) — pilotin ENSIMMÄINEN polkupäivitys |
| tools/fetch-photos.mjs | 49 | poimii kuvaviitteet ui.js:stä |
| tools/peilaa-media.mjs | 173 | peilattavien lähdelista sisältää js/ui.js:n — M-siirroissa listaan lisätään uudet tiedostot, muuten peili ei näe niihin siirtyviä viittauksia |

## 2. ui.js:n viennit ja niiden tuojat

| Vienti | Tuojat |
|---|---|
| UI, kehittajaTilaPaalla, asetaKehittajaTila | js/main.js:5 |
| kirjoituksenKesto | tests/lento-ajoitus.test.mjs:14 |
| polunPituus, alkuKehykset, kierraKehykset, jaljenKehykset, ALKUREITIT, JALJEN_PYYHKAISY | tests/alkureitit.test.mjs:14–17 |
| SAAPUMISLUENNAT | ei tuojia (europe-saapumiset.js:4 viittaa vain kommentissa) — M1:ssä siirtyy datatiedostoon vapaasti |

M2 siirtää kehysmatikan ja kirjoituksenKeston → alkureitit- ja
lento-ajoitus-testien tuonnit päivittyvät samassa PR:ssä.

## 3. Muut kytkökset

- sw.js SHELL listaa js/ui.js:n ja jokaisen tulevan uuden
  tiedoston (tests/sw.test.mjs valvoo — unohdus jää kiinni).
- tools/build-standalone.mjs MODULES: js/ui.js rivillä ~221; uudet
  tiedostot listataan järjestyssäännöllä "riippuvuus ennen
  tuojaansa" (tools/tarkista-niputus.mjs valvoo).
- tyohuone.html EI lataa ui.js:ää — työhuone on erillinen
  sovellus; kytkös kulkee toiseen suuntaan (ui.js tuo
  tyohuone-raamattu/-tilanne-datat kehittäjän liitteisiin).

## 4. M0:ssa löytynyt vartijaristiriita (Fablen päätettävä)

tests/sw.test.mjs:134 vaatii KAIKKI js/packs-tiedostot
MODULES-listalle; build-standalonen NS-oppi kieltää listaamasta
moduulia, jota mikään listattu ei tuo. Listalla on nyt 19
tuomatonta pakettia (linssipakat, koelaudat suomi/istanbul,
asteaineistot maasto-*, viritysäänet, päivän kuvat) = ~1,4 Mt
kuollutta painoa niputuksessa (mitattu: 10 965 → 9 572 kt ilman
niitä) ja törmäyspintaa. Purkuvaihtoehdot: (a) sw-testiin
poikkeuslista tarkoituksella niputtamattomista pakoista ja kuolleet
pois listalta, tai (b) nykytila jää ja törmäysriskin kantaa
tarkista-niputus.mjs. Staattisesti tuodun paketin unohtuminen jää
kummassakin kiinni checkModuleListiin. Sivuhavainto: maasto-vedet/
-korkeus/-nimet-* ovat asteaineistoa js/packs-kansiossa vastoin
CONTRIBUTINGin sääntöä (asteet tools/mapdataan) — ne edeltävät
sääntöä.

## 5. Tuoreet haut siirtohetkellä

```bash
grep -rn "readFileSync.*ui.js" tests/ tools/
grep -rn "from '\(\.\./\)*js/ui.js'\|from '\./ui.js'" js/ tests/ tools/
grep -n "'js/ui.js'" sw.js tools/build-standalone.mjs
```
