# Pelikoodari: luovutus 5.11.2026 klo 19.50 (konteksti noin 29 %): eunukin 22,8 m:n vika korjattu ja nähty pelistä, mätä omena nähty, leijuvien osien lähde löytyi

Täydentää -1925:tä, -1858:aa, -1822:ta ja -1744:ää; niiden avoimet kohdat pätevät, ellei tässä muuta sanota. Proto `pelikoodari/tarkastelu-219`, kärki `4a26c319f`, pushattu natiivi-backupiin. Ei ajoa käynnissä, L1 ilmoitettu JU:lle vapaaksi. Ei junaan. **Taso 1 on yhä pääasia.**

7.47: tässä sessiossa luettu periaatteet, 7.4, 7.23–7.25, 9.1–9.3, 9.5 ja 10.5. Luvut 2 (fokusmoodi, linssit), 4 (UI-POHJAT), 6 ja luvun 12 komentosäännöt lukematta: lue seuraavalla aloituksella.

## 1. Viittausvahvistukset (PT:n pyyntö, tehty)
- **20 aarrekuvaa:** paketti `_valmiit/aarrekuvat-paikallis-10-vienti-20261105` on sama kuin main (0 eroa). Julkaistu luettelo `sisalto/1/v993` viittaa kaikkiin, ja ennen vientiä kaikki olivat ämpärissä 404. JU vei; tarkistin kaksi polkua (200). Eheysvartijan tulos on JU:lla.
- **Äänet:** VS vei ne 19.30–19.33 ennen vahvistustani (omistaja 19.23, `b720cd2f2`). Paketin kaikki polut ovat uusia kansioita, paitsi `kieli.json` juuressa (ei viittauksia tarkistettu, vain paketin oma tiedosto). TF 217/218:n osoitteet (`siltalauseet-v4`, `kuittaukset-v2`, `nimet-v3`, `kaupunki-intro-v1`) ennallaan, aikaleimat lokakuulta. TF 217/218 eivät viittaa `pariisi-tervehdys`-sanaan tarkistamissani tiedostoissa (OpasSovitin, KaupunkiIntro). VS ja PT tietävät.

## 2. Eunukin vika (`93cc59596`, nähty ajossa `lokit/esikatselu-20261105-193848`, f5e0c664a, 505 s)
- **Syy:** `JuoksuV4Maailma.cs`: `r.Lahin(new P3(pos.x, pos.y, pos.z))` ilman Z:n merkkiä, kun `U` on (X, Y, −Z). `sivu` laskettiin peilipisteestä. Rivi on ollut koodissa junasta 217 (`00f3be98e`), joten **myös TF 217 ja 218 ajavat vanhaa koodia**. Korjaus vain tällä haaralla.
- **Todiste:** sama kohtaaminen, sama kontakti 460,2: `sivu` −22,8 → **−0,7**. `k1-varoitus`: eunukki juoksee keisaria kohti reitillä. `k2-jahti` (0,5 s): eunukki keisarin takana kameran vieressä. `k3-jahti` (2,5 s): ei kuvassa. Koodin mukaan hän jää kameran taakse (0,7 × nopeus), mutta tämän paikkaa ei lokiteta paikka-rivillä, joten k3 ei yksin todista sitä.
- **-1744:n "sivuttain/poispäin" ja -1925:n selitys:** todennäköisesti sama vika, ei todennettu erikseen. -1925:n päätelmä, että eunukki ei tullut kontaktiin, oli väärä: numero oli laskuvirhe. `fb9811afd`:n paluu reitille pysyy, koska sivulta tuleva voi yhä olla kaukana.
- **Määrä:** eunukkeja kohdattiin taas vain yksi 240 s:ssa. Tiheys on omistajan asia, kun taso näytetään.

