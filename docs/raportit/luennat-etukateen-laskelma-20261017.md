# Luentojen etukäteisgenerointi: laskelma (Äänittäjä 17.10.2026, EI generointia)

Toimeksianto: PT 00.2x (omistaja 00.23 "Generoi vain kaikki luennat jo nyt etukäteen", kortti 00.24 "Koko pelin kaikki luennat"). Määrä menee KK:n kortille ennen lupaa.
Laskettu kaikki tekstit, jotka suora lukija lukee persoonalla **kertoja** (natiivi `KortinLukija` / `Puhe.Lue`), ryhmittäin. Mrk = merkkiä.

## Tulos yhdellä silmäyksellä

| | Mrk (puhuttu) | Krediitit (0,25/mrk) | Ääntä | MP3 (192 kbit/s) |
|---|---|---|---|---|
| **Jo valmiina** (manifesti v1 + workerin säilö) | 3 122 600 | – | ~65,6 h | ~5,7 Gt |
| **Eurooppa jäljellä** (uudet ja muuttuneet 9.10. jälkeen) | 481 138 | 120 300 | 10,1 h | 873 Mt |
| **Globaali jäljellä** (tiedeliite) | 72 342 | 18 100 | 1,5 h | 131 Mt |
| **Muu maailma jäljellä** | 7 090 863 | 1 772 700 | 149,0 h | 12,9 Gt |
| **Kaikki jäljellä** | **7 644 343** | **1 911 100** | **160,6 h** | **13,9 Gt** |

- ElevenLabs-tilillä on nyt **829 763 krediittiä** (käytetty 58 214 / 887 977; nollautuu 14.11. klo 20.08). Eurooppa + museo + tiedeliite (553 480 mrk, 138 400 kr) mahtuu 17 %:iin. **Muu maailma (1,77 milj. kr) vaatii noin kaksi kuukautta tilin krediittejä tai lisäkrediittejä.**
- Jo valmiina: manifesti `aanet/luennat/v1/manifest.json` (6 903 palaa, 59,6 h, 9.10.) ja workerin R2-säilö (1 939 objektia, `puhe/`: astro-selite 462, kertoja 750, kertoja-t1 639, merkinnat 86), jonka koko on pieni.
- **Hinta**: Pelikoodarin 8.10. "tarjoushinta" 0,066 kr/mrk ei enää päde. ElevenLabsin käyttötilasto: 15.10. klo 11 UTC ISS-selitteet 73 277 mrk (turbo) veloittivat 18 437 kr = **0,2516 kr/mrk**. Taulukot käyttävät 0,25:tä; 0,066:lla koko summa olisi 504 500 kr. Ensimmäinen erä (museo) mittaa hinnan vielä `character_count`-erolla ennen seuraavaa.

## Menetelmä ja luotettavuus

1. Sisältö: `node tools/vienti/vie-sisalto.mjs` origin/mainista (aa41ef358) + museon JSONit proto-reposta (`Resources/Museo/{alankomaat,ranska}`) ja `docs/kohtaukset/museoteokset/kohdat-ranska.json` (152 ympyrää).
2. Kappaleiksi natiivin tavalla: `KortinLukija` → `Kappalejako` → `LuennanPalatJaTagit` (Pelikoodarin `laske-maanosat.mjs`-replika; ≥ 80 mrk, katto 2 500). Sama (teksti, loppuTagi) = yksi otto.
3. **Kalibrointi**: Euroopan nostot täsmäävät 9.10. viennin avaimiin lähes täysin (esim. hahmotelma 1 716 / 1 726 palaa; skandaalit 421 / 425). Avainkaava `sha256("v1|eleven_v4_turbo|oae6…|1,15|loppuTagi|teksti NFC")[:32]` varmistettu: kaikki 6 903 manifestin avainta löytyvät 9.10. vientitiedostoista.
4. Lehdet, maalehdet ja turistioppaat ovat **arvio**: replikan palat eivät täsmää viennin paloihin, joten "jo äänitetty" on laskettu virkkeittäin (81–91 % Euroopan virkkeistä oli jo 9.10. viennissä). Muun maailman lehdet ovat siis ± 10 %:n arvio.
5. Puhuttu muoto: luvut sanoiksi (`puhe.py`-muunnin, vuosiluvut yhteen, desimaalit, järjestysluvut). Puhuttu on **15,1 % pidempi** kuin kirjoitettu (10,77 milj. vs 9,48 milj. mrk). Kesto: 13,22 puhuttua mrk/s (nopeus 1,15), mitattu manifestista.
6. Säilö: workerin avain `puhe/<lohko>/sha256(malli|ääni|ohje|teksti[|nopeus])`; kolme avainmuotoa kokeiltu virtapaloilla. Säilö poistaa vain ~83 000 mrk (ISS-selitteet 77 659 kokonaan; loput museon palasia).
7. **Ei mukana** (ei esigeneroitavissa tai eri persoona): Wikipedia-ikkunan artikkelit (haetaan lennossa), Pulun chat ja Oppaan Kysy (dynaamiset), visakysymykset (ei lueta), isoisän saapumistekstit ilman mp3:a (persoona `merkinnat`, 215 kpl, 89 900 mrk; erillinen päätös).
8. Natiivin oikeaa `ui nostoluennat kaikki` -vientiä ei ajettu (se vaatii Julkaisijan KÄÄNNÖS NYT -vuoron). Tarkka luku saadaan ajamalla se; poikkeama tämän arvion ja viennin välillä tulee lähinnä lehdistä.

