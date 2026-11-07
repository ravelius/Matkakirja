# Postivahdin luovutus 7.11.2026 klo 22.25 (konteksti 27 %, oma raja 30 %)

Postivahti = Sonnet 5.5, checkout /Users/Shared/Claude/Matkakirja-posti, id local_afae44f0-722b-4541-a3b8-30ca4f76543b. Lue NOLLAUS.md ja KIERROS.md (Hälytysrajat).

## Kulku (toimii, käytä sellaisenaan)
1. Rooli lähettää "LUOVUTUS VALMIS <sha>" → kotikansio: `zsh tools/paivita-kotikansiot.sh --aja --uusi-haara <roolin kansio>` (zsh, ei bash).
2. Odota, kunnes get_session isRunning=false (Monitor sleep 40–50, ei vapaata sleepiä). Roolit lähettävät usein korvaavan luovutuksen (uusi sha): käytä AINA uusinta.
3. Jos list_events ei jo näytä 0 viestiä: lähetä `NOLLAUS: kutsu nyt clear_session self. Älä tee mitään muuta.` (osa nollaa itsensä jo ennen sitä; 0 viestiä + idle = nollattu).
4. Nollauksen jälkeen (list_events 0, idle): vakioaloitusviesti NOLLAUS.md:n mukaan (git show <sha>:<luovutustiedosto> kokonaan, osoitekirja, PT enintään 3 riviä, jono luovutuksen mukaan).
5. Rivi PT:lle (local_5df52e10-10e4-4b72-9554-0049db300dfe): `nollattu <rooli> (<sha>)`.
KK (local_37f7c945-e1a0-4638-90b8-93c389a36fbe) nollaa itsensä omistajan kortilla ja lähettää sanatarkan aloitusviestin; lähetä se sellaisenaan, kun list_events = 0. KK kytkee RC:n itse. PT:n oma nollaus: PT tekee luovutuksen, minä lähetän NOLLAUKSEN ja aloitusviestin.

## Tila 22.25
- Tänään nollattu ja aloitusviesti lähetetty: LAV (cc1b8672c), VS (86f09b980), NS (fbb82e71e, 67933cdb8), JU (5385311a5), PK (283a7eb52), KS (50c348c25), NUI (aab93be4f), KK (21.41), PT (b32e6be44).
- AVOIN: Natiiviseppä LUOVUTUS VALMIS 73725ea1b (haara natiiviseppa-luovutus-20261107-2223, viesti-natiiviseppa-luovutus-20261107-2223.md). Oli käynnissä 22.24; odota idle → NOLLAUS → aloitusviesti (jono: luovutuksen mukaan; iPad-tulokset JU:lta eivät heti). NS-kansio: Matkakirja-3d-selvittaja (osoitekirjan mukaan).
- Osoitekirjan kansiot eivät aina täsmää paivita-kotikansiot.sh:n nimiin (NS = Matkakirja-3d-selvittaja, ei -natiiviseppa).
- Työpuu: tools/paivita-kotikansiot.sh muutettu (ei commitoitu), useita seuraamattomia viesti-*-tiedostoja docs/raportit/. Älä committaa settings-tiedostoja.

## Huomiot
- Konteksti 20 % = pehmeä, 30 % = oma raja → luovutus + clear_session self. Aloitusviestin lähettää tällöin uusi sessio itse (lue tämä tiedosto).
- Hook-rivit (TYÖLISTA, KONTEKSTIVAHTI) tulevat joka promptilla; työlistan tilannerivit eivät ole Postivahdin työtä.
- list_events: "running" + paljon viestejä = ei vielä nollattu; pienet määrät + assistant-kutsut = uusi sessio jo työssä.
