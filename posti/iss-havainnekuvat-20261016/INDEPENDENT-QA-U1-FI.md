# Riippumaton kuva-QA — korjaustilaus #372–373

**Tila: 2/2 korjauskuvaa tarkistettu henkilökohtaisesti.** Tehtävänanto `sources/valoseppa-codex-iss-havainnekuvat-uusinta-20261016.md` on luettu kokonaan. Neljä kuvareferenssiä ja molemmat tuloskuvat on katsottu `view_image`-työkalulla.

Molemmat kuvat tukevat pyydettyjä näkyviä korjauksia. Tämä on kuvahavaintoihin perustuva riippumaton QA ja suositus PT:n/omistajan arvioon. **Omistajan ja vastaanottajan hyväksyntä, runtime sekä peli-integraatio ovat erillisiä eikä niitä väitetä tehdyiksi.** Vanhan 9 kuvan erän arvio tai hyväksyntä ei muutu.

## r2-u1 — sytytys alustalla

**Raketin alaosa näyttää istuvan laukaisurenkaalla ilman selvää näkyvää ilmarakoa.** Liekin valkoinen ydin näkyy renkaan ja laukaisupöydän alapuolella. Kuvassa ei ole aiemman epäonnistuneen tavoitteen kaltaista pitkää liekkiväliä nostamassa raketin alaosaa renkaan yläpuolelle.

Renkaan sivuilla näkyy kulmikkaita tuki-/pitorakenteita, mutta yksittäisten hold-down-clampien rakenne ja lukittuminen eivät erotu riittävän varmasti tekniseen kiinnitysväitteeseen. Näkyvä kontakti ei todista kiinnityksen mekaanista kantavuutta.

r1:n korkea viisto kamera, keskitetty raketti, torni, ukkossuojat, säiliöt ja alusta säilyvät hyvin. Yö, valonheittimet ja märän betonin heijastukset vastaavat r1-paria. Paksu oranssiksi valaistuva savu purkautuu pöydän alta sivulle, vahvimmin oikealle. Liekin, savun, tukien ja heijastusten tarkat muodot ovat havainnollistusta.

Ei havaittua luettavaa tekstiä, tunnistettavaa logoa, päälle lisättyä UI:ta tai selkeää vinjettiä. Yksittäinen kuva ei todista T+1-ajankohtaa tai paikallaan pysymistä koko animaation sytytysvaiheen ajan.

PNG SHA-256: `b58bb52ebece3e3783b74c5db455859a5fafefba34e741593847564c6efea09d`

## s1-u1 — yksi valaistunut pilviryhmä

**Havaitsen yhden yhtenäisen sinivalkoisena valaistun pilviryhmän.** Aiemman s1:n erillinen ylävasen sinivalkoinen kirkastuma on poissa. Muut erilliset pilvet ovat tummaa reliefiä; niissä ei näy itsenäistä sinivalkoista ydintä.

Pääryhmän valo leviää viereisiin ja alaoikeisiin kumpuihin. Näissä ei näy toista itsenäistä kirkasta ydintä tai erillistä salamakanavaa. Ne näyttävät saman laajan pilvipankin/ryhmän valaistukselta, joten niitä ei lasketa toiseksi välähdykseksi pelkän valon leviämisen perusteella. Kuva ei kuitenkaan todista meteorologisesti vain yhtä ukkossolua tai yksittäistä purkausta; 2D-kuvasta ei voi varmasti ratkaista solujen rajoja.

Näkyvissä on **yksi ohut, pääosin vaakasuora yhtenäinen kanavaverkko, silmämääräisesti noin 4–6 päähaaraa**. Pienempiä sivuoksia on enemmän; päähaarojen laskentatapa vaikuttaa tarkkaan lukuun. Tämä sopii pyydettyyn 3–6 päähaaran tavoitealueeseen. Toista erillistä kanavaverkkoa ei havaittu.

Cupolan yksi fyysinen ikkuna ja alakeskikonsolin paikka/koko säilyvät. Yömaisema, tummat muut pilvet ja paikalliset kultaiset kaupunkivalot ovat luettavia. Ei havaittua tekstiä, tunnistettavaa logoa, päälle lisättyä UI:ta tai selkeää vinjettiä; konsolin näyttö on blankko. Pilvien, kanavan, valon leviämisen ja kaupunkien yksityiskohdat ovat havainnollistusta.

Yksi staattinen kuva ei todista, että animaatio tai runtime estää kaksi yhtäaikaista välähdystä.

PNG SHA-256: `47d5360e7bb08fafd784ddde0eb406d621b4145f2b4b456082cf9ca0ce174b47`

## Koko ja rajaus

Molemmat ovat **1086×1448 native-PNG, 3:4-pysty**. Tämä koko on nyt nimenomaisesti hyväksytty uusintatilauksessa; sitä ei kirjata kokovirheeksi. Kokohyväksyntä ei ole vanhan erän laatu-, peli- tai omistajahyväksyntä.

QA:ssa ei generoitu, muokattu tai skaalattu kuvia, muutettu postia tai ledgereitä. Vanhat QA-tiedostot säilytettiin muuttumattomina; niiden SHA-256-tunnisteet on kirjattu tämän korjauserän `qa/independent-review.json`-tiedostoon. Kaikkien lähde- ja tulosversioiden tunnisteet löytyvät samasta JSON-tiedostosta.
