# Valosepän luovutus 4.11.2026 klo 22.17

Syy: konteksti 26 %, pehmeä raja ja luonteva tauko (Raamattu 7.37). Edellinen: viesti-valoseppa-luovutus-20261104-2200.md (kohdat 1 ja 4 sekä Muistettavaa voimassa). Loki: /Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md. Wt k30 (/Users/Shared/Claude/wt/proto-linssiseppa2-k30) on haarassa linssiseppa2/suomi-syy.

## Tehty
- PT:n käsky: vanhat scratchpadit T7:llä, Claude-arkisto/valoseppa-scratchpadit-20261104 (2 kansiota, 8 Mt, tiedostot vertailtu). PT kuitattu. Levy 55 Gi.
- SUOMI, syy mitattu, EI korjausta: pariisi-tyyli/striimi/suomi/TULOS.md. Möykyt ovat pohjan z <= 10 rasterin järviä (fin-t110 IoU 0,855, vektori 0,238); vektori on tarkkaa z10:stä. fin-t113:n suorakulmion sisällä vesi lähempänä vektoria (0,44 / 0,33), ulkona möykky (0,85). Ruskean laikun väri täsmää fin-t105:ssä SMaa-väriin. KK:lle ja PT:lle lähetetty. Vesimaski on väriraja: luvut kertovat suunnan.
- Komento elavakartta pyynnot 1|0: 2d8ec025c linssiseppa2/suomi-syy (natiivi-backup; a5323cf4e + 9 riviä; 614/614, Unity ja laite ajamatta). Ei junaan.
- VERKON PALAUTUS, syy, EI korjausta: striimi/offline2-TULOS.md loppu. 88 palaa korjautui levylle, mutta pohja latautuu vasta verhossa (a699e2e7e; loki unity.log rivi 33860, uudelleenlatausta ei tullut). TF 60bd5c356:ssa ei verhoehtoa, siellä heti (koodista, ei ajettu). Elävä pala ilman dataa ei uusintalistalla kummassakaan (koodista). KK:lle lähetetty suositus ja kysymys, viesti jonossa 22.16.

## SEURAAVAKSI
1. KK:N SANA: tehdäänkö verkon palautus kokeena? Suositus: verkon palattua ja palojen korjauduttua yksi uudelleenlataus ilman käynnistystä, lähitason palat uusintaan, verhoehto muuten ennallaan. Odota sanaa; ei junaan. Auki: miksi 82/170 poistui listalta ilman paikkausta.
2. JU:N SUOMI-KOE: sk-suomi-syy.txt (striimi/suomi/, 6 kuvaa, iso iPad, rungolla 2d8ec025c), JU:lle lähetetty, viesti oli jonossa 22.14. Kun kansio tulee: konsoli.txt:n rivit "pohja pyyntö" ja "elävä pyyntö" kuvakohtaisesti, muisti, paluukuvat. Selvitä, miksi lähempi fin-t110 näyttää möykkyä ja kauempi fin-t105 ei. Sitten korjaustapa KK:lle: z10 laitteella vai pohjan uudelleenpoltto (media-vienti = julkaisu; muisti 4006 Mt lähellä rajaa). Harmaat sumeat vyöt: syy auki.
3. VIIVAT 1b ja 2b (PT 22.1x): lupa annettu JU:lle, ajo TF-koemittauksen jälkeen. PT: kuvat ennen Suomen korjausta, kun ne tulevat, täysikoossa. Tulos riviksi KK:lle ja PT:lle (luovutus -2200 kohta 1).
4. Sitten valtionraja, Alpit, tasorajat; ND-pohjan laikku KK:n listan jälkeen.

## Muistettavaa
- fin-kuvien korkeudet: fin-t105 = aja 0,85, fin-t110 = 0,635, fin-t113 = 0,54. Oletin ensin väärin; TULOS.md ja skripti korjattu.
- Sovituksen ajo: suomi/ pohja ja mvt tallessa; sovitusskripti oli scratchpadissa, kopio suomi/suomi_vertaa2.py. Python: tulivuoret/venv.
- robots.txt: OpenFreeMap antaa 403, sääntöjä ei saatu. Luin sen samassa komennossa TileJSON-haun kanssa (poikkeama muistisäännöstä, kerrottu PT:lle); palat haettu sen jälkeen, 36 kpl, vain mittaukseen.
- PT 22.2x: robots.txt 403 ei ole lupa: EI uusia skriptattuja hakuja OpenFreeMapista; 36 palaa vain tähän mittaukseen, ei tuotteeseen (kirjattu TULOS.md:hen). Suomi: ei korjausta, ennen kuin tasot on todistettu ja koe katsottu.
- JU 22.2x: viivat 1b/2b ketjussa TF-koemittauksen jälkeen (vahti pois vain niihin); Suomi-koe 2d8ec025c JU:n luovutuksessa viivojen jälkeen. Kansiot tulevat riveinä.
- Asemataulua ei päivitetty: kokeet eivät ole junassa.
