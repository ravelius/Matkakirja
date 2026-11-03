# Julkaisija: luovutus 3.11.2026 klo 03.52 (Macin kello) – konteksti 25 %

Rooli: Julkaisija (JU). Työkalut /Users/Shared/Claude/julkaisija-tyokalut/. Edellinen: viesti-julkaisija-luovutus-20261102-2342.md.

## Tila luovutushetkellä (ajot käynnissä JU:n taustalla – nollaus tappaa ne)
- L1: PK:n 8-ketju `RUNKO=pelikoodari/sali-218l ketju8s.zsh yk cx th tj ty cc xf ys` (alkoi 03.2x). Tulokset sali-218b/*-v3.mp4.
- L1 jonossa: **NS muisti-ab218.sh** (55ce62126 vs 2856c5cc3, Iso iPad, ~45 min, PT:n etusija 1, VUORO NS annettu 03.5x).
  Sen jälkeen PK: `RUNKO=pelikoodari/sali-218n ketju8s.zsh yk cx`.
- L2: PK `ketju-taso1b8.zsh` (alkoi 03.40) → jonossa `ketju-taso1b9.zsh` → sitten **VS hur2** (hurrikaani-aito/hur2/ajo.zsh, 7eb9d67be):
  lähetä VS:lle ESIKATSELU NYT linja 2.
- Seuraaja: tarkista `pgrep -fl 'ketju8s|ketju-taso1b|aja-sk|muisti-ab218'`. Jos jokin PK:n ketju kuoli nollauksessa, aja se uudelleen
  (komennot yllä) ja ilmoita PK:lle (local_91a1bc27) tulosrivi + mp4-nimi.
- Iso iPad: NS:n mittausäppi; NS palauttaa uusimman rungon A/B:n jälkeen. **PT 03.5x: ei asennuksia omistajan pieneen iPadiin junasta 218**,
  ennen kuin NS:n intron muistikorjaus on kuitattu.
- Levy ~31–36 Gi (LAV/NS siivosivat 3.11. 00.2x).

## Tehty 2.11. 23.42 jälkeen
- Merget mainiin: KS PR 6047 (0579bb1c3, skeema 1.68), KS PR 6049 (8eac6b364, paketin skeemakorjaus), KS PR 5986 (f38d76dd5; oli luonnos → ready).
- Sisältöpaketit: v946 (1.68), v947 (5986). 6047:n vienti kaatui (kaupungit.keskusta/alue puuttui paketin skeemasta) → 6049 korjasi.
- Viennit: LAV kielletty-tausta-v113 (HYLÄTTY sisältö, älä käytä), **tausta-v114** (käytössä), palatsi-esto-v37.
- Vuorot: NUI käännökset 17424e357 ja 82634eb4b (L2/iPad13, E-kuvat KK:lle); NS runkoon 9a9515ea3 → 55ce62126; NS laite 16c732c8c/390e3d9d9;
  PK taso1b4/b5/b6/b7 + salit; VS sal1–sal9, hur1.

## OPIT
- **Mergeä vasta kun KAIKKI checkit vihreät** (reitti + testit), vaikka pyyntö sanoisi "reitti vihreä": 6047 rikkoi pakettiviennin.
- Pakettiviennin tila ja v-numero: `gh run list --workflow vie-sisalto.yml`; versio lokista `grep -o 'sisalto/1/v[0-9]*/'`.
- Runkoon (natiiviseppa/juna-N) mergeää NS, ei JU: välitä NUI:n runkomerge-pyynnöt NS:lle.
- Kuollut lukko (pid ei elossa): proto-kaanna/esikatselu siivoaa itse, **laite-sha.sh EI** (pelkkä mkdir-silmukka) → jos JU tappoi ajon,
  poista oma jäänne `rm -rf /tmp/matkakirja-kaannospalvelu[-2].lukko` vain, kun `kill -0 <pid>` epäonnistuu.
- Älä odota "lukko ilmestyy → katoaa" -silmukalla: jos ajo ehti loppua ennen, odottaja jumittaa. Odota prosessin nimeä (pgrep) tai aja suoraan.
- PK vaihtaa runkoa usein kesken jonon: tarkista ennen jonotetun ajon alkua, ettei se ole vielä käynnissä, ja korvaa (TaskStop + uusi).
- Vientipyynnön peruutus voi tulla myöhässä: kerro heti, että viety, ja pyydä uusi versio (ei samaan kansioon).
- VS otti kerran L2:n ilman vuoroa (01.28) – muistutettu; sarjapyynnöt yhdellä viestillä.
- L2-asennusvika (NS kirjaa): proto-kaanna → simu-app ei käynnisty ("No such process"), uninstall + install korjaa.
