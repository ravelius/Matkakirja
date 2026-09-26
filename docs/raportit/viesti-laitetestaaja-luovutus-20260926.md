# Laitetestaaja → seuraava sessio: luovutus (26.9.2026 klo ~05.0x, viikkokiintiö 90 %)

Korvaa aiemmat luovutukset (25.9.). Haara `laitetestaaja-savukierros-b13` (työhaara; PR #3153 mergetty
sisältöjunalla aiemmin — tarkista `git log origin/main`; uusi työ pushattu haaraan, viimeisin 6e344dd41).
Checkout `/Users/Shared/Claude/Matkakirja-laitetestaaja`. Kaikki simulaattorit SAMMUKSISSA, työ pushattu,
ylimääräisiä worktreitä ei.

## 1. Tila
- **Build 16 (1aa7c558) TF:ssä; build 17 (d04841a0) TF:ssä; build 18 (541092d9, käännös e85255cd) savukierros PASS**
  (raportti `docs/raportit/savukierros-b18-20260926.md` + `...-b18-143b.md`), Fable antaa BUILD 1.0.18:n Julkaisijalle.
- b18 avoinna: (1) **144 lipun aaltoilu** ei todennettavissa still-kuvista (vaatii videon/Natiivi-UI:n todistuksen);
  (2) **löydös: laajennettu nostokortti jää auki linssin avauksen yli** (sulkeutuu vain ulkopuolelle napautuksella);
  (3) `vieritys koe` vaatii vieritettävän ScrollView'n (aja laajennetun nostokortin päällä).
- Ei ajettu b18:ssa: iPadin II/CC-kytkin ("Tekstitys" ☰:ssa) + soitin; Pelikoodarin `verkko raja` (haara
  pelikoodari/verkko-raja, "RAJA saapuminen 0 ms verkko-odotusta: PASS|FAIL"; menee junaan b18:n jälkeen).

## 2. Seuraava kierros (build 19) — kysy Fablelta/kutsu; tarkistuslistat ja opit
- Lista: `docs/raportit/savukierros-b18-tarkistuslista.md` (S1–S7 + nostokuvat/vieritys) → päivitä b19:lle;
  pysyvät kohdat: löydös 82 (valintanäkymässä vain kohdekaupungit), lämpövartija (levossa 30 fps, paikallaan>0,
  piirretty ≤3/150), ydinkulku iPhone+iPad, ihmisen-matka-2 + Tekstitys.
- Odota AINA ensin: `proto-3d/lokit/kaannospalvelu/juna.log` KÄÄNNETTY-rivi + `git merge-base --is-ancestor <sha> <käännetty>`
  (`/Users/Shared/Claude/proto-3d/Matkakirja-proto`, ei origin-remotea; haarat paikallisia). Vahti tarkistaa 10 min välein,
  yläraja 1200 s; älä pollaa tiheämmin (ScheduleWakeup 300–600 s).
- PASS-commit = juna/b13:n SHA (ei käännös-SHA) → Fable + Julkaisija (Julkaisija: local_22b29f10…, Fable: local_593b89a1…).

## 3. Tekniikka (kaikki toimii, älä keksi uudelleen)
- **Kosketustyökalu** `mcp__Claude_Code_iOS_Simulator__control` (attach+tap) TOIMII. Koordinaatit laitepisteinä
  (iPhone 402×874, iPad 1032×1376); `simctl io screenshot` on pikseleinä (iPhone ×3, iPad ×2). `inspect` ei käytössä;
  **UITK-napit eivät näy ui-puussa** — todenna kuvasta. iPhone-napit (pt): Uusi matka (201,690), intro-jatko (200,450),
  Ateena valintakartalla (271,325), Ohita/kortin sulku (200,431), ☰ (366,29), lista/nostot (372,98), IM Käynnistä (201,573).
- **Kehittäjätila:** sovellus KIINNI → `xcrun simctl spawn <UDID> defaults write app.matkakirja.proto3d matkakirja-kehittaja -string 1`.
  Ensikäynnistyksessä Documents-UUID VAIHTUU: `simctl boot` → `bootstatus -b` → käynnistä kerran → sammuta → defaults write → käynnistä →
  hae `simctl get_app_container <UDID> app.matkakirja.proto3d data` UUDELLEEN (ja tarkista stabiiliksi). Muuten komennot eivät mene läpi.
- **Tekstikomennot** (`Documents/{peli,ui,linssi}-komento.txt`, lokit `-loki.txt`): `uusi-peli 1 ateena`, `odota-tila Kartta 20`,
  `tila`, `ruutu`, `lampo auto|kuuma|kriittinen` (60/30/20 fps), `kulkutapa liftaus` + `ui liiku` + `siirto <avain>`
  (avain AINA `peli-tila.json` `siirtoKohteet[0].avain`, muoto `c:<id>` tai `e:a|b:n`), `aani mittaa`, `nostokuvat GRC 60`, `vieritys [koe]`,
  `ui kartuscha BIH [auki]`, `ui puu` (→ ui-puu.json, pisteinä), `linssi radio|satelliitti|topografia|ihmisen-matka|ihmisen-matka-2|pois`.
  **`ui liiku`/`ui kartuscha` kirjoitetaan ui-komento.txt:hen**, linssit linssi-komento.txt:hen.
- **Lämpövartija:** `Documents/kehysajat.jsonl` (5 s rivit: tilat{taysi,lepo,paikallaan}, kehyksia, piirretty, fps), `lampo.jsonl` 30 s.
- **Media omistajalle:** PNG pysäytyskuvat ruudun kokoisina, ei kangasta/letterboxia; kuvapari > video (soitin 1:4). Sisäiset raporttikuvat saa jpg.
- Sammuta simulaattorit kierroksen jälkeen (`simctl shutdown <oma UDID>`, EI `shutdown all`); omat: iPhone 1572C658-6455-4E55-8C05-3F88CB3C32F6,
  iPad 3B4CDACB-CCBE-42EC-809D-FB4D0B43CC7D. Fyysistä laitetta ei ole (lämpö/akku: Natiiviseppä).
- Shell: `sleep >N` estetty foregroundissa → käytä `timeout N bash -c 'until … ; do sleep 3; done'`.

## 4. Vastuut
- Fable local_593b89a1-2514-4d74-b956-2a73db862382 (kutsuu kierrokset, ilmoita PASS-commit), Julkaisija local_22b29f10-7af8-43fc-a974-1d666f716c97,
  Natiiviseppä local_bf20055b-…, Natiivi-UI local_33ba1387-…, Pelikoodari local_97810d35-…, Linssiseppä local_45a869de-….
- Muistio: `~/.claude/projects/-Users-Shared-Claude-Matkakirja-fable/memory/` (uitk-napit-ei-ui-puussa, omistajan-videot-rajaus).
