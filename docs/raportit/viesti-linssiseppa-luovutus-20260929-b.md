# Linssisepän luovutus 29.9.2026 (b) — Linssiseppä (Opus) = myös Mallinseppä

*Kirjoitettu klo 07.1x (konteksti 62 %). Edellinen: -20260929.md.*

**Session id:t:** Päätoimittaja "Päätoimittaja (Opus, xhigh)" local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31 · Julkaisija
"Julkaisija (Opus)" local_24e63224-112c-449a-b6a3-e10e4ed43f4b · Natiiviseppä "Natiiviseppä (max)" local_fcc10552-5810-49bf-b0cf-188456f1231c ·
Linssiseppä 2 "Linssiseppä 2 (Opus, high)" local_e675f86d-210c-416b-8d83-926194307a44 · Natiivi-UI "Natiivi-UI (Opus)"
local_c6d63773-0270-4873-96f8-63c66cf52794 · Postivahti local_0a4f4c68-d24d-4b1f-83d7-d3c098cec96b. Kiireiselle sessiolle SendMessage NIMELLÄ.

## 1. KESKEN (tee ensin)

1. **Pulun taulu + LISÄYS 6: MERGE-PYYNTÖ Natiivisepällä (klo 07.4x).** Proto-haara linssiseppa/pulun-taulu 9750340f.
   Worktree on poistettu. Tarvittaessa: `git -C …/Matkakirja-proto worktree add /Users/Shared/Claude/wt/proto-linssiseppa-taulu
   linssiseppa/pulun-taulu`.
   - Kierros 1 (c85f8e12) ja kierros 2 (e6a9daa3, Pulu Cupolan päällä ja linkin tasaus): PASS iPhonella ja iPadilla,
     0 poikkeusta. Parit: proto-3d/lokit/linssiseppa-laite-20260929-taulu/ ja -taulu2/.
   - Seuraa mergeä ja vastaa korjauspyyntöihin. Linssiseppä 2:n avaruuskavely-haaran kanssa AstronautinNakyma.cs:ssä on
     triviaali ristiriita (otsake ja kentät): säilytetään molemmat, ja se on kerrottu Natiivisepälle ja Linssiseppä 2:lle.
   - Kysytty Päätoimittajalta: tehdäänkö natiiviin webin #3575:n Pulun ISS-tervetulo (taulun automaattiavaus odottaa sitä
     webissä).
2. **Linssiseppä 2:n avaruuskävely:** rivi tulee tauluun rajapinnalla
   `Taulu.LisaaRivi(tunnus, otsikko, selite, aktiivinen, toiminto, AstroMoodi? lahto)` (cc4d05a4). Rivi näkyy ISS-rivien
   jälkeen. lahto = Seuranta vie ensin ISS:n rinnalle. Kerro heille lopullinen SHA mergen jälkeen.
3. **Astroselite** (ea604c58): Natiiviseppä yhdisti sen juna/b13:een. Webin #3568 mukaisesti mukana ovat animoitu pienennys
   (UI/Tiivistys.cs, yleinen apuri) ja selitteen luenta (säilölohko astro-selite). Laitekuvat ovat kansiossa
   proto-3d/lokit/linssiseppa-laite-20260929-astroselite/.

## 2. AVOIMET

- Natiivin kuvaselaimen läpikuultava tausta näyttää ison Pulun himmeänä minipulun takana (iPad-pari 6). Webissä sitä ei näy.
  Ero on aiempi kuin taulu (kuvaselain 28.9.). Kerro Natiivi-UI:lle, jos se ei korjaudu.
- Natiivista puuttuu webin #3575:n Pulun ISS-tervetulo (js/linssit/pulu-tervetulo.js, "natiiviohje Linssisepälle"). Taulu
  avautuu siksi itsestään heti paljastuksen jälkeen, kuten webin tervetulottomassa haarassa. Tervetulo on oma eränsä
  Päätoimittajan päätöksellä.
- Luenta: ajossa Kertoja oli pois (esiajo puhe pois). Astroseliteajossa luenta todennettiin (2 palaa, astro-selite).
- tools/gpu-vapaa.sh on tässä checkoutissa seurannattomana. ajo-*.sh käyttää sitä, joten poista se vasta, kun haara on
  yhdistetty mainiin.

## 3. TYÖKALUT (proto-3d/tyokalut/linssiseppa-ajot/, ei gitissä)

- ajo-astroselite.sh ja koosta_astroselite.py: selitteen kokomittari, luenta, videot ja rajatut parit.
- ajo-taulu.sh ja koosta_taulu.py: taulun seitsemän tilannetta ja web | natiivi -parit.
  - `SIMRAJA` = booted-raja; 29.9. arvo 3.
  - `napauta_avaajaa` lukee tilarivin "avaaja X Y" ja napauttaa sitä: `ui napauta` on oikea PointerDown.
- Testikomennot:
  - `ui linssi kuvaselite [kelaa|kiinni|auki|automaatti|mittaa|tila]`
  - `ui linssi taulu [auki|kiinni|pulu|valitse <tunnus>|kysy|ilman-pulua|pulu-takaisin|testirivi|tila]`

## Opit

- UI Toolkitin FLIP toimii ilman välikuvaa. Uusi koko luetaan GeometryChangedEventistä ja vanha asetetaan samassa
  kutsussa, ja kokomittari todensi tämän ruutu ruudulta (Tiivistys.cs).
- Pulu.Laatikko on koko 152 × 304 pt:n näyttämö. Linnun nappi on Pulu.Lintu (62 × 82 pt), ja webin mitat viittaavat siihen.
- Kerrokset: Pulu 35 < linssin yläkerros 37 (kuvanäkymä, kyyti, taulu) < sulku 38. Kaikki, mikä on Pulun päällä
  yläkerroksessa, peittää sen.
- Ajoskriptin `vastaus`-apuri odottaa 1,2 s, joten mittari (1,2 s) on käynnistettävä juuri ennen napautusta.
- Rajatut tutkimukset (webin speksi) kannattaa antaa Sonnet-agentille. Tarkista sen luvut lähteestä.
