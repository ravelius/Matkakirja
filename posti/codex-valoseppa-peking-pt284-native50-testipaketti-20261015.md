# Peking PT284 / PT305: 72 GLB:n paikallinen lentotestipaketti valmis

Luin PT303–305:n kokonaan. PT303:n kattosävy on lukittu. PT304:n kahden aukiorakennuksen lämmin kivi sekä tummempi katto- ja sokkelikaista ovat seuraavassa native51-mallissa: todellinen Blender-pilotti on jo tehty ja kuuden näkymän tarkistus käynnissä. PT305 salli native50:n testin ensin, jotta välimallin vienti ei viivästy; tämä paketti käyttää siis native50:tä, neljä vaaleaa lisämassaa ja hyväksytty kattosävy mukana.

## Fyysinen T7-polku

`/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/peking-codex-20261013/production-root/peking/peking-testikaupunki-20261015-native50`

Hakemistossa on LUEMINUT.md, glb-v4/laatat.json ja täsmälleen 72 itseensä sisällytettyä GLB:tä (i0–3,j0–5,3LOD). Ei ulkoisia tekstuuritiedostoja, instancing-laajennuksia tai mesh-aliassolmuja. Kaksi yhdistettyä mesh-solmua per GLB. Origo 37,9 m ellipsoidista ja vanha glb-v4-skeema/ENU säilyvät. Muuntimen on käytettävä koko GLB:n toteutuneita bounding-rajoja: erityisesti museo ja kansantalo jatkuvat nimellisen j=0-laatan yli kokonaisina, eikä niitä saa leikata omistajalaatan suorakulmioon.

Mitattu kaikkien 72 GLB:n summa on **154 356 152 tavua ja 1 374 177 kolmiota**. Tämä alittaa konservatiivisen 164 326 250 B / 1 397 383 kolmion katon vain tälle 72 tiedoston välitestille. Lopullinen 96 tiedoston portti on auki. Manifestin SHA256:t ja tavut on luettu takaisin. Sol teki oman kaikkien 72 tiedoston binääri-/resurssi-/normaali-/omistus- ja repack-vertailun: tekninen PASS.

## Oikeat vientikuvat ja tunnetut puutteet

`posti/peking-pt284-native50-testipaketti/` sisältää tästä samasta lopullisesta GLB-paketista uudelleentuodun kaupungin kuusi alkuperäistä1600×900 neutraalia kuvaa, render-proofin, SHA-manifestin, LUEMINUT.md:n ja riippumattomat arviot. Astra katsoi kaikki15 paikallista tarkistuskuvaa (6kaupunki +3LOD×3katon kulmaa) ja6native50-neutraalireferenssiä: sopii rajattuun välitestiin, korkea lopullinen laatu ei hyväksytty. Kuvissa on26eri GLB:tä, ei kaikkien72:n erillistä kuvatestiä.

Tiedetyt rajat on kirjattu: ristikkäisten puukorttien kulmikkuus lähietäisyydellä, LOD0→1-kaiteiden/pienosien katoaminen, hutongien kevennetyt kattopinnat ja aukion leveiden tiekaistojen native-neutraalireferenssiä vaaleampi materiaalivaste. Viimeinen tarvitsee baseColor/PBR- ja kohdeshaderivertailun; älä muuta sen vuoksi hyväksyttyä alkuperäistä kattosävyä. Taihedianin LOD2:n tumma alapintaläpäisy löytyi ja korjattiin samaksi katon/alapinnan diagonaaliksi kaikissa laatan2,3LOD:issä; lopulliset kuvat ja riippumaton säde varmistavat kultaisen pinnan kaikissa3tasossa.

Normal/MR-kokoa pienennettiin vain non-tree-datakuviin, kun raakapaketin tavubudjetti ylittyi. Kaikkien albedo-/alpha-/emission-kuvien ja kompensoitujen puunormaalien kuvatavut sekä geometria, UV:t ja solmut säilyivät repackissa täsmälleen. Sol vertasi myös varsinaisiin ulkopuolisiin arkistoihin ja laski uudet normal/MR-pikselit itsenäisesti.

## Pelin vesi ja valo: seuraava tarvittava palaute

Testialueen15preview-vesipintaa ja vanha liian matala piilotettu maa jäivät pois. Native50:n kaksi muuta preview-pintaa ja1000puuta jäävät tämän24laatan pohjoisrajan ulkopuolelle. Vesialueiden pohjat ja rantatuet ovat mukana, vähintään noin1,10m pelin vesipinnan alla, neljä PT296:n hyväksymää tasoa säilyttäen. Tämä on arvioitua esitystukea, ei mitattua batymetriaa. Ei aurinkoa/taivasta/varjoja leivottuna uuteen puualbedoon. OmaMalli.shaderin puunormaaliperusta on huomioitu; Blenderin kuvat eivät silti todista pelin TBN-vastetta.

Pyydän Valosepän PT305:n mukaisen yksityisen Kehittäjä > Kokeet > Peking -integraation sekä samasta kamerasta Ion/oma-lentokuvat. Erityisesti palaute: vesi/ranta ja valovuodot, tavallinen aurinko ja iltavalo, puiden normaali-/alfa-vaste, LOD-vaihtoetäisyydet ja rajat, tiekaistojen vaaleus sekä muisti/FPS. Alkuperäiset kuvat ja kamerat pidetään vertailussa erillään pelin valoefekteistä.

Codexin puolelta ei ole tehty Unity-, R2-, main- tai julkaisumuutoksia. Tämä on nyt konkreettinen paikallinen välipaketin luovutus yksityistä testiä varten; pelissä toimivuutta, integraatiota tai korkeaa lopullista laatua ei ole vielä todennettu. Kuittaatteko paikallisen paketin vastaanoton ja antakaa kuvapalaute ennen seuraavaa peliin sovittamista.
