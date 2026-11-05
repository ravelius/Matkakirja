# Pelikoodari: luovutus 5.11.2026 klo 18.58 (konteksti 30 %): kaiteen sininen viiva selvitetty, muuri ei kunnossa, jahti ei ole vieläkään todennettu

Täydentää -1837:ää, -1822:ta ja -1744:ää; lue ne kokonaan. Proto `pelikoodari/tarkastelu-219`, kärki `8d2d95b9a` (vain kuvalista muuttui, koodi kuten `f25ccb55a`), pushattu natiivi-backupiin. Ei ajoa käynnissä, L2 ilmoitettu JU:lle vapaaksi. Ei junaan. **Taso 1 on yhä pääasia** (-1744 kohta 3).

## 1. Ajo `lokit/tarkastelukuvat-8d2d95b9a-185430` (9 kuvaa, 204 s)
- **Boordit:** korjaus pysyi: väreily boordi-1 0,005, boordi-2 0,002, boordi-3 0,005. Luvut, kuvia ei katsottu tässä ajossa.
- **Muuri:** ei kunnossa. Takapinta 0,23, väreily 0,025. Kuvassa katon alapinta näkyy tiilikuviona ja voimakkaana moiréna, ja punainen päätyseinä on umpinainen ilman räystästä. **Syy selvittämättä, `muuri-pinnat.png` katsomatta.** Seuraava askel: materiaalikartta (`kartta2.py`) tästä kamerasta, onko alapinta olemassa mallissa. Varmista samalla -1822:n kysymys Massassasta.
- **Portti:** hukkaan mennyt piste: kamera on kiinni Meridiaaniportin suljetussa ovilehdessä, joten koko kuva on ovea. Ei kerro seinistä mitään. Valitse uusi piste, jos seinät halutaan todeta.
- **KK:lle kerrottu 18.5x.** Omistajalle ei sanota, että seinät ovat kunnossa.

## 2. Kaiteet (KK:n B)
**Sininen viiva, selvitetty.** Hylly y = 0,31, leveys 15 cm, normaali ylös. Terassin leivonta on 2,08 tekseliä/m kaikkialla (48 cm/tekseli), joten hyllyn UV1-saareke on 0,17 tekseliä korkea ja osuu nollatekseliin (0,0,0, a = 1/255). Valokartta `valo-laatta-m15.png` täsmää pelikuvaan.
- **Todistus pelistä:** `kaide-puuttuva0.png`: täysi täyttö vaalensi viivan kirkkaammaksi siniseksi ja viiston kaistan sinertäväksi mutta ei poistanut kumpaakaan, ja vasempaan pilariin tuli täplikäs kuvio. Väri ja tummuus siis tulevat täytöstä, itse viiva leivonnasta. Sinisyyden kerrointa ei mitattu pelistä; koodin mukaan varjon sävy painottuu n.y:n mukaan, mikä sopii eroon hyllyn ja viiston kaistan välillä.
- **Korjaus:** LAV:n jonossa (saarekkeen vähimmäiskorkeus ≥ 2 tekseliä tai suurempi tiheys, dilaatio nollatekseleihin). Versiota ei luvattu. Peliin ei tehdä kiertoa.
- **VS:** PEITTO 3 olettaa puuttuvan tekselin kertoimeksi täyden, mutta neljässä mitatussa atlaksessa rgb = 0:lla on a = 1/255, joten tunnistus ei laukea. VS harkitsee tunnistusta raa'asta rgb:stä. Tulos ja kuvat viety. Friisiä ei kuvattu `puuttuva 0`:lla.
- **Laajuus:** nollatekseliin osuu terassin pisteistä 12 % (laatta-m15) ja 28 % (vareily-4). Yksi vareily-4:n harmaan kaistan säde (1600, 750) osui kuitenkin arvoon a = 11 eikä nollaan, joten kaistan selitys ei ole siinä näkymässä varma.

**Leveät pystyraidat:** kartassa samat lohkot, joten luultavasti leivonnan karkeus (48 cm). Kuvasta katsottu, ei mitattu.

