# Amsterdamin 9 tarinapaikkaa dataan, LUONNOS (SK 16.11.2026)

Haara sk/amsterdam-data (origin/main 6034286890 päällä). Ei pushattu, ei PR:ää. KK hyväksyi kohdat 16.11. (Yövartio-piste Trippenhuis, kohdat 8 ja 9 uusina, Timanttihiomo Boas ja 1879, yhden lähteen koordinaatti kelpaa yksiselitteiselle rakennukselle).
Lähde: docs/raportit/amsterdam-9-tarinapaikkaa-dataluonnos-20261116.md (haara origin/sk/amsterdam-tarinapaikat, PR 6881). Tekstit on kopioitu sieltä merkki merkiltä (poimittu koneellisesti). Mitään faktaa, lukua tai superlatiivia ei lisätty omasta päästä.

## Muutetut tiedostot

- js/packs/fokusvirta-amsterdam.js: täkyjen `timantit` ja `voc-hylky` teksti, lähde ja visa; viiden täkynoston lunastus, otsikko/symboli/lähde/kuvatekstit/kysymykset; kaksi uutta täkynostoa (`amsterdamin-portugalilainen-synagoga`, `amsterdamin-montelbaanstoren`).
- js/packs/nahtavyysjutut.js: seitsemän olemassa olevan jutun teksti, `aika`, lähde ja kuvatekstit; kaksi uutta juttua (teksti sama kuin noston).
- js/packs/maakartat.js: kohdekartan 9 riviä (`tarinapaikka: true`, `merkki`, tyyppi), Yövartion piste, kaksi uutta riviä.
- js/packs/miniatyyrit.js: kaksi ämpäritunnusta uusille.
- data/kohdekartat-sijainnit.json: Yövartion rivi uusiksi, kaksi uutta riviä.
- data/aanitysjono.tsv: +35 riviä (`--lisaa`), -18 vanhentunutta riviä (`--siivoa`; PR 6882/6883:n rivit tekstiltä, jotka tämä PR korvaa).
- tests/lehdet.test.mjs: yksi regex (Yövartion alku "Rembrandt valmisti kaartin ryhmäkuvan vuonna 1642."; lehden taidesivu lukee tekstin täkynostosta).
- tests/nostolahteet.test.mjs: lähderivin sallittuun muotoon lisätty "lähteinä <Nimi>" (nimetyt lähteet ilman Wikipediaa; Pariisin ja Lontoon korteissa sama muoto päättyy sanaan Wikipedia).
- docs/raportit/amsterdam-9-mediapyynto-20261116.md: mediapyyntö (2 pakollista kuvaa, 2 miniatyyriä, valinnaiset).

## Kohteittain

| # | Kohde | Merkki | Tyyppi | aika | Mitä muuttui |
|---|---|---|---|---|---|
| 1 | Timanttihiomo | tiimalasi | ilmio | 1870–1879 | Teksti kolmeksi kappaleeksi dokumentin mukaan (Boas ja 1879 näkyvissä, ei Creaa). Visa-fakta lyhennetty dokumentin tekstiin. Täky + juttu. |
| 2 | Amsterdam-laiva | tiimalasi | esine | 1749 | Teksti kolmeksi kappaleeksi. Visa uusittu: 1969-löytötarina (matala vesi vs viemärityömaa) ei ole enää tekstissä, joten uusi kysymys koskee 26.1.1749 rantaan ajamista. |
| 3 | Maitotyttö | lyyra | taide | n. 1660 | Teksti uusi (noin 35 maalausta, "suunnitellut", Six-suku ja Trippenhuis 1873). Symboli silma → kulttuuri. Kuvateksti ilman "keittiöapulaista" ja "keskeisimpiä". |
| 4 | Kissalaiva | tiimalasi | esine | 1966–1968 | Teksti uusi (ei 60 kissaa, ei sataa kilometriä). Symboli elain → historia. Kuvateksti kertoo vuoden 2006 ja että laiva on vanha. Visa-fakta uusi. |
| 5 | Yövartio | lyyra | taide | 1642–1715 | Teksti uusi (Trippenhuis 1873, ei mittoja, ei "kaksi miestä", ei "ainoa todiste"). Piste Trippenhuisiin 52,3712 / 4,8994. Symboli historia → kulttuuri. Visa uusittu (lakka-nimi-yhteys on tulkinta). Lundensin kuvateksti ilman "tärkein todiste". Laudat uusiksi. |
| 6 | Herengracht 537 | tiimalasi | ilmio | 1648–1961 | Teksti uusi (ei suota, ei "jokainen talo", ei 1655, ei 1961-syytä). Otsikko "Keskusta seisoo puutukkien päällä". Symboli tekniikka → historia. Kuvateksti ilman pohjaveden syy-yhteyttä. |
| 7 | Kapein talo | tiimalasi | ilmio | 1738 | Teksti uusi (veroviite pois, Singel 7 -kappale, teekauppa). Otsikko "Kapein koko talo Amsterdamissa". Symboli kaupunki → historia. Visa-kysymys ja fakta uusittu. |
| 8 | Portugalilainen synagoga | tiimalasi | ilmio | 1675 | Uusi täky, kohdekartan rivi, juttu, miniatyyri, sijaintirivi. |
| 9 | Montelbaanstoren | tiimalasi | ilmio | 1606 | Uusi täky, kohdekartan rivi, juttu, miniatyyri, sijaintirivi. |