## 3. Mätä omena v3
`k1-varoitus.png` oikea alakulma: nähty pelissä läheltä. Kellanruskea, tummia laikkuja, varsi, ei valkoinen. Kuva pienennettynä 1400 px:iin, ei täysikoossa. Toimiiko hehku ja onko se riittävän "mätä", on makuasia: näytä KK:lle. **Vienti vaatii yhä PT:n luvan.** TF 217/218 hakevat nimeä `omena-mata`, eivät `omena-mata-v3`, joten uusi nimi ei muuta julkaistua. Kansiota ämpärissä en varmistanut (`maailma-v4/`-juuressa molemmat 404); `omena-mata`-nimi on käytössä varanimenä, ja `kerattavajuuri` hakee muut ämpäristä.
`tarkastelu mata` ei näyttänyt omenaa ajossa (esteet-juuri piilossa). Korjattu `4a26c319f`, ei ajettu. Ei tarvita pelkästään tätä varten.

## 4. Leijuvat osat: lähde löytyi, syy auki
`mika` kaide-heitto0-pisteestä (-72; 1,6; -42): **`v4 lahi dougong-intercolumn`** pohja (-79,20; 13,83; -19,59) ja **`v4 lahi sea-horse`** (-87,73; 18,26; -13,73), eli lähikoristeet `kielletty-lahipuut-v15/koristeet.json` (loki: 29 901 koristetta, raja 40 m). Eivät rakennuksia eivätkä taustaa, joten -1925:n säteet menivät ohi.
**Auki:** miksi `KoristeKatolla` (`JuoksuSokkeloMaailma.Lahipuut.cs`) päästää ne: se vaatii peittokartasta geometriaa enintään 2,5 m koristeen alapuolelta. Peittokarttaa kohdasta ei luettu. Ei nähty pelikamerasta, vaan tarkastelupisteestä, jossa katot ovat paikoillaan (`katot` 1): selvitä, näkyvätkö ne pelaajalle. Korjaus todennäköisesti LAV:n data tai suodatin, ei päätetty.

## 5. Portti
`_tyo/pelikoodari/vapaa-1/k-tarkastelu/portti.png` (13,19; 2,4; -407, ei ovilehden sisässä): seinä, oviaukko ja ovi ehjät; takapinta 0, tyhjä 0, väreily 0,00001. Yksi piste, ei koko muuria. **Uusi havainto:** lattiassa ohut valkoinen vaakaviiva molemmin puolin oviakselia (kuvassa korkeudella noin 63 %); syy tuntematon, ei mitattu. Viety LAV:lle.
`omena.png` samalta ajolta: portaiden vieressä sileä harmaa seinä, jossa haaleita vinoja läiskiä. Sama kuin KK:n harmaa laatikko? Ei selvitetty.

## 6. Seuraavaksi
1. -1858 kohdat 2 (pisteet: `V4_marmori`n UV0 tarkistamatta, ei ajoa), 4.4, 4.5.
2. -1744 kohdat 3.3–3.5 (kynnysviesti, ympärikäännös, rivi KK:lle: taso näytettävänä). Rikkoutuminen ja sivulta tuleva eivät ole vieläkään näkyneet.
3. Leijuvat osat (kohta 4), peittokartta luetaan ilman ajoa.
4. Yleiset: `tarkista.sh`-liikevahti ennen junaa (-1822 kohta 4).
5. **Jos PT haluaa:** korjaus `93cc59596` junaan, kun taso 1 on junassa (yksi rivi, ei riipu mistään muusta).

## 7. Työkalut
Uusi: `oleta-uusi <s> <teksti>` + `kuva` laukaisee kuvan lokirivistä, joten kuvaa ei tarvitse ajastaa (`sk-k.txt`). 5 kuvaa ja `mika`-rivit samassa ajossa. Scratchpad `/private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-pelikoodari/00d61af1-2874-43c9-8b07-a10d18b07b14/scratchpad/`: `tee-skk.py`, `ajo-skk.sh`, `vv/` (pienennetyt kuvat). Vanhat -1925:n listassa.

## OPIT
- Lokin luku voi olla itse vika: ennen kuin selittää poikkeavaa arvoa käytöksellä, tarkista laskentaketju ja koordinaattikehys. Sama opetus kuin -1925:n koordinaattinolla, nyt pelin koodissa.
- `oleta-uusi` on halvin tapa kuvata harvinainen tapahtuma: yksi rivi ja kuva osuu.
- Tarkastelutila piilottaa pelin esineet: tarkista, mitä `TarkasteluPaalle` sulkee, ennen kuin luottaa QA-komennon omaan vastaukseen ("kameran edessä" ei tarkoittanut kuvassa).
