# Noston vuosiluvut: Garnier'n koe ja kolme sivuhavaintoa (SK 17.11.2026)

Tilaus: PT → SK (KK:n suunnitelma `scratchpad/keskustelukanava/suunnitelmat/20261117-noston-vuosiluvut.md`, kohta 5 ja sivuhavainnot 1 ja 6).
Pohja: main 7c66c99c6e. Mitään ei ole muutettu datassa; korjaus-PR vasta KK:n sanalla.

## (a) Palais Garnier'n kolme vuosiriviä → OK, KK voi antaa kokeen NUI:lle

Teksti: `js/packs/nahtavyysjutut.js` pariisi["Palais Garnier"] (r. 5314–5339). Lähderivi datassa on pelkkä "Wikipedia"; tarkistus tehty kahdesta lähteestä.

| Rivi ruudulla | Kohta tekstissä (tasan kerran) | Lähde 1 | Lähde 2 | Tulos |
|---|---|---|---|---|
| – suunnittelukilpailu 1860 | "joulukuussa 1860" | fr-Wikipedia "Palais Garnier": arrêté 29.12.1860 julistaa kilpailun, 171 kilpailijaa; en-Wikipedia: julkistettu 30.12.1860, noin 170 | Opéra national de Paris (operadeparis.fr, Palais Garnier): "1860 … 171 architectes"; napoleon.org: avattu joulukuussa 1860, 171 ehdotusta | OK |
| – Garnier voitti 1861 | "toukokuussa 1861" | fr-Wikipedia: julistettiin voittajaksi 30.5.1861, yksimielisesti | Opéra national de Paris: "30 mai 1861 : Garnier est proclamé vainqueur" | OK (huom. "yksimielisesti" on vain fr-Wikipediassa; Opéra de Paris -sivu sanoo "à l'unanimité au second tour" historiasivullaan, joten OK) |
| – nimi vaihtui 1989 | "vasta 1989" | fr-Wikipedia: talo oli "opéra de Paris" vuoteen 1989 asti; Opéra Bastillen avautuessa sitä alettiin kutsua arkkitehdin nimellä | en-Wikipedia: päänäyttämö vuoteen 1989, jolloin Opéra Bastille avattiin | OK, mutta varoitus alla |

Muu teksti samoilla lähteillä: peruskivi 1862 (Opéra: 21.7.1862; fr-WP: 5.5.1862; vuosi sama) ja avajaiset 1875 (5.1.1875, kaikki lähteet) OK.

**Varoitus riville 3.** Nimi ei vaihtunut virallisena päätöksenä 1989: kumpikaan lähde ei anna päätöstä tai päivää. Se on käytännön nimitys, joka yleistyi kun Opéra Bastille avautui. Teksti "Nimi vaihtui arkkitehdin mukaan vasta 1989" menee läpi, mutta rivi "nimi vaihtui 1989" on vahvempi väite kuin lähde. Ehdotus riviksi: "– Garnier-nimi 1989" tai "– nimeksi Garnier 1989" (14–17 merkkiä, mahtuu 20:een). Tekstiin ei tarvita muutosta.

**Rivi KK:lle:** Garnier'n kolme riviä kestävät kahden lähteen tarkistuksen (1860, 1861 ja 1989 oikein); vaihda kolmas rivi "nimi vaihtui 1989" → "Garnier-nimi 1989", koska lähteet eivät tunne virallista nimenmuutosta.

## (b) Sivuhavainnot

### 1. Riemukaari "haudattiin vuonna 1920" → VIRHE (osittain)

Teksti: `js/packs/nahtavyysjutut.js` r. 5026: "Kaaren alla lepää Tuntemattoman sotilaan hauta, jonne haudattiin vuonna 1920 nimetön ranskalaissotilas …" Lähderivi "Wikipedia".

Lähteet:
- en-Wikipedia "Tomb of the Unknown Soldier (France)": arkku tuli kaaren alle Aselepopäivänä 11.11.1920; "was not buried until 28 January 1921".
- Le Figaro 28.1.2021 (historioitsija Christophe Soulard-Coutand; haettu hakutuloksena, en avannut koko sivua) ja Connexion France: väliaikainen sijoitus palokappeliin kaaren ensimmäisessä kerroksessa 11.11.1920, lopullinen hautaus 28.1.1921.

Päätelmä: 1920 on saapumisvuosi, ei hautausvuosi. Hautaus oli 28.1.1921. Huom. samassa tekstissä (nahtavyysjutut.js r. 3437) Westminster Abbeyn Tuntemattoman sotilaan hauta "tehtiin 1920": se on oikein (haudattu 11.11.1920), eri asia.
Ehdotus tekstiksi: "jonne tuotiin 11. marraskuuta 1920 nimetön ranskalaissotilas ja jonne hänet haudattiin 28. tammikuuta 1921" (kaksi vuotta, kaksi riviä, jos NUI haluaa; tai pelkkä 1921 "– hauta 1921"). Kuvateksti ja lyhyt eivät mainitse hautausta. Lähderiville lisäys: "en-Wikipedia, Le Figaro 28.1.2021".

