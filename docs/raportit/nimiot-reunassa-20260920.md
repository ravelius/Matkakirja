# Nimiöiden reunasiirto maalehdissä — mittaus 20.9.2026

Sisältökirjuri (Sonnet), erä 1. Fablen tehtävänanto: käy Euroopan
maalehtien nimiöt läpi koneellisesti (480 px + puhelinkoko, myöhemmin
täydennetty iPad-koilla omistajan laitteen mukaan), listaa reunaan
osuvat ennen korjaushaaraa.

## Menetelmä

Uusi työkalu `tools/tarkista-nimio-reuna.mjs`. Pelin lauta on nykyään
globe.gl-pohjainen pallolauta (`js/pallolauta/*.js`) — vanha tasokartta
(`ui.kartta`, `.karttanimet`-kerros) on lepotilassa eikä piirrä mitään,
joten se ei kelpaa mittariksi. Työkalu:

1. Asettaa pelaajan kohdemaan lautakaupunkiin (`Game`+`localStorage`,
   sama kaava kuin `tools/savukkeet/savuke-pallo-nostolaput.mjs`), avaa
   `?lauta=pallo`.
2. Ajaa pelin oman saapumisajon `l.saavu({ kesto: 0 })` (sama funktio,
   jolla peli itse tuo pelaajan maan fokusnäkymään) ja pakottaa
   ladonnan `l.ladoHeti()`.
3. Mittaa KAAVASTA, ei ruudulta (sama perustelu kuin savukkeessa: merkin
   oma `<svg>` on 1×1 px eikä `getBoundingClientRect` kerro mitään):
   - elävät (kohdemaan omat, ei vielä poltetut) nimiöt
     `l.nostot.lappuLaatikot()`,
   - poltetut (musteeksi jo poltetut) nimiöt haettu `l.nostot.osumat()`-
     listasta ja laatikko laskettu samalla `nostonLaatikko`-funktiolla
     kuin peli itse käyttää.
4. Vertaa laatikon `x0,y0,x1,y1` ikkunan `innerWidth/innerHeight`-
   rajaan, sallittu marginaali 4 px (pyöristys).
5. Neljä ruutukokoa per maa: **480×854**, **puhelin 390×844**,
   **iPad-pysty 820×1180** ja **iPad-vaaka 1180×820** (kaksi
   jälkimmäistä lisätty Fablen pyynnöstä, kun omistaja pelaa iPadilla —
   ks. seuraava kohta).

Ajettu kaikki Euroopan maalehtimaat (`MAA_KATEGORIAT` ∩ lautakaupunki),
32 maata, KAHTEEN kertaan. 0 kaatumista kummallakaan ajolla. Ajo:
`PLAYWRIGHT_JS=<repo>/node_modules/playwright/index.js node
tools/tarkista-nimio-reuna.mjs`.

**Mittaus ei ole täysin deterministinen ajojen välillä** (havaittu
vertaamalla kahta peräkkäistä täysajoa): sama maa+ruutukoko antoi
muutamassa tapauksessa eri löydösjoukon (esim. Ruotsin "Kosterhavetin
kansallispuisto" puuttui ensimmäisestä ajosta mutta oli toisessa 42–90
px yli). Syy on todennäköisesti pallolaudan geometria-/tekstuurilatausten
ajoituksessa `l.saavu()`+`l.ladoHeti()`-kutsujen jälkeen — muutaman
sadan millisekunnin odotus ei aina riitä täysin samaan lopputulokseen.
Alla oleva taulukko on KAHDEN ajon UNIONI (pahin mitattu arvo per
nimiö) — täydellisempi mutta lievästi pessimistinen lista. Isot
ylitykset (yli ~20 px) ovat luotettavia; muutaman pikselin löydökset
kannattaa silmätarkistaa korjauksen yhteydessä.

## Biskajanlahti ja Dune du Pilat eivät toistuneet tällä mittarilla

