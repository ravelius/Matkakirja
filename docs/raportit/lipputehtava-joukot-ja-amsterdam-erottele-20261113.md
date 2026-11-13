# Lipputehtävän joukot (5 maata) ja Amsterdamin Erottele (SK 13.11.2026, KK 13.58, osa 2 lisäys)

Vain docs. Ei latauksia, ei generointia. Pohja: `suunnitelmat/20261113-lipputehtava-tavoitekuva.md` (JOUKOT) ja `20261113-nayttamo-kytkenta-kk-paatos.md` kohta 1.

## 1. Lippu: oikea + kolme harhaa

Sääntö: harha eroaa oikeasta SELVÄLLÄ piirteellä (suunta, järjestys, tunnus, kuvio), ei sävyllä eikä mittasuhteella. Pois (KK): Romania–Tšad, Indonesia–Monaco; pois myös Luxemburg–Alankomaat ja Latvia–Itävalta (sävy + mittasuhde).
Kuva: kaikki 19 lippua ovat jo pelissä (`assets/liput/<tiedosto>.png`, avain Commonsin `Flag of …svg` taulussa `LIPUT_PAIKALLISET`; sama lähde kuin visan `lippuTiedosto`). Lisenssi: Commonsin vapaa/PD-lippu; yksikään 19:stä ei ole `LIPPU_TEKIJAT`-listalla (jossa ovat vain CC BY-SA -poikkeukset: Ainu, Miranda do Douro, Khyber Pakhtunkhwa, Punjab, Sardinia, Baskimaa, Kven, Jemen), joten nimeämistä ei vaadita. Ei uusia latauksia.

### Ranska (France.png, 3:2)
| Harha | Ero Ranskaan (yksi virke) |
|---|---|
| Alankomaat | Raidat ovat vaakasuorassa ja punainen on ylhäällä (Ranskassa raidat ovat pystyssä, sininen tankopuolella). |
| Kroatia | Vaakaraitojen keskellä on punavalkoruutuinen vaakuna (Ranskan lipussa ei ole tunnusta). |
| Romania | Keskimmäinen raita on keltainen eikä valkoinen. |

### Iso-Britannia (United-Kingdom.png) — uusittu KK 14.12
Lähdetarkistus: **Englannin lippu (Yrjön risti) EI ole pelin lippulähteessä** (ei `Flag of England.svg`-riviä taulussa `LIPUT_PAIKALLISET`, ei tiedostoa `assets/liput/`); ei ladattu. **Skotlanti on** (`scotland.png`, 5:3, PD; ei `LIPPU_TEKIJAT`-listalla). Myös Wales (`wales.png`), Georgia, Jamaika, Australia ovat lähteessä.

**Suositus (kaikki lähteessä, harhat keskenään erilaisia):**
| Harha | Ero Britanniaan (yksi virke) |
|---|---|
| Skotlanti | Vain valkoinen vinoristi sinisellä (Britannian lipussa on lisäksi punainen risti ja punaiset vinoraidat). |
| Georgia | Valkoisella pohjalla on vain punainen suora risti ja neljä pientä ristiä (Britannialla on myös vinoristit). |
| Australia | Britannian lippu on vain kulmassa, ja loppu on sinistä tähtineen. |
Georgia on Englannin lipun paikalla: se muistuttaa Yrjön ristiä, ja puuttuvan Englannin ero (ei vinoristiä) säilyy. Vaihtoehto Georgian tilalle: **Jamaika** (keltainen vinoristi vihreän ja mustan kolmioilla; "vinoristi, mutta ei punaista eikä sinistä"). **Wales** ei suositella: Wales kuuluu Britanniaan, joten sekä Skotlanti että Wales voivat hämmentää ("eikö se ole Britannian lippu?"); sama koskee Skotlantia, mutta se on KK:n oma ehdotus ja ero (vain vinoristi) on selvä. Jos Englanti halutaan: lippu pitäisi ladata (Commons, PD, yksinkertainen), vaatii KK:n luvan.
Kysymyslause, jos Skotlanti tuntuu epäreilulta: "Mikä näistä on koko Yhdistyneen kuningaskunnan lippu?" (pelin nimi Iso-Britannia säilyy otsikossa).

### Alankomaat (Netherlands.png, 3:2)
| Harha | Ero Alankomaihin |
|---|---|
| Ranska | Raidat ovat pystysuorassa (Alankomaiden raidat ovat vaakasuorassa, punainen ylinnä). |
| Venäjä | Raitojen järjestys on eri: valkoinen ylinnä, sitten sininen ja punainen. |
| Paraguay | Valkoisen raidan keskellä on pyöreä tunnus (muuten raidat ovat samat punainen–valkoinen–sininen). |

