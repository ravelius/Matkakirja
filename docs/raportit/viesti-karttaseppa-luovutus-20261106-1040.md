# Karttaseppä: luovutus 6.11.2026 klo 10.40 (KS)
Syy: konteksti 25 %, luonteva tauko: ajo 7 on jaettu ja vastaukset odottavat. **Voittaa -1014:n ristiriidassa; siitä pätevät TEHTY, KUITATTU ja ODOTTAA, ja -0958:sta lukematta jääneet Raamatun osat.** Kaikki kokeena, ei junaan, ei iPadia. W = /Users/Shared/Claude/wt/proto-karttaseppa-nd-kaanto-219 (karttaseppa/nahtavyydet-219, kärki f743d99ad, ei pushattu). Y = /Users/Shared/Claude/wt/proto-karttaseppa-yhteinen (karttaseppa/ajo-yhteinen-tasoitus, kärki 9f5e3e105, puhdas). Molemmat Unity b8:lla. Viestit: ListAgents ja nimi + [ref] (pelkkä nimi ei mene perille), VS send_messagella: local_3b36fe96-0199-4b17-9eb4-46a882ce7399 (ei näy ListAgentsissa).

## ENSIN
Vahti Monitorilla: `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh` (30 min, viritä uudelleen). Posti 13602e516 (ovilehti) ei ole KS:n.

## AJO 7: KATSOTTU JA JAETTU, EI OMAA AJOA
`/Users/Shared/Claude/proto-3d/lokit/karttaseppa-yhteinen-7-b8-9f5e3e105`, Y 9f5e3e105, 9/9 kuvaa, ei käännösvirheitä (JU). Lokin ESIKATSELU POIKKEUS on Unityn SearchDatabase, sama ajossa 6, ei meidän.
Jaettu KK:lle, NS:lle, NUI:lle, VS:lle ja PT:lle. Korjaantui: rannan raidat ja kaista, Les Hallesin 2 porraskorttelia, Palais-Royal'n läikkä.

## ODOTTAA VASTAUSTA
- **KK:** rantarivin 11 puuta (peittävät vain kaarikäytävän alaosaa; ND:n sääntö "ei kirkkojen eteen"), Palais-Royal'n aukio ja 2 puuta (isompi peittää keskioven), Tuileries'n itäpään vihreämpi nurmiraita Louvren pohjakuvan reunassa (myös ajossa 6). Lisäksi kattokortti v4/v6 (-0958, suositus v6).
- **NS:** Forumin litteä ruskea alue ilman seiniä (louvre-ita noin x 1680–1850, y 1080–1170; po-la noin x 1000–1140, y 1320–1440), 6 pientä talonpalaa Les Hallesin puistossa (po-la noin x 730–1020, y 1560–1700). Tuleeko uusi kansio? Tuo sha:n; vaihda TaloKansio Y:ssä.
- **NUI:** kuittaus hintakyltistä, karsinnasta (3,0 ms ka, suurin 85,3 ms) ja nimistä. Westminsterin palatsi näkyy lontoo-nimet-kuvan yläreunassa, vaikka haku sanoo "syy taso". Jyväskylän toinen haku jäi saamatta, koska skenaario päättyi heti komennon jälkeen: **viimeisen komennon perään aina odota.**
- **VS:** co-yla, co-ob.

## SEURAAVAAN YHTEISEEN AJOON (ei omaa ajoa, yhdistä vasta kun ei ajoa käynnissä)
1. W f743d99ad Y:hen: malli sai suoraan ylhäältä täyden usvan heti, kun jalka (keskipiste) oli ruudun ulkopuolella (`JalanUsva`, RuutuPiste ilman ulos = true; kallista 0:lla ei syvyysusvaa). Oma 3b253ee87:n vika 5.11. Syy luettu koodista, kääntämättä, ajamatta. Todiste: co-yla samalta kameralta, Louvren länsipää näkyy puiden pohjoispuolella. KK tietää.
2. JU:n runko ce65ccfe4 (addae63f2 + 152 metaa): ensimmäinen käännös tuo 152 tiedostoa uudelleen; sama meta omassa haarassa = lisäysristiriita, ota rungon versio.
3. Jos NS tuo uuden kansion: po-la ja louvre-ita samalta kameralta.
4. Jos NUI haluaa: Jyväskylän toinen haku.
5. po-la ja pr-rivoli olivat kartaltaan sumeampia kuin ajossa 6, muut Louvre-kuvat eivät. Epäily: e23:n ensipiirto, ajon kaksi ensimmäistä kuvaa, todistamatta. Toista sama kamera ei-ensimmäisenä, jos tila ei muuten selviä.

## Oppi
Malli, joka puuttuu vain yhdestä kulmasta, kannattaa etsiä ensin ehdosta, joka haaroittuu kulman mukaan. Laske kuvan mittakaava tunnetusta kohteesta ennen kuin päättelet, onko kohde ruudussa: ensimmäinen arvioni keskipisteen paikasta oli väärä. zsh: ${C}:refs, ei $C:refs.

## LOPPUTESTIT (Karttasepän oma lista, ei tehdä nyt; siirrä tämä osio jokaiseen uuteen luovutukseen)
Repon mainissa ei ole yhteistä lopputestilistaa (PT 01.5x). Tämä osio on lista, kunnes PT muuta sanoo.
1. Saapumislento laitteella (2.209, KK, kirjattu PT 01.5x): mallit syntyvät noin 11 km:ssä; jos tarkempi maastotaso ei ole vielä ladattu, kohde voi hetken istua väärällä tasolla. Vain laite näyttää.
