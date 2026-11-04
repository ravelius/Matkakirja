# Pelikoodari: luovutus 4.11.2026 klo 04.01 – palikkakuvion paikka löytyi, lod-diag ja v14 JU:lla

Edellinen: -20261104-0334 (lisäyksineen, 3e90cb658). Tämä korvaa sen palvelija-, palikka- ja omenaosat; kamera-be56-osa (peitto-be56, pk-be56-laite Pariisin jälkeen) on yhä voimassa sieltä. Syy: pehmeä raja 25 % (7.37). Ei omia taustaketjuja.
Kuvat palvelijoista suoraan KK:lle, PT tiedoksi (KK 03.35). Tiedot: `/Users/Shared/Claude/proto-3d/_tyo/pelikoodari/palvelijat-v12/HUOMIOT.md`.

## JU:n jono (L1, tässä järjestyksessä; rivit tulevat JU:lta)
1. v13 63845cda6, runko cfd520f2e (lätäkön varjo): `palvelijat-v13/vesi`.
2. **lod-diag** runko 2e2dfaf36 (pelikoodari/lod-diag-218, worktree wt/proto-pelikoodari-lod-diag; **EI junaan**): `lod-diag/malja`, rivi "LOD-DIAG AJETTU".
3. **omena** runko 63896ee7a: `omena-mata/vesi`, rivi "OMENA AJETTU".
4. **v14** runko 0c346218c: `palvelijat-v14/malja`, rivi "V14 AJETTU".
Polut: /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/. Haarat: pelikoodari/arkihahmot-218 kärki 2eb260f77 (wt/proto-pelikoodari-arkihahmot), kuvarunko pelikoodari/palvelijat-kuva-218 kärki 0c346218c.

## Palikkakuvio malja2-120 (KK: VIKA pysyy, EI junaan ennen syytä ja korjausta; omistajalle aamulla KK:n kautta)
Todettu: ei v11:stä. Sama kohta v10, v11, v12: kamera (65,55, 2,67, −132,8), noin 0,4 s, myös tallenteessa (v12 ruudut 5756–5774). Rasteri 4 px:n välein. Koodi: JuoksuHaivytys.hlsl (4 × 4 Bayer), PaivitaPalatsi LOD-vaihto, LodSiirtymaS 0,4.
Päätelty, ei ajolla todistettu: palatsin osan LOD-vaihdon rasterihäivytys.
Auki: (1) mikä osa, (2) miksi muuri tummuu (5755 vaalea, 5776 tumma ilman rasteria; epäily LOD1:ltä puuttuva leivottu valo, ei mitattu), (3) 32 × 32 px:n ruudut kuvaruudun ruudukossa: 4 × 4 ei selitä, (4) miksi kuvio lattialla Puyin ympärillä, kun raja on 140–160 m lähimmästä pisteestä.
**Kun LOD-DIAG AJETTU:** `grep -a LODDIAG` huom-*.txt:stä (tai lokit/esikatselu-*/unity.log); rivi kertoo t, osan, lod a->b, d, kameran, rajat ja 6 isointa piirtäjää (leivottu-merkintä). Etsi vaihto, jonka kamera on z noin −133. Sitten syy, korjausehdotus, rivi KK:lle (PT tiedoksi). Korjaussuuntia ei ole vielä kokeiltu; älä lupaa.
Mittaustyökalu: scratchpad katoaa; malli: naapuripikselien toinen derivaatta tallennekuvista (mediaani noin 4,4; jakso > 1,8 × mediaani), kamerapaikka palvelijat/kamera.txt.

## TF 217 (KK kysyi; vastattu 04.0x)
Todettu koodista (60bd5c356): sama rasteri, rajat 150/450, kesto 0,4; PaivitaPalatsi eroaa vain kuvakamerarivillä. Palikkakuviota ei todettu 217:ssä (tausta v94 vs v115). Tallenne 31d8e3ea6 ei näytä vastaavaa jaksoa, mutta kamerapolkua ei ole, joten ei todista. Ei laiteajoa. Kun LODDIAG-tulos on, kerro KK:lle, muuttaako se tätä.

## Sirpaleet (KK: KUVIO v12 HYVÄKSYTTY; sini ehjän maljakon sävyyn ilman uutta hyväksyntää, jos kuvio ei muutu; ENNEN JUNAA välkkyminen tallenteesta ja tulos KK:lle)
v14 2eb260f77: `_Kuvio` 6/48/130, vahvuus 0,9 + 0,1 sin, `_Siirto` kiinteä palaa kohden (kuvio liukui lennon aikana, kun se laskettiin palan paikasta; v12 ruudut 5719–5726). Varjostinkääntö ei todistettu.
**Kun V14 AJETTU:** (1) sini: mittaa palat vs ehjä 3/56/156 (malja2-005, rajaus 1760,690–1890,810; palat malja2-060 2050,1400–2450,1650; malja1-090 2150,1650–2752,1950); v12 palat 32/77/163 ja 33/73/175. (2) kuvio ei saa muuttua; siirto vaihtaa palojen kohtaa kuviossa, vertaa lähikuvaan v12. (3) välkkyminen: peräkkäiset tallennekuvat iskun ympäriltä, palaa seuraten (v12:ssa isku 5719; ruutunumero vaihtelee). Jos kuvio muuttui: uusi hyväksyntä KK:lta. Tulos KK:lle.

