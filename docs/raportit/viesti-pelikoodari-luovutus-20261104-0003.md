# Pelikoodari: luovutus 4.11.2026 klo 00.03 – iPad-kuvat odottavat

Edellinen: -20261103-2341 (1c786b0de), voimassa ellei alla toisin. Syy: kontekstiraja 33 % (7.37, Postivahti: uusi rivi lähellä 35 %). Ei omia taustaketjuja.

## Tehty 23.41–00.03
- **Otsikko iPhone pysty katsottu** (21 kuvaa, lokit/pk-otsikko-219-bf54a5c4f-2356/iphone-pysty/; kansion nimi bf54, sovellus 878ac7755): otsikko taivaalla ja luettava, ei soikiota eikä kehotetta, ☰ vapaa, häivytys alkaa 4,01 s + 0,8 s. PT:lle kerrottu.
- **Huomio PT:lle**: avauskuva-00 (avaus 0,02): latauskuva ilman otsikkoa ja logoa, koska JuoksupeliNakyma.cs:n latauskuvan poisto kutsuu PiilotaOtsikko ennen 300 ms:n ristihäivytystä. Ei muutettu; korjataan, jos KK haluaa.
- **Skriptit** (otsikko-219/aja.zsh, aja-simu.zsh): sim-käännöksen bundle-id .app:sta (app.matkakirja.proto3d), VIKA, jos sovellus tai kontti puuttuu, odotus viimeiseen lentokuvaan (simu 10 min, iPad 7 min avaus-lokista). Maailma latautui simussa noin 144 s.
- **Palvelijatar v2**: Tripon työkuvat 3c177c76c kuitattu (c46b4e3ca), 20–30 min kuvausjakso pyydetty JU:lta Pariisin ison iPad-ajon jälkeen. JU kirjoittaa ALKAA-rivin. Lopullista glb:tä ei ole, ei kytkentää ennen valaistuja kuvia ja KK:n arviota.
- **Muistipiikki**: NUI:lle vastattu kahdesti: käännä mitattava runko, ei avauskuvia, MuistiTarkka riittää. Tulos NUI:lta.

## AVOIN
1. **Otsikko iPad bf54a5c4f** (vaaka + pysty, lokit/pk-otsikko-219-bf54a5c4f-2336/): ajo alkoi vanhalla 120 s:n odotuksella. Jos lentokuvia ei tule, pyydä JU:lta uusinta (korjattu skripti). Katso kuvat, B4: lokirivit.txt "häipyvät" ja "avauksen tekstit rivi N". Sitten kuvat 0,5 s välein yksittäin KK:lle ja rivi PT:lle.
2. **B5 keltainen katto**: iPad-vaakakuvasta, ks. -2319 kohta 3 ja lisäys. Ei korjausta ennen KK:n vahvistusta.
3. **Palvelijat v7** a79caa5a4 ajossa L1 (_tyo/pelikoodari/palvelijat-v7/): varjostimet JuoksuMarka ja JuoksuSirpale ensimmäistä kertaa käännöksessä. Katso osuma1 + osuma2, pari KK:lle.
4. **Palvelijatar v2**: valaistut kuvat tulevat postiin; tarkista kasvot, leuka, hartiat ja 15 m:n luettavuus, sitten edestä ja takaa KK:lle.
5. a3-baoding-lod1.glb 404 PT:lle kerrottu (LAV:lle); vaikutus ei tiedossa, sen jälkeen ajo uusittiin ja lento alkoi normaalisti.
6. Muut kohdat -2341:stä ennallaan (vesi-219). Checkout: koti/Matkakirja-pelikoodari.
