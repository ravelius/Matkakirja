# Viesti Fablelle: Slovakian hahmotelmanostot valmiina (vaihe 2 ja 3)

19.9.2026 klo 20.51 Suomen aikaa, Sonnet-sisältösessio "Matkakirja Sonnet nostot",
haara `sonnet-nostot-svk` (pohja origin/main 7c23d6d2, v1963). Versiota ei nostettu,
PR:ää ei avattu, ämpäriin ei viety, Raamattuun ei koskettu.

**Tulos: 27 nostoa (Fablen hyväksymä lista sellaisenaan, ei korvauksia), 62 Commons-kuvaa, 10 rahavisaa.**
Uusi tiedosto `js/packs/hahmotelma-svk.js` (`HAHMOTELMA_SVK`, rakenne täsmälleen kuin hahmotelma-fra.js ja muut EU-pakat).
Rekisteröinti: `js/fokuskohteet.js` (import + `KOHDE_MAAT.SVK`), `sw.js` SHELL, `tools/build-standalone.mjs`; rivit ovat hahmotelma-dnk-rivien jälkeen (v1963-pohja), joten IRL/HRV/BGR-haarojen kanssa mergekonflikti on pieni: pidä kaikki rivit.
Slovakiassa ei ole pelikaupunkia eikä yhtään aiempaa nostoa; kaikki 27 ovat uusia.
**Visat on kirjoitettu jo uuden visakielisäännön mukaan** (vaihtoehdot 1–5 sanaa, ≤ 40 merkkiä, kysymys ≤ 95 merkkiä, oikea ei selvästi pisin, ei "-malla"), ja kuvaselitteissä ei ole lähdeviittauksia.

## Etäisyys SVK-renkaaseen

**Yksi kohde on karkean renkaan ulkopuolella**: Skalica 0,2 lautayksikköä (rengas on yksinkertaistettu; koordinaatit ovat Wikipedian todelliset). Reunalla sisäpuolella Poloniny 2,4, Bratislava 2,7, Stará Ľubovňa 2,8, Trenčín 5,2, Terchová 5,5, Bardejov 5,7. Kaikki 27 osuvat Slovakian fokuslehteen (`osuuLehteen('SVK')`).

## Nostot, kuvat ja lisenssit

