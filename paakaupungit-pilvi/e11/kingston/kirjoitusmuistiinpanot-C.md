# Kingston – C-kirjoitusmuistiinpanot 12.10.2026

Tilanne: rajattu A-lähdekooste ja C-tekstiluonnos kirjoitettu. Ei täyttä A-porttia, kuvavalintaa, riippumatonta D:tä, E/F-hyväksyntää, pelikytkentää tai julkaisua.

## Kirjoitettu

- Johdanto 921 merkkiä, 9 virkettä, 2 kappaletta ja 2 lihavointia; jatkoteksti 914 merkkiä, 3 kappaletta.
- Kaupunkisivu + musiikkisivu, 4 + 4 nostoa, kaikki 484–546 merkkiä.
- Matkailijalle-osio ja viisi opasjaksoa; parasta 5, hyvä tietää 3.
- Viisi lähteellistä kysymystä, kolme tietoa ja erillinen minitehtävä. Tasot 1, 2, 3 ovat mukana.
- 18 kuvaroolia; niiden neljä kuvakenttää ovat kaikki tyhjiä. Ei keksittyjä tiedostonimiä tai kuvaosoitteita.

## Alkuperäinen tarkistin

`node paakaupungit-pilvi/tyokalu.mjs tarkista e11 kingston --lyhyt`

Todellinen tulos: **20 virhettä, 1 varoitus, 0 kuvaa; exit 1**. Raakaloki `valiaikainen/nopea-e11-kingston/tarkistus-lyhyt.txt`.

- 18 virhettä: `tiedosto puuttuu` kuvapaikoissa (valokuva, kansi 3, nostot 8, matkailijalle 1, opas 5).
- 1 virhe: `kohdekartta.rajat { pohjoinen > etela, ita > lansi }`, koska rajausta ei ole varmennettu ja arvo on null.
- 1 virhe: `kohteita 0 (1–15)`.
- 1 varoitus: puuttuva sääaineisto; `saatiedot:null` on tarkoituksellinen.
- Ei tekstien, kysymysten, minitehtävän tai oppaan rakenne-/mittavirheitä. Kone ei tarkista väitteiden oikeellisuutta; D on edelleen tekemättä.

## Lähteet ja ratkaisut

12 onnistuneesti luettua ja tallennettua sivua, mukaan lukien JNHT:n Devon House, UNESCO:n Reggae music of Jamaica ja FCDO:n nykyinen Jamaica safety and security. Haku- ja lähde-SHA-todisteet `hakutodisteet.json`:ssa. FCDO:n ohjeista oppaassa on lyhyt käytännön turvallisuusteksti: luotettavat luvalliset kuljetukset, ei kävelyä tai busseja pimeällä. Ei rikostapahtumia tai nykypolitiikkaa.

Hope Gardensin ristiriita säilytetty avoimena: kaupungin WP-artikkeli käyttää vuotta 1880 valtion ostosta/kasvikokeilun alusta; kohteen WP-artikkeli perustamisvuotta 1873. Tarkkaa vuotta tai varmaa vuoden 1873 puutarhanäkymää ei väitetä. D:n pitää ratkaista, ovatko kyseessä eri vaiheet.

Devon Housen tarkka rakennusvuosi ja George Stiebelin elinvuodet jätetty pois; perintöviranomaisen luettu teksti vahvistaa vain vuosisadan ja restauroinnin/käyttötavan. Musiikkilajien tarkat syntyvuodet, ensikeksijä- ja maailmanjärjestysväitteet jätetty pois. Laulunsanoja tai suojattujen teosten kopioita ei käytetä.

Väestölukua ei kirjoiteta: Kingstonin parish, Kingston–St. Andrew ja varsinainen kaupunkialue ovat eri alueita. Ilmastolukuja ei käytetä. `saa.json`:ia ei muutettu ja sääaineiston 48/48-primääriauditointi on avoinna.

## Avoimet portit

- D: jokaisen väitteen, kysymyksen, tiedon ja minitehtävän riippumaton tarkistus; erityisesti Hope Gardensin vaiheet.
- Kartta: 6–8 täyttä kohdepakettia ja rajaus. Devon Housen ja Hope Gardensin omat WP-pisteet on luettu faktapohjaan, mutta kohteiden oikeus-/tekijäketju ja 1873-kehys eivät vielä täytä hyväksyntää. Kaupungin tai lentoaseman pistettä ei lainata kohteelle.
- Kuvat: 18 roolia erillisestä kuvaputkesta sekä niiden henkilökohtainen katselu ja tekijänoikeusauditointi. Ei albumikansia, nuottiteoksia tai modernien muistomerkkien jäljennöksiä.
- B/D/E/F, ilmaston primääriauditointi, kytkentä ja julkaisu ovat myöhempää työtä.

Vain oman kaupungin faktapohja.md, sisalto.json ja tämä muistio kirjoitettu tuotantokansioon. Kaikki väliaineisto omassa NAS-polussa. Ei Git-operaatioita, uusia agentteja, muita kaupunkimuutoksia tai pelimuutoksia.
