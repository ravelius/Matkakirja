# Rabat — kirjoitusmuistiinpanot, vaihe C

11.10.2026. Vain sisalto.json sekä tämä oma kirjoitusmuistiinpano kirjoitettu kaupungin kansioon. Ei git-, peli-, A/B- eikä verkkotoimia. Kaikki väliaikaiset tiedostot ja TMPDIR NASin valiaikainen/rabat-C-kansiossa.

## Tarkistukset

- Paikallinen `tyokalu.mjs tarkista e04 rabat`: **0 virhettä, 1 varoitus, 23 kuvaa**. Ei `--verkko`-ajoa; F:n lähdesivutarkistus kuuluu pääsessioon.
- Varoitus: intro sisältää pyöreän suuruusluokan. Säilytetty tarkoituksella A:n 1/8.10-linjauksen mukaan: ”Rabatin prefektuurissa oli vuonna 2024 noin puoli miljoonaa asukasta”. Tarkalle HCP-luvulle ei ole kahta riippumatonta lähdettä; laajuus ja vuosi nimetty.
- Tiukat mitat: intro 981 merkkiä, 9 virkettä, 3 kappaletta, 2 lihavointia; artikkeliteksti 886 merkkiä ja 3 kappaletta. Nostot 481, 494, 509, 487, 489, 487, 507 ja 493 merkkiä.
- Kohdejutut 935, 946, 928, 916, 912, 959 ja 973 merkkiä; jokainen 3 kappaletta, aika ja 1 kuva. Kartalla A:n seitsemän täsmällistä nimeä/koordinaattia ja A:n noin 300 m marginaalin rajaus.
- Lyhyet kuvatekstit 34–58 merkkiä, kukin yksi virke ja piste. Kaikki selitteet yksi virke. 23 eri tiedostoa; tiedostot ja lähderivit verrattu koneellisesti B:n selected.json:iin sanatarkasti.
- Viisi kysymystä, tasot 1 ja 3 mukana; jokaisessa neljä eri vaihtoehtoa. Oikea vastaus ei ole pisin. Minitehtävä koskee minareetissa pesimistä ja eroaa kaikista viidestä visakysymyksestä.
- Oppaassa viisi jaksoa ja täsmälleen kaksi kuvatonta (ruoka, sää), parasta viisi sekä hyväTietää neljä. Ei ennen–nyt-paria.
- Säädata vastaa saa.json:ia sellaisenaan ilman tausta-kenttää. Luonnehdinnan ja oppaan lukujen lähde on vain tämä data; keskilämpöä ei laskettu uudelleen.
- Kansi/nimi/ranta: A K1–K4. Historia: A H1–H4. Opas: A4. Kohdejutut/kartta: A5. Kysymykset ja tiedot: A6. Hassan-tornin toistotarina ja suojatut modernit kohteet jätetty pois A8–A9 mukaan.

## C:n oma kuvantarkistus

Jokainen seuraavista 23 esikatselusta avattiin tässä C-vaiheessa erikseen view_image-työkalulla ennen kuvatekstin lukitusta. Havainnot alla ovat omia havaintoja nähdyistä kuvista, eivät B:n katsottu-merkinnän kopio.

