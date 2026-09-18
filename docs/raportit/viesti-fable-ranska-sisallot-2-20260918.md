# Viesti Fablelle: Ranskan hahmotelmanostojen sisällöt, erä 2 (kohteet 10–18)

18.9.2026, Opus-sisältöagentti. Haara
`claude/bold-ride-vow4ki-ranska-sisallot-2`, pohja
`claude/bold-ride-vow4ki-v1947` (2480fd5d, PAATOKSET 44 mukana).

Tehtävä: Raamattu KARTTAUUDISTUKSEN PAATOKSET 44 kohta 1, oma erä
`js/packs/hahmotelma-fra.js`:n kohteet 10–18 tiedoston järjestyksessä.
Kaikki yhdeksän on nyt kirjoitettu valmiiksi: teksti, lähde, kaksi
pulun kysymystä, kaksi Commons-kuvaa ja `hahmotelma: true` pois.
Mitään muuta riviä tiedostossa ei ole koskettu (kaksi muuta agenttia
tekee samaa tiedostoa).

## 1. Tekstit ja lähteet

| Kohde | Lähde | Virkkeitä |
| --- | --- | --- |
| hahmotelma-reims | en-Wikipedia "Reims", johdanto-osa | 5 |
| hahmotelma-vezelay | en-Wikipedia "Vézelay Abbey", johdanto-osa | 5 |
| hahmotelma-beaune | en-Wikipedia "Hospices de Beaune", johdanto-osa | 4 |
| hahmotelma-ajaccio | en-Wikipedia "Ajaccio", johdanto-osa | 5 |
| hahmotelma-bonifacio | fi-Wikipedia "Bonifacio", johdanto-osa | 4 |
| hahmotelma-place-stanislas | en-Wikipedia "Place Stanislas", johdanto-osa | 4 |
| hahmotelma-mont-ventoux | en-Wikipedia "Mont Ventoux", johdanto-osa | 4 |
| hahmotelma-puy-de-sancy | fi-Wikipedia "Puy de Sancy", johdanto-osa | 4 |
| hahmotelma-amboise | en-Wikipedia "Château d'Amboise", johdanto-osa | 5 |

Kaksi lähdettä on fi-Wikipediasta: Bonifacion ja Puy de Sancyn
en-artikkelien johdannot ovat kahden virkkeen mittaisia eivätkä
riittäneet kolmeen virkkeeseen ilman täytettä. fi-artikkelit antavat
saman asian laajempana (Bonifacion linnoitus ja luonnonsatama, Sancyn
1 886 m ja hiihtorinteet). Kummankin lähderivi kertoo, että kyse on
fi-Wikipediasta.

Ei yhtään lukua eikä nimeä muualta kuin lähteestä. `nappi`-alaotsikot,
`lahi`, `tyyppi` ja `laudat` ovat ennallaan; vanhat
`koordinaatinLahde()`-rivit korvautuivat sisällön lähderivillä (asteet
ovat yhä rivin yläpuolisessa kommentissa).

## 2. Kuvat

Kaikki 18 kuvaa haettiin `tools/hae-commons.mjs`-työkalulla ja
lisenssi tarkistettiin `tiedot`-komennolla tiedosto kerrallaan.
Hyväksytyt: public domain, CC0, CC BY, CC BY-SA. **Epäselviä tai
kiellettyjä lisenssejä ei otettu yhtään** — ei NC-, ND- eikä
fair use -kuvia missään vaiheessa.

| Kohde | Rooli | Tekijä | Lisenssi | Tiedosto ämpäriin |
| --- | --- | --- | --- | --- |
| reims | pääkuva, nykyinen | DXR | CC BY-SA 3.0 | fra-hahmotelma-reims-76ae34f7.jpg |
| reims | 1800-luvun kabinettivalokuva (1870–1900) | Rijksmuseum | CC0 | fra-hahmotelma-reims-dcec114e.jpg |
| vezelay | pääkuva, nykyinen | Nikater | CC BY-SA 3.0 | fra-hahmotelma-vezelay-63dd721d.jpg |
| vezelay | albumiinivedos 1860–1879 | Rijksmuseum | CC0 | fra-hahmotelma-vezelay-b1378444.jpg |
| beaune | pääkuva, nykyinen | Benjamin Smith | CC BY-SA 4.0 | fra-hahmotelma-beaune-8f26f045.jpg |
| beaune | albumiinivedos n. 1875–1900 | Rijksmuseum | CC0 | fra-hahmotelma-beaune-c5856d54.jpg |
| ajaccio | pääkuva, nykyinen | Jean-Pol GRANDMONT | CC BY 3.0 | fra-hahmotelma-ajaccio-40da9824.jpg |
| ajaccio | albumiinivedos n. 1886–1896 | Rijksmuseum | CC0 | fra-hahmotelma-ajaccio-e41d8022.jpg |
| bonifacio | pääkuva, nykyinen | Isiwal | CC BY-SA 3.0 | fra-hahmotelma-bonifacio-e6bfcc16.jpg |
| bonifacio | valokuva n. 1905–1910 | Rijksmuseum | CC0 | fra-hahmotelma-bonifacio-b2afc271.jpg |
| place-stanislas | pääkuva, nykyinen | Krzysztof Golik | CC BY-SA 4.0 | fra-hahmotelma-place-stanislas-5fc36b97.jpg |
| place-stanislas | kabinettivalokuva 1870–1900 | Rijksmuseum | CC0 | fra-hahmotelma-place-stanislas-272c4be2.jpg |
| mont-ventoux | pääkuva, nykyinen | BlueBreezeWiki | CC BY-SA 3.0 | fra-hahmotelma-mont-ventoux-ad5bff71.jpg |
| mont-ventoux | postikortti 1900-luvun alusta | tuntematon | public domain (PD-France, PD-US-expired) | fra-hahmotelma-mont-ventoux-43491989.jpg |
| puy-de-sancy | pääkuva, nykyinen | Marie-Lan Nguyen | CC BY 4.0 | fra-hahmotelma-puy-de-sancy-755bbff9.jpg |
| puy-de-sancy | nykyinen, luminen | Pymouss | CC BY-SA 4.0 | fra-hahmotelma-puy-de-sancy-c17a5081.jpg |
| amboise | pääkuva, nykyinen | Martin Falbisoner | CC BY-SA 3.0 | fra-hahmotelma-amboise-2f0daf4b.jpg |
| amboise | albumiinivedos 1860–1880 | Rijksmuseum | CC0 | fra-hahmotelma-amboise-0f8d3316.jpg |

