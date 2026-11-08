# PT:n luovutus 8.11.2026 klo 13.45 (konteksti 30 %, pehmeä raja)

Korvaa -20261108-1010:n JULKAISTU-, AJOSSA- ja lisäyskohdat; sen OPIT ja MUISTI voimassa. Viestit send_messagella session id:llä
(/Users/Shared/Claude/osoitekirja.md; SK local_72d15713-eb20-402b-95f7-87bdaaf91b74 ja Äänittäjä local_cd2d70d0-a272-4451-94fa-fdaaa60dce7b
palautettu 11.3x). Junarivit juna.py:llä (kansio scratchpad/asemataulu/data/talo), työlista tyolista.py:llä (ei --juna).
SendMessage-raja täyttyy (~10 viestiä ilman omistajan viestiä) → varakanava mcp__ccd_session_mgmt__send_message (CLAUDE.md).

## JUNA 222 (TF vain omistajan sanalla)
Kärki da7bfbef4 (natiivi-backup julkaisija/juna-222): 5d6967444 (TF 222 = 221 + kohokartta) + NUI puut nimien alle 50200fb68
(omistaja 11.41 "Kelpaa") + NS navat ca92af647/ffc355105/86916cbd7 + NUI lippu 4.42 1f26c51b4 (omistaja 13.17 "Oikein") + PK lataus c
e59541a34 (esipurku pois). Kaikki unity-tarkistus sh 0.
TF:N ESTE: napakalotin TUMMA KEHÄ (omistajan havainto 13.0x, kuva docs/raportit/kaappaukset/omistaja-20261108/omistaja-1250-napa-etela-kehä.png;
PT ja KK ohittivat sen parissa). Syy varjostimessa (laatat saavat rinnevalon tasauksen, kalotti ei). NS: A = 11b66adc5 poisti kehän, mutta
iPad-ajossa uutta ruutukohinaa kalotin merellä + Pohjois-Grönlannin vaalea vyö; vertailu sekoittunut (eri paketit v1019/v1020) → JU ajaa
verrokin 86916cbd7 nykyisellä paketilla (keha-verrokki/), sitten NS päättää A / B (cbc27f896 = A + KS:n striimi-b 53b307fd3).
Hyväksyntä: ei kehää täysikoossa, avomeri ≤ 2 tasoa, ei rengasta; PT katsoo rajattuna täysikoossa → KK. NS:n luovutus aea8186a2/9334bfa60.

## AJOSSA
- 2.216 KARTTA LUKITTU (omistaja 11.43 + 12.40; Raamattu 2.216 PR 6498 + 6499): NUI kiinteä ladonta 17addbe2d (natiivi-ui/kartta-lukittu-222,
  50200fb68:n päällä) toimii (0 nimieroa 3 suunnasta, Concorde sama kylki). KK 13.25: nähtävyydet ja 3D-kohteet ensin, mallin nimi mallin
  viereen, ei korttia → NUI:n jonon kärki (e95c9eca3/97232e9ee). Uusi pari samalla Invalides-rajauksella → KK. 5°-portaiden sammumiset
  mittauksessa (kartta-lukittu-3 JU:lla). Ei junaan ilman KK:n sanaa.
- NÄHTÄVYYDEN NAPAUTUS (omistaja 11.47 + 11.55 "Lähestyy"; suunnitelma scratchpad/keskustelukanava/suunnitelmat/20261108-nahtavyyden-napautus.md):
  NUI ae84dd1dd kelvoton → c33b2ebd1 + sk-nahtavyysnapautus-2 JU:lla. NS esittelyliike 79f8a637b (koukut NahtavyysEsittely.Kamera/Hiivuta).
  Äänittäjä: Pariisin nostojen luennan 1. pala, kertoo määrän PT:lle ennen generointia. iPad-kuvasarja (Notre-Dame) → KK ennen koeversiota.
