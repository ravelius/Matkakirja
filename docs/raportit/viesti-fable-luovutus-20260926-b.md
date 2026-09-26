# Fablen luovutus 26.9.2026 klo 05.2x (tili B, sessio local_593b89a1, klo 04.08 → 05.2x)

Edellinen: viesti-fable-luovutus-20260926.md (sis. päivitys klo 04.0x). Kaikki päätökset lokissa docs/raamattu-loki/paatokset-2026-09.md klo 04.12 → 05.2x.
Omistaja vastasi aamukorttiin klo 05.0x (hereillä ainakin silloin). Viikko 90 % klo 05.21 (~5 %/h → 97 % ~06.30–07), 5 h nollautuu 05.30; tilinvaihto kun omistaja vaihtaa.

## Sessiot (id:t ennallaan, ks. edellinen luovutus)
Fable local_593b89a1-2514-4d74-b956-2a73db862382 (clear_session säilyttää id:n). Postivahti local_e6d70b5a-fc8a-430c-a2a2-8c8da7f3fcc7.
Luovutuspyyntö kaikille 9 roolille lähti 05.21 (Postivahti). Tilinvaihdossa sessiot luodaan uudelleen Raamatun kaavalla aloitusviesteistä.

## Tuotannossa
- Build 17 = 1.0.17 TF 04.12 (proto d04841a0 = master 6a65ead1): kehyksen hinta 50 → 13 ms, 121–128 + 113, 130–143 (146 v2), 147–148, lento v2. Poikkeamat S1/S2 korjattu build 18:ssa.
- Build 18 = 1.0.18 TF 05.00 (proto 43a6347c = juna 541092d9 = käännös e85255cd, puu d3206794): S1 lepopiirto (SykeJaatyy = true, 2–3/150 levossa), 143b, 132/150 kokoruutu + sumea tausta, 144 liput, II 148/151/152 + pariteettiäänet, Linssisepän esilataus, elävän kartan pelilogiikka (3ef13a97), 137/149/122.
- Löydös 149: 288 nostokuvaa ämpärissä (ajot 36207661384 kuiva, 36207702414 oikea), vartija #3283 mainissa 0 puuttuvaa.
- Mainissa myös #3267 v2251 (paketti 1.45), #3288/#3290/#3291 (Codex-erät 8–10 + KOR), #3250 (kehyksen hinta CPU-osio, docs).