Omistajan mainitsemat esimerkit eivät ylittäneet reunaa oletus-
saapumisnäkymässä missään neljästä ruutukoosta, ei myöskään tarkassa
iPad-koossa. Katsoin myös omistajan oman kaappauksen
`docs/raportit/kaappaukset/omistaja-20260920/kartuscha-iso-ranska.png`:
siinä BISKAJANLAHTI-nimiö leikkautuu kuvan YLÄreunaan maan tietopaneelin
("kartuscha") ollessa auki. Kuva on kuitenkin ilmeisesti tiiviisti
rajattu lähikuva paneelista (843×817, ei täyttä laitenäyttöä), joten
sen kuvasuhteesta ei voi päätellä luotettavasti todellista ruutukokoa
tai kameran zoomaustasoa — se voi olla eri (lähempi/manuaalisesti
zoomattu) näkymä kuin pelin oma saapumis-`l.saavu()`. Kirjattu tähän
Fablen ohjeen mukaisesti; Laitetestaaja voi vahvistaa oikealla
laitteella.

## Löydökset (118 nimiötä, 30/32 maata)

Pahin mitattu ylitys per nimiö (kahden ruutukoon suurempi arvo).
Lähde: **elävä** = kohdemaan oma nosto ei vielä poltettu, **poltettu**
= jo musteeksi poltettu. Suunta on reuna, jota kohti nimiö menee yli
(ainoa poikkeus POL/Haikaranpesä: eri suunta eri ruutukoossa).

