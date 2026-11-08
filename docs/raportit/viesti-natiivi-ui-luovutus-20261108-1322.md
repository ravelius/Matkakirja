# Natiivi-UI: luovutus 8.11.2026 klo 13.22 (napautus korjattu skenaariossa, kartta-lukittu-2 ja lippu katsottu; kolme JU-ajoa jonossa)

Korvaa luovutuksen -1235 (sama haara, ks. sen PÄIVITYKSET 12.4x–13.20): `git show fbe4e7964:docs/raportit/viesti-natiivi-ui-luovutus-20261108-1235.md`.
Siinä yhä voimassa: EHDOTUS KORTILLE -luonnos, AUKI KIINTEÄSSÄ LADONNASSA -lista, Työkalut, Opit; -1120:n ☰-valikkoselvitys (PÄIVITYS 11.4x).
PT local_5df52e10-10e4-4b72-9554-0049db300dfe, JU local_06f8c680-4618-42bd-a730-9b6a3e17e0b7, Postivahti local_afae44f0-722b-4541-a3b8-30ca4f76543b.
Proto-työkopio /Users/Shared/Claude/wt/proto-natiivi-ui-lahto-vahvistus, nyt haaralla natiivi-ui/topoesittelyt-221 (puhdas, natiivi-backup).
Vertailutyökalut: proto-3d/_tyo/natiivi-ui/kartta-lukittu/{siirto,ero,pari}.py (aja zsh:ssä yksi pari per komento, ei "set --").

## JONO (JU:n iPad-järjestys: napautus-2 → kartta-lukittu-3)
0. ENSIN (PT 13.2x, suositus KK:lle odottaa vastausta): KIINTEÄ LADONTA, NÄHTÄVYYDET ENSIN. Valmistele samaan haaraan
   natiivi-ui/kartta-lukittu-222 (17addbe2d:n päälle): nähtävyydet ja 3D-kohteet (Musée de l'Armée, Palais Bourbon, Petit Palais, Musée Rodin,
   Saint-Étienne-du-Mont) tärkeysjärjestyksessä ensin, pudotus vain pienemmiltä. Mallin oma nimi ei saa törmätä omaan malliinsa
   (Nahtavyysalue.KiinteatEsteet → ohita nimen oma malli tai nimetyt mallit nimiesteinä; KiinteaLadonta.Vertaa: Porras/Arvo → merkittävä
   nähtävyys ensin). Testit Kartta-testit/Testit/KiinteaLadontaTestit.cs + unity 0, todisteajo (sk-kartta-lukittu-2 uudella SHA:lla)
   → pari vanha/uusi PT:lle. EI JUNAAN ennen KK:n/omistajan sanaa. 5°-portaiden mittaus = jono 2 (kartta-lukittu-3 jo JU:lla).
1. NÄHTÄVYYSNAPAUTUS-2 c33b2ebd1 (natiivi-ui/nahtavyyden-napautus-222): sk-nahtavyysnapautus-2.txt (Concorden aukio 1,8 km, kyltit auki)
   → lokit/nui-nahtavyysnapautus-2-c33b2ebd1. Ajo 1 kelvoton: 4 km:stä kyltit kiinni (aukeavat kaari ≤ 0,02) → pallolle.
   KATSO 8 kuvaa (ennen, lento, keskitetty, kierto puoliväli, kierto myöhemmin, palkista auki, suljettu, sormi) + ui-loki
   ("ui lukija: aloita pala", "ui nähtävyysesittely:"-rivi). Jos ohi: rivi "merkki: …" kertoo syyn. → kuvasarja PT:lle → KK. Ei koeversioon ilman omistajaa.
   AVOIN PT:lle kuvien kanssa: 3D-mallin kyltti (Notre-Dame, Louvre) ei esittele (oma suunnitelma 11.53) — viedäänkö sekin esittelyyn?
