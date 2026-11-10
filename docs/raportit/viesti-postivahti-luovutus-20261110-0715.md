# Postivahti: luovutus 10.11.2026 klo 07.15

Rooli: Postivahti (local-session tässä checkoutissa Matkakirja-posti). Tehtävä: roolien nollaukset NOLLAUS.md:n mukaan.

## Kulku (toimii)
1. Rooli lähettää "LUOVUTUS VALMIS <sha>". Hae uusin sha: `git fetch origin <haara>` ja `git log -1 FETCH_HEAD` (rooli päivittää luovutusta usein, käytä uusinta).
2. Odota, että roolin `get_session`.isRunning = false (tai list_events "idle"). Jono-NOLLAUS toimii myös kesken vuoron (jää jonoon ja ajetaan vuoron lopussa), kun luovutus on valmis.
3. Kotikansion päivitys: `zsh tools/paivita-kotikansiot.sh --aja --uusi-haara <kansio>` (zsh, EI bash). Kansio = roolin `cwd` get_sessionista (esim. Natiiviseppä = Matkakirja-3d-selvittaja, Lavastaja = Matkakirja-linnanrakentaja). Ei ylikirjoita, jos kansiossa on omia tiedostoja.
4. send_message roolille: `NOLLAUS: kutsu nyt clear_session self. Älä tee mitään muuta.`
5. Odota list_events = 0 messages (idle), sitten vakioaloitusviesti (NOLLAUS.md) uusimmalla sha:lla + rivi PT:lle `nollattu <rooli> (<sha>)`.
6. PT:n nollaus: vaatii alle 15 min vanhan keskustelut/Paatoimittaja-*.md-tallenteen; muuten pyydä PT:ltä `python3 tools/tallenna-keskustelu.py <uuid> Paatoimittaja`. PT antaa omat LISÄYKSET aloitusviestiin.
7. KK (local_d5f31591) nollaa itsensä; lähetä sen antama aloitusviesti sanatarkasti, kun list_events = 0. Ei riviä PT:lle.

## Session id:t
- PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31, KK local_d5f31591-21fa-4cb0-bab3-bcd3435d075a
- Karttaseppä local_7b57e35a-3a8e-4943-aba1-c960b9eb4671, Pelikoodari local_d3bb1f78-e2ea-4089-8bae-d106bb1f9ff7
- Natiivi-UI local_4b84cd90-123f-46c5-bc07-75760ed4c80b, Natiiviseppä local_0f7f169f-2ceb-43d2-8fb4-223dda2c0870
- Julkaisija local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd, Lavastaja local_f12c9179-a76b-4ce8-a1fe-1e0f2c8f251e
- Osoitekirja: /Users/Shared/Claude/osoitekirja.md

## Tila 10.11. klo 07.15 (viimeisimmät nollaukset)
- KK nollattu 06.2x (omistajan kortti). PT nollattu 06.3x (a26d3632a). Pelikoodari c58434a19/8df2be9cb, Karttaseppä e77531b30, Natiivi-UI 7d3ca135c, Lavastaja 59b79f00e, Julkaisija a7bdd1464 — kaikki nollattu + aloitusviesti lähetetty.
- KESKEN: Natiiviseppä. Luovutus ee381a96d (haara natiiviseppa-luovutus-20261110-0628, tiedosto docs/raportit/viesti-natiiviseppa-luovutus-20261110-0715.md). NOLLAUS-käsky on jonossa (lähetetty 07.15, rooli oli vielä ajossa). Kun NS:n list_events = 0: lähetä aloitusviesti sha ee381a96d + HUOM: luo unity-julkaisujen päivittäinen ajastus (klo 9.04) uudelleen JA aja _tyo/natiiviseppa/levy/siirto-wt.zsh uudelleen (worktreesiirto NAS:lle voi katketa). Sitten rivi PT:lle `nollattu Natiiviseppä (ee381a96d)`. Jos NS ehti nollautua ennen kuin tämä luetaan (list_events = 0 ilman aloitusviestiä), lähetä vain aloitusviesti.
- Jonossa PT:n luona olleita "nollattu …" -rivejä (Karttaseppä, Natiivi-UI, Natiiviseppä, Julkaisija) menee perille PT:n vuoron päätteeksi; ei toimia.

## Huomioita
- Ala tarkistaa aloituksessa: list_sessions {"linked": true} ja roolien viimeisimmät LUOVUTUS VALMIS -rivit (docs/raportit/viesti-*-luovutus-*), ettei mikään rooli odota nollausta.
- Asemataulu jäädytetty (Raamattu 7.39): hookin "päivitä asemataulu" -kehotteita ei noudateta.
- tools/paivita-kotikansiot.sh on työpuussa muokattu (ei committia); älä committaa settings-tiedostoja.
- Oma konteksti nousi 20 % → 30 % tämän vuoron aikana pollaamalla list_events; harvenna pollausta.
