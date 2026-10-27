# Codex → Pelikoodari: raskas alastulo molemmille Puyi-malleille, 27.10.2026

Tilauksen #1038 / lisätilauksen kohdan6 `land_heavy` on valmis tekniseen vastaanottoon molemmille malleille. Kesto0,78s: kädet ottavat maasta vastaan, polvet joustavat ja keisari ponnistaa juoksuun. Ei uutta Tripo-generointia tai krediittejä.

Paketti: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/juoksupeli-liikkeet-20261027/land-heavy-review-v1`. GLB:t `models/puyi-perus.glb` ja `models/puyi-viitta.glb`, tarkisteet `SHA256SUMS`. GLB:t eivät mene gitiin. Paketissa MANIFEST, CONTROLLER-CONTRACT, juuren CSV, numeerinenQA ja kuusi ruutua sivulta sekä takaa yläviistosta kummallekin mallille. Perus 14.984Mt/48leikettä, viitta 14.024Mt/39leikettä. Molemmat39 999kolmiota,1materiaali,juuriskaala1. Tekninen portti läpi.

**Pelikytkentä:** käytä CONTROLLER-CONTRACTin Y/Z-käyrää, älä lisää normaalia juoksusiirtymää sen päälle. Alku on pudotuksen viimeiset28cm, kädet maassa0,16–0,28s, molemmat jalat tukevat0,16–0,34s ja oikea jalka jatkaa tukea0,43s asti. Juuri pysähtyy maakosketuksen aikana ja kiihtyy lopuksi5m/s:iin. Liike päättyy1,50m lähtöpisteen edelle, juoksun vaihe1,482s modulo mallin run-kesto. Korkeampi pudotus tarvitsee tätä edeltävän putoamisvaiheen ohjaimessa. Sprinttiin nopeutetaan vasta lopussa, ei erillisellä pystykäyrän aikaskaalauksella.

Lopulliset tiedostot tarkistettu960Hz: maakosketusankkurin suurin poikkeama 0.026mm ja koko verkon alin piste vähintään 0.982mm lattian yläpuolella. Kämmenien todellinen ihon pinta tarkistettu myös erikseen. Pakkausmuutoksen suurin mitattu ero 0.085mm; vanhat liikeavainarvot säilyivät täsmälleen. V1/v2:n pieni avainruutujen välinen lattialäpäisy hylättiin; toimituksessa korjattu v3.

Tämä on tekninen tarkistettava toimitus, ei KK:n kuvahyväksyntä tai valmis peli-integraatio. Syvän kyykyn kaaputaitokset, viitan jälkiliike ja pelin sisään-/ulostulohäivytykset tarvitsevat pelikameran tarkistuksen. Viitan hiha/kainalo-lähikorjaus pysyy avoimena. Kaikki aiemmat kiinniotot, rimpuilut ja neljä väistöä säilyvät näissä kumulatiivisissa Puyi-tiedostoissa. Vartijoiden tiedostoihin ei muutoksia.

Jatkan avoimia karmituki- ja parkour-liikkeitä. Olavinlinnan puheohjauksen kuusi ARKit-muotoa on kirjattu seuraavaan hahmovaiheeseen juoksupelin jälkeen.
