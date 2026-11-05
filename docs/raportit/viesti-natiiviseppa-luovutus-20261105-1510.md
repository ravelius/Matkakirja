# Natiivisepän luovutus 5.11.2026 klo 15.10 (konteksti 25 %, pehmeä raja, 7.37)

Korvaa -1457:n kohdat "Ensimmäinen työ", "JU:n jono" ja kallistuksen koodin. -1438:n vika 1:n tiedot ja -1348:n T7-ohje pätevät. Sessio on Natiiviseppä, kansio Matkakirja-3d-selvittaja. Vuoro aina JU:lta.

## Omistajan päätös (uusin työ, EI aloitettu)
KK:n kautta klo 15.05, kortti "Loitontaako kamera itse, kun pelaaja painaa Liiku Pariisin yllä?" → "Loitontaa (Suositus)".
KK:n tavoite: "pelaaja painaa Liiku → kamera loitontaa pehmeästi Ranskan tasolle, jossa kaikki kohteet näkyvät (kuva 4); peruminen palauttaa kaupunkiin. Korjaa myös: kohderengas ei PARIISI-nimen päällä. Kerrottu omistajalle: meri ruudukkoinen kanaalilla, tarkistamatta; katso, onko se vain Macin ajossa. Lippu odottaa Pariisia. Kuva KK:lle."
Työlistassa rivi "Pariisi: Liiku loitontaa Ranskan tasolle". Kuva 4 = lokit/natiiviseppa-liiku-d5850ff4e/l103-loitonnus-8.png.

Lukemani koodi (rungon d5850ff4e mukaan), toteutusehdotus, ei varmistettu ajossa:
- Pohja: runko natiivi-ui/pariisi-lento-219 d5850ff4e, oma haara ja uusi työpuu (wt/proto-natiiviseppa-kierto pitää jättää a88c8f846:ään, kunnes JU on ajanut sen). Työpuita on jo 7 (raja 3 per rooli, 10.13): siivoa ensin, jos voi.
- Avaus: UI/Matkavalinta.cs VaihdaLiuku (rivi noin 303) asettaa PeliOhjain.LiukuAuki = true. Testikomento `ui liiku` kulkee saman polun.
- Sulku: SuljeLiuku-reittejä on monta, eikä jokainen ole peruminen. ValitseTapa sulkee liu'un ennen kulkutavan valintaa (ei paluuta, paitsi Odota), TarkistaLuenta kerronnan alkaessa, PaivitaLiiku eston tullessa. Perumisia ovat Liiku-napin toinen painallus (VaihdaLiuku) ja kartan napautus (kierto.Napautettu → SuljeUlkoa). Pelaajan veto tai nipistys (kierto.PelaajanEle → SuljeUlkoa) ei palauta: kamera jää sinne, minne pelaaja sen vei. Paluu vain, jos pelaaja on yhä samassa kaupungissa.
- Kamera: PalloKierto.Aja(lat, lon, korkeus, kesto, valmis, pehmennys, yliKaton, kallistukseen). Tallenna paikka, korkeus, kallistus ja suuntima ennen ajoa. Huom: Aja palauttaa piirrokseen tullessa kartan suoraksi ja pohjoiseen (PiirrosKulma), joten paluun kallistus pitää antaa erikseen. Rajaukseen malli PeliOhjain.Keskusta.cs KohteidenRajaus (laatikko ruudulle), pisteiksi kohdekaupungit verkko.Naapurireitit(kaupunki):sta. Vanha maan saapumiskohtaus on Linssit/Unity/ElavaKartta.cs AloitaSaapuminen (rivi 494), katso se ennen omaa rajausta (periaate 8).
- l103:ssa Marseillen suunnan reitti jatkuu kaaressa 8 ruudun alareunan ohi, joten "kaikki kohteet näkyvät" vaatii laskennan datasta eikä kiinteää kaarta 8. Alareunassa on Liiku-rivi, joka vie ruutua: varaa se.
- Renkaat: en varmistanut, ovatko l103:n renkaat kohdekaupunkeja vai reittien solmuja; Lontoo-reitin rengas on kanaalin rannalla kaukana Lontoon nimestä, joten todennäköisesti solmuja. Selvitä ennen kuin kerrot KK:lle, että kohteet näkyvät. Renkaan piirtäjää en löytänyt; alku: KaupunkiMerkit.cs (rivi 1169, nimien varaukset), NostoKerros.VaraaIkonit, Reitit.cs. Korjaa niin, että PARIISI-nimi väistää renkaan.
- Merellä ruudukko: Mac-ajo valitsee tasot 640×480:sta, joten epäilen Macin ajoa, EI varmistettu. Vertaa samaan kohtaan iPadin vanhaa kuvaa ennen vastausta KK:lle; uutta iPad-ajoa ei.
- Mitä KK:lle lupasin rivissä 15.04: "palaa valinnan peruessa kaupunkiin"; "jää Pariisin ylle" pysyy, koska loitonnus tulee vasta painalluksesta.
- Vain Pariisi: muualla kamera on jo maan tasolla.

