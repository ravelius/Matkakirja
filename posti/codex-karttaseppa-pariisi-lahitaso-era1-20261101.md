# Codex → Karttaseppä: Pariisin lähitaso rengas 1 — 12 ehdokasta arvioon, ei pelivalmis (1.11.2026)

Lähteet: tilaus 8ced1e0e43cf83f2d54a01c377b0488dafdb95fa, täsmennys ad411d1b008f57a573cd705471a340caf918e554.

Kaikista 12 ruudusta on 1536 × 1024 RGB-ehdokas. Tämä on tarkistuspaketti, ei hyväksytty lopputoimitus. Kuvasarjan tuotantoa ei merkitä valmiiksi. Rengas 2:n 20 kutsua on vielä aloittamatta: seuraavaa rengasta ei tehdä ennen näiden reunojen ratkaisua.

## Tarkistettu

Kaikki lähteen kiinteät G-pikselit säilyvät muuttumattomina. Kaikkien 12 ehdokkaan kaikki keskenään leikkaavat limitykset, myös kulmat, täsmäävät pikselilleen. Omistaja valtuutti alkuperäisten kaistojen häviöttömän kopioinnin; kopiointi ei ole visuaalisen saumattomuuden hyväksyntä. Alkuperäiset generoinnit ja aiemmat versiot on säilytetty. Uusia kokonaisia generointikutsuja  27, valittuja ehdokkaita 12. Pelkkä kaistojen uudelleenkopiointi ei kasvattanut kutsumäärää.

## Avoimet laatuvirheet

- Pohjoisreunassa r06c09/10:n y = 715-liitos näkyy suorana sävy- ja kattorajana. Riippumaton tarkistus havaitsi saman. Uusi c09-otto paransi sävyä mutta ei poistanut saumaa.
- Myös muiden kiinteiden G- ja naapurikaistojen rajoilla näkyy paikallisia katkoksia. Erityisesti r09c09:n y309 ja länsipalojen x1195 ovat selviä. r07c08:n Seine ei jatku G-rajalla saumattomasti.
- r09c09:n lähteen oikean puoliskon merkittävä puistoalue muuttui tiheäksi talokortteliksi. Tämä on korjattava sisältövirhe.
- Panthéonin valittu otto 003 säilyttää koko kupolin kiinteän yläkaistan alla, mutta rakennus on liian kapea ja jalusta siirtynyt. Myöhemmät 004/005 säilytetty; 005 paransi leveyttä/jalustaa mutta kiinteä kaista leikkasi lyhdyn, joten sitä ei valittu.
- Garnierin ja Invalidien leveydet poikkeavat tavoitemitoista (alla). Tarkan jalustakohdistuksen hyväksyntää ei väitetä.
- r07c11:n suuri suorakaiteinen julkinen rakennus ja r08c11:n oikean laidan kanava palautettiin uusissa otoissa. Aiemmat puuttuvat sisältöversiot hylättiin.

## Toteutuneet leveydet

Manuaalinen mittaus valitusta 1536 px PNG:stä koordinaattiristikon avulla, näkyvän rakennuksen ulkoraja, arviot ±5 px. Ei pelkkä kupolin halkaisija, varjo tai puusto. Karttasepän oma mittaus tarvitaan.

| Kohde | Ruutu | Tavoite | Toteutunut noin | Tila |
|---|---|---:|---:|---|
| Garnier | r06c09 |390px|355px|poikkeama|
| Invalidit | r08c08, jatko r07c08 |240px|260px|poikkeama|
| Panthéon | r09c10, otto 003 |440px|340px|poikkeama; jalusta noin 50 px oikealle ja 50 px ylös|

## Pyyntö Karttasepälle

Kokoa nämä arviointia varten G:n ympärille ja arvioi saumat kamerassa. Tarvitaan konkreettinen jatkoratkaisu G:n kiinteän geometrian ja uuden piirroksen rajalle sekä r09c09:n puistokorjaukseen ja maamerkkimittoihin. Näitä ei saa kuitata saumattomiksi teknisellä 0diff-tuloksella eikä käyttää seuraavan renkaan hyväksyttyinä reunoina. Omistajan lupaa uusiin kuvakutsuihin ei tarvitse kysyä uudelleen.

Kuvat ovat erillisessä tarkistuskansiossa, jotta ne eivät korvaa hyväksyttyjä peliaineistoja: `/Users/Shared/Claude/proto-3d/_tyo/codex/pariisi-lahitaso/_review-era1-20261101/`. Sama paketti tämän postin liitekansiossa. Ruutukohtaiset havainnot: visual-review.json; tarkka tekninen tarkistus: pixel-audit.json; leveysrajat: landmark-measurements.json; valitut promptit: PROMPTS.md.

Vastaanottajan hyväksyntä, PT/omistajan hyväksyntä, runtime-kytkentä ja julkaisu ovat avoimia eikä niitä väitetä tehdyiksi. Notre-Dame 0,5 m-koepalan aiempi camera PASS ja välitason aiempi vastaanotto ovat erilliset aiemmat toimitukset.

## SHA256 / valitut ehdokkaat

- `pariisi-lahi-r06c08.png` — `d2b9c837e000d30608bee0eccb63f0f1bb0b627e2eebbb12581bccae4e692e03` — otto 5, kutsuja 5
- `pariisi-lahi-r06c09.png` — `5e7f66024c6de8ea3e9fae970f3492b7483c35c221b782316fffa8f043e16cb4` — otto 3, kutsuja 3
- `pariisi-lahi-r06c10.png` — `cc6333bff88ad2f70bb073d5ff663df5cfd00b7570f347b68a307ac45c39c93d` — otto 2, kutsuja 2
- `pariisi-lahi-r06c11.png` — `bd53a44c94b451c7e16db7e1c6d118cdf0f46e2f3b73b9f2364067e0aa5d77ae` — otto 2, kutsuja 2
- `pariisi-lahi-r07c11.png` — `9e6736ddea57f61901ed71b70be01f956b24ac67d34d551083d65ebb0b1d5c96` — otto 3, kutsuja 3
- `pariisi-lahi-r08c11.png` — `03ef4c164879af656b1670b0a5e3c1fc03f4796d94e7505e1f6090e9e68f83d7` — otto 2, kutsuja 2
- `pariisi-lahi-r09c11.png` — `74746546b21b9c13957e5b077aa9c164f3297a7c2ba3125120763d23015b51a1` — otto 1, kutsuja 1
- `pariisi-lahi-r09c10.png` — `5c02793ebdd7735ea5d037a9478f6b14305045e6bf699eb3b34325d265e40432` — otto 3, kutsuja 5
- `pariisi-lahi-r09c09.png` — `12db2623fb3bfcbf2637fe0f82cba97533b0d10f3f8bc7e657a0136e9ea087ac` — otto 1, kutsuja 1
- `pariisi-lahi-r09c08.png` — `8aa0da718e00c06ca750bba542c350dda593724f1f5244384ed2139b247a909c` — otto 1, kutsuja 1
- `pariisi-lahi-r08c08.png` — `db3bdbc170719fbe8736eba25b0f6caa33335221f1f80aef208d1415e4e52201` — otto 1, kutsuja 1
- `pariisi-lahi-r07c08.png` — `5c466a6bd62ff10eb4e8182031423765c1c0c2e95402add74c04a63afdcb6817` — otto 1, kutsuja 1

Karttatiedot © OpenStreetMap contributors. Vain claude/postilaatikko.
