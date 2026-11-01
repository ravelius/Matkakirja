# Julkaisija: luovutus 1.11.2026 klo 04.55 (Macin kello; PT:n viesteissä aika ~1–2 h edellä) – konteksti 29 %

Rooli: Julkaisija (JU). Työkalut /Users/Shared/Claude/julkaisija-tyokalut/. Edellinen: viesti-julkaisija-luovutus-20261031-2335.md.

## Kesken: taivas 8192 -GPU-mittaus Isolla iPadilla (PT 04.4x, VS:n tilaus)
- Palat ämpärissä: juoksupeli/maailma-v4/taivas-paiva-codex-v3-8192/ (14/14, SHA256SUMS 4d16f1e05b83; paketti
  _valmiit/juoksupeli-valoseppa-taivas-v3-8192-vienti-20261101 – Codexin SHA256SUMS listasi 28 puuttuvaa promptti/QA-tiedostoa, joten
  pakettiin vain 12 png + palat.json + taivas.json, tarkistettu Codexin summia vasten).
- Laiteäppi dd0d5d743 (linssiseppa2/k17-piha06-216) valmis: /Users/Shared/Claude/proto-3d/lokit/julkaisija-taivas8192-laite/Matkakirja3D.app
  (laite-sha.sh PROTO_LAITE_KOPIO=linjan 1 sisäkopio).
- Ajo 04.30–04.53 EI ONNISTUNUT: VS:n _tyo/linssiseppa2/peli-komento-taivas8192-ipad.txt on editorin Esikatselu-kieltä (alku/ui/oleta/
  odota-maailma/kuva3d); laite lukee vain Documents/peli-komento.txt, ui-komento.txt jne. erikseen → peli jäi kartalle. PT:lle ja VS:lle kerrottu.
- Seuraavaksi: VS tekee laiteversion → aja ipad-lukon sisällä: julkaisija-tyokalut/ipad-taivas8192-muisti.zsh (asennus, xctrace Activity
  Monitor 1500 s, konsoli, A/B-aikaleimat; tulos lokit/julkaisija-taivas8192-mittaus/). Skriptin komennon lähetysosa pitää muuttaa VS:n
  laitemuodon mukaan. Tulos PT:lle ja VS:lle (taivastekstuurin Mt lokirivistä "taivas päiväpanoraama …", kokonaismuisti A vs B xctracesta).

## Tehty tänä yönä
- Cloudflare-paketti VALMIS: karttaversiot + 26s (02.40), Olavinlinna 314/314 (5 uusittu; uusin.json 1a1857e06ec1386f säilyi),
  luettelo 03.10 (9 013 062 obj, 204 Gt ≈ 3,1 $/kk). Kirjanpito PR 5797. Maasto 2026-09-24 jää (PT). KS: pyramidin 2026-09-30-ranta
  OK (delta tyhjä, perus 2026-09-27-ranta; sitä EI saa poistaa) → avoin kohta suljettu.
- Viety (kaikki PT:n kuittaamia, rivit PK:lle/VS:lle): tausta-v89d, rakennukset-v89, -v90, edusta-v1 (+ulkorengas-v13), kaiteeton-v1 (c2-v29),
  -v2 (c2-v30), muurikate-v34, -v35, taivas-v3-8192.
- Mergetty: 5797 (kirjanpito), 5800 (NAS-arkistoskripti + peili), 5809 (KS:n luovutus).
- Levy: swap-vuoto (codex app-server 83 Gt) vei levyn 25 Gi:hin, ratkesi. Poistettu linjan 1 Build/laite+yo, Library/Bee+BuildHistory,
  iOS DeviceSupport 26.4.1, npm-välimuisti; NAS:lle v86 + v98-HYLATTY. LAV:n leivontaraja nyt 70 Gi (PT). Levy 73 Gi 04.53.
- NS:n käännösvuorot annettu (4e055290c, e056310e3, 0c9874fd7, 9d9e52da1/6c1f3f297, 8b75e386b, d152a0278, 72b039301). Juna 216 runko
  a29bb5d3f (NS), juna EI lukittu.

## OPIT (tärkeät)
- NAS-arkistointi siirsi käytössä olevia vientejä (v99, tausta-v89d) → kaikki palautettu. Skripti nyt: kuiva-ajo oletus, --aja vain PT:n
  kuittauksella; ehdot raja 31.10. 12.00, uudempi versio, ei viittauksia (checkoutit/wt/_tyo/tyokalut/symlinkit).
- NAS-palautus tuo ._*-tiedostot (AppleDouble): palauta aina rsync -a --exclude='._*'. 15 654 kpl poistettu 03.5x.
- Lokit: 31.10. 12.00 jälkeiset kansiot jäävät (KK/PT tarkistavat). esikatselu-*/todistus-* ovat enimmäkseen symlinkkejä T7:lle.
- Vientipaketti hylätään, jos LAHTEET.md on SHA256SUMS:ssa tai siinä ei mainita lisenssiä → pyydä LAV korjaamaan (kuittaus säilyy).
- gh pr merge ei odota testejä (ei haarasuojaa): odota vihreä ensin (gh pr checks --watch).