| Maa | Nimiö | Lähde | Suunta | Ylitys | Näkymä(t) |
| --- | --- | --- | --- | --- | --- |
| AUT | Wörthersee | elävä | vasen | 36 px | iPad-pysty |
| AUT | Kremsmünsterin luostari | elävä | vasen | 14 px | iPad-pysty |
| BEL | Ében-Émaelin linnake | elävä | oikea | 59 px | iPad-pysty |
| BEL | Bouillonin linna | elävä | oikea | 58 px | puhelin |
| BEL | Bastognen tähtimuistomerkki | elävä | oikea | 58 px | iPad-pysty |
| BEL | Hoge Kempen | elävä | oikea | 49 px | iPad-pysty |
| BEL | Orvalin luostari | elävä | oikea | 38 px | 480px |
| BEL | Tournain tuomiokirkko | elävä | vasen | 22 px | 480px |
| BEL | Grand-Hornu | elävä | vasen | 17 px | puhelin |
| BEL | Han-sur-Lessen luolat | elävä | oikea | 17 px | puhelin |
| BGR | Ruusulaakso | poltettu | oikea | 10 px | iPad-pysty |
| BIH | Adrianmeri | poltettu | vasen | 61 px | 480px, puhelin |
| BIH | Livnon lauma | poltettu | vasen | 35 px | 480px |
| BIH | Jajce | poltettu | vasen | 9 px | puhelin |
| CHE | Gotthard | poltettu | oikea | 35 px | iPad-pysty |
| CHE | Rheinfall | poltettu | oikea | 32 px | iPad-pysty |
| CHE | Dufourspitze | poltettu | oikea | 8 px | puhelin |
| CHE | Kapellbrücke | poltettu | oikea | 6 px | 480px |
| CYP | Kap Greco | poltettu | oikea | 112 px | 480px, puhelin |
| CYP | Kykkoksen luostari | poltettu | vasen | 108 px | 480px, puhelin |
| CYP | Paphoksen mosaiikit | poltettu | vasen | 34 px | iPad-pysty, iPad-vaaka |
| CYP | Pediaíos | poltettu | oikea | 8 px | puhelin |
| CZE | Karlovy Vary | elävä | vasen | 32 px | iPad-pysty |
| CZE | Edward Kelley | poltettu | vasen | 5 px | puhelin |
| CZE | Jáchymov | poltettu | vasen | 5 px | iPad-pysty |
| DEU | Hermannsdenkmal | elävä | vasen | 38 px | puhelin |
| DEU | Bernkastel ja Mosel | elävä | vasen | 25 px | 480px |
| DEU | Mangalitsa | elävä | oikea | 15 px | iPad-vaaka |
| DNK | Legon syntysija | poltettu | vasen | 46 px | 480px |
| DNK | Billund | poltettu | vasen | 17 px | 480px |
| DNK | Kronborg | poltettu | oikea | 15 px | 480px, puhelin, iPad-pysty |
| DNK | Tollundin mies | poltettu | vasen | 7 px | 480px |
| ESP | Cartagenan kantoni | elävä | oikea | 58 px | 480px, puhelin |
| ESP | Albufera | elävä | oikea | 16 px | 480px |
| ESP | Iberipatsaat | elävä | oikea | 10 px | puhelin |
| ESP | Bardenas Reales | elävä | oikea | 4 px | puhelin |
| EST | Lahemaa | poltettu | oikea | 54 px | puhelin |
| EST | Rakvere | poltettu | oikea | 35 px | iPad-pysty |
| EST | Suure-Jaani | elävä | oikea | 25 px | puhelin |
| EST | Struve | poltettu | oikea | 23 px | iPad-pysty |
| EST | Vormsi | elävä | vasen | 11 px | 480px |
| FIN | Vanha Rauma | poltettu | vasen | 12 px | puhelin |
| FIN | Bomarsund | poltettu | vasen | 6 px | puhelin |
| FRA | Välimeri | poltettu | oikea | 40 px | puhelin |
| FRA | Nancy, Place Stanislas | elävä | oikea | 29 px | puhelin |
| FRA | Marseillen saippua | poltettu | oikea | 24 px | puhelin |
| FRA | Cosquerin luola | poltettu | oikea | 18 px | puhelin |
| FRA | Saint-Malo | elävä | vasen | 17 px | 480px |
| FRA | Bordeaux | elävä | vasen | 13 px | puhelin |
| FRA | Nantes | elävä | vasen | 6 px | puhelin |
| GBR | Pohjanmeri | elävä | oikea | 53 px | 480px, puhelin |
| GBR | Sutton Hoo | elävä | oikea | 15 px | puhelin |
| GRC | Chios ja mastiksi | elävä | oikea | 47 px | puhelin |
| GRC | Mesolongi | elävä | vasen | 39 px | puhelin |
| GRC | Ioánnina | poltettu | vasen | 32 px | 480px |
| GRC | Navarino | elävä | vasen | 19 px | puhelin |
| GRC | Aliákmonas | poltettu | vasen | 18 px | puhelin |
| GRC | Píndos | poltettu | vasen | 5 px | puhelin |
| HRV | Samobor | elävä | vasen | 33 px | 480px |
| HRV | Trakošćan | elävä | vasen | 10 px | 480px |
| HRV | Kumrovec | elävä | vasen | 5 px | 480px |
| HUN | Esztergomin basilika | elävä | vasen | 45 px | puhelin |
| HUN | Villány | elävä | vasen | 24 px | 480px |
| HUN | Mangalitsa | poltettu | oikea | 15 px | 480px |
| IRL | Irlanninmeri | poltettu | oikea | 58 px | iPad-pysty |
| IRL | Moherin kalliot | poltettu | vasen | 55 px | puhelin |
| IRL | Loop Head | elävä | vasen | 34 px | 480px |
| IRL | Powerscourtin vesiputous | elävä | oikea | 13 px | 480px, puhelin |
| ISL | Hólar | poltettu | oikea | 6 px | 480px |
| ITA | Gran Paradiso | elävä | vasen | 41 px | 480px |
| ITA | Castel del Monte | elävä | oikea | 32 px | puhelin |
| ITA | Cinque Terre | poltettu | vasen | 21 px | puhelin |
| ITA | Matera | poltettu | oikea | 15 px | puhelin |
| ITA | Dalmatianpentu | elävä | oikea | 5 px | puhelin |
| LTU | Grūtasin puisto | poltettu | vasen | 48 px | 480px |
| LTU | Ristien kukkula | elävä | vasen | 21 px | iPad-pysty |
| LTU | Kryžių kalnas | elävä | vasen | 14 px | iPad-pysty |
| LTU | Birštonas | elävä | vasen | 11 px | 480px |
| LTU | Marijampolė | elävä | vasen | 11 px | iPad-pysty |
| LTU | Kėdainiai | elävä | vasen | 5 px | 480px |
| LVA | Jelgava | poltettu | oikea | 6 px | 480px |
| LVA | Itämeri | poltettu | vasen | 5 px | 480px, puhelin |
| NLD | Het Loon palatsi | elävä | oikea | 22 px | puhelin |
| NLD | Schiermonnikoog | elävä | oikea | 18 px | 480px |
| NLD | Giethoorn | poltettu | oikea | 18 px | puhelin |
| NLD | Dwingelderveld | elävä | oikea | 9 px | 480px |
| NLD | Kröller-Müllerin museo | poltettu | oikea | 6 px | puhelin |
| NOR | Barentsinmeri | poltettu | oikea | 62 px | puhelin |
| NOR | Kuolan syväreikä | elävä | oikea | 43 px | 480px |
| NOR | Gjest Baardsen | poltettu | vasen | 26 px | iPad-pysty |
| NOR | Dovrefjell | poltettu | vasen | 12 px | 480px |
| POL | Haikaranpesä | elävä | ylä+oikea | 33 px | 480px, puhelin |
| POL | Białowieżan metsä | elävä | oikea | 31 px | 480px, iPad-pysty |
| POL | Pszczynan linna | elävä | vasen | 31 px | puhelin |
| POL | Veiksel | poltettu | vasen | 18 px | puhelin |
| POL | Malborkin linna | poltettu | vasen | 12 px | puhelin |
| PRT | Atlantti | poltettu | vasen | 47 px | 480px |
| PRT | Vimeiron taistelu | elävä | vasen | 34 px | puhelin |
| PRT | Restelo 1497 | poltettu | vasen | 27 px | puhelin |
| PRT | Berlengasin saaret | elävä | vasen | 17 px | puhelin |
| ROU | Horezun luostari | elävä | vasen | 50 px | 480px |
| ROU | Alba Carolina -linnoitus | elävä | vasen | 22 px | iPad-pysty |
| ROU | Poenarin linna | elävä | vasen | 21 px | puhelin |
| ROU | Negoiu | poltettu | vasen | 10 px | puhelin |
| ROU | Biertan | elävä | vasen | 4 px | puhelin |
| SVK | Dobšinská jääluola | elävä | vasen | 71 px | 480px, iPad-pysty |
| SVK | Stará Ľubovňa | elävä | vasen | 38 px | puhelin |
| SVK | Tatranská Lomnica | elävä | vasen | 32 px | 480px |
| SVK | Zemplínska šírava | elävä | oikea | 6 px | 480px |
| SVN | Ravne na Koroškem | elävä | oikea | 36 px | 480px, puhelin |
| SVN | Triglav | elävä | vasen | 17 px | 480px, puhelin |
| SVN | Lipica | elävä | vasen | 9 px | puhelin |
| SWE | Kosterhavetin kansallispuisto | elävä | vasen | 90 px | 480px, puhelin |
| SWE | Kuolan syväreikä | elävä | oikea | 36 px | 480px |
| SWE | Haikaranpesä | elävä | oikea | 19 px | puhelin |
| SWE | Myskihärkä | elävä | vasen | 5 px | puhelin |
| TUR | Välimeri | poltettu | oikea | 25 px | puhelin |
| TUR | Troija 1873 | poltettu | vasen | 22 px | 480px |

