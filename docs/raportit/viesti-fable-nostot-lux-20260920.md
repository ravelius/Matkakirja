# Viesti Fablelle: Luxemburgin hahmotelmanostot valmiina (vaihe 2 ja 3)

19.9.2026 klo 21.08 Suomen aikaa, Sonnet-sisältösessio "Matkakirja Sonnet nostot",
haara `sonnet-nostot-lux` (pohja origin/main a2acffc2, v1964). Versiota ei nostettu,
PR:ää ei avattu, ämpäriin ei viety, Raamattuun ei koskettu.

**Tulos: 15 nostoa (Fablen hyväksymä lista sellaisenaan, ei korvauksia), 40 Commons-kuvaa, 6 rahavisaa.**
Uusi tiedosto `js/packs/hahmotelma-lux.js` (`HAHMOTELMA_LUX`, rakenne täsmälleen kuin hahmotelma-fra.js ja muut EU-pakat).
Rekisteröinti: `js/fokuskohteet.js` (import + `KOHDE_MAAT.LUX`), `sw.js` SHELL, `tools/build-standalone.mjs`; rivit ovat hahmotelma-dnk-rivien jälkeen (v1964-pohja).
**Pohja on v1964 (ennen v1965:tä)**: v1965 lisäsi BGR-, ROU- ja SVK-rivit samoihin kohtiin, joten LUX-haaran mergessä voi tulla pieni konflikti fokuskohteet.js:ssä, sw.js:ssä ja build-standalone.mjs:ssä: pidä kaikki rivit (tai rebasoin haaran origin/mainin päälle pyynnöstä).
Luxemburgissa ei ole pelikaupunkia eikä yhtään aiempaa nostoa; kaikki 15 ovat uusia.
**Visat ja kuvaselitteet on kirjoitettu uuden visakielisäännön mukaan** (vaihtoehdot lyhyitä, ≤ 40 merkkiä, kysymys ≤ 95 merkkiä, oikea ei selvästi pisin, ei "-malla"; selitteissä ei lähdeviittauksia).

## Etäisyys LUX-renkaaseen

**Kolme kohdetta on karkean renkaan ulkopuolella**: Vianden 0,4, Schengen 0,3 ja Grevenmacher 0,2 lautayksikköä (rengas on yksinkertaistettu; koordinaatit ovat Wikipedian todelliset). Reunalla sisäpuolella Remich 0,4, Echternach 0,6, Mondorf 1,4, Esch 1,5, Beaufort 1,8. Kaikki 15 osuvat Luxemburgin fokuslehteen (`osuuLehteen('LUX')`).

## Nostot, kuvat ja lisenssit

| id | nimi | tyyppi | teksti (merkkiä) | kuvia | tekijät | lisenssit | etäisyys LUX-renkaan reunaan (lautayks.) |
| --- | --- | --- | ---: | ---: | --- | --- | --- |
| clervaux | Clervaux | kulttuuri | 825 | 2 | MMFE, Asurnipal | CC BY-SA 3.0, CC BY-SA 4.0 | 2.7 |
| wiltz | Wiltz | kulttuuri | 601 | 2 | Zinneke, Nicolas Liez | CC BY-SA 3.0, Public domain | 4 |
| vianden | Viandenin linna | historia | 835 | 3 | Jeff Croisé, John Samuel, Michail Jungierek (Michail at de.wikipedia) | CC BY-SA 4.0, CC BY-SA 3.0 | 0.4 (ulkopuolella) |
| echternach | Echternach | historia | 906 | 3 | Marc Ryckaert, Heinrich Stürzl | CC BY 3.0, CC BY-SA 4.0 | 0.6 |
| beaufort | Beaufortin linna | historia | 729 | 3 | Marc Ryckaert, Zinneke, Nicolas Liez | CC BY 3.0, CC BY-SA 3.0 lu, Public domain | 1.8 |
| bourscheid | Bourscheidin linna | historia | 728 | 3 | Photodudau, LBM1948, CV1958 (Colin Viney) | CC BY-SA 4.0 | 3.8 |
| luxembourg | Luxembourgin kaupunki | historia | 898 | 3 | Cayambe, P. Hughes | CC BY-SA 4.0, CC BY-SA 3.0 | 5.1 |
| larochette | Larochette | historia | 670 | 3 | LBM1948, Zinneke | CC BY-SA 4.0, CC BY-SA 3.0 | 4.8 |
| useldange | Useldangen linna | historia | 706 | 2 | Philip Wenger, Cédric Bousmanne | CC BY-SA 3.0 LU, CC BY 2.0 | 5.9 |
| schengen | Schengen | historia | 557 | 3 | Dr. Kerbusch, Cayambe, Cornischong | CC BY-SA 4.0, CC BY-SA 3.0 | 0.3 (ulkopuolella) |
| diekirch | Diekirch | historia | 763 | 3 | Michielverbeek, Palauenc05, frozgard | CC BY-SA 4.0, CC BY-SA 2.0 | 2.6 |
| remich | Remich | ruoka | 725 | 2 | Henk Monster, Denise Hastert | CC BY 3.0, CC BY-SA 4.0 | 0.4 |
| grevenmacher | Grevenmacher | ruoka | 335 | 2 | Hejnjahns, Dguendel | CC BY-SA 4.0, CC BY 4.0 | 0.2 (ulkopuolella) |
| esch | Esch-sur-Alzette | tekniikka | 749 | 3 | Zinneke | CC BY-SA 3.0, CC BY-SA 3.0 lu | 1.5 |
| mondorf | Mondorf-les-Bains | kulttuuri | 758 | 3 | PlayMistyForMe at Luxembourgish Wikipedia, Christian Ries, Wilrooij | CC BY-SA 3.0 lu, CC BY-SA 3.0, CC BY-SA 4.0 | 1.4 |