### Itävalta (Austria.png, 3:2)
| Harha | Ero Itävaltaan |
|---|---|
| Peru | Raidat ovat pystysuorassa (Itävallalla vaakasuorassa). Repon kuva on tunnukseton siviililippu. |
| Libanon | Valkoisen raidan keskellä on vihreä setri. |
| Puola | Raitoja on vain kaksi, valkoinen ylhäällä ja punainen alhaalla (Itävallalla kolme, punainen ylinnä). |
Varalla Kanada (pystyraidat + vaahteranlehti).

### Italia (Italy.png, 3:2)
| Harha | Ero Italiaan |
|---|---|
| Irlanti | Oikeanpuoleinen raita on oranssi eikä punainen (KK:n esimerkki; ero on väri, mutta eri väri eikä sävy). |
| Norsunluurannikko | Raitojen järjestys on käänteinen: oranssi on tankopuolella ja vihreä oikealla. |
| Meksiko | Valkoisen raidan keskellä on kotka-vaakuna. |
Varalla Unkari (raidat vaakasuorassa): jos Irlanti halutaan korvata piirteellä, joka ei ole pelkkä väri.

## 2. Havainnot KK:lle ja Näyttämösepälle

- **Kuvakoko**: repon PNG:t ovat pieniä (Ranska, Italia, Norsunluurannikko, Iso-Britannia, Peru, Libanon, Puola, Kroatia, Australia, Uusi-Seelanti, Fidži 120 px leveitä; Irlanti, Unkari, Alankomaat, Venäjä, Romania, Itävalta 250 px). 3D-kankaaseen (iPad lähikuva) 120 px on pehmeä; pelin `lippuUrl` hakee muuten Commonsin renderin (leveys 320–1600) tai peilin, joten Näyttämöseppä käyttää samaa reittiä kuin visa eikä repon PNG:tä suoraan.
- **Kuvasuhde**: KK 14.06: kaikki neljä lippua piirretään samassa kuvasuhteessa, joten vihjettä ei tule (Irlanti 2:1 vs Italia 3:2 ei vaikuta).
- **Paraguay ja Peru**: Paraguayn lipun kääntöpuolella on eri tunnus, repon kuva on etupuoli. Perun repon kuva on tunnukseton siviililippu (valtionlipussa on vaakuna).
- **Varat**: Kanada on repossa (assets/liput/canada.png), Tuvalu ei; Tuvalu vaatisi uuden latauksen, joten sitä ei käytetä ilman KK:n lupaa.

## 3. Datamuoto (kohta 1: `tarinakaari.<kaupunki>.nayttamo[]`)

`kysymys` valmis suomenkielinen lause. `maa` on pelin suomenkielinen nimi pienellä, `lippu` repon tiedosto (Näyttämöseppä sitoo ne lippulähteeseen).

```json
[
  { "id": "rooma-lippu-italia", "tyyppi": "valitse", "kysymys": "Mikä näistä on Italian lippu?",
    "oikea": { "maa": "italia" }, "vaarat": [ { "maa": "irlanti" }, { "maa": "norsunluurannikko" }, { "maa": "meksiko" } ] },
  { "id": "pariisi-lippu-ranska", "tyyppi": "valitse", "kysymys": "Mikä näistä on Ranskan lippu?",
    "oikea": { "maa": "ranska" }, "vaarat": [ { "maa": "alankomaat" }, { "maa": "kroatia" }, { "maa": "romania" } ] },
  { "id": "lontoo-lippu-iso-britannia", "tyyppi": "valitse", "kysymys": "Mikä näistä on Ison-Britannian lippu?",
    "oikea": { "maa": "iso-britannia" }, "vaarat": [ { "maa": "skotlanti" }, { "maa": "georgia" }, { "maa": "australia" } ] },
  { "id": "amsterdam-lippu-alankomaat", "tyyppi": "valitse", "kysymys": "Mikä näistä on Alankomaiden lippu?",
    "oikea": { "maa": "alankomaat" }, "vaarat": [ { "maa": "ranska" }, { "maa": "venäjä" }, { "maa": "paraguay" } ] },
  { "id": "wien-lippu-itavalta", "tyyppi": "valitse", "kysymys": "Mikä näistä on Itävallan lippu?",
    "oikea": { "maa": "itävalta" }, "vaarat": [ { "maa": "peru" }, { "maa": "libanon" }, { "maa": "puola" } ] }
]
```
Kaupunkiin sidonta on vain ehdotus (Rooma = ensimmäinen koe, KK:n linja): Italia → Rooma; Ranska → Pariisi; Iso-Britannia → Lontoo; Alankomaat → Amsterdam; Itävalta → Wien. Amsterdamissa on jo Erottele (alla); lippu olisi toinen alkio samassa `nayttamo[]`-listassa, ja data arpoo yhden.

