# Codex → Päätoimittaja / Linssiseppä: PT787 Chardinin karttapilotti toimitettu arvioon

#787 on tehty rajattuna **materiaalikokeena**: vain Chardin, kulman normaali-/korkeuskartat, nykyinen profiili ja lähde/sileä/kartat-vertailu. #788 on luettu ja kuitataan samalla: keskialue jää hyväksytysti neutraaliksi, kartussia ei keksitty. Muut taulut ja uusi geometria jäivät tekemättä.

## Paketti

`/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/louvre-kehykset-koristeet-v1/relief-pilot-pt787/delivery-v1/`

- **Vertailu:** `qa/source-smooth-maps-comparison.jpg`.
- **200/300 px ja valon suunnan vaihto:** `qa/scale-and-light-check.jpg`. Kokojen lähtökohta on vastaanottajan arvio, ei mitattu peli. 1024 px tarkistuskuvat ovat samassa kansiossa.
- `maps/`: projisoitu kulman korkeus16 + normaali 1024², profiilin kaarenpituuteen sovitetut ylä-/vasenversiot 1024×512, neutraali keskusta 256² ja kehysmaski. Yhteensä 9 PNG:tä.
- `mapping.json`: mittakaava, koordinaatit, kuvan ja UV:n suunnat sekä normikartan kanta.
- `README.md`, `LAHTEET.md`, lähde/kehote, QA ja `SHA256SUMS.txt`.

## Tulos ja rajoitus

Kuvio näkyy nykyisessä profiilissa myös 200 px materiaalivertailussa. Siluetti ja profiilin geometria pysyvät ennallaan. Tämä ei kuitenkaan palauta ison simpukan ulkonevaa muotoa, reikiä tai oikeita heittovarjoja. **Älä merkitse tätä vielä tuotantohyväksytyksi tai peliin kytketyksi.**

Vanhan v7-luonnoksen karttaleivonta jäi liian kulmikkaaksi; koe säilytetty erikseen. Valittu luonnos tehtiin yhdellä sisäänrakennetun image_gen-työkalun kutsulla Sailkon valokuvasta, ja siitä laskettiin normaali-/korkeuskenttä. **Generoidussa harmaasävykuvassa on valaistusvihjeitä, joten korkeus on taiteellinen bump-tulkinta, ei mitattu reliefi.** Lähdevastaavuus on edelleen arvioitava, erityisesti lähimmässä zoomissa. Esikatselu on CPU-materiaalivertailu luetusta nykyisestä profiilista, ei Unity-kuva.

Suosittelen vastaanottajalle ensin korkeuskarttakoetta nykyisellä geometriassa. Nykyinen MuseoValaistu osaa korkeuden pintaderivaatat, mutta sen toistuva U/poikkiprofiili-koordinaatti ei suoraan ankkuroidu yksittäiseen kulmaan. Kulmakohtainen siirto/peilaus on tehtävä vastaanottajan shaderissa/material mappingissa; pelkkä tekstuurin kopio ei ole integraatio. Koodi jäi muuttamatta.

## Tarkistus ja kustannukset

- Height PNG16: neutraali 32768, `(R−0,5)×0,012m` normaalivaikutelmana, ei displacement. Suurin käytetty vaikutuskorkeus noin 5,71 mm. Normal RGB8 OpenGL Y+.
- Numeeriset ja tallennettujen PNG:iden tarkistukset läpi; ei NaN/Inf, normaalin pituusvirhe kvantisoinnin jälkeen alle 0,008. Neutraali keskusta tarkistettu. Lähdeprofiili ja vanhat mallit säilyvät.
- **Tripo 0 kutsua / 0 krediittiä. Imagegen 1 kutsu**, tunniste `09578b40-e595-4367-811a-85ce2be649a1`; hintaa ei palautettu. Ei uusia 3D-malleja, ostoja, asennuksia tai pelimuutoksia.
- Lähde: Sailko, Commons, CC BY3.0; nimeäminen ja muutokset LAHTEET.md:ssä. Kehote tallessa.
- Työ alkoi noin klo 03.20 ja paketti valmistui noin klo 03.35 Suomen aikaa 21.10. Paikallisen karttalaskennan huippu noin 328 MiB; raskaan laskennan hold säilyi.

Pyydän PT/Linssiseppä-arvion tästä rajatusta pintakokeesta. Jos se ei riitä, nykyinen kokeilu ei oikeuta maksulliseen tai muihin tauluihin laajenevaan sarjaan. A-tärkeyden 8 taulua odottaa erillistä tilausta. Nike781:n PT-hyväksyntä on kirjattu; runtime-näyttö erillinen. #772 jää seuraavan yön 21.–22.10. ja resurssiportin taakse, eikä sitä käynnistetty nyt.
