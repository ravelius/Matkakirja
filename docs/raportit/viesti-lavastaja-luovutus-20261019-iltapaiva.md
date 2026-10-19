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

## ENSIN (PT 15.0x: ok – seuraava erä = kohdat 1 + 2 yhdessä)
Kehysmateriaalien sävyerä (vain arvot: kulta-aaltolista, eebenpuu) + Kunniagallerian lähikuvien uusinta (zoom vasta kävelyn jälkeen).
Yksi käännös, yksi simuvuoro JU:lta; kuvat ennen/jälkeen PT:lle.
**TILA 16.2x:** TEHTY, odottaa PT:n kuittausta. Proto `linnanrakentaja/kehyssavy-204` **429cb6099** (KultaUusi 150/134/104 → 215/196/150,
QA "museo nlkulta r g b"; musta ennallaan, PT 15.1x samaa mieltä), app 12a62794b, kulta ruudulla 61/35/11 → 144/97/43.
Kuvat + HAVAINNOT `_valmiit/rijks-kehyssavy-204/`. **PT kuittasi 16.3x junaan 204, merge-pyyntö NS:lle lähetetty.**
**KIILTO (PT 16.3x, oma erä):** proto `linnanrakentaja/kehyskiilto-204` **ea0fe613a** (⊃ 429cb6099): Rijksin kulta haja 0,5, kiilto 1,0, karheus 0,32,
ympäristö 0,45 kullansävyisenä; QA "museo nlkiilto haja kiilto karheus ymp [kultaymp]". JU:lta käännös pyydetty (app `_tyo/linnanrakentaja/kehyskiilto-204-app`),
ajo `ajo-kehyskiilto-204.zsh <app>`: ennen/jälkeen/vahva samalla kulmalla + lähikuvat; skenaariossa "museo tauko" saapumisen jälkeen
(SK-C-6 osui Juutalaismorsiameen, koska kertojan 34 s:n jälkeen kierros eteni). Valitse paras → pari PT:lle (3 riviä).
  **17.5x kierros 1 (app d025cf2ed, lokit/todistus-kehyskiilto-204-a-20261019-1745):** SK-C-6 osui oikein (tauko toimii). Kiilto EI näkynyt:
  karheus 0,32 = kapea heijastus vain profiilin kaarien viivoihin, litteä sivu vain tummui (141 → 132 → 128). **v2 1e1efa157:** karheus 0,5,
  haja 0,55, täytevalo _Tayte 1 (Louvren malli); nlkiilto-komennon 7. parametri = täyte. JU:lta uusi käännös pyydetty samaan app-polkuun.
  **18.56 v2 ajettu (app 7679de6d9, iPhone + iPad):** kiilto näkyy (harja + sisähelmi), ei peiliä; kuvat + HAVAINNOT `_valmiit/rijks-kehyskiilto-204/`.
  **PT kuittasi "jälkeen" junaan 204 (18.5x), merge-pyyntö NS:lle lähetetty.** (Ennen:) Pari PT:lle lähetetty, odottaa kuittausta ("jälkeen" oletuksena vai "vahva" 0.5 1.4 0.55 0.5 1 2) → merge-pyyntö NS:lle 1e1efa157.
  Siivous 18.5x: grafiikka-kehys-204-app ja kehysvarjo-204-app poistettu (junassa).
**OLAVINLINNA v49b (piste 86):** merkit.json v44 + v44-nyky: reitti:pelaaja-86 → (−37,214; 13,4; −9,21) (seinävara 0,40, tikkaat 0,85, ovi 1,62 m;
ennen-v49b/ tallessa). Vienti `vie_v49b.zsh` käynnissä 16.23 (worktree `wt/linnanrakentaja-linna-v45k` palautettu), loki `_tyo/linnanrakentaja/vie-v49b.log`
→ **VIETY 16.5x: pala 1499 a36f4199985ef096, nyky 9c0897bec9044c1f** (v45k 1c69c4c43 / c0abe3769); Projektisepälle (kiinnitys + botti) ja PT:lle ilmoitettu.
   Komeron tiilet huone 9:n Codex-geometrian kanssa (v49c).