Kaikki 900 px -jpegit ovat kansiossa
`scratchpad/karttanostot-20260918/` (sama kansio, johon rinnakkaiset
erät kirjoittavat; kansiossa on siis myös muiden erien tiedostoja).
Pakkaan on kirjoitettu osoite
`https://media.matkakirja.app/karttanostot/20260918/<tiedosto>`.
**Agentti ei ole vienyt kansiota ämpäriin eikä committoinut kuvia
repoon** — vienti jää Fablelle.

Silmätarkistus: agentti katsoi kymmenen kuvaa (kaikki 1800-luvun
kuvat ja neljä nykykuvaa) ennen kirjaamista, ja selitteet on
kirjoitettu sen mukaan mitä kuvassa oikeasti näkyy. Mont Ventoux'n
ensin valittu nykykuva (`Mont-ventoux-bedoin.jpg`) vaihdettiin
tarkistuksen jälkeen: etualalla oli sähkölinja ja katuvalo. Tilalle
tuli saman kuvaajan huippukuva `140608 Mont-Ventoux-04.jpg`.

Puy de Sancy on ainoa kohde ilman historiallista kuvaa: Commonsista ei
löytynyt sille yhtään vanhaa PD-kuvaa (haut "Puy de Sancy 1900",
"Mont-Dore gravure", luokat "Postcards of Puy de Sancy" ja "Historical
images of Puy de Sancy" — kaikki tyhjiä; täystekstihaku palautti vain
skannattuja kirjoja). Kaksi kuvaa on silti: kesä ja talvi.

## 3. Epäilyttävät lisenssit

Ei yhtään. Ainoa harkintaa vaatinut on Mont Ventoux'n postikortti,
jonka tekijä on tuntematon; Commonsin lisenssilaatikko on public
domain ja luokat `PD US expired` ja `PD France`, joten se kelpaa.
Kenttään `tekija` on kirjattu "tuntematon" eikä keksittyä nimeä.

## 4. Mitä jäi

1. **Varaston kaksitoista -lohkon kommentti (rivi ~315) sanoo yhä
   "vain otsikko ja yhden rivin alaotsikko, ei kuvia, ei visoja, ei
   sisältötekstiä".** Se ei enää pidä paikkaansa kolmen kohteeni
   osalta (mont-ventoux, puy-de-sancy, amboise), mutta se on YHTEINEN
   kommentti myös kolmannen agentin kohteille (nimesin-areena, rouen,
   rocamadour…), joten en koskenut siihen — mergekonflikti olisi
   varma. Sama koskee tiedoston alun isoa lohkokommenttia, joka sanoo
   "EI KUVIA, EI VISOJA, EI PULU-KYSYMYKSIÄ". Tarkistuserä korjaa
   molemmat, kun kaikki 27 kohdetta ovat valmiita.
2. Havainnekuvat (PAATOKSET 44 kohta 4) odottavat kuvaputken
   tokeneita — ei tehty tässä erässä.
3. Versiota ei nostettu eikä PR:ää avattu (ohjeen mukaan).

## 5. Portit

- `node --test tests/*.test.mjs` → **# pass 3632, # fail 0**,
  # skipped 13, # tests 3645.
- `node tools/tarkista-kaksoisavaimet.mjs` → "ei kaksoisavaimia".
- `node tools/build-standalone.mjs` → dist/matkakirja.html (32798 kt).
- `import('./js/packs/hahmotelma-fra.js')` → `HAHMOTELMA_FRA`, 27
  kohdetta, joista `hahmotelma: true` enää 18 (omat yhdeksän pois).
