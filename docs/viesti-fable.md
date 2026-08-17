# Fablemax → Fable: lehtitila-olio + savukevartija (17.8.2026)

Haara `claude/fable-lehtitila` (pohja v823/9567024, rebasattu kun
main liikkui kesken työn). Kolme sisältöcommittia + tämä raportti.
EI PR:ää, EI versionostoa — päätoimittaja katselmoi, ajaa
uusi-versio.mjs:n ja julkaisee.

## Osa 1 — lehtitila-olio (commit "Lehtitila-olio: …")

Lehden, maalehden ja kohdekartan hajallaan ollut muistitila koottiin
yhdeksi `ui.lehtitila`-olioksi. Puhdas mekaaninen siirto, ei
käytösmuutoksia: kenttien nimet säilyivät sellaisinaan (vain
`ui.X` → `ui.lehtitila.X`), koska pöllö, testit ja savukkeet lukevat
samoja nimiä — uudelleennimeäminen olisi moninkertaistanut riskin.

**Kentät (31 kpl), dokumentoitu yhdessä paikassa ui.js:n rakentimen
literaalissa (ainoa dokumentointipaikka):**

- Kaupunkilehti: arrivalShownFor, arrivalKuvat, arrivalKuvaKohdalla,
  arrivalMaaTiedot, esilatattu, mediaKaupunki, mediaIso,
  lehtiSaaTiedot, lehtiMittaAjastin, lehtiMittaJalkiajastin
- Kulttuuriosa: kulttuuriSaatavilla, kulttuuriKuvaEl,
  kulttuuriHuntuEl, kulttuuriKuvaNappaimet, kulttuuriAani
- Sivupino: tutkiTila, tutkiSivut, tutkiSivu, tutkiKansi, tutkiLehti,
  tutkiMaaLehti, tutkiMaaEtusivu, tutkiMaaIso, tutkiMaaNimi,
  tutkiSelausKytketty, tutkiSyke
- Maalehti: maanSivut
- Nähtävyydet/kohdekartta: nahtavyysPino, nahtavyysAuki,
  nahtavyysYlaVahti, nahtavyysSelaus

**Rajauspäätökset (perustelut):**

1. DOM-KAHVAT EIVÄT SIIRTYNEET. arrival*-perheestä 36 kenttää on
   rakentimen getElementById-hakuja (arrivalDialog, arrivalCity,
   arrivalKulttuuri* ym., ~250 käyttökohtaa) — ne ovat kiinteitä
   elementtiviitteitä, eivät muistitilaa. Suunnitelman M5 sanoo
   "arrival*/tutki*-TILA kootaan" — tila siirtyi, kahvat jäivät.
   Kahvojen poisrajaus on kirjattu literaalin dokumenttilohkoon.
2. MUKAAN vain lehtipintojen tila: myös nahtavyys* (paluupino ja
   avoin juttu — tehtävänannon ".paluupino"-esimerkki) ja tutkiSyke
   (Tutki-napin syke; nimetty tutki*-perheeseen).
3. POIS jäivät: luettuSaapuminen (renderFactin eli Tarinakaaren
   tila, ei lehden), kaydytEnnen (vuorologiikan pari tutkiSykkeelle),
   wiki*-kentät (jaettu Lue lisää -palvelu, ei lehden sisäinen),
   satelliittiNakyma (kuollut kenttä, ks. havainnot).

**Mitatut todennukset:**

- Lähtötila: 31 kenttää, 206 tekstiosumaa 16 tiedostossa (mittari
  ajettiin ennen/jälkeen; skripti scratchpadissa, kertakäyttöinen).
- Korvaukset: pelikoodi 180 kpl (ui.js 80, lehti.js 70, maalehti.js 8,
  nahtavyydet.js 21, opas.js 1) + työkalut/testit 22 kpl + 5
  mock-literaalin muotoilua (tests/pollo.test.mjs 4, savuke-pollo 1).
  Kaikki 206 osumaa täsmäytetty: 202 sai lehtitila-etuliitteen,
  2 rakentimen alustusriviä sulautui literaaliin (arrivalKuvat=[],
  arrivalKuvaKohdalla=0 — samat alkuarvot literaalissa), 2 pollo.js:n
  osumaa on muodossa `ui?.lehtitila?.X` (pöllö sietää ui:ttoman
  kutsun kuten ennenkin).
- Jäännöstarkistus: nolla suoraa `(this|ui).kenttä`-osumaa koko
  reposta (js/mjs/html/md; ainoa jäljelle jäänyt maininta on
  docs/arkisto/-tiedostossa, jota ei kosketa).
- Ei destrukturointeja eikä merkkijonoavaimia näille kentille
  (tarkistettu erikseen — varoituksen 3 tunnistinsokeus katettu).
- Elinkaari: olio syntyy rakentimessa ja kuolee instanssin mukana
  (main.js: destroy + uusi UI) — nollaus täsmälleen entinen.
  destroy():n clearTimeout-polut kulkevat nyt lehtitilan kautta,
  sama käytös.

## Osa 2 — savukevartija (commitit "Savukevartija: …" ja
"Savukevartijan sidontasääntö …")

