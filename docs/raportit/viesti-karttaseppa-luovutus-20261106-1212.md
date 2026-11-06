# Karttaseppä: luovutus 6.11.2026 klo 12.12 (KS)
Syy: konteksti noin 35 %, luonteva tauko: ajot 10 ja 11 jaettu, ajo 12 JU:lla. **Voittaa -1145:n ristiriidassa; -1128:n LOPPUTESTIT alla.** Kaikki kokeena, ei junaan, ei iPadia. W = /Users/Shared/Claude/wt/proto-karttaseppa-nd-kaanto-219 (kärki 6a750435e). Y = /Users/Shared/Claude/wt/proto-karttaseppa-yhteinen (kärki 90028c712). Älä yhdistä Y:hen ajon aikana.

## ENSIN
1. Vahti Monitorilla: `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh` (30 min, viritä uudelleen).
2. Ajo 12 odotus: loki `/Users/Shared/Claude/julkaisija-tyokalut/karttaseppa-yhteinen-12-b8-90028c712.log`, päätösrivi AJETTU tai VIKA. Pyydetty JU:lta 12.10; kääntämättä, sisältää varjostinmuutoksen. Jos ei käänny, virhe tulee KS:lle: Pompidou tai usva VS:lle.

## AJO 12: MITÄ KATSOT (lokit/karttaseppa-yhteinen-12-b8-90028c712, 5 kuvaa)
Y = bb683b202 + VS 9fea47165 (Pompidoun muodot) + VS a93ed64b0 (usvan väri = taivaan liukuväri, vain Kirkko-varjostin).
- **VS:lle kansio katsottuna.** po-la ja po-ita (Pompidou; po-la vertailu ajon 11 po-la samasta kamerasta; suunta 265 laskettu, ei nähty).
- **us-eiffel-75, us-eiffel-85b:** pari ajo 10 | 12. Mittaa rivit y 600 ja 400, ero taivaasta yli 3: `_tyo/karttaseppa/parit-yhteinen-10/tee-eiffel-rajaus.py`:n tapaan (vaihda polut). Ajo 10: y 600 58 px, y 400 25 px; ajo 9: 0 ja 6. VS: tornin alaosa ja 85b:n hahmo voivat jäädä, korjaus koskee vain väriä. Älä kirjaa haamua korjatuksi, jos se näkyy.
- **pr-etela-2:** Palais-Royal'n etelämuuri Louvren yli (kamera laskettu). Ajon 11 pr-etela näytti vain Louvren etelästä eikä todista mitään. Tulos NS:lle: seisooko muuri pohjalla, lävistääkö mallia.

## TEHTY 11.46-12.12
- **9b:** Eiffel- ja siltakamerat kelpaavat. VS:lle kerrottu.
- **Ajo 10 (lokit/karttaseppa-yhteinen-10-b8-61a6f5321, parit _tyo/karttaseppa/parit-yhteinen-10):** mallit, pohja ja puut häipyvät yhdessä, ei leijumista. Vika: Eiffelin vaalea haamu, korjaus ajossa 12. VS:llä.
- **Omistajan 11.39, W 6a750435e:** kuusi Tiedosto-polkua paletti-v2:een; mäen nurmi kartan oliiviin `_tyo/karttaseppa/karttapaletti-v2/tee-maki-nurmi.py` (portti 0 %). Lähde on 8479f9221:n paletti-v2/sacre-coeur-maki.bytes; aja siitä, ei tuloksesta.
- **Forum, karttaseppa/forum-219 b445689cb:** TaloAlue.ForumPois (11 keskipistettä, vara 3 m; lähin muu rengas 12 m), ForumPala versioliite -forum1. Testit 6/6, koko sovitussa rajassa, 35 m²:n neliö samalla tavalla.
- **NS palat-v10 (sha 3013995533fc3106):** ajossa 11. Louvren pohjaan EI aukkoa Palais-Royal'n kohdalle: alue on tasaista kiveä, aukko paljastaisi kartan litteän katon leikatun eteläpään kohdalta.
- **Ajo 11 (lokit/karttaseppa-yhteinen-11-b8-bb683b202, parit _tyo/karttaseppa/parit-yhteinen-11):** mäki mitattu: etelärinne 198,173,109, kartta 196,172,107. Forum puhdas. Canopéen katossa ei raitoja yhdessä ruudussa per kamera; liikkeessä todistamatta. KK:lla ja NS:llä.

## KK:LLA AUKI
- Parit lähetetty 12.1x. Kun KK ei kumoa: **koepaletti-komento pois W:stä** (Nahtavyysalue.KoePaletti, Komennot.cs:803), seuraavaan yhdistykseen. Tiedoksi PT on lähetetty paletista ja Forumista.

## MUUTA
- palat-v10 korvaa v9:n; talot kansio v10 on ajoissa 11 ja 12.
- W:ssä ei ole TaloAlue-koodia: kartan muutokset, jotka koskevat sitä, tee Y:n pohjalta omaan haaraan. Kevyt worktree poistettu, haara jää.
- POIKKEUS 1 kpl joka ajossa `ui sulje` -komennolla (ArgumentOutOfRangeException), JU tietää; ei pysäytä ajoa.

## Oppi
Laske kameran suunta kohteesta: `aja` asettaa katsepisteen, kamera on sen takana; pr-etela katsoi väärältä puolelta. Tarkista kuva ennen kuin kirjoitat, että se todistaa jotain.

## LOPPUTESTIT (siirrä tämä osio jokaiseen uuteen luovutukseen)
Repon mainissa ei ole yhteistä lopputestilistaa (PT 01.5x). Tämä osio on lista, kunnes PT muuta sanoo.
1. Saapumislento laitteella (2.209, KK, kirjattu PT 01.5x): mallit syntyvät noin 11 km:ssä; jos tarkempi maastotaso ei ole vielä ladattu, kohde voi hetken istua väärällä tasolla. Vain laite näyttää.