Kuvia yhteensä 40; lisenssijakauma: CC BY-SA 4.0 16, CC BY-SA 3.0 11, CC BY 3.0 4, CC BY-SA 3.0 lu 3, Public domain 2, CC BY-SA 3.0 LU 1, CC BY 2.0 1, CC BY-SA 2.0 1, CC BY 4.0 1.

## Rahavisat (6 noston kenttä `visa`, muoto kuten NLD:ssä ja fokusvirta-*.js:ssä)

Neljä vaihtoehtoa, oikea-indeksit 2,0,1,0,2,3, vastaus noston omasta tekstistä; `fakta` on yksi virke. Tyypit: historia ×3, ruoka ×1, tekniikka ×1, kulttuuri ×1.

| nosto | tyyppi | kysymys | oikea |
| --- | --- | --- | --- |
| vianden | historia | Minä vuonna kuningas Vilhelm I myi Viandenin linnan? | 1820 (2) |
| echternach | historia | Kuka perusti Echternachin luostarin vuonna 698? | Willibrord (0) |
| luxembourg | historia | Minä vuonna Lontoon sopimus määräsi linnoituksen purettavaksi? | 1867 (1) |
| remich | ruoka | Minä vuonna Remichiin rakennettiin ensimmäinen silta Moselin yli? | 1866 (0) |
| esch | tekniikka | Milloin Eschin seudulta löytyi runsaasti rautamalmia? | 1850-luvulla (2) |
| mondorf | kulttuuri | Minä vuonna Mondorfin kylpylä vihittiin käyttöön? | 1847 (3) |

## Koneellinen tarkistus (vaihe 3)

| Mittari | Tulos |
| --- | --- |
| Nostoja | 15 |
| Teksti ≥ 200 merkkiä | 15/15 (335–906 merkkiä) |
| `lahde`-rivi (artikkeli + 19.9.2026) | 15/15 |
| 2 kysymystä pululle | 15/15 |
| ≥ 2 kuvaa | 15/15 (kolme kuvaa kymmenellä: Vianden, Echternach, Beaufort, Bourscheid, Luxembourg, Larochette, Schengen, Diekirch, Esch, Mondorf; muilla kaksi) |
| Kuvan kentät (osoite, lyhyt, selite, lahde, tekija, lahdeUrl, lisenssi, lisenssiUrl) | 40/40 |
| Lisenssi kelvollinen (PD / CC0 / CC BY / CC BY-SA) | 40/40; **luettu uudelleen Commonsin extmetadata-rajapinnasta erikseen** (4 rinnakkain) |
| Kuvatiedostot olemassa, sha256-etuliite = tiedostonimen tunniste | 40/40 |
| Korostukset löytyvät tekstistä | 15/15 |
| Fokuslehden rajaus (`osuuLehteen('LUX')`) | 15/15 |
| Karttarivi pelin omalla passilla (`nostojenKarttapaikat`) | 15/15 pääkartalla, ei pelikaupunkia, ei nykyisiä LUX-nostoja |
| Nostot keskenään (lautayks.) | ≥ 3,1 (Schengen – Mondorf 3,1, Bourscheid – Diekirch 3,1, Beaufort – Larochette 3,2, Remich – Schengen 3,2); Fable hyväksyi |
| Naapurimaiden nostot rajan takana | Wiltz – BEL Bastogne 6,8 (eri maa), Clervaux – Bastogne 9,9; muut ≥ 12 |
| Visat: 4 vaihtoehtoa, oikea-indeksi kelvollinen, ei kaksoisvaihtoehtoja, oikea ei selvästi pisin, vaihtoehdot ≤ 40 merkkiä, kysymys ≤ 95 merkkiä, ei "-malla" | 6/6 |
| `node --test tests/*.test.mjs` | # tests 3707, # pass 3694, # fail 0, # skipped 13 (myös `tests/nimiolimitys.test.mjs`: ei nimiö–nimiö-limityksiä, joten `nimio`-kenttää ei tarvittu) |
| `node tools/tarkista-kaksoisavaimet.mjs` | ei kaksoisavaimia |

