# Julkaisijan luovutus 14.10.2026 klo 22.5x (NOLLAUS: omistajan uusi raja 35 %, Opus medium)

Loki: `/Users/Shared/Claude/julkaisija-tyokalut/tf-jono-20261002.txt` (tail -150). Edellinen luovutus `viesti-julkaisija-luovutus-20261014-paiva.md`.

## 0. UUDET SÄÄNNÖT TÄNÄÄN

- **Julkaisija = Opus medium** (omistaja 22.50; high vain CI-vian ajaksi). **Nollausraja 35 %.** Välivaiheiden kuva-arkit ja pitkät
  lokit tuoreelle **Sonnet-apuagentille** (lähikuvat, ≤ 5 rivin raportti); itse vain lopullinen.
- **Junaketjun vaiheet Asemataululle HETI** (omistaja 22.20): talo/eteneminen {nimi:"Juna N", edistys 0–5, vaihe, valmis_arvio, tila,
  kirjoittaja:"Julkaisija", ts} (ArtifactData get → update if_version, https://claude.ai/artifact/EekZDPMuAcsjT3awvn4jPb). Kun
  **SISÄINEN valmis → 5/5 "TestFlightissa" + send_message PT:lle (local_74630a27) JA KK:lle (local_593b89a1): "TF N sisäisillä klo HH.MM"**.
  Tee tfN-ketju.log-Monitorin tapahtumasta. (Juna 190:ssä tämä jäi tekemättä → omistajan huomautus.)
- Muistiajo: omistaja "älä tee muistiajoa" koski junaa 190; juna 191 myös ilman (NS). Portti: `muistiajo-N.txt` 1. rivi `OHITETTU <peruste>`.
- Lukko-/simusäännöt ennallaan (simuja ≤ 2, raskaita 1, mykistys, SIMU VAPAA vain tekijältä; tarkista ettei vanhoja lippuja jää).

## 1. Juna 190 – VALMIS 5/5 (22.38)

Web #4588 dfb0ddbee, #4593 c3a6d84b2, muutosloki #4595 95dab8262. BUILD 190 = 190f19f4d672507f66d354a8d69f74506b87966d.
TF iOS 38613008513 ✓ 21.22 → sisäinen ✓ 21.28 → vienti 8c4bf089a ✓ 22.14 → ulkoinen ✓ 22.21 → beta-arvio ✓ 22.37 → vanhennus 189 ✓ 22.38.
Mac 190 NS ✓.

## 2. Juna 191 – KÄYNNISSÄ (omistajan kiireellinen 21.40, päivän 3. TF)

Runko 9e92a9a6e, BUILD 191 = 64728a1f53babb1a2d3e9d2cc169513529d4da05, muutosloki #4601 → main 3c99c6a2e93757bbbd042e26990108f3845b6a44.
**TF 191 iOS ajo 38625842203 käynnistetty 22.43**; ketju `julkaisija-tyokalut/tf191.sh` setsid (pid 87034) → `tf191-ketju.log`.
Mac 191 NS:llä L2 (mac191.sh, 22.41). Asemataulu: 4/5 TF-lataus (v16). Arvio: sisäiset ~22.55, ulkoiset ~23.45
(vienti 0cbf8b688 jonossa f05dd581f:n perässä). **Seuraavalle: Monitor tf191-ketju.log heti; SISÄINEN → 5/5 + rivi PT + KK.**

## 3. Ulkoisten nopeutus (omistaja 22.4x, junasta 192)

Apuagentti (Opus) tekee PR:n: `tools/testflight/ulkoinen-ryhma.py --vain-arvio` + workflow-input `vain_arvio` (beta-arvio ilman
ryhmäliitosta). PR tulee worktreestä `/Users/Shared/Claude/wt/julkaisija-tf-arvio` — tarkista, mergeä vihreänä, sitten päivitä
`tf-ketju-pohja.sh`: sisäisen jälkeen ulkoinen vain_arvio=true → odota vienti ⊇ M → normaali ulkoinen (liitos). Vienti (vie-sisalto.yml)
alkaa jo mergestä; pullonkaula on sarjajono (~40 min/ajo). PT:lle kerrottu.

## 4. Linjat, simut, jono 22.5x

L1: TF 191 -ajo (lukko "testflight ajo 38625842203"). L2: NS Mac 191. Simut 0/2.
Jono: **LS1 museokohdat6** 2b96a196a (lippu `proto-3d/tyokalut/linssiseppa-ajot/kaannos-museokohdat6.nyt` L2:lle NS:n Mac-käännöksen
jälkeen, sitten simu-museokohdat6.nyt ~8 min). Valosepän vahti **tauolla** (`/tmp/matkakirja-valovahti-tauko`, junan 191 lukitus) —
poista, kun Mac 191 on käännetty. Poissulku lisätty: `!linssiseppa2/leikkaus-ala-191` (Valoseppä kääntää sen itse).
`matkakirja-juna-tauko` on NS:n (launchd), ei koske.

## 5. Tänään korjatut työkalut

- `valoseppa-vahti.zsh`: jono suodatetaan poissulkulistalla (rivi 83). Käynnistin `valoseppa-vahti-kaynnista.zsh`.
- `valoseppa-vakiokuvat.zsh`: todistusajo zsh:lla + tuoreustarkistus (21.37 vanha todistus linkittyi "OK":na; todistusajo.sh menetti +x, NS korjasi b9facfcb2).
- `valoseppa-iphone-lisa.zsh` (uusi): vahdin appi iPhone-simulla (lippu-varjo NYK|UUSI).
- `tf-kaynnista.sh` + `tf-ketju-pohja.sh`: `cd` repokansioon (gh "not a git repository").

## 6. Viennit tänään illalla (kaikki vie-paketti.sh, 0 virhettä)

ateena v4/v5/v6, praha v3/v4/v5 (LS1); lontoo v4/v5 + vesi-indeksi v23 (paketoin itse); lontoo-10km 6/6 (SHA256SUMS ./-polut korjattu).