## Ryhmät (puhuttu mrk, uniikit kappaleet)

Jäljellä-sarake = mitä ei ole manifestissa eikä säilössä. "kpl" = kaikki uniikit palat ryhmässä; "jäljellä kpl" arvio.

| Ryhmä | Alue | kpl | Mrk kirjoitettu | Mrk puhuttu | Valmiina | Säilössä | **Jäljellä** | jäljellä kpl | h | Mt |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 Kartan nostot | Eurooppa | 4 077 | 1 420 472 | 1 637 031 | 1 561 044 | 0 | **75 987** | 189 | 1,6 | 138 |
| 1 Kartan nostot | muu maailma | 2 959 | 1 040 037 | 1 193 863 | 0 | 2 738 | **1 191 125** | 2 952 | 25,0 | 2 162 |
| 2 Lehdet (kaupunki + maa) | Eurooppa | 2 035 | 821 532 | 929 340 | 797 024 | 0 | **132 316** | 290 | 2,8 | 240 |
| 2 Lehdet (kaupunki + maa) | muu maailma | 5 687 | 2 675 278 | 2 988 915 | 16 | 0 | **2 988 899** | 5 687 | 62,8 | 5 426 |
| 3 Kuvatekstit (astronautin kamera) | globaali | 277 | 73 277 | 77 659 | 0 | 77 659 | **0** | 0 | 0 | 0 |
| 4 Museo: ympyrät (NL 173 + FR 152) | Eurooppa | 325 | 45 209 | 46 642 | 0 | 1 520 | **45 122** | 314 | 0,9 | 82 |
| 4 Museo: i-kortit (NL 128 + FR 3) | Eurooppa | 131 | 10 712 | 14 269 | 0 | 772 | **13 497** | 124 | 0,3 | 25 |
| 4 Museo: huoneet (NL 9 + FR 4) | Eurooppa | 13 | 3 122 | 3 369 | 0 | 268 | **3 101** | 12 | 0,1 | 6 |
| 5 Muut: nähtävyysjutut + kohdekartat | Eurooppa | 1 461 | 517 844 | 611 849 | 479 599 | 0 | **132 250** | 316 | 2,8 | 240 |
| 5 Muut: nähtävyysjutut + kohdekartat | muu maailma | 3 743 | 1 457 379 | 1 698 926 | 0 | 0 | **1 698 926** | 3 743 | 35,7 | 3 084 |
| 5 Muut: turistioppaat | Eurooppa | 517 | 198 973 | 229 937 | 185 928 | 0 | **44 009** | 99 | 0,9 | 80 |
| 5 Muut: turistioppaat | muu maailma | 2 062 | 1 038 499 | 1 143 628 | 0 | 0 | **1 143 628** | 2 062 | 24,0 | 2 076 |
| 5 Muut: kohtaamiset (löytö + kaari) | Eurooppa | 88 | 18 832 | 18 869 | 16 047 | 0 | **2 822** | 13 | 0,1 | 5 |
| 5 Muut: kohtaamiset | muu maailma | 3 | 476 | 476 | 0 | 0 | **476** | 3 | 0 | 1 |
| 5 Muut: maan intro | Eurooppa | 35 | 29 120 | 32 034 | 0 | 0 | **32 034** | 35 | 0,7 | 58 |
| 5 Muut: maan intro | muu maailma | 63 | 61 175 | 67 809 | 0 | 0 | **67 809** | 63 | 1,4 | 123 |
| 5 Muut: tiedeliite (keksinnöt, ihmisen matka) | globaali | 185 | 63 742 | 72 342 | 0 | 0 | **72 342** | 185 | 1,5 | 131 |
| **Yhteensä** | Eurooppa | 8 682 | 3 065 816 | 3 523 340 | 3 039 642 | 2 560 | **481 138** | 1 186 | 10,1 | 873 |
| **Yhteensä** | muu maailma | 14 517 | 6 272 844 | 7 093 617 | 16 | 2 738 | **7 090 863** | 14 511 | 149,0 | 12 873 |
| **Yhteensä** | globaali | 462 | 137 019 | 150 001 | 0 | 77 659 | **72 342** | 223 | 1,5 | 131 |
| **Kaikki** | | 23 661 | 9 475 679 | 10 766 958 | 3 039 658 | 82 957 | **7 644 343** | 16 799 | 160,6 | 13 878 |

