# Funafuti — C-muistio 12.10.2026

Rajattu oma A-lähdekooste ja Dakar-skeeman C-tekstiluonnos. Omistus tehtävä 25: vain e14/funafuti. Kaupunkisivu käsittelee eri paikanimien laajuuksia, kokoushallia, kirjastoa/arkistoa ja filateliaa. Tiedesivu käsittelee atolliteoriaa, porauksen tekniikkaa, paikallisen asukkaan varaosaa sekä meri- ja maaympäristön suojelua.

## Tekstiosiot ja mitat

- artikkeli.intro: 924 merkkiä, 2 kappaletta, 9 virkettä, 2 lihavointia.
- artikkeli.teksti: 928 merkkiä, 3 kappaletta.
- Kansi 4 nostoa: 512, 504, 524, 496 merkkiä.
- Tiede 4 nostoa: 496, 517, 509, 490 merkkiä.
- Matkailijalle-kappale 5 virkettä; opas 5 jaksoa, parasta 5 ja hyvaTietaa 4.
- Visa 5 kysymystä, tasot 1 ja 3 mukana; minitehtävä 1, tiedot 3.
- Karttakohteita 0 ja nähtävyysjuttuja 0, koska omat WP/WD-pisteet/tekijänoikeus/1873-portti ovat avoimia.

## Alkuperäisen tarkistimen todellinen tulos

`node paakaupungit-pilvi/tyokalu.mjs tarkista e14 funafuti --lyhyt`: **exit 1, 20 virhettä, 1 varoitus, 0 kuvaa**. Ajettu myös ilman --lyhyt varoituksen säilyttämiseksi.

Virhetyypit: **18 × tiedosto puuttuu** tyhjissä kuvaroolien tiedostokentissä; **1 × kohdekartta.rajat { pohjoinen > etela, ita > lansi }** tyhjästä rajauksesta; **1 × kohteita 0 (1–15)**. Varoitus: **saatiedot puuttuu (kirjaa syy RAPORTTI.md:hen)**. Lopullisessa ajossa ei koneen havaitsemia tekstipituuden, visan, tiedon, minitehtävän tai oppaan rakenteen virheitä. Tämä ei ole riippumaton faktatarkistus.

Ensimmäisen ajon tulos oli 21 virhettä: sallittu source-lista aiheutti tarkistimen tekstikävelyssä metatekstivirheen `kysymykset[2].source[0]`, koska indeksoidun lähde-URL:n kohdalla ohitus ei osunut source-kenttään. Säilytetty loki ja exit 1 tiedostoissa `tarkistus-alku.txt/json`. Kysymys muutettiin lähteessä suoraan mainittuun Sydneyn yliopiston geologiin ja source yhdeksi sitä tukevaksi Wikipedia-osoitteeksi. Ei tarkistimen muokkausta, puuttuvan lähteen arvausta tai virheiden suodatusta.

Lopulliset lokit: `valiaikainen/nopea-e14-funafuti/tarkistus-lyhyt.txt/json` ja `tarkistus-kaikki.txt/json`.

## Puutteet ja rajaukset

18 kuvaa odottaa erillistä kuvaputkea: matkakirjavalokuva 1, kansi 3, nostot 8, oppaan etusivu 1, opasjaksot 5. Kaikissa tiedosto/lyhyt/selite/lahde tyhjänä. Ei kuvahakuja tai generointia. Kuvat ja kohdejutut eivät ole hyväksyttyjä tai valmiita.

`saatiedot:null`: paikallisen rivin 48/48 primääriauditointi avoin, saa.json ennallaan. Väestö-, maa-ala-, laguunimitat ja tarkat tutkimusvuodet pois. Kaanonin 1873-kuvaus rajattu aikaan ennen myöhempää poraushanketta (F6/F7). Porausten tulos erotettu teoriasta: korallinäytteitä saatiin, vulkaanista pohjaa ei tavoitettu. Te Vili O Tavitan muistolaattaa ei valittu teos-/kuvakohteeksi.

Kartta partial: ei lainattuja atolli-/suojelualuepisteitä rakennuksille. Kirjastosivun epäuskottava läntinen piste merkitty A:han; rakennusten 70 vuotta -tekijäportit avoinna. Lentolähteiden Nadi/Suva-ero ei siirtynyt nykyisen reitin lupaukseksi. F5:n itsenäistymisvuosiristiriitaa tai suojelualueen eri perustamisvaiheiden vuosia ei toisteta.

Täysi A, B, D/E/F, sääauditointi, kartta/kohdejutut, toimitushyväksyntä, pelikytkentä ja julkaisu avoinna. Ei Git-operaatioita, uusia agentteja tai pelitiedostomuutoksia. SHA256 kolmesta tuotantotiedostosta omassa sha256.json:ssa.
