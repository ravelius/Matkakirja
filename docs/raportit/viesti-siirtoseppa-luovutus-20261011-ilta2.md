# Siirtosepän luovutus 11.10.2026 ~19.45 (Opus 5.5, high; uudelleenkäynnistys, omistaja päivittää sovelluksen)

## ALOITUSVIESTI SEURAAJALLE

Olet Siirtoseppä (Opus, high): Olavinlinnan historiamoottori ja pelattava pala (natiivi proto). Lue tämä, CLAUDE.md ja Raamatun
Ydinajatus kohta 2. Edellinen luovutus: docs/raportit/viesti-siirtoseppa-luovutus-20261011-ilta.md.
**Omistaja 18.4x: Olavinlinna jätettiin pois junasta 182 → kaikki linnatyö junaan 183, ei kiirettä.**
Linnahaara: worktree /Users/Shared/Claude/wt/proto-siirtoseppa-kello, haara **siirtoseppa/laituri-varoitus**, kärki **7c84c88e1**.
Pakettihaarat: worktree /Users/Shared/Claude/wt/proto-siirtoseppa-v47g, uusin **siirtoseppa/v47v 39aba163b** (vahdissa).
Proto-git on paikallinen (ei pushia). Vahti kääntää jokaisen linnahaaran commitin → lokit/olavinlinna-uusin.

## JATKOKOHTA

1. **Botti 7c84c88e1:llä** käynnistyy irrallisena (setsid) vahdin käännöksen jälkeen:
   /Users/Shared/Claude/proto-3d/lokit/siirtoseppa-botti-7c84c88e1/ (odota-ja-aja.sh, yhteenveto.txt, boA.out, boB.out).
   Lue yhteenveto.txt → rivi "BOTTI x/17" PT:lle, "SIMU VAPAA ×2" Julkaisijalle. Jos yhteenvetoa ei ole eikä ajoa käynnissä, aja itse
   (komennot alla).
2. **Arvioi koe 2** (NavMesh-seinät säteellä 0,3, solu 0,05, korkeus 1,75; LR:n ehdotus kulmajumeihin 16/19/61). Vertailu: ilman seiniä
   11/17 (ec31ca56e). Jos heikompi → peruuta (`git revert 7c84c88e1`, katso 0dc210f45 mallina). Saman ajon mukana on botin katseen korjaus
   c93336fae (harjan 91/92 kuvat kulkusuuntaan) — sen vaikutus näkyy harjassa.
3. **LR:ltä odotetaan**: kävelykaistojen levennys ≥ 0,9 m (kierreporras 16, kappelin yläkäytävä 75, mahdollisesti palatsi→kierreporras
   64/65) ja keittiön piste 12 z 10,35:een. Kiinnitä uusi paketti: `zsh /Users/Shared/Claude/proto-3d/tyokalut/siirtoseppa-ajot/kiinnita-paketti.sh
   <uusi v> v47v <pala-hash> <pala-blender> <nyky-hash> <nyky-blender> "<kuvaus>"` → tarkistus puhtaalla kopiolla → commit → Julkaisijalle haara + SHA.
4. Kun botti 17/17 → PT:lle + Laitetestaajan 8. kierros (osajako edellisessä luovutuksessa). PT pyysi myös laiturin ja keittiön pelikuvat
   botin jälkeen (LR mainitsi; kulma = omistajan kuva, kysy PT:ltä).