Puhtaat (0 löydöstä kaikissa neljässä ruutukoossa, molemmilla ajoilla): **UKR**.

## Ei korjattu tässä erässä (9 löydöstä)

Näiden 118:sta ei ole yksiselitteistä yhtä lähdekenttää, tai ne
osoittautuivat naapurimaan väärin kohdistuneiksi eläintäky-merkeiksi
(oikea omistaja selvitetty koodista, `ELAINTAKYT`-taulu
`js/packs/elaintakyt.js`):

| Löydös (mitattu maa) | Todellinen omistaja | Syy |
| --- | --- | --- |
| CZE Karlovy Vary | ? | nimi esiintyy kahdessa tiedostossa (hahmotelma-cze.js, maakartat.js), ei tarkistettu kumpi piirtää pallolaudalla |
| FRA Bordeaux | ? | nimi kolmessa tiedostossa (fokus-grc.js, maakartat.js, nakyvat-kaupungit-fra.js) |
| GRC Ioánnina | ? | nimi kahdessa tiedostossa (fokus-grc.js, fokuskohteet-grc.js) |
| DEU Mangalitsa | **HUN** | HUN:n oma eläintäky ("mangalitsa"), näkyy Saksan näkymän reunalla naapurina |
| HUN Mangalitsa | HUN (oma) | oikea maa, mutta ks. Ei korjattu -osion perustelu alla |
| ITA Dalmatianpentu | **HRV** | Kroatian oma eläintäky ("dalmatianpentu") |
| POL Haikaranpesä | **LTU** | Liettuan oma eläintäky ("haikaranpesä") |
| SWE Haikaranpesä | **LTU** | sama kuin edellä, eri näkymästä |
| SWE Myskihärkä | **NOR** | Norjan oma eläintäky ("myskihärkä") |

## Korjausyritys paljasti: nimiöt eivät ole staattisia koordinaatteja

