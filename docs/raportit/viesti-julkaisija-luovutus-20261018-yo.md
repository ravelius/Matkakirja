# Julkaisijan luovutus 18.10.2026 klo 00.3x (PT: ei uusia töitä, luovutus)

Loki: `/Users/Shared/Claude/julkaisija-tyokalut/tf-jono-20261002.txt` (tail -100). Edellinen: `viesti-julkaisija-luovutus-20261017-myohaisilta.md`.
Osoitekirja /Users/Shared/Claude/osoitekirja.md; viestit send_messagella session id:llä. Levy 43 Gi (00.35).

## 0. ENSIN
- **JUNA 201 AUKI** (omistaja 00.18 "kaikki junaan 201", PT 00.21). Todistekäännös 21d5712be → 0fee93fb valmis 00.26
  (`proto-3d/lokit/natiiviseppa-app-201-lukitus-sim/Matkakirja3D.app`, EI BUILD/TF). Lopullinen LUKITSE 201: NS lähettää
  KÄÄNNÖS NYT, kun NUI:n erät valmiit (ratas ~03.00, kohdevalikko ~05.00). Silloin: muut L1/L2-odottajat SIGSTOP (ei lukossa olevaa),
  malli `julkaisija-tyokalut/l1-varaus-ns.zsh` (pysäyttää uudet odottajat kunnes lukitse201-ketju saa L1:n; aikaraja muokattava).
- **PK:n esikatselu ac414396f**: PK luovutti 00.41 eikä ajanut; seuraava PK pyytää NYT:n (L1 vapaa).
- **Galleria arkki 5 89f6fa43a PERUTTU** (LR): käännös L1-lukossa 00.26→ ajetaan loppuun (ei tapeta); taustasilmukka lopettaa
  `pelikoodari-galleria200h.zsh`:n gatella → simua EI ajeta. Jos skripti yhä elossa KÄÄNNETTY-rivin jälkeen: `pkill -f pelikoodari-galleria200h.zsh`.
  Uusi galleria-sha tulee PK:lta (LS:n pyramidikorjaus yhdistettynä) → tee galleria200g.zsh:n mallilla uusi (i-app), simu sk-galleria-arkki4b.txt → PK + LR.
- **Simulla nyt (00.32→)**: KS Kiina taistelu v5 (270832938, kiina-taistelu-250-v5-app, iPad) → KS kuittaa SIMU VAPAA.
- **Seuraavat simut (juna 201 ensin)**: LS pyramidi v2.4 ffa433c76 (L2-käännös, LS pyytää itse, iPhone BD64C8E4) → NUI ratas-201
  4db43cc36 (L2-odottaja, ratas-201-app; video + pari, NUI pyytää). Juna-appin Mona Lisa vain PT:n pyynnöstä (LS).
- **Käännöksissä 00.35**: L1 pelikoodari/galleria-200 (peruttu, ks. yllä); L2 linssiseppa/orsay-valinnaiset-200 (00.24→);
  odottaja linssiseppa2/kohdevalikko-201 (Valoseppä, juna 201?) ja NUI ratas-201.
- **LR louvre-kehykset-201 3aeac4c8d** (pyyntö 00.3x, juna 201, PT: Louvren kehykset + omistajan Mona Lisa -kuva): EI vielä aloitettu (PT: ei uusia töitä
  ennen nollausta). Käännös linnanrakentaja/louvre-kehykset-201 (21d5712be:n päällä) → simu iPhone pysty,
  `proto-3d/tyokalut/linnanrakentaja-ajot/sk-louvre-kehykset-201.txt` (3 kuvaa). Uusi varjostin (_PintaTapa 3) → tarkista varjostinvirheet lokista. Polku LR:lle.
- **NS yöllä**: 2 laitekäännöstä (A = master 94a8a360c, B = haara) L1:lle + iPad Pro 13 -vuoro ~25 min (LampoMittari) klo 01.00 alkaen,
  kun omistaja ei käytä iPadia — vahvista aika NS:lle.
- **PT: levy** — TF 201 -käännöksen JÄLKEEN siivoa omat simu-/käännöskansiot (_tyo/pelikoodari ym. omat: 2 uusinta + käytössä) → vapautunut Gi PT:lle.
- **API-avain**: kun KK/PT välittää "vanha KLIK-avain poistettu" → aja vain `savuke-pollo.yml` → tulos rivinä KK:lle (pollo-julkaisu EI).
- Levyvahti: `zsh julkaisija-tyokalut/levyvahti-l2.zsh` taustalle (kuoli nollauksessa).

## 1. TÄNÄÄN 23.14–00.35
- Juoksupeli 99a83b3d9 → 47191bde ajettu 23.53 OK (maailma piirtyy, tuloskortti) → PK. Todistus `todistus-juoksupeli-ruudukko-20261017-2353`.
- Galleria f23550247 → 9d9b7620 ajettu 00.21 OK (8 kuvaa) → PK + LR (`todistus-galleria-arkki4b-200g-20261018-0015`). fa219040b peruttu.
- KS v5 käännetty 23.33; KS kohdekaupungit 440325942 → a429be67 (siirretty L1:lle, `ks-siirto-l1.zsh`) + simu A/B 00.08–00.15.
- NS kokoruutu bd262afd + uusinta; NUI maakunta f784c053 + astro; LS louvreavaus201c, monalisa201l2, louvreavaus202a; NS pariisi-201.
- MERGE #4831 muutosloki 201 → 90a41f5d5 (ei CI-ajoja, kuten #4822).

## 2. OPIT
- L1-varaus lukitukselle: `l1-varaus-ns.zsh` pysäytti myös toisen roolin L2-odottajan (monalisa) → kerro roolille; varaus vain L1:lle olisi tarkempi.
- Kaksi simua rinnakkain (iPad NS + iPhone LS) toimi juna 201 -kiireessä.
