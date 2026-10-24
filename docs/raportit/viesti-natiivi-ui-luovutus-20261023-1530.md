# Natiivi-UI: luovutus 23.10.2026 klo 15.30 (kova raja 40 %, Postivahti)

Korvaa -20261023-1400:n. Tili vvi@vvi.fi. PT = local_5df52e10-10e4-4b72-9554-0049db300dfe, KK = local_6088bfc8-24ad-4659-a322-5e4ed78c89b7,
JU = local_d8cad7de-3ff8-4f4b-8787-baa80836e175, NS = local_8254cd90-9a85-4d61-8a06-085e7562f05f, PK = local_4b3286ad-3ff4-4ca0-9d8f-feab0680bef6.
Simut: iPhone 123B4B25-36B7-4A76-B677-905621CD8F5A, iPad F7513985-C8BC-4E97-8D29-9C9BD420E962 (vuoro aina JU:lta, lopuksi "SIMU VAPAA").

## TEHTY TÄNÄÄN (junassa 210 / NS:llä)
- Linssit/Pelit-paneelin ‹ Takaisin pois: natiivi-ui/logo-210, rungossa. Aloitusportin logon suurennus KUMOTTU (omistaja 14.54: tarkoitti
  latauslogoa): be778b1bc, NS yhdisti (runko eb2dea5e7).
- Symbolit kiinan-dynastiat + shakki (Codex #891–894, JU vei linssikatalogi/ 14.40): natiivi-ui/symbolit-210 32940975b, PT hyväksyi, NS:llä.

## ODOTTAA OMISTAJAN KUITTAUSTA (EI junaan ennen sitä)
- LATAUSLOGO: natiivi-ui/latauslogo-210 624f3c006 (Aloitusverho.LogoOsuus 0,3 → 0,8; sama arvo mitoittaa iOS-käynnistysruudun,
  natiivin peitteen ja verhon). Pari lähetetty PT:lle ja KK:lle: proto-3d/lokit/nui-latauslogo-kuvaparit/latauslogo-iphone-pysty-ennen-jalkeen.png.
  Lähde 720 px: iPhone terävä, iPad ~2 × pehmeä (terävämpi = Codexilta ~1600 px logo; mainittu PT:lle). Kuittauksen jälkeen → NS junaan 210.

## KESKEN: juoksupelin alkulennon tekstit (omistaja 14.59 "2 EB Garamond", "Ota musta tausta pois", 15.0x "Ei mitään varjoa. Valitse
## tekstin väri niin että erottuu")
- Haara natiivi-ui/alkulento-fontti-210 (worktree /Users/Shared/Claude/wt/proto-natiivi-ui-alkulento-fontti-210) PK:n
  pelikoodari/alkulento-210 729e0c6dc:n päällä; sovittu PK:n kanssa: NUI koskee vain JuoksuAvausJuliste.cs + Linssit.uss.
  Kärki 09d5c75cd: EB Garamond SemiBold (Kirjasin.MuseoLihava), tekstit 52 px, 3-2-1 132 px (Linssit.uss mk-astroavaus__nimi--iso,
  __viiva--iso, __numero), läikkä ja varjo pois, väri tumma muste --tk-kuulto-himmennys-tumma-100. Vaihtoehto B (KK:n pyyntö): QA
  "ui juoksujuliste vari b" → vaalea (--tk-erikois-astro-valkoinen) portin julkisivun ajan (MaataPitkin −3,75…+0,2 s), muuten tumma.
- Mittaus A (iPad, kirjainten ympäriltä, ≥3:1-osuus; proto-3d/lokit/todistus-alkulento-ab-20261023-1519): taivas/katot 90 %, PORTIN
  JULKISIVU 44 % (ainoa heikko kohta), aukko/piha 98–100 %, numero 3 kiveyksellä 90 %. Ensimmäinen B-ajo oli väärin ajoitettu (vaalea
  vasta pihalla) → korjattu 09d5c75cd.
- JÄLJELLÄ: (1) L2-käännös 09d5c75cd käynnistetty 15.2x JU:n luvalla (app → proto-3d/_tyo/nui-alkulento-fontti/jalkeen; tarkista
  lokit/kaannospalvelu/*alkulento-fontti-210-l2.log "KÄÄNNETTY 09d5c75cd"); (2) iPad-ajo (JU antoi luvan 15.2x):
  `/Users/Shared/Claude/proto-3d/_tyo/nui-alkulento-fontti/kaanna-ja-aja.sh aja F7513985-C8BC-4E97-8D29-9C9BD420E962 sk-b.txt b 09d5c75cd`,
  sitten SIMU VAPAA JU:lle; (3) mittaa: `python3 <skripti> <todistuskansio>` (skripti kopioitu: proto-3d/_tyo/nui-alkulento-fontti/kontrasti-ab.py;
  vain "tumma"-rivit ovat luotettavia tummalle tekstille, vaalealle tekstille katso kuvat); (4) A/B-arkki kontrastilukuineen KK:lle
  (omistaja valitsee kortilla); A-kuvat: todistus-alkulento-ab-20261023-1519 a1–a5; (5) valinnan jälkeen oletus TunneliVaalea
  valinnan mukaan, PT:lle ja NS:lle junaan 210 yhdessä PK:n haaran kanssa.

## Opit
- Rajoita kontrastimittaus kirjainten ympärille (tunnettu väri → maski, rengas 3–10 px): koko ruudun mittaus antoi väärän kuvan (tunneli).
- JuoksuAvaus-tapahtuman hetki ≠ kuvan hetki: MaataPitkin-kohdassa drone on jo pihalla; katso ajon kuvat ennen ajoitusta.
- Kylmäkäynnistyskuvat: proto-3d/tyokalut/natiivi-ui-ajot/ajo-kylmakaynnistys-kuvat-202.zsh <app-kansio> <udid> iphone <nimi>.
