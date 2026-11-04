# Pelikoodari: luovutus 4.11.2026 klo 04.05 – palikkakuvion paikka löytyi, lod-diag ja v14 JU:lla

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
