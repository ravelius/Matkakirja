# Postivahdin luovutus 3.11.2026 klo 21.00 (oma nollaus, konteksti ~28 %)

Pysyvä kulku: KIERROS.md, NOLLAUS.md (tools/tyotavat/, kotikansion haara koti/Matkakirja-posti = origin/main), aiemmat luovutukset viesti-postivahti-luovutus-20261103-1755.md ym.
Oma id: local_1f31f830-9df5-41c1-8992-172e100af57f. PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31, KK local_d5f31591-21fa-4cb0-bab3-bcd3435d075a.

## Tehty 18.05–21.00
- Nollattu ja aloitusviesti lähetetty (luovutus-sha): PK 7acd46751 → 8013aa09e → e0076a23e → 03f1f2531 (aloitusviesti lähetetty 20.3x); JU d86c923d9 → af43742a2 → d02690bcd; VS e67a28d34 → 9cad5440e → b0d7c08fd → 71cd95ed5; NUI 90fb13465 → 84d88398e → 0989ccdab; NS 7dde0bbdc → a02e28b03 → 10a8e5705 (aloitusviesti jonossa 20.5x); KS 8228cd8fa → c2b9bb83f → 63cd77b8b (aloitusviesti jonossa 20.5x); LAV f5cc0ece2; PT 355669e9e → 4348d6ed0 (PT:n oma aloitusviesti jonossa 20.3x, PT käynnissä); KK nollautui itse 19.55 omistajan kortilla, aloitusviesti lähetetty kahdesti (clear estyi, kun viesti oli jonossa).
- Opittua: (1) clear_session estyy, jos kohteen jonossa on viesti → lähetä NOLLAUS-viesti vasta, kun get_session isRunning=false, ja aloitusviesti kun list_events = 0 (tyhjä historia "showing 0 of 0" tai running + 0 messages = nollaus tapahtunut). (2) paivita-kotikansiot.sh vain `zsh`:lla. (3) Kotikansio-haara jää JÄLJESSÄ, jos rooli on committoinut luovutuksen sinne; se on kunnossa. (4) Natiiviseppän kotikansio on Matkakirja-3d-selvittaja (osoitekirja).
- Codex odottaa: tripo3d-pronssit lisätty tools/tyotavat/kuitatut.txt:hen (PT:n kuittaus oli eri nimellä); vahti odottaa vastausta nimellä `<lähettäjä>-codex-<aihe>-…` (aihe = nimen 3. osa). Tiedosto kuitatut.txt on committoimatta.
- JU:n 18.50 vahinko (taustaprosessit kuolleet): Postivahdilla ei taustaprosesseja; kierros ja codex-odottaa ajetaan session sisältä; taulun vienti tauolla.

## Voimassa olevat linjaukset
- Rajat: PK, NUI, JU kovaan 35 %:iin; Postivahti oma raja 30 %. PT:n ja KK:n nollaus pyynnöstä (KK vain omistajan kortilla, KK tyhjentää itse).
- Aloitusviestin vakioteksti NOLLAUS.md:ssä; lisää "Prosessit vain omalla pid:llä (Raamattu 12.4)" JU:lle ja Lavastajalle ja roolille, jolla ajoja.
- Keisarin noston VIKA tehty (NUI 200f73222); NUI:n luovutuksessa 84d88398e "kesken" on vanhentunut.

## Seuraavaksi
1. Tarkista list_events, että NS, KS ja PT ovat käynnistyneet (aloitusviestit jonossa 20.3x–20.5x); RC päällä: PK, JU, VS, NUI, NS, KS, LAV.
2. Lue tämä + KIERROS.md + NOLLAUS.md; ScheduleWakeup-kierros 10 min välein (prompt: "Lue /Users/Shared/Claude/Matkakirja-posti/KIERROS.md ja aja kierros sen mukaan").
3. Joka kierroksella: PT/KK-kontekstit, levy, codex-odottaa.py (python3 -I tools/tyotavat/codex-odottaa.py), roolien konteksti yksi kerrallaan.
4. LUOVUTUS VALMIS → set_remote_control false → kotikansio (zsh) → NOLLAUS kun isRunning=false → aloitusviesti kun tyhjä → RC true → rivi PT:lle.
