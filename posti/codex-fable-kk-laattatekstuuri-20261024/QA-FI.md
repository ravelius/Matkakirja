# KK-laattatekstuuri / tehtävä 942 — tarkistus

**Arviointiehdokas, ei tuotantokelpoiseksi kuitattu saumaton materiaali.**

- Saumattomuus ei läpäise tiukkaa QA:ta. Erityisesti korkeuden ylä- ja alareunan arvot eroavat; normaali-, karheus- ja värikarttojenkaan reunat eivät vastaa täsmällisesti toisiaan. Toistossa näkyy rajakohdissa poikkeavaa saumarytmiä.
- Laattojen limitys ja koot ovat generoinnin arvioita, eivät täsmälleen puolen laatan siirrolla tehty mittatarkka 4 × 4 m ladonta. Valitussa kuvassa on noin kahdeksan riviä; leveimmät laatat ovat 4 m kattavuudella noin 1.2–1.3 m.
- Kartat ovat saman generoidun atlas-kuvan paneeleja. Saumojen paikat vastaavat pääosin toisiaan, mutta pikselintarkkaa rekisteröintiä ja normaalin yhteensopivuutta korkeuden kanssa ei voi vahvistaa.
- Albedo on aiempaa tasaisempi, mutta reunoissa ja huokosissa on edelleen paikallista sävytystä; täydellistä valotonta materiaaliväriä ei ole varmennettu.

## Todellinen tarkkuus ja mittaukset

- Native-atlas 1254 × 1254 RGB, kukin kanavapaneeli 627 × 627; toimitettavat 2048 × 2048 kartat ovat teknisiä suurennoksia.
- Korkeus-PNG on aidosti 16-bittinen yksikanavainen tiedosto, mutta lähtöpaneeli on 8-bittinen. Muunnos on 8-bittinen luminanssi × 257; valitussa tiedostossa on 226 eri arvoa. Se ei lisää alkuperäistä korkeustarkkuutta.
- Normaali on pyydetty OpenGL Y+ -muotoon. Korkeuden kaltevuuden korrelaatio on x-suunnassa noin 0.50 ja y-suunnassa noin 0.63. Suunta ja vahvuus on tarkistettava ennen käyttöä; tämä ei ole mitatusta geometriasta leivottu materiaali.
- Normaalien dekoodattu pituus vaihtelee (mediaani noin 0.965); nolla- tai negatiivisen z:n näytteitä ei löytynyt valitusta native-paneelista. Diagnostiikkavalaistuksessa näytteet normalisoitiin; toimituskarttaa ei muutettu.
- 3 × 3 -esikatselu on toimitettavan värikartan suora toisto, 6144 × 6144. Lambert-valaisut ovat erillisiä diagnoosikuvia, eivät pelin kuvakaappauksia.

Kaikki kolme alkuperäistä generointia säilyvät paikallisessa native-kansiossa. Niitä ei paikattu tai maalattu osittain. Vain kanavien tekninen erottelu, koko kuvan suurennos, harmaasävymuunnos ja 16-bittinen tiedostokoodaus tehtiin. Ensimmäinen yritys hylättiin mittakaavan ja albedon valaistuksen vuoksi; toinen yritys jäi jaksollisuusvirheeseen ja sisälsi 325 negatiivisen z:n normaalinäytettä. Kolmas on toimitettava arviointiversio, jonka jäljellä olevat virheet on eritelty yllä.
