# Viesti Fablelle: Mac-runnerin punainen "pinta estetty" — juurisyy ja korjaus (18.9.2026)

Haara: `claude/bold-ride-vow4ki-astro-pinta-vartija`
(pohja `claude/bold-ride-vow4ki-julkaisu-v1938`).

## 1. Juurisyy yhdellä virkkeellä

Vika oli SAVUKKEESSA, ei pelissä: kun pallon laattaluettelo
(`laatat.json`) jäi Macilla saamatta, `js/pallo.js` `rakennaPallo`
putosi suunnitellusti varatekstuuriin
(`globeImageUrl(PALLO_TEKSTUURI)`), jolloin pallon pinnalla oli osoite
jo ennen linssiä ja linssin vartija sanoi aivan oikein `puute=ei` —
eli savuke mittasi tilaa, jota Macilla ei syntynyt.

## 2. Miten se todistettiin (kaksi koeajoa, ei arvausta)

Koeskripti toisti väitteen 9b:n eston (ImageData heittää,
`topografia-pallo` estetty) ja luki lisäksi pallon pinnan osoitteen:

| koe | `laatat.json` | `pinnanOsoite` | `puute` | ilmoitus |
|---|---|---|---|---|
| 1 | tulee ämpäristä | tyhjä | `pinta` | näkyy (vihreä) |
| 2 | **estetty** | `…/julisteet/pallo/2026-09-03a/tekstuuri-z4.jpg` | `ei` | ei mitään |

Koe 2 on merkki merkiltä sama kuin Mac-runnerin punainen
(`lauta true, puute ei, ilmoitus false, näkyy false, teksti ""`).
Vartija siis toimii: sen tieto oli oikea, mutta koe oli asettanut
pallon väärään lähtötilaan.

Miksi juuri Macilla ja vasta täydessä ajossa: savukkeen `ulkohaku`
tallensi VÄLIMUISTIIN myös epäonnistuneen haun. Yksi ohimenevä
verkkopätkä kahden näyttöajon aikana esti saman osoitteen kaikissa
myöhemmissä konteksteissa koko ajon loppuun asti — ja `laatat.json`
on juuri se osoite, jonka puuttuminen kääntää pelin varatekstuuriin.
Kontissa (ja `NAKYMAT=vartija`-pikaajossa ilman edeltäviä
näyttöajoja) sama koodi oli vihreä, koska yhtään hakua ei ehtinyt
epäonnistua.

## 3. Muutos (vain savuke, peliin ei koskettu)

`tools/savukkeet/savuke-astro-pallo.mjs`:

1. **`ulkohaku` ei myrkytä itseään.** Haku yritetään kolmesti pienellä
   odotuksella, ja VAIN onnistunut vastaus jää välimuistiin. Tämä
   koskee koko savuketta, joten sama myrkytys ei enää voi kaataa
   mitään muutakaan väitettä.
2. **Laattaluettelo tarjoillaan aina väitteessä 9b.** Jos ämpäri ei
   vastaa, reitti täyttää pyynnön minimivaraluettelolla
   (`{versio, tasot:{min:0,max:8}, laatta:256, muoto:'jpg'}`), jolloin
   peli on aina laattamoottorilla eikä varatekstuurissa.
3. **Esitieto on oma väitteensä.** Ennen linssin avaamista vaaditaan
   "pelin pallo on laattamoottorilla, pinta tyhjä". Jos tämä joskus
   pettää, punainen osoittaa oikeaan paikkaan eikä syytä vartijaa.
4. Väitteen 9b virheviestiin lisättiin `pinnanOsoite`, eli punaisen
   syy näkyy suoraan rivillä.

Peliin (`js/`) ei tehty yhtään muutosta: pelin varapolku
(laatat.json puuttuu → z4-tekstuuri) on Raamatun mukainen ja
tarkoituksellinen, ja vartijan tulkinta siitä on oikea.

## 4. Mittaus ennen ja jälkeen

- **Ennen** (Mac, julkaisuhaara v1938): koko savuke 121/122,
  punainen "pinta estetty: linssin oma vartija …".
- **Jälkeen**, `NAKYMAT=vartija` (portti 8951, Chrome for Testing):
  **27/27 läpi** — mukana uusi esitietoväite. Ennen korjausta sama
  rajaus oli 26/26 (vihreä sattumalta, koska verkko piti).
- Erikseen todistettu kolmannella koeajolla, että väite on vihreä
  MYÖS silloin kun ämpäri ei anna luetteloa lainkaan (varaluettelo
  käytössä): `puute=pinta`, ilmoitus ruudulla.
- `node --test tests/*.test.mjs`: **# pass 3604, # fail 0** (3617
  testiä, 13 ohitettua). Tuonteja ei muutettu, joten
  `tarkista-niputus.mjs` ei ollut tarpeen.

## 5. Ehdotus Fablelle

- `tools/savukkeet/sarjat.json`:iin **ei tarvita kirjausta** — väite
  ei ole tunnettu punainen vaan korjattu. Jos rivi on jo lisätty,
  se voi nyt poistua.
- Sama myrkytetty välimuisti on ollut mahdollinen kaikissa
  savukkeissa, jotka kopioivat `ulkohaku`-funktion. Jos Mac-runner
  näyttää muita satunnaisia punaisia ämpäriaineistoa käyttävissä
  savukkeissa, ensimmäinen katsottava on tämä sama kohta.
- Viereinen havainto (ei korjattu tässä erässä): Ateenan
  `puhe-fokus-matkakirja-ateena.aikaleimat.json` ei vastaa ämpäristä
  (haku epäonnistui kaikilla kolmella yrityksellä). Ei vaikuta tähän
  väitteeseen, mutta puhesynkronointi jäänee ilman aikaleimoja.
