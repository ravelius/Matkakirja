# Natiivi-UI: luovutus 6.11.2026 klo 13.06 (pehmeä kontekstiraja, 7.37)

Korvaa -1244:n työlistan. Avoimet asiat -1150:stä ja -1140:stä ovat voimassa. Lukulista 7.47: lue itse.

## LISÄYS 13.09: tämä menee alla olevien edelle
PT 13.0x (sellaisenaan): "samaan ajoon, yhdellä varauksella: testi odottaa täyttä huippua + 552e635da + nostoselaimen kohde, jolla on järjestys. Odotuksella on raja: jos huippua ei tule rajassa, se on VIKA ja kesto lokiin, jottei hidas häivytys jää piiloon. F:n ansa: käy Saapumiskortti, Latauspalkki, KaupunkiKortti ja Ponnahdus läpi koodista ja korjaa samaan committiin ne, joissa sama ansa on selvästi; muut listaksi tulokseen, ei omaa ajoa. Sen jälkeen pysty x3 JU:lla. Täysi 15 varauksen sarja vasta, kun pysty on vakaa."

Tehty: kärki 1af361f4c (peilissä), kääntämättä, ajamatta. 6b2566586 ei kääntynyt (CS0136, korjattu); pohjavahti ok. Pyydetty JU:lta 13.10 (jonossa, JU lähettää polut tähän sessioon): yksi varaus, lokit/nui-ui-1af361f4c/pysty-keskitys-0.txt.

## KK 13.09 kohtaan E (sellaisenaan, saapui ennen kuin ehdin aloittaa; ei aloitettu)
"Ei vielä omistajalle eikä korttia: vipu pysyy omistajan sanan 9.10. mukaisesti, ja tapin korkeudelle en löytänyt omistajan sanaa (4.7: alakulmissa; koodin "ylemmäs" koski iPadia). Tee tappien lasku vain vaakapuhelimelle kokeena haarassasi, ei junaan ilman PT:n kuittausta. Pyydä oikean vapaan lennon ja keskeytetyn kierroksen ajo PT:ltä, kun vuoro on vapaa; tämä ei ohita Pariisia eikä juoksupeliä. Katso samalla ohjainrivi, peukalon ulottuvuus ja suurennuslasin haalea neliö. Kuva oikeasta tilasta KK:lle. Kortti tulee vasta, jos lasku ei riitä ja vipua pitäisi siirtää."
Tee vasta, kun UI-sarjan pysty on vakaa, omaan committiin. Tapin korkeus: OpasValikko.cs:1836; tavoite tappi y noin 287-351 vaakapuhelimella.

- Huippuodotus (AsetteluTesti.Keskitys.cs): huippu alle 0,5 luetaan uudelleen 0,25 s:n välein, kunnes nousu ≤ 0,02; 3 s:n rajalla yhä nouseva = VIKA. Nousu lokiin: "-- huippuodotus <kohta>: "<nappi>" a -> b, x s". Tasaisen matala huippu hyväksytään kahden luvun jälkeen. Viive ennen häivytyksen alkua voi silti mennä ohi.
- Nostoselain: TestiVarmistaJarjestys lisää kaksi testiriviä, kun järjestys on tyhjä, ja loki kertoo sen ("-- nostoselain: maan nostoja ei ole ajossa, testirivit"). PT:n "kohde, jolla on järjestys" ei toteutunut sellaisenaan: en tiennyt batchista kohdetta, jolla olisi maan data. Kerro PT:lle tuloksessa. Paneelilla ei ole USS-siirtymää, joten rivi todistaa vain, ettei avaus hajoa.
- Ansa korjattu vain Latauspalkki.Nollaa (mk-heti + uss-sääntö täytölle). Muut listana tulos-nui.md:n lopussa.

Kun varaus on valmis: 1) jos ei käänny, korjaa ja pyydä uudelleen; 2) lue "huippuodotus", "nostoselain", Päivä ✓ (ei enää VIKA, dy lokissa), Ohita ja radio, kesto; 3) jos radio jää 0 mitattu = VIKA, se on aito puute, kerro PT:lle; 4) pyydä JU:lta pysty x3; 5) kun pysty vakaa: tulos PT:lle 3 rivinä ja täysi 15 varauksen sarja vasta sen jälkeen.

Alla olevat "vastaus odottaa" -rivit on vastattu: PT ja KK yllä.

