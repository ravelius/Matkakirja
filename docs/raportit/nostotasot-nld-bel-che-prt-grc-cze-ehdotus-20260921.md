# Nostotasot: NLD/BEL/CHE/PRT/GRC/CZE ehdotus (2026-09-21)

Toinen erä loppujen Euroopan maiden nostotasoista (ensimmäinen:
GBR/POL/AUT, docs/raportit/nostotasot-gbr-pol-aut-ehdotus-20260921.md).
DEU/ITA/ESP olivat jo mainissa — Julkaisijan cherry-pick-tarkistus
osoitti tyhjän diffin, kolme mergeamatonta haaraa poistettu tarpeettomina.

## NLD — ehdotus (6, tunnetuin ensin)

Pooli: `maastokohteet-nld.js` (13), `hahmotelma-nld.js` (29). Amsterdamin
kohdekartan nostot (tulppaanimania, Leeuwenhoek, kirja-arkku, Afsluitdijk-
kertomuslinja) eivät kelpaa — huom: pääkartalla ON myös OMA erillinen
Afsluitdijk-nosto (11.9.2026 lisätty), eri kohde kuin Amsterdamin.

| Nosto | Tiedosto | Tyyppi | Perustelu |
| --- | --- | --- | --- |
| Kinderdijkin myllyt | hahmotelma-nld.js | tekniikka | Unesco, Alankomaiden kansainvälisesti tunnetuin yksittäinen maamerkki |
| Keukenhof | hahmotelma-nld.js | kulttuuri | Maailman suurin tulppaanipuutarha, ikoninen mielikuva |
| Giethoorn | maastokohteet-nld.js | kulttuuri | "Pohjolan Venetsia", viraalisti tunnettu |
| Vredespaleis | maastokohteet-nld.js | historia | Haagin rauhanpalatsi, Kansainvälinen tuomioistuin |
| Gouda | hahmotelma-nld.js | ruoka | Maailmankuulu juustobrändi |
| Vaalserberg | maastokohteet-nld.js | vuori | Alankomaiden korkein kohta |

Lähellä: Afsluitdijk ja Woudagemaal (tekniikka, hävisivät Kinderdijkille).

## BEL — ehdotus (6, tunnetuin ensin)

Vain `hahmotelma-bel.js` (26) — ei erillistä maastokohteet-tiedostoa.
Brysselin ikonisimmat (Grand-Place, Manneken Pis, Atomium) EIVÄT kelpaa
— kaupungin kohdekartan/fokusvirran sisältöä, ei pääkartalla.

| Nosto | Tiedosto | Tyyppi | Perustelu |
| --- | --- | --- | --- |
| Waterloon leijonakumpu | hahmotelma-bel.js | historia | Napoleonin tappio, maailmanhistorian tunnetuimpia taisteluita |
| Bruggen Belfry | hahmotelma-bel.js | kulttuuri | Unesco, Belgian tunnetuimpia matkailusymboleita |
| Menin Gate (Ypres) | hahmotelma-bel.js | historia | 1. maailmansodan muistoportti, päivittäinen Last Post -seremonia |
| Chimay | hahmotelma-bel.js | ruoka | Trappistiolut ja -juusto, kansainvälisesti tunnettu |
| Canal du Centren laivanostimet | hahmotelma-bel.js | tekniikka | Unesco, ainutlaatuinen hydraulinen ratkaisu |
| Hautes Fagnes | hahmotelma-bel.js | vuori | Belgian korkein kohta |

Lähellä: Orvalin luostari (ruoka), Bois du Cazier (kaivosonnettomuus, Unesco).

## CHE — ehdotus (6, tunnetuin ensin)

Pooli: `maastokohteet-che.js` (16), `hahmotelma-che.js` (13) = 29.
Sveitsin oma kohdekartta (Landsgemeinde-nosto) suljettu pois.

| Nosto | Tiedosto | Tyyppi | Perustelu |
| --- | --- | --- | --- |
| Matterhorn | maastokohteet-che.js | vuori | Alppien tunnusvuori, "maailman kuvatuin vuori" |
| Reininputous | maastokohteet-che.js | joki | Euroopan voimakkain vesiputous |
| Kapellbrücke | maastokohteet-che.js | kulttuuri | Luzernin katettu silta, Euroopan vanhin laatuaan |
| Chillonin linna | maastokohteet-che.js | historia | Genevenjärven linna, tunnettu mm. Byronin kautta |
| Gruyères | maastokohteet-che.js | ruoka | Antoi nimen gruyère-juustolle |
| CERN | hahmotelma-che.js | tekniikka | Maailman suurin hiukkaslaboratorio, WWW:n syntypaikka |

