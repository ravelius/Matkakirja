# Valosepän luovutus 4.11.2026 klo 14.04

Syy: konteksti yli pehmeän rajan (Raamattu 7.37). Edellinen: viesti-valoseppa-luovutus-20261104-1217.md (tausta, työkalut, LISÄYS 2–13). Loki: /Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md. Wt k30 = /Users/Shared/Claude/wt/proto-linssiseppa2-k30, haara striimi-vari 7f64cd657.

## Muisti: tulos ja mitä se tarkoittaa
Ajot iPad13,8, sama skripti striimi/sk-muisti-z10-kallistus.txt, molemmat 53,3° z9:ssä, kansiot lokit/julkaisija-muisti-z10k60-<sha>:
- c4a5bfafb: kerroin 4, valinta t = 195 s, VIKA 4095 Mt t = 205 s, kasvu jatkui, 5116 Mt, signal 9.
- 7f64cd657: kerroin 2, valinta t = 195 s, VIKA 4086 Mt t = 205 s (ei kaatumista, huippu 4121 Mt), muistivaroitus sulki valinnan, 3188 Mt 5 s:ssa. Ajo oli klo 14.02 yhä käynnissä; JU:n loppurivi puuttuu.
Johtopäätökset:
1. Kallistus + varjovalinta on laukaisija. 0°:ssa kerroin 4 ei kasva (sarja 7f64cd657, 3756 Mt).
2. Kerroin ei ole riittävä syy: kerroin 2 saavutti rajan yhtä nopeasti. Oma odotukseni "7f64 pysyy alle 4080 Mt" (LISÄYS 8) ei toteutunut. Kaatumisen esti jarru, ei kerroin. Mitä kerroin 2 olisi tehnyt ilman jarrua, ei ole mitattu.
3. Ennakointi ja kylmä levy eivät ole välttämättömiä: c4a kaatui niillä 0 palaa.
4. e4180:n kallistus tuli kosketuksesta noin 11.54.21–11.55.05 (päätelty, LISÄYS 12). Pelaaja voi siis saada saman; TF 217:ää ei ajettu.
Korjausta ei saa raportoida valmiiksi: 4080 Mt ylittyy, jarru on vain iPad13,8:lla nähty, ja se sulkee siirtymävalinnan istunnon loppuun.
Suositus PT:lle (ei tehty, ei ajettu): kallistettuna ≥ 30° ei varjovalintaa lainkaan siirtymäalueella (LiikeLaatat, SiirtymaEste), jarru varalle. Saumat kallistettuna on katsottava silloin.

## Väri: 15/16 (KK 13.59)
KS:n palat ruudulla × 0,9375 gamma-arvoina. Ehdokas, ei todistettu: musta peite alfalla 1/16 Esikatselu.cs:788–805:n UI-yhdistämisessä; antaa kaikki 10 lukua. Testi KS:llä (lähetetty, jonossa): `kuva` ja `kuva3d` samasta näkymästä.
KK:n kysymykset, avoinna: 1) mistä ja näkyykö iPadilla, 2) koskeeko striimiä. Jos peite on kokoamisessa, se koskee kaikkea Mac-kuvassa, myös striimiä. KK:n laskelma: striimi ennen peitettä noin 189/157/118, k55 175/146/118 (rakennus). Tarkista ensin kuva3d:stä. iPad: ei mitattu; mittapalat tarvitsevat iPad-vuoron JU:lta.
ÄLÄ muuta koko pelin tummennusta ilman KK:n sanaa. LISÄYS 10:n tavoite pysyy: peli vastaa k55:tä, ei vientiä ilman paria KK:lle. Levyn palaa e16/ ei löytynyt Macilta haulla (ElavaKansio tarkistamatta).
p-z11–z17 sarjassa 7f64cd657 ovat ylhäältä: LISÄYS 2:n iPad | k55 -pari ei vaadi omaa kuvaa tältä väliltä.

## Kuvat (sarja 7f64cd657, puolikoossa)
z14–z17, Cité ilman saumoja. p-z12, p-z13 suorakulmaiset tarkkuusrajat (NS). p-z9, p-z10 tummat katkoviivat, syy mittaamatta (JU: myös c4a). p-z10 laikkurajat: vertaa täysikoossa c4a:han (LISÄYS 9, tekemättä; z10k60-c4a:n p-z10 on vanha tiedosto, JU: älä käytä). p-z9 Kanaalin vesi lohkoista.

