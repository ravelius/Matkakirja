# Roseau — C-luonnos, 12.10.2026

Tehtävä 18: oma kaupunki. Rajattu A-faktapohja ja C kirjoitettu; riippumaton D/E/F, kuvaputki, täysi karttaportti ja sääauditointi avoinna. Ei valmis erä, hyväksyntä, pelikytkentä tai julkaisu. Ei Git-operaatioita, uusia agentteja/sessioita tai muun kaupungin muokkausta.

## Kirjoitetut tekstit

- Artikkeli: intro 933 merkkiä, 2 kappaletta, 9 virkettä ja 2 lihavointia; lisäteksti 992 merkkiä, 3 kappaletta.
- 4 kansinostoa: 524, 543, 515, 514 merkkiä; 4 historiasivun nostoa: 543, 536, 542, 550 merkkiä.
- Opas 5 jaksoa, matkailijalle-kappale, 5 parasta-riviä ja 3 hyvä tietää -riviä.
- 5 kysymystä, tasot 1–3; 3 tietoa. Rhysin romaaniin liittyvä minitehtävä vastataan saman historiasivun Rhys-nostosta ja poikkeaa viidestä kysymyksestä.
- Kartta partial: Old Market ja Dominican kasvitieteellinen puutarha; kummallakin paikan oma WP-piste. Kohdejutut 711 ja 738 merkkiä, 2 kappaletta kumpikin.
- saatiedot:null. Ei ilmastolukuja, väkilukua tai pinta-alaa. saa.json koskematon.

## Alkuperäinen koneajo

`node paakaupungit-pilvi/tyokalu.mjs tarkista e12 roseau --lyhyt`

Lopullinen tuloste: valiaikainen/nopea-e12-roseau/tarkistus-lopullinen.txt. 20 virhettä, 2 varoitusta, 0 kuvaa, exit 1. Kaikki 20 virhettä ovat tyhjien kuvaolioiden tiedosto puuttuu -virheitä. Tekstimitoissa/rakenteessa, kysymyksissä tai karttapisteiden muodoissa ei konevirheitä. Täysi varoitustuloste: tarkistus-taysi.txt; karttakohteita 2 alle kuuden pohjatason ja saatiedot puuttuu. Tarkistinta ei muutettu.

Tyhjiä kuvarooleja 20: valokuva 1, kansikuvat 3, nostot 8, matkailijalle 1, opasjaksot 5, kohdejutut 2. Jokainen tiedosto/lyhyt/selite/lahde on tyhjä. Kuvaputken konkreettinen lista faktapohjan luvussa 7. Ei kuvia haettu, generoitu tai katsotuksi merkitty.

## Ratkaisut ja avoimet portit

- Jean Rhysin syntymäpaikkaristiriita Roseau / Grand Bay: ei varmaa syntymäpaikkaa C:ssä; koulunkäynti Roseaussa lähteestä.
- Katedraalin vaiheiden ristiriitaiset valmistumis-/vihkimisvuodet, puutarhan suunnittelu/istutus/maaosto ja Jack's Walkin erilaiset aika-arviot: ei tarkkoja lukuja. Kalinagojen katonrakennustyö ja viljelijöiden taimituotanto kerrotaan lähteistä.
- Fort Youngin 1873-lause kertoo linnoituksen olemassaolosta ja myöhemmästä hotellikäytöstä. Oppaan vanha 1600-luku ei mene tekstiin.
- Museon, Fort Youngin ja katedraalin rakennus-/tekijäketjut, muut omat karttapisteet, mahdolliset suojatut teokset ja kaikki kuvat avoinna. Rakennusta ei naamioida luontokohteeksi.
- Museon ja muiden palvelujen nykyinen aukiolo sekä polun kulkukelpoisuus tarkistettava myöhemmin. Opas ei lupaa vanhoja vuoroja tai hintoja.
- D/E/F sekä sää primäärilähteestä avoinna. Koneajo ei ole faktahyväksyntä.

Tuotantotiedostojen ja lähdekopioiden lopulliset SHA-256:t: valiaikainen/nopea-e12-roseau/SHA256.txt. Lähteiden robots-/HTTP-todiste: lahdehaut.jsonl. Mitat ja tyhjien kuvaolioiden tarkistus: mitat.json.
