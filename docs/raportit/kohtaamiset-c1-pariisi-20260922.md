# Kohtaaminen: Pariisi — luonnos Fablen hyväksyttäväksi

Sisältökirjuri-sessio, 2026-09-22. Uusi `pariisi`-rivi
`js/packs/kohtaamiset.js`-tiedostoon EI ole vielä lisätty tiedostoon —
tämä on vain raportti, Fable päättää ja tekee lisäyksen.

Hahmo valittu tietoisesti samaksi kuin jo hyväksytyssä
kohtaamiskuvan tyylikokeessa (`js/kohtaamiskuvat-data.js`, id
`pariisi-kirjamyyjat-pulu`, hahmo "Colette", tila "tarkistettu"):
Seinen rannan bukinisti. Näin teksti ja jo olemassa oleva kuvakonsepti
tukevat toisiaan eikä synny kahta kilpailevaa Pariisi-hahmoa.

## Pariisi — bukinisti Colette

**hahmo:** "bukinisti Colette"
**nappi:** "Tapaa Colette"
**frame:** "Colette lukitsee kirjalaatikkonsa ja kysyy"
**tervehdys:** "Colette lukitsee laatikkonsa kaiteeseen: "Isoisäsi
aikaan nämä raahattiin pois joka ilta. Näytä että tunnet maailmaa
kuten piirtäjä — niin kerron mikä odottaa.""
**tervehdysLuenta:**
```
[
  { rooli: 'kertoja', teksti: 'Colette lukitsee laatikkonsa kaiteeseen:' },
  { rooli: 'hahmo', teksti: '[curious] "Isoisäsi aikaan nämä raahattiin '
    + 'pois joka ilta. [warmly] Näytä että tunnet maailmaa kuten '
    + 'piirtäjä — niin kerron mikä odottaa."' },
]
```
**loyto:** "Colette nostaa rasian pinon alta: "Tämä lojui väärän kirjan
takana vuosia. Kukaan ei koskaan ostanut sitä kirjaa.""
**loytoLuenta:**
```
[
  { rooli: 'kertoja', teksti: 'Colette nostaa rasian pinon alta:' },
  { rooli: 'hahmo', teksti: '[curious] "Tämä lojui väärän kirjan takana '
    + 'vuosia. [warmly] Kukaan ei koskaan ostanut sitä kirjaa."' },
]
```
**tyhja:** "Colette käy laatikon läpi kahdesti: "Tyhjä. Seine tulvii
täällä keväisin — se vie muistot mukanaan.""
**vaarin:** "Colette latoo kirjat takaisin pinoon: "Ei tänään. Katso
tarkemmin, niin kannen alle näkee.""
**tunnetagit:**
```
tunneTervehdys: { tunne: 'utelias', voimakkuus: 0.5 }   // Colette arvioi tulijaa ja kirjaa, ei vielä lämmin — sama rekisteri kuin muualla tiedostossa (esim. dubrovnik, odessa) tervehdyksen avauksessa
tunneLoyto: { tunne: 'ilo', voimakkuus: 0.7 }             // löytö on pelin suuri hetki, rekisterin oletus kaikissa kaupungeissa
tunneTyhja: { tunne: 'miettiva', voimakkuus: 0.45 }        // "Seine vie muistot mukanaan" jää pohtimaan, ei moiti pelaajaa; rekisterin oletus
tunneVaarin: { tunne: 'hammentynyt', voimakkuus: 0.4 }     // kannustava korjaus ("katso tarkemmin"), lohduttava sävy kuten muissakin kaupungeissa
```

Merkkimäärät: tervehdys 160, tervehdysLuenta (kertoja+hahmo ilman
tageja, sama teksti kuin tervehdys) 160, loyto 114, tyhja 100, vaarin
91 — kaikki annettujen ylärajojen (tervehdys ~280, repliikit ~130)
sisällä; luenta on hieman ~140:tä pidempi mutta samassa
kokoluokassa kuin lontoo-esimerkin 151 merkkiä.

**1873-fakta ja lähde:** Pariisin bukinistit (Seinen rannan
kirjamyyjät) saivat vuonna 1859 pariisin prefektuurin päätöksellä
(10.10.1859) luvan pystyttää kiinteät puiset laatikot rantojen
kaiteille — mutta laatikot piti silti kantaa pois joka ilta
auringonlaskun jälkeen, koska niitä ei vielä saanut jättää kiinni
kaiteeseen. Vasta vuonna 1891 myyjät saivat luvan lukita laatikot
paikalleen pysyvästi. Isoisä kulki Pariisin läpi 1873 — siis juuri
sinä kautena, jolloin laatikot olivat jo pysyviä rakenteita mutta
myyjän piti yhä raahata ne pois joka ilta. Tästä syntyy Coletten
repliikin kontrasti: nykyään laatikko vain lukitaan kiinni.
Lähde: [Bouquinistes — French Moments](https://frenchmoments.eu/bouquinistes-of-paris/)
ja [A little history of Paris bouquinistes](https://www.unjourdeplusaparis.com/en/paris-bouquiniste/petite-histoire-des-bouquinistes)
(molemmat viittaavat 10.10.1859 prefektuurin päätökseen ja vuoden
1891 pysyvään kiinnityslupaan; ks. myös [en.wikipedia.org/wiki/Bouquinistes](https://en.wikipedia.org/wiki/Bouquinistes)).

**Kuvatilaus Codexille:**

Huom: Pariisilla on jo hyväksytty tyylikoe samalla hahmolla
(`kasvo-pariisi-kirjamyyjat-pulu.jpg`, Colette + tytär Maëlle + pulu-
cameo). Tämä briiffi on sen rinnalle/tarkennukseksi tätä kohtaamista
varten, ei korvaa olemassa olevaa kuvaa — Fable päättää käytetäänkö
vanhaa kuvaa sellaisenaan vai tilataanko uusi versio.

Colette on noin 55–60-vuotias pariisilaisnainen, harmaantuvat hiukset
löyhällä nutturalla, kulunut villatakki ja sormikkaat ilman
sormenpäitä (kirjojen käsittelyyn). Hän on kesken oikean työliikkeen:
nostaa tai lukitsee yhden vihreän puisen bukinisti-laatikon kantta
Seinen rannan kivikaiteella, kirjapinot vielä osin auki tiskillä.
Kaksi aikakerrosta: nykyinen kerros on hänen kätensä liike lukon/
saranan kanssa ja taustalla esimerkiksi pyöräilijä tai joku katsomassa
puhelintaan sillalla; vanha kerros on itse kivikaide ja laatikko —
sama rakenne joka on seissyt paikallaan 1800-luvulta asti, patinoitunut
vihreä maali, kuluneet saranat. Kun matkaaja kysyy aarteesta, Colette
kääntää katseensa suoraan kameraan puoliksi yllättyneenä, puoliksi
huvittuneena — kulmakarva koholla, ei täyttä hymyä, kuin arvioisi
vielä kannattaako vastata. Valo on aamuinen, matala ja hieman kostea
syyskuun valo Seineltä, taivas pilvinen mutta ei sateinen; joen pinta
kiiltää taustalla epätarkkana. Ei kuvan sisäistä tekstiä.

Valmis Fablen tarkistettavaksi.
