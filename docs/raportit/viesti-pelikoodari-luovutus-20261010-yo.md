# Pelikoodarin luovutus 10.10.2026 klo 22.1x (nollaus 50 %, PT)

Edellinen: viesti-pelikoodari-luovutus-20261010-myohailta.md. Viestit ccd send_message: PT local_cf5b4eca-d914-46dd-b8de-5ed91ed0a0dc,
Julkaisija local_1325b8e8-c39c-49f0-9ba2-7cabd4f44629, Natiiviseppä local_04e2850b-d63c-481d-be73-c7d784a7cbcb,
Siirtoseppä local_c264506b-dd61-4617-839f-23daf6d0bd5a, NUI local_e9fdc695-8421-4c14-a187-8881e73c835a,
LS1 local_4b4b976c-42b6-4050-9232-dcd14ad3b2a4, Karttaseppä local_4bd7c316-55bc-423a-9da1-821fdd123cab, SK local_0c172ea0-6bb2-4afe-9c87-7938b882b4f3.

## Tehty illalla (20.5x–22.1x)
- **Latausmusiikki → juna 180 (PT KUITTASI)**: proto pelikoodari/latausmusiikki a9cef25b5 (e495a427f + 67c64926f + a9cef25b5).
  Simu löysi linnan hypyn 0,34 → 0,94 (mikserikonteksti vaihtui kesken nimiruudun, liu'un käyrä ^2,5). Korjaus: taso kohdenäkymän
  mikseristä latauksen alussa (Aanisoitin.MusiikkiTaso; linna 0,52 = loppumusiikki, pallo 0,35), jatkoramppi desibeleinä
  (keskim. 0,82 dB/100 ms). Mittaustyökalut proto-3d/tyokalut/pelikoodari-ajot: ajo-latausmusiikki.sh (VAIN_LINNA/VAIN_PALLO, APP=,
  sammuttaa simun lopuksi), latausvahvistus.py, latausramppi.py, kohdista.py, mittaa-latausmusiikki.py.
- **Kartan tarkistus v656 → PR #4369 (Julkaisijalla, merge vihreänä PT:n rivillä)**: A2 karkaavat nimet (107 valoa omaan pisteeseen,
  nimiö pois), B2 kaksoisnimet (9), C2 eleiden osoite vain ok-tilalle. C3: 5 Lyria-raitaa aanet/ → audio/ VIETY (200).
- **Pulun 45 v4-äänen eleet**: forced alignment ei kuluta merkkejä (278 291 ennen ja jälkeen). Paketti pulu-v4-eleet-vienti-20261010
  VIETY (Julkaisija), PR #4370 (livian-eleet.json ok 45 + työkalun --pelin/--ulos) odottaa CI:tä → pyydä Julkaisijalta merge.
  #4369 ja #4370 eivät riitele (ok 45 → osoitteet takaisin).

## KESKEN
1. **Kipin Soundly (PT 22.0x, ennen linnaa)**: NAS soundly/era1-pallo (9.10., 98 WAV) ajettu Sonniss-porttiin:
   proto-3d/_tyo/soundly-erat/pallo-portti.py → pallo-portti.json (+ .log). PUHDAS 47/98: lokit 10/12, kyyhkyt 11/17 (kansiossa myös
   lokkitiedostoja, tarkista aihe nimestä), **tuuli 0/22** (lehdet/linnut/heikko luokka), kellot 6/12 (yksittäiset lyönnit kaatuvat
   "ei erottuvia tapahtumia" -ehtoon: tarkista käsin), raitiovaunun kello 5/15, pyörän kello 7/8, laivan torvi 8/12.
   SEURAAVAKSI: (a) aukkohaku Soundlysta aja.zsh:lla (lisää tyolista.tsv:hen erä pallo2: puhdas tuuli `wind tone`, `wind high altitude`,
   `wind airy steady`; tuntilyönnit `clock tower strike single`; ehdokkaat soundly-hakulista-20261009.md);
   hiiriajot sallittu ma 12.10. asti (aja.zsh odottaa omistajan joutoaikaa); (b) raportti läpäisseistä aiheittain + LISENSSI ja rivi PT:lle → LS1 kytkee
   kippiin junaan 181.
   **LISENSSI (Soundly SFX License 4.11.2024, luettu PDF:stä)**: pelikäyttö sallittu, julkaistu tuotanto pysyy lisensoituna ikuisesti;
   MUTTA "If you create a video game Production, only the version(s) … produced during the term … will be licensed": tilauksen
   päätyttyä uusista PÄÄVERSIOISTA on poistettava Soundly-äänet → kerro PT:lle (pelin jatkuva kehitys = tilaus jatkuu tai äänet vaihtoon).
   Ei raakaäänien jakelua erikseen (ämpäri ok, osana peliä). Kaikki 98 ovat Soundlyn omia (SND-tunnus), ei Freesound-lisäkirjastoa.
2. **Linnan ristihäivytys desibeleinä → juna 181**: proto pelikoodari/latausmusiikki 255694ba3 (testit 470/470, unity 0). Julkaisija antaa
   KÄÄNNÖS + SIMU (39644E75, ~4 min) junan 180 lukituksen jälkeen. Aja: proto-kaanna.sh 255694ba3 (ei UDID:tä), sitten
   APP=…/_tyo/pelikoodari-app/Matkakirja3D.app VAIN_LINNA=1 LINNA_S=40 ajo-latausmusiikki.sh (perl setsid), mittaa
   latausramppi.py:llä (lähde loppu.mp3, kohdistus kohdista.py) → kuittaus PT:lle → SIMU VAPAA.
3. Kaupunkikappaleiden erä 2 odottaa omistajan arviota (ei muutosta). Freesound odottaa omistajan kirjautumista ti 13.10. — jätä.
4. Taidemuseon 11 kuuntelua äänisivulla (Julkaisija 20.4x); WALLA-poikkeus ei, omistajan valitsemasta sorinasta väkijoukkomaisempi versio.

## Worktreet
wt/proto-pelikoodari-lataus (latausmusiikki), wt/pelikoodari-kartta-ladonta (haarat pelikoodari/karkaavat-nimet #4369 ja
pelikoodari/pulu-v4-eleet #4370; poista mergejen jälkeen `sh tools/uusi-worktree.sh --poista pelikoodari-kartta-ladonta`),
wt/proto-pelikoodari-pulu, wt/pelikoodari-louvre (#4365).
