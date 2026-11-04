# Valosepän luovutus 4.11.2026 klo 10.32

Syy: konteksti yli pehmeän rajan (Raamattu 7.37). Edellinen: viesti-valoseppa-luovutus-20261104-0948.md (Opit ja Työkalut). Loki: /Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md.

## Linja nyt
- **KK 10.2x:** k55 lukittu. Ei uutta pohja.png:tä (19c lähti, Square Jean-XXIII on maskin sisällä). Peliin, ei junaa.
- Tehtävät: (1) pelihaara k55:stä, ei koealuetta, Pariisin piirros pois, pienet kadut pois, ohuet katkoviivat pois. (2) z ≤ 10: halvin tapa ilman värihyppyä, varsinkin vedessä; mittaa kulu. (3) JU:n iso iPad vuorollaan: sama Pariisin kortteli z11–z17, vieritys, muisti, palan aika, lisäksi Lontoo ja Helsinki. Alppien oranssit laikut z13:lla: katso, näkyvätkö pelissä. Kuvat ja mitat KK:lle.
- **Runko:** PT 10.25 vahvisti: c4a5bfafb. Valmis haara + sha ja testit JU:lle koejonoon, rivi PT:lle. Ei junaan. Rivi JU:lle vasta, kun z17:n raidat on korjattu (PT:lle kerrottu 10.3x).

## Tila
Haara linssiseppa2/striimi-vari (694e1783a, natiivi-backup, wt /Users/Shared/Claude/wt/proto-linssiseppa2-k30). Kartta-testit 602/602. **Unity todistamatta: Laattapalvelin-muutoksia ei ole käännetty.**
- ElavaTyyli.Striimi = true (false = vanha ulkoasu). ElavaTyyliVersio e16 (e15 oli koehaaroissa, älä käytä). Mukana NS:n f5c1f14b0.
- Koealuetta ei ole rungossa. KarttaKerrokset.cs:ssä on piirrosviittauksia, tarkistamatta: varmista, ettei Pariisin piirros tule pelissä päälle.
- z ≤ 10: Laattapalvelin.Hae → VaritettuPohja: JPEG auki, ElavaTyyli.Varita, JPEG 85, levyvälimuistiin. Sisäiset HaeSisalto-kutsut saavat alkuperäisen. Kulu laskureissa PohjaVarityksia ja PohjaVaritysMs; näitä ei vielä kirjata lokiin eikä komentoon.
- Varita paikallinen Mac, kuorma 13: 4,0 ms/pala 256 × 256, ilman JPEG-purkua ja -pakkausta. iPadilla ei mitattu. Vaihtoehto: uusi poltettu sarja (vienti = julkaisu, ks. media-vienti).
- Pelin värit: tarkista myös kermahuntu (Varitaso, z3–z8) iPadilta, ei ole katsottu uuden pohjan päällä.

## KESKEN, ENSIN TÄMÄ
**z17:llä viuhkamaisia vaaleanvihreitä raitoja Citéllä** (_tyo/linssiseppa2/pariisi-tyyli/striimi/kuvat/nd-z17-rajaus.jpg, Parvis ja palatsin ympäristö). k53:n pohja.png:ssä (k49:n päällä) niitä ei näy. Syy ei selvillä. Ei auttanut: tieväritys vain z ≤ 12, metsän pehmennys vain z ≤ 13, NS:n puhdistus kahdesti. Kaikki kolme jäivät koodiin. Seuraava askel: piirrä kerrokset yksitellen pois (landcover, park, pohja) samalla rajauksella ja vertaa k49 + k53:een. Älä pyydä JU:n ajoa ennen korjausta.

## Vahvistamatta
Lontoo ja Helsinki rungolla. z16 Pariisi rungolla vs. k55 ero 0,06 / 255 ennen kolmea viimeisintä muutosta; mittaa uudelleen.

## Opit
- Kooditiedoston version numero rungossa (e14) on eri kuin koehaaroissa (e15): laitteen välimuisti voi antaa koehaaran palat, joten e16.
- Pehmennyksen Sumea: ikkuna rajautuu MVT:n puskuriin TiheysB = 4 px.
- KK:n viesti voi mennä omani kanssa ristiin: katso aikaleima.

## Työkalut
pariisi-tyyli/striimi/ (paikkaukset), k55/aja.zsh ja kuvat.py (KoeS-ympäristömuuttujat eivät enää vaikuta rungossa; z ≤ 10 ajetaan ELAVA_Z=10), k12/paikallinen/kokoa.py. Rajaus ELAVA_ALUE=x0,y0,x1,y1. ND-data k53/nd-pohja, z17 66386,45089,66396,45096. Python tulivuoret/venv.