| Kohta | Tiedosto | C:n havainto ja kuvatekstin rajaus |
|---|---|---|
| Kansi 1 | `Rabat panorama.jpg` | Joen takana kasbahin kukkula, muurit ja asuintalot; veneitä etualalla. Kuvateksti nimeää kasbahin ja joen suun. |
| Kansi 2 | `Late-Afternoon View over Medina (Old City) - From Hotel Majestic - Rabat - Morocco.jpg` | Medina näkyy laajana kattojen kokonaisuutena pitkän muurin takana; kadulla etäisiä ihmisiä. Ei yksittäistä moskeijaa kuvatekstiin. |
| Kansi 3 | `Chellah (Sala Colonia) 3.jpg` | Laaja kivisten raunioiden alue ja taustalla reunamuuri. Kuvateksti käsittelee Chellahin eri aikojen jäännöksiä. |
| Kaupunkinosto K1 | `Ruelle bleue, Kasbah des Oudayas (Rabat, Maroc) (15561666480).jpg` | Sinivalkoisen kapean kujan ovet ja ikkunat, johdot ylhäällä; ihminen kaukana. Kuvateksti kertoo asuinkaduista. |
| Kaupunkinosto K2 | `Salé from the Plateforme du Sémaphore (Kasbah des Oudais) (5509116076).jpg` | Salén katot ja muurit sekä hautausmaa veden äärellä. Tämä on vastarannan Salé; kuvateksti ei väitä näkymää Rabatin kasbahiksi. |
| Kaupunkinosto K3 | `Pavilion of Moulay Ismail 03.jpg` | Paviljongin sisäpihan pylväät ja kaaret hallitsevat kuvaa; alhaalla vitriinejä ja yksi selin oleva kävijä. Kuvateksti rakennuksen käytöstä, ei nähtävistä koruista. |
| Kaupunkinosto K4 | `Rabat–Salé tramway in 2026.01.jpg` | Raitiovaunu on kadun pääaihe. Rakennukset ovat ympäristöä; kuvateksti vain raitiotiejärjestelmästä. |
| Historianosto H1 | `باب الرواح.jpg` | Bab er-Rouahin veistetty ulkokaari ja molemmat tornit näkyvät. Kuvateksti nimeää portin ja almohadihistorian. |
| Historianosto H2 | `Muraille des Andalous 1 - Rabat.JPG` | Pitkä Andalusialainen muuri ja kävelytie, ei lähikasvoja. Kuvateksti medinan rajasta. |
| Historianosto H3 | `Sala Colonia, Morocco (32853576932).jpg` | Kaivettuja kivihuoneita ja muurirakenteita Chellahissa, palmu keskellä. Yksittäistä epävarmaa temppeliä ei nimetä. |
| Historianosto H4 | `Chellah Mosque.jpg` | Chellahin minareetti ja suuri huippupesä; haikara näkyy pesän päällä. Kuvateksti juuri tämän kompleksin minareetista. |
| Matkailijalle | `Moulay Slimane Mosque Rabat DSCF2465.jpg` | Moulay Slimanen moskeijan minareetti ja ulkoseinä yksiselitteisinä pääaiheina, ei ihmisiä. Pystykuva sopii opastaittoon. |
| Opas, jakso 1 | `Rabat–Salé tramway in 2026.02.jpg` | Eri raitiovaununäkymä kadulla; pylväs peittää osan keulaa, muu vaunu terävä. Kuvateksti raitiovaunuyhteydestä. |
| Opas, jakso 2 | `Pavilion of Moulay Ismail in Andalusian Garden Rabat DSCF2755.jpg` | Moulay Ismailin paviljongin historiallinen torni puutarhan puolelta. Kuvateksti nimeää paviljongin, ei puutarhan perustamista. |
| Opas, jakso 3 | `Roman Ruins Kasbah Chellah Rabat Morocco 094600 (49679359096).jpg` | Lähinäkymä Chellahin kaivausmuureihin ja kivisiin huoneisiin. Näkymätöntä minareettia tai hautaa ei kuvatekstissä. |
| Kohde 1 | `Kasbah Oudayas exterior.jpg` | Kasbahin suuri portti ja linnoitusmuurin tornit; pieniä kulkijoita portailla. Kuvateksti nimeää Bab Oudaya -portin. |
| Kohde 2 | `Boats in Bouregreg (2).jpg` | Veneitä suiston vedessä, taustalla kasbahin rinne ja muurit. Kuvateksti koskee Bou Regregin suistoa. |
| Kohde 3 | `Enceinte de la Medina de Rabat P1060367.JPG` | Andalusialaisen muurin osuus päättyy pyöreään Borj Sidi Makhlouf -linnakkeeseen; lähin pyöräilijä selin. Molemmat rakenteet ovat kuvatekstin kohteena. |
| Kohde 4 | `Moulay slimane mosque rabat DSCF7479.jpg` | Moulay Slimanen minareetti näkyy muurin ja kattojen takana. Kuvateksti nimeää moskeijan; nykyistä satelliittiantennia ei selitetä. |
| Kohde 5 | `Bab Rouah inner facade edit.jpg` | Bab er-Rouahin sisäpuolen kaariaukko ja kivikoristelu; ei näyttelyteoksia. Kuvateksti portin sisäjulkisivusta ja kulkureitistä. |
| Kohde 6 | `Chellah interior hill.jpg` | Raunioseiniä, iso kiven tai kapiteelin jäännös oikealla ja taustalla vanha reunamuuri. Yksittäistä epävarmaa rakennusta ei nimetä. |
| Kohde 7 | `Sidi Makhlouf 1.jpg` | Borj Sidi Makhloufin pyöreä torni, aseaukot ja siihen liittyvä muuri. Kuvateksti sataman puolustuslinnakkeesta. |
| Valokuva | `Chellah-Storks.jpg` | Useita haikaroita ja pesiä puussa. Minareettia ei ole näkyvissä, joten valokuvan kuvateksti kertoo vain puissa pesivistä linnuista. |

Tämä on C-vaiheen toimitus. Riippumaton D-tarkistus sekä E/F ovat vielä jäljellä; kaupunkia ei ole kytketty peliin eikä julkaistu.