Museo ei kuulu 9.10. vientiin lainkaan (kaikki 61 720 mrk uutta). Lisäksi **ei vahvistettu lukijaan**: i-kortin lyhyt fakta (NL 80 + FR 54 kpl, 13 415 mrk, 3 350 kr; Sisältökirjuri 16.10.) lasketaan mukaan vasta, kun Natiivi-UI vahvistaa, että kortti lukee sen.
Euroopan jäljellä-luvusta suurin osa on 9.10. jälkeen tulleita kaupunkeja ja maita (ALB, BLR, LIE, MCO, MDA, MKD, MNE, SRB lisättiin; vienti kattoi 33 maata, nyt 44 maata) sekä muuttuneita täkynostoja (26 340), maastokohteita (29 730) ja kaupunkilehtien sivuja.

## Muu maailma maanosittain (jäljellä, puhuttu)

| Maanosa | Mrk | Krediitit | h | Mt | josta nostot | nähtävyydet | oppaat | lehdet |
|---|---|---|---|---|---|---|---|---|
| Afrikka | 1 623 626 | 405 900 | 34,1 | 2 948 | 357 944 | 203 569 | 233 376 | 801 905 |
| Aasia | 1 302 677 | 325 700 | 27,4 | 2 365 | 233 558 | 381 341 | 178 694 | 497 286 |
| Etelä-Amerikka | 1 091 112 | 272 800 | 22,9 | 1 981 | 153 813 | 250 957 | 203 589 | 472 055 |
| Pohjois-Amerikka | 1 062 681 | 265 700 | 22,3 | 1 929 | 100 142 | 328 716 | 198 033 | 427 789 |
| Lähi-itä | 1 011 580 | 252 900 | 21,3 | 1 836 | 205 751 | 302 093 | 152 627 | 349 048 |
| Oseania | 900 424 | 225 100 | 18,9 | 1 635 | 90 961 | 231 094 | 175 576 | 393 898 |
| tuntematon maa | 98 763 | 24 700 | 2,1 | 179 | 48 956 | 1 156 | 1 733 | 46 918 |

(Maanosa = `offline.json` `manner`. Rajaus VAIN EUROOPPA: muu maailma on lueteltu vain, koska kortti 00.24 sanoo "koko pelin"; KK vahvistaa, kuuluuko se erään.)

## Tallennuspaikka ja pakettien kasvu