**Pilotoin korjauksen Ranskan 6 selkeällä löydöksellä ennen skaalausta
(kustannuskurin mukaisesti) ja tulos oli osittainen — koko erää EI
korjattu.**

Mekanismi: nimiön nykyinen ruutupiste luetaan `l.nostot.osumat()`:sta,
tavoitepiste (ylitys + 24 px marginaali sisäänpäin) muunnetaan lat/lng-
koordinaatiksi globe.gl:n omalla käänteisprojektiolla
(`pallo.toGlobeCoords(x, y)`) ja edelleen laudan yksiköiksi samalla
Millerin lieriö -kaavalla kuin data on tuotettu
(`tools/johda-maastokohteet.mjs` `laudat()`). Työkalu
`tools/korjaa-nimio-reuna.mjs` (committoitu, `--kuivaharjoitus`-lippu).

**Ranskan pilotin tulos** (6 löydöstä, ajettu oikeasti ja mitattu
uudelleen): 4/6 korjaantui (Saint-Malo, Nantes, Marseillen saippua,
Cosquerin luola). **2/6 EI muuttunut lainkaan** (Nancy, Place
Stanislas ja Välimeri pysyivät TÄSMÄLLEEN samassa ylityksessä
koordinaatin siirrosta huolimatta), ja **kolme UUTTA reunaan osuvaa
nimiötä ilmestyi** (Mont-Saint-Michel, Vuorovesi 2015, Pétanque) —
näitä ei ollut alkuperäisessä 118 löydöksen listassa.

**Syy: nimiöiden sovittelu (`js/pallolauta/sovittelu.js`) on
DYNAAMINEN törmäyksenvälttelyjärjestelmä, ei staattinen ladonta.**
`l.ladoHeti()` laskee jokaiselle nimiölle kyljen (puoli) ja pienen
siirron (dx/dy) suhteessa NAAPUREIHINSA joka kerta uudelleen. Kun
ankkuria siirtää, sovittelu voi laskea dx/dy:n niin, että lopputulos
palaa lähelle alkuperäistä ruutupaikkaa (Nancy/Välimeri), TAI se voi
työntää jonkin ENNALLAAN pysyneen naapurinimiön uuteen, aiemmin
turvalliseen paikkaan (kolme uutta löydöstä). Ankkurin siirto ei siis
suoraan hallitse lopullista ruutupaikkaa — se on saman kaltainen
ongelma kuin fysiikkasimulaation yhden kappaleen siirtäminen ja
odottaminen, että muut eivät reagoi.

**Reversoin Ranskan pilottimuutokset** (git checkout, työpuu puhdas)
ennen kuin jatkoin muihin maihin, koska tulos ei ollut luotettava eikä
"siirrä sisäänpäin yhtenä haarana" toteutunut siististi.

**Päätöstä vaativa kysymys Fablelle:** kumpi tie?

1. **Iteratiivinen korjaus per maa**: muokkaa → lataa sivu uudelleen →
   mittaa koko maa uudelleen → jos yhä löydöksiä (vanhoja tai uusia),
   toista. Toimii, mutta jokainen maa vaatii moninkertaisen
   selainlatauksen (arvio: 3–6× 32 maan ajo koko listan läpiviemiseksi,
   kymmeniä minuutteja lisää, ja silti mahdollisesti jää tasapainoon
   jäämättömiä tapauksia).
2. **Koodikorjaus sovitteluun**: opeta `js/pallolauta/sovittelu.js`
   tuntemaan ruudun reuna omana esteenään (sama periaate kuin nykyinen
   "nimi ei mene kaupunkinimen päälle" -sääntö, mutta reunaa vastaan).
   Tämä olisi pysyvä, yleinen korjaus kaikille nykyisille JA
   tuleville nimiöille — mutta se on koodimuutos (Karttaseppä/
   Pelikoodari, ei Sisältökirjuri).
3. Rajattu yhdistelmä: korjaa data-anchorit VAIN niille 4/6-tyyppisille
   tapauksille, jotka pilotissa siirtyivät kerralla oikein (ei
   iteraatiota), ja jätä loput (kuten Nancy/Välimeri -tyyppiset, joissa
   sovittelu syö korjauksen) koodikorjauksen varaan.

Odotan päätöstä ennen kuin teen enempää koordinaattimuutoksia — data on
koskematon (git status puhdas tässä haarassa lukuun ottamatta uutta
työkalua).
