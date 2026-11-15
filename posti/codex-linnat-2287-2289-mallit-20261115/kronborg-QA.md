# Kronborg #2288 — riippumaton kuvallinen QA

**Verdict: WARNING / KK:n arvioitavaksi aiemmin hyväksytyn kattovarauksen kanssa.** Ei mallimuutosta, uutta ottoa tai peli-/historiahyväksyntää.

Katsottu qa-browser/five-views-overview-1000.jpg (kaikki viisi näkymää), lisäksi 01-plusX-1000.jpg ja 05-upper-oblique-1000.jpg erikseen. Verrattu kronborg.jpg-lähdekollaasiin, molempiin lähde-MD:ihin sekä source-review.md:n KK-päätökseen.

- **Nelisiipinen massa ja avoin piha: PASS näkyvälle rakenteelle.** Yläviistossa siivet muodostavat yhtenäisen kehän kattamattoman suuren suorakaiteisen pihan ympärille. Pihaa ei ole täytetty katolla tai uudella rakennuksella. Tasapintaisen pihan tarkka kaltevuus, kiveys ja suhteet jäävät tulkinnaksi.
- **Etujulkisivun tunnusmerkit: PASS yleistasolla.** Paikallisessa +X-kuvassa suuri lähes umpinainen neliötorni on vasemmalla, koristeltu pyöreä/monikulmainen torni oikealla ja pitkällä etusiivellä on kolme selvästi erottuvaa koristepäätyä. Ne vastaavat lähdekoonnin ruutujen4/5 tunnistettavaa eteläjulkisivua. Taustan korkea vihreä huippu ja pienemmät huiput säilyvät erillisinä.
- **Katot: WARNING, tiedossa oleva hyväksymisraja säilyy.** Ruskea/punaruskea, tiilimäisesti kuvioitu kattopinta ei osoita oikeaa kuparipeltimateriaalia. KK ilmoitti lähdearviossa katon olevan kuparia ja päätti olla korjaamatta sitä nyt. Alkuperäistä pintaa ei tämän QA:n perusteella saa kuvata korjatuksi. Siipikattojen erillisyys ja lähteen yleissiluetti kuitenkin säilyvät.
- **Näkemättömät julkisivut: UNCERTAIN.** Muut paikalliset sivut ovat ehjiä ja säännöllisesti aukotettuja, mutta erityisesti länsipuolen täsmällinen ikkunointi/ovet ja pihafasadien yksityiskohdat eivät saa lähdehyväksyntää. Länsipuolen kuvat puuttuivat lähdepaketista. Muut huippu-/kattodetaljit ja absoluuttikorkeudet jäävät arvioiksi.
- **Kehystys:** +X-yksittäiskuvassa korkeimman huipun kärki on aivan ylärajalla; sen koko muotoa arvioidaan myös koonnista ja yläviistosta. Tämä ei yksin ole mallin rakennevirhe.

**Suuntarajaus:** kaikki neljä paikallista sivua +X,+Z,-X,-Z sekä yläviisto ovat mukana. +X voidaan nimetä eteläjulkisivuksi edellä lueteltujen lähdetuntomerkkien perusteella, mutta tarkkaa maantieteellistä yaw'ta ei ole kalibroitu. Muita akseleita ei nimetä tässä N/E/S/W:ksi. Neljän maantieteellisen ilmansuunnan vahvistus on siis vielä avoin, vaikka neljä paikallissivua on dokumentoitu.

**KK-rivi:** Avoin nelisiipinen piha, vasen neliötorni, oikea koristetorni ja kolme eteläpäätyä säilyvät; katon tiilimäinen tulkinta on ennestään kirjattu poikkeama, lännen ja pihan aukotukset jäävät varmistamatta.
