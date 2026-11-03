# A2 erä 1 — koevedosten tarkistus 3.11.2026

**Toimitus arvioitavaksi, ei hyväksyntä eikä valmis peliaineisto.** Nykyinen erä: kortteli, julkisivu, puu. Lisäksi mukana perutun irrallisen Notre-Damen jo käynnistyneen kutsun tulos, kuten peruutusposti pyysi.

## Todelliset havainnot
- Kortteli: 1024 × 1024 RGB. Ei katuja, puita tai nurmea; pienet mansarditalot ja vaaleat välit. **Saumattomuus EI läpäise:** offset/2×2-kuvassa talot ja musteviivat katkeavat vaaka- ja pystysaumassa. Reunapikselien keskimääräinen RGB-ero X 23,354 ja Y 21,373 /255 (sisäiset vierekkäiset 18,507 /16,179). Pelkkä keskiarvo ei todista saumattomuutta; myös visuaalinen katkeama havaittu. Moni talo on tavoitteen 10–20 px levyistä suurempi, ja julkisivuihin on kuvattu vain noin yksi näkyvä ikkunarivi. Kuusikerroksisuutta ja 60°:n kalibroitua geometriaa ei hyväksytty.
- Julkisivu: 2048 × 128 RGBA. Yksi generoitu neljän nauhan atlas, jonka neljä tasakorkuista riviä pakattu vasemmalta oikealle. Ei neljää erillistä ottoa. **Alfa EI läpäise:** ei yhtään alfa=0-pikseliä; alfa 45–254. Katon päällä näkyy vaalea tausta. Riviladoissa/parvekkeissa on korkeusvaihtelua ja liitokset eivät jatka rakennetta varmasti saumattomana (x=512/1024/1536 sekä ulkoreuna). Seinän korkeus on kuvasta noin 80–86 px, ei pyydetty 102 px; kerroksia on liian vähän. Mittakaavamerkintä JSONissa on tilauksen tavoite, ei mitattu hyväksyntä.
- Puu: 192 × 192 RGBA; 26 977 täysin läpinäkyvää pikseliä 36 864:stä, latvus/runko/varjo mahtuvat rajaukseen. Lämmin oliivinvärinen pyöreä latvus, lyhyt runko, varjo oikealle ja hieman alas. Visuaalinen leike läpäisee; täsmällistä 60° projektiota ja fyysistä mittakaavaa ei voi todentaa lähteen puuttuvista puumitoista. Ankkuri [92,148] on rungon maakosketuksen arvio.
- Irrallinen Notre-Dame (PERUTTU A2-kohde): 2048 × 1365 RGBA, valmistunut vanhasta kutsusta. Ei uusi #1928:n aluekoe. Tornit/ruusuikkuna/huippu on liioiteltu, mutta näkymä on ohjetta sivuttaisempi; pituusakselin 26° ja maamittakaavan täsmällisyys ei läpäise. Alfa sisältää puoliläpinäkyvää vaaleaa utua, joka ulottuu vasempaan/alareunaan. Ei hyväksytty pelikäyttöön. Ei uutta yritystä.

## Rajaukset ja tekninen käsittely
Built-in imagegen, yksi kutsu per alkuperäinen kohde: neljä kutsua yhteensä. Kaikki alkoivat 18.28.40 UTC. Peruutuksen #1927 vastaanotto kirjattiin 18.32.12 UTC; emme väitä että kutsut edelsivät peruutuspostin julkaisemista. Notre-Dame valmistui 18.31.57 UTC. **Ei yhtään uutta A2-kutsua peruutuksen vastaanoton jälkeen.**
Vain kokovienti ja yhden julkisivuatlaksen tekninen rivipakkaus; alfa on alkuperäisestä. Ei sauman maalausta, peilausta, reunasekoitusta, taustan poistoa eikä osittaista kuvakorjausta. Alkuperäiset säilytetty.

esineet.jsonin m_per_px on puulle ja perutulle Notre-Damelle null, koska lähde ei määritä niiden maamittaa. Vastaanottajan on asetettava nämä ennen pelikytkentää; null ei tarkoita mitattua mittakaavaa.

Karttasepän/KK:n hyväksyntä, omistajahyväksyntä, pelin integraatio ja julkaisu ovat avoinna. Uusia kuvia odotetaan vain uudesta tilauksesta. Erillinen Notre-Dame-aluekoe #1928 käsitellään omana toimituksenaan.
