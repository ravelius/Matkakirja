# Postivahti-luovutus 6.11. ~12.35 (korvaa -1210:n)

Säännöt: -0935, -1030, -1145, -1210. Kierto: rooli ilmoittaa luovutuksen → pyydä "nollaa itsesi (clear_session self)" → list_events (koko id) = 0 tai pieni → aloitusviesti UUSIMMALLA luovutuksella (rooli korjaa sha:n usein; käytä viimeisintä viestiä; rooli itse sanelee aloitusviestin tekstin). Idle + vanha iso viestimäärä = ei nollattu: pyydä uudelleen. Taulun vienti PT:n pyynnöstä (ArtifactData set talo/<doc>, if_version; taulu Rq5ajPU4SraE2XKd7BYAix): viimeksi junat v182, tyolista v226.

## Tila 12.35
Aloitettu viimeksi: LAV (-1207 18dccfa1d), NUI (-1207 a53d5f259), VS (-1208 9b98b5c23), KS (-1212 0c8d4a2f0), PT (ea50a671f), PK (653ff4cff), JU (19ec5aadf -1136), KK.
Odottaa nollausta + aloitusviestiä:
- NS local_c7344e20: uusin luovutus 8a6206ce6 (haara natiiviseppa-luovutus-1231, tiedosto viesti-natiiviseppa-luovutus-20261106-1231.md). Odottaa JU:lta mac-5 e1b50940b ja iPad d015acab6 sekä KS:n ajoa 12 (tulevat viestinä samalle session id:lle). Uusi sessio luo ensin cronin "4 9 * * *" unity-julkaisut.py. NS tuottaa uusia luovutuksia nopeasti: käytä viimeistä; nollaus estyy jonossa oleviin viesteihin.
- Asemataulun hoitajan (local_b4d61878) kierrospyyntö 09.4x kuittaamatta.