## Valmista tässä sessiossa
- Liiku-ajo katsottu, KK:lle ja PT:lle lähetetty 15.04.
- Vika 2: ei korjattavaa, KK:lle (jonossa 15.05) ja PT:lle. Kierto4:ssä oli `ui lentopiilo`, liiku-ajossa ei, ja siinä 20 nimeä sekä luennan aikana (l045) että levossa. Sama nostotapahtuma lokissa ennen kuvaa. Yksi aikapiste, ei koko 38–58 s.
- Lokin 14.55.53 POIKKEUS ArgumentOutOfRange on Unity Search -editorin oma (UnityEditor.Search.SearchDatabase), ei peliä.

## 85° ja lähi-horisontti: koodi valmis, EI nähty ajossa
Omistajan 14.55 sana -1457:n lisäyksessä. Haara **natiiviseppa/kallistus-85-219 a88c8f846** (pohja ca88b1830), työpuu /Users/Shared/Claude/wt/proto-natiiviseppa-kierto, peili natiivi-backup peili/proto/natiiviseppa/kallistus-85-219. Testit PariisiKallistus 9/9, Karttavalo 19/19, tarkistus 0 virhettä. tarkista.sh muuttaa kolme tyylikirjatiedostoa: git restore (tehty).
- `MaxKallistus` 85. `HorisonttiM(d)` = d + `HorisonttiTakanaM` 2500 m. Usvan alku jää kohteen taakse (d + 30 % välistä), joten katsottu kohde ei häivy. Usva ei koskaan kauempana kuin muualla. Rako 30 m tai 3 %: nosto vain lähizoomissa ja mäellä.
- Omat valintani, omistaja ei ole nähnyt: 2,5 km, 30 m, 3 %. Katso 2,5 km kuvasta.
- NUI:lle lähetetty 15.08 (jonossa): `Horisonttiusva.RuutuAlkuM` ja `RuutuLoppuM`, muualla ääretön. Peitto(y) toimii ennallaan.
- Avoin kuten ennen: panorointi ja nipistys matalalla, napautus taivaalle, 3D-mallin läpi meno, varjokamera ≥ 20° (loppumittaus).
- Kuva: Notre-Dame matalalta edestä suoraan KK:lle, kopio PT:lle (2.214), ilman selitekaistaa. Maa saa olla lähes viiva, rakennusten pitää nousta sen yläpuolelle, horisontissa vain lähimmät kohteet.

## Skenaarioista
`komento aja lat lon X`: X on KAARI asteina, ei km (KorkeusKaarelle). skenaario-notredame-85.txt korjattu 15.09 kaarille; JU:lle kerrottu polku ei muuttunut. Korkeudet (1,5 km 0.0126, 600 m 0.0050, 6,6 km 0.0553) on laskettu 25°:n puolikulmalla: tarkista lokista. Sama virhe oli ajamattomassa skenaario-kallistus90.txt:ssä (peruttu). Skenaariota ei ole ajettu.

## JU:n jono (JU 15.0x)
1. matka2 f446775c8: nollaus katkaisi 14.57, uudelleen L1:llä 15.04, kansio lokit/natiiviseppa-matka2-f446775c8. Valmistuttua vika 1:n päätös (-1438 lisäys 3).
2. notredame85 a88c8f846, kansio natiiviseppa-notredame85-a88c8f846: jonossa PK:n jälkeen (PT: PK seuraavaksi, sitten vuorotellen juoksupeli ja Pariisi), ensimmäisenä Pariisin ajona.
kallistus90 peruttu, kansiota ei ole 15.08.

## Ensimmäinen työ
Liiku-loitonnus (omistajan uusin), rinnalla JU:n viestit: matka2 → vika 1, notredame85 → kuvat.

## T7 → NAS 2. erä
pid 58484 käynnissä 15.09, lokissa vain ALOITUS 13.28. Monitor kuolee nollauksessa: aseta uudelleen (kopioi.log, kuoleman ilmoitus). Muu -1348:n mukaan; ei poistoja ennen PT:n lupaa.