## SEURAAVAKSI
1. JU:n loppurivi 7f64 k60; rivi PT:lle jos eroaa tästä. PT:n päätös suosituksesta.
2. KS:n kuva3d, vastaus KK:lle ja KS:lle (KK:n kohdat 1, 2).
3. Veneen reitti (KORJAUSLISTA 5, LISÄYS 5): ei aloitettu. Lisäksi KK 13.59: s-270 (lokit/esikatselu-20261104-134710, noin 1747, 234) vene kelluu sumun päällä; tarkista täysikoossa. Sääntö: laiva vain vedellä. d34cacd08 siirrettävä 7f64cd657:n päälle.
4. Läiskät: ensin terävä reuna (LISÄYS 3, 6), ei aloitettu. Ajo vasta, kun muisti ja sauma on todistettu.
5. sk-striimi-loput.txt muistin jälkeen.

## LISÄYS 1 (PT: suositus tehdään)
e774647ee (linssiseppa2/striimi-vari, 7f64cd657:n päällä, natiivi-backup, 604/604; Unity ja laite todistamatta): kallistettuna ≥ 30° (hystereesi 25°) ei siirtymän varjovalintaa, jarru varalle.
PT:n ehdot (JU, striimi/sk-muisti-z10-ei-varjoa.txt): 1) käytetty ≥ 30° eikä varjovalintariviä, 2) alle 4080 Mt ilman muistivaroitusta, 3) kuvat tästä ajosta (p-z10, p-z10-90), ei reikiä, mustaa tai saumaa. Jarrun laukeaminen ei riitä. Jos täyttyvät: sk-striimi-k45.txt samalla koonnilla.
Oma lisäys, PT:n päätös: sk-muisti-z10-k29.txt, koska 25–29° varjo jää kertoimella 4 eikä kulmaa ole mitattu. Pelaajan menetys: Z9/Z10-neliöt voivat näkyä kallistettuna tasoilla 8,5–10,5 (päätelty, ei kuvaa).

## LISÄYS 2 (PT, JU, KS)
PT: järjestys ei-varjoa, k29, vasta sitten k45. k29:llä samat muistiehdot; jos ylittää, kulmaa alemmas, ei selitetä pois. z9–z10 kallistettuna täysikoossa, sama rajaus ennen ja jälkeen, ruudun alaosa itse. Jos neliöt näkyvät: kuvapolku PT:lle ennen hyväksyntää, PT vie KK:lle.
Ennen | jälkeen saman kulman parina: sk-muisti-z10-k29.txt, p-z9 | p-z9-pois ja p-z10 | p-z10-pois (`maasto siirtyma pois`). Yli 30°:n ennen-kuvaa ei saa, koska VIKA tyhjentää jonon 10 s:ssa.
JU:n "odota jäi kiinni" on muistivahti: VIKA tyhjentää komentojonon (MuistiVahti.PysaytaKomennot, Komennot.cs:249), ei vika. Sovellus elää.
KS: a64109412 sk-nd-koe-3 ottaa `kuva` ja `kuva3d` samasta näkymästä; mittapalat poistettu. KK siirsi tummennushaun VS:lle: suhde 15/16 = UI-kerros, sitten kerroksittainen loki (UIDocument-nimi, alfa) on VS:n työ. iPad-mittaus on yhä auki.

## LISÄYS 3 (KS 14.1x: peite todistettu Mac-kuvassa)
KS (lokit/esikatselu-20261104-140535, a64109412): y-0012 / y-0012-3d mediaani 0,9375 kaikissa kanavissa, p5–p95 0,934–0,941, 5,7 milj. pikseliä. Peite on UI-kerroksissa koko ruudulla. Kerros tuntematon. Mac-kuvan y-luvut ovat 15/16: käytä kuva3d:tä.
Mitattu Mac 3D: 250/218/162 ja 178/149/121 (KS:n esimerkit, ei kohdennettu kadulle tai katolle). k55-tiedosto 234/210/168 ja 175/146/118.
SEURAAVAKSI: Esikatselu.Kuva: kirjaa kerroksittain sortingOrder, juuren nimi ja alfa ruudun keskeltä (Editor/Esikatselu.cs:789–806), Mac-vuoro JU:lta. Koodihaku ei löytänyt: USS opacity/rgba 0,05–0,07 (vain Tyylikirjan --map-ink-06/07 ja iss-ohjaamo), PanelSettingsin clear (Esikatselu nollaa alfaan 0). --map-ink-06 on ruskea, ei musta, joten ei sovi neutraaliin kertoimeen.
iPad: kerros on koko pelin UI, joten se voi olla myös laitteella, mutta kokoaminen on eri. Vihje, ei mittaus: 250/218/162 × 0,971 (1/16 lineaarisena) = 243/212/157 sopii p-z17:n katuun 240–245/210–215/156–161; eri näkymä ja eri zoom. Ratkaisee vasta laitekuva UI-kerros pois.
ÄLÄ poista peitettä ilman KK:n sanaa.
