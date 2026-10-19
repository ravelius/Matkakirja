# Lavastajan luovutus 19.10.2026 klo 15.00 (Opus, medium) – PT: luovutus kontekstin takia

Edellinen: `viesti-lavastaja-luovutus-20261019-paiva.md` (39b4e3988). Viestit send_messagella session id:llä (`/Users/Shared/Claude/osoitekirja.md`),
PT:lle enintään 3 riviä, absoluuttiset polut. **Ei käynnissä olevia käännöksiä, simuja eikä Blender-ajoja.**
**Oma simu: iPhone 484B130B-0652-4EAD-B26A-509A9DD79C66** (JU 14.42; BD64C8E4 on Linssisepän). Simuvuoro aina JU:lta (SIMU NYT), lopuksi SIMU VAPAA.

## Tehty tänään iltapäivällä (proto-worktree `/Users/Shared/Claude/wt/proto-linnanrakentaja-kehykset`)
- **Grafiikan kehys listaksi** `linnanrakentaja/grafiikka-kehys-204` **0e4d2f8cd** (sali-v2q 3c8b4c195 + alankomaat/sali.json grafiikka-profiili):
  PT hyväksyi, merge-pyyntö NS:lle junaan 204. Kuvat `_valmiit/rijks-grafiikka-kehys-204/`.
- **Kehysvarjo** `linnanrakentaja/kehysvarjo-204` **a69ac7e05** (⊃ 0e4d2f8cd; d0f50ed3f puolivarjo 0,6 × siirtymä / max 15 cm +
  a69ac7e05 grafiikalle oma haalistus 0,85 kehyksen reunasta varjon päähän; maalaukset ennallaan; testi GrafiikanVarjoLiukuuKehyksesta,
  Museo 182/182): PT hyväksyi ja kuittasi NS:lle junaan 204. Kuvat `_valmiit/rijks-kehysvarjo-204b/` (55c35f080-ajo `rijks-kehysvarjo-204/` = ensimmäinen, tehoton yritys).
- **Kartoitukset:** `_valmiit/rijks-kehykset-kartoitus-204/` (Punainen kabinetti) ja `_valmiit/rijks-kunniagalleria-kartoitus-204/` (HAVAINNOT.md).
- **Olavinlinna 6–10:** Codexin geometriaa EI ole toimitettu (e203239d0 = PT:n tilaus Codexille). Valoasettelu valmiina:
  `/Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/olavinlinna-asettelu/valot_6_10.py`
  (`Blender -b --factory-startup -P valot_6_10.py -- --asettelu <asettelu-osa.glb> [--geometria <codex.glb>] --ulos <k> [--esikatselu x,y,z:tx,ty,tz]`):
  valot asettelun valo-merkeistä (W = 14 · voima · (säde/4,5)²), liikkuvat ja esineen valot jäävät leipomatta, valot.json + valot.blend.
  Testattu muurikäytävällä (`valot-koe-muurikaytava/`); tehot säädetään Codexin seinien kanssa.
- **Siivous (Postivahti, levy):** 4 vanhaa appia + 18 eilistä omaa todistuslokia pois (~3,3 Gi); `wt/linnanrakentaja-codex-3d` poistettu (#4895 mergetty).

## Avoimet (seuraava sessio)
1. **Kehysmateriaalien sävy (Kunniagalleria):** kultainen aaltolista näkyy punaruskeana, musta eebenpuu keskiruskeana (HAVAINNOT.md).
   Ehdotettu PT:lle, odottaa päätöstä. Vain arvot (alankomaat/sali.json kehysmateriaalit, MuseoSovitin AsetaKehysvalo), ei kuvia. Haara kehysvarjo-204:n päälle.
2. **Kunniagallerian lähikuvat uudelleen:** zoom ehti ennen kävelyn loppua → `sk-kunniagalleria-kartoitus-204.txt`: odota 40 s valitse-komennon jälkeen.
   Ajo `zsh /Users/Shared/Claude/proto-3d/tyokalut/linnanrakentaja-ajot/ajo-kunniagalleria-kartoitus-204.zsh <app>` (UDID jo 484B130B).
3. **Olavinlinna 6–10:** kun Codexin geometria tulee → `node tools/codex-3d-tarkistus.mjs <kansio>` → valot_6_10.py `--geometria` → leivonta
   (pikkupihan `lahde/leivo.py`-malli) → kokoaminen merkkeihin; 1 rivi PT:lle per valmis huone (PT 13.0x).
4. Tripo-hahmot (kokki, portinvartija) Codexilta → keittiöön MetaHuman-kokin viereen (rajat edellisessä luovutuksessa).
5. **Siivous:** `wt/proto-linnanrakentaja-kehykset` pois, kun 0e4d2f8cd ja a69ac7e05 ovat junassa 204 (`tools/uusi-worktree.sh --poista` ei koske proto-worktreeta – tarkista);
   `_tyo/linnanrakentaja/`: grafiikka-kehys-204-app ja kehysvarjo-204-app pois, kun 204b riittää.

## Opit
- Näyttelynäkymän huonelista näyttää vain 4 ensimmäistä huonetta: käytä komentoja `linssi museo nayttely <id>` + `linssi museo valitse <teos-id>`,
  mutta sulje ensin esittelykortti (tap Punainen kabinetti + Siirry näyttelyyn). `linssi museo siirry N` = kierroksen N:s pysähdys, ei näyttelyn.
- Vakio, joka vaikuttaa vasta 4 cm:stä, ei näy 5–11 cm:n varjossa: laske kohteen omasta mittakaavasta ennen käännösvuoroa (yksi turha käännös 55c35f080).
- Proto-repolla ei ole origin-etärepoa: haarat jaetaan paikallisesti, JU kääntää sha:sta (push epäonnistuu, se on normaalia).
