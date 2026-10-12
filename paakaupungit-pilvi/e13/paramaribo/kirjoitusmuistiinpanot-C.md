# Paramaribo — C-luonnos 12.10.2026

Omistus vain e13/paramaribo. Rajattu uusi A-lähdekooste ja kokonainen C-tekstiluonnos on tallennettu NAS-klooniin. Käytetty alkuperäisen Dakar-mallin rakennetta. Ei kuvia, generointia, Git-operaatioita, pelitiedostojen muokkauksia, kytkentää tai julkaisua.

## Kirjoitetut osiot

- Artikkeli: intro 945 merkkiä, 9 virkettä, 2 kappaletta, 2 lihavointia; Lue lisää 828 merkkiä, 3 kappaletta.
- Kansi 4 nostoa ja ruoka-teema 4 nostoa, kaikki 491–505 merkkiä.
- Matkailijan opas 5 jaksoa, 5 parasta-riviä, 4 hyvä tietää -riviä sekä matkailijalle-kappale.
- 5 kysymystä tasoilta 1–3; 3 tiesitkö-tietoa; ruoka-teemasivun minitehtävä.
- Kartta partial: 2 omaan artikkelipisteeseen sidottua kohdetta, 2 nähtävyysjuttua (755/852 merkkiä). Ei kaupungin pisteellä täytettyjä kohteita.
- Sää null, saa.json muuttamatta. Kaikki 20 kuvaroolia sisältävät neljä tyhjää kuvakenttää.

## Todellinen paikallinen tarkistus

Alkuperäinen komento `node paakaupungit-pilvi/tyokalu.mjs tarkista e13 paramaribo --lyhyt`, poistumiskoodi **1**:
**20 virhettä, 4 varoitusta, 0 kuvaa**. Tallennettu `valiaikainen/nopea-e13-paramaribo/tarkistus-lyhyt.txt`.
Varoitusten selvittämiseksi myös sama paikallinen tarkistin ilman --lyhyt-lippua; tallennettu `tarkistus-taysi.txt`.

Kaikki 20 VIRHE-riviä ovat `tiedosto puuttuu`: valokuva 1, kansikuvat 3, kansinostot 4, matkailijalle 1, opas 5, teemanostot 4, kohdejutut 2. **Muita konevirheitä ei ole.** Tarkistinta ei muutettu tai virheitä piilotettu.

Varoitukset:
1. Kysymys 2: source ei Wikipedia-artikkeli — tarkoituksella Unescon ensisijainen lähde katujen simpukkaharjanteille.
2. Kysymys 5: source ei Wikipedia-artikkeli — tarkoituksella Wikivoyage, jossa Blauwgrondin warungit on kuvattu.
3. Kohteita 2, pohjataso 6 — täysi kartta avoin; varmennettu vain Fort Zeelandia ja Palmupuisto. Katedraalin tekijä-/muutosvaiheketjua ei selvitetty loputtomasti; moderneja moskeijoita/temppeliä/patsaita ei tuotu karttaan.
4. Saatiedot puuttuu — 48/48 primäärivarmennus puuttuu; saatiedot null yhteisen ohjeen mukaan.

## Avoimet portit ja kuvaputki

A täydellisenä 6–8 kohteen faktapakettina avoin, B kuvat avoin, D riippumaton fakta- ja käytännön tietojen tarkastus avoin, E/F avoin, sääauditointi avoin, pelikytkentä/julkaisu tekemättä. Rajattu C-luonnos ei ole hyväksytty tai julkaisuvalmis kaupunki.

Kuvatarpeet on eritelty faktapohjan luvussa 7. Erityisesti Palmupuiston kuvassa huomio vain puustoon/puutarhaan, ei myöhempiin tekijäsuojattuihin patsaisiin. Tarkkoja vuosia/lukuja ei käytetä poikkeuksena sovittu 1873-kehys ja Wikipedian omat karttakoordinaatit. Väestöluku jää taustaan nimettynä Paramaribon piiriluvuksi.

Faktatukien jäljet, HTML/teksti, lähdehakumanifesti, alkuperäisen tarkistimen tulosteet sekä lopulliset SHA-256-tunnisteet ovat `valiaikainen/nopea-e13-paramaribo/`-kansiossa.
