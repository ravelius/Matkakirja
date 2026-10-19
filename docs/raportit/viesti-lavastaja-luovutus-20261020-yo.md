# Lavastajan luovutus 20.10.2026 klo 00.4x (Opus, medium) – Postivahti: kova raja

Edellinen: `viesti-lavastaja-luovutus-20261019-iltapaiva.md` (e56e0a3e5). Viestit send_messagella session id:llä (`/Users/Shared/Claude/osoitekirja.md`).
**JU = Julkaisija (local_24e63224…), EI Natiivi-UI.** Kuvaparit: päivällä ja junassa 206 vain PT:lle; YÖLLÄ junan 207 kuvat KK:lle (local_8e4fcfed…), kopio PT:lle (PT 00.3x).
**Vientipakettia ei muuteta sen jälkeen, kun sen polku on lähetetty** (vie-paketti ei ylikirjoita ämpäriä) → korjaus aina uudella tiedostonimellä.
Paketissa vain glb + SHA256SUMS + LAHTEET.md (esikatselukuvat _tyo-kansioon, JU hylkää muuten).
Oma simu: iPhone 484B130B-0652-4EAD-B26A-509A9DD79C66 + iPad 18932B67-771C-4D78-9CA2-060B3060AA1D; vuoro aina JU:lta (SIMU NYT), lopuksi SIMU VAPAA.

## ENSIN (uusi Lavastaja)
1. **Simu odottaa JU:ta:** juna 206:n lukitusehdokas = JU:n `sokkelo-yhteinen10-207-app` (208fd103e = PK 82bd1932f neliösokkelo + rengas-v6).
   PK ajaa sen ensin, sitten JU antaa SIMU NYT → aja
   `zsh /Users/Shared/Claude/proto-3d/tyokalut/linnanrakentaja-ajot/ajo-juoksu-rengas.zsh /Users/Shared/Claude/proto-3d/_tyo/julkaisija/sokkelo-yhteinen10-207-app/Matkakirja3D.app`
   (taustalle; skenaario sk-juoksu-rengas.txt: oleta "kaukomaisema-rengas paikalleen", kuvat R1, R1b–d = valo katse 90/180/270, R2–R4) →
   lokit `/Users/Shared/Claude/proto-3d/lokit/todistus-juoksu-rengas-<laite>-<pvm>/kuva-arkki.png` → 3 riviä PT:lle → SIMU VAPAA JU:lle.
   Jos PT on jo lukinnut 206:n ilman tätä, kysy PT:ltä ennen ajoa.
2. **Juna 207:** rengas-v8c **dab3635e3** (haara `linnanrakentaja/juoksu-kaukomaisema-rengas`, worktree `/Users/Shared/Claude/wt/proto-linnanrakentaja-kaukomaisema`)
   – KK OK 01.0x; vienti `_valmiit/juoksupeli-kaukomaisema-rengas-v8c-vienti-20261020` lähetetty JU:lle (kuittausta ei vielä tullut). Kun 207:n yhteinen
   simu tulee: arvioi rengas pelin usvassa (KK: vinot puolikkaat seinäkolmiot 2. suunnassa ja irtokattosiru jäivät – v8d-kokeilu vei tornien
   katot, ei käytetä) → kuvat KK:lle (kopio PT).
3. **Seuraava erä (PT 00.2x, omistaja 00.22):** Codexilta tilattu läpijuostavat rakennukset + portaat → kun tulevat: `node tools/codex-3d-tarkistus.mjs`
   (scratchpad-kopio main tools/), kokoa huoneet (sisäkäytävät, katto erillisenä solmuna) PK:lle junaan 207. Ei vielä toimitettu.

