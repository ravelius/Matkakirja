# Natiivi-UI: luovutus 23.10.2026 klo 14.00 (kova raja 36 %, Postivahti)

Korvaa -20261021-2245:n. Tili vvi@vvi.fi (vaihto 23.10.). PT = local_5df52e10-10e4-4b72-9554-0049db300dfe, JU = local_d8cad7de-3ff8-4f4b-8787-baa80836e175,
NS = local_8254cd90-9a85-4d61-8a06-085e7562f05f, PK = local_4b3286ad-3ff4-4ca0-9d8f-feab0680bef6 (osoitekirja.md on vanhentunut 20.10.).
Raportit PT:lle postiin tai repoon, EI side-session-notes-kansioon (PT ei näe sitä).

## TEHTY TÄNÄÄN
- UI-periaatteet P2/P3/P7/P8/P10 (6f8455f1a) junan 210 rungossa (natiiviseppa/juna-210 bccb18d32).
- #5188 mainissa (cf5f2f913): ui.md luku 0.1 rajat numeroina + 0.2 tarkistustapa P1–P12, tests/ui-periaatteet.test.mjs; P4 vain asteen 0
  selailupinnoille, modaalit P3:lla (PT 23.10.).
- Kolme veljestä PT772 vastaanotettu: /Users/Shared/Claude/proto-3d/_tyo/kolme-veljesta-772-v1/ (VASTAANOTTO-NUI.md). Omistaja 12.21:
  "Paljon korjattavaa. En ehdi nyt kommentoida" → EI kytketä eikä muuteta ennen omistajan kommentteja.
- Symboli-inventaario PT:lle: kuva puuttuu kiinan-dynastiat (Linssit), shakki ja pallokisa (Pelit). PT tilasi Codexilta kiinan-dynastiat + shakki
  (posti/symbolit-20261023/); KYTKE kun tulevat: Linssivalitsin.cs FotoMinit/FotoIsot (<id>-foto-mini.jpg 512×512, -foto-iso.jpg 1600×900),
  shakki Pelit-rivin kuva (Linssivalitsin.Pelit.cs ~41/105).
- PK:lle pohjaohje (lähtölaskenta ja juoksupelin avaustekstit): juliste/astroavaus-pohjat, soikiotausta; yli 26 px vaalea = uusi koko → PT.

## KESKEN: logo + Takaisin (PT:n erät, omistaja 13.15 ja 13.16) → ennen/jälkeen-parit PT:lle, sitten NS:lle junaan 210
- Proto-haara natiivi-ui/logo-210 (worktree /Users/Shared/Claude/wt/proto-natiivi-ui-logo-210, pohja natiiviseppa/juna-210 560dd9cd8):
  2e4855418 logo (mk-juliste--logo: 64 px leveä, 54 px matala, 47 px kapea 0.08 em; juliste 94 %/680) + ‹ Takaisin pois Linssit/Pelit-näkymistä
  (Aarteet/Matka/Asetukset pitävät); f2d9bdd2f matalan vaa'an tiivistys (alaviiva osui Laita äänet päälle -nappiin). Peili natiivi-backup.
- Käännökset (L2, PROTO_APP_KOPIO): ennen /Users/Shared/Claude/proto-3d/_tyo/nui-logo-210/ennen (560dd9cd8), jälkeen (2e4855418),
  jalkeen2 (f2d9bdd2f) – käännös KÄYNNISSÄ 13.5x, tulos lokit/kaannospalvelu/*natiivi-ui-logo-210-l2.log (KÄÄNNETTY <sha> → --sha).
- Kuvaparit valmiina: proto-3d/lokit/nui-logo-210-kuvaparit/ (iPhone pysty, iPad pysty ja vaaka hyviä; iPhone vaaka PUUTE → f2d9bdd2f).
  Takaisin ennen: lokit/todistus-takaisin2-ennen-20261023-1354.
- JÄLJELLÄ: (1) simuvuoro JU:lta (iPhone 123B4B25-36B7-4A76-B677-905621CD8F5A; iPad jo vapautettu), (2) todistusajo jalkeen2-appilla:
  skenaariot proto-3d/_tyo/nui-logo-210/skenaariot/logo.txt (iPhone vaaka) ja takaisin2.txt (Linssit/Pelit ilman Takaisin, Aarteet säilyy,
  ohinapautus sulkee), (3) parit PT:lle 3 rivillä (logo iPhone pysty pääkuva + muut asennot; Takaisin Linssit/Pelit/Aarteet), (4) SIMU VAPAA JU:lle,
  (5) PT:n kuittauksen jälkeen natiivi-ui/logo-210 NS:lle junaan 210. Samaa pohjaa käyttävät paneelit (PT pyysi listan): Linssivalitsin-näkymät
  Linssit, Pelit (Takaisin pois), Aarteet, Matka, Asetukset (Takaisin säilyy: ainoa paluu pääsivulle); Galleriat ja Paavalikko omat Takaisinsa ennallaan.

## Opit
- Rinnakkain todistusajot kahdella simulla (ajot.sh iphone|ipad) toimivat; `ui linssitnappi napauta` ei avaa paneelia (ClickEvent) → `ui pilleri linssit`
  + `peli kehittaja maailma 1` (kaikki linssit, välilehdet näkyvät).
- UITK letter-spacing = sadasosia kirjasinkoosta (22.73 = 0.2273 em).
- Videon sauman SSIM: vertaa samassa putkessa (video kahdesti peräkkäin), ei PNG vs. video (RGB/YUV-asteikot eroavat).
