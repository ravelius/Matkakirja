# Julkaisija: luovutus 6.11.2026 klo 00.41

Rooli: Julkaisija (JU). Korvaa -2347:n ALOITA-osan (haara julkaisija-luovutus-2347). Voimassa: -2347:n VIRHEET JA OPIT, -2152:n TAPA, JUNA 219 ja OPIT (haara julkaisija-luovutus-2152), -1906:n TAPA ja -1812:n SITOVAT LINJAT, VIRHEET ja OPIT. T = /Users/Shared/Claude/julkaisija-tyokalut, jonoloki T/jono-20261103-ilta.txt.

Nollaus: PT 00.4x pyysi nollaamaan itseni, kun jonon ajot on ajettu.

## ALOITA TÄSTÄ
1. Tilanne 00.41: L1 varattu, LAV ajaa itse aja-a1:n (35140432d, 2 kuvaa; vuoro 00.38). L2 vapaa. Jonossa ei muuta. JU:n omia taustaajoja ei kesken.
2. LAV:lta tulee LUKKO VAPAA: kirjaa AJO-rivi jonolokiin. Jos viesti on jo tullut ennen sinua, laske kuvat ja kirjaa, kun lukko on vapaa.
3. Käynnistä lukkovahti Monitorina (zsh T/lukkovahti.zsh, 30 min, käynnistä uudelleen päättyessä). Tämä sessio ei sitä käynnistänyt: ajoja seurattiin suoraan lukoista.
4. PT: yöllä tulossa NS:n ja KS:n kuvauskomentoajot ja VS:n ajo. KK 23.38: nähtävyyssarja (KS, VS) etusijalla.

## AJETTU 23.58–00.40 (jonolokissa kesto ja kuvat)
NS da2ab0af5 (c2), c266f6159 (c3), 2dfb96273 (c4, 3 kuvaa, palat vaihtuivat kesken), 2dfb96273 (c5, 4 kuvaa, korvaa c4:n). KS b9ea3e0db (5), 3834ea09b (12), 08e783b96 (1), 0f138c5de (15). VS e7c639217 (7, ajoi itse). LAV 35140432d sk-aukot kahdesti (5+5, ajoi itse). Kuvia en katsonut; tekijät katsovat itse. Kaikissa 0 PUUTE.

## VIRHEET JA OPIT
- NS ja KS pyytävät, että varjostinvirheestä pysäytetään ennen kuvia. mac-ajo.zsh ajaa käännöksen ja kuvat yhteen putkeen: virheen näkee vasta ajon jälkeen unity.logista (grep 'Shader error', 'error CS'). Kerro tämä tekijälle etukäteen.
- Ajo-kohtaiset lokihaut: en rajaa grepiä head -12:lla, jos tekijä pyytää kaikki rivit (maasto siirtyma). Rajaus piilotti c4:n kolmannen tila-rivin, ja KS:n tasorivit jäivät osittain näkemättä. Käytä grep 'MATKAKIRJA maasto siirtyma' unity.log.
- Peruutus tuli NS:ltä, kun c4 oli jo ajossa: rooli saa viestin myöhässä. Ajo vie noin 4 min, joten sen saa antaa valmistua, kun tekijä niin sanoo; uusi pyyntö samalla sha:lla ja uudella kansiolla on sallittu, kun skenaario tai palat ovat muuttuneet.
- Sama sha ja skenaario ei aina ole toisto: LAV:n koejuuri ja NS:n palat ovat repon ulkopuolella. Tarkista tiedoston aika (ls -l), ennen kuin palautat pyynnön toistona.
- Yli 5 kuvaa: hyväksyin KS 12 ja 15 (KK:n parit, aamun kortti, PT) sekä VS 7 (kolme kysymystä). Perustelu on kirjattu jonolokiin.
- Unity-loki: Cesium ion -yhteysvirhe ja fontit IM FELL English ja Grenze Gotisch näkyvät ajoissa; en selvittänyt, ovatko uusia. KS:lle kerrottu.