## 4. Amsterdamin Erottele (omat alankomaat, vieraat ranska)

Muoto `tyyppi: "erottele"`, tekijän maa ratkaisee (KK 10.44). Vain teos-id:t, jotka ovat pelin `Museo/<maa>/teokset.json`:ssa ja joilla on `seina_lahde` (kaikilla 64 + 51 on). Kuvalisenssi: jokainen omat-teos on Rijksmuseumin kuva (Public Domain Mark 1.0; teokset.json: CC0 tai Public domain); jokainen vieras on Louvren/Marmottanin PD-Art (Commons).

**Kysymyslause** (`kysymys`): "Mitkä näistä maalauksista on tehnyt hollantilainen taiteilija?"
(Ohje näyttämöllä ennallaan: omat valoon, vieraat pimeään; paljastuksessa maa nimetään.)

```json
{ "id": "amsterdam-maalarit", "tyyppi": "erottele",
  "kysymys": "Mitkä näistä maalauksista on tehnyt hollantilainen taiteilija?",
  "maara": 6,
  "omat": { "maa": "alankomaat",
            "teokset": ["SK-C-5", "SK-A-2344", "SK-A-135", "SK-A-1718", "SK-C-211", "SK-A-354", "SK-A-385", "SK-C-206"] },
  "vieraat": [ { "maa": "ranska",
            "teokset": ["louvre-inv-8525", "louvre-inv-3692", "louvre-inv-3699", "orsay-rf-2739", "marmottan-4014"] } ] }
```

| Rooli | id | Teos | Tekijä, vuosi | Lisenssi |
|---|---|---|---|---|
| omat | SK-C-5 | Yövartio | Rembrandt, 1642 | Public domain (Rijks PDM) |
| omat | SK-A-2344 | Maitotyttö | Vermeer, n. 1660 | PD |
| omat | SK-A-135 | Iloinen juoja | Frans Hals, n. 1628–30 | CC0 |
| omat | SK-A-1718 | Talvimaisema luistelijoineen | Avercamp, n. 1608 | PD |
| omat | SK-C-211 | Tuulimylly Wijk bij Duurstedessa | Ruisdael, n. 1668–70 | PD |
| omat | SK-A-354 | Kukka-asetelma lasimaljakossa | Rachel Ruysch, n. 1690–1720 | CC0 |
| omat | SK-A-385 | Pyhän Nikolauksen juhla | Jan Steen, 1665–68 | PD |
| omat | SK-C-206 | Neljä nuorta sonnia | Paulus Potter, 1651 | PD |
| vieras | louvre-inv-8525 | Pyhiinvaellus Kytheraan | Watteau, 1717 | PD-Art |
| vieras | louvre-inv-3692 | Horatiusten vala | David, 1784 | PD-Art |
| vieras | louvre-inv-3699 | Napoleonin kruunajaiset | David, 1805–07 | PD-Art |
| vieras | orsay-rf-2739 | Tanssiaiset Moulin de la Galettessa | Renoir, 1876 | PD-Art |
| vieras | marmottan-4014 | Impressio, auringonnousu | Monet, 1872 | PD-Art |

Luvut: omat 8, vieraat 5, kierros 6 → kumpaakin vähintään 2 (kierros on 2–4 vierasta ja 2–4 omaa).

