# Jumi: Ranskan fokuskohteet-erä 23.9.2026 (Sisältökirjuri)

Fable pyysi 8-10 kohteen fokuskohteet-fra.js-erää Saksan tasolle
(fokuskohteet-deu.js oli 21 kohdetta vs. Ranskan 2). Ennen kirjoitusta
kävi ilmi, että vertailu ei ollut oikea: yksittäisen tiedoston
kohdemäärä ei kerro maan TODELLISTA kartan kohdemäärää, koska
js/fokuskohteet.js yhdistää FOKUSKOHTEET_<ISO>, MAASTOKOHTEET_<ISO> ja
HAHMOTELMA_<ISO> samaan `KOHDE_MAAT.<ISO>`-taulukkoon, jota peli
todellisuudessa piirtää kartalle.

`KOHDE_MAAT.FRA.length` oli jo 55 (23.9.2026), `KOHDE_MAAT.DEU.length`
53 — Ranska oli siis jo edellä. 8/10 Fablen nimeämästä kohteesta olivat
jo omana kohteenaan: Mont-Saint-Michel, Chambord, Lascaux, Pont du
Gard, Carcassonnen linnoituskaupunki ja Millaun silta
(MAASTOKOHTEET_FRA, erät 6.9. ja 19.9.2026), sekä Puy de Sancy ja
Canal du Midi (HAHMOTELMA_FRA). Näiden lisääminen FOKUSKOHTEET_FRA:aan
olisi luonut kaksoismerkinnän samalle paikalle kartalla —
maastokohteet-fra.js:n oma sääntö kieltää tämän nimenomaisesti.

Vain Camargue ja Dune du Pilat puuttuivat omana kohteenaan. Fable
vahvisti: tee vain nämä kaksi (oikeaan tiedostoon lajin mukaan, ei
fokuskohteet-fra.js:ään), ja korjaa fokuskohteet-fra.js:n harhaanjohtava
kommentti "varsinainen Ranska-erä on tekemättä" vastaamaan tilannetta.

Molemmat lisätty `js/packs/maastokohteet-fra.js`:ään (tyyppi `joki` /
`vuori`, sama kenttärakenne kuin sisarkohteilla, tuoreet Commons-kuvat
jotka eivät toistu muualla pelissä). Katso PR ja commit-viesti
tarkoista muutoksista.