## Tehty 19.10. 22.55 – 20.10. 00.4x: juoksupelin kaukomaisema
Työkansio `/Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/juoksu-kaukomaisema/` (lahde/: kaukomaisema.py v1, kaukomaisema_rengas.py,
korjaa_v2.py, savy_v8.py, sirut_v8.py, v8c.py, v8d.py; esikatselu/: arkki*, rengas-v*-ylakuva.png, v*-suunnat.png, vertailut v7-v8b, v8b-v8c, v8c-v8d).
| versio | glb (ämpäri avoimet-v2/) | proto-sha | mitä |
|---|---|---|---|
| v2 | kaukomaisema-v2 | 5b8e6cc13 | leijuvat laatat, ohuet seinälevyt, alalaidat pois (rata v4) – ohitettu |
| v3 | kaukomaisema-v3 | f190d65ef | + PK:n leveän pihan alue tyhjä – ohitettu (omistaja 23.11 sokkelo) |
| rengas v1–v3 | kaukomaisema-rengas(-v2/-v3) | 61c2e8ba5 / b5ff3e3b8 / d36e8170e | rengas seuraa Puyin XZ:aa; v2 ilmansuunnat VS:n taivaan mukaan (pohjoinen −z, itä +x), länsi täydennetty |
| rengas v4/v4b | -v4 / -v4b | a73e1f495 / 771fb4ba1 | Jingshan pois (nauha hoitaa); v4b kaukaiset korotettu (v4 ylikirjoitettu viennin jälkeen → v4b) |
| rengas v5 | -v5 | 628060ab7 | PK 56bdb2c78 kapeat kujat + neliöaukko ±106 m |
| rengas v6 | -v6 | **208fd103e** | PK 82bd1932f neliösokkelo (±88 m, keskipiste −cx·16−4) + rengas keskipiste Puyi−(4,4), aukko ±97 m → 206-ehdokas |
| rengas v7 | -v7 | 8b701b5f3 | toinen siivous (tiukka) – PT: 207 |
| rengas v8/v8c | -v8 / -v8c | c596ce754 / **dab3635e3** | maalauksen kulta/punainen, jalustat, sirut, leijuvat seinäpalkit, caihua pois – KK OK 207 |
Simu 34ca156dc (rengas v3): `/Users/Shared/Claude/proto-3d/lokit/todistus-juoksu-rengas-iphone-20261020-0008/` + ipad-…-0010 (OK, Jingshan tuplana, vaalea vyö → korjattu v4b:ssä).
Korjaa_v2.py:n argumentit (Blender `-b <blend> -P korjaa_v2.py -- <ulos> 1 [piha | rengas RIN TAYTE] [ilman-jingshan] [korotus] [nelio] [tiukka]`).
v8c-ketju: `kaukomaisema_rengas.py -- <W> -170 260 25 715 0.06 1 180 150 0.42 95 kaukomaisema-r3` → korjaa_v2 `rengas 97 100 ilman-jingshan korotus nelio`
→ korjaa_v2 `tiukka` (v7) → savy_v8.py → sirut_v8.py (25) → v8c.py.

## Opit
- glTF-kehys: Unity = (x, y, −z); taivaan pohjoinen = Unity −z = glTF +z; v1-kaukomaisema oli itä–länsi-peilattu (x = 8 − itä).
- Pekingin LOD2:n tahkot eivät jaa kärkiä → "saaret" ovat yksittäisiä tahkoja; ryppäät 5 cm:n ruudukolla. Korotus vasta siivouksen jälkeen (muuten katot "leijuvat").
- Yhdistä PK:n uusin haara itse (merge omaan haaraan, unity-tarkistus) ja anna JU:lle YKSI sha – muuten JU törmää ristiriitaan.

## Avoimet (ennallaan edellisestä)
Olavinlinna tauolla (omistaja 19.10. 17.05). Siivous: `wt/proto-linnanrakentaja-kehykset` pois kun 204 julki; _tyo/linnanrakentaja/kaukomaisema-207-app ja kaukomaisema-rengas-app
eivät enää tarpeen (JU käänsi yhteisiin appeihin) – tarkista ja poista omat appit (≤ 2 sääntö).