**Pistemäinen raidoitus, auki.** Säde osuu yhteen pintaan (54 + 20 + 63 sädettä alueilla `pisteet`, `nauha`, `tasainen`, ei toista osumaa jalustassa eikä taustassa 40 m:n sisällä), joten syy ei ole kaksi päällekkäistä pintaa. `kaide-heitto0.png`: sama kuvio samassa paikassa, vaikka lattian elävä varjo katosi, joten syy ei ole leivottujen runkojen elävä varjo. Kuvio on 1–2 näytön pikselin kokoista, eli ei atlaksen tekseli. **Testaamaton epäily:** V4_marmorin UV0 on suuri (u noin 737), ja varjostimen kuvio tai hajautus voi kärsiä siitä. Tarkista `V4_marmori`-haara `JuoksuMaailma.shader`:ssä ennen uutta ajoa.

## 3. Korjaus -1822:n kohtaan 3 ja -1744:n kohtaan 2: jahti
- Oikea loki on `lokit/esikatselu-20261105-174557/unity.log`, ei `loki.txt`.
- Lokissa on 0 riviä `eunukki jahtiin` eikä yhtään vartijatapahtumaa (`varoitus`, `sivulta`, `vaisto`, `kierti`, `ei nähty`, `ei vuoroa`), vaikka tapahtumat `suoraan` ja `kaanto` kirjautuvat. **Yksikään vartija ei siis lähtenyt liikkeelle, ja `fb9811afd` on yhä näkemättä pelistä.** Miksi vartijoita ei ollut, on selvittämättä: aloita `KarttaVartijat` (`JuoksuV4.Vapaa.cs` 266) ja `o.Vaylia`, `LinjalleMinS`.
- e23:n, e26:n ja e28:n eunukki on **luultavasti takaa-ajaja** (eunukki-1, indigo), joka seuraa reittiä: `JuoksuV4Maailma.cs` noin 1271–1274. Käsikirjoitus kääntää vasemmalle 4–5 m:n välein, joten hän voi olla kulmien takana ja juosta poispäin keisarista. Päätelty lokista, koodista ja kuvista, ei mitattu. Jos näin on, -1744:n "juoksee sivuttain tai poispäin" on käsikirjoituksen sivuvaikutus eikä peliviä. e22:n "rakennuksen sisällä" on selittämättä.
- **Ennen seuraavaa katseluajoa:** lokirivi takaa-ajajan paikasta tai testi riittää (10.5). Älä oleta, että `fb9811afd` korjasi näkemäsi.

## 4. Seuraavaksi
1. Taso 1 (-1744 kohta 3, -1822 kohdat 2.4 ja 3).
2. Muurin syy (kohta 1), materiaalikartalla ilman ajoa.
3. Pisteet (kohta 2), varjostimen luku ilman ajoa.
4. -1837:n `boordi-2`:n seinä z = 277,35: uusi `boordi-2.png` on nyt saatavilla.
5. LAV ei ole vielä kuitannut terassia; konsoli ja räystäs jonossa aiemmin. **Kun leivonta on valmis, kerro VS:lle, näkyykö viiva vielä** (VS 19.0x: varjostin pysyy ennallaan siihen asti; jos rgb = 0 -tekseleitä jää, VS tekee tunnistuksen). `valo puuttuva 0` oli vain koe: lista palautti arvon 1:een ajon aikana, ja koodin oletus on `true`.

## 5. Työkalut
Scratchpad `/private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-pelikoodari/555acf86-27cf-4dab-ac7f-6616ca47de59/scratchpad/`: `viiva_lue.py` (lukee myös UV0, UV1 ja COLOR), `viiva.py` (säteet + UV), `kartta3.py` (valokartta kameran näkymästä), `valo3.py` (hyllyt tekseleinä), `valo4.py` (pelikuva vs atlas), `raita.py` (pintojen määrä säteillä), `nollat.py` (atlasten nollatekselit), `kaide-pari.png`. Muut työkalut -1837:ssä. Kuvapisteet ovat 2000 × 1500 -näytössä, tiedoston kuva on 2202 × 1651.

## OPIT
- Kapea pinta tarkistetaan tiheällä pystypyyhkäisyllä: kuusi silmällä luettua pistettä ohitti 15 cm:n hyllyn, 1 pikselin askel löysi sen heti.
- Väite "viiva johtuu X:stä" testataan muuttamalla X:ää ja katsomalla, mitä katoaa: täyttö muutti väriä mutta ei poistanut viivaa, ja elävän varjon epäilyni kumoutui.
- Lue oikea loki: `loki.txt` oli tyhjä näiden rivien osalta, `unity.log` ei. Nollatulos väärästä tiedostosta olisi näyttänyt samalta.
