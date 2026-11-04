# Pelikoodari: luovutus 4.11.2026 klo 05.02 – tumma muurilohko KK:lta, säikähdyksen todistus JU:lla

Edellinen: -20261104-0405 (lisäyksineen, 109848acf). Tämä korvaa sen sirpale-, palikka- ja LOD-osat; be56-osa -0334:ssä ja "Muut ennallaan" -0405:ssä ovat voimassa. Syy: pehmeä raja 25 % (7.37). Ei omia taustaketjuja.
Viestit KK:lle suoraan näissä asioissa, PT tiedoksi (KK:n pyynnöstä).

## SEURAAVA TYÖ (KK 05.00; ennen junaa)
LOD-korjaus cb8b1f06c: **palikkakuvion poisto hyväksytty** (Mac). Ei junaan ennen iPadin muistia ja PT:n kuittausta. Mutta:

1. **Tumma muurilohko ei kelpaa vielä.** Se ja pystysuora kova reuna viereiseen muuriin näkyvät korjauksen jälkeen koko lähestymisen ajan. KK: "Omistaja ei saa löytää tätä ensimmäisenä." Selvitä, onko se aito varjo vai pinnan ero: sama kohta varjot pois tai toisella auringon kulmalla, ja katso, näkyykö sama julkaistussa 217:ssä. Aito varjo saa jäädä, jos se näyttää varjolta. Muuten korjaa niin, että muuri on yhtä väriä. **Sama koskee harmaata sokkelia oikealla.**
2. **Tumma harmaa kaista aukion poikki muurin edessä** (kummassakin parin kuvassa): mallin tarkoittama kivikaista vai puuttuva pinta? Yhden rivin vastaus KK:lle riittää.

Kuva: `/Users/Shared/Claude/proto-3d/_tyo/pelikoodari/lod-korjaus/pari-z132-66-v14-vs-korjaus.png` (vasen v14 vaihdon aikana, oikea korjaus; sama z −132,66). Ajon kansio: `lokit/esikatselu-20261104-043533` (ruutu 5735), v14 `esikatselu-20261104-042251` (ruutu 5719).
Lähtötiedot, ei todistettu: lohko on kk-tausta-1-0 (rajat x −6..446, z −168..113); LOD0 on leivottu, LOD1:n materiaalia ei ole tarkistettu; koodikommentin mukaan LOD1:llä ei ole leivottua valoa. Vaalea → tumma nähtiin v10–v12:ssa vaihdon yli (5755 vaalea, 5776 tumma), joten ero on LOD0:n ja LOD1:n välillä tai LOD0:n leivonnassa. Koodi: JuoksuSokkeloMaailma.Palatsi.cs PaivitaPalatsi. Ajot vain JU:n vuorolla.
Haara: pelikoodari/lod-diag-218 (wt/proto-pelikoodari-lod-diag), kärki a368fdf29 sisältää diagnostiikan. Junaan vain cb8b1f06c.
Yhä auki: 32 px:n ruudut ilman selitystä, värihyppy kaukana (z −308) mittaamatta, taustan LOD0-lohkoja enintään 13 (ennen laskettuna 3). Tiedot: `palvelijat-v12/HUOMIOT.md` lopussa.

## Säikähdys (KK 04.45; koodi ok KK 05.00)
01e3bc89f arkihahmot-218: ennakko 1,3 s reittiä pitkin, kaikki lajit, törmäys kuten ennen; QA `ui juoksupeli palvelijat kaista lahi|kauko|vuoro|pois`; lokissa "ohitettu, lähin Y m, säikähti Z m:stä|ei, aika T" ja "säikähti Z m:stä, tavara irti, aika T". Juoksu-testit 161/161.
**JU:n jonossa Pariisin jälkeen:** `palvelijat-ohitus/aja.zsh`, runko 349e8f8db (palvelijat-kuva-218), botti vuorotellen, ei saikahda-komentoa. **Kun OHITUS AJETTU:** ajasta T ruutu kamera.txt:stä; katso lähikaistan ohitus (särkyminen näkyy noin 0,5 s; säädä lukua, jos ei) ja kaukokaistan ohitus (ei säikähdystä). Polut ja lokin aika KK:lle, ei leikata vikoja. Jos särkyminen jää näkemättä heti käännöksen jälkeen, sama raportti; ei lisätyötä sitä ennen.
Skenaario 120 s; palvelijoita Palvelijatar, Lakaisija, Ruokaeunukki, Vedenkantaja. Rakeisuustyökalut olivat scratchpadissa ja katoavat: malli naapuripikselien toinen derivaatta, joka 5. ruutu, kynnys 1,8 × mediaani.

