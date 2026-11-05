# Valosepän luovutus 6.11.2026 klo 00.47

Korvaa luovutuksen -0025. Syy: konteksti pehmeällä rajalla (Raamattu 7.37).

## LISÄYS 00.5x: ENSIN TÄMÄ (korvaa alta AJO-kohdan)
Ajo 8143b96ef TEHTY: L1, 252 s, exit 0, 8 kuvaa, 0 Shader error, 0 error CS, lokit /Users/Shared/Claude/proto-3d/lokit/esikatselu-20261106-004940 (koonnit koonti-*.jpg). LUKKO VAPAA lähetetty JU:lle. Älä aja uudelleen. Tulokset ja koonnit lähetetty KK:lle; KK:n vastaus odottaa, lue se ensin. PT:lle ei ole vielä lähetetty kopiota.
Nähty: nuolet ja Pont Neufin porras poissa; Madeleinen kadun nimi ehjä; Palais Bourbon tunnistettava; tummuuskorjaus vaalentaa kartan.
SEURAAVAKSI, jollei KK sano muuta (koodi haaraan `linssiseppa2/ohjelmakohteet`, EI ajohaaraan; ei omaa ajoa):
1. Varjo: `OhjelmaKohteet.cs` `VarjonRajat` tekee varjon ulkorajoista; Palais Bourbonin alla näkyy tumma neliö. Tee varjo muodon mukaan tai jätä se pois tästä kohteesta.
2. Kärjen väri: `KatuKartta` 0x92866D mitattu tummasta kartasta. Nyt kärki 153,137,106, katu 218,200,160 (p-pn-ylha, yksi mittauskohta Pont Neufilta). Arvio noin 0xD0BE98; mittaa useammasta kohdasta ennen muutosta.
3. Lähikuva: `aja ... 0.0012` ei tuonut kameraa lähemmäs (`KorkeusKaarelle`, raja selvittämättä). Madeleinen lähikuva jäi rajaukseksi; KK:lle kerrottu.
4. Notre-Damen pää näkyi vain pienenä, ei arvioitu tarkemmin.
5. Sitten Pompidou.
Seuraavaa ajoa varten ajohaara tehdään uudelleen: ohjelmakohteet + e726bba9f (`git merge-tree --write-tree`, `git commit-tree`, `git branch -f`), ei viedä. JU vaatii pyyntöön rivin "mitä tämä ratkaisee" ja perustelun, jos kuvia on yli 5.

## TILA
Koodi c22a5e0bc, haara `linssiseppa2/ohjelmakohteet`, viety natiivi-backupiin (ei origin), worktree /Users/Shared/Claude/wt/proto-linssiseppa2-k30. Ei junaan. Geometriatestit 5/5 läpi; Unityssä EI käännetty eikä ajettu. Sisältää 1af8879d6:n ja kuvauskomennon 0f380637f.
KK 00.3x: Madeleine ja siltojen päät kelpaavat kokeena, ei junaan. Ei omaa ajoa: näytetään seuraavassa ajossa. Kaide: ei enempää aikaa; KK kertoo pisteet aamulla vikana, syy auki. KK kertoo 14 m:n seinät omistajalle aamulla.
ÄLÄ säädä laskun kärjen väriä tumman kartan mittauksesta, ennen kuin KS:n tummuuskorjaus on mukana (haarassa ei ole; m-sivu ja p-et tummia). KK ehdotti korjausta PT:lle ajohaaroihin.

