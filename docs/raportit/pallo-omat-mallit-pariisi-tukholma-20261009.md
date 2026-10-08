# Pallo: omat 3D-mallit Pariisin ja Tukholman heikoimpiin kohteisiin (Linssiseppä 2, 9.10.2026)

Tilaaja: Päätoimittaja 9.10. 00.55 (omistajan kysymys "mutta miten se 3d kohteiden parantaminen?"). Pohja: LS1:n
pallo-elava-kaupunki-20261008.md kohdat A4 ja C3 (Googlen laattojen leikkaus ja oma malli sallittu ehdoin, kuten Gizan pyramidit).

## 1. Kartoitus

Kuvattu junan 168 simukäännöksellä (6a67a9b1, iPad 13", päivä klo 13, selkeä) kiinteällä kameralla jokaisen pallokierroksen
kohteen yllä (opas-kierrokset-20261008.json, 8 + 8 kohdetta), 400–1200 m:n etäisyydeltä, kallistus 68°, odotus 35 s
(laatat tarkentuneet). Kuvat: `proto-3d/lokit/linssiseppa2-kohteet-0100/` (`<kaupunki>-<kohde>-0.png`, arkit ja rajaukset).

| Sija | Kohde | Havainto Googlen datassa | Syy | Korjaus omalla mallilla |
|---|---|---|---|---|
| 1 | Notre-Dame (Pariisi) | Telineissä, kaksi nosturia, ei kattoratsastajaa (fléche), kattoa ei ole | **Vanhentunut** (kuvattu ennen 12/2024 valmistumista) | Kyllä, suurin vaikutus |
| 2 | Riddarholmenin kirkko (Tukholma) | Valurautainen pitsihuippu on umpinainen musta möhkäle; laivan sivulla valkoinen peitelaatikko | **Ristikko sulaa** + osin vanhentunut | Kyllä, halvin (valmis malli) |
| 3 | Kuninkaanlinna (Tukholma) | Itäsiivessä valkoinen laatikkomainen remonttipeite | **Vanhentunut** | Kyllä, mutta iso käsityö |
| 4 | Concorden aukio (Pariisi) | Olympialaisten 2024 katsomot ja rakennelmat aukiolla | **Vanhentunut** | Ehkä: oma maapinta + obeliski + suihkulähteet (ei rakennus) |
| 5 | Eiffel-torni (Pariisi) | 700 m:stä ristikko hyvä (Googlella poikkeuksellisen hyvä malli); lähietäisyys tarkistamatta | – | Myöhemmin, jos lähikuva sulaa |
| 6 | Gamla stan / Slussen (Tukholma) | Slussenin työmaa nostureineen | Todellinen tila (työmaa yhä kesken) | Ei |
| 7 | Louvre (Pariisi) | Pyramidi heikosti erottuva; muuten hyvä | – | **Ei**: Pein pyramidilla voimassa tekijänoikeus |
| 8 | Vasa-museo (Tukholma) | Mastot erottuvat (punaiset), hieman pehmeät | – | Matala prioriteetti |

Hyvät (ei toimenpiteitä): Riemukaari, Orsay, Sacré-Cœur, Champs-Élysées, kaupungintalo, Drottningholm, Skansen,
Skogskyrkogården. Huom: tummat "sulaneet" läiskät Tuileries'n ja Madeleinen kohdalla ovat vielä lataamattomia laattoja (TF 168:n
käännös kuormitti konetta), eivät datavikoja.

## 2. Mallilähteet (Sonnet-agentin verkkohaku 9.10., liite `mallilahteet-liite.md` samassa lokikansiossa)