`tools/tarkista-savukkeet.mjs` (työjonon #46) + CI-askel
testit.ymliin (ajetaan joka PR:lle). Yhteinen lähteentyhjäys
eriytettiin sanatarkasti tarkista-niputus.mjs:stä
tools/lahde-tyhjays.mjs:ksi (ei kahta kopiota; niputustarkistimen
tuloste todennettu samaksi ennen/jälkeen).

**Kattavuus:** 25 skriptiä (tools/savukkeet/ 15 + tools/savuke-* ja
kuvaa-* 10), 277 ui-viittausta vasten 254 UI-metodia, 294
toteutuksen kenttää ja 31 lehtitilan kenttää. Säännöt:
(1) kutsu ui.X() vaatii UI-metodin; (2) luku ui.X vaatii metodin,
toteutuksen kentän tai savukkeen oman mittarikirjoituksen samassa
tiedostossa; (3) ui.lehtitila.X (luku ja kirjoitus) vaatii
literaalin avaimen; (4) ui.X.bind() vaatii AINA toteutuksen nimen —
monkeypatchin oma kirjoitus ei kelpaa alibiksi. Kommentit,
merkkijonot ja regexit tyhjätään ennen skannausta. Vartija kaatuu
epäilyttävän vähiin nimiin (floorit) mieluummin kuin vaikenee.
Negatiivitestit ajettu: istutettu väärä metodikutsu, väärä
lehtitila-avain ja kadonneen metodin bind kaatoivat ajon oikein.

**Vartijan heti löytämät viat (korjattu samassa haarassa):**

- savuke-karttazoom luki kenttiä joita ei ole koskaan ollut
  (tutkiSivuNyt, tutkiSivuIndeksi) — kuolleet luvut poistettu,
  käytös ennallaan (fallbackit hoitivat).
- savuke-karttazoomin ui.avaaNahtavyys-kietaisu kaatoi koko savukkeen
  M4:n jälkeen (avaaNahtavyys siirtyi nahtavyydet.js:n
  moduulifunktioksi, UI:lla ei delegaattoria). Kietaisu poistettu ja
  jutun avaus todetaan dialogin tilasta — savuke etenee nyt
  pidemmälle kuin mainissa (mainissa kaatuu käsittelemättömään
  virheeseen).

## Porttien tulokset (rebasen jälkeen, pohja v823)

- node --test: 740 testiä, 739 pass, 0 fail, 1 skipped — TÄSMÄLLEEN
  sama puhtaassa mainissa (skip on vanha).
- tarkista-kaksoisavaimet: ei kaksoisavaimia.
- tarkista-niputus: 110 moduulia, 1220 julistusta, ei törmäyksiä
  (ei uusia js/-tiedostoja → ei MODULES/sw.js-muutoksia).
- tarkista-savukkeet: kunnossa (uusi portti, myös CI:ssä).
- build-standalone: kokoontuu; savuke-dist: peli käynnistyy,
  VIRHEET [].
- Savukkeet haaralla vs. puhdas main (main ajettu git archive
  -kopiosta): lehtiotsikko 17/17 · maaselain 6/6 · kehittajalehti 4/4
  · lehden-mitta 4/4 · lukijan-seuranta 9/9 · esilataus 15/17
  (SAMAT 2 FAILia mainissa: kansikuvan leveys, maakartan esilataus)
  · lehtiasettelu 8/10 (SAMAT 2 FAILia mainissa) · savuke-pollo
  253/264 (SAMAT 11 FAILia mainissa) · kuvaa-maalehti IRN: identtinen
  tuloste. Yksikään ero ei johdu tästä haarasta.

## Havainnot, joita EN korjannut (kustannuskuri)

1. **pollo.js:1434 `ui.avaaNahtavyys?.()` on kuollut kutsu M4:stä
   asti** — pöllön nähtävyyslinkki ei avaa juttua (savuke-pollon
   vanha FAIL "Avaa juttu vie nähtävyysjuttuun" todistaa saman
   mainissa). Korjausehdotus: yhden rivin delegaattori UI-luokkaan
   (`avaaNahtavyys(kohde, numero, valinnat)` → nahtavyydet.js), sama
   malli kuin muissa delegaattoreissa. Käytösmuutos → oma PR.
2. **savuke-karttazoomin loppuosa vaatii oman korjauserän**: kohteen
   napautuskoe olettaa yhden klikkauksen avaavan jutun, mutta
   15.8-linjauksen jälkeen napautus suurentaa ja vasta kyltti avaa;
   lisäksi ele/selaus-osio kaatuu (`.kartta-kehys` katoaa) ja
   "numeroympyrä ei paisu" -EI on mainissakin. Savuke on mainissa
   rikki (kaatuu aiemmin); haaralla se pääsee pidemmälle.
3. **ui.js:n `satelliittiNakyma` on kuollut kenttä** (rakentimen
   alustus rivillä ~1105, ei yhtään lukijaa) — jäänne piirroskartan
   poistosta. Poisto sopii seuraavaan siivouseriin.
4. Esilatauksen 2 FAILia (Lontoon kansikuvan leveys, maakartan
   esilataus lehteä avaamatta) ja lehtiasettelun 2 FAILia ovat
   mainin vanhoja — eivät tästä haarasta, syitä en tutkinut.

## Päätoimittajalle jäävät päätökset

- Katselmointi ja merge; uusi-versio.mjs + build viimeisenä (koodia
  muuttunut → versionosto tarvitaan; muutoslokiriviehdotus:
  "Lehtitila-olio ja savukevartija").
- Halutaanko pollo.js:n avaaNahtavyys-delegaattori (havainto 1)
  omana pikakorjauksena — suosittelen.
- savuke-karttazoomin korjauserä työjonoon (havainto 2).
- Raamatun kartan riville "Avoinna: M7 … ja lehtitila-olio" voi
  mergen jälkeen päivittää lehtitilan tehdyksi (Raamattuun kirjoittaa
  vain Fable — en koskenut).
