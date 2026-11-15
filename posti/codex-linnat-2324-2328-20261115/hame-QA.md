# Hämeen linna #2326 — riippumaton visuaalinen QA

**Verdict: WARNING — syötekuvan päämassat ja avoin piha säilyvät; pohjamuotoa ja piiloliitoksia ei ole varmennettu.** KK hyväksyi lähdekuvan kehän ja kivijalan varauksin. Niitä ei tässä korjata tai muuteta lähdevarmoiksi. Ei mallin peli-/integraatiohyväksyntää.

Katsottu hyväksytty `output/linnat-2309-2312-20261115/hame/hame-model-v1.png` sekä kaikki viisi `qa-browser/01-plusX.png`, `02-plusZ.png`, `03-minusX.png`, `04-minusZ.png`, `05-upper.png`. Luettu saman lähdekansion QA ja source-preparation kokonaan.

- **Päälinna:** punatiilinen korkea päärunko, neliömäiset torniaiheet ja tummat erilliset kattomassat säilyvät. Ei näkyvää uutta pyöreää päätornia, irrallista suurta siipeä tai läpikotaisin valkoiseksi kadonnutta kattopintaa.
- **Päälinnan sisäpiha: PASS näkyvälle avoimuudelle.** Yläviistossa päärungon keskellä on selkeä kattamaton, suorakaiteisena hahmottuva piha. Se ei ole muuttunut kattomatoksi. Pihapinnan materiaali, lattiatason korkeus ja tarkka geometria eivät silti varmennu syötekuvasta, jossa piha jäi suurelta osin peittoon.
- **Ulompi rakennuskehä ja tykkitornit:** matala yhtenäinen kehä ja kaksi näkyvää pyöreää harmaakivistä tykkitornia mataline kattoineen säilyvät. Päälinnaa ja ulkokehää erottavia avoimia alueita näkyy. Mallissa ei näy erillisiä kehän ulkopuolisia rakennuksia, vallinpengertä, järveä tai maisemajalustaa.
- **Kehän pohja/kivijalka: ennestään kirjattu WARNING säilyy.** Hyvin säännöllinen kehä ja korkea harmaakivinen alaosa seuraavat hyväksyttyä syötettä. Viisi uutta katselukuvaa ei todista niiden historiallista tai nykytilan täsmällisyyttä. Vastapuolten kivijako ja aukotus ovat osin generaattorin täydennystä.
- **Seinä-/kattoliittymät: PARTIAL.** Yläviistossa katot yhdistyvät pääosin jatkuviksi siiviksi, mutta erikorkuisten osien liittymät ja pitkät tummat vaakaraidat räystäiden/seinäpintojen kohdalla ovat osin tulkinnanvaraisia. Pienet kattoläpiviennit, piiput ja pehmeät listat eivät saa lähdevarmennusta. Ei kuvista ilmenevää suurta leijuvaa kattopalaa; tätä ei kuitenkaan käytetä vesitiiviys- tai verkkotestinä.
- **Portit/ovet:** sisäänkäynnin tarkka sijainti ja kulkuyhteydet eivät käy näistä kuvista luotettavasti ilmi. Tumma ikkuna tai seinäaukko ei todista läpikulkevaa geometriaa.

**Suunnat:** neljä paikallista katselusuuntaa (+X, +Z, −X, −Z) ja yläviisto tarkastettu. Maantieteellistä N/E/S/W-rekisteröintiä, fyysisiä mittoja tai pelikameran luettavuutta ei vahvistettu.

**KK-rivi:** Päälinna, avoin sisäpiha, ulkokehä ja kaksi tykkitornia säilyvät ilman ulkotaloja tai vallia; kehän pohja ja korkea kivijalka jäävät ennestään hyväksytyiksi varauksiksi, piiloseinien aukotus ja kattoliitokset tulkinnoiksi.

Vain tämä QA-tiedosto kirjoitettu. Ei selainta, renderöintiä, generointia, mallimuutoksia, postia tai yhteisen tilan muokkausta.
