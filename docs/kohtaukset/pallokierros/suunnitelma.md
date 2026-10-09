# Pallokierros, Tukholma ja Pariisi: ohjaajan suunnitelma

Linjaus: LIIKKUVAT KOHTAUKSET TEHDÄÄN KUIN ELOKUVA (omistaja 9.10.2026, Raamattu-PR #4264), kohta 1.
Laatija: Linssisepän apuagentti 9.10.2026 klo 09.2x. Tämä on pohjatyö, ei vielä muutos koodiin.

Lähteet:
- koodi: proto, haara `linssiseppa/kierros-170` (5e71527ff), kansio `Assets/Matkakirja/Linssit/`
- kertojan lauseajat: `proto-3d/_tyo/lentokerronta-ajat/lentokerronta-ajat.json` (Pelikoodari 9.10.)
- kohteiden paikat: `proto-3d/_tyo/opas-esittely/pohja/*.json`, `proto-3d/_tyo/kehityskaupungit-170/tukholma-uudet-kohteet.json`
- järjestys: Tukholma esittely-v3 `kierros` (14 kohdetta), Pariisi workerin kierros (8 kohdetta, lokit 8.–9.10.), molemmat lyhimmän reitin järjestyksessä (OpasReitti)
- mitattu telemetria: `proto-3d/lokit/` (ks. liikesaannot.md, kohta 0)

## 1. Mitä katsojan pitää muistaa

Kierroksen tehtävä on jättää kaupungista muistikuva, ei luetella kohteita. Jokainen kohtaus palvelee jotakin alla olevista.

### Tukholma (14 kohdetta, noin 11 min)

1. **Kaupunki on rakennettu saarille veden keskelle.** Mälaren ja Itämeri kohtaavat, ja kaikkialla on salmia ja siltoja. Avaus ja yläkuvat näyttävät tämän.
2. **Vanhakaupunki on tiivis keskiaikainen ydin, jonka keskellä on kuninkaanlinna.** Linna, Suurkirkko, Stortorget ja Ritarihuone ovat kaikki muutaman sadan metrin säteellä.
3. **Tukholma oli suurvallan pääkaupunki.** Vasa-laiva, Riddarholmenin kuninkaiden hautakirkko ja valtiopäivätalo kertovat 1600-luvun mahdista.
4. **Kaupunki elää yhä veden äärellä.** Skeppsholmen, Skansen ja Kungsträdgården näyttävät, miten saaria ja rantoja käytetään nyt.

### Pariisi (8 kohdetta, noin 5½ min)

1. **Pariisi syntyi Seinen saarelta.** Kierros alkaa Cité-saarelta Notre-Damesta, ja joki on mukana koko ajan.
2. **Kaupungilla on yksi suuri akseli.** Louvre, Concorde, Champs-Élysées ja Riemukaari ovat samalla suoralla linjalla. Katsojan pitää nähdä linja yläkuvassa.
3. **Rautatorni ja kukkula ovat kaupungin kaksi korkeinta merkkiä.** Eiffel-torni joen vasemmalla puolella ja Sacré-Cœur Montmartren kukkulalla päättävät kierroksen.

## 2. Kierroksen rakenne (nykytila koodissa)

| Osa | Mitä tapahtuu | Kesto nyt |
|---|---|---|
| Siirto | Tumma latausruutu, laatat latautuvat. Näkymä aukeaa, kun yleiskuva ja ensimmäinen kohde ovat valmiita. | 1–20 s |
| Avaus | Avausnäkymä 1 100 m:n etäisyydeltä, 50° kallistus. Ensimmäinen kohde kuvan alakolmanneksessa. Kertoja lukee avauksen. Kamera kiertää 14° ja lähestyy 15 % 16 sekunnissa. | Tukholma 31 s + 2,5 s, Pariisi 19 s + 2,5 s (ensimmäisellä kyydillä lisäksi opastus 12,5 s) |
| Laskeutuminen | Suora lasku avausnäkymästä ensimmäiseen kohteeseen. | vähintään 24 s |
| Pysähdys | Pallo kiertää kohdetta (kaari enintään 80°) ja laskeutuu hiukan (spiraali). Korostus palaa. | 5–55 s (riippuu kerronnasta) |
| Lento | Pehmeä kiihdytys 9 s, tasainen vauhti, pehmeä jarrutus 9 s. Lyhyet välit: 23,4 s. Kaksi pisintä väliä (yli 1,2 km) nopeina: 18 s. | 18–23,4 s |
| Loppu | Viimeisen kohteen kerronnan jälkeen kierros päättyy. Erillistä loppukohtausta ei ole. | – |

Kertoja:
- Kohteen lyhyt kerronta (2–3 lausetta, 21–26 s) alkaa 2,5 s lähdön jälkeen. Siksi suurin osa siitä soi lennon aikana.
- Joka neljännen lennon alussa soi pallon siltalause (noin 4 s).
- Joka toisella muulla lennolla soi historiaosio (28–46 s). Silloin kohteen kerronta alkaa vasta osion jälkeen, ja pysähdys venyy 35–46 sekuntiin.
- Tukholman Suurkirkolla, Stortorgetilla ja Skeppsholmenilla ei ole lyhyttä tekstiä. Oletuksena worker antaa niille pitkän tekstin (51–52 s).

## 3. Suurimmat ongelmat ohjaajan silmin

1. **Kertoja puhuu kohteesta ennen kuin se näkyy.** Kohteen X kerronta alkaa, kun kamera vielä katsoo edellistä kohdetta. Saapuminen osuu viimeiseen lauseeseen. Pysähdys on vain 5–10 s, ja sen jälkeen pallo lähtee taas.
2. **Pysähdykset ovat joko liian lyhyitä tai liian pitkiä.** Tavallinen pysähdys kestää 5–10 s. Historiaosion jälkeen pysähdys kestää 35–55 s, ja kaari ja lasku loppuvat jo noin 20–30 sekunnissa, joten pallo leijuu paikallaan 10–30 s.
3. **Vanhankaupungin lyhyet hypyt.** Linna → Suurkirkko 113 m, Suurkirkko → Gamla stan 94 m ja Gamla stan → Stortorget 0 m. Hyppy kestää 23,4 s, vaikka kohteet näkyvät jo samassa kuvassa.
4. **Avauksen kamera seisoo.** Kierto loppuu 16 sekunnissa, mutta Tukholman avaus kestää 31 s (ensimmäisellä kyydillä 46 s).
5. **Nopeat lennot.** Champs-Élysées → Sacré-Cœur (3,2 km / 18 s) ja Concorde → Eiffel-torni (2,1 km / 18 s) ovat arviolta 4–7 kertaa tavallista lentoa nopeampia kuvassa (kuvan nopeus 0,8–1,1 rad/s, tavallinen 0,15–0,2 rad/s). Linjauksen mukaan kova vauhti on sallittu vain harkittuna tehokeinona.
6. **Hiljaisuus vaihdoissa.** Kerronnan lopusta seuraavan alkuun kuluu noin 5,5 s (1 s tauko + 2 s jarrutus + 2,5 s). Jos lähtö odottaa laattoja, aikaa kuluu enintään 5 s lisää (juna 165:n lokissa toistuvasti 5,0 s).

7. **Kohteet näytetään liian korkealta** (omistaja TF 169, sitova sääntö 9.10.). Silmä on nyt 55–400 m maasta, koska kattoraja on 55 m ja spiraalin alaraja 60 m katsepisteen yläpuolella. Tavoite on rakennuksen puolivälin ja hieman sen yläpuolen väli (0,5–0,7 × H). Pariisin alussa pallo laskeutuu koko Notre-Damen esittelyn ajan, ja Concordella pallo menee obeliskin tasolle. Tarkemmin liikesaannot.md kohta 3b.

## 4. Tavoiterakenne (ehdotus Linssisepälle ja Päätoimittajalle)

1. **Kohteen kerronta alkaa laskeutumisessa.** Ensimmäisen lauseen pitää päättyä saapumishetkellä (±1 s). Tämä lasketaan lauseajoista. Lennon alkuosa jää edellisen kohteen viimeiselle lauseelle, siltalauseelle tai historiaosion lauseelle.
2. **Pysähdys kestää koko kerronnan, ja kaari kestää koko pysähdyksen.** Kaaren nopeus lasketaan pysähdyksen kestosta (kokonaiskierto 45–80°). Paikallaan leijumista enintään 3 s kerronnan aikana.
3. **Historiaosio kuuluu lennolle, jonka pituus vastaa osiota.** Jos osio on lentoa pidempi, lento venytetään hitaana yläkuvana tai osio jaetaan lauseittain kahdelle lennolle. Ei soiteta kohteen päällä 15–20 sekuntia ennen kohteen omaa kerrontaa.
4. **Vanhankaupungin kohteet yhdeksi tai kahdeksi pysähdykseksi** (Tukholma: linna + Suurkirkko + Stortorget/Gamla stan). Siirtymä hoidetaan kaarella eikä lennolla. Tarkemmin karsintaehdokkaat kohtauslistoissa.
5. **Nopea lento enintään kerran kaupungissa ja tietoisesti.** Pariisissa ehdokas on Champs-Élysées → Sacré-Cœur, jossa nousu näyttää koko akselin. Muut lennot tavoitenopeuteen (liikesaannot.md).
6. **Avauksen kamera liikkuu koko avauksen ajan.** Kierron kesto = avauksen kesto (+ opastus).
7. **Esittelykorkeus.** Pallo laskeutuu jokaisella pysähdyksellä 0,5–0,7 × H:n korkeudelle. H tulee jalanjäljistä tai omasta pintamallista. Matalilla kohteilla alaraja on kattojen korkeus + 10 m. Notre-Dame ja Concorde ovat omia laskeutumiskohtauksia.
8. **Loppukohtaus.** Pallo nousee hitaasti yläkuvaan, ja kertoja sanoo yhden lopetuslauseen. Tämä puuttuu nyt.

## 5. Avoimet kysymykset (eivät estä tätä työtä)

- Pariisin kierros on workerissa 8 kohdetta. Pelikoodarin lauseajoissa on kaikki 20 Pariisin kohdetta. Jos kierros laajenee, kohtauslista tehdään uudelleen.
- Tukholman Gamla stanilla ja Stortorgetilla on samat koordinaatit (59,325, 18,07083). Worker voi antaa eri pisteet, mutta pohja-aineistossa ne ovat päällekkäin.
- Lyhyttä tekstiä ei ole Suurkirkolle, Stortorgetille eikä Skeppsholmenille. Kysymys Pelikoodarille: tuleeko niille lyhyt teksti, vai soiko kierroksella pitkä teksti?
