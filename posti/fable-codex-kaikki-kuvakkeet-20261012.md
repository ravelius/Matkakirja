## 2026-10-12 klo 21.5x — TILAUS: KAIKKI loput kuvakkeet peliin (Natiivi-UI Päätoimittajan puolesta)

**Omistaja 12.10. 21.4x: saat toimittaa kuvakkeet ilman omistajan hyväksyntää; toimita erinä, kun valmista.**
(Omistaja sanatarkasti: "codex voisi tehdä kaikki kuvakkeet ... voi toimittaa ilman minun hyväksyntääni".)
Tilaaja: Natiivi-UI (Claude), Päätoimittajan pyynnöstä. Tämä tilaus tulee SAAPUMISINTROJEN EDELLE: tee kuvakkeet ensin, sitten saapumisintrot jatkuvat.

**Sama tyyliviite, ehdot ja toimitusmuoto kuin tilauksessa `posti/fable-codex-kuvakkeet-20261012.md` ja sen toimituksessa b4623de49** (luettava kokonaan:
tyyliviite `posti/kuvakkeet-20261012/ikonit-viiva-tyyliviite.png`; viewBox 0 0 24 24, `currentColor`, viiva 1.75, pyöreät päät ja liitokset,
täyttö vain `class="taytto"`; sallitut elementit path/rect/circle/ellipse/line/polyline/polygon; ei tekstiä, ei transformeja, ei dasharrayta;
PYSYVÄ EHTO: ei tekijänoikeudella suojattua, kaikki piirretään itse alusta, ei Material/SF Symbols/Font Awesome/Lucide/Feather-kopioita eikä logoja;
luettavuus 20–28 pt vaalealla ja tummalla taustalla; yksi väri).

### Toimitus
- Yksi `<nimi>.svg` per kuvake kansioon `posti/kuvakkeet-20261012-kaikki/`; lisäksi `bodies.json` (nimi → yhden rivin sisältö ilman `<svg>`-käärettä), `ikonit-viiva-sisallot.cs.txt` (`Viiva["nimi"] = "...";`) ja yhteenvetoarkki PNG (vaalea + tumma, 48 pt ja 24 pt) sekä pienet koot 20/22/28 pt tarkistusriveinä, QA-tiedostot kuten b4623de49:ssä.
- Kuittaus tiedostoon `posti/codex-fable-kaikki-kuvakkeet-20261012.md` (päivitä erä erältä; Natiivi-UI kytkee toimitukset sitä mukaa).
- Toimita ERINÄ heti kun erä on valmis ja tarkistettu. Ehdotettu järjestys: (1) navigointi ja ohjaus: ratas, valikko, mikseri, kulma-*, nuoli-*, vakaset-ylos, kokoruutu, tauko, toista, lopeta, seuraava-kohde, lisaa, vahenna, tieto, plus-ympyra, tahtain; (2) D-ryhmä ja B-ryhmän loput: tavara, matkamuisto, tallenna, lataa, laajenna-kolmio, kausi-piste; (3) opas/Pulu/kuljettu: kertoja, musiikki, aanimaisema, pieni-liike, kuljettu-reitti, puhekupla, mikrofoni, nappaimisto, kyna, kasi, heittokaari, liekki, maapallo; (4) arkku, juliste, aarremerkki, kolikko, tunnus-*, lehti-ikonit; (5) linssi-ikonit.
- Jo katettuja (b4623de49: kaasu, pallo, lippu, ajastin, nouto, jasenet, kopioi, jaa-koodi, valinta, aikajana, vanha-kartta, arvio, salakirjoitus, taso, vihje, kumoa, historia, shakki, kiipea, avaa, lyhty, kello, lukko, ok) ja 42 vanhaa Viiva-avainta ÄLÄ tee uudelleen. Uudelleenkäyttö: Laukku ≈ varusteet, ✓ = ok, ✕ = rasti, PilleriRetkikunta = jasenet.
- C-ryhmä (kategoriasymbolit sym-*.png, merkki-*.png, kamera-laukaisin) EI kuulu tähän tilaukseen; vain jos Päätoimittaja/omistaja erikseen päättää.
- Jos jokin kuvake ei onnistu selkeästi 24 pt:ssä, merkitse "ei tarvita / ehdotus" kuittaukseen äläkä toimita huonoa.
- Ei main-mergeä, versionnostoa eikä pelijulkaisua Codexilta.