Valintaperusteet ja pois jätetyt:
- Omat: viisi eri maalaria + kolme (Hals, Steen, Potter, Ruysch) tunnettuja; kaikki ennen 1873 ja ei tekijäkiistaa. Pois: **SK-A-4691** (Omakuva n. 1628, "after Rembrandt"-kiista), **SK-A-3957** (Cuyp, mahdollinen pastissi), **SK-C-374** (Codde + Hals yhdessä), **SK-A-4** (Asselijn syntyi Dieppessä), Leyster-teokset ("mainittu teoksessa"; Iloinen juoja -nimi sama kuin Halsilla, sekoittaa), Mauritshuis/Hals-museo/Van Gogh -museon kuvat (kuvaehdot erikseen, ks. taidemuseo-alankomaat-aineisto-20261009.md).
- Vieraat: vain ranskalaisia tekijöitä (tekijän maa). **Älä käytä** ranska-aineistosta: **Rembrandtin Batseba (louvre-mi-957)** ja **Van Goghin Tähtikirkas yö / Auversin kirkko (orsay-rf-1975-19, orsay-rf-1951-42)** ovat hollantilaisia ranskalaisessa museossa; Leonardo, Rafael, Veronese, Tiziano ovat italialaisia (vain jos vieraat-lista saa toisen maan: `maa: "italia"`, Mona Lisa tunnetuin houkutin, mutta UI:n maa-avaimet vaativat `ui.erottele.maa.italia`); Cassatt on amerikkalainen. Alastomuus/ruumiit pois (KK 14.12): **Vapaus johtaa kansaa (louvre-rf-129: paljas rinta, ruumiita etualalla)**, Olympia, Aamiainen ruohikolla, Suuri odaliski, Sardanapalos, Medusan lautta, Khioksen verilöyly, Pelihulluuden riivaama nainen.
- Vaikeus: Watteau, David, Renoir ja Monet näyttävät eri tyyliltä kuin hollantilainen 1600-luku, joten ero löytyy katsomalla. Vaikeampaan versioon (samaan alkioon myöhemmin) kuuluvat Poussin (louvre-inv-7300), La Tour (louvre-rf-1972-8) ja Chardin (louvre-inv-3197): ranskalaisia, mutta 1600–1700-luvun tyyli lähellä hollantilaista. Ranska-aineisto ei sisällä flaamilaisia naapureita (Rubens, Van Dyck); ne vaatisivat uuden latauksen (KK:n lupa), tutkimuksessa on 11 vapaata (amsterdam-tutkimus.md kohta c).
- Tarkistettu (ei uusia latauksia): kaikilla 13 teoksella on `kuva.seina_lahde` pelin teokset.json:ssa; kuvasuhteet 0,82–1,73 (Avercamp 1,73 on leveä, Ruysch 0,82 korkea) → eri muotoisia, ei vihjettä.
- Amsterdamin kohtaaminen: Yara (kohtaamisraportti c1, `js/packs/kohtaamiset.js`) on olemassa, joten kohta 4 "alle 4 teosta / ei kohtaamista" ei lauennut; luku KK:lle tarpeeton.
- Nykyinen `erottele.json` (ranska-maalarit: omat ranska, vieraat alankomaat) kääntyy tähän: omat alankomaat, vieraat ranska, kaupunki amsterdam. Teokset SK-C-5 ja SK-A-2344 olivat siinä vieraina; sama kuva ei siis ole kahdessa roolissa samassa kaupungissa.

## 5. Selitys: mistä oikean lipun väritys ja ulkoasu ovat peräisin (SK 13.11.2026, KK 16.27, omistajan lisäys)

Vain docs. Kenttä `nayttamo[].selitys` (valmis suomenkielinen teksti, 13+ ja aikuiset, 2–3 virkettä, enintään noin 300 merkkiä; pituudet 232–300 (KK 16.30 sanamuotokorjaukset Italiaan, Britanniaan, Alankomaihin ja Itävaltaan; Ranska sellaisenaan)). Näytetään lopputilassa maiden nimien kanssa. Data-PR vasta KK:n sanalla. Lähteet haettu 13.11.2026; kortin lahteet-ja-tarkistus säännöt 1, 3 ja 5: epävarma sanotaan epävarmana, legenda legendana.

