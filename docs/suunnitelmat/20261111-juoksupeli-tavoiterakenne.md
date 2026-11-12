# Juoksupelin tavoiterakenne ja palajärjestys (vaihe 2; KK 11.11.2026 klo 13.2x)

Pohja: katselmus 20261111-juoksupeli-katselmus.md (lohkot 1–4, löydökset A–Q), suunnitelma 20261111-juoksupelin-peruskorjaus.md
(omistajan kortti 11.11. 11.09), kameralinjaus 11.15 ja 11.17. Tämä on KK:n linja; roolit toteuttavat paloja KK:n tehtävänannoilla.
Sama rakenne on "3D-pelin runko" seuraaville peleille.

## 1. Juurisyyt yhdellä sivulla
1. Asioilla ei ole yhtä tilaa. Pelaajan, takaa-ajajan, eunukkien, esineiden ja kameran paikka lasketaan säännöistä joka ruutu usealla
   tavalla, ja erot paikataan jousilla (F, G, K, juurisyy 1).
2. Uusi on rakennettu vanhan päälle kytkimen taakse, eikä vanhaa ole poistettu: kolme kameraa, kolme maailmaa, neljä reittisukupolvea,
   kaksi valojärjestelmää, tusina numeroitua varjostinkytkintä (A–E, L, N, O).
3. Joka ruutu tehdään työtä, jonka tulos ei muutu: pinnan ulkoasu kaavasta, varjon heittäjien valinta, tarkkuustasot, kattojen tila (J, M, O).
4. Kaikki on muutamassa jättimetodissa (Paivita 1762 r., PaivitaRuutu 153 r., fragPeli 360 r.), ja mittarit, testikomennot ja lokit ovat
   pelisilmukan sisällä (juurisyy 3, P, Q).
5. Testit vartioivat poistuvaa koodia (I).

