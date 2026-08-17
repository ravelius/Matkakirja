# Dokumenttiremontti — suunnitelma

*(Fable max 17.8.2026, docs/arkisto/tyolista-maxille-2026-08.md
kohta 2. TILA: TOTEUTETTU — hyväksytty v808, vaiheet D1–D7 ajettu
ja mergattu 17.8.2026.
Toteutus vaiheittain tämän suunnitelman mukaan hyväksynnän
jälkeen; isot Raamattu-muutokset koordinoidaan päätoimittajan
kanssa ennen mergeä.)*

Tavoite (omistaja 16.8.2026): Raamattu on AINOA linjauslähde; sen
rinnalla vain roolitus-/malliohjeistus sekä moduulikohtaiset ohjeet
siisteinä omina md-tiedostoinaan — jaottelu moduulirakenteen mukaan
(docs/moduulirakenne-suunnitelma.md).

## 1. Dokumenttilajit — mikä kuuluu minne

Remontin selkäranka on neljän lajin ero. Jokainen docs-tiedosto saa
täsmälleen yhden lajin, ja lajien säännöt ovat:

| Laji | Mitä on | Missä asuu | Kuka kirjoittaa |
|---|---|---|---|
| **Linjaus** | omistajan päätökset ja pelin periaatteet | VAIN Raamattu (js/tyohuone-raamattu.js) | Fable |
| **Kaanon** | tarinan sitova sisältö suunnitelmineen | docs/tarina.md, docs/isoisan-raamattu.md | Fable |
| **Työohje** | roolitus, mallikohtaiset työtavat, julkaisusäännöt; moduulikohtaiset tekniset ohjeet ja reseptit | docs/roolitus.md; docs/moduulit/*.md | rooli­tuksen mukaan |
| **Tilannekuva** | työlistat, viestit, raportit, arkisto | docs/tyolista-*.md, viesti-fable.md, docs/raportit/, docs/arkisto/ | tekijä |

Nyrkkisääntö purkuun: jos virke kertoo MITÄ peliin halutaan tai
MIKSI, se on linjaus ja kuuluu Raamattuun (kerran). Jos se kertoo
MITEN asia tehdään (tiedostot, komennot, kentät, sudenkuopat), se on
moduuliohje. Moduuliohje saa lainata linjauksen yhdellä rivillä
viittauksella ("linjaus: Raamattu › Kuvat ja lähteet") — ei omin
sanoin toistaen, koska toisto erkanee alkuperäisestä ajan myötä.

## 2. Inventaario 17.8.2026

Rivimäärät tuoreesta mainista (v806). Laji = mihin tiedosto
remontin jälkeen kuuluu.

| Tiedosto | rivejä | nykyluonne | havainnot |
|---|---|---|---|
| CLAUDE.md | 49 | sisääntulo | kunnossa; polut päivitetään siirtojen tahdissa |
| README.md | 343 | julkinen esittely | kunnossa; ei linjausristiriitoja |
| CONTRIBUTING.md | 332 | ulkoisen osallistujan ohje + tekniset periaatteet | KAKSI KUOLLUTTA LINKKIÄ: docs/linssit-suunnitelma.md arkistoitiin, mutta rivit 146 ja 277 osoittavat vanhaan polkuun — samoin ~15 koodikommenttia (js/linssit/*, tokens.js, ui.js). Linssisopimuksen normatiiviset luvut ovat nyt vain arkistossa, vaikka koodi viittaa niihin sitovina. |
| docs/roolitus.md | 275 | työnjako + viestintä + julkaisusäännöt + sessiotaulukko + kaistajako + työjono | Elävän ohjeen seassa historiaa: sessiotaulukossa ~20 arkistoitua riviä; "Kaistajako kun sessioita on viisi" kuvaa 8.8. mallia jota ei enää ole; "Työjono (9.8.2026)" on vanhentunut tilannekuva. Nämä hämäävät uutta sessiota. |
| docs/tarina.md | 185 | kaanon | pysyy; ei kuulu remonttiin |
| docs/isoisan-raamattu.md | 598 | kaanon + jakotaulut | pysyy; jakotaulut ovat kaanonin työmuoto, ei pureta |
| docs/tutki-aiheet.md | 524 | lehtireseptit + PÄÄTETTY-linjauksia + QA-havaintoja | Linjaukset (lehtirakenne, paikallislehti, maa kantaa aiheet) on jo tiivistetty Raamatun Kaupungit/Maalehdet-osioihin — täällä ne ovat pitkinä "PÄÄTETTY"-kehyksinä. Tekninen resepti (kentät, työkalut, sudenkuopat, monistusohje) on elävää ja hyvää moduuliohjetta. Kaksi tasoa sekaisin: kaupunkilehti ja maalehti. |
| docs/tyolista-opukselle.md | 7923 | elävä työlista (~rivit 1–890) + historia (~7000 riviä) | Suurin yksittäinen ongelma. Rivistä ~890 alkaen valmiita paketteja (55–72…), "Tilanne 1.8.2026", vanhoja PÄÄTETTY-osioita jotka ovat nykyään kaanonissa (aarrenimistö = tarina.md) tai Raamatussa (lehtirakenne). Uusi sessio lukee 8 000 riviä, joista 90 % on historiaa. |
| docs/tyolista-maxille.md | 38 | tämä toimeksianto | arkistoidaan kun urakka on valmis |
| docs/kaariteksti-sapluuna.md | 376 | tarinakaaren prosessiohje | puhdas moduuliohje; tiivistää kaanonia tarkoituksella työjärjestykseksi (todettu dokumentissa itsessään) — sallittu muoto |
| docs/mantereen-resepti.md | 103 | prosessiohje uudelle mantereelle | Roolitaulukko TUPLAA roolitus.md:n ja on vanhentunut (viiden session malli); "Julkaisukuri"-luku tuplaa roolituksen julkaisusäännöt. Työjärjestys ja opit ovat eläviä. |
| docs/kuvakasikirjoitukset.md | 141 | sisältötyödokumentti (kaupunkikohtaiset kuvaspeksit) | kaava on Raamatussa (v806), täällä kaupunkikohtaiset sovellukset — oikea työnjako, lisätään viittausrivi |
| docs/viesti-fable.md | 253 | viestikanava | sisältönä sijaispäätoimittajan käsittelemätön luovutus 16.8. — EI kosketa remontissa; päätoimittaja käsittelee ja tyhjentää |
| docs/erad-bahrain-valmis.json | — | valmis sisältödata odottamassa BHR-geometriaa | ei ohje (testi valvoo vain .md); pysyy odottamassa |
| docs/raportit/ | 17 md | kertaraportit | kunnossa — kartan ulkopuolella tarkoituksella |
| docs/arkisto/ | 20 md | arkisto | kunnossa — ARKISTOITU-leimat testattu |
| docs/kuvat/ | 5 png | raporttien liitteet | pysyy |

Valvonta nyt: tests/dokumentit.test.mjs vaatii (1) jokainen
docs/*.md on Raamatun kartalla — VAIN juuritaso, ei alikansioita;
(2) jokainen Raamatun docs-viittaus on olemassa; (3) jokainen
arkiston md kantaa ARKISTOITU-leimaa alussa. Kartta luetaan
merkkijonohaulla, joten sen on pysyttävä yhdessä tiedostossa
(js/tyohuone-raamattu.js).

## 3. Kohdetila

```
docs/
├── roolitus.md               työnjako, mallit, viestintä,
│                             julkaisusäännöt (siivottu)
├── tarina.md                 kaanon (ennallaan)
├── isoisan-raamattu.md       kaanon (ennallaan)
├── mantereen-resepti.md      prosessiohje (ohennettu: roolit ja
│                             julkaisusäännöt viittauksina)
├── kuvakasikirjoitukset.md   sisältötyödokumentti (+viittausrivi)
├── tyolista-opukselle.md     ELÄVÄ työlista (~800 riviä)
├── tyolista-maxille.md       kunnes valmis → arkisto
├── viesti-fable.md           viestikanava
├── moduulit/                 UUSI: moduulikohtaiset ohjeet
│   ├── kaupunkilehti.md      ← tutki-aiheet.md:n lehtiosat
│   ├── maalehti.md           ← tutki-aiheet.md:n maaosat
│   ├── tarinakaari.md        ← kaariteksti-sapluuna.md
│   ├── linssit.md            ← arkiston linssit-suunnitelman
│   │                           elävät luvut (linssisopimus)
│   └── …                     muut syntyvät moduulijaon toteutuksen
│                             tahdissa (opas, äänet, pöllö,
│                             työhuone, jakelu)
├── arkisto/                  + uudet arkistoinnit
├── raportit/
└── kuvat/
```

Juureen jäävät CLAUDE.md (sisääntulo), README.md (esittely) ja
CONTRIBUTING.md (GitHub-konventio: ulkoisen osallistujan polku —
kysymysten lisäys, uusi lauta, uusi linssi — viittaa moduuliohjeisiin
yksityiskohdissa).

Moduuliohjeen vakiomuoto (jokaisen moduulit/*.md:n alkuun):

```
# <Moduuli> — ohje
Linjaukset: Raamattu › <osiot>. Tämä dokumentti kertoo vain MITEN.
Koodi: <tiedostot>  Data: <packs>  Testit: <testit>  Työkalut: <mjs>
```

## 4. Siirtoluettelo tiedosto kerrallaan

1. **docs/roolitus.md** — jää, siivotaan:
   - sessiotaulukosta arkistoidut/valmiit rivit →
     docs/arkisto/sessiohistoria-2026-08.md (ARKISTOITU-leima);
     tauluun jäävät vain aktiiviset sessiot
   - "Kaistajako, kun sessioita on viisi" → sama arkisto
   - "Työjono (tilanne 9.8.2026)" → sama arkisto; avoimet asiat
     -lista (kapulanvaihto 14.8.) JÄÄ roolitukseen kunnes omistaja
     ratkaisee ne
   - jäävät: roolit, viestintä (trigger-kiellot), työn seuranta,
     kustannuskuri, julkaisusäännöt, speksioppi
2. **docs/tutki-aiheet.md** → puretaan kahdeksi moduuliohjeeksi:
   - docs/moduulit/kaupunkilehti.md: lehtitaitto, kansi, sää,
     kohtaaminen, uutiset, tv/radio, kuvasäännöt, tarkistuslistat,
     toistuvat viat
   - docs/moduulit/maalehti.md: maa-aiheet, Maa numeroina,
     monistusohje, genetiivit, intro
   - PÄÄTETTY-kehykset korvataan viittauksella Raamattuun; tekstit
     siirretään muuten sanatarkasti; vanhentunut
     monistusjärjestyshistoria arkistoon
3. **docs/kaariteksti-sapluuna.md** → docs/moduulit/tarinakaari.md
   (siirto sellaisenaan, otsikon alle moduulikehysrivi)
4. **docs/tyolista-opukselle.md** — halkaistaan:
   - elävä osa jää (linjauskehykset alusta tiivistetään
     Raamattu-viittauksiksi; Vakiokäynnistys; avoimet paketit;
     TILANNE-taulukon avoimet rivit)
   - kaikki valmis/vanhentunut → docs/arkisto/
     tyolista-opukselle-2026-08.md (ARKISTOITU-leima)
   - AJOITUS: koordinoidaan päätoimittajan kanssa — tiedosto on
     aktiivisessa käytössä (O4–O7 kesken) ja työsessioiden
     perustamispromptit viittaavat siihen
5. **docs/mantereen-resepti.md** — jää juureen prosessiohjeeksi;
   roolitaulukko ja Julkaisukuri-luku korvataan viittauksella
   roolitukseen; työjärjestys ja opit jäävät
6. **CONTRIBUTING.md** — jää; linssiluku ohennetaan viittaamaan
   docs/moduulit/linssit.md:ään ja kuolleet linkit korjataan
7. **docs/moduulit/linssit.md** — UUSI: elvytetään arkiston
   linssit-suunnitelmasta normatiiviset luvut (linssisopimus,
   rakennusohje, tarkistuslista), joihin koodikommentit viittaavat
   sitovina. Historia jää arkistoon. Koodikommenttien polut
   päivitetään seuraavan linssejä koskevan koodi-PR:n kyydissä —
   ei omaa versionostoa pelkille kommenteille
8. **docs/kuvakasikirjoitukset.md** — jää; alkuun rivi "linjaus:
   Raamattu › Kuvat ja lähteet"
9. **tests/dokumentit.test.mjs** — laajennus: testi 1 skannaa myös
   docs/moduulit/*.md (sama karttavaatimus). Tehdään SAMASSA
   PR:ssä jossa moduulit/-kansio syntyy, jotta kartaton ohje ei
   ole mahdollinen hetkeäkään
10. **js/tyohuone-raamattu.js** — Ohjedokumenttien kartta päivittyy
    jokaisen siirron kanssa samassa PR:ssä (testi pakottaa);
    remontin lopuksi kartan rakenne kirjoitetaan kohdetilan
    mukaiseksi ja TOTEUTUSLISTA-rivi poistetaan. Ehdotus uudeksi
    Raamattu-osioksi "Moduulit" (linjaustaso) on moduulirakenne-
    suunnitelman liitteenä — kirjataan vasta omistajan hyväksyttyä
    moduulijaon
11. **docs/tyolista-maxille.md** — arkistoidaan, kun molemmat
    urakat on viety loppuun

## 5. Vaiheistus (checkpoint-commit per osa-alue)

Jokainen vaihe on oma PR: pelkkiä docs-muutoksia → EI versionostoa;
portit silti aina: `node --test tests/*.test.mjs` ("# pass"/"# fail"
-rivit luetaan), ja siirrot atomisesti (poisto + lisäys + kartta
samassa commitissa — kahta rinnakkaista totuutta ei ole hetkeäkään).

| Vaihe | Sisältö | Riippuvuus |
|---|---|---|
| D1 | roolitus.md-siivous + sessiohistorian arkistointi | ei mitään |
| D2 | moduulit/-kansio + dokumentit.test-laajennus + tarinakaari.md-siirto | ei mitään |
| D3 | tutki-aiheet → kaupunkilehti.md + maalehti.md | D2 |
| D4 | linssit.md (elvytys arkistosta) + CONTRIBUTING-linkkien korjaus | D2 |
| D5 | mantereen-resepti-ohennus + kuvakasikirjoitusten viittausrivi + CLAUDE.md/README-polkupäivitykset | D3 |
| D6 | tyolista-opukselle-halkaisu | päätoimittajan ajoituslupa |
| D7 | Raamatun kartan loppusiivous (+ Moduulit-osio jos hyväksytty) + tyolista-maxille arkistoon | D1–D6 |

D1, D2 ja D4 ovat riskittömimmät ja voidaan tehdä heti hyväksynnän
jälkeen. D6 on ainoa, joka koskee toisen session aktiivista
työtiedostoa — se odottaa päätoimittajan merkkiä.

## 6. Riskit ja varotoimet

1. **Rikkinäinen puhelin siirtymässä.** Aktiivisten sessioiden
   perustamispromptit viittaavat vanhoihin polkuihin
   (tutki-aiheet.md, tyolista-opukselle.md). Varotoimi: siirrot
   D3/D6 ajoitetaan päätoimittajan kanssa sessiosukupolvien väliin,
   ja Raamatun kartta + roolitus päivittyvät samassa PR:ssä.
   Tynkätiedostoja ("sisältö muutti tänne") EI jätetä — testi
   vaatisi ne kartalle ja ne jäisivät roikkumaan.
2. **Sisältö muuttuu siirrossa huomaamatta.** Siirto tehdään
   sanatarkasti (leikkaa–liimaa); ainoa sallittu muokkaus on
   PÄÄTETTY-kehyksen korvaus viittauksella ja otsikkotason kehys.
   Diffi tarkistetaan: poistojen ja lisäysten on vastattava
   toisiaan.
3. **Linjaus katoaa purussa.** Ennen jokaista poistoa tarkistetaan,
   että vastaava linjaus todella on Raamatussa — jos ei ole, se
   LISÄTÄÄN Raamattuun ensin (Fable-oikeus tällä sessiolla;
   koordinoidaan päätoimittajan kanssa raportissa ennen mergeä).
4. **Historia ei saa kadota.** Arkistointi on siirto + leima, ei
   poisto; git säilyttää kaiken. Arkistoon menevä tilannekuva saa
   aina ARKISTOITU-rivin (testi 3 valvoo).
5. **Kaanoniin ei kosketa.** tarina.md ja isoisan-raamattu.md eivät
   ole remontin piirissä.

## 7. Omistajan päätettävät

1. Hyväksytäänkö moduulit/-alikansio (vaatii testilaajennuksen) —
   vaihtoehto olisi litteä nimeäminen docs/moduuli-*.md?
   Esitys: alikansio, koska docs-juuri pysyy silmäiltävänä.
2. Saako tyolista-opukselle.md:n halkaista (D6) heti, kun
   päätoimittaja antaa ajoitusluvan — vai vasta kun O4–O7 ovat
   valmiit? Esitys: päätoimittajan ajoitus.
3. Raamatun "Moduulit"-osio: kirjataanko moduulijako linjaukseksi
   Raamattuun (esitys moduulirakenne-suunnitelman luvussa 8)?
