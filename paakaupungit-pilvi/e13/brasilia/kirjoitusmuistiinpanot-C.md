# Brasília — C-luonnos 12.10.2026

Omistus vain e13/brasilia. NAS-klooniin kirjoitettu rajattu uusi A-faktapohja, sisalto.json ja tämä muistio. Muoto alkuperäisen Dakar-mallin mukaan. Ei kuvia/generointia, Git-operaatioita, pelitiedostojen muokkauksia, kytkentää tai julkaisua.

## Kirjoitetut osiot

- Artikkeli: intro 920 merkkiä, 9 virkettä, 2 kappaletta, 2 lihavointia; Lue lisää 874 merkkiä, 3 kappaletta.
- Kansi 4 nostoa ja luonto-teema 4 nostoa, kaikki 495–548 merkkiä.
- Matkailijan opas 5 jaksoa, 5 parasta-riviä, 4 hyvä tietää -riviä sekä matkailijalle-kappale.
- 5 kysymystä tasoilta 1–3, 3 tiesitkö-tietoa ja teemasivun minitehtävä.
- Kartta partial: 2 luontokohdetta omien Wikipedia-artikkeliensa pisteistä, 2 kohdejuttua (832/836 merkkiä).
- 20 kuvaroolissa neljä tyhjää kuvakenttää. Saatiedot null, saa.json muuttamatta.

## Todellinen paikallinen tarkistus

Alkuperäinen `node paakaupungit-pilvi/tyokalu.mjs tarkista e13 brasilia --lyhyt`, poistumiskoodi **1**:
**20 virhettä, 3 varoitusta, 0 kuvaa**. Tuloste `valiaikainen/nopea-e13-brasilia/tarkistus-lyhyt.txt`.
Varoitusten selvittämiseksi tarkistin myös ilman --lyhyt-lippua, sama tulos; `tarkistus-taysi.txt`.

Kaikki 20 VIRHE-riviä ovat `tiedosto puuttuu`: valokuva 1, kansikuvat 3, kansinostot 4, matkailijalle 1, opas 5, teemanostot 4, kohdejutut 2. **Ei muita konevirheitä.** Tarkistinta ei muutettu eikä virheitä piilotettu.

Varoitukset:
1. Kysymys 2: source ei Wikipedia-artikkeli — tarkoituksella Wikivoyage, jossa N/S-osoitetunnukset selitetään.
2. Kohteita 2 (pohjataso 6) — tekijäsuojatut rakennukset ja teokset jätetty pois; kartta aidosti partial. Järvi ja kansallispuisto ovat oikeita luontopaikkoja, eivät suojattujen rakennusten peitenimiä. Täyden keskustakartan piste- ja oikeusketju avoin.
3. Saatiedot puuttuu — 48/48 primääriauditointi ei valmis tässä työssä; null yhteisen ohjeen mukaan.

## Avoimet portit

Täysi A 6–8 kohteineen avoin, B kuvat avoin, D riippumaton faktantarkistus ja oppaan ajantasaisuus avoin, E/F avoin, sääauditointi avoin, hyväksyntä/pelikytkentä/julkaisu tekemättä. C-luonnos ei ole valmis-erä tai hyväksytty pelikaupunki.

Kuvaputken tarpeet ja tekijäsuojarajaukset ovat faktapohjan luvussa 7. Ei Niemeyerin rakennuksia, Costan suunnitelmaa teoskuvana, Chan-siltaa tai uusia veistoksia. Brasilian maalehden Amazon-, keisari-, musiikki- ja perinneruokatarinoita ei toisteta: teema paikallinen cerrado, kannessa osoitteet, asuinkorttelien arki, Vila Amaury sekä kaupungin rock/elokuvakulttuuri. Yleinen kaupunkihistoria antaa artikkelin kehyksen.

Lähteet, robots-/hakujäljet, mitat, SHA-256-manifestit ja alkuperäisen tarkistimen tulosteet NASin `valiaikainen/nopea-e13-brasilia/`-kansiossa.
