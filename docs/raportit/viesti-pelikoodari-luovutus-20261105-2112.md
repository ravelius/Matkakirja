# Pelikoodari: luovutus 5.11.2026 klo 21.12 (konteksti 28 %): sivulta tuleva vartija nähty, -2044:n botti-päätelmä kumottu, kynnysviestin ajo valmiina

Täydentää -2044:ää ja korvaa sen kohdan 2 ja kohdan 4.1. Proto-worktree `/Users/Shared/Claude/wt/proto-pelikoodari-tarkastelu`, haara `pelikoodari/tarkastelu-219`, kärki `354452847` (etäpää `natiivi-backup`, ei `origin`). Ei ajoa käynnissä, L1 ilmoitettu JU:lle vapaaksi 21.0x. Ei junaan. **Taso 1 on yhä pääasia.**

7.47: Raamattua ei luettu tässä sessiossa, vain -2044 sekä hakuja muista luovutuksista.

## 1. Seuraava askel: kynnysviesti
1. Pyydä JU:lta vuoro: `354452847` (uusi käännös, QA-rivi), noin 5 min, 2 kuvaa. Aja vasta "ESIKATSELU NYT" -viestin jälkeen: `zsh /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/vapaa-1/ajo-skp.sh <linja>`. Ilmoita JU:lle LUKKO VAPAA, kesto, kuvamäärä.
2. `sk-p.txt`: siemen 1, ei bottia, `eunukit 0`, uusi `ajajapito 1`, käännökset `1 1 1 1 -1 1 -1` odotuksilla (mitattu aika + 0,5 s), kuvat `k1-kynnys`, `k2-kynnys`. Odotettu loppu reitillä s 124,5, (176,2; 811,9), kun `kaanna`-rivit eivät anna "ei".
3. **Tarkista:** `ui juoksupeli kaanna` -vastaukset lokista. Jos yksi antaa "ei", ajoitus karkasi: polku oli laskettu ilman pelin palatsia (`LuoVapaa(1, k, null, …)`). `NaytaHuuto` ei kirjoita lokiin, joten viesti nähdään vain kuvasta; kynnysviestin teksti: `ui.juoksupeli.kynnys`. Vaatii `r.Kartta != null` ja `Odottaa` (`JuoksupeliNakyma.cs` `KynnysViesti`).
4. `354452847`: Unity-koodia ei ole käännetty tässä sessiossa, vain `Peli-testit` (`JuoksuKulkuKarttaTestit` 34/34; muut testit ajamatta). Rivi `JuoksupeliNakyma.cs`:ssä kääntyy ensi kerran ajossa.

## 2. Mitattu ja nähty
- **Sivulta tuleva nähty pelistä**, Mac, botti, K 4, siemen 26. Ajo `lokit/esikatselu-20261105-210219` (274 s), kuvat `l1-lahti`, `l2`, `l3`, `l4`, kaikki katsottu. Loki: `sivulta 101 v0 z404`, `varoitus z423`, `kierti z429`, `eunukki jahtiin kontakti 429.2 sivu 0.8 sivulta True`. L1: ei näy. L2: oikealla kaukana puun luona. L3: juoksee kaistaa kohti. L4: keisarin vieressä oikealla, kasvot kameraan. **Ei nähty:** kiinni sivulta (botti kiersi), ääni ei kuultu. Viety PT:lle 21.0x.
- **Edeltävä ajo** `lokit/esikatselu-20261105-205613` (299 s): kuvat vasta ohituksen jälkeen, koska `jahtiin`-rivi kirjoitetaan ohituksen jälkeen. Älä käytä sitä kuvan laukaisuun lähestymiselle: käytä `juoksupeli: sivulta [0-9]+ v`. `s3-sivulta` jäi katsomatta.
- **Havainto, ei selvitetty:** `l1-lahti.png`: kameran lähellä seinän jalusta leikkautuu terävästi sekä vasemmalla (400–640; 560–800) että oikealla alhaalla. Ei tiedossa, onko seinähäivytys vai malli; tuttu vai uusi. Ei selvitetty.
- **Päätelty, ei mitattu:** -2016:n y1-kuva (takaa-ajaja 2 m:n päässä, `paikka` 18 m) voi olla sama kuin `e1` ja `s1` täällä: kuvan eunukki on ohitettu vartija jahdissa, takaa-ajaja on `paikka`-koordinaateilla kameran takana. Y1-ajoa ei tarkistettu.

