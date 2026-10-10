# Siirtosepän luovutus 10.10.2026 iltapäivä (Opus 5.5, high; TILINVAIHTO siirtyi junan 177 lähdön jälkeen, konteksti 38 %)

## ALOITUSVIESTI SEURAAJALLE

Olet Siirtoseppä (Opus, high): johdat Olavinlinnan historiamoottoria (pelattava pala, esittely ja sen vaiheet, historia, linnan äänet ja vesi,
LR:n pakettien kytkentä). Lue tämä, CLAUDE.md ja Raamatun Ydinajatus kohta 2. Testaus vain automaattisin; simuajot vain kuva-arkkeihin ja PT:n
pyytämiin kaappauksiin Julkaisijan KÄÄNNÖS NYT / SIMULAATTORI NYT -vuorolla. Oma simu 8362879F-30B9-4625-9F42-57326EBC3439 (T7-sarja:
`source /Users/Shared/Claude/proto-3d/tyokalut/simusarja.sh`). Ilmoita Julkaisijalle "lukko vapaa" / "simu vapaa".
Proto-worktree /Users/Shared/Claude/wt/proto-siirtoseppa-kello (nyt haara siirtoseppa/historia-kamera 04915cace, puhdas). Varmuuskopio natiivi-backup
peili/proto/siirtoseppa-<haara> (push -f estetty → uusi nimi). Skenaariot /Users/Shared/Claude/proto-3d/tyokalut/siirtoseppa-ajot/skenaariot/.
Unity 6.7 on päälinja. Ei uusia GetInstanceID-kutsuja (CS0619).

**Taustalla ei ole käynnissä olevia ajoja** (ei käännöstä, ei todistusajoa; simu 8362879F sammutettu 12.29).

**TAUKO (omistaja 10.10. 12.5x, PT):** vain bugikorjaukset (myös Natiivisepän junan 177 korjauspyynnöt), kunnes bugikorjausjulkaisu (build 177)
ja tilinvaihto on tehty. Erä 2 aloitetaan vasta tauon jälkeen PT:n luvalla. LR:n palatsi 1499 on VALMIS: PALA cf16ad94ef3c76bc.

**Ensimmäinen tehtävä tauon jälkeen (erä 2, PT hyväksynyt):** LR:n palatsirajan korjaus (PALA cf16ad94ef3c76bc):
kytke uusi paketti (PelattavaPala.Hash/Versio + kultaiset osat/merkit/rakennus/liekit ämpäristä
`https://media.matkakirja.app/dioraama/olavinlinna/<hash>/rakennus.json` ja `blender/kavely/{osat,merkit}.json`; liekit eivät ole paketissa,
kopioi edellinen kultainen nimellä), poista `Linssit-testit/Testit/OsaviipaleetTestit.cs`:n `OdottaaKorjausta`-rivit (testi kaatuu, kun viipale
katoaa) ja tarkista, tarvitaanko `ThiefAjuri.cs`:n `RauhallinenYlitys { 69 }` vielä (kokeile ilman: OlavinlinnaMOsaTestit.KiinniTarkistuspisteeseenJaLoppuun
ja PiiloonMenoTekeeTarkistuspisteen; PT: rajaa EI löysätä). Linssit + unity-tarkistus → SHA PT:lle. Uusi haara junan 177 rungon (tai 04915cace:n) päälle.

## ILTA 10.10. — JUNAT 178 JA 179 (kaikki kuitattu, Natiiviseppä kokoaa)

Proto-haarat (peilit peili/proto/siirtoseppa-<haara>), ketju 99b9fead3 → a98b7e1a6 → 73bc9b9bd → 8775705c9 → eecbb6474 → 674f3d589 → 187359ae0:
- juna 178: 99b9fead3 (v47a palatsiraja), 73bc9b9bd (KiinniJokaPisteessa M-osa, vain OLAVINLINNA_LAAJA=1), 8775705c9 (ThiefAjuri: osarajaa
  ei ylitetä epäilyn aikana, RauhallinenYlitys tyhjä; piste 69 reilu ajoituskohta, peliin ei muutosta, ei Pulun vihjettä).
- juna 179: 5f4b1f616 (ReittiKulku Ytimeen, haara hahmot-reittipaikka 8775705c9:n päällä), eecbb6474 (huoneet 2–4 laajaan testiin),
  674f3d589 (lokivaroitus puuttuvasta pintanimestä), 187359ae0 (tarkistuspiste tikkaiden yläpäähän; harja 89–91 → 88).
- Web PR ravelius/Matkakirja#4351 (pintapankkiin rantakivi + rantakivi(-puoli).jpg = kallio × 0,66): Julkaisija mergeää; ilmoita LR:lle mainissa → LR vie.
- Laaja testi: `OLAVINLINNA_LAAJA=1 ./kaanna.sh KiinniJokaPisteessa` aina kun Olavinlinnan paketti, reitti tai vartijat muuttuvat (~170 s).
- OPITTUA: natiivissa pinnan pohjakuva korvaa värin (tila B), COLOR_0 = AO/lämpö/satunnainen; kävelyosan valo atlaksesta, historiassa tasainen 0,42.

## ERÄ 2 — KUITATTU JUNAAN 178 (Natiiviseppä kokoaa)

