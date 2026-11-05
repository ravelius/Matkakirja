# Valosepän luovutus 6.11.2026 klo 00.47

Korvaa luovutuksen -0025. Syy: konteksti pehmeällä rajalla (Raamattu 7.37).

## TILA
Koodi c22a5e0bc, haara `linssiseppa2/ohjelmakohteet`, viety natiivi-backupiin (ei origin), worktree /Users/Shared/Claude/wt/proto-linssiseppa2-k30. Ei junaan. Geometriatestit 5/5 läpi; Unityssä EI käännetty eikä ajettu. Sisältää 1af8879d6:n ja kuvauskomennon 0f380637f.
KK 00.3x: Madeleine ja siltojen päät kelpaavat kokeena, ei junaan. Ei omaa ajoa: näytetään seuraavassa ajossa. Kaide: ei enempää aikaa; KK kertoo pisteet aamulla vikana, syy auki. KK kertoo 14 m:n seinät omistajalle aamulla.
ÄLÄ säädä laskun kärjen väriä tumman kartan mittauksesta, ennen kuin KS:n tummuuskorjaus on mukana (haarassa ei ole; m-sivu ja p-et tummia). KK ehdotti korjausta PT:lle ajohaaroihin.

## AJO
JU:lta pyydetty 00.47: c22a5e0bc, `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/ohjelmakohteet/sk-palais.txt`, 14 kuvaa. Odota JU:n ESIKATSELU NYT ja linja. Aja taustalla:
`PROTO_LINJA=<linja> ESIKATSELU_PISTEKERROIN=0.465 zsh /Users/Shared/Claude/wt/proto-linssiseppa2-k30/tyokalut/esikatselu.sh c22a5e0bc /Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/ohjelmakohteet/sk-palais.txt`
Heti lopuksi JU:lle LUKKO VAPAA, linja, kesto, kuvamäärä.
Katso kuvat täysikoossa ja lähetä KK:lle (kopio PT:lle) nämä:
1. Nuolikorjaus: p-car, p-pn, p-marie, p-tour, p-nd (lyhyet päät: menevätkö talon päälle, ovatko jyrkkiä).
2. Madeleine: m-sivu (kadun nimi ehjänä), m-lahi, m-katto.
3. Pont Neuf: p-pn-ylha ja p-et (porras poissa?).
4. Palais Bourbon: pb-etu, pb-piha, pb-lahi.
Jos Unity ei käännä, syy on OhjelmaKohdeRakennukset.cs:n Pb-osa.

## PONT NEUFIN PORRAS (vastattu KK:lle 00.4x)
Vika, ei oikea muoto: e7c639217:ssa yhdysosa alkoi OSM:n rantamuurin kolmiokulmasta (z 22 m, kansi 10,4 m), kansi leveni noin 11,6 m itään. 1af8879d6 poisti sen koodista; ylhäältä otetussa offline-kuvassa jää noin 1,5 m:n siirtymä saaren eteläreunaan, koska varret eivät ole samalla linjalla. Kartalla ei vielä nähty.

## PALAIS BOURBON (c22a5e0bc)
`OhjelmaKohdeRakennukset.cs`, `PalaisBourbon()`, kohde listassa: Lat 48.8615973, Lon 2.3182860, Akseli 64,3 (sama kuin Pont de la Concorden akseli), +x kohti Seineä, +z länteen. 4 511 kolmiota. Jalanjälki OSM relation/1019368, jäsenet lisätty `a/hae-a.mjs`:n `lisaTiet`-joukkoon ja `osm-a.json` haettu uudelleen. Offline-kuva a/oma/palais-bourbon-k45-205.png. Viitekuvat a/viite/Palais Bourbon-0, -2, -4, -5, -6, -piha0, -piha1 (Commons CC BY / CC BY-SA).
OMAT ARVIOT, kerro KK:lle: korkeudet kuvista, ei lähdemittaa (porrastaso 4,5 m, pylväät 15,5 m, harja 29,8 m, siivet 15–18 m). Kapean itäsiiven korkeus 10 m ja tasakatto on arvaus, koska se ei näy kuvissa. Lasikaton puolipyöreä muoto: kaari on Seinen puolella, suuntaa ei tarkistettu. Aiemman kuvan kaltaisia veistoksia ei ole: päätykolmion hahmot ovat matalia laatikoita kuten Madeleinessa.

## SEURAAVAKSI
Ajon jälkeen Pompidou, Tour Saint-Jacques, Saint-Eustache, Saint-Sulpice. Ensin kuvat: `python3 -I a/hae-viite.py listaa <kohde>`, `hae <kohde> <i> ...`. Mitat: luovutus -2340, kohta AINEISTO OSALLE A. Testit ja kuva: `sh aja-geometria.sh`, `python3 esikatsele.py obj <tulos> <nimi> 45 300 1100` (ilman -I, numpy). Suunta: 270 = Seinen puolelta palatsissa, 90 = pihan puolelta.
Pb-apurit (`PbSiipi`, `PbIkkunat`, `PbKattoikkunat`, `PbSivu`) käyvät muillekin kuperista OSM-monikulmioista rakennetuille.

## MUUTA
Seuraamattomat .claude/settings.local.json.ennen-kevennysta ja waveletNoiseTile.bin: en koskenut. Työlistahookin Pariisi-rivit eivät ole Valosepän.
