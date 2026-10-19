# Lavastajan (ent. Linnanrakentaja) luovutus 19.10.2026 klo 09.0x (Opus, medium)

Edellinen: `viesti-linnanrakentaja-luovutus-20261018-iltapaiva.md` (368de7369). Viestit send_messagella session id:llä
(`/Users/Shared/Claude/osoitekirja.md`, tilinvaihto gmail-tilille 19.10.); PT:lle enintään 3 riviä, polut absoluuttisina. Ei käynnissä olevia ajoja.

## Rooli (PT: OMISTAJAN PÄÄTÖS 08.48)
LAVASTAJA, kansio ennallaan: Louvre loppuun → Codexin mallien kokoaminen kohtauksiksi (myös Olavinlinnan uudet huoneet, Projektisepän kanssa)
→ museon kehysten pinnat (ent. Siirtosepän alue). Malleja ei tehdä itse (omistaja 08.28: uudet 3D-mallit Codexilta).

## Tehty 19.10. aamulla
- **Kehykset v11b** (pehmennys 2,5 px + jakso 5,0): proto linnanrakentaja/kehykset-v11b-204 86dd2565e, simu 29ed995c5 →
  `_valmiit/louvre-kehykset-201/kehykset-v11b-204/`. Lähellä sulanut pinta, ei helminauhaa → **PT: v10 pysyy, kehysten iterointi päättyi.** Haaraa ei mergetä.
- **Louvren sali-v2q** (GG:n poikittaiskaaret 0,55 → 0,90 m, harmaat kyljet, kulta 0,18/0,24 m; kasettikaaret 0,3 → 0,2 m):
  proto linnanrakentaja/sali-v2q-204 **3c8b4c195** (Museo 181/181, Ranska 8/8, tarkista 0), paketti `_valmiit/taidemuseo-ranska-v2q-vienti-20261019`
  (JU vienyt 07.52), simu 8e3d48365 → `_valmiit/louvre-v2q-204/` (HAVAINNOT.md). Ehdotettu PT:lle junaan 204 → NS.
  Generaattori `_tyo/linnanrakentaja/louvre-pilotti-v2k/` (runko/lahde/sali_blender.py; varmuuskopio .ennen-v2q, lokit/aja_v2q.zsh).
- **Codexin 3D-toimitusmuoto + tuontiportti**: PR https://github.com/ravelius/Matkakirja/pull/4895 (491f8d5cb), worktree
  `/Users/Shared/Claude/wt/linnanrakentaja-codex-3d`. Ajo: hahmot v1 3/3 läpi (HUOM juuren skaala), maailma v4 9/10, sisapiha.glb hylätty (1 721 piirtoa).
  Siirtyy mergen jälkeen Työkalusepälle; poista worktree mergen jälkeen (`tools/uusi-worktree.sh --poista linnanrakentaja-codex-3d`).

## Avoimet
- `wt/proto-linnanrakentaja-kehykset` (haarat kehykset-v11b-204, sali-v2q-204): poista, kun v2q on junassa (Postivahdille luvattu).
- `_tyo/linnanrakentaja`: kehykset-v11b-204-app (voi poistaa), sali-v2q-204-app (pidä kunnes juna 204 vahvistettu), taidemuseo-203-app, louvre-v2k-202-app (vanhoja).
- Seuraavaksi PT:n jako: Codexin mallit kohtauksiksi / Olavinlinnan huoneet.

## Opit
- Pehmennys ei korjaa liian pientä lähdettä: kukat ~30 px lähteessä → rae tai sulanut muoto. Tarvitaan isompi lähde tai mallinnettu pinta.
- Holvin ylimmät kaaret näkyvät alhaalta lähinnä kylkinä: kontrasti kylkiin (materiaali), ei pelkkä syvyys.
