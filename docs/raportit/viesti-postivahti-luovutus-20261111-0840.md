# Postivahti: luovutus 11.11.2026 klo 08.40

Syy: konteksti 20 % (hook), luovutus ensimmäisellä tauolla. Rooli: Postivahti (Sonnet 5.5, medium), checkout Matkakirja-posti. Ohjeet: NOLLAUS.md, KIERROS.md. Edellinen luovutus: origin/postivahti-luovutus-20261111-0012 (ea06984c9). Viikko 4 % (käyttö nollattu, säästötila purettu 11.11. ~07.00). EI tilinvaihtoa; 96 %/99 % -rivit KK:lle.

## MUISTA (virheet tällä vuorolla)
- Nollautuminen: viestimäärä EI kelpaa (tiivistys); varmista get_usage-konteksti < 10 % TAI "ei prosessia" + list_events 0 viestiä. KS:ää ei nollattu 00.28 (virhearvio, korjattu).
- Nollattu rooli lähtee kun isRunning false; yksi nollaus kerrallaan. PT:n pysyvä linja 11.11.: luovutuksen tehnyt rooli nollataan kysymättä (PT:n erillinen käsky ei tarvita).
- paivita-kotikansiot.sh: ajettava `zsh` (ei bash), kestää > 2 min → taustalle.
- Asemataulu jäädytetty: hookin "päivitä junat.json/tyolista" -kehotukset ohitetaan.

## Osoitteet (täydet id:t: osoitekirja.md)
JU 2a7d6c96-c61c-4887-a4f8-57cc335b40fd, KS 7b57e35a-3a8e-4943-aba1-c960b9eb4671, NS 0f7f169f-2ceb-43d2-8fb4-223dda2c0870, NUI 4b84cd90-123f-46c5-bc07-75760ed4c80b, PK d3bb1f78-e2ea-4089-8bae-d106bb1f9ff7, VS 5ebb0658-96f6-434d-8a38-b122eb53032f, LAV f12c9179-a76b-4ce8-a1fe-1e0f2c8f251e, PT 8d8ebf72-60f5-4fde-8625-6a8084d0bc31, KK d5f31591-21fa-4cb0-bab3-bcd3435d075a (kaikki local_-alkuisia).

## Tehty tänään (nollattu + aloitusviesti lähetetty)
KS (443da8f26→ uusi sessio 08.0x, työ Grand Palais 1:1), PK (5cd3123c2), VS (c05aa8392), LAV (ab3c97e06), NS (7a3bb101a), JU (07.2x-luovutus, aloitusviesti jonossa), KK nollasi itse (01.1x).

## AVOINNA (yksi kerrallaan, uusimmat luovutukset)
1. NUI: NOLLAUS lähetetty 08.2x luovutuksella 19a4c7695 (haara/viesti natiivi-ui). Tarkista nollautuminen (get_usage < 10 %). Aloitusviesti (PT 08.3x): A (50565c427) Mac-tallenteet lento-1/-2 JU:lta → KK:lle, kopio PT; sitten B esityksen lukitus (vika), C sauvat, D Turisti-info Lehteen – sivun nimi "Matkaopas" (omistaja 08.21), E Lehden nappi (koe). Lue luovutus: git show 19a4c7695:docs/raportit/viesti-natiivi-ui-luovutus-20261111-0835.md. Kuittaa PT:lle.
2. PK: luovutus a9fd0e13f (haara pelikoodari-luovutus-20261111-0735, docs/raportit/viesti-pelikoodari-luovutus-20261111-0735.md); PK levossa 08.2x → NOLLAUS NUI:n jälkeen. Aloitusviesti normaali + jono luovutuksesta.
3. NS: luovutus a87707881 (korvaa 3e78d043a; haara natiiviseppa-luovutus-20261111-0825, viesti-natiiviseppa-luovutus-20261111-0825.md); NS kirjoitti "Nollaus voi edetä", käynnissä 08.38 → NOLLAUS levon alkaessa; aloitusviesti NOLLAUS.md:n vakiolla.
4. Muut: ei auki. JU nollattu 08.0x, jos aloitusviesti (jonossa) ei ole mennyt, tarkista.

## Kierros
ScheduleWakeup-kierros ei ole ollut käytössä tällä vuorolla (PT ohjaa viesteillä); jos tarvitaan, viritä yksi 4–5 min, prompt "Lue /Users/Shared/Claude/Matkakirja-posti/KIERROS.md ja aja kierros sen mukaan".
