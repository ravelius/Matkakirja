# Linssisepän luovutus 19.10.2026 klo 11.41 (Postivahti: KOVA RAJA 77 %)

Edellinen: viesti-linssiseppa-luovutus-20261018-1405.md. Id:t /Users/Shared/Claude/osoitekirja.md (gmail-tili 19.10.): PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31,
JU local_24e63224-112c-449a-b6a3-e10e4ed43f4b, KS local_16f80454-…, VS local_e675f86d-…, PK local_11aca9cd-…, Postivahti local_0a4f4c68-….

## 0. KÄYNNISSÄ LUOVUTUSHETKELLÄ
- **Leiden-video SIMUSSA (alkoi 11.41)**: käännös 605059f2 (L2); `proto-3d/tyokalut/linssiseppa-ajot/ajo-leiden204.zsh` (loki ajo-leiden204.log,
  valmis kun "SIMU ALAS"). Ajo: Rijks lyhyt napautus + pitkä (kunniagalleria → Leiden) skenaariolla
  sk-napautus204-iphone.txt → loki `proto-3d/lokit/todistus-leiden204-iphone-*`. SEURAAJA: ilmoita JU:lle SIMU VAPAA ajon jälkeen, tarkista
  lokista "leikkauksen esilataus" + "leikkaus, esilataus valmis x s" ja ettei Leidenissä tyhjiä jalustoja/sumeita kuvia, tee video
  (ffmpeg -fflags +igndts … libx264) ja lähetä PT:lle (PT pyysi: lyhyt video 2)+3), sitten NS).

## 1. TÄNÄÄN VALMIIT (kaikki proto-repossa /Users/Shared/Claude/proto-3d/Matkakirja-proto)
- **Mona Lisan hyppy**: ei pelissä (kameraloki + ruutuvahti 202h/202i: pelin kuva tasainen 60 fps) – simulaattorin kuvan jumi. Lopun nykäys
  (215 ms saapumisruutu) korjattu: saapumisen esilataus 444b12a82 (haara linssiseppa/monalisa-ruutuvahti-204, PT kuittasi NS:lle).
- **Kamerajohtaja (a)** linssiseppa/kamerajohtaja-204: 8d7e1feab (Kamerajohtaja, Kameratarkastus, KameraliikeTestit, kameravahti, todistusajon
  ruutuaikavahti) + c9a9a6ddf (kameravahti vain kirjoitukset, lähtötaso 13/21; KameraKirjoittaja → Assets/Matkakirja/Kartta/, KS:n pyyntö)
  + fbe537200 (Zoom(fov, huippu) VS:lle). PT kuittasi 8d7e1feab NS:lle; c9a9a6ddf ja fbe537200 pyydetty PT:ltä NS:lle.
- **Museon pilotti + (c)** linssiseppa/museo-kamerajohtaja-204 (sisältää 444b12a82 + (a)): ovensuun Kisko 35067491f (PT kuittasi NS:lle),
  osoitus/paluu Kiskoina + Leikkaus + koko kierros CI 6a3aabf60, pitkä napautus = tumma leikkaus + lyhyt liuku d63d5f351 (PT KYLLÄ, videot
  hyväksytty), kärki **72abef783**: kyltin Wikipedia-viite pois (Johannes Kastaja, Maalaiskonsertti), pitkän napautuksen saapumiskatse
  sisältöön, Leikkaus.Valmis (tekstuurit + veistokset ennakoivat kohteen mustan alla, max 2,5 s). Linssit 2099/2099. → video (kohta 0) → NS.
- **Kööpenhaminan kippi** linssiseppa/koopenhamina-kuvat-204 **069162482** (master-pohja): kaikille 8 kohteelle kuvat oppaan kuvalistasta
  (opas/kuvat-v10/kuvat.json, Q-tunnuksella, Pallokierros.TaydennaKuvat) + tekijät ☰ › Lähteisiin. Ei vielä simulla. PT:lle kerrottu;
  osa kuvista CC BY-SA (kysytty PT:ltä kelpaako). Codexin havainnekuvat (PT tilasi 7caf8ca1d, k1–k8) liitetään kuvalistaan, kun tulevat.

## 2. SEURAAVA ERÄ
1. Kohta 0 (Leiden-video) → PT → NS saa museo-kamerajohtaja-204:n.
2. Kööpenhaminan kippi simulla (kuvat näkyvät kortissa, Lähteet-rivit) → kuvapari PT:lle; havainnekuvat kun Codex toimittaa.
3. Muistiinpanot: pitkiä ruutuja 20–29 ms saapumisten jälkeen (kertoja/nimi) ja 65 ms Niken lähestymisessä (patsaan lataus) – mahdollinen
   jatkoesilataus. Kamerajohtajan (c)-siirrot: VS (ISS), KS (pallokierros, oma haara karttaseppa/kamerajohtaja-kartta-204), PK (Juoksupeli).

## 3. WORKTREET (/Users/Shared/Claude/wt)
proto-linssiseppa-museokamera (museo-kamerajohtaja-204), proto-linssiseppa-kamerajohtaja (kamerajohtaja-204), proto-linssiseppa-kippikuvat
(koopenhamina-kuvat-204), proto-linssiseppa-pyramidi (monalisa-ruutuvahti-204), proto-linssiseppa-kierrokset195 (todistusajo.sh – älä poista),
linssiseppa-tuotantopohja-linssi (PR #4771 auki). Poistettu tänään: proto-linssiseppa-nainen (mergetty), linssiseppa-posti (tyhjä).
Omat appit _tyo/linssiseppa: juna204-kamera-app, juna204-leiden-app (+ vanhemmat juna202*, juna204-* → karsi 2 uusinta + käytössä oleva).
tools/gpu-vapaa.sh ja .claude/settings.local.json* eivät ole minun.

## ALOITUSVIESTI SEURAAJALLE
Olet Linssiseppä (Opus, high). Lue CLAUDE.md ja tämä luovutus. Tarkista ensin kohta 0 (Leiden-video: odottaako ajo-leiden204 lippua vai onko
ajo valmis → SIMU VAPAA JU:lle, video PT:lle). Sitten kohta 2.
