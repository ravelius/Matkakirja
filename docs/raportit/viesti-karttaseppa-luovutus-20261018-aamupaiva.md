# Karttasepän luovutus 18.10.2026 klo 08.4x

Linjaukset: Raamattu + muisti `karttaseppa-tila-*`. Viestit AINA send_message id:llä `/Users/Shared/Claude/osoitekirja.md`:stä,
PT:lle ≤ 3 riviä. Käännökset ja simut VAIN Julkaisijan jonon kautta (KÄÄNNÖSPYYNTÖ → KÄÄNNETTY → SIMU NYT → SIMU VAPAA), simu aina YKSIN.
Edellinen: `-20261018-aamu.md`. Työpuu: proto-wt `/Users/Shared/Claude/wt/proto-karttaseppa-iss-reitti-198` haara
**karttaseppa/kiina-paketti-200** (peili `git push natiivi-backup karttaseppa/kiina-paketti-200:peili/proto/karttaseppa/kiina-paketti-200`;
originia ei ole). Skriptit `/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/kiina-koko-linssi/` (uusi `kuvapari.zsh <a> <t> <b> <t> <ulos> [rajaus]`).

## Tila

- Juna 201: kiina-paketti-200 @ 5c59703d0 (v10). Kuvakäännös 5 (263cd9253) ajettu 06.46: siirtymä 250→440 HYVÄKSYTTY (PT).
- **Juna 202: f173a6f37 HYVÄKSYTTY (PT 08.4x, v13-simu cee75ea99) ja annettu NS:lle 08.4x.** Sisältää:
  - 8effba503 taistelukummut kaikilla 5 taistelupysäkillä (−221, 250, 440, 1280, 1644)
  - 0189ce37f (v11): taistelunimi armeijoiden loppureitin ulkopuolelle (KiinaArmeijat.NimenSiirto), IsoisaKerros.Reunus 0,32;
    valopisteen nimet hehkun päälle (hehku JonoValo 3010 peitti nimen 3005) ja selkeässä tumma muste
  - 62cfe9285 (v12): nimi väistää pysäkin alue-/pääkaupunkinimet ja aikajanan (AlarajaLat 20,3); **WU 250 nimiö
    26,94/114,68 → 26,2/115,2 vain Resources-kopiossa** (ks. Avoimet 1)
  - f173a6f37 (v13): väestöpinnan kolmiot myös merelle armeijoiden reittien varrella (KiinaArmeijat.KummunSolut) → Yamenin Song-laivasto näkyy
- Kiina-testit 50/50, tarkista.sh 0. Todistukset: `proto-3d/lokit/todistus-kiina-taistelut-v13-20261018-0828/kuvaparit/` (v11|v13).
- Levy 08.3x kriittinen: poistin 25 omaa vanhaa .app-käännöstä `_tyo/karttaseppa`:sta (~15 Gi); jäljellä v12 + v13.

## ENSIN (seuraaja)

1. **Main-data** (päärepo `data/linssit/kiinan-dynastiat/`, Resources on sen kopio): WU 250 nimiö 26,2/115,2 (sama kuin proto f173a6f37:ssä);
   ITÄTURKIT 589 44,3 N; NURGAN 1421 45,5/129,5; ETELÄINEN TANG 950 kahdelle riville; nykyinen-kiina.json nimiö; kiina-puherivit.json →
   main. Ennen työtä: grep muiden haarat (muisti avoin-kohta-tarkista-muiden-haarat).
2. **Pienet (PT: seuraavaan erään, ei kiirettä):** Yuan-kumpu käy hetken Yamen-nimen yli (NimenSiirto ei huomioi Erilleen-siirtoa
   TaisteluValiKm/2 = 160 km); Shanhain solan nimi näkyy vain ~4 s (taistelulause lyhyt ennen siirtymää 1644→); Fei-joen risti
   Jiankang-nimen päällä (pääkaupunkinimi 0,8° yllä, risti 32,65/117,0).

## Opit

- zsh: `$R[a]` on taulukkoindeksi → käytä `${R}` ffmpeg-suodinmerkkijonoissa.
- Testeissä `$"{vuosi}"` tuottaa fi-kulttuurissa miinusmerkin U+2212 → InvariantCulture tiedostonimissä.
- Taistelunimen luettavuus: syy oli jonojärjestys (hehku 3010 > nimi 3005) ja kontrasti tumman kummun päällä, ei syvyystesti.