### 2. Orsay "Asema suljettiin jo 1939" → VIRHE (osittain)

Teksti: `nahtavyysjutut.js` r. 5292 ja kuvan `lyhyt` r. 5305 ("suljettiin 1939") ja `selite` ("suljettiin jo 1939").

Lähteet:
- POP (Mérimée PA00088689): "1939: long-distance service ends, and the station serves only the suburbs"; hotelli sulkeutui 1973; museo avattiin 1.12.1986.
- fr-Wikipedia "Gare d'Orsay": 1939 kaukoliikenne siirrettiin Austerlitzin asemalle; 1950-luvulla vain osa laitureista oli käytössä lähiliikenteelle; 1979 RER C:n läpikulkuasema.
- en-Wikipedia: "by 1939 … closed to long-distance traffic"; lähijunat jatkoivat "for some years afterwards".

Päätelmä: 1939 loppui kaukoliikenne (laiturit liian lyhyitä pidemmille sähköjunille), ei asema. Lähijunat jatkoivat. Lopullista liikenteen päättymispäivää en löytänyt kahdesta lähteestä, joten "suljettiin" ilman rajausta ei kestä, eikä "seisoi vuosikymmeniä vailla käyttöä" ole sellaisenaan tuettu (hotelli 1973 asti, rakennus uhkasi purkautua, suojeltu 8.3.1973).
Ehdotus: "Kaukojunat lakkasivat kulkemasta asemalle jo 1939, ja rakennus jäi vuosikymmeniksi vähälle käytölle." Kuvatekstin `lyhyt`: "… kaukoliikenne loppui 1939 …"; `selite`: "kaukoliikenne loppui jo 1939". Joulukuu 1986 on oikein (POP: 1.12.1986; en-WP: December 1986). Vuosirivi: "– kaukojunat loppuivat 1939" ylittää 20 merkkiä → "– kaukoliikenne 1939" (19).

### 3. Trocadéron kaksi tekstiversiota

Tilaus: omistajan kuvassa 16.11. 22.25 "rakennettiin vuosina 1876–1878" ≠ `monumentit-eurooppa.js`:n "marraskuusta 1876 kesäkuuhun 1878".

Havainto: nykyisessä mainissa **kuukausiversiota ei ole missään data-tiedostossa**. "marraskuusta 1876 kesäkuuhun 1878" esiintyy vain luonnoksissa ja tarkistusraporteissa (`docs/raportit/pariisi-hahmotelmat-hakukierros-4-20261115.md` r. 126: "Pois: …marraskuusta 1876 kesäkuuhun 1878") ja se poistettiin PR 6781:ssä. Molemmissa teksteissä lukee nyt "rakennettiin vuosina 1876–1878":
- `monumentit-eurooppa.js` r. 257–285, id `trocadero` (kadonnut ihme, kuva ihme-trocadero-loistoaika.jpg): "Palatsi rakennettiin vuosina 1876–1878. Vuonna 1935 keskisali ja tornit purettiin …"; ei urkujen kuukautta.
- `nahtavyysjutut.js` r. 6424–6455, nosto `hahmotelma-trocadero` (maakartat.js r. 5353 osoittaa tähän): "Todellinen palatsi rakennettiin vuosina 1876–1878 … urut vihittiin elokuussa 1878 … seisoi vuoteen 1935".
Omistajan kuvassa ollut teksti vastaa kumpaakin.

Kaksi eri tekstiä samasta kohteesta on silti B 3:n vastainen (yksi asia, yksi paikka): vuodet ja yksityiskohdat eroavat (nähtävyysjutussa 1823, 1811, 1873 ja elokuu 1878; ihmekohteessa ei). Mikä viedään, määräytyy sen mukaan, kumpi nosto kartalla aukeaa: `maakartat.js`:n kohteen `nosto: 'hahmotelma-trocadero'` mukaan se on `nahtavyysjutut.js`:n teksti; `monumentit-eurooppa.js`:n teksti on ihmekohteen oma. En selvittänyt koodista, kumpi näytetään missäkin ruudussa (se on PK:n/NUI:n polku). Vuosirivejä varten kumpikin tarvitsee oman `vuodet`-kentän, ja niiden rivit on pidettävä samoina.

Faktat kahdesta lähteestä: en-WP: työt "between November 1876 and June 1878", ensimmäinen virallinen konsertti salissa 8.6.1878, purettu 1935 (huom. en-WP:n navbox sanoo 1876–1934, mikä on ristiriidassa tekstin kanssa); fr-WP: Davioud ja Bourdais, "construit pour l'exposition universelle de 1878", Chaillot'n palatsin työt 1935–1937. "1935 purettiin" OK. Kuukausiväli on vain en-WP:ssa, siksi se jätettiin pois.

**Ehdotus:** korjaus-PR (KK:n sanalla): Riemukaari (1920 → tuotiin 1920, haudattiin 1921) ja Orsay (suljettiin → kaukoliikenne loppui). Trocadéron kaksoisteksti KK:lle päätettäväksi (kumpi on pääteksti); sisältö ei ole väärin.
