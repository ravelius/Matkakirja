# D45 ja D49 – korjauserän lopputarkistus

Valitut kuvat: **45-metallipeili, yritys 2** ja **49-zitan-jakkara, yritys 1**. Toteutuneet kuvakutsut 3 (45: kaksi, 49: yksi), palautuneet 3, valitut 2, hylätty ja säilytetty 1. Kutsuja ei ole kesken. Kaikki ovat kokonaisia uusia generointeja. Vanha close-d-40to51-toimitus on muuttamaton.

## Lähteet ja niiden ratkaistut ristiriidat

Esinekorjaus #564: posti/paatoimittaja-codex-muistokuplat-40to51-kuittaus-20261019.md, commit 68a0bf6e0a963eb9d2dfc301bd9e59139ebd753c, blob 033e9e7d826b0e9d7930a164657c5c4e43fc5200. 45:n kanoninen fakta kuvaa suorakaiteisen peilin. Uusin nimenomainen PT-korjaus vaatii pyöreän pronssipeilin koristeellisen takapuolen, keskinupin ja samankeskiset koristevyöhykkeet. Myöhempää ohjetta noudatettiin; ristiriitainen alkuperäinen fakta ja aiemmat kuvat säilyvät historiassa.

Henkilökorjauksen uudempi lähde: posti/paatoimittaja-codex-muistokuplat-era-c-kuittaus-20261019.md, commit 43e464bb68b591d5521d6c0eaa1118c265b86497, blob fb4c5d92e6d6e10336296173c8fc667a1789a99f. Sama ihminen saa esiintyä enintään kahdessa kuplassa, paitsi nimetyt Puyi, opettaja ja imettäjä. Tämä syrjäyttää aiemman pyynnön 45:n kasvon säilyttämisestä. 45a1:n pyöreä peili oli oikein, mutta toistuvan valkopartaisen vanhuksen vuoksi ehdokas hylättiin ja säilytettiin. 45a2 on kokonaan uusi kuva eri hovimestarilla. 49:n imettäjä saa toistua; 49a1:tä ei uusittu.

Sommittelulähde: commit 86898a4be974d8449a65e6963f4b1deb81e3178c, blob d7518218fade6a00ec1f74f6dcdbe3d7626cf5fe. Lähdetiedostot ja aiemman D-erän PT-kuitti on kopioitu source-evidence-kansioon.

## Henkilökohtainen tarkistus

- **45a2:** pyöreä pronssipeili, koristeellinen takapuoli suoraan kameraan, keskellä nuppi ja useita samankeskisiä koristekehiä. Uusi noin 50-vuotias hovimestari on pitkänomaiskasvoinen, kulmikas ja tummakulmakarvainen, eikä hänellä ole partaa, viiksiä tai valkoista pukinpartaa. Musta Qing-hoviasu ja punanappinen kalotti. Peili noin 34 % kuvan korkeudesta. Terävä esine, pehmeä valo ja erittäin voimakas optinen hovihuonebokeh. Luonnollinen pieni käsipeili, mutta senttimäärää ei voi mitata kuvasta.
- **49a1:** selkeä vaakasuora neliömäinen istuin, neljä erillistä jalkaa ja tukipuut, avoimet jalkavälit. Tumma violetinruskea kiiltävä zitan-puun ulkonäkö. Hymyilevä imettäjä, pitkä sininen Manchu-asu ja vaalea pehmeä huone. Jakkaran korkeus noin 36 % kuvasta. Ei kuusikulmainen kaappi tai jalusta.
- Molemmat valitut natiivit sekä lopullinen yhteinen **160 × 213 px:n soikioarkki** on katsottu henkilökohtaisesti. Häivytys alkaa säteestä 0,45 ja päättyy säteeseen 1 loivalla 1-smoothstep-käyrällä. Kasvot ja korjatut esineiden muodot ovat luettavissa: peilin pyöreä ääriviiva, nuppi ja kehät; jakkaran istuin ja avoin nelijalkainen runko tukipuineen.
- **49:n silmät** ovat hieman 0,45-ytimen yläpuolella, arviolta r 0,50, loivan häivytyksen alussa. Piirteet näkyvät 160 px:n arkilla. Tätä ei piiloteta väitteeseen kaikkien kasvonpiirteiden ehdottomasta sijoittumisesta ytimeen. Koko hattua ja ulompia käsiä ei vaadittu ytimeen. Esineiden ulkoreunat ulottuvat häivytysalueelle, mutta muoto säilyy tunnistettavana.

## Tekniikka ja toimitustila

Kaikki kolme natiivia ovat suoraan 1086 × 1448 px RGB PNG ja peittäviä. Koko kuvan kokovientejä, rajauksia, täytepaloja tai sisältöretusointia ei tehty. Valitut tuotantokuvat ovat muuttamattomia natiivikopioita; häivytys esiintyy vain erillisessä QA-arkissa. Kaikki yritykset, promptit, syöterefien polut ja tarkisteet on säilytetty.

NASin koko retry-erä kopioitiin T7:n samannimiseen output-juureen ja tiedostot varmennettiin SHA256-tarkisteilla. Tuottajan QA on valmis; näille kahdelle uudelle tiedostolle ei ole vielä PT-hyväksyntä- tai postitoimituskuittia. Omistajahyväksyntää, peliin kytkentää, R2-toimitusta tai julkaisua ei väitetä. Parent hoitaa postitoimituksen.