Rembrandtin talo ja Anne Frankin talo sekä kaupungin muut kohteet ovat ennallaan.

## Avoimet asiat

### Kuvat ja media
- Kaksi uutta korttia viittaa Commons-tiedostoihin, joita ei ole pelin mediassa (kuvamitat.json): `Exterieur OVERZICHT VOORGEVEL - Amsterdam - 20311779 - RCE.jpg` (synagoga) ja `Gezicht op de Montelbaanstoren in Amsterdam, RP-F-F11686.jpg` (torni). Pariisin 7:n mallin mukaan PR pysyy luonnoksena, kunnes kuvat on viety. Ks. docs/raportit/amsterdam-9-mediapyynto-20261116.md.
- Olemassa olevien korttien kuvat ennallaan (kuvia ei lisätty); dokumentin suosittelemat lisäkuvat (mm. Diamantslijperij Boas, Poezenboot 2023, Herengracht 537, Kapein talo OH22) ovat mediapyynnössä valinnaisina. Kapeimman talon nykyinen kuva (hijsbalk, RCE) ei esitä Oude Hoogstraat 22:ta.
- Miniatyyrit kahdelle uudelle kuvaputkelta (ämpäritunnukset miniatyyrit.js:ssä).
- Amsterdam-laivan kuvateksti sanoo yhä, että runko paljastuu "vain poikkeuksellisen matalan veden aikaan" (dokumentti ei listaa tätä virheeksi, mutta vesi-tarina on 1969-kohdan sukua). Jätetty ennalleen.

### Koordinaatit (1 lähde, tarkistettava kuvasta)
- Portugalilainen synagoga 52,3675 / 4,9053 ja Montelbaanstoren 52,3720 / 4,9056: yksi itsenäinen lähde (Wikidata/Wikipedia-koordinaatit eivät ole itsenäisiä). Merkintä koodikommenteissa ja sijaintirivin `lahde`-kentässä.
- Yövartio 52,3712 / 4,8994 (Trippenhuis): KK:n päätös. Timanttihiomo, Amsterdam-laiva, Maitotyttö, Kissalaiva, Herengracht 537 ja Kapein talo: pisteet ennallaan.
- Uusien korttien `laudat`-koordinaatit on laskettu Miller-kaavalla, joka on sovitettu Amsterdamin viiden olemassa olevan kortin laudat-arvoihin (virhe enintään 0,05 yksikköä); Yövartion laudat laskettu samoin uudelle pisteelle. Työkalua ei löytynyt.

### Ääni
- `tarkista.mjs --lisaa`: 35 uutta jonoriviä (7 juttua × 2–3 kappaletta + 7 täkynostoa + 2 täkyä), `--siivoa`: 18 vanhentunutta riviä pois. Jonon tarkistus OK (puuttuvat 133, kaikki jonossa). Äänitystä ei tehty; KK:n hyväksyntä ja riippumaton tarkistus ennen ääntä (lahteet-ja-tarkistus 10).

