# C-erän neljä henkilökorjausta – lopputarkistus

Valinnat **28a1, 30a1, 34a2 ja 37a1**. Toteutuneita kuvakutsuja 5: 28/30/37 yksi kukin ja 34 kaksi. Kaikki 5 palautuivat; valittuja4, hylättyjä ja säilytettyjä1. Kutsuja ei ole kesken. Kaikki kuvat ovat kokonaisia uusia generointeja, ei osamuokkauksia. Vain tämä uusi retry-erä on omaa kirjoitusaluetta; vanhoja toimituksia tai muiden agenteiden tiloja ei muutettu.

## Lähteet ja henkilöt

PT:n C-kuittaus posti/paatoimittaja-codex-muistokuplat-era-c-kuittaus-20261019.md luettiin kokonaan: commit 43e464bb68b591d5521d6c0eaa1118c265b86497, blob fb4c5d92e6d6e10336296173c8fc667a1789a99f. Myös B-kuittaus luettiin kokonaan. Molemmat lähdetiedostot on säilytetty source-evidence-kansiossa tarkisteineen. Sama kasvo saa esiintyä enintään kahdessa kuplassa, paitsi nimetyt Puyi/opettaja/imettäjä. Kanoninen esine- ja kohtaustieto inventory-51.jsonista, main ed1ce5c0415fc076ce252054a93feb164dbd229d. Lähikuvan sommittelulähde 86898a4b/d7518218 säilyy.

- **28:** uusi noin 30–35-vuotias kapeampi-/kulmikkaampikasvoinen mustatukkainen nainen indigossa pitkässä työkaavussa. Pitkä pensseli täyttää metallilankojen rajaamaa cloisonné-lokeroa; polttimen pyöreä runko, kaksi korvaa, kolme jalkaa ja viereinen rei'itetty kansi ovat oikein.
- **30:** uusi noin 50-vuotias pyöreä-/täyteläiskasvoinen nainen, harmaata ohimoilla, vihertävä pitkä työkaapu ja vaalea työpajaesiliina. Hän maalaa kuparille emalikukkia suorakaiteiseen avattuun rasiaan. Kuparireuna/sarana, matala pohja ja maalattu sileä emali näkyvät; ei cloisonné-lankalokeroita.
- **34a2:** uusi noin 65-vuotias kalju, pyöreäkasvoinen vanha lakkamestari, ei partaa tai pukinpartaa. Veitsi työstää punaisen lakka-astian kerroksellista reliefiä ja punaiset lastut näkyvät puupöydällä. Astian muoto ja materiaali säilyvät. a1 kasvoi noin 50%korkeaksi ja liian sivuun: rootin pyytämä yksi uusi kokonaisgenerointi pienensi astian noin 36 %:iin ja keskemmälle. a1 säilyy hylättynä historiana.
- **37:** lähettiläs noin 40-vuotias hoikempi pitkänomaiskasvoinen parraton mies oliiviasussa; virkamies noin 55-vuotias leveämpi-/kulmikkaampikasvoinen harmaantunut parraton mies laivastonsinisessä. Taustalla eri nuori nainen taputtaa pehmeästi sumeana. Avoin paperinen taittoviuhka bamburipoineen ja maisemineen luovutetaan käsistä käsiin.

Kaikkien neljän natiivit ja lopullinen yhteinen 160 px-arkki on katsottu henkilökohtaisesti. Näiden viiden pääkasvon keskinäinen vertailu tehtiin: ne erottuvat iän, kasvonmuodon ja ulkonäön perusteella. Vertailussa käytettiin myös aiemmin henkilökohtaisesti nähtyjä valkopartaisia C-lähtökuvia, uutta D45a2:ta ja 49:n imettäjää. Tämä on tämän erän vertailuraja, ei väite uudesta kaikkien 51 slotin vastaanottohyväksynnästä.

## Sommittelu ja rehelliset poikkeamat

Esineet ovat teräviä etualalla; tausta on erittäin voimakkaasti optisesti sumea. Luonnollinen pehmeä valo ja materiaalit säilyvät. Pelin soikiohäivytys esiintyy vain erillisessä QA-arkissa: 160 × 213 px, sisäsäde 0,45, ulkosäde 1 ja 1-smoothstep.


- 28:n esine noin28–29 % kuvan korkeudesta, hieman yleistä30–40 % tavoitetta pienempi.
- 30:n matala leveä avoin rasia noin23–24 % korkeudesta;30–40 % korkeustavoite ei täyty. PT:n jo hyväksymä luonnollinen esinemuoto säilytettiin vääristämättä.
- 34a2:n astia noin36 % korkeudesta. Kasvojen tärkeät piirteet näkyvät lähellä keskialuetta/varhaisen loivan häivytyksen alussa.
- 37:n viuhka noin24 % korkeudesta. Kasvot eivät ole kokonaan 0,45-ytimessä: **facesProtected:false, PTConditionalCompositionReview:true**. Manuaaliset natiivipisteet: oikea ulompi silmä noin r 0,71 / alpha 0,54; suu noin r 0,60 / alpha 0,83. Ilmeet ovat 160 px:ssa luettavissa, mutta oikean kasvon ulkoreuna häipyy. Root katsoi natiivin ja 160 px -arkin ja pyysi toimitusta tällä nimenomaisella ehdolla ilman uutta 37-kutsua.

## Tekniikka ja toimitus

Kaikki tuotantokuvat 1086 × 1448 RGB PNG ja peittäviä. Ei teknisiä kokovientejä: kaikki valitut natiivit suoraan 1086 × 1448.

Kaikki yritykset, natiivit, promptit, syötepolut, alkuperäisten referenssien SHA256-tarkisteet ja QA säilytetään NASilla ja T7:llä. NAS/T7-tiedostot varmennetaan SHA256-tarkisteilla. Tuottajan QA valmis, 37 ehdollinen PT-arvio. Uusien tiedostojen postitoimitusta, PT-hyväksyntää, omistajahyväksyntää tai peliin kytkentää ei väitetä. Parent hoitaa postitoimituksen ja yhteiset ledgerit.