Lähellä: Jungfrau/Aletschin jäätikkö (vuori-paikasta hävisivät Matterhornille),
Gotthardin tunneli (tekniikasta hävisi CERNille), St. Moritz (urheilu).

## PRT — ehdotus (6, tunnetuin ensin)

Pooli: `maastokohteet-prt.js` (13), `hahmotelma-prt.js` (30, kaikki lahi:true).
Belémin torni, Jerónimos, Porto, Coimbra, Nazaré EIVÄT kelpaa — Lissabonin
kohdekartan/fokusvirran sisältöä.

| Nosto | Tiedosto | Tyyppi | Perustelu |
| --- | --- | --- | --- |
| Sintra | maastokohteet-prt.js | kulttuuri | Portugalin tunnetuin kohde Lissabonin jälkeen, Unesco |
| Douro | maastokohteet-prt.js | joki | Porttiviinilaakso, Unesco-maisema |
| São Vicenten niemi | maastokohteet-prt.js | merenkulku | Mannereuroopan lounaisin kärki, löytöretkien symboli |
| Batalhan luostari | maastokohteet-prt.js | historia | Unesco, itsenäisyystaistelun voitonkirkko |
| Torre (Serra da Estrela) | maastokohteet-prt.js | vuori | Mannermaisen Portugalin korkein kohta |
| Elvas | maastokohteet-prt.js | tekniikka | Unesco, maailman suurin säilynyt bastionijärjestelmä |

Lähellä: Tomarin luostari ja Guimarães (historia-paikasta hävisivät Batalhalle).

## GRC — ehdotus (6, tunnetuin ensin)

Ei erillistä maastokohteet-tiedostoa: pooli on `fokuskohteet-grc.js` (35)
+ `hahmotelma-grc.js` (35). Akropolis/Akropolis-museo/Agora/Olympieion
KELPAAVAT vaikka ovat myös Ateenan kohdekartalla (viittaus id:llä, ei
duplikaatti) — toisin kuin GBR:n Big Ben.

| Nosto | Tiedosto | Tyyppi | Perustelu |
| --- | --- | --- | --- |
| Akropolis | fokuskohteet-grc.js | historia | Antiikin tunnetuin yksittäinen kohde, Parthenon |
| Santorini | fokuskohteet-grc.js | saari | Kansainvälisesti tunnetuin Kreikan saari |
| Meteora | hahmotelma-grc.js | kulttuuri | Unesco, kalliopylväiden luostarit |
| Delfoi | fokuskohteet-grc.js | historia | Antiikin oraakkeli |
| Olympia | fokuskohteet-grc.js | urheilu | Olympialaisten syntypaikka |
| Knossos | fokuskohteet-grc.js | historia | Minolainen palatsi, Kreetan lippulaivakohde |

Lähellä: Korintin kanava (tekniikka), Olympos (vuori), Navagio (saari),
Rodoksen kolossi (kadonnut ihme, toissijainen).

## CZE — ehdotus (6, tunnetuin ensin)

Pooli: `maastokohteet-cze.js` (17), `hahmotelma-cze.js` (28). Karlštejnin
linna EI kelpaa — Prahan kohdekartan/fokusvirran kohde.

| Nosto | Tiedosto | Tyyppi | Perustelu |
| --- | --- | --- | --- |
| Český Krumlov | maastokohteet-cze.js | historia | Tšekin tunnetuin kohde Prahan jälkeen, Unesco-satukaupunki |
| Kutná Hora | maastokohteet-cze.js | historia | Unesco, Sedlecin luukirkko |
| Sněžka | maastokohteet-cze.js | vuori | Tšekin korkein huippu |
| Vltava | maastokohteet-cze.js | joki | Tunnetuin joki (Smetana), korvaa "meri"-roolin sisämaavaltiolle |
| Karlovy Vary | hahmotelma-cze.js | kulttuuri | Kylpyläkaupunki, kansainvälinen elokuvafestivaali |
| Plzeňský Prazdroj | maastokohteet-cze.js | ruoka | Pilsner-oluen alkuperäpanimo |

Lähellä: Moravský kras (vuori/luola), Austerlitz/Slavkov (historia,
hävisi kolmannesta historia-paikasta).

## Ei muutoksia tehty

Kaikki yllä on ehdotus — `taso`-kenttää ei ole vielä kirjoitettu
mihinkään näistä kuudesta maasta. Odotan hyväksyntää ennen dataan
kirjoittamista (sama malli kuin GBR/POL/AUT: yksi haara per maa,
tuoreelta origin/main-kärjestä, testit 0 fail per haara).