5. Avoimet pienet: soutajan kasvot kuvakulmassa (edellinen luovutus kohta 5); Sisältökirjurin totuusraportti (docs-PR #4417): pelin tekstit
   eivät saa väittää juustoastiaa, sydänlippua, "voudin salia" tai sisäsoihtuja dokumentoiduiksi.

## BOTTI-AJOT 11.10. ILTA

| Aika | Käännös | Tulos | Huom |
|---|---|---|---|
| 16.30 | 72e8d4ccc (a8cac6c40 + v47q) | 12/17 | kappeli 42 ja sali 72 korjautuivat; uusi 75 |
| 17.31 | da51ff348 (13873f3e7 + v47t) | 12/17 | salin ja harjan aloitukset kunnossa; harja 91/92 tummat |
| 17.56 | 80cb2c855 (c6011a6cc seinät r 0,2 + v47t) | 11/17 | peruttu 0dc210f45 |
| 18.30 | 162773e30 (7176df609 + v47t) | jumiosat | NavMesh-dumppi lokit/navmesh-v47t/ |
| 18.43 | 169ee21bc (7176df609 + v47v) | 11/17 | uusi keittiö 12 musta (v47v:n sisätilalaatikko) |
| 19.20 | cdc064a66 (ec31ca56e + v47v) | 11/17 | solu 0,05 ei auttanut → kaistaleveys juurisyy |

Jäljellä (19.20): kirkkotorni 16, ampumakäytävä 75, tott-kammio 19, sali 61 + 65, keittiö 12 (musta), harja 91/92 (tummat).

## LINNAHAARAAN TÄNÄ ILTANA (kaikki tarkistettu puhtaalla `git archive` -kopiolla: tarkista.sh 0, Linssit läpi)

| Commit | Sisältö |
|---|---|
| 13873f3e7 | botin ensiaskeleen "nenä seinässä" -raja kapselin säteen alle (0,25 m) |
| c6011a6cc / 0dc210f45 | NavMesh-seinät r 0,2 koe → peruttu |
| 16e2f0f82 | merge natiivi-ui/kadet-oikealle 60265de6d (tyrmän kynttilän kantoasento; PT:n kysymys) |
| 7176df609 | jumidiagnostiikka: reitin alku/kohde/kulmat jumiriville, NavMesh OBJ temporaryCachePath (vain kehityskäännös) |
| ec31ca56e | NavMesh solu 0,05, agentHeight 1,75, minRegionArea 0,25 |
| c93336fae | botti: katse kulkusuuntaan ennen pisteen kuvaa |
| 7c84c88e1 | NavMesh-seinät koe 2: r 0,3 + solu 0,05 (arvioitava) |

Pakettihaarat: v47t 8feefe8ca, v47v 39aba163b (MarkyysTestit: vesiportti 0,35, LR:n muutos).

## TYÖKALUT JA YMPÄRISTÖ

- Botti: `APP=<lokit/olavinlinna-auto-…/Matkakirja3D.app> HAARA=<sha> SKEN=botti-osat-A perl -e 'use POSIX "setsid"; fork and exit; setsid;
  exec @ARGV' zsh /Users/Shared/Claude/proto-3d/tyokalut/siirtoseppa-ajot/ajo-botti-osat.sh > <loki> 2>&1 < /dev/null` ja sama
  `SKEN=botti-osat-B U=DBA3A288-C721-4C6E-AA4E-5C2C3F13EB90`. **Simu B on nyt oma siirtoseppa-iPad13-2 DBA3A288** (T7-sarja); A26BC7D0 on LS2:n.
  Skripti odottaa, kunnes muita simuja on ≤ 3 (MUUT, simuraja 4). Osajoukot: `jaa-botti-osat.py <nimi> osa1,osa2`.
- Yhdistetty raportti: `zsh /Users/Shared/Claude/wt/proto-siirtoseppa-kello/tyokalut/botti-osat.sh --loki <A> --loki <B>` (viimeinen rivi).
  Osaraportin "x/8 EI LÄPI" = hylättyjen määrä, ei läpäisseet.
- kiinnita-paketti.sh (uusi): kultaiset medialta, sha256-tarkistus paketin manifestiin, liekit paketin tiloista, PelattavaPala.cs-rivit.

## OPITTUA

- NavMesh rakennetaan vain kävelypinnoista (SeikkailuKavely.KavelyPinnat, kaksipuoliset). Raot syntyvät, kun kävelykaista on < ~0,9 m:
  säde 0,3 kaventaa molemmista reunoista. Mittaus: v47v-kävely-glb:t + ruudukko (scratchpad katos.py / leveys.py -menetelmä).
- Napautuskävely ei käännä katsetta → botin pistekuvat olivat osan aloitussuuntaan (korjattu c93336fae).
- Unity-taidot unity:initialize-ai-navigation ja unity:physics-3d-collision ladattu (PT:n vinkki); Unity CLI vain Natiivisepän kautta.
