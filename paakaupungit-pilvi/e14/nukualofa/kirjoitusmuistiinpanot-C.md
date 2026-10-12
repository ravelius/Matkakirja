# Nukuʻalofa — C-muistio 12.10.2026

Kirjoitettu rajattu faktapohja ja Dakar-skeeman C-tekstiluonnos. Omistus tehtävä 25: vain e14/nukualofa. Lähdekooste kertoo kaikki väitteet, rajaukset ja käytännön ohjeiden eron lähdefaktoihin.

## Tekstiosiot ja mitat

- artikkeli.intro: 877 merkkiä, 2 kappaletta, 9 virkettä, 2 lihavointia.
- artikkeli.teksti: 810 merkkiä, 3 kappaletta.
- Kansi 4 nostoa: 488, 496, 499, 526 merkkiä.
- Kuvataide 4 nostoa: 514, 491, 507, 512 merkkiä.
- Matkailijalle-kappale 5 virkettä ja opas 5 jaksoa; parasta 5, hyvaTietaa 4.
- Tietovisa 5 kysymystä (tasot 1 ja 3 mukana), minitehtävä 1, tiedot 3.
- Karttakohteita 0 ja nähtävyysjuttuja 0: partial, oma koordinaatti/tekijänoikeus/1873-portti avoin.

## Alkuperäisen tarkistimen todellinen tulos

`node paakaupungit-pilvi/tyokalu.mjs tarkista e14 nukualofa --lyhyt`: exit 1, **20 virhettä, 1 varoitus, 0 kuvaa**. Samalla komennolla ilman --lyhyt säilytetty varoitus lokiin.

Virhetyypit: **18 × tiedosto puuttuu** tyhjistä kuvaroolien tiedostoista; **1 × kohdekartta.rajat { pohjoinen > etela, ita > lansi }** tyhjästä rajauksesta; **1 × kohteita 0 (1–15)**. Varoitus: **saatiedot puuttuu (kirjaa syy RAPORTTI.md:hen)**. Ei koneen havaitsemia artikkelin, noston pituuden, tietovisan, tiedon, minitehtävän tai oppaan rakenteen virheitä. Tämä ei ole riippumaton faktatarkistus.

Lokit ja paluukoodit: `valiaikainen/nopea-e14-nukualofa/tarkistus-lyhyt.txt/json` ja `tarkistus-kaikki.txt/json`. Tarkistinta ei muutettu eikä kuvia arvattu virhemäärän vähentämiseksi.

## Kuva- ja toimituspuutteet

18 roolia odottaa erillistä kuvaputkea: 1 matkakirjavalokuva; 3 laajaa kansikuvaa; 8 nostoaiheen kuvaa; 1 oppaan etusivun pystykuva; 5 jaksojen kuvaa. Kaikissa tiedosto/lyhyt/selite/lahde tyhjänä. Kuvatekstit laaditaan vasta nähtyä kuvaa vasten. Ei Commons-kuvahakua eikä generointia.

Täysi A (kartta, kohdejutut ja 1873-taustat), B, sääauditointi, riippumaton D/E/F, toimitushyväksyntä, pelikytkentä ja julkaisu avoinna. Kontekstin väkiluku jätetty pois sen osittaisen varmennuksen vuoksi. Lentoaseman sivun HTTP 500 ei todiste; nimi ja IATA tulevat L1/L2:sta.

Ei Git-operaatioita, uusia agentteja, pelin muutoksia tai julkaisua. SHA256-todiste kolmesta tuotantotiedostosta omassa `sha256.json`:ssa.
