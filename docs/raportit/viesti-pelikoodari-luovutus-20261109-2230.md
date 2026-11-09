# Pelikoodari: luovutus 09.11.2026 klo 22.30

Korvaa kaikki aiemmat. Nollaus kontekstivahdista ennen isoa erää. Edellinen: `git show ebb123b58:docs/raportit/viesti-pelikoodari-luovutus-20261109-2125.md`
(kaikki sen kohdat hoidettu: drone 7227a9788 kuitattu, junassa 224 = b804a87d6). Kuvat ≤ 1000 px, laajat haut Sonnet-agenteilla.
Unity-työpuu /Users/Shared/Claude/wt/proto-pelikoodari-juoksu (remote natiivi-backup), nyt haaralla pelikoodari/drone-lahelle = dc2605d31.
Viestit: mcp__ccd_session_mgmt__send_message session-id:llä (ToolSearch). Roolit eivät viesti KK:lle.

## TEHTY TÄSSÄ VUOROSSA
- KIERTOTÄRINÄ (OMISTAJA 22.18): syy pallo TrueOriginissa (float 0,5 m; laskettu 324 m:ssä 1,2–1,4 px/kehys). Tein ehdokkaan
  dc2605d31 (natiivi-backup pelikoodari/drone-lahelle ja pelikoodari/lahiorigo-ehdotus): Kartta/LahiOrigo.cs siirtää georeferenssin
  Transformia kameran alle < 1,2 km, kamera doublena, komento `lahiorigo auto|aina|pois`. Tiedot:
  /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/kierto-tarina/LUE.md, skenaario sk-kierto-tarina.txt.
  PT 22.2x/23.0x: KK:n kortti 22.22 → tärinäkoe on NS:n; dc2605d31 on NS:n ehdokas. ÄLÄ JATKA ORIGOA. JU:n A/B-ajo saa valmistua,
  tulokset NS:lle (JU:lle sanottu; kopio PK:lle). Ei asennuslinkkiin.
- JuoksuKuvaEsipurku.Paalla = false b804a87d6:ssa (Assets/Matkakirja/Scripts/Juoksupeli/JuoksuKuvaEsipurku.cs:24) – tarkistettu PT:n pyynnöstä.

## JONO
1. JUOKSUPELIN LEIVOTTU LATAUS (PT 23.0x, OMISTAJAN PYYNTÖ 22.24, toistaa 7.11. 23.05: "Miksi juoksu peli kestää ladata niin pitkään.
   Saako nopeutettua?"). Tavoite: juoksupeli aukeaa muutamassa sekunnissa, latauskuvaa ei ehdi katsoa, ei nykimistä.
   PT:n päätös: palatsi leivotaan etukäteen laitteen valmiiseen muotoon (valmiit verkot + ASTC-kuvat, esim. AssetBundle/oma paketti),
   laite vain lukee – ei glb-rakennusta (1 895 verkkoa), PNG-purkua (422) eikä pakkausta (341) joka avauksella. Paketti aluksi
   sovelluksessa; ämpäriin (IsoSisalto) vasta NS:n osan 3 rajapinnalla. Pohja 224 (b804a87d6), haara pelikoodari/juoksu-leivottu
   (EI drone-lahelle-haaran päälle: siinä on lähiorigo). Mittaus ennen/jälkeen iPadilla (+ iPhone, kun omistaja studiolla) JU:n
   vuorolla; rivi PT:lle luvuista.
2. Kiertotärinä: vain jos NS/PT pyytää (JU:n tulokset menevät NS:lle).

Testit: `sh Peli-testit/unity-tarkistus.sh` (työpuussa, sh ei zsh); web: `node --test tests/<…>.test.mjs`.