## Sessiosta
Remote päällä, Raamattu 7.47 luettu. Zsh: `$S:A` tulkitaan muuttujan muunnokseksi, joten käytä `${S}:polku` tai kirjoita sha suoraan.

## Lisäys 15.1x: NUI
NUI poimi 8de7fb360, ca88b1830 ja a88c8f846 haaraansa natiivi-ui/kyltit-219 (KS:n kärjen päällä), nimet f3f259ad4 (`Horisonttiusva.SyvyysPeitto`, `PalloKierto.UsvaPeitto`). Kerro NUI:lle, jos kenttien RuutuAlkuM/RuutuLoppuM yksikkö (m) tai sha muuttuu, myös kun 2,5 km:n arvo vaihtuu uuteen committiin. NUI jätti PalloKierto.cs:n konfliktissa `|| Kiertaa` pois, koska KS:n pohjassa sitä ei ole: kun haara yhdistyy kierron sisältävään runkoon, ehto pitää palauttaa (rivi `double kaytetty = math.clamp(vapaaKuvaus || Kiertaa ? ...`), muuten kierron kallistus rajoittuu.

## Lisäys 15.1x: vika 1 ja matka2
Matka2 katsottu (arkki, ei täysikoko): esiladattuna tyhjä pohja p03–p04, kartta p05:stä. Ennen p03–p06. KK:lle ja PT:lle lähetetty; PT:ltä kysytty, katsotaanko laitteella loppumittauksessa (suositus) vai erikseen. Lokit: 7,46 s pyynnöt z12–z13, lähinäkymä z15 valmis (209 palaa). Laskelma, ei nähty: iPad 6,6 km:ssä noin 3 m/px eli z15; Mac 640×480 noin 13 m/px eli z13. Hypoteesi -1428 yhä auki: lähinäkymä 7,43×5,57 km on pienempi kuin 6,6 km:n näkymä (noin 8,2×6,2 km), joten reunat voivat puuttua myös laitteella. Nopea lähtö (matka-ajo, 4 s) jättää valmistelun kesken: vika jää, ei korjattu. Matkaseurannan "piirros" on koko ajan 0.00: kuvissa näkyvä kartta on striimikartta, ei PiirrosKerros.
Lontoon tekstikortti jää Pariisin saapumiskuvien ja nimen alle p09 asti: KK:lle kerrottu, ei selvitetty rungossa (koehaara ilman NUI:n kuvia). Notredame85 ajossa 15.1x.

## Lisäys 15.1x: PT:n päätös vika 1:stä
PT: "loppumittauksen yhteydessä, ei erillistä ajoa (2.209)." Jos omistaja näkee tyhjän kartan pienellä iPadilla, se tulee KK:n kautta ja ohittaa tämän. Listaa ei ollut, joten perustin sen: /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/loppumittaus-pariisi.md (vika 1, lyhyt lähtö, muisti, saumakorjaus, Napakalotti). Vika 1:stä ei enää koodityötä ennen sitä.

## Lisäys 15.1x: KK 15.12, UUSI TYÖ, ei aloitettu (konteksti yli 30 %)
KK sanasta sanaan: "katsottu. Tavoite: pelaaja ei näe Pariisiin tullessa tyhjää pohjaa, lähti hän miten nopeasti tahansa: karkeampi kartta pysyy näkyvissä, kunnes tarkka on valmis. Korjaa tämä, älä odota iPadia. Samassa ajossa: Lontoon kortti ja nimi ISO-BRITANNIA poistuvat ennen Pariisin kuvia, ja tarkista, tummuuko kartta PARIISI-otsikon aikana (p07, p09) rungossa, jossa on NUI:n korjaus. Kuvat KK:lle."
Tämä korvaa edellä sanotun "ei koodityötä ennen loppumittausta" koodin osalta; laitteella katsominen jää loppumittaukseen (PT:lle kerrottu 15.1x). Järjestys: Notre-Dame-kuvat (ajo valmis tai tulossa), Liiku-loitonnus ja tämä samaan ajoon, jos ne yhdistyvät rungon päälle.
Alku: kun tarkka pala puuttuu, näkyykö vanhempi pala? Etsi striimikartan palojen näyttö (matkaseuranta: "pallo NN %", p03:ssa sumea joki on pohjan alin taso). Tyhjä pohja = hiekanvärinen, joten selvitä ensin, jääkö vanhempi taso pois vai onko sitä edes ladattu (7,21 s: pallo 36 %, 2 laattaa). PARIISI-otsikon tummuus: p06-p09 tässä koehaarassa ilman NUI:n kuvia; katso rungolla d5850ff4e tai uudemmalla.
