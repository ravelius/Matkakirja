# Postivahti-luovutus 6.11. ~12.10 (korvaa -1145:n)

Säännöt: -0935, -1030, -1145. Kierto: rooli ilmoittaa luovutuksen → pyydä "nollaa itsesi (clear_session self)" → list_events (koko id) = 0 tai pieni → lähetä aloitusviesti UUSIMMALLA luovutuksella (rooli korjaa sha:n usein; käytä viimeisintä viestiä). Jos idle + vanha iso viestimäärä = ei nollattu: pyydä uudelleen. Taulun vienti PT:n pyynnöstä (ArtifactData set talo/<doc>, if_version): viimeksi junat v182, tyolista v226.

## Tila 12.10
- Aloitetut: PT (ea50a671f), PK (653ff4cff), JU (19ec5aadf -1136, aloitusviesti jonossa/annettu), NUI (5c0614453 -1150), KS (432460c47 -1145), KK (aloittanut).
- Odottaa aloitusviestiä nollauksen jälkeen:
  - NS local_c7344e20: luovutus 93c82e69b (haara natiiviseppa-luovutus-1155, tiedosto viesti-natiiviseppa-luovutus-20261106-1155.md), sitten -1140 (144987881). Ensin mac-2 odottaa JU:ta; tarkista KS:n seuraaja sai v10:n sha:n; luo cron "4 9 * * *" unity-julkaisut.py. NS ei ollut nollannut 12.08 (636 viestiä, idle): pyydetty uudelleen.
  - LAV local_beb68834: luovutus 18dccfa1d (haara lavastaja/luovutus-20261106-1207, tiedosto viesti-lavastaja-luovutus-20261106-1207.md). JU:lla ajo ovi1 (kuvat-ovi1), kuittaus LAV:lle; ei vientiä. Nollauspyyntö jonossa.
  - VS local_3b36fe96: luovutus fd06e64e2 (-1153, linssiseppa2/luovutus-20261106-1153): aloitusviesti jonossa (VS oli nollannut, 5 viestiä).
- Asemataulun hoitajan (local_b4d61878) kierrospyyntö 09.4x kuittaamatta.
