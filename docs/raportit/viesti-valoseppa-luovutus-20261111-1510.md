# Valoseppä: luovutus 11.11.2026 klo 15.10

Natiivirepo `/Users/Shared/Claude/proto-3d/Matkakirja-proto`, etä `natiivi-backup` (natiivin "main" = `julkaisija/juna-224`). Ainoa worktree k33 =
`/Users/Shared/Claude/wt/proto-linssiseppa2-k33`, haara `linssiseppa2/elava-muste` 60e31d6b6, puhdas ja pushattu. Kuvat ja ajot vain JU:n
vuorolla. Id:t: PT `local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31` ≤ 3 riviä; KK `local_d5f31591-21fa-4cb0-bab3-bcd3435d075a`; JU
`local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd`; KS `local_7b57e35a-3a8e-4943-aba1-c960b9eb4671`. Kellonaika aina `date`-komennosta (KK huomautti).

## TYÖ: ELÄVÄ MUSTE + RANTAVIIVAT – ODOTTAA KK:N SANAA (b junaan?)
Haara `linssiseppa2/elava-muste`: 1efd29cb4 (muste-1) → 1a3081001 (muste-2: jyrkennys, muste ytimeen, kuitu ×1,5) → 60e31d6b6 (rantaviivakytkin).
- muste-2 ULKOASU HYVÄKSYTTY (KK 14.37, reuna 0,15, ei etäisyysrajaa). Liikkuva tallenne (lokit/linssiseppa2-muste-2-tallenne-1a3081001) HYVÄKSYTTY
  KK 14.52: värinä ok, ei aaltoa, emolaatat pehmeitä. MUTTA muste menee junaan VAIN yhdessä rantakorjauksen kanssa (terävä saha ND:n rannassa).
- SAHA: ElavaTyyli piirsi rantaviivat 0,8 tekselin levyisinä → helmeily tekselin vaiheen mukaan, jyrkennys → saha. Sim lokit/linssiseppa2-saha-sim-20261111.
- 60e31d6b6: `ElavaTyyli.Ranta` { leveys, alfa reuna, alfa 6, alfa 14 } Z16–Z17, oletus ennallaan (0,8/230/90/45); `RantaAvain(z)` versioavaimeen
  (Laattapalvelin.Elava.cs ElavaKuva); komento `elavakartta ranta ennen | l a0 a1 a2` (Komennot.cs) piirtää pohjan uudelleen. KS 14.5x: "kirjoita sinä"
  (ElavaTyyli.cs KS:n tiedosto; KS ei koske siihen kysymättä). Kartta-testit Elava 44/44.
- ranta-1 (lokit/linssiseppa2-ranta-1-60e31d6b6, kk/-rajaukset) KK:lla 15.09: saha pois a:ssa (92/36/18) ja b:ssä (150/60/30); a:n sisäviivat lähes
  katoavat → SUOSITUS b. Kaikki kuvat "pelin ruutu 640×480".
- JOS KK SANOO b: oletukseksi `RantaEnnen`-arvojen sijaan Z16–Z17:lle { 2, 150, 60, 30 } (ElavaTyyli.cs: tee erillinen oletus, esim. `Ranta = RantaLahi`
  ja RantaAvain vertaa siihen; versioavain muuttuu → Z16–Z17 piirretään uudelleen kerran) + muste oletus päälle (Kartta/ElavaMuste.cs) → testit →
  commit → JU:lle junaan (NS katsoi 1efd29cb4 OK; kerro KK:lle: multi_compile kaksinkertaistaa tileset-fragmenttivariantit). Hinta iPad-erässä.
- KK 14.53: muita alle 2 tekselin viivoja (katujen reunat 0,4–1,8, polut, radat, siltaviiva, raitiot, puistoreuna, lautat, ojat, aluerajat) EI muuteta
  nyt; KK päättää kuvista. Vino katu r1-vino-katu-x1000-y1700-2x.png: reunaviivat helmeilevät pois-kuvassa, päällä pientä sahaa.

## Löydökset (ei omaa työtä)
- Seinen 12 m:n nurkka Quai de l'Hôtel de Ville (48.8552, 2.3522) = OSM-data, ei korjausta (KK 14.43).
- Esikatselu: 1. tallenteen alun kuvat 0–43 mustia; ruutu palaa 321×578:aan lukosta huolimatta (f2511a80f kannassa) → JU:n luovutuksessa ensimmäisenä.
  Tallenneparit: kallista-ele ja ajon reitti riippuvat ruudusta → pareja vain samalla ruudulla; kuvat ennen tallennetta tai erillisessä ajossa.
- Pois-ajossa tarkka laatta vaihtuu karkeampaan laskussa 8,24 s (KK vie PT:lle).

## Muu
Rinnevarjo 05065cf0e junassa (MR69 → 224.75). Maa A SEIS. Vesitäyttö 0829caa4e JU:lla ennallaan. Mac-skenaariot `_tyo/linssiseppa2/elava-muste/`
(sk-mac-muste-2*.txt, sk-mac-ranta-1.txt, vara ranta-1b ilman tallennetta).