## Valmiit
- **Sirpaleet v14 HYVÄKSYTTY myös vauhdissa** (KK 04.45; ruudut, ei liikkuvaa kuvaa). Kellertävä pala: ei tutkita. Malja1:n sirpaleet eivät näkyneet pakotetussa ajossa; ratkeaa ennakolla.
- v13 hyväksytty (-0405).

## Odottaa
Mätä omena: Codex `omena-mata-v2.glb` (haara mata-omena-218; ks. -0405). Palvelijatar v2 edestä ja takaa KK:lle ennen kytkentää. Kengän yläreuna. be56: iPad-sarja PT:n luvalla (JU).

Haarat: arkihahmot-218 kärki 01e3bc89f; kuvarunko palvelijat-kuva-218 349e8f8db.

## Lisäys 05.07 (korvaa ristiriidassa olevat kohdat)
- **TF 217 oikaistu KK:lle ja PT:lle:** palikkakuvio ja tumma laikukas muuri ovat myös 217:ssä (31d8e3ea6, `esikatselu-20261101-224822/juoksu` ruudut 6959–6974; kuva `lod-korjaus/tf217-palikkakuvio-ja-tumma-6949-6964-6974.png`). LOD0:ssa on valo_rgbm, LOD1:ssä ei (kk-tausta-1-0, tausta-v115).
- **MUURI-KOE JU:n jonossa ennen OHITUSTA:** `muuri-koe/aja.zsh`, runko a368fdf29: muuri-v-01…24 elävät varjot pois, muuri-e-01…24 vertailuvalo (ei leivontaa, ei varjoja), 0,5 s välein noin z −170…−100. Kun MUURI AJETTU: etsi z −132 huom-*.txt:n paikkariveistä (pohjakoordinaatit) tai kuvista ja vertaa lod-korjaus-ruutuun 5735. Tummuus katoaa vain e-sarjassa → leivonnassa; tuo syy ja korjausehdotus KK:lle (PT tiedoksi). Leivonta on VS:n/LAV:n aluetta (`tausta-v118/leivo.zsh` malli): tilaa PT:n kautta, älä tee itse.
- **Harmaa kaista:** ei vielä tunnistettu. kk-tausta-1-0 lod0:n pitkistä tasaisista pinnoista ei löytynyt suoraa vastinetta, joten voi olla eri lohkossa. Katso paikkariveistä pohjakoordinaatti ja etsi materiaali naapurilohkoista. KK:lle yksi rivi.

## Lisäys 05.2x (nollaus, konteksti 33 %)
- **MUURI AJETTU 05.15, kuvia ei ole vielä katsottu:** `_tyo/pelikoodari/muuri-koe/ajo/` (muuri-v-01…24, muuri-e-01…24; `huom-20261104-050535.txt`). Tämä on seuraava työ, ks. lisäys 05.07: vertaa kohtaa lod-korjaus-ruutuun 5735, täysikokoisina rajauksina. Tulos, syy ja korjausehdotus KK:lle, PT tiedoksi.
- **Oikaisu luovutukseen:** LOD-mittaus iPadilla: `lod-korjaus/pk-lod-laite.zsh` (cb8b1f06c vs. suora edeltäjä 2e2dfaf36; tulokset `lokit/pk-lod-korjaus/`), JU:lla be5632bdb:n jälkeen, rivi "LOD AJETTU". Skriptiä ei ole ajettu. Kun ajettu: muistihuippu korjaus vs. edeltäjä (`muistivahti-tulos.txt`, `muisti-tarkka.log`), rivi PT:lle ja KK:lle.
- **OHITUS** on JU:lla L1:llä, rivi "OHITUS AJETTU" tulossa. Säikähdykseen ei tule erillistä iPad-skriptiä; näin JU:lle kerrottu.
