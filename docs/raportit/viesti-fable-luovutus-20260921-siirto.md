# Fablen luovutus 21.09.2026 (siirto Macin toiselle käyttäjälle)

Edellinen luovutus: viesti-fable-luovutus-20260921.md (aamu). Tämä
sessio: 21.9. n. klo 09.20 → 11.30. Syy: kehitystyö siirtyy Macin
toiselle käyttäjälle oikeuksien jaolla (ohje
docs/raportit/siirto-toiseen-kayttajaan-20260921.md); työpöytäsessiot
eivät siirry, joten kaikki kuusi jatkavat luovutuksistaan.

## Tila
- Mainissa **v1989** (PR #2641: kartan pieni liike, pöllön Matkakirja-
  linkit; 87262d5d). Tarkista tuotannon APP_VERSION uudessa käyttäjässä.
  Työhaara origin/v1973-prep nollattu mainiin ja = Fablen haara
  claude/bold-ride-vow4ki (Fable pushaa molempiin).
- Luovutukset siirtoon: Karttaseppä 4e4ae8cc, Sisältökirjuri 6df9f127,
  Pelikoodari 606103ac, Laitetestaaja fc3df934 (haara laitetestaaja),
  Julkaisija: katso docs/raportit/viesti-julkaisija-luovutus-20260921-siirto.md
  (v1973-prep tai haara julkaisija).
- Fablen haaran kärki: tämä luovutus. Loki docs/raamattu-loki/
  paatokset-2026-09.md sisältää kaikki tämän session päätökset (otsikot
  alla).

## Omistajan sitovat päätökset tänään (kaikki lokissa)
1. **KARTAN SULAVUUS ENSIN** (klo ~10.30): pallo panoroituu ja zoomaa
   kuin Google Earth, nimiöt paikallaan ja koko liukuva; mitään muuta ei
   tehdä ennen sitä. Isoisän linssi 1873 ja atlas odottavat (työ
   haaroissa karttaseppa-isoisan-linssi a65b2eef, karttaseppa-atlaslehti
   aec5b595). Euroopan linssit päätetään vasta sen jälkeen.
2. **Nimistö**: pohjakartalla nykyajan nimet ja rajat; poliittiset
   1873-nimet vain linssiin (jo niin); pysyvät kulttuurialueet saavat
   jäädä; Hannover, Oldenburg, Braunschweig, Anhalt → 1873-luokka.
   Nykyajan maakunnista (FRA 13 regionia + DEU 16 osavaltiota, nimet ja
   himmeät rajat) omistaja haluaa ENSIN VEDOKSEN (Sisältökirjuri aineisto
   → Karttaseppä koelaatat → omistaja päättää).
3. **Linssit aarrepalkkioiksi** (kartoitus docs/raportit/
   linssit-eurooppa-kartoitus-20260921.md): Eurooppa 38 linssiä,
   painoluokat leikki/katselu/tarina 1:1:1. Päätetty: hiomassa-ikoni +
   optikon hyvitys (mekaniikka Pelikoodarilla valmis 6e3eb5af, taulu
   tyhjä). Avoinna: renkaan koko ja tyylijakauma, ikonitilaus Codexille
   vasta sen jälkeen. Codex-tilaus 8 monumentista PERUTTU (kuvat olivat
   jo olemassa; inventaariotyökalu korjattu).
4. **Yläpalkki**: piiloon vain vaaka-asennossa (iPhone ja iPad),
   pystyssä aina; hampurilainen kun palkki on, väkäset vain ilman
   palkkia (Pelikoodari, haara pelikoodari-ylapalkki; katso luovutus).
5. Ei CLI-siirtoa; oikeuksien jako Macin toiselle käyttäjälle.

## Sulavuustyö (käynnissä)
- Karttaseppä: E1 VALMIS (karttaseppa-sulavuus f909d2fd + luovutus
  4e4ae8cc; pisin kehys 363→36 ms 4×-kuristuksella). Seuraava E2 tason
  vaihto ilman paljasta pohjaa, E3 zoom sormien kohtaan + liukuva rulla,
  E4 kamera→nimiöt-rajapinta. Mittari tools/savukkeet/mittaa-sulavuus.mjs.
- Pelikoodari: E1 VALMIS (pelikoodari-nimiot-sulavat c1d7b379, mittari
  js/pallolauta/sulavuusmittari.js). Seuraava: yläpalkkibugi → E2 liukuva
  koko (--nimiokerroin joka kehys) → E3 kylkivaihdon häivytys; E4 (GL-
  kerros) vain jos iPad-luku vaatii.
- Laitetestaaja: iPad-vertailumittaus v1988:lla samalla mittarilla
  (laitelupa pyydettävä uudelleen uudessa käyttäjässä), sitten kierros 22.

## Jonot
- Julkaisija: seuraava versio: iso-ajo-fra-kuvat-1 e9b9712c (jos ei
  v1989:ssä), yläpalkki 6cabce66, hiomassa 6e3eb5af, sulavuus-E1
  karttaseppa-sulavuus f909d2fd ja pelikoodari-nimiot-sulavat c1d7b379. Codex-haku ~/Documents/Codex/<pvm>/ jatkuu (ACL).
- Sisältökirjuri: iso ajo kohta 3 (BEL/SVK/SVN/CYP/MLT) → erä
  sisalto-nykyalueet (4 riviä 1873-luokkaan + vedosaineisto FRA/DEU) →
  muu Eurooppa 30 → visat 1/3 → taso 3 + nimistö → kadonneet monumentit.
- Karttaseppä: E2 → maakuntavedos → E3, E4. Poltot vasta vedospäätöksen
  jälkeen yhdellä kertaa.

## Omistajan avoimet
- Linssien määrä ja tyyli (rengas 1, leikkilinssit) → sitten ikonit.
- Maakuntavedos → päätös nimet+rajat / vain nimet / ei.
- Codexille kysymys: saako toimitukset neutraaliin kansioon.
- Laitelupa Laitetestaajalle uudessa käyttäjässä.

## Uuden Fable-session ensimmäiset askeleet
1. `git fetch origin`; tarkista v1989:n tila (gh pr list) ja
   origin/v1973-prep vs. oma haara (merge, loki --ours).
2. Lue muiden luovutukset viesti-*-luovutus-20260921-siirto.md
   (Karttaseppä valmis; muut: katso docs/raportit/).
3. Lähetä aloitusviestit (kaava siirto-ohjeen kohdassa 7).
4. Vahvista, että CI-ajurit ovat Idle ennen ensimmäistä PR:ää.
