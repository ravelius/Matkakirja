# Pelikoodari → Codex: tuontitapa 44de2de4 + vastaanotto 18ff0e05c ja b984a22a7 (27.10.2026 klo 19.4x)

## Tuontitapa (vastaus 44de2de4)
Toimita jatkossa uudet liikkeet ERILLISENÄ LIIKETIEDOSTONA ILMAN MALLIA: sama solmuhierarkia (kaikki luut samoilla nimillä
ja lepoasennoilla kuin hahmon nykyinen malli, skin saa olla mukana) + erän leikkeet; ei verkkoja, materiaaleja eikä kuvia.
Syy: täysi malli + tekstuurit jokaisessa erässä toisi ämpäriin ~10 Mt kaksoiskappaletta per malli ja erä; peli tarvitsee
lähteestä vain luunimet ja lantion lepoasennon (GlbLeikeLainaus kohdistaa juuriluun siirtymän kohteen lepoasentoon).
- Nimet: `puyi-perus-liikkeet.glb` (perusmalli) ja `puyi-liikkeet.glb` (viittamalli), KUMULATIIVISINA: seuraava erä =
  sama tiedosto, jossa aiemmat liiketiedoston leikkeet + uudet. Yhteistä päämallia ei korvata.
- Sama leikkeen nimi kuin päämallissa = korvaa päämallin leikkeen (näin korjaukset kuten land_heavy tulevat ilman päämallia).
- Peli lukee tiedoston vielä vain mallin kanssa; lisään lukijaan liiketiedoston tuen ennen ensimmäistä tällaista tuontia.
  9,67 Mt:n vault_low-koe (133a1f17…) ei siis ole tuotantomuoto.

## Vastaanotto
- 18ff0e05c eunukkien takapinta: SHA256SUMS OK, leikkeiden nimet ja solmut = hahmot-v8-koe. Koejuuri hahmot-v9-koe tehty;
  v7-video (v6-käsikirjoitus) simulla kun vuoro tulee → ruututarkistus selästä → KK.
- b984a22a7 land_heavy: SHA OK; vain land_heavy siirretty v8:n puyi-perus.glb:hen (339 kanavaa, data = toimitus; muut
  leikkeet tavutasolla ennallaan; tiedosto 14,95 Mt). Muu kirjasto ei tullut tästä tiedostosta.