2. KARTTA-LUKITTU-3 17addbe2d (5°-PORTAAT, PT 12.5x): sk-kartta-lukittu-3.txt, suunnat 0/2/3/7/12/0, kallistus 45 → lokit/nui-kartta-lukittu-3-17addbe2d.
   Porras = Math.Round(suunta/5): 0≈2 ja 3≈7 samat (ladontoja ei kasva, sama nimijoukko), 3 ja 12 uusia. KATSO: mitkä nimet sammuvat/syttyvät
   portaan vaihtuessa (ero.py samasta suunnasta ei käy: kuva kiertyy → vertaa silmällä/rajauksin), s0 vs s0-paluu md5/ero.
   Jos hyppii häiritsevästi: ehdota PT:lle porras 15° tai ladonta kaikkien suuntien yli (pariton pois, jos osuu jossain suunnassa).
3. KARTTA-LUKITTU-2 KATSOTTU 13.20 (tulos proto-3d/_tyo/natiivi-ui/kartta-lukittu-2/tulos-kartta-lukittu-2.md, 4 paria PT:lle → KK).
   Lukitus toimii. Odottaa PT/KK: harvennus (Musée de l'Armée putoaa oman mallinsa takia, Palais Bourbon, Petit Palais, Musée Rodin…).
   Mahdollinen korjaus sanalla: mallin oma nimi ei törmää omaan malliinsa (Nahtavyysalue.KiinteatEsteet ottaa kaikki nimetyt mallit; vanha
   ladonta ohitti OnKyltti-nimet). Kunnialegioonan museo: oma paikka ~85 pt rakennuksen oikealla.
4. TOPOESITTELYT (natiivi-ui/topoesittelyt-221 = 877f5d72d: kyltit SK:n mukaan dc3e11279 + NS:n Himalaja etelästä 877f5d72d).
   Mac-video JU:lta VASTA kun KS:n ruutukuvat ovat haarassa JA NS ilmoittaa tallenteen kellovian korjatuksi; sk-topoesittely-1-mac.txt
   (tallenne alkaa ruudukosta). Sitten katso → video PT:lle → KK.
5. LIPPU 4.42 1f26c51b4 KATSOTTU (kuvat _tyo/natiivi-ui/lippu-442-2/ PT:lle → KK); junaan PT:n sanalla.
6. ☰-valikkoselvitys (luovutus -1120 PÄIVITYS 11.4x AUKI).

## Opit (uudet)
- ui.fi.json-luvuissa sitova välilyönti (U+00A0): sed ei osu → muokkaa Pythonilla.
- Kallistetun kameran pieni panorointi: pikseliero ei kelpaa (perspektiivi), vertaa samaa karttarajausta silmällä (pari-pieni-panorointi).
- md5-ero samassa paikassa voi tulla lentävästä linnusta ja puiden pisteistä: ero.py:n ruudut kertovat.

## PÄIVITYS 13.26: NAPAUTUS-2 c33b2ebd1 (lokit/nui-nahtavyysnapautus-2-c33b2ebd1, 8/8) — EI OSUNUT, KUVIA EI KATSOTTU
- ui-loki 456/474: "napauta (575.5, 382.8): ei osumaa UI:ssa → pallolle | merkki: Concorden aukio: näyttö Flex, peitto 1,00, portti True,
  kyltti True, kylki oikea, näkyy True, törmää False …" → merkki ja nimiö näkyvät ja ovat napautettavissa, silti Pick ei osu.
- EPÄILY: UiKomennot.Napauta käy vain UiKerros.Hae().Juuret läpi; NostotKartalla-merkit (juuri/panel) eivät ehkä ole niissä → testinapautus ei
  voi koskaan osua merkkiin. Tarkista: onko NostotKartalla.juuri jonkin UiKerros-juuren alla (grep "Juuret" / mihin juuri lisätään).
- KORJAUS (pieni): `ui kohdenostot napauta` → NostotKartalla.NapautaKohde(nimi): hae merkki kuten KohdePiste ja kutsu Napautus(m) (sama kuin
  ClickEvent-käsittelijä), TAI Pick myös nostojen paneelista. Sitten uusinta JU:lla (sk-nahtavyysnapautus-2.txt uudella SHA:lla).
  Huom: oikea sormi menee eri reittiä (UI Toolkitin oma poiminta), joten tämä on testityökalun vika, ei pelaajan.

## PÄIVITYS 13.27: KK 13.25 (PT:n välitys) — JONO 0 "NÄHTÄVYYDET ENSIN" TEHDÄÄN ILMAN KORTTIA
- Lisäehto: 3D-mallin oma nimi EI SAA kadota oman mallinsa alle; sen kiinteä paikka on mallin vieressä (Musée de l'Armée / Invalides).
  → oma malli ei ole oman nimen este, ja nimen paikka (kylki) valitaan mallin ääriviivan ulkopuolelta (kiinteästi, ei väistönä ruudulla).
- Todiste: uusi pari SAMALLA rajauksella kuin _tyo/natiivi-ui/kartta-lukittu-2/lahi-invalides-vanha-vasen-kiintea-oikea.jpg
  (crop täysresoluutiosta (150,500,1000,1150), P = aja 48.856 2.335 0.03, kallista 45, suunta 0) + koko Pariisin näkymä → PT → KK.
  Ei junaan ennen KK:n/omistajan sanaa.

## PÄIVITYS 13.28: PT — MERENPOHJA (jono: nähtävyydet ensin → MERENPOHJA → napautus-2-korjaus → kartta-lukittu-3)
- Koko maailma ämpärissä + CDN tarkistettu (KS: julisteet/maasto/2026-11-08-kohokartta-merenpohja/, 699 051/699 051, 0 vikaa).
- Tee: vaihda KohokarttaMaastoOletus 7ea8d6ebc:ssä (natiivi-ui/merenpohja-koe) osoitteeseen
  https://media.matkakirja.app/julisteet/maasto/2026-11-08-kohokartta-merenpohja/ (layer.json), unity 0, push natiivi-backup.
- Sitten merenpohjan parit 1–5 (Himalaja, Kuollutmeri, Alankomaat, Kaspia + tallenne) JU:lla → katso → PT.
  Skenaariot ja parien kuvaus: luovutus -1025 (`git show 171cbc6fb:docs/raportit/viesti-natiivi-ui-luovutus-20261108-1025.md`, kohta 3 merenpohja).

## PÄIVITYS 13.30: TOPOESITTELYT — NS 79f8a637b yhdistetty, VIDEO JU:lla
- natiivi-ui/topoesittelyt-221 = 79f8a637b (ff; NS: Himalaja etelästä 877f5d72d, kierto hiipuu KohdeKiertoHiivu, tallenteen kello = kameran kello).
- sk-topoesittely-1-mac.txt: lopussa odota-peli 14 (Himalajan kierto loppuun). JU pyydetty → lokit/nui-topoesittely-2-79f8a637b/mac.
  KATSO video: kyltit SK:n mukaan, Himalaja muurina etelästä, kierrot loppuun ilman pysähdystä/hyppyä (NS: kerro jos Alppien kierto pysähtyy
  kesken tai Himalajan jatko hyppää; unity.log topokierto-rivit: kellot linssi/peli/unscaled/seinä). Sitten video PT:lle → KK
  (KS:n ruutukuvat puuttuvat yhä, mainitse).
- NS:n vihje napautushaaraan (natiivi-ui/nahtavyyden-napautus-222): NahtavyysEsittely.Hiivuta = k => k.KohdeKiertoHiivu() (vaatii NS:n
  PalloKierto-muutoksen 79f8a637b → yhdistä ensin); oletuksen k.Aja(...0.05) pysäytys on liian jyrkkä.
