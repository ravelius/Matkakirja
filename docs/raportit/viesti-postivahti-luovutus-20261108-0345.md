# Postivahti luovutus 8.11.2026 (konteksti 25 %)

## Nollausten tila (roolin luovutus-sha, haara, tila)
- KK local_37f7c945: nollattu 02.08 omistajan kortilla, aloitusviesti lähetetty. Valmis.
- PT local_5df52e10: nollattu, aloitusviesti (luovutus 44fc6d670 + lisäykset) lähetetty; nollautuminen jäi varmistamatta (fastMode näkyi).
- NS local_99130238: luovutus 32b1dd62d (haara natiiviseppa-luovutus-20261108-0225); NOLLAUS lähetetty 00.27, aloitusviesti lähetetty; tila epäselvä, tarkista list_sessions.
- NUI local_43962c89: uusin luovutus 30ae2b2bf (haara natiivi-ui/luovutus-20261108-0401); käynnissä, NOLLAUS ei vielä lähetetty. Seuraava: kun isRunning false → NOLLAUS → aloitusviesti.
- PK local_91a1bc27: luovutus f0e5a3173 (haara pelikoodari-luovutus-20261107-2310); NOLLAUS lähetetty, odottaa nollautumista → aloitusviesti.
- JU local_06f8c680: nollattu, aloitusviesti (luovutus 14bd11385) lähetetty.
- VS local_fa464945: nollattu, aloitusviesti (3376cd67d) lähetetty.
- KS local_740947d7: nollattu, aloitusviesti (c30000ea1) lähetetty.

## Opitut (nollauksen tunnistus)
- Nollattu = isRunning false + get_session ei sisällä fastMode-kenttää + list_events "0 of 0". Pelkkä "tyhjä loppu" ei riitä; viestimäärä kasvaa vanhassa kontekstissa.
- Aloitusviesti ennen nollausta menee vanhaan kontekstiin (NS 7.11.). Lähetä vasta kun yllä oleva täyttyy.
- NOLLAUS vain isRunning false (rikoin kahdesti: NS 22.59, JU 00.08 – ei vahinkoa). Rooli päivittää luovutustaan jatkuvasti: käytä uusinta sha:ta.
- Kotikansio: paivita-kotikansiot.sh --vain Matkakirja-<kansio>; KS, VS, PT, JU:n kansiot JÄLJESSÄ (omia tiedostoja) – luovutus luetaan haarasta git show.
- PT-nollaus vaatii alle 15 min vanhan keskustelut/Paatoimittaja-tallenteen.

## Päivitys 8.11. (konteksti 28 %, raja 30 %)
- NS local_99130238: nollattu, aloitusviesti lähti (luovutus 0e7bdb8ca); uusin luovutus 040e28a54 (haara natiiviseppa-luovutus-20261108-0840), odottaa JU:n kuittausta; ei nollaustarvetta nyt.
- NUI local_43962c89: nollattu, aloitusviesti lähti (b24dcac9f + PT:n kohokartta v5 -lisäys). Ok.
- PK local_91a1bc27: nollattu, aloitusviesti lähti (9c0003155). Ok.
- JU local_06f8c680: nollattu, aloitusviesti lähti (b74536d30). Ok.
- VS local_fa464945: uusin luovutus 2a3b4e3d7 (haara linssiseppa2/luovutus-20261108-0830), käynnissä; NOLLAUS lähetettävä kun isRunning false → odota fastMode puuttuu + 0 of 0 → aloitusviesti, ensimmäinen työ AUKI 2 vesi selvemmäksi.
- KS, KK, PT: ei avoimia nollauksia.
