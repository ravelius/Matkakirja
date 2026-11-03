# Karttaseppä: luovutus 31.10.2026 klo 00.00

Edellinen luovutus: viesti-karttaseppa-luovutus-20261030-2310.md. Nollaus Postivahdin pyynnöstä (konteksti 32 %).

## Valmiit tässä vuorossa
1. **Tuileries/metro natiivissa** (sisältövienti 41128248185 OK): pari KK:lle 23.3x,
   `/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/tuileries-natiivi/` (T1-keski, T2-lahin, LUE.md).
2. **KK:n katselmus → PT 23.4x, kuitattu**: proto-haara `karttaseppa/piirrokset-216` (wt `/Users/Shared/Claude/wt/proto-karttaseppa-piirrokset-216`):
   - **aff20e3fb** Louvren pyramidi todelliseen paikkaan (Wikidata 48,86111 / 2,33583) ja piirrosten kokoiseksi
     (`KaupunkiPalloMitat.PiirrosTaysiPt` 59,2 pt, yhteinen NostotKartallan kanssa). Pari `tuileries-natiivi/pari-louvre/` (PT OK).
   - **254cf53d4** kohdekartan karttanimi `nimio` (KohdekarttaKohde.KarttaNimi → Kohdenostot + KohdekarttaNakyma): "Metroasema".
   - Molemmat NS:lle junaan 216 (PT 00.0x).
3. **Web PR #5690** (haara `karttaseppa-metroasema`, wt `/Users/Shared/Claude/wt/karttaseppa-metroasema`): maakartat.js
   `nimio: 'Metroasema'` (karttanimet vain suomeksi, omistaja 29.10.), nahtavyydet.js nimilappu, vienti `kohdekartat.kohteet[].nimio`.
   **EI MERGETÄ ennen junan 216 julkaisua** (PT: merge julkaisee webiin). Natiivin pari "Metroasema" vasta mergen + sisältöviennin jälkeen.
4. **60 fps -mittaus iPad Pro 13** (OMISTAJAN PYYNTÖ 23.01; NS:n äppi 216-varjo): `/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/fps-216/LUE.md`.
   Skripti `fps-216/ajo-laite.zsh ipad|iphone` (korjattu: alku-rivit, mykistys 1). Lokit `proto-3d/lokit/karttaseppa-fps-ipad-20261030-2348`.
   - TÄRKEÄ KORJAUS: raaka mittaus-tiedosto sisälsi lepokehykset (tarkoituksella 30/10 fps). LIIKKEEN kehyksistä yli 25 ms:
     kauko 6 %, keski 21 % (piikit 50–167 ms), lähin 6 %, zoom 3 %. PT:lle lähti ensin 27 % (sis. lepo) → kerro oikea luku
     ensimmäisessä tulosviestissä. GPU ~13 ms; hitaus pääsäikeessä.
   - PT 23.5x: tee A (Nimikerros), B (varaukset/GC), C (laattalataus EarlyUpdatessa) junaan 216; mittaa jokaisen jälkeen piikit ja
     **yli 20 ms:n** osuus; myös **iPhone** ennen/jälkeen (iPhone oli `unavailable`, ei kytketty). VS:n hahmovarjopari edelle, levy ≥ 82 Gi.
   - Mittarit tehty (ei toiminnallisia muutoksia): **e7caf9d1d** (mittaus-tiedostoon " L" = liike; Nimikerroksen alasyyt lisäys/ladonta/
     piirto/teksti/karsinta) ja **4b9eb7b22** (Ruutusyy: ElavaKerros, Karttapisteet, KarttaKerrokset, Esilataaja, PalloKierto, Pohjapallo,
     Reitit, Usvalevy, Siirtokohdemerkit, Aurinko).

## Käynnissä luovutushetkellä
- **NS kääntää mittauskäännöksen** koehaarasta `natiiviseppa/ks-mittarit-216` 9a665d9c0 (juna 216 85767a5bf + e7caf9d1d) →
  `/Users/Shared/Claude/proto-3d/lokit/natiiviseppa-app-216-ks-mittarit/Matkakirja3D.app`, NS ilmoittaa. Pyysin lisäämään 4b9eb7b22
  (viesti jonossa NS:llä) – tarkista, kumpi tuli.

## SEURAAVA
1. Kun NS ilmoittaa: asenna/aja `zsh fps-216/ajo-laite.zsh ipad` (iPad vapaa? kysy NS) → analyysi vain " L"-riveistä
   (yli 20 ms ja yli 25 ms osuus, p95, max) + `kamera: pitkä ruutu` -syyt uusilla alasyillä → korjaa A (Nimikerros) haaraan
   piirrokset-216 → laitekäännös NS:n kautta (laite-sha.sh vain NS:n luvalla) → mittaus → B → C. Ennen/jälkeen-taulukko LUE.md:hen,
   ≤ 3 riviä PT:lle per vaihe.
2. iPhone (UDID 00008150-000A212E1407801C) mitattava, kun kytketty; äppi asennettava (NS:n äppi).
3. Portti 06 (juna 215) odottaa yhä PT/KK:n kuittausta.

## Muuta
- Worktree `wt/karttaseppa-metroasema` jää (PR 5690 auki). `wt/karttaseppa-luovutus-0000` poistetaan mergen jälkeen.
- Unity-/laiteajot: levy oli 84 Gi; PT:n levyhätäraja 82 Gi, uusi käännös vasta > 84 Gi tai LAV:n leivonnan jälkeen.