## Tila
Worktree /Users/Shared/Claude/wt/proto-natiivi-ui-vesinimi, haara natiivi-ui/ui-sarja-219, kärki 552e635da (peilissä natiivi-backup), ei muutoksia.
93bfd4379 on ajettu ja katsottu; 552e635da (vain testin raja) on kääntämättä. Ei junaan ennen PT:n kuittausta. Täysi 15 varauksen sarja ennen junaa pysyy.
Tulos kokonaan: proto-3d/lokit/nui-ui-93bfd4379/tulos-nui.md. Lue se ensin.

## Lähetetty, vastaus odottaa
- PT 13.0x (jonossa, tarkista list_eventsillä): tulos ja kysymys "Ohita + radio + nostoselain + 552e635da samaan ajoon, vai ensin F:n ansa muualta?". Ei omaa ajoa ennen vastausta.
- KK 13.0x (jonossa): kohta E, kuvat lokit/nui-ui-93bfd4379/kuvat/, varaus testilipuista ja suositus: vipu pysyy, tapit vaakapuhelimella noin 110 pt alas. PT:n ehto kerrottu: jos KK vie vivun siirron omistajalle, oikea tila ajetaan ensin omalla varauksella.

## Todistui ajosta
F nostokortissa (opacity avattaessa 0,57-0,58, lopuksi 1,00) ja aarteessa (aikajana, katso 1,00). A + kumous: Kysy Pululta dy -0,16. C: kierroksen kosketusala kattaa alimman nimen. Kestot 141-167 s. Intro 2 ja 3 OK kerran, syy auki.

## Ei todistunut, tehtävä PT:n sanalla
1. Nostoselain: testi ei auennut, koska kohde:pompeji@ITA:lla jarjestys on tyhjä batchissa (Nostoselain.cs:416). Korjaus: kohde, jolla on järjestys, AsetteluTesti.cs:478-479 kohdalla.
2. Vaihtelu 2/3 pystyä, kaatoi sarjan: Ohita (luento) dy +0,67 huippu 0,10 / dy +0,17 huippu 0,77; radio huippu 0,06 (raja AsetteluTesti.Keskitys.cs:438) = 0 mitattu = VIKA / 0,09 = dy +0,03. Sama ajo kaikkia kahta. Tulkinta: mittaus osuu kesken häivytyksen, ei todistettu. Ehdotus: testi odottaa täyttä huippua ennen mittausta; radion haalea muste (0,04-0,09) on silti auki, kuvaa siitä ei ole.

## B
Päivä ✓ dy +0,77 pysyy (pysty ja vaaka, 4/4). Täysikokoisesta rajauksesta eroa ei näe. Raja 1 pt vain tälle riville, ✓ jää mittaukseen: 552e635da. Pikselit: Päivä ylä 14,3 / ala 12,0 pt, Yö 13,7 / 12,7.

## E
Testilipuilla: vapaa lento vipu [74,103 88×176] × tappi [74,177 64×64]; keskeytetty lista alas 188 × tappi 177 (11 pt), kosketusala 169. Nämä kolme VIKAA jäävät, kunnes KK tai omistaja päättää. Tapin korkeus OpasValikko.cs:1836 (TappiKorkeusOsuus). Vipua ei ole siirretty. Ei kokeiltu: tapit alas, ohjainrivi tapin alla (1838-1840), peukalo.

## Havainnot, ei korjattu
- Suurennuslasin napissa haalea neliö lasin takana pallon kuvissa (kierros, vapaa lento, keskeytetty); aarrekuvissa ei. Lopeta kierros [716,8] ja Linssit [714,8] lähes samassa paikassa. Syy ja se, näkyykö pelissä, auki.
- F:n ansa: Saapumiskortti 75/123, Latauspalkki 53, KaupunkiKortti 301, Ponnahdus 65/93/128. Kerrottu PT:lle, ei tarkistettu.

## Ei todennettu
552e635da kääntymättä. Vipu ja tappi oikeassa vapaassa lennossa; lista ja tappi oikeassa keskeytyksessä. Ohitan vaihtelun syy. Radion muste. Mac-koot ja täysi sarja.

Kuvat vain PT:lle; E:n kuvat on jo viety KK:lle.

## PT 13.1x kohtaan E (sellaisenaan, menee KK:n ajoituksen edelle)
"KK 13.09 pallon ohjaimista: ei omistajalle nyt, vipu pysyy. Laske tapit vain vaakapuhelimella kokeena; oikean tilan ajo vasta PT:n vuorolla, Pariisin ja juoksupelin jälkeen. Kuva KK:lle, kortti vain, jos vipua pitäisi siirtää. Kirjaa luovutukseen, jos et ehdi."
Ei ehditty: tappien lasku aloittamatta.