## 3. -2044:n kohta 2 kumottu
- **Syy 0 vartijaan ajossa 174557:** ei `eunukit`-komentoa (K 1) ja siemen 11, joka antaa K 1:llä 0 vartijaa. Testi toistaa tämän; myös K 20 + siemen 11 → kontakti 460,2 kuten ajoissa 19.14 ja 19.38. Testi vastaa siis peliä tässä.
- **Botin korjausta ei tehty.** Kokeiltu ja peruttu. 32 siementä, oikea lähtö: nykyinen 33 ruutua, 2,3 vartijaa/ajo, 0 kiinni; vähiten käyty suunta 28 ruutua, 1,6, 5 kiinni. Pisin suora (8 siementä): 1,6 vs 2,5, ja siemen 4 jäi 3 ruudun taskuun. Älä ehdota uudelleen ilman uutta perustetta.
- **Vartijamäärä, botilla, oikeasta lähdöstä ja käännöksestä, 0,8 s viiveellä, 40 siementä:** K 1: 1,0 vartijaa/240 s, sivulta 0,1/ajo. K 2: 2,1. K ≥ 4: noin 2,5. Ilman 0,8 s:n viivettä K 1: 2,3 (sivulta 0,6): botti kumoaa silloin ensimmäisen käännöksen, joten alue on eri (päätelty). **Botti ei ole pelaaja;** tahtia ei muutettu (omistaja 1.11. "eunukkeja on liikaa"). Viety PT:lle.

## 4. Löydös: kynnysviesti ei yllä kaikille oville
Mittaus: 245 ovea, juoksu suoraan oven edestä 10 m:stä, sivusiirrot −1, 0, 1 m, kartan neljä suuntaa: viesti (säde 1,5 m, `KynnysSadeM`) yltää **110 oveen**; 252 pysähdystä 960:stä osui. Lähin pysähdys oven keskelle mediaani 1,26 m, suurin 10,05 (ei muka ole ajanut tätä ovea kohti: suodatin on vain e ≤ 12 m, joten luku sisältää muita seiniä). Botti ei pysähtynyt ovelle kertaakaan (40 ajoa, 164 seinäpysähdystä). **Ei muutettu:** omistajan päätös 4.11. 12.48 koskee viestiä, ei sädettä. Katso ensin viesti pelistä, sitten kerro KK:lle/PT:lle, jos säde pitää laajentaa. Viety vain tähän, ei vielä PT:lle.

## 5. Ovista kerrottu PT:lle 21.0x
PT kysyi työlistan ovirivin tilan. Vastattu: koodi ja 245 ovea haarassa, Tripon mallit-v1 kytketty, Codexin V2-kuvat omistajan hyväksymät 4.11. 14.46, nähty Macilla, ei iPadilla, ei junassa; auki lehtien seinää vasten -muutos KK:lle, lehti peittää ikkunaa (-1744) ja kuvaa kujalla (e27, -1822); ämpärivienti tarkistamatta. "Omistaja 5.11.: ovet kelpaavat" edeltää lehtimuutosta.

## 6. Seuraavaksi kynnysviestin jälkeen
1. Tason koonti KK:lle, kun kynnysviesti on nähty; ympärikäännös on yhä vain testeillä (-2016 kohta 1). Mukaan -1744:n kohdat ja sivulta tuleva.
2. Tarkista PT:n/KK:n vastaus rikkoutumisesta ja omenasta (-2016 kohta 3), LAV:n vastaus koristeista (-2016 kohta 2). Tässä sessiossa ei tullut kumpaakaan.
3. -2044 kohdat 1 (`huuto yleinen ""`, lattian valkoiset katkoviivat), 3 ja 5 pätevät yhä.

## 7. Työkalut
`/Users/Shared/Claude/proto-3d/_tyo/pelikoodari/vapaa-1/`: `sk-n.txt`, `sk-o.txt`, `sk-p.txt`, `ajo-skp.sh`; mittaustestit `mittaus-botti.cs.txt` (vaatii poistetun `BottiVanhaMittaus`-kytkimen) ja `mittaus-ovet.cs.txt`. Testi ajetaan: kopioi `Peli-testit/Testit/JuoksuBottiMittaus.cs`:ksi, `./kaanna.sh BottiMittaus`, poista. Ei committiin.

## OPIT
- Luovutuksen selitys tarkistetaan ensin mittaamalla oikeasta lähdöstä ja vertaamalla ajon komentoihin: tässä 0 vartijaa selittyi puuttuvalla `eunukit`-rivillä, ei reitillä.
- Yhden siemenen tulos ei ole syy: vertaa aina vähintään 30 siementä ennen korjausta.
- Peli-testit toistavat kartan reitin tarkasti (kontakti 244,6 ja 460,2 kuten pelissä), joten siemen ja hetki valitaan testillä ennen ajovuoroa.
- Lokirivi, joka laukaisee kuvan, luetaan koodista: `jahtiin` tulee ohituksen jälkeen.
