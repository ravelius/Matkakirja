# Postivahdin luovutus 3.11.2026 klo 16.30 (TILINVAIHTO)

Syy: PT 16.26, omistaja 16.26: TILINVAIHTO, tavoite viimeistään 98–99 %. Roolit tekevät luovutukset nyt; Postivahti EI nollaa niitä luovutusten jälkeen (uusi tili nollaa kaikki).
Pysyvä kulku, session id:t ja ohjeet: viesti-postivahti-luovutus-20261103-1055.md (+ -1330) ja tools/tyotavat/NOLLAUS.md. Tämä tiedosto kertoo vain muutokset.

## Tilinvaihdon seuranta (PT 16.26)
- Seurattavat: JU, NS, NUI, PK, VS (Valoseppä), KS, LAV pushaavat luovutuksen; puuttuvat ilmoitetaan PT:lle 15 min kuluttua (n. 16.41).
- Oma luovutus: tämä tiedosto, push postivahti-haaraan; sama välitetään Asemataululle (local_54e2130a-2e0b-4bf3-8301-57448d1e48a5).

## Viimeisimmät luovutus-shat (nollaukset tehty ennen tilinvaihtopäätöstä)
Julkaisija d6c1f77e3 (PR 6163; kotikansio JÄLJESSÄ, JU synkkaa itse) · Natiiviseppä afbe75860 (PR 6171) · Natiivi-UI 89f25142d (korvaa 462779a07; PR 6167; uusi sessio sai KORJAUS-viestin) · Pelikoodari c576d0ec9 · Valoseppä d588edace · Karttaseppä f99a629b9 · Lavastaja 1714bdea3 · PT 8aa95bd87 (PR 6161; tallenne Paatoimittaja-2026-11-03-klo-1327-1516.md) · KK nollautui 14.0x omistajan kortilla.
Tilinvaihdossa uusi Postivahti: aloitusviestissä käytä kunkin roolin VIIMEISINTÄ shaa (rooli voi lähettää korvaavan shan).

## Opit tänään
- Rooli voi jatkaa työtä nollausviestin jälkeen; jonoon lähetetty NOLLAUS ajetaan vuoron lopussa. Tarkista list_events = 0 ennen aloitusviestiä (listaus voi näyttää "0 of 0" vain nollauksen jälkeen; viestimäärän lasku ei riitä).
- Korvaava LUOVUTUS VALMIS voi saapua nollauksen jälkeen → lähetä uudelle sessiolle KORJAUS-viesti uudella shalla.
- Kotikansion päivitys aina `--vain <kansio>` (JÄLJESSÄ jos haarassa mergeämätön luovutuscommit).
- Kansiot: Natiiviseppä = Matkakirja-3d-selvittaja, Valoseppä = Matkakirja-linssiseppa-2, Lavastaja = Matkakirja-linnanrakentaja.
- RC päälle vasta aloitusviestin jälkeen.

## Oma nollaus
Ensimmäinen työ: tämä tiedosto, 1055-luovutus, NOLLAUS.md; sitten odota LUOVUTUS VALMIS -rivejä.
