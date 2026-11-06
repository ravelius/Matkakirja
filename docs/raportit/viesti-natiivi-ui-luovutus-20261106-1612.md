# Natiivi-UI: luovutus 6.11.2026 klo 16.12 (pehmeä kontekstiraja, 7.37)

Korvaa -1550:n työlistan. -1510:n kohdat "Mitä muutin" ja "Opit", -1306:n Havainnot sekä -1150:n ja -1140:n avoimet ovat voimassa. Lukulista 7.47: lue itse.

## Lue ensin
proto-3d/lokit/nui-ui-88e2d1eb5/tulos-nui.md (B kunnossa, E auki, D ennallaan, ei liitosta)

## Tila
Worktree /Users/Shared/Claude/wt/proto-natiivi-ui-vesinimi, haara natiivi-ui/ui-sarja-219, kärki 88e2d1eb5, ei muutoksia. Peilissä natiivi-backup nyt 88e2d1eb5. -1550:n "peilissä" ei pitänyt paikkaansa: peili oli 61cbc0856:ssa, ja työnsin sen 16.1x.
Kaatokoehaara poistettu paikallisesta checkoutista, peilissä natiivi-backup yhä (fd07faea6).
Ei omia ajoja jonossa JU:lla.

## Odottaa PT:n vastausta (lähetetty 16.1x, sisältö tulos-nui.md)
1. E: diagnostiikkacommit "kuva hidas" -riville reitti (levy tai verkko) ja tavut, ajo koko 15:n kanssa samassa varauksessa. Älä tee ennen PT:n sanaa. Ei raja- eikä toleranssimuutosta.
2. Riittääkö kaatuneiden uusinta vai koko 15 ennen liitosta (PT 15.0x: jaettu koodi = koko 15). Ehdotukseni: koko 15, koska linna keskitys iphone on B:n korjauksen jälkeen ajamatta.
3. Rungon 5 Valosepän committia, joissa lukee "ei junaan" (kysytty jo aiemmin, vastaus puuttui).
4. OpasValikko.cs:2982 lukee yläreunan samalla tavalla kuin LinnaValikko luki. B:n syy vahvistui, joten kerroin rivillä. Ei muutettu, koska sen varauksissa ei ole vikaa.

## PT, sellaisenaan (voimassa)
15.4x: "E:n ehto ennallaan: hajonta = E auki, ei liitosta. B: syy ja korjaus asetteluun, ei toleranssia."
15.1x: "Varmista silti JU:lta ennen liitosta. Liitos omana haarana: diff --stat PT:lle, JU yhdistää."
Lisäksi -1510:n PT 15.0x -ehdot.

## Kun PT on vastannut
- Lue E:n reittirivit. Jos 10 s:n vika toistuu, E on auki, ja tulos sekä syyehdotus menevät PT:lle. Korjaus vain PT:n sanalla.
- Kun jäljellä on vain D: runko JU:lta (16.08 d092f48cc), kuiva yhdistys uusimmalla kärjellä, git diff --stat PT:lle, JU yhdistää.

## Tähtikyltit (KS pyysi PT:n kautta, ei omaa ajoa, ei koodia)
Pari katsottu täysikokoisina: Temple-tornin ja Bastiljin kyltit puuttuvat ajon 18 rl-vesi-kuvasta oikeasti. Koodiero 18→19 ei koske kylttejä. Ajon 18 kuvat juuri ennen ja jälkeen näyttävät kadonneiden kyltit, joten kyse ei ole ajon lopun yleisestä tilasta.
Syyehdotus, ei mitattu: kahden kynnyksen reittiriippuvuus. Temple: Horisonttiusva.KylttiUsvassa (0,5 pois, 0,7 takaisin); väli on kapea, joten tämä on heikompi. Bastilji: KylttiUiEste.Osuu, Liiku-rivin paluuvara 8 pt, noin 16 kuvapikseliä Liiku-tekstistä.
KS lisäsi seuraavaan yhteiseen ajoonsa mittauksen: _tyo/karttaseppa/laikka-vesi-20261106/lisa-23.txt, kuvat kyltit-suora ja kyltit-reitti, rivit `ui kohdenostot kyltti …`. Ajoa ei ollut tilattu 16.0x. KS lähettää lokin polun.
Kun loki tulee: lue usva ja törmää molemmilta reiteiltä. Sama kamera mutta eri arvo = syy vahvistuu. Sen jälkeen ehdotus PT:lle (esim. levossa päätös ilman edellisen tilan vaikutusta). Älä tee koodia ennen sitä. Huom: KylttiUsvassa- ja KarttaKyltti-koodi on KS:n ajohaaroissa (esim. e5cd281f1), ei ui-sarja-219:ssä.

## Havainnot
- E: 88e2d1eb5:ssa hitaat intron odotukset ovat latausvaiheessa (vuoro noin 0, kesken 0). PurkujaKerralla-jonohypoteesi kumottu näissä kolmessa. Vaakavikaa (yli 10 s) ei toistunut, joten sitä ei ole mitattu.
- Aloitusvihjeet ja merkit jonottavat vuoroa jopa 2,5 s pelin alussa: 28 latausta, kaksi kerrallaan. Ei tutkittu vaikutusta pelaajaan.
- "kuva ei latautunut" pallo iphone -varauksessa: 44, kaikki .webp. Syytä ei tutkittu.
- B: Akustiikka on vaakapuhelimella osin vierityksen takana, ja vierityspalkki on piilossa. Kuvaa ei katsottu; PT ei ole pyytänyt.
- Aloituksen lukeminen vie tässä roolissa noin 16–26 % (usage 16 %, hook 26 %), joten pehmeä raja täyttyy heti.

## Ei todennettu
E:n syy. Vaakavian syy. Tähtikylttien syy. B kuvasta. linna keskitys iphone 24ce342cb:n jälkeen. Lukemani Raamatusta: luvut 4 ja 6, 7.23–7.25; koko luku 7 ei. -1414:n Ei todennettu -lista on voimassa.

## Muuta
Remote Control ei päällä: vain omistajan pyynnöstä.
Hook listaa työlistalta rivit "Concorden aukio", "Nähtävyyksien lähialue" ja "Pariisin saumat": eivät tunnistu omikseni, en päivittänyt.

## Odottaa, aloittamatta
Tappien lasku vaakapuhelimelle (-1510:n kohta "Odottaa"): vasta, kun UI-sarja on yhdistetty.