```json
{
  "rooma-lippu-italia": "Lippu sai mallinsa Ranskan kolmiväristä, ja se hyväksyttiin Reggio Emiliassa vuonna 1797. Punainen ja valkoinen tulevat Milanon vaakunasta; vihreän sanotaan tulevan Milanon kaartin asepuvusta, mutta siitä kiistellään. Savoijin kuningassuvun vaakuna poistui lipusta, kun Italiasta tuli tasavalta 1946.",
  "pariisi-lippu-ranska": "Yleisen selityksen mukaan sininen ja punainen ovat Pariisin kaupungin värit ja valkoinen Ranskan kuninkaan väri. Vallankumouksen aikana 1789 ne yhdistettiin kolmivärikokardiksi, ja kolmiväri vahvistettiin kansalliseksi lipuksi 1794.",
  "lontoo-lippu-iso-britannia": "Kuningas Jaakko I määräsi lipun käyttöön vuonna 1606: siinä yhdistyivät Englannin Pyhän Yrjön punainen risti ja Skotlannin Pyhän Andreaksen valkoinen vinoristi sinisellä pohjalla. Kun Irlanti liitettiin kuningaskuntaan 1801, mukaan tuli Pyhän Patrikin punainen vinoristi.",
  "amsterdam-lippu-alankomaat": "Esikuva on 1500-luvun Prinssinlippu, jonka oranssi, valkoinen ja sininen olivat Vilhelm Oranialaisen värit. Oranssi vaihtui 1600-luvulla punaiseksi; syytä ei tiedetä varmasti. Punavalkosininen lippu vahvistettiin virallisesti vuonna 1937.",
  "wien-lippu-itavalta": "Punainen, valkoinen ja punainen ovat Babenbergien herttuasuvun vaakunan värit, ja ne tunnetaan 1200-luvulta. Perimätiedon mukaan herttua Leopold V:n valkoinen asu värjäytyi vereen Akkonin piirityksessä 1191, ja vyön alle jäi valkoinen kaista. Tarinasta ei ole todisteita."
}
```

### Lähteet ja tarkistus (väite → lähteet)

