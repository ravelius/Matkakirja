# Natiivisepän luovutus 6.11.2026 klo 12.16 (konteksti yli 25 %, pehmeä raja, 7.37)

Korvaa -1155:n SEURAAVA TYÖ:n kohdan 1. -1155:n kohta 2 (palat-v10) ja -1140:n "Mitä koodissa on" pätevät, mutta määrät ja kärki ovat alla. Sessio Natiiviseppä, kansio Matkakirja-3d-selvittaja. Luo ensin cron "4 9 * * *" (Raamattu 7.41, proto-3d/tyokalut/natiiviseppa-skriptit/unity-julkaisut.py). Se on yhä luomatta.

## SEURAAVA TYÖ
Odottaa kolmea tulosta. Älä pyydä niitä uudelleen; ne tulevat NS:lle viestinä.

1. PALIKKAKOE MAC-4 (JU:n jonossa). Haara natiiviseppa/palikka-koe d015acab6 (peilissä natiivi-backup peili/proto/natiiviseppa/palikka-koe, työpuu /Users/Shared/Claude/wt/proto-natiiviseppa-palikka), skenaario _tyo/natiiviseppa/palikkakoe/sk-mac-4.txt, lokit lokit/natiiviseppa-palikka-mac4-d015acab6.
   - Kun tulos tulee: grep unity.logista "Shader error in 'Matkakirja/Kartta/Palikka'" (JU:n "0 error CS" ei kerro sitä), kuvat täysikokoisina.
   - Parit nykyinen | B2: lokit/natiiviseppa-palikka-mac2-783d4c86c/m-nyt ja c-nyt | mac-4:n m-b2 ja c-b2; kamerat samat. Malli: palikkakoe/parit-mac2.py. Lisäksi y-b2.
   - KK:lle seuraavassa parissa, mitkä neljästä kohdasta näkyvät korjattuina (KK pyysi). Tiivistys PT:lle. KK näyttää parit omistajalle varhaisena kokeena.
   - KK:n kohdat (mittari omistajan sanat 10.31, väripaletti): (1) värit karttapaletista v2, (2) katon ruskea laatta, (3) korttelit yhtenä laatikkona, (4) puut isot ja lelumaiset. Tehty d015acab6:ssa, NÄKEMÄTTÄ:
     (1) PalikkaYdin.cs: katto #a88c74, latvus #8f7743, rungot ja tolpat #6a5033, lyhty #c6a35e, räystäs ja silta #f1d5a9. Arvot lineaarisina. Paletti: _tyo/karttaseppa/karttapaletti-v2/paletti-v2-lohko.py. Raja koskee väriä näytöllä; mittaa näytön väri kuvasta, tarvittaessa tyokalut/karttapaletti.py (natiivi).
     (2) Rinne = Katto, muoto ennallaan.
     (3) tee-palikat.py laatikot(): kovera talo usealla laatikolla, 942/2 000 jaettu, 3 899 laatikkoa, peitto 94,5 %. Oma katto joka laatikolle: KK:lle kerrottu, että katto voi näyttää palaselta. Sisärenkaalliset talot olivat kokeen ulkopuolella jo ennestään.
     (4) Puut ≤ 14 m, latvus ≤ 0,6 × korkeus (poikkeaa datasta tarkoituksella). Pallomaista latvusta ei muutettu; jos lelumaisuus jää, se on seuraava kohta. KaupunkiPuu.shader on malli: siinä on latvuksen reunakohina.
   - Data: PK_VAIN_DATA=1 tee-palikat.py ... kirjoittaa vain datan; argumentit tee-palikat-v2.log:n ajosta eli tee-palikat.zsh:stä, toinen argumentti tyhjä kansio. palat-ilman-marais kelpaa ennallaan (samat 2 000 taloa, kaukaisin 735 m). Kopio Assets/Matkakirja/Kartta/Resources/PalikkaData.bytes.

2. IPAD-NOPEUSAJO (JU:n jonossa, ei odota mac-4:ää, KK: nopeus ei odota väriä). Ohje palikkakoe/ajopyynto-ipad-1.md, lokit lokit/natiiviseppa-palikka-ipad1-d015acab6. r3: A0|A1, A0|B2, A0|B3, B2|B3, jakso 20 s, 3 paria. Ratkaiseva suurinP95Ero, raja 16,7 ms.
   - Tarkista ensin B2- ja B3-jaksojen omatKutsut > 0; muuten luku ei kerro palikoista.
   - Nykyiset talot pysyvät iPadilla, joten palikkatalot ovat niiden päällä: tulos on varovainen, kirjaa se tulokseen.
   - Tulos KK:lle, tiivistys PT:lle. r2 ja r1 tarpeen mukaan. C-ajoista sana PT:ltä ensin.

3. KS:N AJO 11 (-1155 kohta 2): KS kertoo kansion, kun on katsonut. v10 kansio-sha 3013995533fc3106. Kuvat po-la, louvre-ita, pr-etela, canopee. Katso Palais-Royal'n leikattu etelämuoto ja Canopéen välke; arvio KK:lle. KS ei tee pohjaan aukkoa (alue tasaista kiveä, aukko paljastaisi kartan litteän katon leikatun eteläpään). Se ratkaisi -1155:n "KS päättää" -kohdan.

## Tulokset tässä sessiossa
- Mac-2 (783d4c86c): B2 piirtyy kuvissa beginCameraRendering-siirron jälkeen. B3 ei: varjostimen rivi 76.
- Mac-3 (e984a3a1c): B3 piirtyy. Ei varjostinvirheitä, ei magentaa. c-b2 | c-b3 ero 0,0 %, m-b2 | m-b3 0,9 %. Ero m-parissa on päätelty liikkuvista kohteista (linnut, nimet), ei mitattu erikseen.
- MITTARI RATKAISTU, PÄÄTELTY: Macin eräajossa B2:n omatKutsut 0 ja kolmiot 3 182: 3D-kamera ei piirrä kuvien välillä, vain kamera.Render()-kuvissa. Mac-1:n 932 043 oli jonoon laskettu, ei piirretty. Siksi Macin aikaerot eivät ole tuloksia (mac-1 −0,55, mac-2 +0,89). PT:lle kerrottu. Mitattu vain lokin luvuista; iPad vahvistaa.
- ArgumentOutOfRange lokin alussa on Unityn oma (SearchDatabase, QuickSearch), sama mac-1:ssä, ei palikoista.

## Opit
- UNITY_ANY_INSTANCING_ENABLED on aina määritelty arvolla 0 tai 1: käytä #if, ei #if defined. Virhe näkyi vasta, kun variantti piirrettiin ensimmäisen kerran, joten mac-1:n "0 varjostinvirhettä" ei todistanut mitään.
- JU:n yhteenveto ei kata varjostinvirheitä: grep aina unity.log.
- Tarkista lokikansio ennen uutta pyyntöä: mac-3 ehti valmistua, ennen kuin odotuspyyntö perille.
- kaanna.sh ajetaan /bin/sh:lla, ei zsh:lla (sanojen jako).
- Koko _tyo/karttaseppa-kansion grep ei valmistu 120 s:ssa; rajaa kansio.

## Huomiot
- Taustalla jäi tästä sessiosta grep (_tyo/karttaseppa), päättyy itsestään, ei kirjoita mitään projektiin.
- NS:n työpuita wt/-kansiossa 8 (raja 3): kerro PT:lle ennen poistoja (-1140).
