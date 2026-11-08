# PT:n luovutus 8.11.2026 klo 10.10 (konteksti 30 %, pehmeä raja)

Korvaa -20261108-0120:n JUNA-, PÄÄTÖKSET- ja AJOSSA-kohdat; aiempien OPIT voimassa. Viestit send_messagella session id:llä (osoitekirja). Työlista: tyolista.py (ÄLÄ käytä --juna; se kirjoittaa junariville ja tukkii TF-rivin) ja junarivit juna.py:llä.

## JULKAISTU
- TF 1.1 (221) = 52e73d18b, sisäisillä 09.43 (ilman kohokarttaa).
- TF 1.1 (222) = 5d6967444 = 221 + kohokartta v5 (kytkin, valinta muistetaan, jäät ruskeat, ei t6, ei painumaa), sisäisillä 10.05. KK kertoi omistajalle. Asemataulu: TF 221 -rivi kirjattu 10.05 (junarivi siivottu 13 kohtaan).
- Seuraava juna 222 (natiivi-backup julkaisija/juna-221 kärki 5d6967444 on pohja).

## OMISTAJAN PÄÄTÖKSET 8.11. (kaikki välitetty)
- 02.0x keisari 22dc4c06b → junassa. 02.07 vaihe 1 + ASTC → junassa.
- 08.13 merenpohja t6 koko maailmaan (KS); 08.13/08.14 merenpohja painuu 3D:nä vain kohokartassa (KK:n suunnitelma scratchpad/keskustelukanava/suunnitelmat/20261108-merenpohja-3d.md, jaettu 5 roolille).
- 08.19 striimi-karkea koko peliin; ehto: aloituslento iPadilla, jos yhä tarkentuu → lukitus napautushetken tasoon.
- 08.23/08.38 kevyt ilmaperspektiivi → junassa. 08.24 vesi selvemmäksi (VS). 08.26 jääkilvet valkoisiksi (KS). 08.28 puut → junassa. 08.29 lähialue-1 → junassa.
- 08.40 → 09.24 → 09.39: TF heti valmiilla + kohokartta ilman uutta merta (tehty 222:na).

## AJOSSA (juna 222:een, PT:n kuittauksella)
- MERENPOHJA 3D: junahaara VS 97b4f29a9 (linssiseppa2/merenpohja-221 = NUI 20045ae66 + NS 6ab673093 + avainsana _MERI_PAINUU multi_compile_vertex; pois = tavulleen ennallaan). NUI vahvisti sisällön; 7626170dd ja 465243714 EIVÄT junaan. Rebase 5d6967444:n päälle tarvitaan. JU:lla: Mac pohja/pohja-b/haara + iPad sk-meripainuu-ipad. PUUTTUU: KS:n koealueen maasto (uusi KS aloittaa luovutuksesta 295a0d701, osa 1) → JU vienti → parit 1–5 PT:n kautta KK:lle → koko maailma. PT:n tarkistukset: Himalaja, Kuollutmeri, Alankomaat, Kaspia, tallenne. Montmartre-kieleke (koho×15 kaupunkitasolla) KK:lla omistajan arvioon.
- KS kohokartta v6 (meri t6 + valkoiset jäät) laatat valmiit _tyo/karttaseppa-kohokartta-laatat/v6, katsomatta → KS:n seuraaja: parit KK:lle + PT.
- NS striimi-karkea: 229bcd4c4 + c6e63f80a (kooste taustasäikeissä), uusinta 2 (n2|j2 kylmä) JU:lla. Jos käytävä < 100 % → esilämmitys; jos yhä tarkentuu → lukitus (vasta terävän tason jälkeen). Pari KK:lle, sha JU:lle vasta PT:n sanalla. Rebase 5d6967444:n päälle.
- NUI puuvika (omistaja 09.49 TF 221 "puut liikkuvat tai sammuvat panoroidessa"): omistajan kahdessa kuvassa EI eroa täysikoossa (PT erehtyi pienennöksestä); epäily: puulista rakennetaan uudelleen 2 %:n kameran siirron jälkeen → ponnahdus. Diagnoosiajo sk-puut-panorointi-1 JU:lla → korjaus + pari KK:lle ennen seuraavaa TF:ää.
- VS vesi selvemmäksi: kimallus 90374f5c6 JU:n jonossa; kauko-beige oli vain Macin 640×480 -tasoista.
- PK juoksupelin lataus: c (CPU-kopiot rinnalla) kuitattu oletukseksi 10.1x (−4,6 s, +72 Mt), b pois; esipurku 688f77b3e (e+d) JU:lla → yhdistelmä yhdellä iPad-ajolla → PT kuittaa junaan 222.
- KS lähialue, puut, ilma ym. ovat junassa; Lontoon maanpinta a7ad5fc24 koe (ei junaan ilman korttia).