- TOPOESITTELYT (omistaja 11.04): video nui-topoesittely-3-79f8a637b/mac lähetetty KK:lle 13.45 (PT katsoi). Haarat natiivi-ui/topoesittelyt-221
  dc3e11279 + natiiviseppa/topo-esittelyt 79f8a637b. Puuttuu: KS ruutukuvat (KS:n luovutuksessa), William-otot (Äänittäjä, SK:n tekstit PR 6497
  cb7f08518: ×15 ja "lähes" poistettu), iPad-ajo. Muut 10 kohdetta vasta pilotin jälkeen.
- MERENPOHJA 3D: koko maailma ämpärissä + CDN ok (KS; julisteet/maasto/2026-11-08-kohokartta-merenpohja/, helma 0 rakoa). NUI vaihtaa
  koeoletuksen 7ea8d6ebc → parit 1–5 (Himalaja, Kuollutmeri, Alankomaat, Kaspia, tallenne) → PT → KK.
- KOHOKARTAN NAPAKALOTIT: KS polttaa atsimutaaliset (Web Mercator loppuu 85°:een → sumea kiekko), NS kytkee. KS:n luovutuksessa.
- FPV-DRONE (omistaja 13.18, 13.22, 13.37; suunnitelma 20261108-fpv-drone-topo.md): 1) NS kuvakoe 2efebff6e Mont Blanc 5 kuvaa JU:lla → PT → KK
  ennen muuta; 2) PK lentomalli puhtaana C#:na (PT antoi PK:lle, NS kiireinen); 3) NUI tikut + ☰; 4) NS kamera/origo/törmäys; 6) JU muisti.
  Radio myöhemmin.
- KORKEUSLIIOITTELU LENNOILLA (omistaja 11.19, koe): NS:n jonossa FPV-kuvakokeen jälkeen; pari 2 | 4 → KK; ei junaan ilman korttia.
- PK: glb-esihaku (lataus −1 s?) FPV-lentomallin rinnalla; hyväksyntä ≥ 0,8 s, muisti ≤ c + 50 Mt. g:n kuolema avoin (TULOS-3).
- Levy: JU siivosi omat laitekäännökset → 57 Gi; käytäntö: käännös pois raportin jälkeen.

## NOLLAUKSET
NS ei nollaudu (2 käskyä); PT käski 13.45 nollaamaan itsensä kehä- ja FPV-raportin jälkeen. NUI, KS, JU, Postivahti, KK, PK nollattu tänään.

## OPIT
- Navan kehä ohitettiin, koska pari katsottiin kokonaisena pienennöksenä: reunat ja saumat rajattuina täysikoossa ennen "ei häivevyötä".
- Suunta-/lippukuvat omistajalle koko ruutuna keskiristillä (KK 13.17; muisti suuntakuvat-koko-ruutu-keskikohta).
- Kertojan tekstiin ei lukuja, jotka ovat yhä omistajan kortilla (×15).

## Lisäys 13.55
- KEHÄ RATKAISTU: NS A = 11b66adc5 junaan 222 (PT katsoi parit3/etela-reuna-verrokki-vasen-A-oikea.png täysikoossa), JU yhdistää → TF:n este poistuu, kun JU kuittaa.
- UUSI: sisältöpaketti v1019 → v1020 (12.32–13.27) toi ruutukohinan kalotin merelle, Pohjois-Grönlannin vaalean vyön ja puuttuvia nimiä/rantaviivoja (myös verrokissa) → JU selvittää kuka/mitä; ei TF:ää ennen selvitystä.
- OMISTAJAN PYYNTÖ 13.44 "Droneen kannattaa etsiä jokin valmis koodi": PK hakee MIT/Apache/BSD (ei GPL, Betaflight GPL-3.0) ja vertaa omaan lentomalliinsa 61fc67ce4 (natiivi-backup pelikoodari/fpv-lentomalli, 13/13 testiä) → valinta PT → KK ennen sovitusta. NS:lle rajapinta kerrottu (osa 4).
- KK 13.47: topovideo omistajalle vasta iPad-ajona Williamin äänen ja ruutukuvien kanssa. KK nollautuu.