## OLAVINLINNA TAUOLLA (omistajan päätös 19.10. 17.05 PT:n kautta)
Ei uusia linnaeriä eikä Codex-tilauksia (huoneet 6–10, komeron tiilet, Tripo-hahmot). Tila kirjattu `docs/raportit/olavinlinna-valmiiksi-lista-20261019.md`
osioon 5 (PR #4986 mergetty). Alla olevat Olavinlinna-kohdat (3, 3b, 4) jäädytetty, kunnes tauko puretaan. v45k-worktree poistettu, haara pushattu.

## Avoimet (seuraava sessio)
1. **Kehysmateriaalien sävy (Kunniagalleria):** kultainen aaltolista näkyy punaruskeana, musta eebenpuu keskiruskeana (HAVAINNOT.md).
   PT hyväksyi 15.0x. Vain arvot (alankomaat/sali.json kehysmateriaalit, MuseoSovitin AsetaKehysvalo), ei kuvia. Haara kehysvarjo-204:n päälle.
2. **Kunniagallerian lähikuvat uudelleen:** zoom ehti ennen kävelyn loppua → `sk-kunniagalleria-kartoitus-204.txt`: odota 40 s valitse-komennon jälkeen.
   Ajo `zsh /Users/Shared/Claude/proto-3d/tyokalut/linnanrakentaja-ajot/ajo-kunniagalleria-kartoitus-204.zsh <app>` (UDID jo 484B130B).
3. **Olavinlinna 6–10:** (omistaja 15.21, Raamattu 9.11: omistaja ei ole ensimmäinen tarkistaja → Codexin 3D: havainnekuva + pelikuva rinnakkain täysikokoisina + portti ennen hyväksyntää) kun Codexin geometria tulee → `node tools/codex-3d-tarkistus.mjs <kansio>` → valot_6_10.py `--geometria` → leivonta
   (pikkupihan `lahde/leivo.py`-malli) → kokoaminen merkkeihin; 1 rivi PT:lle per valmis huone (PT 13.0x).
3b. **PT 15.2x (Projektisepän botti `proto-3d/_tyo/siirtoseppa/linna-botti-7254653e5/yhteenveto.txt`), kehyssävyn jälkeen:**
   (1) reitti:pelaaja-86 (−37,714; 13,4; −8,81) kamera 7 cm tikkaiden/ovi:kellotornin pinnasta → siirrä 0,3 m taaksepäin 85:n suuntaan
   (−37,435; 13,4; −8,920) tai tikkaille törmäys; (2) esine-tiili-komero.glb leijuu (v49a:n muurissa ei tiilitäytettyä aukkoa) → korjaa huone 9:n
   Codex-geometrian kokoamisessa. Molemmat vaativat uuden palan (v49b; putki luovutuksessa 20261011-iltapaiva, TYÖKALUT): niputa samaan, mutta
   jos Codexin geometriaa ei ole tullut kun kehyssävy on valmis, vie (1) yksinään. Rivi PT:lle kun valmis.
4. Tripo-hahmot (kokki, portinvartija) Codexilta → keittiöön MetaHuman-kokin viereen (rajat edellisessä luovutuksessa).
5. **Siivous:** `wt/proto-linnanrakentaja-kehykset` pois, kun 0e4d2f8cd ja a69ac7e05 ovat junassa 204 (`tools/uusi-worktree.sh --poista` ei koske proto-worktreeta – tarkista);
   `_tyo/linnanrakentaja/`: grafiikka-kehys-204-app ja kehysvarjo-204-app pois, kun 204b riittää.

## Opit
- Näyttelynäkymän huonelista näyttää vain 4 ensimmäistä huonetta: käytä komentoja `linssi museo nayttely <id>` + `linssi museo valitse <teos-id>`,
  mutta sulje ensin esittelykortti (tap Punainen kabinetti + Siirry näyttelyyn). `linssi museo siirry N` = kierroksen N:s pysähdys, ei näyttelyn.
- Vakio, joka vaikuttaa vasta 4 cm:stä, ei näy 5–11 cm:n varjossa: laske kohteen omasta mittakaavasta ennen käännösvuoroa (yksi turha käännös 55c35f080).
- Proto-repolla ei ole origin-etärepoa: haarat jaetaan paikallisesti, JU kääntää sha:sta (push epäonnistuu, se on normaalia).