## MUISTI
Juna 221 iPadilla Pariisissa huippu 3312–3322 Mt (varaa ~770 Mt 4080:een). Kohokartta v5-4 huippu 3052. Juoksupelin fp-mittari > 4080 jo ennen muutoksia (ei kaatoraja).

## OPIT
- Katso kuvat täysikoossa ennen kuin väität eroa (pienennös harhautti PT:tä ja KK:ta puuvikassa).
- Rinnakkaiset yhdistykset: nimeä yksi yhdistäjä heti ja kerro muille, muuten syntyy 2–3 kilpailevaa haaraa (merenpohja).
- tyolista.py --juna kirjoittaa junariville; älä käytä, junarivi vain juna.py lisaa/valmis.
- Varjostimen "pois = ennallaan" vaatii avainsanan (multi_compile), ei float-ehtoa.

## Lisäys 11.04 (10.15 jälkeen jaetut; kaikki myös työlistassa)
- OMISTAJAN PÄÄTÖS 10.32: lippu striimikartalla takaisin 4.42:n mukaiseksi → NUI jonon kärki (NUI:n luovutus 2fabbbc7c, Postivahdin aloitusviesti). Pari KK:lle keski/ala/reuna/käännetty.
- OMISTAJAN PÄÄTÖS 10.34: napa-alueet molemmat navat (meri sininen napaan, Etelämanner kartan tyyliin, ei sumeaa vyötä). NS korjasi kohokartan ca92af647 (natiiviseppa/navat-koho); tavallinen kartta NS-seuraajan kärjessä (9cbfbf9b6). iPhone-pari JU:lla → KK.
- OMISTAJAN PYYNTÖ 10.36 + PÄÄTÖS 10.38 (kohokartta topolinssin oletukseksi): VS sinertävä ilma (b799339cf) ja rae; NUI kallistus 90°, oletus koho, kytkin ☰:n sisään, Topografialinssissä yläpalkki piiloon ja ☰ oikeaan yläkulmaan. NUI-järjestys: lippu → kohokartta → merenpohja. Pari KK:lle Borneo 60/90, Alpit, kytkin; iPhone + iPad.
- 10.39 topokohteiden esittelyt: odottaa KK:n suunnitelmaa ja korttia, ÄLÄ jaa.
- Merenpohja 3D: KS osa 1 b300a8b68, KK hyväksyi kentän → koko maailma poltossa helmakorjauksella (--naytetaso 9, 0 rakoa), JU vie UUTEEN kansioon. Ämpärin 2026-11-08-kohokartta-merenpohja-koe on vanhaa polttoa: NUI:n koeoletus 7ea8d6ebc (natiivi-ui/merenpohja-koe) vaihdetaan uuteen osoitteeseen ennen pareja 1–5. VS: syvyyden korostus varjostimessa vain kohokartan lipulla (mahd. puristus varjostimessa, ei datassa). NS: PalloReiat 11 km oli jo 51b0d3588. Parit 1–5 KK:lle, kun VS/NS/NUI valmiit.
- NUI puuvika 50200fb68 (natiivi-ui/puut-nimet-221): puut nimien alle, pari JU:lla → KK.
- NS aloituslento 46d34ca4f, uusinta 3 (j3) JU:lla; ei junaan ennen kuin a:n etuala terävä.
- KS kohokartta v6 kuitattu; Etelämantereen täplät: ei toimia (KK).
- JU uusi luovutus 3fe1cc6ce (-1045).

## Lisäys 11.10 (korvaa yllä olevan "ÄLÄ jaa")
- OMISTAJAN PÄÄTÖS 11.04: esittelyjen kertoja William, 12 kohteen lista ok. Pilotti Alpit + Himalaja JAETTU: KS kohdelista ja ruudut (merenpohjan jälkeen), NS suunta + osittainen kierto (vahvistaa 2.69 vs 4.24), NUI ☰ › Esittelyt (lipun ja 10.36/10.38:n jälkeen), VS valo. SK-tekstit ja Äänittäjän William-otot: ei käynnissä olevaa sessiota, kysytty KK:lta saako käynnistää. Suunnitelma scratchpad/keskustelukanava/suunnitelmat/20261108-topokohteiden-esittelyt.md. M-kohteet merenpohjan jälkeen.