| id | nimi | tyyppi | teksti (merkkiä) | kuvia | tekijät | lisenssit | etäisyys SVK-renkaan reunaan (lautayks.) |
| --- | --- | --- | ---: | ---: | --- | --- | --- |
| tatranska-lomnica | Tatranská Lomnica | vuori | 734 | 2 | Michal Klajban, Totalrandomphotos | CC BY-SA 3.0, CC BY-SA 4.0 | 6.7 |
| dobsinska-jaaluola | Dobšinská jääluola | vuori | 722 | 2 | Margoz | CC BY-SA 4.0 | 15.5 |
| ochtinska | Ochtinská aragoniittiluola | vuori | 700 | 2 | Jojo, en:Jojo_1, pl:Jojo | CC BY-SA 3.0 | 8.4 |
| poloniny | Poloninyn kansallispuisto | vuori | 646 | 3 | Caroig, Richard Orr at English Wikipedia, Milan Bališin | CC BY-SA 3.0, Public domain, CC BY-SA 4.0 | 2.4 |
| zemplinska-sirava | Zemplínska šírava | jarvi | 459 | 2 | Ing.Mgr. Jozef Kotulič, Milan Bališin | CC BY-SA 4.0 | 9 |
| spis | Spišin linna | historia | 823 | 2 | Ingo Mehling, Draceane | CC BY-SA 4.0 | 14.7 |
| banska-stiavnica | Banská Štiavnica | tekniikka | 870 | 2 | Adrian Tync, Mineralysk | CC BY-SA 4.0 | 17.3 |
| kremnica | Kremnica | kauppa | 643 | 3 | Palickap, Ladislav Luppa, Peko | CC BY-SA 4.0, CC BY-SA 3.0 | 27.5 |
| bojnice | Bojnicen linna | historia | 735 | 2 | Pudelek, visamatti | CC BY-SA 3.0, CC BY-SA 2.0 | 20.4 |
| orava | Oravan linna | historia | 747 | 2 | Lynx1211 | CC BY-SA 4.0 | 9.2 |
| trencin | Trenčín | historia | 817 | 3 | Ingo Mehling, Scotch Mist, Qasinka | CC BY-SA 4.0, CC0 | 5.2 |
| bratislava | Bratislava (Pozsony) | historia | 928 | 2 | Uoaei1 | CC BY-SA 4.0 | 2.7 |
| kosice | Košice (Kassa) | historia | 803 | 2 | Ingo Mehling, Ladislav Luppa | CC BY-SA 3.0, CC BY-SA 4.0 | 8 |
| bardejov | Bardejov | historia | 692 | 3 | Michał Rawlik, Ingo Mehling, Lure | CC BY-SA 4.0, CC BY-SA 3.0 | 5.7 |
| nitra | Nitra | historia | 678 | 3 | Ingo Mehling, Xmetov, Ladislav Luppa | CC BY-SA 4.0, CC BY-SA 3.0 | 22.7 |
| trnava | Trnava | historia | 738 | 3 | Juraj76, Kiwiev | CC BY-SA 4.0, CC0 | 18.8 |
| zvolen | Zvolenin linna | historia | 870 | 2 | Martinlv, Ladislav Luppa | CC BY-SA 4.0 | 21.1 |
| smolenice | Smolenicen linna | historia | 656 | 2 | Ingo Mehling, Draceane | CC BY-SA 4.0 | 13.5 |
| stara-lubovna | Stará Ľubovňa | historia | 794 | 3 | Miro Svorc, Jerzy Opioła, Peter ivancik | CC BY-SA 3.0, CC BY-SA 4.0 | 2.8 |
| vlkolinec | Vlkolínec | kulttuuri | 665 | 3 | Mineralysk, Pudelek (Marcin Szala) | CC BY-SA 4.0, CC0 | 16.1 |
| cicmany | Čičmany | kulttuuri | 628 | 2 | Pudelek, 10ricardo | CC BY-SA 4.0 | 15.1 |
| terchova | Terchová | kulttuuri | 639 | 2 | young shanahan, Schliemann | CC BY 2.0, CC BY-SA 3.0 | 5.5 |
| liptovsky-mikulas | Liptovský Mikuláš | kulttuuri | 805 | 2 | Paweł Kuźniar (Jojo_1, Jojo), SchiDD | CC BY-SA 3.0, CC BY-SA 4.0 | 7.4 |
| piestany | Piešťany | kulttuuri | 834 | 2 | Bjalek Michal, MOs810 | CC BY-SA 3.0, CC BY-SA 4.0 | 13.4 |
| skalica | Skalica | ruoka | 676 | 2 | Pe3kZA, LadislavMiko | CC BY-SA 4.0 | 0.2 (ulkopuolella) |
| topolcianky | Topoľčianky | historia | 692 | 2 | Peter ivancik, Jana vargova | CC BY-SA 4.0, CC BY-SA 3.0 | 21.8 |
| martin | Martin | kulttuuri | 754 | 2 | Matica slovenská, tuntematon | CC BY-SA 4.0, Public domain | 14.3 |

Kuvia yhteensä 62; lisenssijakauma: CC BY-SA 4.0 40, CC BY-SA 3.0 14, CC0 4, Public domain 2, CC BY-SA 2.0 1, CC BY 2.0 1.

## Rahavisat (10 noston kenttä `visa`, muoto kuten NLD:ssä ja fokusvirta-*.js:ssä)

Neljä vaihtoehtoa, oikea-indeksit 0,2,0,3,0,1,1,1,2,3 (tasainen), vastaus noston omasta tekstistä; `fakta` on yksi virke. Tyypit: vuori ×2, tekniikka ×1, kauppa ×1, historia ×4, kulttuuri ×1, ruoka ×1.

| nosto | tyyppi | kysymys | oikea |
| --- | --- | --- | --- |
| tatranska-lomnica | vuori | Minä vuonna Lomnický štítille tehtiin ensimmäinen kirjattu nousu? | 1793 (0) |
| dobsinska-jaaluola | vuori | Minä vuonna Dobšinská jääluola löydettiin? | 1870 (2) |
| banska-stiavnica | tekniikka | Minä vuonna Banská Štiavnicassa perustettiin Unkarin ensimmäinen kaivoskoulu? | 1735 (0) |
| kremnica | kauppa | Mikä ainutlaatuinen asema Kremnican rahapajalla on? | Vanhin yhä toimiva (3) |
| bratislava | historia | Kuinka kaukana Bratislava on Wienistä? | 50 kilometriä (0) |
| kosice | historia | Mitä ensimmäistä Košicen kerrotaan olleen Euroopassa? | Oma vaakuna (1) |
| trnava | historia | Minä vuonna Trnava sai ensimmäisenä nykyisen Slovakian kaupunkina kaupunkioikeudet? | 1238 (1) |
| stara-lubovna | historia | Kuinka kauan Spišin kaupungit olivat Puolan hallussa pantteina? | 360 vuotta (1) |
| piestany | kulttuuri | Minä vuonna Piešťanyn ensimmäiset kylpylärakennukset rakennettiin? | 1778 (2) |
| skalica | ruoka | Mistä trdelník-leivonnaisen alkuperä on? | Transilvania (3) |

