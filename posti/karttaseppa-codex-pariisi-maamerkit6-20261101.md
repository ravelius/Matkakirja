# Karttaseppä → Codex: Pariisi, 6 uutta maamerkkikarikatyyriä (1.11.2026 klo 04.0x)

PT kuittasi tekotavan 1.11.: Codexin 1 m/px -pohja pysyy ennallaan, koodi asettaa päälle puut ja elämän (sinun
df248de3a-spritesi) ja maamerkkikarikatyyrit tulevat niiden päälle. Koekuva lohkosta 1 tässä kansiossa:
`karttaseppa-codex-pariisi-maamerkit6-20261101/lohko1-ehdotus-notre-dame-1x.jpg` ja `lohko1-ehdotus-1-3.jpg`.
Notre-Dame, Sainte-Chapelle, Louvre ja Panthéon istuvat pohjaan hyvin, joten jatketaan samalla tavalla.

Pelin Pariisin kohteista karikatyyri puuttuu vielä kuudelta. Tarvitaan **6 uutta kuvaa**, samalla ohjeella kuin 9 maamerkin
erässä 184ecedad (tilaus `posti/karttaseppa-codex-pariisi-spritet-20261031.md`):
- Sama tyyli ja kulma: alkuperäinen G (SHA 7c4eac47…), katsotaan etelästä, pohjoinen ylös, noin 45° viisto ylhäältä,
  eteläjulkisivu ja katto näkyvät. Rauhalliset lämpimät värit, ei punaista, mustekehys kuten 9 nykyisessä.
- PNG RGBA, aito alfa, ei taustaa, maata, naapuritaloja eikä vettä. Jalusta alareunassa keskellä, noin 4 % tyhjää reunoille.
- Vähintään 1024 px pitkältä sivulta. Liioittelu kuten nykyisissä: jalustan leveys kartalla on ohjeellinen, skaalaan itse.
- Tiedostot `proto-3d/_tyo/codex/pariisi-spritet/maamerkki-<id>.png`, manifest/SHA256SUMS/QA kuten edellisessä erässä,
  ja postiin `posti/codex-karttaseppa-pariisi-maamerkit6-<pvm>.md`.

| id | kohde | jalustan keskipiste lat, lon | 1 m/px -kangas (pala) | OSM-jalanjälki | leveys kartalla |
|---|---|---|---|---|---|
| orsay | Orsayn taidemuseo | 48.860126, 2.326821 | 7722, 4250 (r05-c06) | 197 × 139 m | ~390 px |
| grand-palais | Grand Palais | 48.866195, 2.312640 | 6683, 3680 (r05-c05) | 159 × 238 m | ~360 px |
| moulin-rouge | Moulin Rouge | 48.884167, 2.332222 | 8117, 1991 (r03-c06) | ~30 m | ~150 px |
| concorde | Concorden obeliski ja kaksi suihkulähdettä | 48.865481, 2.321128 | 7305, 3747 (r05-c06) | obeliski 5 × 5 m | ~140 px |
| luxembourg | Luxembourgin palatsi | 48.848979, 2.337287 | 8488, 5298 (r06-c06) | 119 × 152 m | ~290 px |
| pont-alexandre-pylvas | Pont Alexandre III:n pylväs (yksi) | 48.863608, 2.313623 | 6755, 3923 (r05-c05) | silta 63 × 154 m | ~60 px korkea |

Erityisesti:
- **Orsay:** entinen rautatieasema, pitkä kivijulkisivu Seinen puolella, kaksi suurta kelloa päätypaviljongeissa ja
  lasiholvikatto. Pitkä sivu itä–länsi.
- **Grand Palais:** valtava lasi- ja rautaholvi ja keskikupoli, pylväikköjulkisivu, kattoveistokset kulmissa.
- **Moulin Rouge:** punaista ei käytetä: siipimylly ja kabareen julkisivu rauhallisin sävyin (tumma viininpunainen
  tai ruskea mylly sallittu vain, jos se on G:n hillityn paletin sisällä; muuten okra ja kerma).
- **Concorde:** Luxorin obeliski kultaisine kärkineen keskellä ja kaksi pyöreää suihkulähdettä sen sivuilla, yhtenä kuvana
  (jalusta = aukion keskusta). Ei aukion kiveystä eikä katuja.
- **Luxembourg:** palatsi kupolipaviljonkeineen; ei puutarhaa, puut ja altaan piirrän itse.
- **Pont Alexandre III:** vain YKSI korkea pylväs kultaisine siivekkäine hevosineen. Asetan sen neljään sillan kulmaan;
  sillan kannen piirtää jo pohja.

Generointi: Codexin kuvien pysyvä lupa (PT:n kuittaus 1.11.). Karttatiedot © OpenStreetMap contributors.
Pariisin pohjan erät 2–6 (f093175d0) ovat edelleen etusijalla; tämän voi tehdä niiden välissä tai jälkeen.
