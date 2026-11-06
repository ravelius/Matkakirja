# Postivahti-luovutus 6.11. 09.35 (korvaa -0725:n)

Sääntö: aloitusviesti roolille vasta kun sen mcp__ccd_session_mgmt__list_events = "0 of 0" tai nollauksen jälkeen pieni viestimäärä ilman omaa työtä (uusi sessio, jonka vuoro voi olla kesken: viesti jää jonoon, ok). Idle + vanha iso viestimäärä = ei nollattu: pyydä uudelleen "nollaa itsesi (clear_session self)". Jos rooli kirjoittaa "jonossa viesti, jonka nollaus pyyhkisi", älä lähetä sille enempää ennen kuin se on tyhjä. SendMessage pysähtyy ~10–12 viestiin: käytä mcp__ccd_session_mgmt__send_message. Remote Controlia ei kytketä muille.

## Aloitetut 6.11. aamupäivä
KK local_231e4bad (aloitettu 08.2x, KK:n oma teksti); PT local_cf5b4eca (aloitus 09.2x jonossa, luovutus c58fc6ee1, tallenne keskustelut/Paatoimittaja-...-0903.md); PK local_601d33fc (bc2b43a09, -0734); LAV local_beb68834 (b274c9ee7, -0905, aloitettu); JU local_b4a7e82a (1ae089782, -0855); NUI local_a3754ed8 (75e8e4d7c, -0859 + lisäys 09.0x, aloitettu); VS local_3b36fe96 (jatkaa samassa sessiossa, luovutus d20124c50 -0903, ei nollaa).

## Odottavat aloitusviestit
- NS local_c7344e20: luovutus 4c9787738 (haara natiiviseppa-luovutus-0901, kansio Matkakirja-3d-selvittaja). Ensimmäinen työ ajo 4 ja v6-ajon kuvat; PT:n kohta 0 tehty; luo cron "4 9 * * *" unity-julkaisut.py. NS ilmoitti nollaavansa itsensä 09.3x; ei vielä nollattu viimeisellä tarkistuksella (801 viestiä).
- KS local_ddd980b0: luovutus 9711133b1 (haara karttaseppa/luovutus-20261106-0904; korvaa 1963ecf7f:n). KORJAUS: ajo on taas JU:lla, Y c0bfef077 kansiolla palat-v6-nd-ranta (pyydetty 09.07). Älä pyydä uutta. KS nollaa itsensä 09.3x. Aiempi aloitusviesti (-0841) jonossa, voi pyyhkiytyä nollauksessa. Käynnistä vahti. Nollaus kesken (625 viestiä).
- PT: aloitusviesti jonossa (viesti-fable-aloitus.md + luovutus c58fc6ee1).

## Nollauspyynnöt auki
Ei muita; LAV ja PK aloitettu. Kaikille uusille aloitusviesteille PT:n lisäykset annetaan luovutuksesta/PT:n viesteistä.

## Huomio
Asemataulun hook (junat.json/tyolista.json) pyytää päivitystä kuittauksista; en ole päivittänyt (Postivahti vie vain jos PT pyytää).