## Koneellinen tarkistus (vaihe 3)

| Mittari | Tulos |
| --- | --- |
| Nostoja | 27 |
| Teksti ≥ 200 merkkiä | 27/27 (459–928 merkkiä) |
| `lahde`-rivi (artikkeli + 19.9.2026) | 27/27 |
| 2 kysymystä pululle | 27/27 |
| ≥ 2 kuvaa | 27/27 (kolme kuvaa kahdeksalla: Poloniny, Kremnica, Trenčín, Bardejov, Nitra, Trnava, Stará Ľubovňa, Vlkolínec; muilla kaksi) |
| Kuvan kentät (osoite, lyhyt, selite, lahde, tekija, lahdeUrl, lisenssi, lisenssiUrl) | 62/62 |
| Lisenssi kelvollinen (PD / CC0 / CC BY / CC BY-SA) | 62/62; **luettu uudelleen Commonsin extmetadata-rajapinnasta erikseen** (4 rinnakkain) |
| Kuvatiedostot olemassa, sha256-etuliite = tiedostonimen tunniste | 62/62 |
| Korostukset löytyvät tekstistä | 27/27 |
| Fokuslehden rajaus (`osuuLehteen('SVK')`) | 27/27 |
| Karttarivi pelin omalla passilla (`nostojenKarttapaikat`) | 27/27 pääkartalla, ei pelikaupunkia (`kaupunginKohdalla` ei sovellu), ei nykyisiä SVK-nostoja |
| Nostot keskenään (lautayks.) | ≥ 7,8 (pienin Bojnice – Čičmany ja Trnava – Smolenice 7,8; Kremnica – Zvolen 8,8) |
| Naapurimaiden nostot rajan takana | Tatranská Lomnica – POL Rysy 6,5 (Fable hyväksyi), Bratislava – AUT Carnuntum 8,4, Stará Ľubovňa – POL Dunajec-rotko 9,5, Poloniny – POL Tarnica 10,5, Ochtinská – HUN Aggtelek 11,1 |
| Päällekkäisyys muiden maiden nostojen kanssa | ei samoja id:itä eikä nimiä |
| Visat: 4 vaihtoehtoa, oikea-indeksi kelvollinen, ei kaksoisvaihtoehtoja, oikea ei selvästi pisin, vaihtoehdot ≤ 40 merkkiä, kysymys ≤ 95 merkkiä, ei "-malla" | 10/10 |
| `node --test tests/*.test.mjs` | # tests 3707, # pass 3694, # fail 0, # skipped 13 (myös `tests/nimiolimitys.test.mjs`: ei nimiö–nimiö-limityksiä) |
| `node tools/tarkista-kaksoisavaimet.mjs` | ei kaksoisavaimia |

## Poikkeamat ja päätettävää (lähdesääntö: jos artikkeli ei tue listan väitettä, tyyppi/teksti vaihdettu ja kirjattu)

