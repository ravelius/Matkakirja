# Codex → Natiiviseppä: Olavinlinna 3d V2

Korjauskohdat #1156–1159 ja #1162 toimitetaan kansioon `posti/olavinlinna-tyrma-geometria-20261027/`. Uusi `tyrma-e101-v2.glb`, LUEMINUT-v2, SHA256SUMS-v2 ja viisi sisäistä QA-kuvaa (kaksi varjottomana).

1. Seinien albedo ja materiaalikerroin säilyvät palatsi-V2:n hyväksytystä materiaaliperheestä. Varjottomassa kuvassa laasti näkyy vaaleana ja kivi tummana. Kaikkien 534 tarkistetun muuraus-UV-reunan toisto on 2,499988–2,500018 m. Lattiamateriaali säilyy.
2. White Rough Plasterin normaalikartan voimakkuus on 1 ja karheuskartta käytössä (CC0, Rob Tuytel). Holvin pinta on näkyvästi karhea valaistussa chamber-kuvassa; rappauksen geometriaa ei lisätty.
3. Olemassa olevat 1 800 korsinauhaa erottuvat vaaleampina ja päällekkäisinä, pituus 6,53–15 cm. Kymmenen nauhaa on siirretty patjan reunan lattiatasolle saman jalanjäljen sisällä. Patjan pohjamuoto, paikka ja aiempi reunaviiste säilyvät. Ei uusia esineitä.
4. Seated-to-door ja crawl-mouth on kuvattu myös varjottomina samoista kamerapaikoista. Mustuus poistuu: kyse oli QA-valaistuksesta, ei puuttuvasta albedosta. Varjottoman materiaalinäytön emission-muutos koskee vain renderöintiä, ei toimitus-GLB:tä.
5. Aiempi valoläiskä holvissa syntyi QA-valon suunnasta. Valo on nyt suunnattu aukosta alaspäin lattialle; läiskä näkyy chamber-v2.png:ssä. Vanha penkki oli vaakasuora. Uuden lisäohjeen mukaisesti sen sisäreunaa laskettiin 3 cm, ulkoreuna ennallaan. Muutos koskee kahta yksilöllistä pistettä (8 normaalijakojen vuoksi monistettua verteksiä); tarkat koordinaatit surface-build.jsonissa. Muut rakennepinnat ja kaikki 16 merkkiä säilyvät. Valot eivät sisälly GLB:hen: Lavastaja toteuttaa pelin valaistuksen.

Tarkastus: 7 772 kolmiota, 5 piirtoa, 5 materiaalia, 8 upotettua kuvaa, 14 839 932 tavua; tekninen tarkistin 0 virhettä. 1 063 kävelynäytettä, ei uusia pää-/lattia-/sivuestettä. Kolmen oviaukon 651 säteen näytteet viidessä suunnassa: ei uusia tukoksia. Ryömintäsuun alkuperäiset suunnasta riippuvat osumat on säilytetty raportissa, kaikkia testisuuntia ei väitetä täysin vapaiksi. Ilmarako 9/9 vapaa. Lattiataso −3,8 m. Vastaanottaja säilyttää alkuperäiset pelin törmäys-/kävelymallit.

Tämä on tiedostotoimitus ja paikallinen QA. Natiivisepän/PT:n V2-hyväksyntää, omistajahyväksyntää, peli-integraatiota ja julkaisua ei vielä ole varmennettu. Ei R2-siirtoa, main-mergeä, versionnostoa tai pelijulkaisua.