## 2. Moduulit (yksi omistaja, yksi rajapinta, yksi hyväksymistesti kullekin)
| Moduuli | Tehtävä | Tietää | Ei tiedä |
|---|---|---|---|
| Pelisilmukka | Tilakone Lataus → Avaus → Peli → Loppu → Tulos; kiinteä askel 1/120 s; kutsuu vaiheet nimetyssä järjestyksessä: syöte → liike → säännöt → kamera → näkymä → ääni → HUD | kaikki moduulit rajapintoina | mitään sisältä |
| Syöte | Kosketus ja näppäimet → aikomus (käänny, vaihda linjaa, hyppää, liu'u, heitä, spurtti) | ruudun koko, peukaloalueet | pelitilaa |
| Pelitila | Pelkkää tietoa: jokaisen hahmon ja esineen paikka (x, z), suunta, nopeus, toiminnan tila; elinvoima, pisteet, aika; tapahtumaloki. Edellinen ja nykyinen askel tallessa | – | piirtoa, kameraa |
| Liike | Kappale kulkukartalla: aikomus toteutuu kaarteena, jolla on säde, ja kiihtyvyydellä, jolla on raja. Sama malli pelaajalle, takaa-ajajalle ja eunukeille | kulkukartta | sääntöjä |
| Säännöt | Elinvoima, osumat ja keruu etäisyytenä, eunukkien tilat, takaa-ajaja, pisteet, tapahtumat. Asetukset luonnissa, ei staattisia kytkimiä | pelitila | karttaa, reitin rakennusta, piirtoa |
| Maailman aineisto | Lataus yhtenä luettelona latausjonon kautta; kulkukartta; leivotut pinnat ja valo. Lataamisen jälkeen muuttumaton. Puuttuva pakollinen = näkyvä virhe | tiedostot | pelitilaa |
| Maailman näkymä | Piirtää pelitilan ja interpoloi askelten välillä; näkyvyys ja tarkkuustasot vain, kun kameran solu vaihtuu. Animaatiokerros (nojaus, vilkaisu) ei siirrä juurta | pelitila, kameran paikka | sääntöjä; ei keksi liikettä |
| Kameralaite | Yksi laite, jolla on tila; tavoitteet alkulento, seuranta, kiinniotto, maali. Yksi kameran paikka kaikille | pelaajan paikka ja nopeus, kulkukartta | sääntöjä |
| Valo ja pinnat | Pinnan väri, kohokuvio ja valo kuvina; pelin varjostin = kuva × leivottu valo + pelaajan varjo + usva. Ei kytkimiä | aineisto | pelitilaa |
| Ääni | Kuuntelee tapahtumalokia ja tilakoneen tilaa | tapahtumat | muuta |
| HUD ja näkymä | Näyttää tilan, välittää napit | pelitila (luku) | ei aja peliä |
| Mittari ja komennot | Omat tiedostonsa; käyttävät samoja julkisia rajapintoja kuin peli | rajapinnat | ei koodia pelisilmukan sisällä |

## 3. Työtavat (kirjataan Raamattuun, kun pala 2 on näyttänyt ne toimiviksi)
1. KK kirjoittaa tehtävänannon ennen työtä: tavoitekuva tai mittari, rajapinta, hyväksymistesti, tiedostot, joihin saa koskea.
2. Uusi rakennetaan vanhan RINNALLE yhden kytkimen taakse, verrataan tallenteella ja mittarilla, ja vanha poistetaan SAMASSA muutoksessa
   kuin uusi tulee oletukseksi. Kytkin ei jää koodiin.
3. Yksi totuus per suure (pelaajan paikka, kameran paikka, korkeus). Epäjatkuvuutta ei paikata jousella: korjataan lähde.
4. Mikään ei aseta paikkaa suoraan; liike kulkee Liikkeen tai Kameralaitteen läpi.
5. Ei staattisia muuttuvia kytkimiä; asetukset annetaan luonnissa. Vaihtoehdot elävät haaroissa ja kuvapareissa, eivät pelin ajossa.
6. Joka ruutu tehdään vain se, mikä muuttuu. Paikallaan olevan asian ulkoasu leivotaan.
7. Metodi enintään noin 80 riviä, tiedosto noin 600; isompi on merkki väärästä rajasta.
8. Testit kirjoitetaan moduulin rajapintaa vasten; vanhat testit poistuvat koodin mukana.
9. Todisteet Macilla (tallenne ruutuarkkina + mittari); iso iPad vain valmiille kokonaisuudelle yhtenä eränä (omistaja 11.11. 12.21).
10. Poistuvaa koodia ei mitata eikä nopeuteta (omistaja 11.11. 12.20).
11. Roolin ehdottama rajaus tai poikkeus on syöte, ei päätös; roolin luku tarkistetaan ennen kuin se on KK:n väite.

## 4. Palat ja järjestys (peli pelattavissa jokaisen jälkeen)
| # | Pala | Sisältö | Tekijä | Hyväksyntä | Tila |
|---|---|---|---|---|---|
| 1 | Kameralaite | Laite, jolla on tila; testit | PK | 13 testiä + liikemittari | pala 1 hyväksytty 12.21 |
| 2 | Kameran seuranta | Tavoite kulkee pelaajan jälkeä suodatetulla vauhdilla; kytkin UusiKamera | PK | tallenne ruutuarkkina + nopeuden, kiihtyvyyden ja nykäyksen huiput | tehtävänanto annettu 12.28 |
| 3 | Pintojen leivonta | Lattia, seinät, katot kuviksi (väri + kohokuvio + valo); elävä varjo vain pelaajalla; numerokytkimet pois (M, N, O) | LAV aineisto, NS varjostin | pari nykyinen vs leivottu samasta kamerasta + näytönohjaimen aika Macilla | aineistotyö käynnissä (lattia, varjot); KK:n tehtävänanto puuttuu |
| 4 | Pelaajan liike ja pelitila | Pelaaja kappaleena kulkukartalla, yksi paikka ja nopeus, piirto interpoloi (F, G) | PK | paikan ja nopeuden jatkuvuus mittarilla käännöksessä, kaistanvaihdossa ja portaissa; tuntuma ennallaan | – |
| 5 | Kameran kytkentä | Uusi kamera oletukseksi, kamerat 1–3, DroneNosto ja suojat pois (A–E) | PK | tallenne alkulennosta maaliin; poistettujen rivien määrä | odottaa paloja 2 ja 4 |
| 6 | Pelisilmukka ja syöte | Tilakone ja syöte ulos näkymästä; mittari ja komennot omiin tiedostoihin (H, P, Q) | PK | sama pelikulku tallenteella; näkymässä ei pelilogiikkaa | – |
| 7 | Hahmot yhteen tilaan | Takaa-ajaja ja eunukit samalla liikemallilla; osuma = etäisyys (K) | PK | takaa-ajaja pelaajan jäljessä käännöksessä ja portaissa; eunukin osuma kuvassa ja säännössä samassa kohdassa | – |
| 8 | Maailma näkymäksi | Joka ruudun työ vain muutoksesta; lataus yhtenä luettelona (J, L); latausjono | NS | latausaika ja 5/5 käynnistystä; ruudun työ Macilla | latausjono työn alla (NS) |
| 9 | Vanhat pois | Vanhat maailmat, reittisukupolvet, kuolleet kyvyt ja niiden testit (I, L) | PK | rivimäärä ennen ja jälkeen; peli ennallaan | – |
Rinnakkain voivat kulkea: 2 (PK), 3 (LAV ja NS) ja 8:n latausjono (NS). Palat 4–7 peräkkäin PK:lla.

## 5. Avoimet
- Omistajalle (kokemus): spurttiviitta, liito, lohikäärmeet ja aarteet eivät ole nykypelissä käytössä; halutaanko jokin takaisin omana
  palanaan palan 9 jälkeen. Kysytään kortilla, kun tämä rakenne kerrotaan.
- KK:lle: palan 3 tehtävänanto (LAV:n ja NS:n nykyinen työ sovitettava siihen; pintojen lajit tarkistettava LAV:lta); lohkosta 4 lukematta
  JuoksuMaailma.shaderin fragPeli, JuoksuLeivottu.cs ja JuoksuHahmot.cs ennen palojen 3 ja 7 tehtävänantoja.
- Todennettava tallenteesta ennen väittämistä: omenan näkyvä paikka vs. keruupaikka, takaa-ajajan paikka käännöksessä ja portaissa, salin valo.

LÖYDÖS PELAAJAN LIIKKEEN PALAAN (KK 11.11.2026 klo 22.16, PK:n mittaus C-korjaus-mittaus.md): käännöksen kaari (JuoksuV4.PisteKaarella, kuutiollinen
Bézier kulmasta 2 r uudelle osalle) ei ole kaarenpituudella parametroitu: säännön S kasvaa 6 m/s, mutta pelaajan näkyvä vauhti käy kaaressa noin
8 m/s:ssa (0,16 s) ja pelaaja käy 0,57 m kulman yli ulkoseinää kohti. Korjataan pelaajan liikkeen palassa (kaari kaarenpituudella tai S:n korjaus);
kameran pala 2 mitoitetaan nykyiselle radalle.