## Omistajan päätökset 05.0x (kortti, sitova; Raamattu-PR #3294 Julkaisijan junaan)
1. Elävän kartan videon suunta HYVÄKSYTTY → pelattava versio build 19: Linssiseppä aloitti kohdasta 1 (saapuminen ≤ 5 s), rajapintaehdotus Natiivisepällä, Natiivi-UI kartussin herääminen (Ohjaus-rajapinnan ja S3:n jälkeen), Karttaseppä joet + maakuntarajat datana.
2. 127 maarajan paino KEVYT — ei muutosta.
3. 128 kermahuntu p060 → Karttaseppä polttaa 26-pohjasta p060:lla, Natiiviseppä vaihtaa Kermasarja.Oletus kun sarja ämpärissä.
4. Musiikki- ja äänisuunnitelman (#3272) kaikki 8 suositusta hyväksytty → Pelikoodari generoi ERISSÄ, vaihe 1 ensin, jokainen erä omistajalle kuunneltavaksi (mp3-linkit + rivi/raita). #3272 mergetään dokumenttina kun vihreä (päivitetty mainiin 05.0x; jos vielä auki, mergeä).

## Build 19 -juna (Natiiviseppä bbb8583b, kääntynyt 5927d5bc 05.18)
Mukana: Pelikoodarin verkko-raja (vartija "saapuminen 0 ms" + kehittäjärivi), humina-muunnelmat, osoitin-taustalle; im2-ohjaus (148 napit); Linssisepän tehoste-rekisteri; Natiivi-UI:n S3 (linssin avaus sulkee nostokortin, 198ecc30). Odottaa: 128 p060, elävän kartan kohta 1, kohta 1 -paketointi (Pelikoodarin lista proto-3d/lokit/kohta1-kaynnistys-20260926.md: nostotyyppien kuvakkeet 8, pulun kuva, aloitusdata ~3 Mt, satelliitti Z5), versiotarkistus taustalle (uusin.json 1 259 ms kylmänä rikkoo esilatauspolitiikan kohtaa 2 — yhteen Siirtosepän 99f049ec:n kanssa), kaupunkilehdet.json 16 Mt ja linssidata pois käynnistyksestä. BUILD 19 kun juna on koossa: Laitetestaajan kierros → BUILD Julkaisijalle → push omistajalle.
Pelikoodarin oppi: yhteinen haku hidasti kylmää käynnistystä (1 159/915 → 1 438/1 496 ms) → ei lähetetty; kokeilee jakoa vain Sisalto-reitin sisällä.

## Muut avoimet
- Löydös S4: 144 lipun aaltoilu todennettu videosta (Fable hyväksyi), ei toimenpiteitä. Löydösraportti: omistajan-loydokset-b13-20260925.md (S1–S4 lisätty).
- Linssisepän effort MAX → HIGH ei onnistunut (luokitin esti sekä hänen että Fablen sessiossa) → omistaja vaihtaa appista; pyydetty rivillä.
- Codex 504/503 -värikorjauserät menevät suoraan Sisältökirjurille (Postivahti ilmoittaa), rivi Fablelle per PR; erät 8–12 PR:issä/mainissa (#3288, #3291, #3292, #3293), erä 13 (36 kuvaa) tulossa.
- Julkaisijan luovutus fba5ca649 (julkaisija-luovutus-20260926), Natiivisepän g (selvittaja-3d-luovutus), Linssisepän e (linssiseppa-tyo-20260923).
- Natiivi-UI seuraavaksi: Ohjaus-rajapinta → S3 → elävän kartan kartussi; 115 odottaa dataa.
- Karttaseppä: 26-pallon vienti, delta-poltto #3280, salmikorjaus #3278, joet muille maille.

## Opit tästä sessiosta
- Kortti kannattaa avata heti kun kaikki aineisto on koossa ja pushin perään — omistaja vastasi heti 05.0x, vaikka oletin nukkuvaksi.
- "Halpa kehys ei ole nolla kehystä": lämpökorjaus ei saa palauttaa jatkuvaa piirtoa levossa; Natiivi-UI:n kerroslaskurit (ui rauha) löytävät likaisen kerroksen nopeasti.
- pull_request-ajon rerun ei ota uutta mainia — `gh pr update-branch` ennen uusintaa.
- Raamattu on js-tiedosto → muutokset Julkaisijan junaan PR:nä, ei itse.

## Jono uudelle Fablelle
1. #3272 merge (docs) jos auki; #3294 junassa.
2. Build 19: seuraa junan kokoamista (128 p060, elävän kartan kohta 1, kohta 1 -paketointi), kierros, BUILD, push.
3. Musiikin vaihe 1 -erä omistajalle kuunneltavaksi, kun Pelikoodari toimittaa.
4. Elävän kartan kohta 1 kuvapari omistajalle; sitten kohdat 2–3.
5. Löydökset 153 → raporttiin ja rooleille.

## Päivitys klo 08.3x (omistaja: "jatka 98 asti"; viikko ~96 %, lepokäsky 98 %:ssa)
- Omistajan kortit: musiikin vaihe 1 kaikki 4 raitaa HYVÄKSYTTY (06.0x; leikattu, −11 LUFS = nykyisten taso, kytkentä build 20 + web); pohja 26 HYVÄKSYTTY natiiviin ja webiin (08.1x) → natiiviseppa/pohja-26 build 20, Julkaisija vaihtaa webin osoittimen (2026-09-26-pohja + PALLO_LAATTAVERSIO).
- BUILD 19 = proto fdc47632 / käännös 343ca803, kierros PASS (b117edc23) → BUILD 1.0.19 Julkaisijalle 08.3x (korvaa viallisen 1.0.18:n: taustapäivityksen siivous poisti ladatun paketin). TARKISTA gh run list → push omistajalle "Build 19 TestFlightissa: 1.0.19 — sisältöpäivityksen korjaus, elävän kartan saapuminen ja maakunnan herääminen, käynnistys 4–5 s, 23 ääntä ja kuvakkeet buildissa".
- Build 20 -jono: S6 verhon laitemittaus, S7 heränneen maakunnan pysyvä väri, S8 lepopiirto testitilassa, S9 salaisuuskortin laukaisija, pohja-26, musiikin kytkentä, elävän kartan kohta 2 (muste-jaljet + nosto-muste merge-pyynnössä) ja kohta 4 (Pelikoodari reittihistoria, Linssiseppä kynäviiva; sopivat suoraan), kohta 5 viimeisenä.
- Webin meren harso: kohdemaan laatikossa meri 88 % harson alla (13.9. päätös 4) → resepti 26 ei näy siellä; Karttaseppä tekee GRC-kokeen (meri alfa 0) + kuvaparin → OMISTAJAN KORTTI ennen muiden maiden polttoa.
- Maakuntanimet suomeksi tuotannossa v148 (#3297); 1.47 (#3285) ja 1.48 lehdet kaupungeittain (#3298) Julkaisijalla; Codex 503 valmis (#3296 viimeinen).
- Oppi: omistajan kortti sitoi Fablen 06.0x–08.0x ja roolit odottivat → ennen korttia jaa roolien jonot; Postivahti pushaa jos roolit odottavat päätöstä > 30 min.
