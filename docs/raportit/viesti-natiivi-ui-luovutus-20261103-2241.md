# Natiivi-UI: luovutus 3.11.2026 klo 22.41 (konteksti 25 %, pehmeä raja)

Edellinen: viesti-natiivi-ui-luovutus-20261103-2130.md (sen jono käsitelty tähän). Proto-repo: /Users/Shared/Claude/proto-3d/Matkakirja-proto, peili natiivi-backup peili/proto/<haara>.

## Tehty
- **PR 6216 mergetty** (a3b49c943): tyylikirjan SAAPUMISEN ODOTUS; lähde 6bd3f9693704 täsmää (tarkista.sh ok).
- **Soikiopari** valmis JU:lla, lähetetty PT:lle: lokit/todistus-soikio-ennen-4397cf20d-20261103-2147 ja -jalkeen-7f0ccc451-20261103-2219.
  Arkin mukaan otsikko näkyy Notre-Damen päällä; soikion ero ei näy selvästi arkin koossa (täysikokoisia en vertaillut). Hyväksyntä PT/KK.
- **Pariisin sauma lon 2,351:** haara natiivi-ui/sauma-218 **3176be95f** (7f0ccc451 + kehittäjäkomento `elavakartta pohja sse <arvo>`, oletus ennallaan, tarkista.sh ok, peilissä).
  Kaikki tiedot: proto-3d/_tyo/natiivi-ui/sauma-pariisi/SUUNNITELMA.md, kuva pari/a-b-c-sauma.png, ajo lokit/esikatselu-20261103-223329.
  - Toimintamalli (koodista ja lokista päätelty, Cesiumin natiivikoodia ei ole levyllä): rasterin taso seuraa geometrialaattaa, joten eritasoisten maastolaattojen rajalle jää yhden tason porras.
  - A/B esikatselussa: a nykyinen = sumea, sauma; b pohjan SSE 1 = terävä, ei saumaa rajatulla alueella, mutta valkoisia aukkoja vielä 45 s:n jälkeen (syy selvittämättä); c `maasto siirtyma 10 8.5 18` (geometria ×2) = terävä, ei saumaa, ei aukkoja. c ajettiin b:n jälkeen: ei kylmä ajo.
  - **TÄRKEIN: batch-esikatselussa pelin ruutu on 640×480 (skaala 4,30), ja Cesium valitsee laatat sen mukaan.** VS k4–k8 ja oma A/B ovat tästä tilasta, joten sauma voi olla esikatselun harha. Laitteella valinta on arviolta 2 tasoa tarkempi. Ei korjausta ennen laitemittausta. Vaikuttaa myös muihin esikatselun karttakuviin (VS:n koealue): kerrottu PT:lle saumasta, ei erikseen VS:lle.
  - NS: pohjan SSE:tä ei ole kokeiltu; pienempi geometrian SSE on GPU:lle kallis (S10: 16→32 säästi 8,8 ms); KS:n siirtymä-SSE odottaa pienen iPadin mittausta (omistaja 29.10.).

## SEURAAJAN JONO
1. **Sauman iPad-tulos:** pyysin JU:lta (viesti jonossa 22.4x, ei vielä kuitattu; tarkista list_events) kehityskäännöksen 3176be95f ja ajon `zsh proto-3d/_tyo/natiivi-ui/sauma-pariisi/mittaa-sauma.zsh iso <tunniste>`. Skriptiä ei ole vielä ajettu. Se ohjaa myös kaatumisen vaiheet.txt:hen. Tulos: lokit/nui-sauma-laite-20261103/.
   - Ei saumaa a:ssa → esikatselun harha: rivi PT:lle + VS:lle; korjataan esikatselun laattavalinta, ei pelin asetusta.
   - Sauma a:ssa → c rajattuna lähitasoille (LiikeLaatatPaatos), jos gpuMs (kehysajat.jsonl) ja muisti kestävät; sitten kylmä ajo ja pieni iPad. Tulos PT:lle.
2. **4397cf20d-tulos** (JU): savu + muistivahti OK, salihyppy ys perillä (kuvat 40/60 s). VIKA → selvitä. Ei vielä tullut.
3. **Soikiopari:** jos KK hylkää, palauta VarjoKuva/0,5 (7f0ccc451:n TraileriLiike) ja kysy PT:ltä.
4. Elävä kartta vaihe 2 vasta KK:n/PT:n suunnitelman jälkeen.
5. Avoin (pohjat-tarkistus D6): TraileriLiike lisää yhä luokan mk-traileri__varjo ilman USS-sääntöä; siivous kun koskee tiedostoon.
6. Vanhat avoimet luovutus-PR:t 6189, 6194, 6200 (myöhemmät korvanneet): sulje tai merge kaavan mukaan; tämä PR samoin, kun vihreä.

## Esikatselun sudenkuopat (sauma-ajoista)
Kamera-ajo ennen maan saapumista kumoutuu: FRA-saapuminen laukeaa hiljaisuuden jälkeen ja vie kameran maanäkymään. Skenaarioon `ui sulje` + `odota 50` ennen `aja` (sk-sauma.txt).