## AJO (korjattu 00.5x, korvaa aiemman pyynnön)
PT 00.5x: seuraava ajo kertakäyttöisestä ajohaarasta, jossa KS:n tummuuskorjaus. Tehty: 8143b96ef, paikallinen haara `linssiseppa2/ajo-palais-tummuus` (c22a5e0bc + e726bba9f), yhdistyi ilman ristiriitoja, kääntöä ei kokeiltu. EI VIEDÄ, ei junaan. Ohjelmakohteiden haara ennallaan c22a5e0bc:ssä: uusi koodi sinne, ei ajohaaraan. Värit arvioidaan vasta tästä ajosta.
JU palautti ensimmäisen pyynnön (rivi "mitä tämä ratkaisee" puuttui, yli 5 kuvaa). Uusi pyyntö perusteluineen lähetetty; nähtävyyssarja menee ensin (KK 23.38). Odota ESIKATSELU NYT ja linja. Aja taustalla:
`PROTO_LINJA=<linja> ESIKATSELU_PISTEKERROIN=0.465 zsh /Users/Shared/Claude/wt/proto-linssiseppa2-k30/tyokalut/esikatselu.sh 8143b96ef /Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/ohjelmakohteet/sk-palais.txt`
Heti lopuksi JU:lle LUKKO VAPAA, linja, kesto, kuvamäärä. Jos kääntö kaatuu, katso ensin yhdistyneet KS:n tiedostot ja OhjelmaKohdeRakennukset.cs:n Pb-osa.
Katso 8 kuvaa täysikoossa ja lähetä KK:lle (kopio PT:lle):
1. Palais Bourbon: pb-etu, pb-piha.
2. Madeleine: m-sivu (kadun nimi), m-lahi (pylväät, veistokset, katto).
3. Pont Neuf: p-pn-ylha, p-et (porras poissa? p-et:ssä myös Notre-Damen pää).
4. Nuolikorjaus: p-car, p-ita (Marie ja Tournelle: menevätkö päät talon päälle, ovatko jyrkkiä).
KK pyysi saman ajon näyttämään nämä kaikki; muista myös kertoa, jos jokin päätytarkistus jää yhdestä kuvasta epäselväksi.

## PONT NEUFIN PORRAS (vastattu KK:lle 00.4x)
Vika, ei oikea muoto: e7c639217:ssa yhdysosa alkoi OSM:n rantamuurin kolmiokulmasta (z 22 m, kansi 10,4 m), kansi leveni noin 11,6 m itään. 1af8879d6 poisti sen koodista; ylhäältä otetussa offline-kuvassa jää noin 1,5 m:n siirtymä saaren eteläreunaan, koska varret eivät ole samalla linjalla. Kartalla ei vielä nähty.

## PALAIS BOURBON (c22a5e0bc)
`OhjelmaKohdeRakennukset.cs`, `PalaisBourbon()`, kohde listassa: Lat 48.8615973, Lon 2.3182860, Akseli 64,3 (sama kuin Pont de la Concorden akseli), +x kohti Seineä, +z länteen. 4 511 kolmiota. Jalanjälki OSM relation/1019368, jäsenet lisätty `a/hae-a.mjs`:n `lisaTiet`-joukkoon ja `osm-a.json` haettu uudelleen. Offline-kuva a/oma/palais-bourbon-k45-205.png. Viitekuvat a/viite/Palais Bourbon-0, -2, -4, -5, -6, -piha0, -piha1 (Commons CC BY / CC BY-SA).
OMAT ARVIOT, kerro KK:lle: korkeudet kuvista, ei lähdemittaa (porrastaso 4,5 m, pylväät 15,5 m, harja 29,8 m, siivet 15–18 m). Kapean itäsiiven korkeus 10 m ja tasakatto on arvaus, koska se ei näy kuvissa. Lasikaton puolipyöreä muoto: kaari on Seinen puolella, suuntaa ei tarkistettu. Päätykolmion hahmot ovat matalia laatikoita kuten Madeleinessa.

## SEURAAVAKSI
Ajon jälkeen Pompidou, Tour Saint-Jacques, Saint-Eustache, Saint-Sulpice. Ensin kuvat: `python3 -I a/hae-viite.py listaa <kohde>`, `hae <kohde> <i> ...`. Mitat: luovutus -2340, kohta AINEISTO OSALLE A. Testit ja kuva: `sh aja-geometria.sh`, `python3 esikatsele.py obj <tulos> <nimi> 45 300 1100` (ilman -I, numpy). Suunta: 270 = Seinen puolelta palatsissa, 90 = pihan puolelta.
Pb-apurit (`PbSiipi`, `PbIkkunat`, `PbKattoikkunat`, `PbSivu`) käyvät muillekin kuperista OSM-monikulmioista rakennetuille.

## MUUTA
Seuraamattomat .claude/settings.local.json.ennen-kevennysta ja waveletNoiseTile.bin: en koskenut. Työlistahookin Pariisi-rivit eivät ole Valosepän.
