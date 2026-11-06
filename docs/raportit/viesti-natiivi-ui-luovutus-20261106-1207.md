# Natiivi-UI: luovutus 6.11.2026 klo 12.07 (pehmeä kontekstiraja, 7.37)

Korvaa -1150:n "Tehty"- ja "Ajon jälkeen" -kohdat; avoimet asiat -1150:stä ja -1140:stä ovat voimassa. Lukulista 7.47: lue itse.

## Tila
Worktree /Users/Shared/Claude/wt/proto-natiivi-ui-vesinimi, haara natiivi-ui/ui-sarja-219, kärki aa359f8d6 (bd998aa59:n päällä), peili natiivi-backup peili/proto/natiivi-ui/ui-sarja-219.
Unityssä kääntämättä, ajamatta. unity-tarkistus 0 virhettä; AsetteluTesti erilliskäännöksellä vain tuttu CS0433 (viitejärjestely); uss, tyylikirja ja pohjavahti ok.
bd998aa59:n ajo on pois (PT). JU:lta pyydetty 12.0x: aa359f8d6, 5 varausta, 3 kuvaa, kansio lokit/nui-ui-aa359f8d6: iphone-pysty pallo keskitys x3, iphone-vaaka pallo keskitys x1, iphone-vaaka pallo x1 kuvilla. JU:n kuittausta ei vielä ole; jos se ei tule, tarkista. PT:lle kerrottu tulkinta "1 + 3" (pysty x3 kattaa pysyvät); PT voi pyytää neljättä pystyä.
Ei omaa ajoa, ei junaan.

## Tulos PT:lle
PT 12.0x: tulos 3 rivinä, yksityiskohdat tiedostoon. Radio ja keskitys ratkaistaan vasta näistä mittauksista. Testin kiristys ei saa viedä varausta yli 6 min: katso kestot.

## Vertailupohja: fcce6131f, iPhone pysty x3
Lokit: proto-3d/lokit/ui-pysty-toisto-20261106/b8-1..3.txt ja kaannospalvelu/20261106-114630, -114950, -115312 (-testit-tuntematon-pallo-keskitys.log.unity.log).
Ajot 1 ja 2 samat 8 vikaa (ero vain "pillerin asetukset" 24/26 elementtiä), ajo 3 11 vikaa.
- 3/3, samat luvut: Kysy 46 %, metrolinjan kosketusala [6,70 162×228], metrolinjan selite (testi poistettu bd998aa59:ssä), Kysy Pululta +0,5, Päivä ✓ +0,8, aarre aikajana ja katso (arvio ja salakirjoitus OK, aina sama vuorottelu).
- Ohita +0,7 ajoissa 1 ja 2: "tekstin mitat musteesta 1" eli Optinen palautti false; sisältö 13 pt korkea. Ajossa 3 optinen onnistui ja rivi OK. Syy auki.
- Radio -6,8 x2 ajossa 3: vain valolla muste, tekstillä ei. Ajoissa 1 ja 2 "OK" tarkoitti 0 nappia mitattu, ilman mustetta 1. USS:n mukaan sarake on keskellä (575–600, nappi 573–602). Musteen puuttumisen syy auki. Maakortin muut napit ovat "toinen osa päällä".
- Siru -0,5 x2 ajossa 3: sirut tulevat workerilta verkosta (PuluChat.Ehdotukset), peitto 28 → 29 %. Tekstin vaihtumista ei lokista todistettu, koska OK-rivit eivät sitä kerro. Ero on rajalla.
- Muuta vaihtelua ajossa 3 ilman VIKAA: mylly säännöt 15 → 7 elementtiä, tavli säännöt 6 → 4. Syy auki. En todistanut ajoitusta miltään osin.

## Tehty aa359f8d6:ssa
- Joka mitatusta napista rivi "-- mitta <näkymä>: "nimi" laatikko dx dy, tapa; huiput ...". Tavat: piirtoala, laatikko, monirivi, optinen, muste, "teksti ilman mustetta".
- Mustetta vailla: rivi "?? keskitys ... ei mustetta, ei mitattu (huiput, liike)". Jos näkymässä 0 mitattu ja mustetta vailla > 0: VIKA "KESKITYS x: 0 nappia mitattu". Muuten 0 mitattu = "??", ei OK. Radio voi siis näkyä uutena VIKANA; se on mittauksen puute, ei uusi asetteluvika.
- Monen osan napin teksti ilman mustetta kuuluu sisältöön laatikollaan, jos jokin osa sai musteen.
- Sirut kiinteinä: PuluChat.TestiEhdotukset (staattinen, asetetaan AsetteluTesti.Paivitassa, koska domain reload nollaa); teksti "Mikä kaupunki tai maa on pelaajan seuraava kohde tällä matkalla?" on oma arvaukseni, alkuperäisen loppu ei näkynyt lokissa.
- Ohitan padding takaisin 4px 16px.

## Ajon jälkeen katso
1. Kestot: varaus alle 6 min, pysty aiemmin noin 200 s.
2. Pysyvät, arvon pitää muuttua "-- mitta" -riveillä: Kysy Pululta (oli +0,5), Päivä ✓ (+0,8), Kysy-peitto (46 % → alle 45 %, rivillä desimaali ja laatikko). Pelkkä VIKA-rivin puuttuminen ei todista.
3. Vaihtelevat kolmesta pystystä: Ohitan tapa (optinen vai muste) ja dy joka ajossa; radion huiput; sirun dx nyt kiinteällä tekstillä. Jos Ohita on yhä muste osassa ajoja, selvitä miksi sisältö on 13 pt korkea.
4. Toistojen hinta (PT:lle kerrottu): 3 puhdasta ajoa jättää 2/3-vian huomaamatta noin 4 %:lla ja 1/3-vian 30 %:lla; 5 %:n alle pääsy 1/3-vialle vaatisi 8 ajoa (27 min), joten syy korjataan, ei lisätä toistoja. Kolmen ajon osuudet ovat vain suuntaa antavia.
5. Aarre: "-- aarretehtävä …" -rivit (sulusta s, kerros, kortti, teksti). Vuorotteluhypoteesi -1150:n kohdassa 1, ei todistettu. Korjaus Rakenne.NaytaHeti vain PT:ltä kysyen.
6. Metrolinja ja tappi: kuva iphone-vaaka-pallon-kierros.png ja "-- pallo: metrolinjan juuri" (-1150 kohta 2).
Kuvat vain PT:lle.

## Ei todennettu
Sirujen, radion ja Ohitan syyt ovat auki. Mac-kokoja ja 15 varauksen mahtumista ei ajeta nyt; täysi UI-sarja myöhemmin.
