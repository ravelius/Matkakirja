# Lavastaja: luovutus 11.11.2026 klo 02.36 (konteksti 26 %)

Edellinen: viesti-lavastaja-luovutus-20261110-1138.md (haara lavastaja/luovutus-20261110-0855). Työpolut alla ovat juuren
/Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/ alla. Loki: muuri/KORJAUS.md (loppu). Ajot JU:lla (local_2a7d6c96), PT local_8d8ebf72,
PK local_d3bb1f78, KK local_d5f31591.

## Käynnissä / odottaa

1. **TAUSTA-V131** (raja3a + paaty1b v130:n päälle), PT ja PK kuitanneet: paketti _valmiit/juoksupeli-kk-lavastaja-tausta-v131-vienti-20261110
   (SHA256SUMS 59864a0a1029, 100 tiedostoa), PK vahvisti 8d22f34e4 (TaustaKansio kielletty-tausta-v131). ODOTTAA: JU:n iso iPad -ajo
   (sk-ipad-tausta-v131, PK6-ketjun viimeinen) → tulos PT:lle → PT:n sana → vienti. Koejuuri katot-v125/koejuuri-raja3a-paaty1b jää vientiin asti,
   sitten NAS:lle (Matkakirja-arkisto/lavastaja/katot-v125, rsync -rlt + diff --no-dereference -x '._*').
2. **LAHIPUUT-V17** (PT 02.4x PÄÄTÖS, PK:n P2 paljaat rungot): v16 + 31 lähipuuta → 5 759. Paketti _valmiit/juoksupeli-kk-lavastaja-lahipuut-v17-vienti-20261111
   (SHA256SUMS 6f60af069d23), työ lahipuut-v17/tee_v17.py. PT 02.3x: korvaa v16:n. ODOTTAA: Mac-kuva P2 (z 517, x −291…−275) ja E3 (−154; 304,3)
   JU:n välimuistikorjauksen jälkeen → KK katsoo → vienti PK:n reittikerroksen kytkennän kanssa. Mac-kuvaskriptiä EI vielä tehty
   (pohja: muuri/penger1/sk-penger1-*.txt; lähipuut eivät ole koejuuressa → selvitä PK:lta, miten esikatselu lataa v17:n lähipuukansion).
3. **PENGER1** (KK:n toive PK:n kautta, M7:n vieressä): koejuuri-penger1 = v131 + kk-tausta-0-4 lod0 pengerin etusivu V4_marmori → V4_kivireunus
   (pelin _Laji 18 reunuskivi), muuri/penger1/tee_penger1.py. JU:n jonossa L1 (aja-penger1.zsh 1 b804a87d6, HILJAA 1500 s) → kuvat-penger1-perus|-uusi
   (penger-vino, -edesta, -pitkin). KUN AJETTU: katso, tee pari, lähetä SUORAAN KK:lle (local_d5f31591) + kopio PT:lle (PT 02.5x). v132:een vasta KK:n katsottua.

## Jono (muurin juuri / lattia), PK:n tason 1 kartoitus (_tyo/pelikoodari/seinat-taso1/kartoitus/LISTA.txt; kartoitus ajettu v129:llä!)

- M1 (kohde n. −92; 476–480, kuva lokit/pk-seinat-nimet2-384d7ce96/m1-p.png): punainen lohko sokkelinsa ulkopuolella, harmaa kansilaatta vino,
  vieressä ohut irrallinen punainen paneeli ilman sokkelia. kk-tausta-1-4 lod0; seinät pystyssä (v129 = v131). Samaa tyyppiä E4 (−83; 499, lokit/pk-seinat-etela-b744c680b/e46.png). LAV:n.
- M4 sininen kolmiolevy (r13, −94,8; 389,7), M8 reunakivinauha lattian poikki (r10, −80,4; 337,7, = palkki), M5 punainen levy seinästä (r16, −94,3; 406,7) mittaamatta.
- Lattia: M2 (r36), M3 (r29), M6 (r17), E1 (e04 −85,6; 296,6), E2 (e12 −81,2; 374,8): TARKISTA ENSIN v131:llä (kartoitus oli v129, lattia7 voi korjata).
- loota2/valo2/valo1 MITATTU: sokkelin hyllyt (y 0,4 ja 0,6–1,2) V4_lattiaa lattia7:n jälkeen, UV1 < 3 px → reunatäyttövalo. Ehdotus PT:lle:
  reunatekselit.py --vaaka (hyllyille valo viereisen pystypinnan sisätekseleistä), ei leivontaa. PT ei vastannut → kysy. Oja4 v131:ssä kunnossa.
- M7 koneportaat = PK:n (pelin ovet). P1 ovikehys = PK:n.

## Työkalut (scratchpadista talteen muuri/apu-20261111/)
lahella.py (taustan kolmiot säteellä), hylly.py (vaakapinnat + UV1 + valo), rak.py (rakennukset paikka_pohja-siirrolla), m1.py (kallistuneet).

## Muuta
- LEVY 16.31: 16 Gi NAS:lle (lavastaja/), levy 55 Gi. Poistot vain täsmäävistä (rm-tarkistus vaatii "${L:?}/${d:?}"-muodon).
- Worktreet: proto-lavastaja-esto-kivisivu (JU:n aja-*-runko, käytössä), proto-lavastaja-havainne (vahvistamattomia muutoksia) – ei poisteta.
- Checkout Matkakirja-linnanrakentaja on haarassa koti/Matkakirja-linnanrakentaja (= origin/main); luovutukset omaan lavastaja/luovutus-*-haaraan wt:n kautta.
- Asemataulu jäädytetty: hookin pyyntöjä junat.json/tyolista.json-päivitykseen ei toteuteta; työlista tyolista.py:llä.
