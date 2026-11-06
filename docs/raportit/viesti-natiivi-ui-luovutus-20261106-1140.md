# Natiivi-UI: luovutus 6.11.2026 klo 11.40 (pehmeä kontekstiraja, 7.37)

Täydentää -1002:ta (tausta). Lukulista 7.47: lue itse.

## Tila
Worktree /Users/Shared/Claude/wt/proto-natiivi-ui-vesinimi, haara natiivi-ui/alapiste-juna-219, kärki fcce6131f, peili natiivi-backup.
Merge-pyyntö JU:lla (jonossa 11.3x), junarivi lisätty juna.py:llä. Kartta-testit 606/606, unity-tarkistus 0 virhettä (b8).
Junaan vain alapiste + GeodeettinenLeveys + testi. alapiste-219 (1b6525afe) EI yhdisty: 246 committia ja "ei junaan" -kokeita; lokirivit eivät käänny rungossa (usvafunktiot puuttuvat). Hintakyltti 37907cb54 ja lokirivit jäävät Pariisin haaraan. PT:lle kerrottu.
Auki PT:n päätöksellä: iPadin karsinnan kesto ja uudelleenpyynnöt laitemittauksessa ennen seuraavaa TF:ää. Kestoloki toimii vain batchissa ja editorissa, joten mittaus vaatii oman version.
Katujärjestys reitin mukaan: ei korjausta ilman omistajan havaintoa (PT).

## UI-sarja (PT 11.3x): selvitetty ilman ajoa
Lokit: lokit/natiiviseppa-unity-b7-7bbf04e09 ja -b8-addae63f2/testit-UI.txt, lokit/kaannospalvelu/20261106-*-testit-*. Ajat lämpörivien kellosta (scratchpad, ei tallessa: laske "aika"-kentästä ja "ASETTELUTESTI ==" -otsikoista).

### Aikaraja: ei jumi, testi on kasvanut yhdelle varaukselle liian suureksi
Kaikki neljä ajoa etenivät, kun raja katkaisi ne. Näkymärivejä 60 (14.10., 3fc4fa29b) → 86. Hidastumista näkymää kohden ei voi sulkea pois: vanhoja lokeja ei ole.

| Ajo | Laitetta kohden | Tarvitsee nyt yhdessä varauksessa | Katkesi |
|---|---|---|---|
| pallo, 4 kokoa | noin 150 s | noin 10,3 min | iPad pysty kesken |
| linna, 4 kokoa | noin 91 s | noin 6,4 min | iPad vaaka kesken |
| pallo-keskitys, iPad (2) | noin 178 s | noin 6,3 min | iPad vaaka 110/119 |
| linna-keskitys, 4 kokoa | noin 103 s | noin 7,2 min | iPad vaaka kesken |

Suositus: raja pysyy 6 minuutissa. Jaetaan varaukset kuten pallo-keskitys 14.10.: pallo ja linna kahtena (iphone, ipad), pallo-keskitys iPad kahtena (pysty, vaaka), linna-keskitys kahtena. Jokainen mahtuu arviolta noin 2–5,5 minuuttiin. Tiedosto tyokalut/ui-asettelutesti.sh rivit 39–42; varaus lisää noin 20 s käynnistystä.
Lisäksi kaksi aarretehtävän VIKAA odottavat 20 s kumpikin (AsetteluTesti.cs: Kulunut < 20): 40 s laitetta kohden. Pelkkä niiden korjaus ei riitä pallolle (noin 7,7 min).

### 8 VIKAA
- AITO EI, VANHA ODOTUS: "kierroksen kuvat: metrolinjan selite ei näy". Selite poistettu omistajan päätöksillä 16.10. ja 18.10. (OpasMetrolinja.cs:132). Tarkistus pois testistä (AsetteluTesti.cs noin rivi 1169).
- AITO (mittaus, alle 1 pt): KESKITYS "Kysy Pululta" +0,5, "Päivä ✓" +0,8, "Ohita" +0,7; sääntö ≤ 0,5 pt on omistajan (13.10.). Rajaa ei löysätä. Korjaus näkymäkohtaisesti, tarkistus vaatii ajon.
- AITO (b7 pysty, 1 rivi): Kysy-paneelin peitto 46 % > 45 % (4.4). b8:n pystyajo kaatui exit 138:aan (Burst), joten b8:lta ei tulosta.
- EI SELVINNYT KOODISTA: metrolinjan kosketusala ja päällekkäisyys vasemman tapin kanssa. Testi vertaa sisältölaatikkoon (SisallonLaatikko), kosketusala on juuri ± 10 pt; vaakana laatikko menee 12 pt tapin päälle, kosketusala jää 10 pt lyhyemmäksi. Metrolinjan moottori muuttui 31.10. Ratkaisee kuva: pallo, iPhone vaaka (alin asema vs tappi).
- EI SELVINNYT KOODISTA: aarretehtävä aikajana ja katso "ei avautunut". Kortti aukeaa lokin mukaan ("auki ateena:aikajana", "auki ateena:katso"), poikkeusta ei ole, mutta testi ei näe uusia elementtejä 20 s:ssa. Pariisi:arvio ja tukholma:salakirjoitus toimivat. Molemmat ateena: ainoa yhteinen tekijä, jonka näin; syytä en löytänyt. Hylätty: piilotuksen kilpailutilanne (NaytaHeti kumoaa). Seuraavaksi: testiin lokirivi kerroksen ja kortin tilasta (display, opacity, worldBound) ja yhteiseen ajoon.

## SEURAAVAKSI
1. Odota PT:n vastausta tähän raporttiin. Korjaus omaan haaraan rungon päälle (ei alapiste-juna-haaraan, se on JU:lla), ajo JU:n vuorolla, ei omaa ajoa.
2. Korjausjärjestys: varausten jako, selitetarkistus pois, aarretehtävän lokirivi, sitten kuvasta metrolinja ja tappi, sitten keskitys ja Kysy 46 %.

## Yhä avoinna (-0915, -1002)
Tuileries'n kuva Louvren kulmassa; kyltti RANSKA-otsikon ja Liiku-napin alla; aaripisteet 38 × kärkimäärä; Metroasema haalea sc-80:ssä; mittarin viat ei nyt; yksinäisten pyöreiden kuvien kohteita ei tarkistettu datasta.

## LISÄYS 11.4x: JU ja PT:n sana (korvaa SEURAAVAKSI-kohdan)
JU: junarunko on fcce6131f (pikakelaus); JU ei ajanut testejä; tyylikirja-ero on JU:lla. Junarivi Valmiina.
PT kuittasi selvityksen:
- Raja pysyy 6 minuutissa, varaukset jaetaan.
- Selite: poistetun odotuksen testi pois, viittaus omistajan päätökseen 16.10. ja 18.10.
- Keskitys 3 kpl ja Kysy 46 %: korjaa koodi, jos se on pieni. Jos ero on näkymätön, perustele toleranssi rivillä; ei yleistä väljennystä.
- Metrolinja ja tappi sekä aarretehtävä aikajana ja katso: kuva ja lokirivi samassa UI-ajossa kuin korjaukset. Ei erillistä ajoa.
- Kaikki omaan haaraan fcce6131f:n päälle. Ajo JU:n vuorolla pystytoiston jälkeen.
