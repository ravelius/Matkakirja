# Natiivisepän luovutus 5.11.2026 klo 16.55 (konteksti 27 %, pehmeä raja, 7.37)

Korvaa -1645:n jonon. Muu -1645 ja -1620 pätevät. Sessio on Natiiviseppä, kansio Matkakirja-3d-selvittaja. Lue Raamattu 7.47:n rivi. Remote päälle, T7-Monitor uudelleen (pid 58484, kopioi.log vain ALOITUS 13.28; ei poistoja ennen PT:n lupaa). Luvut 6, 9, 10 ja 12 vievät noin kolmanneksen pehmeästä rajasta.

## Linjaus ja jono
Omistaja 16.41 (PT:n välittämä): "keskitytään vain pariisin 3d rakennuksiin". PT: ei uusia kokeita tyhjästä pohjasta tai laskusta. Jonossa ei ole mitään: lepo, kunnes KK tai PT pyytää. Odotan KK:n päätöstä intron näyttämisestä omistajalle (KK sai viat 16.5x).

## Haara: natiiviseppa/saapuminen-porras-219 379991bd6
Työpuu /Users/Shared/Claude/wt/proto-natiiviseppa-kierto, peili natiivi-backup peili/proto/natiiviseppa/saapuminen-porras-219. tarkista.sh 0 virhettä; PalloLiikeTestejä ei ajettu d31fc8676:n ja 379991bd6:n jälkeen. Liiku 99748962f on eri haarassa (natiiviseppa/liiku-loitonnus-219), NUI:n kyltit-219:n uudet commitit eivät ole mukana: yhdistä ennen KK:n lopullista kuvaa.

## 379991bd6 katsottu (ajot natiiviseppa-matka-379991bd6 ja natiiviseppa-intro-379991bd6)
Täysikokoisena i07. p01–p06 ja i01–i17 (9 kuvaa) vain pienennettyinä koosteina, p07–p14, muut i-kuvat, n-1km-85 ja n-6km-60 katsomatta. PUUTE oleta aloitusintro Lontoo aikaraja ja POIKKEUS ArgumentOutOfRange ennen pelin alkua molemmissa, kuten ennenkin; POIKKEUS oletettavasti Unity Search (-1510), tässä ei tarkistettu.
- Täyttyi: otsikon alla ei nimiä, kylttejä eikä PARIISI, RANSKA -riviä (i07). Nimet palaavat otsikon jälkeen.
- Täyttyi: laskun alussa pallo 96–100 %, 131–148 laattaa, ei nollaa. p01 koko Ranska, ei hiekkaa. Yksi ajo per skenaario, Mac, iPadilla ei nähty.
- Auki, lähtö: väritaso vaihtuu lähdössä ja pudottaa kartan: 0,26 s ruudulla 0 laattaa (matka) tai 6 (intro), 0,5–0,6 s 8–9. Ei kuvaa lähdöstä, näkyvyys tuntematon. -1620:n riski toteutui lokissa. Ratkaisua ei ole, ei kokeilla linjauksen aikana. Matkalla lataus jää 77–88 %:iin (matka-ajo), ennen lähes 100 %.
- Auki, sumeus ja portaikkoinen etuala: i07 yhä karkea. p03 sumea ja p04 terävä, mutta kuvanotto hidastaa ajoa, joten syy ei selvinnyt.
- Auki: p02:n vino raja vaaleampaan tasoon. n-1km-85:n kolmio ja raita, jättinimi (NUI 098cf05cd).
- i03: Notre-Dame noin 180 px, kyltit juuren ja tornin päällä (NUI ed6c66eaf ei mukana). Yläreunassa tyhjä vaalea kyltti, luultavasti häivytys kesken, tarkistamatta. Taivasta noin 27 %.
- Rajaus: `if (kaupunki == "pariisi")` SaapumisLaatatSilta.MatkaAlkoi. Muita maiden välisiä matkoja ei ajettu, joten rajausta ei ole nähty niillä.
- Portaat 5282b9fc4: vertailu `komento maasto saapumisennakko pois` tekemättä. Portaat 1/3 ja 2/3 näkyivät matka-ajon lokissa.

## Notre-Damen tornit eivät ole vika
Omistajan tilaama liioittelu, mittari on G-kuva (KK 16.5x, muisti notre-dame-tornit-levenevat-tilattu). Mittaus: mallissa +15–19 %, pelissä +15 %, kamera ei vääristä mallia. Kuva lokit/natiiviseppa-nd-tornit-malli.png. Ei suoristusta.

## Muuta
Zsh: `$S:Assets` tulkitaan muuntimeksi, käytä `${S}:`. `echo ====` ja `*.uss` ilman osumaa kaatavat komennon. tarkista.sh muuttaa aina tyylikirjan kolme tiedostoa: git restore ennen committia.