`siirtoseppa/palatsiraja` **99b9fead3** (BUILD 177 -master 3d0c8c4a7 päällä; peili peili/proto/siirtoseppa-palatsiraja): pala cf16ad94ef3c76bc v47a,
esittely bccf694794d5f5f6 v47a-nyky (vain palatsin rajat.min z −10,95 → −10,6). OsaviipaleetTestit.OdottaaKorjausta tyhjä. ThiefAjuri
RauhallinenYlitys { 69 } tarvitaan yhä (ilman: kiinni 70 tarkistuspiste 5,0 m komerosta). Linssit 1307/1307, unity-tarkistus 0. Proto-worktree on tällä haaralla.

## JUNA 176 (build 177) — KUITATTU

Kärki **siirtoseppa/historia-suoja 1210b674e** (PT kuittasi ehdolla Linssit läpi: 1300/1300). Natiiviseppä: junan 176 runko 9bf070143 (K454, P453, L1307, tarkista ok). Ketju a4c6539e5 → 479702aac (esittely-vaiheet) →
f0f3b7fe6 → 85cb145f6 → b49804af5 → 4ced0237b → 023c37675 (haara siirtoseppa/esittely-vaiheet-v46z) → 1210b674e. SHA:t on lähetetty Natiivisepälle.

- f0f3b7fe6: v46z (LR) — pala 4e464f44e51710f8 v46z (kappeli-kavely rajat.min y 9,2 → 9,6), esittely b4cd41abc499dbde v46z-nyky,
  LeikkauksiaMax 48. Thief-ajuri (PT vaihtoehto B): pisteestä 69 pisteeseen 70 lähdetään vasta, kun kukaan ei epäile (Huonesimulaatio.Vaara julkinen),
  koska portaat-vartija tulee v46z:ssa pelaajan osaan jo y 8,5:ssä → kiinni 70 tarkistuspiste 1,4 m komerosta.
- 85cb145f6: järven mitattu väri — Kyrönsalmen kesä (Karttaseppä vesivari-kaudet-olavinlinna.json, Sentinel-2) DioraamaYmparisto.AsetaVedenVari,
  lineaarinen SetGlobalVector; "poikki vesi vari 0|1 [kerroin]". PT: kerroin 1.
- b49804af5: kultaiset v46z-nyky + EsittelyVuosileikkauksetTestit (n1790-kartiot piilossa ennen 1790, kasvu 68 s / 90 s).
- 4ced0237b: OsaviipaleetTestit (ei alle 0,5 m:n osaviipaleita reitillä); palatsi-viipale 0,42 m odottaa LR:ää sidottuna.
- 023c37675: esittelyn vaiheet vain kerran (vaiheT-tarkistus).
- 1210b674e: DioraamaSovitin.Historia yksi kerrallaan (historiaAlkaa + SeikkailuHistoria.Kaynnissa → pyyntö ohitetaan, valmis heti).

Vaihearkki (PT hyväksyi): /Users/Shared/Claude/proto-3d/lokit/todistus-vaiheet-v46z-176-b-20261010-1224/kuva-arkki.png (käännös 648e2395f).
Skenaario skenaariot/vaiheet-v46z-176.txt (odottaa automaattista käynnistystä; ÄLÄ käytä "poikki vaiheet nyt" saapumiskaaren aikana).

## JUNA 177 — KORJAUS (Natiivisepän iPad-muistiajo c830407bf)

`siirtoseppa/historia-kamera` 04915cace (rungon 2900f8e39 päällä; 596f74c82 + 04915cace): linnan sulkeminen kesken esittelyhistorian
→ tuhottu kamera päättää SeikkailuHistoria.Aja-silmukan, siivous finallyssä (Siivoa) myös poikkeuksessa (ajossa = null, KameraVapaa,
VainVuosileikkaukset, MustaKorvaus). Ennen: NullReferenceException → Kaynnissa jäi true → 1210b674e:n suoja ohitti kaikki myöhemmät historiat.
unity-tarkistus 0, Linssit 1307/1307. Natiiviseppä: rungossa 3bb291169 (K454, P456, L1307, tarkista ok); todennus Natiivisepän muistiajossa (linna kiinni t≈60 s → seuraava historia alkaa).

## AUKI / MUILLE

- LR:n jonossa: palatsirajan korjaus (x −19,4, y 8,4–8,6, z −11,25…−10,95), rannan vaaleat kivet (1499), ponttonisillan kelluvat palaset ennen 1975.
- LS2:lle myöhemmin (PT): 1475- ja 1499-kuvissa saaren alla tumma heijastus ilman rannan vihreää reunaa.

## OPITTUA

- Juurisyy ennen kuin LR:ää pyydetään: v46y:n kiinni 70 -vika ei ollut komeron osa vaan vartijan Etsintä osarajan ylityksessä (Vaara → ei tarkistuspistettä).
  Diagnoosi: väliaikainen DIAG-tulostus Huonesimulaatioon ja vertailu kultaisilla v46w vs. v46z (palauta tiedostot lopuksi).
- Askelaani.Osa valitsee pienimmän tilavuuden laatikon (vaakavara 0,3 m, pystyvara 1 m) → ohuita viipaleita rajojen kulmiin.
- Kaksi rinnakkaista historiaa: jälkimmäinen Aloita lopettaa edellisen, jonka valmis sammuttaa kävelyleikkaukset → kartiot näkyvät. Lokissa "historia alkaa" kahdesti.
- proto-worktreet poistetaan proto-reposta (`git -C /Users/Shared/Claude/proto-3d/Matkakirja-proto worktree remove`); tools/uusi-worktree.sh --poista osoittaa web-repoon.
- Käännöspalvelun .app kopioidaan heti omaan kansioon (proto-3d/lokit/siirtoseppa-app-<sha>/), seuraava käännös kirjoittaa Build-kansion yli.
