# CODEX → PT/Fable: Petřín K2 v1 + maski + kamerasovitus (#260)

Uuden #260-lähteen Petřín-osuus on käsitelty: K1 v3 ja sen täsmällinen maskiversio on kirjattu PT:n hyväksymäksi muutetulla kameravaatimuksella. **Aiempi tuottajan QA-hylkäys alkuperäistä K1-kameraa vasten säilyy muuttumattomana**; alkuperäisen rajauksen ei väitetä läpäisseen. Alla uusi K2, yksi kokonainen generointi. Pysähdyn tämän toimituksen jälkeen K2-palautteeseen. K3–K5: 0 kutsua; mallituotantoa ei aloiteta ennen kaikkien viiden tavoitteen hyväksyntää.

- [K2 v1, natiivi PNG](petrin-K2.png)
- [K2:n uusi täytetty ulkosiluettimaski](petrin-K2-maski.png)
- [K2:n sovitettu analyyttinen kamera](petrin-K2-kamera-20261014.json)
- [K1 v3:n uusi analyyttinen kamera](petrin-K1-v3-kamera-20261014.json)
- [Lähteet, koko generointiprompti, QA ja mittaushavainnot](petrin-K2-tarkistus-20261014.json)

## K1:n hyväksyntä ja kamera

PT:n #260-päätös koskee toimituscommitia dc1e096c7238f03b450ece44a757017873f0cb8c ja sen alkuperäisiä K1 v3 -kuva-/maskitavuja. Ne varmennettiin ennen jatkoa; uusia K1-kuvia tai maskeja ei tehty. K1:n IoU-raja on nyt 85 % vain K1:lle. PT kelpuuttaa nykyisen täytetyn ulkosiluetin sellaisenaan; tämä on käyttökelpuutus, ei riippumaton pikselintarkkuussertifikaatti.

K1:ssä etäisyys 200 m, silmäkorkeus 90 m ja atsimuutti 200° pidetään alkuperäisinä lähtöoletuksina; havaituista masto-/jalkapisteistä sovitettu pysty-FOV on **29.373°** ja pitch **-15.755°**. Näillä pisteprojektion mastokärki osuu y = 156 ja jalkojen arvioitu akselitaso y = 803 pikseliin 1536 × 1024 kuvassa. Tämä muuttaa kameraa, ei rakennetta. K1:n fyysiset tasanteet ovat edelleen 20 m ja 51 m, runko 58,7 m; kuvan tasannevirhettä ei siirretä malliin.

## K2:n tuotanto ja QA

K2 on täysin uusi koko kuvan generointi. Uusi pystyrajauskaavio oli sommitteluviite, CC0-sisäänkäyntikuva rakenneviite ja K1 v3 materiaalin/luonnollisen valokuvailmeen viite. Vanhoja kuvia ei pienennetty, paikallisesti muokattu tai outpaint-laajennettu. Tässä vaiheessa 1 kutsu; koko Petřín-työssä yhteensä 4. V1/v2/v3-historia säilyy.

Kuva on uskottava maan tasolta ylöspäin katsottu valokuvamainen näkymä. Koko masto, torni, halli ja jalat näkyvät; ei ihmisiä, luettavaa opastetekstiä tai logoja. Punaiset ovipaneelit ovat tyhjiä, vihreät lyhdyt näkyvät. Pieni ”havainnekuva”-merkintä on kuvassa. Puut pysyvät sivuilla eivätkä peitä tornia. Ristikkoteräs, hallin rappaus ja kasvillisuus näyttävät luonnollisilta.

Natiivi/toimitus on **1024 × 1536**, ei suurennusta. Alkuperäinen 2400 px pitkä sivu ei palautunut; ilmoitan tämän avoimesti ja jätän K2:n natiivikoon hyväksynnän PT:lle. Kuva toimitetaan alkuperäisin RGB-pikselein, vain havainnekuvasta kertova metadata/sRGB tallennetaan PNG:hen.

| Kohta | K2-havainto / ratkaisu |
|---|---|
| Mastokärki | noin y = 63 (±3 px), 4,1 % kuvakorkeudesta |
| Jalkojen akselitaso | noin y = 1375 (±8 px), 89,5 %; näkyvät maankosketukset vaihtelevat perspektiivin vuoksi |
| Koko torni kuvan korkeudesta | noin 85,4 %; alkuperäisen kameran akseliprojektio noin 71,7 % |
| Alatasanteen näkyvä lattiareuna | noin y = 710 (±12 px), sivureunoja noin y = 744 saakka |
| Ylätasanteen lattia | noin y = 229 (±5 px) |
| Maan tasolta / koko torni näkyvissä / fotorealistinen | kyllä |
| Kameran koko siluetin mallivarmennus, IoU, korkeusvirhe, ΔE | ei tehty; luvut null |
| PT:n K2-kuva-/maski-/kamerahyväksyntä | odottaa palautetta |

## K2:n kamerasovitus ja sen rajat

K2:ssa atsimuutti 190°, etäisyys 55 m ja silmäkorkeus 1,7 m pidetään lähteen lähtöoletuksina. Maston ja arvioidun jalkojen akselitason mukaan sovitettu **pysty-FOV on 60.964°**, **pitch 23.179°**, roll 0°. Kuvasuhde 2:3; horisontaalinen pääpiste on käsin havaittu x ≈ 524. Kameraliite sisältää koordinaattikäytännön, sijainnin, projektion kaavan, kaikki lähtöarvot, havainnot ja tasanne-/kattopisteiden jäännöserot.

Sovitus on kahden akselipisteen analyyttinen pinhole-ratkaisu. Se ei ole yksikäsitteisesti palautettu todellinen kamera eikä vielä koko 3D-siluetin varmennettu sovitus. Etäisyys ja korkeus ovat lähtöoletuksia, kokonaiskorkeus noin 71 m on epävarma arvio. Etureunan tasannepisteet eivät ole kaikki rungon keskellä olevia akselipisteitä; kameraliite näyttää erot eikä tee niistä rakennemittoja. Kuvan korkealla näkyviä tasanteita ei kopioida myöhempään malliin. Geometria pysyy #253:n mitoissa: runko 58,7 m, tasanteet 20 m ja 51 m. K2:n IoU-raja pysyy 90 %; korkeus- ja ΔE-rajat säilyvät lähteen mukaisina.

K2-maski on tehty uutena suoraan K2:n natiivikoordinaateista: sama 1024 × 1536 kangas, torni 255, muu 0, ei pehmeää reunaa. Ristikkorungon sisäaukot on täytetty samaan tapaan kuin PT:n kelpuuttamassa K1-maskissa. Ulkoraja tarkistettiin kuvan päällä; maski on käsin annotoitu eikä riippumattomasti sertifioitu. PT:n kelpuutus K1-maskille ei automaattisesti hyväksy uutta K2-maskia.

Toimitus on sisäinen Git-postilaatikon arviointipaketti. Ei R2-/pelitoimitusta, peli-integraatiota, julkaisua, main-haaran muutoksia tai mallituotantoa. Peking-osuus on luettu lähteen osana, mutta sen työtä tai tiedostoja ei ole muokattu tässä tehtävässä. Vanhan menetelmäpoikkeuskysymyksen tarve on rauennut uuden lähteen vuoksi; osittaista kuvanmuokkausta tai outpaintia ei tehdä.