| Maa | Väite | Lähteet (kaksi itsenäistä) | Huomio |
|---|---|---|---|
| Ranska | Pariisin sininen ja punainen + kuninkaan valkoinen; kokardi 1789 (Lafayette, heinäkuu 1789); kansallinen lippu 15.2.1794 (asetus 27 pluviôse II) | FOTW (crwflags.com/fotw/Flags/fr_revol.html, fr.html); francethisway.com ja drapeaux-sfv.org (lipun historia) | FOTW: tarina kuninkaasta kokardi hatussa on legenda ja värien merkitykset jälkikäteen keksittyjä, joten teksti ei kerro "vapaus, veljeys, tasa-arvo" -tulkintaa eikä kuninkaan kokardia. "Yleisen selityksen mukaan" kantaa epävarmuuden. 1790 laivaston lippu jätetty pois (lyhyys) |
| Britannia | 1606 Jaakko I:n julistus (Yrjön risti + Andreaan vinoristi); 1801 Patrikin vinoristi | Flag Institute (flaginstitute.org/wp/uk-flags/union-flag-history/); royal.uk/union-jack; History Today ("The First Union Flag") | Kolme lähdettä sopii. Vuosi 1606 = ensimmäinen yhdistetty lippu (ensin laivoille); 1707 ja 1634 jätetty pois |
| Alankomaat | Prinssinlippu oranssi–valkoinen–sininen, Vilhelm Oranialaisen livree; punainen oranssin tilalle 1600-luvulla; kuninkaallinen päätös 19.2.1937 (nro 93) | FOTW (crwflags.com/fotw/flags/nl.html); maxvandaag.nl (1937); Wikipedia (Prince's Flag, Statenvlag) | Haalistumisselitys löytyi vain Wikipediasta, joten se on pois (KK 16.30, sääntö 1); teksti sanoo "syytä ei tiedetä varmasti". Ajoitus vaihtelee (1597 / 1630–1650-luku), siksi "1600-luvulla". Muut teoriat (Baijeri, Ranska) jätetty pois. "Virallisesti 1937" = päätös, jolla värit vahvistettiin (ei lakia) |
| Itävalta | Babenbergien vaakuna punainen–valkoinen–punainen; ensimmäinen merkintä 1230 (Friedrich II) / 1232 asiakirja; Leopold V ja Akkon legenda | Wikipedia (Flag of Austria) ja FOTW (crwflags.com/fotw/flags/at.html) | "Perimätiedon mukaan" + "tarinasta ei ole todisteita": FOTW ei löytänyt tarinan lähdettä, itävaltalaisissa lähteissä sitä ei ole. Tekijä vaihtelee (Leopold V / Friedrich II), joten teksti ei nimeä vaakunan luojaa; "1200-luvulta" riittää. 1918/1945 jätetty pois |
| Italia | Reggio Emilia 7.1.1797 (Compagnoni, Cispadanan kongressi); malli Ranskan kolmiväri; punainen ja valkoinen Milanon vaakunasta (punainen risti valkoisella), vihreä Milanon kaartin asepuvusta; 1946 tasavalta ilman Savoijin vaakunaa | Quirinale (Il Tricolore, tricolore_en.pdf; päivä, Compagnoni); Wikipedia (Flag of Italy, Flags of Napoleonic Italy); FOTW (it-hist.html); italiani.it; Giornale Digitale ja difesa.it (1946, art. 12) | Näyttämösepän luonnos pitää faktoiltaan: 1797 ✓, Ranskan malli ✓, Milanon vaakuna ✓, nykymuoto 1946 ✓ (muoto vahvistettiin väliaikaisesti 19.6.1946 ja Italian perustuslain 12 artiklassa, voimaan 1948). **Vihreän alkuperä on kiistelty** (toinen tulkinta: Milanon herttuakunnan Visconti-lippu), joten "sanotaan" ja "siitä kiistellään" ovat välttämättömiä. Ensimmäinen lippu oli vaakasuora ja pystyraidat tulivat myöhemmin; teksti ei väitä pystyraitoja |

Huomioita KK:lle ja Näyttämösepälle:
- Italian Ranska-väite (malli) perustuu kahteen lähteeseen (Wikipedia + Quirinalen oma aineisto kautta italiani.it); suora Quirinalen PDF ei latautunut tarkistuksessa (verkkovirhe), joten Italian teksti on sama kuin Näyttämösepän luonnos mutta sanamuoto KK:n 16.30 mukainen ("vihreän sanotaan tulevan ... mutta siitä kiistellään"). Jos KK haluaa lyhyemmän: "Punainen ja valkoinen tulevat Milanon vaakunasta, vihreä luultavasti Milanon kaartin asepuvusta."
- Tekstit eivät sisällä väritunnuksia eivätkä luettelomaisia piirteitä; kaikki ovat 232–300 merkkiä (enintään noin 300).
- Peli ei kerro värien "merkityksiä" (esim. Ranskan vapaus/veljeys, Italian vihreä toivo): ne on todettu jälkikäteisiksi tulkinnoiksi eivätkä läpäise tarkistussääntöä 1.
- `maa`-avaimet ja nimet näytetään kaikkien neljän lipun alla pelin omasta maa-taulusta (suomenkielinen nimi), ei kovakoodattuna.

### Riippumaton tarkistus (kortin sääntö 10; Opus-tarkistaja 13.11.2026, KK 16.30 -sanamuodot)

Tarkistaja sai vain viisi tekstiä ja sääntöä (kaksi itsenäistä lähdettä, legenda legendana), ei SK:n lähteitä. Tulos: **kaikki viisi OK, ei pakollisia korjauksia.**
- Ranska OK: Pariisin sininen/punainen + kuninkaan valkoinen on Élysée-palatsin oma selitys (elysee.fr/la-presidence/le-drapeau-francais); kokardi heinäkuu 1789; kansallinen lippu 15.2.1794 (herodote.net, FOTW fr_revol).
- Italia OK: Reggio Emilia 7.1.1797 (Compagnoni); Milanon vaakuna ja Guardia civica -värit useissa italialaisissa lähteissä (agi.it, dequo.it, giovani.camera.it); Savoijin vaakuna pois väliaikaisella asetuksella 19.6.1946, art. 12 vahvistettu 24.3.1947 ja voimaan 1.1.1948 (brocardi.it). Ranskan malli: mainitaan mm. Brocardin kommentissa, mutta Sky TG24 kiistää värien valinnan ranskalaisen mallin mukaan; "sanotaan … siitä kiistellään" kattaa vihreän, ja "sai mallinsa Ranskan kolmiväristä" on yleinen mutta ei kiistaton väite. Huomio: 1797 raidat vaakasuorat (teksti ei väitä pystyä); Lombardian legioona käytti värejä jo 1796 (teksti: "hyväksyttiin 1797", oikein).
- Britannia OK: 1606 julistus, 1801 Patrikin risti (flaginstitute.org, FOTW gb-hist). Huomio: 1606-lippu oli aluksi laivoille; "määräsi käyttöön" on hieman yleistävä (ei virhe).
- Alankomaat OK: Prinssinlippu 1500-luvun lopulta, punainen oranssin tilalle 1600-luvulla, syy epävarma, päätös 19.2.1937 nro 93 (maxvandaag.nl/Nationaal Archief, FOTW nl).
- Itävalta OK: Babenbergien kilpi todistettu 1230 (Friedrich II) (austria-forum.org/Bindenschild, demokratiezentrum.org); Leopold-tarina legenda.
- Rajoite: Quirinalen omat sivut (quirinale.it, tricolore_en.pdf, presidenti.quirinale.it) antoivat 403 eivätkä auenneet; Italian tiedot vahvistuivat usealla itsenäisellä italialaisella lähteellä.
