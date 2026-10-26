# Karttasepän luovutus 26.10.2026 klo 16.15 (PT 16.13: tilinvaihto)

Lue ensin CLAUDE.md, tuotannonohjauksen osio 0 (`git show origin/main:docs/tuotanto/tuotannonohjaus.md`) ja
`node tools/raamattu-luku.mjs 7.47`. Edellinen luovutus: 5b5377cdd (`viesti-karttaseppa-luovutus-20261026e.md`). Se on yhä
voimassa kokonaan: commitit, AJO-ohje, raportointi, AUKI-kohdat ja Tripo-vertailu. Tässä luovutuksessa on vain muutokset.
VIESTIT aina send_messagella session id:llä (`/Users/Shared/Claude/osoitekirja.md`), PT:lle ≤ 3 riviä.

## SEURAAJALLE ENSIN: omistajan iPad-palaute (15.32) ennen/jälkeen, kuvat ja video kesken
- Viisi palautekohtaa + 4fccd2490 ovat haarassa `karttaseppa/elava-kartta` (wt /Users/Shared/Claude/wt/proto-karttaseppa-elava-kartta,
  kärki **4fccd2490**, puhdas): rata ohueksi (20dc596d2), isot kaupungit aiemmin (955348566), nappula ja piste maanpinnalle
  (f440e9681), 3D-koko sidottu karttaan (70528e9ce), panoroinnin nykiminen (d7e3df9de), Lontoon elävät sarjassa (4fccd2490);
  lisäksi 6922da400 (sarjan 3D-merkit näkyviin). Yksityiskohdat: luovutus 20261026e.
- KÄÄNNÖS: d7e3df9de valmistui 16.03, mutta sitä EI ajettu. 4fccd2490:n käännös kuoli 16.03 JU:n nollaukseen. JU käynnisti sen
  uudelleen 16.12 L1:llä (Lavastajan esikatselun perään, arvio ~16.35) samaan `_tyo/karttaseppa/elava-kartta-app`. JU ilmoittaa
  KÄÄNNETTY + SIMU NYT 00CF62C2. Tarkista `<app>/kaannos.out`: rivillä pitää olla "KÄÄNNETTY 4fccd2490".
- ENNEN-osa ajettiin 16.10 (`ajo-palaute.zsh ennen`, tripo-vertailu-app c3dbcfea5), loki
  `proto-3d/_tyo/karttaseppa/elava-kartta-20261025/ajo-palaute-ennen-1610.log`. Tarkista lopusta "AJO palaute-ennen … 0" ja
  kuvat todistusajon kansiosta. Jos ajo katkesi tilinvaihtoon, aja se uudelleen: `zsh …/ajo-palaute.zsh ennen`.
- Kun 4fccd2490 on käännetty: `zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/elava-kartta-20261025/ajo-palaute.zsh jalkeen`
  (taustalle, ~6 min) → SIMU VAPAA JU:lle (local_d8cad7de-3ff8-4f4b-8787-baa80836e175). JU:lle on kerrottu 16.10, että
  d7e3df9de:tä ei asenneta ja että SIMU VAPAA tulee vasta JÄLKEEN-ajon jälkeen.
- Raportointi kuten luovutuksessa 20261026e: kuvaparit, video, kehysajat ja höyrylaivan tila. Haara ja SHA NS:lle (junaan 211)
  ja PT:lle; Lontoo-uusinta LT:lle.

## Siivous
- Oma selainesikatselu (kanahiro.github.io) suljettu. Työpuussa on vain `.claude/settings.local.json` (+ omistajan
  `.ennen-kevennysta`-varmuuskopio, ei kosketa).
