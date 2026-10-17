# Karttasepän luovutus 17.10.2026 klo 10.4x (Postivahti: kova raja 35 %)

Linjaukset: Raamattu + muisti `karttaseppa-tila-*`. VIESTIT aina `send_message` session id:llä tiedostosta
`/Users/Shared/Claude/osoitekirja.md`, PT:lle ≤ 3 riviä. Edellinen luovutus: `viesti-karttaseppa-luovutus-20261017-aamu.md` (3c1129758).

## Aloitusviesti uudelle sessiolle

> Olet Karttaseppä (Opus, high). Lue CLAUDE.md ja `git show <SHA>:docs/raportit/viesti-karttaseppa-luovutus-20261017-aamupaiva.md`
> KOKONAAN (haara karttaseppa-tyo-20260922). Viestit send_messagella id:llä (osoitekirja.md), PT:lle ≤ 3 riviä. JATKA KOHDASTA 1.

Käännökset ja simut VAIN Julkaisijan jonon kautta (KÄÄNNÖS / SIMU NYT; VS voi antaa välin omasta vuorostaan); ilmoita SIMU VAPAA
sille, joka antoi vuoron. Proto-worktree: /Users/Shared/Claude/wt/proto-karttaseppa-iss-reitti-198 (haarassa karttaseppa/kiina-vaestopinta-199).

## 1. KESKEN: väestöpintavideo, Punaiset kalliot 208 (omistajan kokeilu, PT odottaa)

- JU kääntää **372f5941c** (rinnevalo) → `_tyo/karttaseppa/kiina-vaestopinta-208-app`; SIMU NYT tulee JU:lta (LS:n ajon jälkeen, ennen PK:ta).
- KUN SIMU NYT: 1) päivitä `kiina-vaestopinta-208-app/kaannos.out` riville `KÄÄNNETTY <JU:n ilmoittama sha> karttaseppa/kiina-vaestopinta-199`
  (nyt siinä vielä bf4e1af32!) ja tarkista `git merge-base --is-ancestor 372f5941c <sha>`; 2) `zsh .../kiina-vaestopinta-208/ajo-vaestopinta-208.zsh > ajo-5.out`;
  3) SIMU VAPAA JU:lle; 4) **katso kuva-arkki.png ITSE** (todistusajon OK ei katso kuvia!): rinteiden pitää varjostua, pohjoisen tasangon olla korkein.
  Vertaa V0c (valo 0,15/15°) ja V0d (kerroin 4000) oletukseen; paras asetus koodin oletukseksi (`KiinaVaestopintaKerros.ValoPohja/ValoKorkeus/ValoKulma`,
  `MetriaPerTiheys`) tai pelkkä skenaario. 5) Video + arkki PT:lle (polku todistus-kiina-vaestopinta-ipad-199-<aika>/vaestopinta.mp4).
- Historia tällä vuorolla: 09.39 Käynnistä-kortti päällä (skenaario: `linssi kiina ajo` + tauko), 09.51 kamera suoraan alas (QA ei välittänyt kallistusta →
  b203c1c91), 10.21 900 km liian lähellä, 10.32 rajaus ok (2200 km/40°) mutta rinteet litteitä (valo kameran suunnasta, pohja 0,55 → 372f5941c).
  Väliversio PT:lle: `lokit/todistus-kiina-vaestopinta-ipad-199-20261017-1032/vaestopinta.mp4`.
- QA: `linssi kiina vaestopinta [208] | <t> | ajo <s> | kerroin <m> | kamera [km] [kallistus°] | valo <pohja> <korkeus°> <kulma°> | pois`.
- Haara sisältää junan 199 (bc228f5d9) ja PK:n kytkennän ba6aad86d (25d68cbad). Data: päärepon haara `karttaseppa-kiina-vaestopinta` 105040e97,
  PR vasta kokeilun hyväksynnän jälkeen. HYDE: ei käsilatausta ennen omistajan päätöstä (PT kysyy).

## 2. Valmiit tällä vuorolla

| Erä | Toimitus |
|---|---|
| ISS-skanneri "Uusi viivoilla" (omistaja 08.57) | proto skanneri-199 820f43495 → NS juna 199 (lukittu bc228f5d9): ViivatKaytossa = true; SkanneriHaku.NimiKm 150 km + Avain (Santiago/George Town/San Jose/Barcelona avasivat toisen mantereen kaupungin), k-san-jose, testi NapautusAvaaAllaOlevanPaikan 1131/1131 |
| Oranssi Ranska -selvitys | `docs/raportit/karttaseppa-oranssi-ranska-20261017.md` (ce38fa0ac): Yokuori.shaderin aamuhämärän kaista koko pinnalle (NousuFlare.Aamu), VS korjaa junaan 200 |
| S2-indeksi v2g (PT: junaan 200) | 13 päivämääräraja-ruudun bbox omalle puolelle + tiiviit aluebboxit; JU vei 09.32 `s2-indeksi/v2g/`; PK vaihtaa `S2Maailma.Versio = "v2g"` haarassaan antimeridiaani-200 (sovittu, EI KS). Generaattori `/Volumes/T7 4TB/Matkakirja-karttaseppa/iss-s2-indeksi/v2g-paivamaararaja.py` |
| Tivoli vaihe 1 (omistaja 09.59) | `_tyo/karttaseppa/tivoli-20261017/` (kohde.json, DHM 0,4 m DSM/DTM, nDSM, 10 massakuvaa, orto 10 cm, OSM). DHM + orto CC BY 4.0 "Klimadatastyrelsen". LR kuittasi, päätökset `_valmiit/tivoli-v1/SUUNNITELMA.md` |

## Muistiinpanot

- Python-venv GIS-kirjastoilla (numpy, tifffile, imagecodecs, pyshp, shapely, pyproj, scipy, pillow, matplotlib):
  `/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/skanneri-samanimi-199/venv/bin/python3`.
- Proto-haarat natiivi-backupissa: kiina-vaestopinta-199 (372f5941c), skanneri-199 (820f43495).
- todistusajo.sh:n "OK" ei tarkista kuvan sisältöä → katso aina kuva-arkki ennen lähetystä.
