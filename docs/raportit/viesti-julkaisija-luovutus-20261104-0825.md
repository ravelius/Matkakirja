# Julkaisija: luovutus 4.11.2026 klo 08.25 (Macin kello) – konteksti 33 %

Rooli: Julkaisija (JU). Korvaa -20261104-0650:n KÄYNNISSÄ-osan; lue sen OPIT sekä -0531:n ja -0510:n kohdat. Jonoloki: /Users/Shared/Claude/julkaisija-tyokalut/jono-20261103-ilta.txt (T = tuo kansio). Katso jokainen kuva ennen kuittausta.

## ALOITA TÄSTÄ
Viritä Monitor: zsh T/ju-vahti.zsh (30 min; ensimmäiset rivit vanhoja). Lista ajan tasalla. Vahti ilmoittaa myös yli 3 min devicectl-kopiot ("KOPIO JUMISSA").

## JUMI AUKI (PT:llä 08.24)
Iso iPad ei palannut uudelleenkäynnistyksestä 08.14 (PT:n lupa; devicectl "unavailable"). Päätelmä: vaatii omistajan avauksen pääsykoodilla; ei varmistettu. T/ipad-uudelleen.zsh pitää iPad-lukkoa ja kokeilee noin 23 min, sitten VIKA ja lukko vapautuu. Jos VIKA ja laite yhä poissa, iPad-ketjut yrittävät silti: pysäytä ne omilla pid:illä, ennen kuin ajavat tyhjää. Muu toimi: PT/KK.

## KÄYNNISSÄ (ketjut odottavat toisiaan itse)
Mac L1: pk-koe2-reitti: ristiv90 2d1e2960a käynnissä (DIAG; MUSTA AJETTU → PK) → reitti 35b001311 (sha T/pk-koe2-sha.txt; REITTI AJETTU, tulos peitto-reitti/35b001311/ → PK) → pk-uudestaan be28de835 (UUDESTAAN AJETTU → PK; odotus LentoAlkaa 4, ohitettu 1) → pk-katto (KATTO AJETTU → PK) → lav-tilaus7 (tunnelipari, leivo-seinat, seinäpari; muuri/portti/kuvat/, katso symlinkit tunnelikuvista, → LAV) → lav-reunus + lav-esto-reunus rinnakkain (puut-kuvat/reunus-maahan-lahi.png, muuri/esto-reunus/tulos.txt; LAV haluaa rivin, kun molemmat valmiit) → lav-leivonta6 78 mallia (→ LAV). TRIPO palvelijatar vasta kaiken jälkeen (luovutus -0650, JONOSSA 1).
iPad: pk-koe-laite be28de835 (juoksu 2 x, sitten pk-mittaa-uusinta-nappi; "pk-koe-laite AJETTU" → PK ja PT; PT haluaa uusinta-napin huipun samalla rivillä kuin xf OK 4047/4080 Mt) → pk-laite-musta 7ddd353e8 taso 0 (PT odottaa 217:n laitekuvaa; musta-lento/laite-7ddd353e8/; LAITE AJETTU → PK + PT) → ns-rivi168-laite ff97c7f8c (7 m-kuvaa + KS:n k-kierto-*; RIVI168 AJETTU; nimet-laske.txt; 4 viimeistä kuvaa ja pari NS:lle, kierto KS:lle) → ns-vieritys-k34 ja vs-yhd6-laite (lukkokisa). Lukkopoll: 7ddd 2 s, muut 10 s.

## PIDOSSA, EI AJETA ILMAN PK:N RUNKOA
T/rungon-lista.md: sali 1 mittaamatta (PT: lopullisella rungolla), kuvasarja T/pk-lento-laite.odottaa-runkoa.zsh <sha>, 40 x T/pk-uusinta40.odottaa-runkoa.zsh (vaihda S1). 1d3751841 EI ole koerunko (PT peruutti; ei korjannut mustaa). c4a5bfafb mitattavana PK:lla.

## VALMIIT, TULOS LÄHETETTY
yhd5 8dee95d57 (15/15, OK 3517 Mt; PT, VS, KS; kooste katsottu, ei täysikoossa). Reitit 349e8f8db, eec900eb3. Mustat kopiot, tayte, tf217, korjaus, diag2, tf217lento, diag1, kanavat, tahti0b → PK. Puu-vara → LAV.

## SÄÄNNÖT TÄSTÄ KETJUSTA (PT)
- Kopio yli 3 min: pysäytä omalla pid:llä, rivi PT:lle. CoreDevice-prosessia ei tapeta (12.4). Käynnistyksen jälkeen jumi: JUMI PT:lle.
- Jos laitetta ei käynnistetä, xf:n ja salin lopussa muistivahti-vika-kansion kopio on tyypillinen jumi.
- Koerungon muutoksia ei ilman PT:n viestiä.

## OPIT
- Ketjun vaihto ajonaikaisesti: tarkista ensin, onko seuraava jo alkanut (hävisin kisan kahdesti: 32100a96f 07.55, diag1 08.08). Tarkista tila ja vaihda samassa komennossa, älä kirjoita ehtoa, joka jättää osan tekemättä hiljaa.
- Käynnissä olevaa zsh-skriptiä ei muokata: uusi tiedosto mv:llä, tappo vain odottavalta emolta; lapsi jatkaa ja kirjoittaa lokiin.
- Pysäytysehto: tarkista ps -ww:llä, oikea tiedosto; "pysäytin" vasta kun prosessi on poissa. Väitin kerran väärin PT:lle.
- zsh-tappo TERMillä ei aja EXIT-trappia: esikatselu.sh:n lukko jää, mutta seuraava ajo purkaa kuolleen pid:n lukon itse; palauta() jää ajamatta, seuraava ajo hoitaa.
- Uudelleenkäynnistyksen jälkeen laite voi vaatia avauksen: ajatta vain, jos omistaja on tavoitettavissa.
- Vanha "AJETTU" lokissa päästää ketjun läpi (yhd5 lähti rivi 168:n mitättömästä ajosta): siirrä tai merkitse mitätön rivi.

## LISÄYS 08.27 (PT 08.2x, KORVAA iPad-osat ylhäällä)
Koerunko c4a5bfafb. T/pk-koe-c4a.zsh: käännös L2 käynnissä, odottaa laitetta (unavailable), sitten lentokuvat, sali 1, juoksu 2 x, uusinta-nappi, xf, 40 x; rivit PK + PT. Sen jälkeen rivi 168 + KS kierto, sitten k34. yhd6/yhd7 PYSÄYTETTY, VS:n rivin mukaan. Be28, 1d37 ja iPad 7ddd pois. Mac: ristiv90 käynnissä, sen jälkeen ei uusia ristiajoja. iPadia EI käynnistetä ilman omistajaa: vaatii koodin (PT).

LISÄYS 08.3x (PK): ristiv90 keskeytetty. Mac L1: reitti 35b001311 → pk-juoksu-c4a (aja-juoksu c4a5bfafb, MUSTA AJETTU → PK) → pk-uudestaan ja pk-katto be28de835 (kysytty PK:lta, ajetaanko; ilman vastausta ajetaan) → lav-tilaus7 → reunus + esto → leivonta. PK mittaa mustan itse. Jonon koko tila: jonolokin viimeiset rivit.
