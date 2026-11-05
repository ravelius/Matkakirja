# Codex → Karttaseppä: Sacré-Cœur24k / #2127, seitsemän kuvaa arvioitavaksi

Montparnasse24h:n toimituksen jälkeen tehty24k-kierros on toimitettu. **Oma kokonais-QA: FAIL; omistajan arvio vielä avoin.**

Seitsemän muuttamatonta PNG-kuvaa, kaikki natiivisti RGB1536×1024. Työkalukutsuja8: seitsemän palautti kuvan, yksi hylättiin ennen generointia kuuden referenssin vuoksi (raja5). Jokaisesta näkymästä syntyi yksi kuva. Ei natiivikoon uusintoja, QA-uusintoja, osamuokkauksia eikä uutta maapohjaa.

Paikallinen arviointikansio:
`/Users/Shared/Claude/proto-3d/_tyo/codex/pariisi-sarja-20261105/_review-sarja-24/sacre-coeur-otto2/`

[Toimitus:18tiedostoa, SHA256SUMS ja arviointiarkki](https://github.com/ravelius/Matkakirja/tree/8232b8b3169303acaeb7cdcdb768ed5e4635556d/posti/codex-karttaseppa-sarja24k-sacre-coeur-20261105)

Artifactcommit `8232b8b3169303acaeb7cdcdb768ed5e4635556d`; kaikki18tiedostoa tavuilleen luettu takaisin ja SHA256-varmennettu.

Parantuneet kohdat: lähes valkoinen kivi, suipommat kupolit, pohjoisakselin kellotorni, mäki ja eteläportaat sekä itä/lännen julkisivu reunalta. Vastakkaisten kuvien mäki- ja kirkkoleveyksien erot ovat alle5%.

Ratkaisevat poikkeamat:
- Yläkuva ei ole90°; julkisivujen sivuja näkyy. Mäen siluetti on4.888×annetun jalanjäljen pinta-ala ja pyöristetty kapseli.
- Mäen leveydet S/N/E/W ovat1369/1360/1495/1487px, tavoitteet600/600/1260/1260. Yhteinen3px/m ei toteudu.
- Korkeimman näkyvän rakennuskohdan korkeushajonta7.64%; sama ylälista maasta mitattuna12.08%.
- Pohjoisen pääkupolin kärki ja alalistan varma mitta ovat **null/peittynyt**. Kellotornin kärjestä ei johdeta kupolin korkeutta.
- Mäen nurmiharja, kirkon lattia ja etuterassin muuri on mitattu erillään. Näkyvät nurminousut281/249/252/252px. Etelän lattiadatumissa±12px epävarmuus.
- Tarkkaa65°/180°viistogeometriaa ei varmenneta. Koillisen paikallinen plinttiproksi on noin36°; lounaan luotettava pohjakulmamitta puuttuu.

Tarkat koordinaatit, mittasuhteet, kuvaleikkeet ja rajaukset: `QA.json`, `huomiot.md`, `sivumittaukset.png`, `ylakuva-QA.png` ja `viistomittaukset.png`. `LAHTEET.md` sisältää kolme uudelleen käytettyä luvallista Commons-valokuvaa ja96×50m:n todellisen ulkomitan lähde-epävarmuuden. Uusia verkkohakuja ei tehty.

Omistaja näkee arkin ennen Tripoa. Ei Tripo-siirtoa, R2:ta, runtime-integraatiota tai julkaisua. Mahdollinen kolmas otto jää omistajan päätettäväksi24k:n mukaisesti.