1. **Tatranská Lomnica**: en-artikkeli on tynkä (1 virke, 166 merkkiä), joten sisältö on kirjoitettu Vysoké Tatry- ja Lomnický štít -artikkeleista (`lahde`-rivillä kolme lähdettä). Listan väite "matkailu alkaa 1870-luvulla" ei ole näissä, joten nappi käyttää artikkelin tosiasiaa (ensimmäinen kirjattu nousu Lomnický štítille 1793, 80 vuotta ennen 1873). **Zemplínska šírava**: artikkeli on 673 merkkiä, teksti 459 merkkiä.
2. **Listan väitteet, joita artikkelit eivät tue**: Banská Štiavnican akatemia on artikkelin mukaan 1735 (koulu) / 1763 (akatemia) / 1848 (kaivos- ja metsäakatemia), ei 1762; **Topoľčianky**: en-artikkeli kertoo visentin suojelualueesta ja Masarykin lomasta linnassa, ei hevostilasta (tekstissä ei hevosia); **Skalica**: trdelník on artikkelin mukaan Transilvaniasta; Trenčínin kalliokirjoitus 179 ja Trnavan yliopisto 1635–1777 sekä kaupunkioikeudet 1238 ovat artikkelissa; **Levoča** mainitaan vain Spišin museon sijaintina Spišin tekstissä.
3. **Herkät aiheet**: Jánošíkin teloitus 1713 mainitaan Liptovský Mikulášin tekstissä vain tosiasiana (ei tapaa); Terchovan teksti kertoo hänet legendaarisena Robin Hoodina. Vukovarin kaltaisia sotakohteita ei ole; 1944-kansannousu (Banská Bystrica) jätetty pois.
4. **1873-näkökulma**: Pozsony ja Kassa (nappi), Dobšinská jääluola löydetty 1870 ja avattu 1871 (nappi: "kolme vuotta sitten"), Bojnice (jälleenrakennus alkaa vasta 1888), Čičmany (tulipalo vasta 1921), Vlkolínec (liitetään Ružomberokiin 1882), Martin (kirjapainot 1869, Matica slovenská), Liptovský Mikuláš (teatteri 1830, Štúr 1848), Stará Ľubovňa (Spišin kaupunkien pantti Puolalle 1412–1772), Smolenice (raunio, uusi linna vasta 1900-luvulla), Zemplínska šírava (tekojärveä ei ole vielä).
5. **Kuvat**: ei tunnistettavia yksityishenkilöitä (agenttien ohje ja silmäys; pienet etäiset ihmiset Terchovan, Skalican, Topoľčiankyn ja Piešťanyn kuvissa). **Terchovan** toinen kuva on Jánošík-patsas kukkulalla (pystykuva). **Trenčínin** kolmas kuva on roomalaiskirjoitus (CC0; sen lisenssiUrl on Commonsin `http://creativecommons.org/publicdomain/zero/1.0/deed.en`). **Martin**: Matica slovenskán vanha valokuva (PD, ennen 1900) ja nykyinen rakennus (CC BY-SA 4.0). **Skalican** kirkkokuva on voimakkaasti HDR-käsitelty. **Stará Ľubovňan** vanhastakaupungista ei löytynyt kuvaa (linna ja skanzen). Lähes kaikki kuvat ovat 1920 px leveitä (Commonsin vakiokoko); pienempiä: Stužica 1280, Bardejovin muuri 1280, Matican nykyrakennus 1500, Vlkolínec jar 01 1800.
6. **Kuvaselitteet**: neljästä selitteestä poistettu lähdeviittaus ennen rakennusta ("Kuvauksen mukaan", "Kuvan otsikko"), joten selitteissä ei ole lähdeviittauksia.

## Mitä jäi tekemättä

- **Kuvien vienti ämpäriin** (Fable): 62 tiedostoa kansiosta
  `/Users/samireivinen/Matkakirja-nostot-kuvat/svk/` osoitteeseen
  `https://media.matkakirja.app/karttanostot/20260920/<tiedosto>`; osoitteet on kirjattu pakkaan
  etukäteen, ennen vientiä ne vastaavat 404:llä (puuttuva kuva pudotetaan sarjasta). Kuvia ei ole
  committoitu. JSON-metatiedot ovat kansiossa `_json/`.
- HEAD-tarkistus ämpäriosoitteille (vasta viennin jälkeen).
- Slovakian nostoankkureita ei ole lukittu (`LUKITUT_MAAT` on vain FRA). Skalica renkaan ulkopuolella jää ankkurilukon varaan.
- Peliä ei avattu selaimessa; piirto todettu samalla reitillä kuin hahmotelma-fra.js (KOHDE_MAAT) ja testit ovat vihreitä.
- Silmäpistokoe: itse en katsonut yksittäisiä kuvia; viisi Sonnet-kuva-agenttia katsoi jokaisen ja listasi hylätyt ehdokkaat.
- Visat: vastauksen esiintyminen tekstissä tarkistettu käsin, ei koneellisesti.

## Kuvat ja kansio

`/Users/samireivinen/Matkakirja-nostot-kuvat/svk/`: 62 kpl `svk-nosto-<id>-<sha8>.jpg`, alikansio
`_json/` (kuvatiedot kohteittain).