### Tekstit, jotka dokumentin mukaan vaativat tarkistusta
- Kissalaiva: "laivalla vierailee kerrallaan vain kuusi ihmistä" on ajankohtainen; dokumentin mukaan vierailijoiden varaus päättyi loppuvuonna 2025, tarkistettava ennen ääntä.
- Montelbaanstoren: "Stadswaterkantoor, kaupungin vesikonttori" (KK 16.11. 21.xx: käännös tarkistettu; vain literaalikäännös, ei lisäväitteitä; kuvateksti "isoisän matkan aikoihin").
- Portugalilainen synagoga: "nykyisellä Mr. Visserpleinillä" (aukio nimetty L. E. Visserin (k. 1942) mukaan sodan jälkeen; nimi on myöhempi kuin 1873, KK:n sääntö).
- Kapein talo: hijsbalk ei ole vahvistettu OH22:ssa itsessään (teksti kertoo kanavataloista yleisesti).

### Mitä jäi koskematta (sääntö 11: samat virheet muualla)
- js/packs/kulttuuri-kategoriat.js, Amsterdam-osion lehden nosto "Verotettiinko julkisivun leveydestä?" ja europe-kulttuuri.js:n Kapein talo -kulttuurivisa kertovat yhä veroväitteen legendana (tests/lehdet.test.mjs vaatii visan vastauksen kansisivulta). Kartan Kapein talo -kortti ei enää kerro veroa, joten lehden kansisivun nosto ja kartan nosto eroavat. KK päättää, korjataanko lehden nosto ja visa omana PR:nään.
- js/packs/fokusvirta-amsterdam.js lehtitehtävät `YOVARTIO_VISA` ("kaksi miestä, askelman reuna ja holvikaaren huippu") ja `PAALU_VISA` ("avattiin kaupungintaloksi vuonna 1655") sekä oppitunti (verolegenda, "Miksi tavara kulkee ikkunasta") sisältävät dokumentin "Lehtitekstin korjattavaa" -listan virheitä. Ei kosketa tässä (ei yhdeksän tarinapaikan tekstejä).
- Pulun esigeneroidut vastaukset (NLD.json): sama kuin PR 6882:ssa.
- Takyn `timantit` otsikko "Timanttikaupunki juuri sinä keväänä" ja takyn kommenttilohkot (vanhat faktarivit) ennallaan.

## Testit

Tulokset alla (ajettu viimeisen muutoksen jälkeen).

- `node --test tests/nostot-kartalla.test.mjs tests/lehdet.test.mjs tests/aanitysjono.test.mjs`: läpi.
- Tarinapaikka-, kohdekartta-, nähtävyys-, miniatyyri-, kartta- ja fokusvirtatestit (tarinapaikkojen-merkki, tarinapaikka-symbolit, nahtavyystyypit, miniatyyrit, fokusvirta, nostolahteet jne.): läpi.
- Koko `node --test "tests/*.test.mjs"` (npm test): 5899 testiä, 5880 läpi, 0 virhettä, 19 ohitettu (ohitukset eivät liity tähän PR:ään).
- `node tools/aanitysjono/tarkista.mjs`: ÄÄNITYSJONO OK (puuttuvat 133, kaikki jonossa).

Välivaiheessa kaatui kaksi testiä, jotka on korjattu: lehdet.test.mjs (Yövartion tekstin alku) ja nostolahteet.test.mjs (lähderivin muoto), ks. muutetut tiedostot.

## KK:n lukusana 16.11. (PR 6885)
- Kissalaiva "kuusi kerrallaan": viralliselta sivulta (depoezenboot.nl, visiting-information) enintään 6 kävijää yhtä aikaa; online-varaus päättynyt, kävijät saapuvat ilman varausta. Lause pidetään (yksi lähde, virallinen); tarkistettava ennen ääntä.
- Äänitys vasta KK:n sanalla.