EHTO: malli ei saa olla johdettu Googlen laatoista. Sketchfabissa moni maamerkki on Google Earth -kaappaus (kuvauksessa "Google
Earth/Maps", pyöreä maapala, kadunnimiä tekstuurissa); ne on suljettu pois nimeltä liitteessä. Myös "editorial use only" (TurboSquid)
ja CC BY-NC -mallit eivät kelpaa peliin.

| Kohde | Paras vaihtoehto | Lisenssi / hinta | Kolmiot, tekstuurit | Työ mobiilivalmiiksi |
|---|---|---|---|---|
| Notre-Dame | Zhang Shangbin (Fab/Sketchfab) | kaupallinen, ~20 USD | 58 k, 4 mat., 2k | 1–2 pv: lyijykatto ja torni, LOD:t |
| | vara: arquitectotecnico (Sketchfab) | CC BY, ilmainen | 47 k | + maapinta pois, alkuperä tarkistettava |
| Riddarholmenin kirkko | norlinmartin (Sketchfab Store) | kaupallinen, ~15 USD | 4,5 k, 5 tekstuuria | 0,5 pv: kärjen ja kellotornin detalji 20–50 k |
| Kuninkaanlinna | ei valmista | – | – | 3–5 pv LR:n käsimallinnus (Lantmäteriet-jalanjälki, omat kuvat); tai tilaustyö (norlinmartin tekee Tukholman malleja) |
| Concorden aukio | ei valmista | – | – | 1–2 pv: IGN-ortokuva (Licence Ouverte) maapinnaksi + obeliski + 2 suihkulähdettä |
| Eiffel (varalla) | Johnson-Martin 453 k / SDC 148 k (Sketchfab) | CC BY, ilmainen | 148–453 k | 1–2 pv: 80–150 k, ristikko alfalla tai normaaleilla; vain päivä (yövalaistus suojattu, SETE) |
| Riemukaari (jos halutaan) | Nicolas Diolez (Sketchfab Store) | ~49 USD | 343 k, 8k PBR | 1 pv; katto kuvattu maasta → korvattava |

Hinnat ja kolmiomäärät osin hakutiivistelmistä (Fab, TurboSquid, CGTrader estivät haun): **tarkistettava selaimella ennen ostoa**.
Ostot omistajan linjan mukaan: omistaja ostaa, kuitti ja lisenssi repoon (Raamattu: media vain PD/CC tai ostettu lisenssi).

## 3. Toteutus Gizan mukaan (koodi valmiina, CesiumOmatMallit)

1. **Malli** → LR:n GLB-paketti (`sijainnit.json` + `glb/<kohde>-lod{0,1,2}.glb`) → `tyokalut/omat_mallit_tileset.py` → 3D Tiles +
   `mallit.json` (tekijärivi, kohde, lat/lon, ellipsoidikorkeus, leikkauspolygoni, tilesetin polku) → ämpäri
   `kartta/omat-mallit/<versio>/` ja `uusin.json` Julkaisijan kautta.
2. **Leikkaus näyttöhetkellä**: CesiumPolygonRasterOverlay Googlen tilesetiin vasta, kun oma malli on ladattu (ei tyhjää reikää);
   polygoni omasta datasta (OSM-jalanjälki, ei Googlen geometriasta). Ei tallennusta.
3. **Krediitti**: oma tekijärivi Googlen rivien erillään (KrediititTiivis), esim. "Notre-Dame 3D: Zhang Shangbin (lisenssi), Matkakirja".
4. **Korkeus** omasta datasta: IGN RGE ALTI (Pariisi, Licence Ouverte) ja Lantmäteriet GSD (Tukholma) + geoidi. HUOM: nykyinen
   CesiumOmatMallit siirtää mallia Googlen pinnan näytteiden mukaan (KorjausRajaM); LS1:n raportin C4 kieltää korkeuksien lukemisen
   Googlen laatoista. Ehdotus: korjaus pois tai vain lokiin, korkeus aina omasta DEM:stä (Karttaseppä vahvistaa).

## 4. Suositus ja järjestys

1. **Notre-Dame** (vanhentunut data on pelaajalle selvin virhe; ~20 USD + 1–2 pv LR).
2. **Riddarholmenin kirkko** (~15 USD + 0,5 pv; testaa samalla Tukholman ketjun).
3. **Concorden aukio** (oma maapinta; 1–2 pv, ei ostoja).
4. **Kuninkaanlinna** (3–5 pv tai tilaustyö) – vasta kun 1–3 ovat pelissä.
Eiffel ja Louvre: ei nyt (Eiffel kelpaa, Louvren pyramidi tekijänoikeusriski).

Omistajan päätökset: ostot 1–2 (yht. ~35 USD, tarkistettava) ja kuka mallintaa/viimeistelee (LR).
