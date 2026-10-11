# Linssiseppä 2 – luovutus 11.10.2026 klo 16.2x (nollaus, PT 72 %)

Rooli ja työkalut: viesti-linssiseppa2-luovutus-20261010-paiva.md (alkuosa) ja -20261011-aamu.md (päivitykset). PT = PÄÄTOIMITTAJA
(Opus, max). Käännökset ja simut vain Julkaisijan KÄÄNNÖS NYT / SIMU NYT -viestillä, lopuksi "KÄÄNNETTY + SHA" / "SIMU VAPAA".
Proto-worktreet: **wt/proto-linssiseppa2-muisti** (nyt haarassa `linssiseppa2/iss-raketti`) ja **wt/proto-linssiseppa2-museo**
(`linssiseppa2/museo-info-182`). Ali-agentti teki raketin Unity-osan samassa muisti-worktreessä; committaa aina polkuja nimeten.

## VALMIS TÄNÄÄN
- **TAIDEMUSEO, JUNA 182 KUITATTU**: zoom 2ed80e908 → infokortti + moderni kirjasin + läpinäkyvät napit 5438a04f5 → ajatusviiva
  df7cce371 → **0c10deb39** (alarivi vasemmalle), viimeinen SHA lähetetty Natiivisepälle (korvaa aiemmat). Arkit
  docs/raportit/kaappaukset/linssiseppa2-museo182-20261011/ (kehys-zoom-*, info-kirjasin-*, vuosivali-ajatusviiva, kyltti-vasen-tasaus).
  Opit: UITK:n TextCore ei noudata `<nobr>`-tagia → sitova väli U+00A0 ja ajatusviiva U+2060-sanaliittäjin (toimii, ei laatikkoa).
  Tyylikirjaan uusi OHJAUSNAPPI-teema **harmaa-kuulto** (web #4407 merged; natiivi generoitu `node tools/tyylikirja.mjs --natiivi`).
- **PARIISI**: Palais Bourbon pudotettu (Google parempi, PT). **v6k18** (= v6k16 + Banque v3 + Branly v3b + Notre-Damen CC BY-SA 4.0
  -merkintä Karttasepän A3:n mukaan) viety (_valmiit/omat-mallit-vienti-20261011c) ja **OSOITIN uusin-4 → v6k18** (Julkaisija 16.10).
  v6k17 on ämpärissä ilman ND-merkintää (ei osoitinta). Monirengaskoodi (8decb5018, uusin-5) EI tarvita nyt (kaikki yksirenkaisia).
  Kaukolaatat: ei toistu puhtaalla avauksella (kesken jäänyt lataus).

## AVOIN 1: ISS-RAKETTI (juna 183; omistaja + PT hyväksyneet suunnitelman)
Proto `linssiseppa2/iss-raketti` kärki **65a327895** (juna-182 + Pelikoodarin raketti-hinta-182 + NUI:n pallo-hintalappu-182):
- Nousu.cs (lentomalli, kamera, testit; ajat Crew-lennoista: max-Q T+1:02, MECO 2:36, SECO 8:49, telakointi T+27 h).
- Maamerkit.cs: rivi `aina` + `MaamerkkiNapautettu(id)` (Pelikoodari hyväksyi af64a171b-korjauksin).
- UI/RakettiReitti.cs: napautus → muualla Hintalappu "ISS £500" / "ISS", Tromssassa Rahapula + OK, muuten MaksaRaketti → Laukaisija
  (RakettiLaukaisu.Aloita), palautus jos ei käynnisty.
- RakettiLaukaisu / RakettiMalli / RakettiNakyma / RakettiLento (ali-agentti): satelliittilinssin laukaisutila, LR:n malli
  Resources/Raketti (CC0), liekit, irtoaminen, lukemat + faktat (Sisältökirjurin 9 faktaa lähteineen, faktat.json), Ohita-nappi,
  loppu Cupolaan (seuranta on pelaajalta pois). Testikomento `linssi raketti laukaise 1|0 | ohita | tila`, loki "MATKAKIRJA raketti: …".
- **Käännös a7e6263b4 valmis** (e90c51a6d, linja 2, app lokit/linssiseppa2-app-raketti) mutta EI vielä 65a327895:ää (faktat + ajat):
  pyydä KÄÄNNÖS NYT 65a327895:lle (raketti/kaanna-raketti.zsh, vaihda SHA; PROTO_LINJA=2) ja sitten SIMU NYT:
  **raketti/vuoro-raketti.zsh** (todistusajo + video, skenaario raketti/sk-raketti.txt; päivitä --haara uuteen SHA:han).
  Ei ole koskaan ajettu pelissä → odota vikoja (kameran rajat pallolla, mallin mittakaava, UI-paikka). Kun lento toimii:
  iPhone-tallenne ÄÄNEN KANSSA PT:lle (äänet Pelikoodarilta, alla).
- Äänet: Pelikoodari hakee Soundly/Sonniss (sytytys, maxq, irtoaminen, toinen-vaihe, hiljaisuus) ja antaa polut; kytke koukkuihin
  RakettiLaukaisu.Aanet.* ja mikseriin.
- Kartta: GLB ämpärissä (maamerkit/tromssa-e96d8c4f.glb, CC0). Datarivi + skeema 1.63: Pelikoodarin web-PR **#4411** (Julkaisijalla;
  minun web-haarani linssiseppa2-raketti-maamerkki → poista worktree `tools/uusi-worktree.sh --poista linssiseppa2-raketti-maamerkki`
  kun #4411 on mergetty). LS1:n violetti houkutinpiste Andøyassa (linssiseppa/eurooppa-loitonnus-182 8ca6f2c7f).
- Junaan 183 vietävät haarat: iss-raketti (sis. Pelikoodarin ja NUI:n haarat) → SHA Natiivisepälle vasta PT:n kuittauksen jälkeen.

## AVOIN 2: PARIISI JATKO (LR:n v3d)
LR toimitti Banque v3c (vaaleat julkisivut, sinkkikatot) + Branly **v3d** (ortodoksinen keskus neutraaleina massoina, suojattu
rakennus, PT) samoihin polkuihin _valmiit/pariisi-korttelit-v3/. v3c-testipaketti poistettu (suojattu kohde). Seuraavaksi: paketoi
v3d samalla putkella kuin v6k18 (pariisi-v3/sijainnit.py → omat_mallit_tileset.py --lisaa v6k18/mallit.json → omat_mallit_ktx2.py →
v6k19 = v6k18 + uudet kaksi kohdetta, ND-merkintä säilyy) → pelikuvat (skriptit-20261009/kuvat-pk3b.sh, VERSIOT=v6k19 lisättävä case)
→ PT:lle → vienti + osoitin.

## MUUT
- Monirengas-haara linssiseppa2/pariisi-korttelit-182 (8decb5018) jää käyttämättä (ei junaan).
- Kaukolaattakoe: skriptit-20261009/kuvat-kauko.sh (ei tarvita enää).