## Poikkeamat ja päätettävää (lähdesääntö: jos artikkeli ei tue listan väitettä, tyyppi/teksti vaihdettu ja kirjattu)

1. **Listan väitteet, joita artikkelit eivät tue**: Diekirchin olutpanimo (1871) on artikkelissa vain "kansallisesti merkittävä panimo", ei vuotta; Clervaux'n luostari on artikkelin mukaan perustettu 1890 Ranskassa ja rakennettu Clervaux'hon 1909–1910 (ei "1909" perustamisvuotena); Mondorfin kylpylä 1847 ja saksalaisten miehitys 1871 ovat artikkelissa (nappi käyttää molempia). **Diekirch** tyyppi `historia` (listassa `kauppa`), koska panimosta on vain yksi virke ja artikkelin sisältö on kaupungin historiaa. **Clervaux** lähteinä kolme artikkelia (luostari, kaupunki, Éislek).
2. **Ardennien taistelu 1944 (Wiltz, Clervaux, Diekirch, Vianden)**: jätetty pois teksteistä ja kuvista (ei sotamuistomerkkejä, ei museoiden aseita, ei hautausmaita); teksteissä kerrotaan vain linnat, luostarit ja kaupunkien historia ennen sotaa.
3. **Grevenmacher**: en-artikkeli on lyhyt (1 745 merkkiä), teksti 335 merkkiä (neljä virkettä). Bernard-Massard-kuohuviini ei ole artikkelissa, joten sitä ei mainita.
4. **Müllerthal ja Ösling** kerrotaan Echternachin (Pikku-Sveitsi) ja Clervaux'n (Éislek) teksteissä, kuten listassa.
5. **Kuvat**: ei tunnistettavia yksityishenkilöitä; **Wiltzin** toinen kuva on Nicolas Liezin vanha piirros linnasta (PD), **Beaufortin** kolmas on saman tekijän piirros (PD). **Viandenin** kolmas kuva on Victor Hugon talo (rakennus). **Luxembourgin** kuvat: Grund Cornichelta, Adolphe-silta ja näkymä Bockin kasematteilta. Remichin kuvasta hylätty Esplanade-patsaskuva (alastomat patsaat) ja Mondorfista kylpytakkikuva (ihmiset lähikuvassa). Kolmen kuvan lisenssinimi on Commonsin oma "CC BY-SA 3.0 LU" (Useldange, Beaufort) tai "3.0 lu" (Esch, Mondorf); lisenssiUrl on Commonsin antama. Suurin osa kuvista on 1800–1920 px; Bourscheidin pääkuva 1500 px.
6. **1873-näkökulma**: Wiltz (linna tyttökouluna 1851–1950), Vianden (myyty ja purettu 1820, Victor Hugo 1871), Echternach (posliinitehdas luostarissa, rautatie tuo matkailijat), Beaufort (kansallismuistomerkki 1850), Luxembourg (linnoituksen purku käynnissä, Lontoon sopimus 1867), Remich (ensimmäinen silta 1866), Esch (rautamalmi 1850-luvulla), Mondorf (ranskalaisvieraat pois 1871), Schengen ("vasta 1985"), Bourscheid (kappeli romahtanut, purkamisesta puhuttu), Larochette (kutomot), Clervaux (luostari vasta 1909–10).

## Mitä jäi tekemättä

- **Kuvien vienti ämpäriin** (Fable): 40 tiedostoa kansiosta
  `/Users/samireivinen/Matkakirja-nostot-kuvat/lux/` osoitteeseen
  `https://media.matkakirja.app/karttanostot/20260920/<tiedosto>`; osoitteet on kirjattu pakkaan
  etukäteen, ennen vientiä ne vastaavat 404:llä (puuttuva kuva pudotetaan sarjasta). Kuvia ei ole
  committoitu. JSON-metatiedot ovat kansiossa `_json/`.
- HEAD-tarkistus ämpäriosoitteille (vasta viennin jälkeen).
- Luxemburgin nostoankkureita ei ole lukittu (`LUKITUT_MAAT` on vain FRA). Renkaan ulkopuoliset Vianden, Schengen ja Grevenmacher jäävät ankkurilukon varaan.
- Peliä ei avattu selaimessa; piirto todettu samalla reitillä kuin hahmotelma-fra.js (KOHDE_MAAT) ja testit ovat vihreitä.
- Silmäpistokoe: itse en katsonut yksittäisiä kuvia; kolme Sonnet-kuva-agenttia katsoi jokaisen ja listasi hylätyt ehdokkaat.
- Visat: vastauksen esiintyminen tekstissä tarkistettu käsin, ei koneellisesti.

## Kuvat ja kansio

`/Users/samireivinen/Matkakirja-nostot-kuvat/lux/`: 40 kpl `lux-nosto-<id>-<sha8>.jpg`, alikansio
`_json/` (kuvatiedot kohteittain).