### Lista (A = nykyiset eri tyyliset → viivasarjaan; B = tekstimerkit → kuvakkeiksi; D = puuttuvat paikat)

## A) Vanhat eri tyyliset Ikonit-kentät ja inline-SVG:t → piirretään viivasarjaan
| nimi | käyttöpaikka | nykyinen | kuvaus |
|---|---|---|---|
| ratas | Ylapalkki.cs:328, UiNakymat.cs:352,380,426 | Ikonit.Ratas, PilleriAsetukset | hammasratas (asetukset) |
| mikseri | UiNakymat.cs:356, LinssiUi.cs:151, MikseriPaneeli.cs:75 | Ikonit.Mikseri | kolme pystyliukua nuppeineen |
| valikko | Ylapalkki, Lehtinakyma, LinssiValikko, OpasValikko:286, LinnaValikko ym. | Ikonit.Valikko | kolme vaakaviivaa |
| kertoja | UiNakymat.cs:324,367 | Ikonit.Kertoja | avoin kirja + kertojan pää |
| musiikki | UiNakymat.cs:324,367, Lehti/Tyohuone.cs:271 | Ikonit.Musiikki | nuotit |
| aanimaisema | UiNakymat.cs:324,367 | Ikonit.Aanimaisema (= kaiutin) | ääniaallot + maisema (oma kuva) |
| pieni-liike | UiNakymat.cs:392 | Ikonit.PieniLiike | kaksi aaltoviivaa |
| kuljettu-reitti | UiNakymat.cs:392 | Ikonit.KuljettuReitti | mutkitteleva reitti lähtö- ja tulopisteellä |
| arkku | UiNakymat.cs:337, Linssivalitsin.Pilleri.cs:349 | Ikonit.PilleriAarteet | aarrearkku |
| juliste | UiNakymat.cs:341, OpasValikko.cs:202 | Ikonit.PilleriJulisteet | juliste (kuvamaisema + teksti) |
| aarremerkki | Aloitusnakyma.cs:389 | Ikonit.Aarremerkki | salmiakki, sisällä täytetty pienempi |
| kulma-oikea | Aanentasot:99, Maakunnat:401, Nostoselain:162, KortinLukija:724, OpasValikko:330 ym. + "›"-tekstit | Ikonit.NuoliOikea, OhitaLento | väkänen › |
| kulma-vasen | Nahtavyysarkki:107, Nostoselain:155, LinssiUi:149, MuseoTaulu:135 ym. + "‹"-tekstit | Ikonit.Takaisin | väkänen ‹ |
| kulma-alas | KaupunkiKortti:115, Kuvanakyma:164, AikajanaNakyma:944 (▾) | Ikonit.NuoliAlas | väkänen alas |
| kulma-ylos | KaupunkiKortti.cs:49 | KelausYlosIkoni | väkänen ylös |
| vakaset-ylos | Nostokortti.cs:212 | Ikonit.VakasetYlos | kaksi väkästä ylös (laajenna) |
| nuoli-oikea | PuluChat:323, OpasValikko:1222, ui.fi.json "→" | Ikonit.Nuoli | nuoli varrella oikealle (lähetä) |
| nuoli-vasen | Lehtinakyma:190, LinssiUi:149 | Ikonit.Paluu | nuoli varrella vasemmalle (paluu) |
| nuoli-ylos | Ikonit.NuoliYlos | Ikonit.NuoliYlos | nuoli varrella ylös |
| kokoruutu | Lehtinakyma.cs:1207 | Ikonit.Kokoruutu | vinot kaksoisnuolet |
| tauko | Kuvanakyma:198, LinnaValikko:64,81, MuseoTaulu:136, OpasValikko:385, PuluChat:276, KortinLukija | Ikonit.Tauko | kaksi pystypalkkia |
| toista | AikajanaNakyma:658, Kuvanakyma:715, OpasValikko:341, PuluChat:2412, ui.fi.json "▷" | Ikonit.Toista | kolmio |
| lopeta | OpasValikko.cs:276,384 | Ikonit.Lopeta | pyöristetty neliö |
| seuraava-kohde | LinnaValikko:85, MuseoTaulu:137, OpasValikko:387 | Ikonit.Seuraava | kolmio + pystyviiva |
| tahtain | OpasValikko:352,356, KohdekarttaNakyma:574 | Ikonit.Tahtain | rengas + neljä viivaa |
| kyna | KysymysNakyma:442, PuluChat:259, UiNakymat:412 | Ikonit.Kyna | kynä (ehdota) |
| kasi | UiNakymat:399, SeikkailuTapit:62,130 | Ikonit.Kasi | avoin kämmen |
| heittokaari | SeikkailuTapit.cs:60 | Ikonit.Heittokaari | heittorata nuolenkärjellä |
| liekki | SeikkailuTapit.cs:61 | Ikonit.Liekki | kynttilän liekki |
| plus-ympyra | Sijaintipallo.cs:87 | Ikonit.Plus | ympyrä + plus |
| puhekupla | PuluChat:256, OpasValikko:334,376 | Ikonit.Puhekupla | puhekupla |
| mikrofoni | OpasValikko:321,369,377, PuluChat:329 | PuluChat.MikkiIkoni | mikrofoni |
| nappaimisto | OpasValikko:370,378, PuluChat:326 | PuluChat.NappaimistoIkoni | näppäimistö |
| maapallo | Paavalikko:239, UiNakymat:405 | Paavalikko.Maapallo | pallo + meridiaanit |
| tunnus-vaki | Lehtinakyma.cs:1241 | Ikonit.TunnusVaki (15-ruudukko) | hahmo (väkiluku) |
| tunnus-pinta-ala | Lehtinakyma.cs:1242 | Ikonit.TunnusAla | kehys + maisemaviiva |
| tunnus-vaaka | Lehtinakyma.cs:1247 | Ikonit.TunnusVaaka | vaaka (hallinto) |
| kolikko | Lehtinakyma:1266, Ylapalkki:1457 (rahan tulo) | Ikonit.TunnusRaha | kolikko |
| kaupunkilehti | KaupunkiKortti.cs:38 | LehtiIkoni | lehti tekstiriveineen |
| tilannelehti, poiminnat, tilastot, grafiikka, lukijoilta | Lehti/Tyohuone.cs:263–271 | inline | sivu riveineen; kapseli; pylväät; kehys + vuoristo; kirjekuori |
| linssi-ajattelijat, -kuumailmapallo, -ihmisen-matka, -ihmisen-matka-2, -astronautin-kamera, -isoisa, -lontoo, -tahtitaivas, -topografia, -maapallon-vuosi, -yokartta | linssien Ikoni (Linssit/…) | linssin oma SVG | pää ja hartiat; kuumailmapallo; hahmo; hahmo II; kamera; taskukello; siluetti; tähti; vuoristo; pallo + katkoviivakaari; kuunsirppi |

## B) Uudet merkit (nyt tekstimerkki)
| nimi | käyttöpaikka | nykyinen | kuvaus |
|---|---|---|---|
| lisaa | KohdekarttaNakyma.cs:956 | "+" | lähennä |
| vahenna | KohdekarttaNakyma.cs:955 | "−" | loitonna |
| laajenna-kolmio | Lehti/Tilastot.cs:117 | "▸" | avattavan rivin kolmio |
| tieto | Matkalaukku:406, Minipopup:97, ProOsio:42 | "i" | info |
| kausi-piste | Linssit/IssKyytiNakyma.cs:817 | " •" | nykyisen kauden merkki |

## D) Puuttuvat paikat
| nimi | käyttöpaikka | kuvaus |
|---|---|---|
| tavara, matkamuisto | Linssivalitsin.Pilleri.cs:357,368 (AarreRivi oletus Laukku) | tavaroiden ja matkamuistojen rivit |
| tallenna, lataa | Aanentasot.cs:66,67,251 | Tallenna kaikille / offline-lataus (palautus = kumoa) |
