# Palatsin sisätilat – suunnitelma PT:lle (Lavastaja 1.11.2026)

Pohja: PT 1.11. 23.2x (omistaja 30.10. 19.12: "sisätilat tarvitsevat varmasti myös rakentamista", piirrokset ensin);
Raamattu 2.177: taso 2 = ulkokujat + huoneet ja salit, katto poistuu kun keisari menee sisään, kamera aina ylhäällä
keisarin takana → sisätila nähdään YLHÄÄLTÄ VINOSTI: lattia, kalusteet ja seinien sisäpinnat näkyvät, sisäkatto ei koskaan.
Ei mallinnusta ennen PT:n kuittausta.

## 1. Mitkä sisätilat (reitin kannalta)

Nykyiset 21 "avointa huonetta" (avoimet-sijoitus.json: juhlasali, työhuone, puutarha, varasto kopioina) ovat
yleispaloja, eivät todellisia tiloja. Ne sijaitsevat juuri kahdella kujalla, joiden varrella ovat todelliset
Kuusi läntistä ja Kuusi itäistä palatsia (pohja.json asuinpihat 1 ja 2):

- Länsi, kuja x ≈ −137 (西二长街): itäpuolella 永寿宫, 翊坤宫 (+体和殿), 储秀宫; länsipuolella 太极殿 (+体元殿), 长春宫, 咸福宫.
- Itä, kuja-338 x ≈ 106 (东二长街): länsipuolella 景仁宫, 承乾宫, 钟粹宫; itäpuolella 延禧宫, 永和宫, 景阳宫.

Ehdotus kolmessa vaiheessa (yksi valmis kerrallaan, Raamattu "vain valmiit palat"):

| Vaihe | Tila | Miksi | OSM-pohja (akselin suunt., L × S) |
|---|---|---|---|
| 1a | 养心殿 Mielen ravitsemisen halli (etuhalli + itä- ja länsilämpökamari) | Puyin oma asunto 1911–1924, tarinan ydin; kujaverkon solmussa (−119, 273) | 36,0 × 15,6 m (way/40606461) |
| 1b | 储秀宫 päähalli (läntinen kuja) | Wanrongin (keisarinna) asunto Puyin aikana; tunnistettava | 26,8 × 13,2 m (way/40631826) |
| 2 | Muut 11 kuuden palatsin päähallia samalla pohjalla (5 jännettä × 3) | Korvaavat 21 yleishuonetta todellisilla; kaikki ~26–28 × 13–15 m → yksi muunneltava sisätila + palatsikohtaiset tunnusosat (nimilaatta, kalusteet, 长春宫:n käytävämaalaukset) | ks. liite |
| 3 | Keskiakselin salit: 太和殿 (valtaistuinsali), 乾清宫, 交泰殿, 坤宁宫 | Tunnetuimmat sisätilat; isoja (太和殿 OSM 68 × 41 m) → oma erä | OSM pohja.json |

Vaiheen 2 hallit ovat Qing-ajan vakiotyyppiä (5 jännettä, keskijänne leveämpi), joten piirrostilaus tehdään
kerran tyyppinä + palatsikohtaiset erot listana. 咸福宫 (20,3 × 14,8) ja 延禧宫 (16,2 × 11,3; nykyään keskeneräinen
länsimainen 灵沼轩-rakennus) poikkeavat: 延禧宫 pois tai erikseen (PT:n päätös).

## 2. Mittalähteet (jokaiselle mitalle lähde, [A] = arvio)

1. Ulkomitat ja paikka: OSM-rakennuspohjat (pohja.json, ODbL, vain mittoina) – jo pelin kehyksessä.
2. Jännejako ja pylväsverkko: Palatsimuseon (dpm.org.cn) rakennuskuvaukset (jänteiden määrä, jänneleveydet kun
   mainittu); Qing-ajan 工程做法 (1734) vakiomoduulit [A] kun jänneleveyttä ei löydy.
3. Sisustus (valtaistuin, nimilaatat, väliseinät, lämpökamarit, 罩-puuseinät): Palatsimuseon sisätilakuvaukset ja
   Commonsin PD/CC-valokuvat (Sisältökirjuri tarkistaa lisenssit); kuvista mitat suhteessa tunnettuun jänteeseen.
4. Korkeudet: OSM korkeus_m (osin 3,0 = puuttuva → [A] valokuvista).
5. Tarkistus ennen 3D:tä (Raamattu 2.177 TEKIJÄN OMA TARKISTUS): [A]-mitat kuvista, lähde ja laskelma LUE.md:hen.

## 3. Luonnos Codexin piirrostilaukseksi (PK tai PT lähettää postilla)

Tilaa: mittatarkat viivapiirrokset metriruudukolle havainnekuvien väreillä (kuten 30.10. julkisivupiirrokset).
Per tila:

1. POHJA ylhäältä 1:100, metriruudukko 1 m: ulkoseinät OSM-mitoin, pylväsverkko ja jänneleveydet, väliseinät ja
   puuseinät (罩), ovet (myös kujalle avautuva ovi, josta keisari juoksee sisään), ikkunaristikot, kynnykset,
   lattiamateriaali (金砖-tiililaatat ruudukkona), kalusteet (valtaistuin/korokkeet, pöydät, kaapit, kang-penkki,
   maljakot) omina tunnistettavina muotoina. Tärkein piirros: pelissä tila nähdään ylhäältä.
2. SEINÄKUVAT sisältä neljään suuntaan (P, E, I, L) lattiasta palkin alapintaan: ovet, ikkunaristikot, pylväät,
   nimilaatta, seinämaalaukset/kirjoituskääröt, kalusteiden profiilit. Ei sisäkattoa (ei näy pelissä).
3. Mittataulukko: jokainen mitta + lähde tai [A].
4. Värit: havainnekuvien sävyt (punaiset pylväät, kultakoristeet, tumma lattia), ei uusia värejä ilman PT:tä.

Vaihe 1 tilaus: 养心殿 + 储秀宫 (2 tilaa × pohja + 4 seinäkuvaa). Vaihe 2: tyyppihalli + erolista.

## 4. Pelin puolen huomiot (PK:lle tiedoksi)

- Sisätila korvaa avoimen huoneen samassa paikassa (avoimet-sijoitus.json-kehys, ovet kujan puolelle) →
  PK:n reittidata ja törmäys pysyvät rakenteeltaan samoina.
- Valo: sisätilat leivotaan samalla v4-auringolla (ikkunat, ovet) + oma sisävalo; ulkovaloa ei uusita (omistaja 30.10.).
- Katto: rakennuksen katto omaksi solmuksi (katto poistuu sisään mentäessä, Raamattu 2.177).

## Liite: kuuden palatsin päähallit (OSM, akselin suunnassa)

Länsi: 永寿宫 26,8 × 13,2 · 翊坤宫 26,8 × 13,2 · 体和殿 25,7 × 12,5 · 储秀宫 26,8 × 13,2 · 太极殿 26,8 × 13,2 · 体元殿 26,0 × 11,6 ·
长春宫 26,8 × 13,2 · 咸福宫 20,3 × 14,8. Itä: 景仁宫 27,7 × 13,2 · 承乾宫 27,5 × 14,0 · 钟粹宫 28,3 × 14,7 · 永和宫 27,6 × 20,0 ·
景阳宫 20,5 × 14,1 · 延禧宫 16,2 × 11,3. 养心殿 36,0 × 15,6.
