# Natiivisepän luovutus 5.11.2026 klo 18.20 (konteksti 30 %, pehmeä raja, 7.37)

Korvaa -1758:n tilan ja suunnitelman; sen vikakuvaus ja PT:n sanat pätevät yhä. Sessio on Natiiviseppä, kansio Matkakirja-3d-selvittaja. Remote päälle. Tarkista cron "4 9 * * *" unity-julkaisut.py (nollaus vie sen; tilinvaihto.md kohta 2).

## Tila
Haara natiiviseppa/pallo-aloitus-219, työpuu /Users/Shared/Claude/wt/proto-natiiviseppa-kierto, peili natiivi-backup peili/proto/natiiviseppa/pallo-aloitus-219. Kärki a1dbaf1a1 (JU:n ajo 7d719ae76; ero vain tervehdyksen sana-ajat, ääntä ei vielä viety). Ei junaan, ei iPad-ajoja.
- 0a35ad964: napit ja kameran alaraja korin lepoasennosta (PalloKori.KompassiLepoNorm), PaivitaKatse pehmentää vaiheen ja alarajan vaihdon; ruutulokiin komplepo ja alas.
- 7d719ae76: Pariisissa tervehdys avauksen tilalle (OpasSovitin.TervehdysJaLasku), OpasSilmukka.TervehdysLasku: lasku = tervehdys + TervehdysLiukuS 2,5 s, kerronta heti tervehdyksen jälkeen. Opastus siirtyy 1. pysähdyksen jälkeen. Muut kaupungit ennallaan.
Testit: kaanna.sh "Pallo|Opas|Pysahdys|LahtoLaatat|Kierros|Museo" 519/519. Linssit-testit/unity-tarkistus.sh 0 virhettä (aja suoraan, ei zsh:lla: zsh ei jaa muuttujia ja väittää Peli ei kääntynyt). Koko testisarjaa ei ajettu. Testit ovat ytimen tasolla; kumpaakaan korjausta EI ole nähty pelissä.

## Mitä ajo 9e064504d mittasi (lokit/natiiviseppa-pallo-toisto-9e064504d, Mac 2420×1668)
JU:n viesti sanoi 2 ruuturiviä; todellisuudessa 3392 (t 193–317). PUUTE aloitusintro-odotuksesta ei haitannut. Lokin ArgumentOutOfRange on Unityn SearchDatabase, ei meidän koodi.
- Vika 2 toistui: napitala 8–68 pt, 246 vaihtoa 124 s:ssä, seuraa komp-arvoa (kompassin alareuna 0,84–0,94).
- Vika 1 toistui: pysähdyksellä kallistus hyppää yhdessä ruudussa 0,34–0,83°, 18 kertaa 37 s:ssä. Lentaa → Puhuu t 269,049 (-0,83°, ala ei muuttunut), muut samassa ruudussa kuin ala vaihtui. Saapuessa kolme hyppyä 0,7 s:ssä (269,05 / 269,53 / 269,76) sopii omistajan kuvaukseen "sisään ja ulos", mutta sitä, että omistaja näki juuri tämän, ei ole varmistettu; iPadilla ei mitattu. Px-arvot 11–28 on laskettu kulmasta (1668 px / 50°), ei mitattu kuvasta. Syy: hyppy jäi KatseKatkosAst-rajan alle, joten jousi ei pehmentänyt.
- Vika 3: esitys alkaa → kierros 35,5 s, lasku 30,2 s (24 + saapumisportti 6,2), yhteensä 65,7 s. Tavoiteajo: tervehdys + 2,5 s.

## Odottaa
1. JU: ajo natiiviseppa-pallo-korjaus-7d719ae76, skenaario /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/pallo-aloitus/sk-pallo-korjaus.txt, sama koko. Skenaario on ajamaton.
2. Valoseppä: ääni valmis, kesto_s 5,911, otto ei vielä omistajalla; opas/esittely-v1/aanet/pariisi-tervehdys.mp3 + .ajat.json, vienti vasta KK:n kuittauksella. Koodi hakee ne (3 s aikaraja), puuttuessa teksti lukuajan verran, joten JU:n ajo kulkee tekstipolkua eikä todista ääntä.
3. PT: 18.19 kerrottu laskun nopeus. Ytimen testi: lasku 8,5 s, kerronta 6,0 s, huippu 159 m/s, kääntö 7,9 °/s. Kiihtyvyyttä ei mitattu; karkea laskelma noin 80 m/s² vs. TF 168:n raja 10 (AvausJaEnsimmainenLento koskee yhä muiden 24 s:n lentoa). Omistaja valitti aiemmin 37 m/s²:sta "melkein seinään", joten tämä on pari-arvion päätarkistus. Säätö: TervehdysLiukuS.

## Seuraavaksi, kun ajo tulee
1. python3 -I ruutulokin analyysi: napitala ei saa vaihtua lennolla eikä kerronnassa muuten kuin kosketuksesta; kall ei hyppää yhdessä ruudussa yli 0,1° lentoa rauhallisemmissa vaiheissa; komp keinuu silti. Skriptit olivat session scratchpadissa, kirjoita uudelleen (rivit "MATKAKIRJA opas ruutu", kentät key=arvo).
2. Tarkista napitala, kun rivi ilmestyy: toistossa 60 → 36 → 40 ensimmäisissä ruuduissa. Lepoarvo poistaa keinuntaosan; 60 → 36 voi jäädä (ensimmäinen ruutu eri haarasta, syy varmistamatta).
3. Kuvat täysikoossa, sitten pari PT:lle: a2–a4 ennen (9e064504d) ja jälkeen. Jos uusi lokin aika ei täsmää, ei valmis-riviä.

## Muuta
Omistaja 17.58 (Raamattu 10.5, sitova): jokainen Mac-ajo ratkaisee yhden kysymyksen; pyynnössä rivi "mitä tämä ratkaisee", enintään noin 5 kuvaa, ei verrokkia, jos vanha kuva kelpaa, ei ajoa, jos testi tai loki riittää.
EsitysAla ja AsetaJatkaPaikka lukevat lepoarvoa OpasSovitin.KoriKompassiNormin kautta; kori keinuu nyt nappien alla, kuvassa tarkistettava, ettei rivi näytä irralliselta.
