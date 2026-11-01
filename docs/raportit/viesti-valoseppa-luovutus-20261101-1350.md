# Valosepän luovutus 1.11.2026 klo 13.50

Syy: konteksti 26 % (pehmeä raja), luonteva tauko kuvaerän jälkeen. Loki: `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md`
(rivit 10.21–13.4x). Edellinen: viesti-valoseppa-luovutus-20261101-1010.md (työtavat voimassa).

## TEHTY
- Räystäskartta + b5 + täyttöpeitto p4 junassa 216 (NS d9a3a4144 + 010aba17a, testit OK); rk216-worktree poistettu.
- PT 13.3x HERÄTYS (omistaja 13.02 "kuvia valosta ensin"): v4-valon pelikuvat junan rungolla **aea684c3c** (v4: rakennukset-v91,
  c2-v31, muurikate-v37, tausta-v90; osasarja v6), paketit mediasta (ei paikallista juurta), vain `ui juoksupeli valo vertailu 0`.
  - 8 kohtaa havainnekameralla: `proto-3d/lokit/havainne-editori-20261101-133524/` (koonti.png, <kohta>/vierekkain.png) → PT → KK omistajalle.
  - Piha 06 kauko: `proto-3d/lokit/v4-kuvat-06-20261101-134327/piha06-kauko-v4.jpg` → PT. Lähikuva v4-06ob vain mittaukseen
    (PT: Meridiaaniportin keskioven puolikaari, LAV korjaa → EI portin lähikuvaa omistajalle). Räystäsprofiili = b5.
  - Värimittaus: `havainne-editori-20261101-133524/varimittaus.txt`; syyt + ehdotukset: `.../syyt-ja-ehdotukset.txt` (PT:llä).
  - Skripti `_tyo/linssiseppa2/skriptit-20261031/v4-kuvat.zsh` (REF/RUNKO yhdellä rivillä). PT 13.4x: ÄLÄ aloita ajoa alusta
    runkovaihdosten takia; kuvat heti PT:lle (polku + rivi), mittaukset sen jälkeen.
- Sivutuote (EI junaan): proto `linssiseppa2/v4-kuvat-216` 814e56e1e + `_tyo/linssiseppa2/juuri-v4` (paikallinen v4-juuri) – vain vertailuun.

## AVOIN (PT 13.5x, järjestys: varjot, kivetyksen sävy, läikät, 07)
1. **SIMUKUVA 03 NYT** (PT:n kyllä): sama kamera kuin editorissa (havainne/editori.sh: PAIKKA 03 "6.43 -190.73 -2.03", testikamera
   "3.0 6.88 10 45"), lukko `simu-lukko.sh kaari valoseppa yhteinen-iPad13 -- …` (proto-3d/tyokalut/simu-lukko.sh). Simusovellusta
   ei ole valmiina (lokit/*app* ovat iphoneos-laitekäännöksiä) → käännä `PROTO_LINJA=2 proto-3d/tyokalut/proto-kaanna.sh aea684c3c`
   (ensin ilman UDID:tä, ettei simu ole varattuna käännöksen ajan; PROTO_APP_KOPIO=<kansio>), sitten lukon sisällä asennus + QA-komennot
   (Documents/peli-komento.txt, kuten todistusajo: tyokalut/todistusajo/OHJE.md) + `simctl io screenshot`. Huom: `saannot`-kortti
   peittäisi kuvan simulla (editorin kuva3d on ilman UI:ta) → pysäytä botti muuten tai hyväksy UI.
   Kysymys, jonka kuva ratkaisee: näkyvätkö elävät varjot (rakennukset ja hahmo lattialla) laitteella. Editorikuvissa ei yhtään elävää
   varjoa, vaikka loki: "pelivalo … päivä, korkeus 30°, atsimuutti 188°, varjot 200 m, kaskadeja 2, kartta 1024²" ja vertailu 0.
2. **AURINKOVIKA** (PT:lle ilmoitettu): v4 leivottu 45°/318° (leivonta-aurinko-f4df529a6.json = koekohtaus 06:n havainneaurinko,
   KK 31.10., f4df529a6 EI junassa), junan peliaurinko/tyylikirja 30°/188° (pohja 169,97°; ValoKohteet K20, LeivontaAurinko* = K20).
   PT hyväksyi 30.10. tyylikirjan 169,97°/30°. Ehdotusvaihtoehdot PT:lle simukuvan jälkeen: (a) peliaurinko K22:een (45°/318°,
   vakiot jo rungossa: JuoksuK22AurinkoKorkeus/Atsimuutti) ilman uutta leivontaa, (b) LAV leipoo v4:n uudelleen 30°/188°.
   Lattian staattiset varjot: JuoksuLattia ei ole leivottu (vain elävä varjo) → jos laitteellakin heikot: lattialle leivottu
   maailmankoordinaattinen varjokartta auringon suunnasta (räystäskartan tekniikka, JuoksuRaystasKartta.cs).
3. Kivetys ruskea (01/02/05/06; peli 02 158/133/115 vs havainne 224/197/181 / varjo 118/114/134) → JuoksuKiviSavy ja saumat havainteen
   harmaaksi, sävykoe 02/03.
4. Vaaleat läikät (03 aukio, 04 halli) → koepari `valo heijastus 0` / tahrat (k8) pois.
5. 07 ilmakuva haalea (usva matkan mukaan) + valkoinen pystyraita oikeassa yläkulmassa (taivas-paiva-codex-v3-8192:n sauma) – viimeisenä.

## PYSYVÄ SÄÄNTÖ (Raamattu 2.177)
Ennen paria/korttia: värimittaus (_tyo/linssiseppa2/tyokalut/varimittaus.py, /opt/homebrew/bin/python3 numpyn takia) muutettujen
materiaalien väreistä havainteeseen + lähikuvat muutetuista kohdista; luvut viestiin/lokiin.

## OPIT
- zsh: `git show $R:polku` → `$R:A`-muunnin; kirjoita `"${R}:polku"` tai SHA suoraan.
- Mediaan viety paketti → ei paikallista juurta (PALATSI/palatsi mallit); juuri-k06z8 + edusta-v3 antaa kattolaikkuja (NS).
- Kuolleen pid:n esikatselulukko vapautuu itsestään (esikatselu.sh tarkistaa kill -0).