## v13 (kun ajettu)
Kuten -0334 lisäys 03.37: vesi-160 sama rajaus kuin lahikuva-lammikko-vesi-160; varjo jatkuu reunan yli; valossa väri noin 150/185/225; säädä 0,65; jos huononee, 63845cda6 pois (ei ehto). v14 ja omena on rakennettu sen päälle: poisto vaatii uuden rungon.

## Mätä omena (KK 03.39)
7cfac9ee6: muoto omena-herkullinen, pinta × 0,46/0,36/0,20, hehku 0,62/0,60/0,32, kommentti korjattu; koko 0,22. Ei ajettu.
**Kun OMENA AJETTU:** vesi-090 (omena 1,8 m:ssä) täysikokoinen rajaus: näyttääkö omenalta, onko mätä, hehku hillitty; lokista "kerättävä omena-herkullinen paikalleen" kahdesti. Tarkista, ettei herkkuomena tummunut (materiaalit syntyvät latauskohtaisesti koodin mukaan). Kuva KK:lle, PT tiedoksi. Jos ei omenan näköinen: Codex-tilaus postilaatikko-haaraan. Ei kärpäsparvea.

## Muut ennallaan
Palvelijatar v2: edestä ja takaa KK:lle ennen kytkentää, kun Pariisi on päästänyt ajovuoron. Kengän yläreuna listalla. be56 ks. -0334.
z −526,8 ja −190,4: oviaukossa taivas katon paikalla ja violetit sivut tässä rungossa; todennäköisesti be56:n taivaskorjaus, ei tarkistettu be56-rungosta (tarkista peitto-be56:n yhteydessä).

Tila: odottaa JU:ta.

## Lisäys 04.38 (korvaa ristiriidassa olevat kohdat)
- **v13 HYVÄKSYTTY** (KK; pysäytyskuva), ei säätöä tummuuteen.
- **Sirpaleet v14 2eb260f77** katsottu, kuvat ja tulos KK:lla (`palvelijat-v14/`, HUOMIOT.md siellä); KK:n tuomio odottaa, koska palojen kohta kuviossa vaihtui. Välkkymistä ei näy 20 peräkkäisessä kuvassa, videona ei katsottu.
- **Mätä omena: KK hylkäsi pinnan.** Codex-tilaus postilaatikko-haarassa 6d549e0b8 (`omena-mata-v2.glb`, uusi nimi). Koodi pois junahaarasta: arkihahmot-218 kärki **d70494795**; työ haarassa **pelikoodari/mata-omena-218** (7cfac9ee6). Kun Codex toimittaa: kytke uusi tiedosto, ota tummennus (MataPinta) pois, katso hehku (KK: erotuttava kivellä, hillitysti, ei kultana), kuva KK:lle, PT tiedoksi. Jos juna lähtee ennen, vanha malli pysyy.
- **Palikkakuvio:** lod-diag ajettu, tulos `palvelijat-v12/HUOMIOT.md` lopussa, KK ja PT tietävät. kk-tausta-1-0 lod 1->0 kohdassa z −133,24, d keskipisteeseen, kamera lohkon sisällä. 217:ssä sama ehto (todettu), v94:n lohkojako avaamatta.
- **Korjausehdokas cb8b1f06c** (haara pelikoodari/lod-diag-218; kärki a368fdf29 sisältää diagnostiikan, ei junaan sellaisenaan): LOD-KORJAUS ajossa L1:llä, `lod-korjaus/malja`, JU:n rivi "LOD-KORJAUS AJETTU". **Kun ajettu:** (1) malja2-120 ja tallenteen z −133…−130: onko kuvio poissa (rakeisuusmitta, ks. yllä; v14:n malja2-120 näyttää kuvion yhä); (2) `grep -a "LODDIAG tausta-lod0"`: yhtäaikaisten kk-taustan LOD0-lohkojen enimmäismäärä; vertailuluku pitää laskea lod-diag-lokista 81 vaihdosta; (3) mihin kohtiin vaihto siirtyi ja näkyykö rasteri kaukana; (4) tulos KK:lle, PT tiedoksi. Junaan vasta iPadin muistimittauksen ja PT:n kuittauksen jälkeen; iPad-vuoro odottaa Pariisin uusintaa. Ota junaan vain cb8b1f06c, ei diagnostiikkaa. 32 px:n ruudut yhä ilman selitystä; LOD1:n valoa ei ole tarkistettu.
- **JU kertoi:** iPad-sarja (pk-be56-laite) odottaa PT:n lupaa, Pariisi uusitaan.

## Lisäys 04.4x (nollaus): KK v14
**Sirpaleet v14 HYVÄKSYTTY** (KK; siirron muuttama kohta ok). **Ennen junaa KK vaatii:** sama kohta videona vauhdissa ja juoksuetäisyydeltä; jos välkkyy tai kuvio katoaa, kuva KK:lle. Tehty vasta alku: leike `palvelijat-v14/sirpaleet-v14-malja2-50fps.mp4` (ruudut 5660–5749); kukaan ei ole katsonut sitä, ja sinisten pikselien mittaus ei kerro tästä mitään (liian tiukka rajaus). Malja1:n isku on noin ruudun 4500–4750 välissä (kuva malja1-005), juoksuetäisyyden kohta katsomatta. Tulos KK:lle, PT tiedoksi.
