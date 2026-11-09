# Pelikoodari: luovutus 09.11.2026 klo 21.25

Korvaa kaikki aiemmat. Nollaus kontekstivahdista (28 %). Edellinen: `git show 873e2549d:docs/raportit/viesti-pelikoodari-luovutus-20261109-1859.md`
(kaikki sen kohdat hoidettu). Kuvat ≤ 1000 px (PIL-arkki scratchpadiin), laajat haut Sonnet-agenteilla.
Unity-työpuu /Users/Shared/Claude/wt/proto-pelikoodari-juoksu (remote natiivi-backup), nyt haaralla pelikoodari/drone-lahelle.
VIESTIRAJA: SendMessage pysähtyi 21.1x ("Paused") → käytä mcp__ccd_session_mgmt__send_message (ToolSearch) session-id:llä.

## TEHTY TÄSSÄ VUOROSSA
- Kensington 7cf4f1f10 Mac ✓ (lokit/pk-kensington-7cf4f1f10): 2. avaus "ei enää soi → alkaa alusta". PT kuittasi junaan 224.
- TEMPLE-TORNI (OMISTAJA 19.06, faktavirhe): CDN tarjosi vanhalla nimellä 31.10. torikuvaa, alkuperä ja repo ritarikuvaa.
  PT valitsi B: PR ravelius/Matkakirja#6521 squash d612af9fa. Torikuva on nimellä ihme-temple-torni-loistoaika-v2.jpg (vie-assetit ennen
  mergeä), selite/lyhyt/ihmeLahde vaatetorin mukaan, fokusvirta-testissä IHMEET_V2_20261109. Sisältö v1032 tarkistettu. Muut ihmekuvat:
  CDN = repo (md5). Tiedot: proto-3d/_tyo/pelikoodari/temple-kuvateksti-20261109/LUE.md.
- KAKSI TAPPIA (OMISTAJA 20.44): olivat jo junan 224 kärjessä 39204416d. iPhone-ajo lokit/pk-kaksi-tappia-iphone-39204416d ✓ → PT.
- DRONE + TÄHTÄIN (OMISTAJA 21.03 ja 21.11): natiivi-backup pelikoodari/drone-lahelle = 39204416d +
  - cd0edaa29 PalloKierto.DroneSyvyys 5 (LahinSallittu, TappiZoom, PaivitaDroneLattia): vasen tappi 5× yleistä lähintä lähemmäs (324 m).
    Raja oli MinKorkeus, ei NUI:n orbit (NUI:lle ilmoitettu).
  - 6803ff5a6 esittely vertaa korkeutta h / AjonZoomKerroin.
  - 3f58830ff KameraTappi: tähtäin näkyy tappien ajan + 2,5 s (häivytys 0,8 s) aina RuutuPiste-paikassa. Liiketapin aikana se näyttää
    Keskipisteen, ja oikea tappi tähtäimen näkyessä kiertää "tähtäimen pisteen" ympäri.
  - 7227a9788 PalloKierto.TapitOhjanneet: esittely ei tulkitse tappien korkeutta lähdöksi (iso kuva ei tule tähtäimen päälle).
  Ajo lokit/pk-drone-lahelle-iphone-7227a9788 ✓ katsottu ja kuitattu PT:lle 21.24. JU kääntää 7227a9788:n asennuslinkkiin
  PT:n kuittauksella (cd0edaa29, 6803ff5a6 ja 3f58830ff EIVÄT jakoon). Skenaario: proto-3d/_tyo/pelikoodari/drone-lahelle/sk-drone-lahelle.txt
  (Mac-ajossa "komento lahizoomi 3" = laitteen puhelinraja).

## JONO
1. Odota PT:n vastausta drone 7227a9788:aan: junaan 224 ja asennuslinkki. Jos omistaja antaa palautetta laitteelta, se korjataan samaan haaraan.
2. PT 21.2x (KK): "karkea/litteä" EI todistettu – drone-ajot olivat Mac-esikatselussa ILMAN talot-kansiota (3D-talot puuttuivat).
   Lähikuviin aina talot-kansio mukaan (muisti mac-esikatselu-talot-kansio). Kuittaus pysyy, uutta ajoa ei nyt. Syvyys: PalloKierto.DroneSyvyys (5).
3. Jos ei muuta: "JONO TYHJÄ: Pelikoodari" PT:lle.

Testit: `sh Peli-testit/unity-tarkistus.sh` (työpuussa, sh ei zsh); web: `node --test tests/<…>.test.mjs`.
