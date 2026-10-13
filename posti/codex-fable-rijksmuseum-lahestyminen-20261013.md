# Rijksmuseumin lähestymiskuvien uusinta — tehtävä94, 13.10.2026

Uuden tilauksen kaksi sallittua generointia tehty: toimitettu 2/2 kuvaa, 0 lähteen sallimaa poisjättöä. Aiemman tehtävän93 versiot ja 0 kuvan hylkäysraportti säilyvät NASilla ja Git-historiassa. Uusi tilaus: `posti/fable-codex-rijksmuseo-lahestyminen-uusinta-20261013.md`.

## Toimitetut kuvat

- pysty: https://media.matkakirja.app/julisteet/taidemuseo/rijksmuseum/20261013/rijksmuseum-lahestyminen-pysty.png
  SHA-256 `4e5504e9438dffe97d943ccdd3d43ac0342dd823a31fd164b482fc0e55dc73e5`, 1024×1536, opaque sRGB PNG; tavuntarkistus normaaliin sekä välimuistista riippumattomaan GET-pyyntöön.
- vaaka: https://media.matkakirja.app/julisteet/taidemuseo/rijksmuseum/20261013/rijksmuseum-lahestyminen-vaaka.png
  SHA-256 `d5902bce7e102df2bd951123694149db4eec100333f6e556fb1f52cb6ccb3294`, 1536×1024, opaque sRGB PNG; tavuntarkistus normaaliin sekä välimuistista riippumattomaan GET-pyyntöön.

Pystykuvan rajausrajoite: keskimmäinen4:3-leikkaus säilyttää täydet liuskekivikatot, tornirungot ja keskijulkisivun; ylimmistä metallipiikeistä noin66px ja koristekruunujen yläreunaa rajautuu pois. Natiivissa pystykuvassa ne ovat kokonaan mukana. Rajoite on kirjattu molempien tarkistajien hyväksyntään ja manifestiin; geometrinen ornamentti on lähteen abstract/blank-vaihtoehdon mukaista, eikä natiivissa ole kirjoitusrivejä.

## Tarkistus ja toimitustila

Molempien versioiden kivipinnat katsottu erikseen natiivikoossa; aiempi portin kirjoitusrivi on puiden takana. Lähteen tarkka ikkunageometria ei ole vaatimus. QA sidottu native- ja export-SHA:han; metadata-export ei muuttanut generoituja RGB-pikseleitä. Kuvateksti päättyy sanaan Havainnekuva. PNG:n Description ja Source: Havainnekuva. Tekoälyllä tuotettu, ei valokuva.

Kuvat tuotettu sisäänrakennetulla image_gen-työkalulla alusta, yksi uusi kutsu kummallekin versiolle. Viitteet ovat kaksi dokumentoitua CC0-valokuvaa; ei Google3D-/StreetView-viitteitä. QA, promptit, natiivit ja toimituskuittaukset: `/Volumes/NAS-Homes/samireivinen/Matkakirja-arkisto/kuvatuotanto/rijksmuseum-lahestyminen-uusinta-20261013`.

Suora toimitus omistajan aiemman valtuutuksen mukaisesti. Yksittäistä omistajan kuvahyväksyntää ei väitetä. Runtime-integraatio ja julkaisu eivät ole varmennettuja; ei main-mergeä, versionnostoa tai pelijulkaisua. Manifesti: `posti/kuvatoimitus-rijksmuseum-lahestyminen-20261013.json`.
