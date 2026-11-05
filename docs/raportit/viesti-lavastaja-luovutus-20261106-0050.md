# Lavastajan luovutus 6.11.2026 00.50 (seinät aukkoihin) — LUE TÄMÄ KOKONAAN

Pohja: -0020 (git show df9ca99cc:docs/raportit/viesti-lavastaja-luovutus-20261106-0020.md), kohdat Tehtävä ja rajaus, Työkalut, Jonossa. Työkansio A = /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/muuri/aukot. Loki: muuri/KORJAUS.md (lopun 4 kirjausta). Ei vientejä, ei junaan. KK:lle ei ole lähetetty paria.

## Seuraajan järjestys (PT 00.2x, jäljellä)
1) Korjaa kaksi täytettä ja oven leveys (alla), 2) lisäysten kohdetarkistus, 3) friisi. Ei vientiä.

## Tehty
- **a1:n tumma pinta ratkaistu: pelin oven lehti, ei täytteen vika.** `mika` kummallakin juurella: "palatsi ovet koe", materiaali "ovi lehti"; ovi (−189,49; 419,08). Sama myös ilman täytteitä. Kuvat kuvat-a1. a1-kuvan rajausta ei tarvitse muuttaa: älä leikkaa lehteä pois.
- **7 aukkoa:** vanha tarkistus laski myös suikaleen, johon ei pääse. suunnittele2.py + suunnitelma2.json + `koejuuri-aukot2` (33 täytettä, ei viety). Vanhaa `koejuuri-aukot`:a ei muutettu.
- Uudet linjat mallin leikkauksesta (a7/leikkaus-*.png): (−251,8; −126,9), (154,5; 427,8), (325,1; 564,0). Muut 4 suunnittele.py:n linjalla.

## Kuvat-b (5 kuvaa, L1, 35140432d; katsottu arkkina pienennettynä, ei täysikokoisina)
- **(325,1; 564,0) HUONO:** 9,2 m korkea sileä laatta. Yläpään säde osui korkeaan rakenteeseen. Hae yläpää naapuriseinän harjasta.
- **(154,5; 427,8):** kulmapilarina, jalka menee sokkelin ohi (sama kuin a5), ei friisiä. Eteläkulmassa sama 0,9 m rako: ei listalla, ei tehty.
- **(−142,2; 232,3):** käytävän pää, kuin umpiperä; täyte keskellä käytävää T/este-rajalla. Oikeassa alakulmassa vaalea kiila lattialla, syy auki.
- **(−131,3; 352,4):** oikea pariovi kehyksineen, täyte ei näy. Oven kohta, ks. seuraava.
- **(−251,8; −126,9):** näyttää seinältä; päät eivät ole kuvassa, eikä täyttä kokoa ole katsottu.
- (−155,6; 283,2) ja (−151,5; 289,4): vain kartta ja leikkaus, ei kuvaa (JU: kuvaraja).

## Avoimet
1. **Oven leveys (PK:n viesti, ei tarkistettu itse):** 8 kohdan ovet ovat huone-*-mallien omia lehtiä 2,40 × 2,65; uutta ovea ei tarvita. Täyte 1,32 m, lehti 2,40 m: noin 1,0–1,1 m jää lehden taakse ilman täytettä, esim. (−142,2; 420,1): täyte z 420,04–421,36, lehti z 419,02–421,42. Kehon mahtumista ei ole mitattu: jatka täyte oven levyiseksi tai todista.
2. **Rajaus:** 29 pois (KK PK:n kautta); PT:n "kaikki 41" on tätä vanhempi; PT ei ole kuitannut eroa.
3. **Friisi puuttuu täytteistä** (a5, 154,5); täyte jatkuu lattiaan jalustan ohi.
4. **Lisäysten kohdetarkistus tekemättä:** 10 + 8 tilaa, lista viesti-pelikoodari-aukot-20261105.md. Ei saa sulkea kaistaleita (−147,7; 244,3), (−186,5; 497,6). Eivät listalla (−162,9; 337,5), (121,6; 408,3). Katso (−108,1; 396,1), (108,3; 473,1), (−166,0; 431,6), sali (1,5; 0,9), ja PK:n pyynnöstä (125,0; 338,8) ennen seinää.
5. (325,1; 564,0):n viereen jää kartalla 3,8 m rajaa (325,0; 563,4), katon alaa seinän edessä: PK kartan ajossa.
6. Lod1/2-täytteitä ei ole katsottu. a2, a3, a4 kuvat-koe2:sta katsomatta.

## Työkalut (A/), uudet
aukko7.py (täyttötesti), leikkaus7.py ja lahi131.py (mallin vaakaleikkaus), suunnittele2.py (kirjoittaa suunnitelma2.json:n, UUSI-taulukko = linjat käsin; HUOM ajo kumoaa (−251,8):n käsin rajatun yläpään), rakenna.py `<juuri> <suunnitelma>` (kieltäytyy, jos juuri on olemassa: käytä uutta nimeä), aja-a1.zsh, aja-aukot2.zsh (`<linja> <sha>`, JU:n vuorolla).
JU:n vaatimus pyyntöön: rivi "mitä tämä ratkaisee" ja enintään noin 5 kuvaa.