- **Ämpäri, ei maapaketteihin**: sama kuin v1: `aanet/luennat/v1/k/<avain>.mp3` (muuttumaton, avain sisältää tekstin ja äänen; teksti muuttuu → uusi avain, vanha jää). Pelin `Valmisluennat` hakee ne soitettaessa.
- Pakettien kasvu: koko Eurooppa on valmistuttuaan ~74 h ≈ 6,4 Gt, mikä on yli kaksinkertainen nykyiseen Euroopan media-pakettiin (2 790 Mt, `offline.json`) nähden. Luentoja ei siis kannata liittää maapaketteihin oletuksena; jos omistaja haluaa offline-luennat, kasvu on maittain `h × 86,4 Mt` (Eurooppa +873 Mt, Afrikka +2 948 Mt jne., taulukko yllä). Muu maailma +12,9 Gt, kaikki jäljellä +13,9 Gt.
- **Manifesti**: nykyinen v1 on 633 kB / 6 903 riviä (92 B/rivi). Kaikilla lisäyksillä ~23 700 riviä ≈ 2,2 Mt yhtenä tiedostona. Ehdotus: manifesti maittain (`aanet/luennat/v2/<ISO3>.json` + globaali), jolloin peli lataa vain käyntimaan rivit. Muutos Valmisluennat-lukijaan kuuluu Pelikoodarille; Äänittäjä tuottaa jaon vientivaiheessa.
- Vienti `vie-paketti.sh` (portti pakollinen, ei ylikirjoitusta). Raaka-PCM T7:lle kuten 9.10. (`/Volumes/T7 4TB/Matkakirja-aanimasterit/`).
- Kesto: 9.10. ajo 6 903 palaa kesti ~3 h kolmella rinnakkaisella pyynnöllä (~40/min). Euroopan erät (1 186 palaa) ~30 min; kaikki 16 800 palaa ~7 h.

## Ehdotus pieniksi eriksi (järjestys: kuuntelun määrä, varmuus, hinta)

| # | Erä | Mrk | Krediitit | h | Mt | Perustelu |
|---|---|---|---|---|---|---|
| 1 | **Museo NL + FR**: ympyrät 325, i-kortit 131, huoneet 13 | 61 720 | 15 400 | 1,3 | 112 | Tuorein työ, ei yhtään valmista ääntä; pieni, joten mittaa hinnan (`character_count`-ero) ja kuuntelun. Lupa tarvitaan uudelleen: KK 00.2x päätti, ettei Louvren ympyröitä generoida, kortti 00.24 voi korvata tämän. |
| 2a | Euroopan nostot (täky-, maasto-, historia-, syvennykset) + kohtaamiset + maan intro | 110 843 | 27 700 | 2,3 | 201 | Kartan nostot kuullaan eniten; muutokset 9.10. jälkeen |
| 2b | Euroopan nähtävyydet + kohdekartat + turistioppaat | 176 259 | 44 100 | 3,7 | 320 | Uudet kaupungit |
| 2c | Euroopan lehdet | 132 316 | 33 100 | 2,8 | 240 | Arvio (virketasolla); sisältö vielä liikkuu |
| 3 | Tiedeliite (globaali, vakaa) | 72 342 | 18 100 | 1,5 | 131 | Ei muutu |
| 4 | Muu maailma maanosittain, kussakin järjestys nostot → nähtävyydet → oppaat → lehdet | 7 090 863 | 1 772 700 | 149,0 | 12 873 | Vain omistajan erillisellä luvalla (VAIN EUROOPPA); pienin ensin: Oseania, Lähi-itä, Pohjois-Amerikka, Etelä-Amerikka, Aasia, Afrikka. Ei mahdu nykyisiin krediitteihin kerralla. |

Erät 1–3 yhteensä 553 480 mrk, **138 400 kr**, 11,6 h, 1 005 Mt; jäljelle jää tilillä 691 400 kr. Kukin erä lupa-, kuunteluportti- ja vientikierroksella erikseen ("lupa koskee vain nimettyä erää").

## Avoimet kysymykset KK:lle / PT:lle

1. Kuuluuko muu maailma (7,09 milj. mrk, 1,77 milj. kr) erään? Se rikkoo "VAIN EUROOPPA" ilman erillistä päätöstä, ja krediitit eivät riitä ennen 14.11. nollausta.
2. Hinta 0,25 kr/mrk (ei 0,066): hyväksytäänkö mittaus erällä 1?
3. Lukeeko museon i-kortti lyhyen faktan (13 415 mrk)? Natiivi-UI vastaa.
4. Isoisän saapumistekstit ilman mp3:a (215 kpl, 89 900 mrk, persoona `merkinnat`): kuuluvatko erään vai ei?

## Toistaminen

Työkansio `proto-3d/_tyo/luennat-laskelma-20261017/`: `poimi.mjs` (kappaleet sisällöstä) → `virta.mjs` → `laske.py` → `yhteenveto.py` → `raportti_taulut.py`; syötteet manifesti `https://media.matkakirja.app/aanet/luennat/v1/manifest.json` ja R2-listaus (`r2-puhe-lista.jsonl`). Ajo ~2 min, ei kutsu ElevenLabsia (vain `/v1/user/subscription` ja `/v1/usage/character-stats` lukuun).
