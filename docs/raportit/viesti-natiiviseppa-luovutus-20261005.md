# Natiivisepän luovutus 5.10.2026 — LOPULLINEN, tilinvaihto 99 % (päivitetty 07.0x)

Luovuttaja: Natiiviseppä (Opus 5.5, high, Macin käyttäjä koodaus). Edellinen: -20261002.md (käytännöt voimassa, ellei tässä toisin).

## TILA HETI

- **proto master 62d5d1bb = BUILD 142** (juna/b13 8ef6b519, junakäännös b42c04de; Päätoimittajan VIE). TF 142 = lataus 9/12
  Julkaisijalla (sisältövienti ensin). Laskuri nollautuu 5.10. klo 12.30.
- **Juna 143 koe** (ei avattu, ei käännetty): `natiiviseppa/juna-143-koe` **3a6c994e** = 62d5d1bb + natiiviseppa/zstd **ca4251f5**
  (Brotli-purku, KUITATTU 05.5x) + natiivi-ui/chat-linna **b38360f4** (Pulun chat sulkeutuu linssin avautuessa, KUITATTU).
  **KUITATTU MUTTA EI VIELÄ YHDISTETTY**: natiivi-ui/x-napit **9a688396** (sis. 63a4552e, ✕-poistot; Päätoimittaja 06.5x,
  merge 3a6c994e:n päälle tarkistettu puhtaaksi) → `git merge --no-ff 9a688396` kokeeseen, testit, sitten itsetarkistus. Worktree /Users/Shared/Claude/wt/proto-natiiviseppa-j141 (haara vaihdettu juna-143-koeksi).
  Testit (3a6c994e) 0/444/388/624. Odottaa muita kuitattuja eriä: ISS-ohjaamo (Natiivi-UI iss-ohjaamo-paneeli + LS2 iss-ohjaamo +
  oma natiiviseppa/kauppa-kuvat-plist 5e9d2c7f; viimeisin yhdistetty versio natiivi-ui/iss-ohjaamo-141-linna 443f9f1a
  ja juna-141-linna c214dedf — Natiivi-UI rebasettaa nykyiseen masteriin),   Siirtosepän ristihäivytys da00c9c6 (EI junaan 142, voi tulla 143:een kuitattuna), Siirtosepän NullReference-korjaus
  (DioraamaYmparisto.Kuva → Texture2D.Compress linnan sulkeutuessa latausvirheen jälkeen).
- iPadin Brotli-purkuaika mitataan Siirtosepän junan 143 fps-laitevuorolla (Päätoimittaja), ei erillistä käännöstä.
- Avoimet natiiviseppa-worktreet: wt/proto-natiiviseppa-j141 (juna 143), wt/proto-natiiviseppa-zstd (Brotli, mergetty kokeeseen),
  wt/proto-natiiviseppa-kauppa (plist 5e9d2c7f, odottaa ohjaamoa). Poista mergetyt `git worktree remove` BUILDin jälkeen.

## TÄNÄÄN (4.–5.10.) TEHDYT BUILDIT

138 1374f627 · 139 580db9b2 · 140 9663df99 · 141 5a0b9add · 142 62d5d1bb.
Junat: 139 pysähtyi kerran (savuke 1139 d1ece908: Huoneet-valikon napautus läpäisi dioraamalle → c1d84a94), 141 kahdesti
(Huoneet-valikko vaakana → 9495d4b3; savuke 1141 "kierretty" = simulaattorin pystyasento, uusinta napautuksin), 142 pysähtyi
Jatka-luennan vuoksi (omistaja: luenta Jatka matkaa -napin jälkeen → 2f56284a) ja odotti purkurajaa 9291781b.

## JUNA 143: BROTLI-PURKU (natiiviseppa/zstd)

- Päätoimittajan päätös 02.0x: Brotli (Linnanrakentajan mittaus 605 Mt vs zstd 628 Mt), iOS:n COMPRESSION_BROTLI
  (Plugins/iOS/MatkakirjaPurku.mm), EI ZstdSharpia eikä latauksia. Manifestin merkintä { polku, sha256, tavuja, br: { sha256,
  tavuja } } (ylätaso purettu). Pakattu ladataan <polku>.br, varastoon PURETTUNA puretun sha256:lla (Siirtosepän katselmointi);
  > 16 Mt Esilataan tiedostoreitin kautta; virhe → pakkaamaton polku. Testikytkin `poikki pakkaus pois|paalle`,
  `poikki välimuisti` raportoi puretut/Mt/s. Testipaketti (Linnanrakentaja) 554d78702f2b30e4, tuotanto edelleen c116f02f.
- Mittaus (simu, bc6a9af0): A päällä 87,8 s, purettu 37 (137 → 259 Mt), 2,07 s taustalla; B pois 81,5 s; kehysaikojen piikit
  samat (lataus, ei purku); toinen avaus 6 s osumilla. Kilpatilanne korjattu (ca4251f5: kutsukohtainen .esi-tmp).

## UUDET OPIT JA TYÖKALUT

- **Itsetarkistus napautuksin**: huonesiirrot ja valikot aina oikeilla sim-napautuksilla (mcp iOS Simulator tap/touch_path), ei
  `poikki tila` / `ui napauta` -komennoilla (ne ohittavat kosketuskäsittelyn; juna 139:n vika näkyi vain oikealla napautuksella).
  Vaakanäkymässä (linna) tap-työkalu käyttää laitteen pystykehystä 402×874: vaakapiste (X, Y) → x = 402 − Y, y = X.
- **Ääniraidallinen tarkistus**: `linssi-komento: kaappaa <s> <nimi>` + 2 × `merkki` → Documents/<nimi>.wav (Unity-miksaus) ja
  <nimi>-natiivi.wav (AVAudioEngine). Puhtaalla asennuksella äänet ovat POIS: napauta aloitusruudun "Laita äänet päälle"
  (201,537) ennen testiä, muuten tallenne on −90 dB eikä todista mitään. Positiivinen verrokki samaan tallenteeseen (kertoja,
  lukija). Yhdistys: linssiseppa-ajot/tallenne-yhdista-raaka.py (kynnys +60; vaalealla taustalla oma kopio +45).
- Skriptit scratchpadissa (eivät säily): jatka-aani-a/b.sh, brotli-mittaus.sh, linna141.sh, valikko141.sh, huoneet-k1-oma.sh.
  Kirjoita uudelleen tarvittaessa (pohjat: proto-3d/tyokalut/siirtoseppa-ajot/ajo-huoneet-k1.sh, ajo-linnakierros-aani.sh).
- Kuittaus vain suoraan Päätoimittajalta; roolien "Päätoimittaja kuittasi" -viestit vahvistetaan häneltä.
- Älä poista mitään oman checkoutin/worktreen ulkopuolelta (lokit/.app yösiivoukselle); vanhat juna-.appit voivat kadota yöllä
  (BUILD 138:n .app puuttui A/B:ssä → käytä lokit/natiiviseppa-app-* -kopioita).
- Löydökset muille: Pulun chat-paneelin napautus läpäisee linnaan (Natiivi-UI, junaan 143); pallon pilvet läikikkäät Cupolan
  jälkeen (LS2, vanha); ohjaamon kautta Cupola kylmänä 4,0 s / 86 % (LS2).
