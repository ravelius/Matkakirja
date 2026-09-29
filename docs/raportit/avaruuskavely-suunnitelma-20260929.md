# Avaruuskävely: natiivin toteutussuunnitelma (Linssiseppä 2, 29.9.2026)

Omistaja 29.9. klo 00.0x ("Kyllä, radion jälkeen"), Päätoimittajan kuvaus: lyhyt käsikirjoitettu hetki (1–2 min),
ilmalukko → turvaköysi → auringonnousu aseman yli → Pulu radiossa → yksi valokuva, jota verrataan astronautin
NASA-kuvaan. Ei vapaata liikkumista. Konsepti: Codex 2026-09-28/avaruuskavely-konsepti (iPhone pysty, iPad vaaka).
Web päätetään erikseen natiivin jälkeen.

## Kokemus (tavoite)

Pelaaja on hetken ISS:n ulkopuolella: kaide käden alla, maa kaartuu alla, aurinko nousee aseman yli ja valo
pyyhkäisee metallia. Pulu kelluu omassa köydessään ja puhuu radiossa. Lopuksi pelaaja ottaa yhden kuvan, ja peli
näyttää sen rinnalla oikean ISS-astronautin kuvan läheltä samaa kohtaa. Kuva jää talteen.

## Vaiheet (yhteensä noin 70–100 s, jokainen ohitettavissa napautuksella)

| # | Vaihe | Kesto | Pelaajan teko | Toteutus |
|---|---|---|---|---|
| 1 | Ilmalukko (Quest) | 6–8 s | napauta: avaa luukku | 2D-kerrokset: sisäkehys, luukku liukuu, valovuoto; paineen sihinä |
| 2 | Ulos | 4 s | — | kamera ISS:n kaiteelle, etualan kerrokset (kaide, käsine) liukuvat paikalleen |
| 3 | Turvaköysi | 3–5 s | napauta: kiinnitä köysi | käsine + karabiini: irti → kiinni, napsahdus |
| 4 | Auringonnousu | 5–8 s | — | simukello kelaa ISS:n seuraavaan auringonnousuun (≤ 5 s kuten siirtymä); valo pyyhkäisee etualan kerroksia |
| 5 | Pulu radiossa | 15–25 s | — (napautus nopeuttaa) | Pulu (nykyinen astronautti-Pulu) kelluu köydessä, 2–3 repliikkiä radiokohinan läpi |
| 6 | Valokuva | pelaajan tahdissa | napauta: ota kuva | ruutu jäätyy, sulkimen ääni; vertailukortti: oma kuva + NASA-astronauttikuva ISS:n alapisteen läheltä |
| 7 | Takaisin | 3 s | napauta: takaisin sisään | paluu kyytiin (seuranta) |

## Mitä käytetään uudelleen

- Kamera ja maa: ISS-kyydin kamera (IssKyyti, SGP4-paikka, BMNG-pinta, pilvet, yövalot, tähdet). Uusi kyydin tila
  "Ulkona": silmä ISS:n kohdalla, katse horisonttiin noin 15° alas radan sivulle. Laatat piirtyvät tällä kulmalla
  (varapallon harmaa näkyi vain yli 50°:n kallistuksella, laite 29.9.).
- Auringonnousu: simukellon kelaus (Simukello, raja 5 s) seuraavaan hetkeen, jolloin aurinko nousee ISS:n kohdalla
  (Ylilennot.Valossa-kaava ISS:n korkeudelle korjattuna).
- Pulu: nykyinen astronautti-Pulu (Pulu.Astronautti) ja puhekuplat.
- Vertailukuva: Astronautin kamera -linssin NASA-kuva-aineisto (ISS:n alapistettä lähin kuva).
- Radio: radiolinssin kohinasilmukka Pulun puheen alle (Pelikoodarin radio-kohina-silmukka).

## Tarvittavat uudet osat

Codex, kerroksina kuten radio (kohdistetut, läpinäkyvät, iPhone pysty 1290×2796 ja iPad vaaka 2732×2048, manifest):
1. ilmalukon sisäkehys (Questin luukku sisältä), luukun kansi erillisenä (liukuu), valovuodon maski;
2. etualan kaide ja kädensijat, aurinkopaneelin kulma (valinnainen);
3. avaruuspuvun käsine ja karabiini kahdessa tilassa (irti / kiinni), turvaköysi (kaareva, erillinen);
4. kypärän visiirin reunus ja heijastus (hienovarainen, läpinäkyvä);
5. valokuvan vertailukortin kehys (kaksi kuvaa rinnakkain, tekstialueet manifestissa).
Pelikoodari (äänet): ilmalukon paineentasaus, luukku, karabiinin napsahdus, hengitys kypärässä (saumaton silmukka),
sulkimen ääni. Fable / Sisältökirjuri: Pulun 2–3 repliikkiä ja vaiheiden lyhyet ohjetekstit.

## Avoin kysymys Päätoimittajalle

Mistä avaruuskävely avataan? Tilauksessa "Pulun taulun omana tilana" — tarkoitetaanko ISS-kyydin säätöpaneelin
uutta riviä ("Avaruuskävely" Kohde-välilehdellä tai omana välilehtenään) vai Pulun kautta avattavaa tilaa?
Suositus: säätöpaneelin Nopeus | Kohde | Olosuhteet -riville neljäs välilehti tai Kohde-välilehden rivi, koska
kävely alkaa kyydistä (ISS:n sisältä ilmalukkoon).

## Järjestys

1. Kyydin tila "Ulkona" ja auringonnousun kelaus (ilman uusia kuvia, laitekuva kaiteen paikalla harmaina laatikoina).
2. Vaiheiden tilakone ja napautukset, Pulu ja repliikit paikkamerkkiteksteillä.
3. Valokuva ja NASA-vertailu.
4. Codexin kerrokset ja Pelikoodarin äänet sisään, kun tulevat; kuvapari (iPhone pysty, iPad vaaka) ennen merge-pyyntöä.
