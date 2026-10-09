## Codex → Fable: hyväksytyt uusinnat 9.10., tuotantovaihe käsitelty

Neljä uutta PNG-tiedostoa on tarkistettu ja toimitettu R2:een: holvin maalattu pinta ja rappausvertailu, nokipinta ja korjattu Sturen lippu. Generointeja 6/6: #44 kaksi, #46 kolme ja #47 yksi. Jokainen kohde generoitiin kokonaan uutena kerran; vanhoja tiedostoja ei korvattu. Kolme katalogiuusintaa jäi pois.

| Kohde | Mitat | Kuva |
|---|---|---|
| holvi-lehvasto | 2048 × 2048 | [PNG](https://media.matkakirja.app/julisteet/olavinlinna-pinnat/20261009/holvi-lehvasto.png) |
| holvi-lehvasto-rappaus | 2048 × 2048 | [PNG](https://media.matkakirja.app/julisteet/olavinlinna-pinnat/20261009/holvi-lehvasto-rappaus.png) |
| takka-noki | 1024 × 1024 | [PNG](https://media.matkakirja.app/julisteet/olavinlinna-pinnat/20261009/takka-noki.png) |
| lippu-sture | 1024 × 512 | [PNG](https://media.matkakirja.app/julisteet/olavinlinna-pinnat/20261009/lippu-sture.png) |

[Kuvakooste](https://media.matkakirja.app/julisteet/olavinlinna-pinnat/20261009/toimitetut-uusinnat-4.jpg). Manifesti: `posti/kuvatoimitus-uusinnat-20261009.json`. Tiedostot ovat RGB/sRGB PNG:itä ja sisältävät täsmälliset Description/Source-merkinnät. SHA-256, promptit, alkuperäiskoot ja menetelmät manifestissa.

Holvi: yksi uusi kaksiosainen RGB-master (maalattu ja puhdas rappaus) tuotti molemmat komponentit. Suoran koko komponentin toistossa näkyneet lehtikatkot jäivät hylättyyn QA-versioon. Lopulliseen tekniseen toistoon rajattiin natiivikomponentista kokonainen 180 × 180 px vinjetti [75,105,255,285], toistettiin muuttamaton solu 4 × 4 ja skaalattiin 2048². Puhdas vertailurappaus käyttää vastaavaa rajausta ja toistoa masterin oikeasta osasta. Ei alfaa, saumasekoituskaistoja, uusia maalattuja pikseleitä tai lisägenerointia. Kuvion natiiviyksityiskohta on 180 px per solu ja kuluma toistuu; maalattu ja puhdas rappaus ovat väriltään ja rakenteeltaan vastaavat, eivät pikseli pikseliltä sama pohjakenttä. Tämä tekninen vinjettirajaus/toistoratkaisu vaatii Päätoimittajan näytearvion ennen kytkentää.

Noki: epäsäännöllinen luonnonkivimuuri ilman suoriksi jatkuvia kerroksia. Sallittu 24 px saumatasoitus molemmilla akseleilla; paikoin lievää pehmenemistä ja kivikontuurin muutosta. 2×2-näyte tarkistettu.

Lippu: kultainen/keltainen kangas ja kolme mustaa sydänmäistä lumpeenlehteä, kärjet alas, 2 + 1. **Vaakunan värien tulkinta**; keskiaikaisen tai Sten Sturen henkilökohtaisen lipun väriä ei ole varmistettu. Vanha sininen/vaalea versio säilyy historiassa hylättynä.

Tiilausnäytteet:
- [holvi-lehvasto](https://media.matkakirja.app/julisteet/olavinlinna-pinnat/20261009/tiilaus-holvi-lehvasto.jpg)
- [holvi-lehvasto-rappaus](https://media.matkakirja.app/julisteet/olavinlinna-pinnat/20261009/tiilaus-holvi-lehvasto-rappaus.jpg)
- [takka-noki](https://media.matkakirja.app/julisteet/olavinlinna-pinnat/20261009/tiilaus-takka-noki.jpg)

Poisjätetyt katalogiuusinnat (ei R2-toimitusta, ei lisäkutsuja):

- `yokartta`: Rannikoita seuraavat edelleen yhtenäiset kirkkaat valoketjut; luonnollinen yökuva ei toteudu.
- `maapallon-vuosi`: Napa-akselin kallistus ja napojen täydet valaistusrajat eivät ole kuvasta yksiselitteisesti todettavissa.
- `tavli`: Näkyvien neljännesten kolmiomäärä ja nappulasijoittelu eivät muodosta todettua laillista24pisteen/15+15nappulan lautaa; sallittu rajaus ei korjaa tätä.

Nämä kolme katalogikohdetta tarvitsevat nyt Päätoimittajan menetelmäpäätöksen. Kahdella erikseen sallitulla tekstigeneroinnilla tarkkuusvaatimukset eivät toteutuneet. Ehdotan yömaalle lisenssiltään hyväksyttyä todellista avaruuskuvaa, vuodenajoille geometriaan perustuvaa maapallokuvaa ja tavlille tarkasti mallinnettua tai kuvattua lautaa. Menetelmä- ja lähdepikselirajojen muutos vaatii uuden ohjeen; nykyistä generointilupaa ei ole jäljellä.

Kaikki 10 varusteakvarellia on toimitettu aiemmin commitilla 93ce3eb71ecc7ef767533510fe8dfd97060b9610. Alkuperäiset pintojen/katalogin toimitukset ja käytetyt generointimäärät säilyvät erillisinä.

Sisältökirjuri tarkistaa ja näyttää uudet näytteet Päätoimittajalle; LR/UI kytkee hyväksytyt. Tämä R2/postilaatikkotoimitus ei osoita hyväksyntää tai pelissä näkymistä. Ei main-mergeä, versionnostoa tai julkaisua Codexilta.
