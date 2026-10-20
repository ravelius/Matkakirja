# Kolme sinikultaista mattoa — #762

Kolme materiaalikokonaisuutta: väri + tangenttinormaali + karheus, yhteensä 9 PNG-karttaa. Matot ovat kokonaisia reunustettuja tekstiilikuvioita, eivät 3D-malleja. Kaikki tekstuurit ovat tekstuurit-kansiossa, sivut kahden potensseja ja enintään 2048.

| Materiaali | PNG-koko | Vastaanottajan koko UV-nelikulmion suhde | Varsinainen näkyvä matto |
|---|---|---|---|
| kaytavamatto | 512 ×2048 RGBA +RGB/L | **508:1954** | Alpha>127:n natiivi493:1947 ≈1:3,949;1:4-tavoitteeseen +1,284 % leveyssuhde-ero. PNG:stä fyysisesti palautettuna ero +1,341 %. |
| huonematto | 1024 ×2048 RGB +RGB/L | **2:3** | Tilauksen1:1,5; natiivi1024 ×1536. PNG:n 1:2 on vain UV-koodaus. |
| ovimatto | 2048 ×2048 RGB +RGB/L | **1:1** | Pieni neliö, käytännöllinen oletus koska lähde ei määritellyt ovimaton suhdetta. |

**Älä päättele fyysistä kokoa PNG:n pikselisuhteesta.** Kaikki kuva-alue mapataan täydellä 0..1 UV:llä yllä annetun suhteen nelikulmiolle. Käytävämaton koko nelikulmiota EI pakoteta suhteeseen 1:4: se litistäisi kuvion. Fyysisen muodon esikatselut ovat physical-previews-kansiossa ja preview-physical-ratios.jpg-kuvassa. Käytävämaton alkuperäinen ja fyysisesti rekonstruoitu versio ovat qa/runner-v3-original-vs-physical.png-kuvassa.

Käytävämatto v3:n alkuperäinen on793 ×1983RGBA. Vain täysin tyhjä alpha0-ulkoreuna rajattiin laatikolla[141,14,649,1968], saatiin508 ×1954. Kaikki alpha>0-pikselit säilyivät rajauksessa, myös heikot reunapikselit. Tämän koko kuva-alueen PNG-resamplaus512 ×2048on tekninen UV-tallennus; fyysinen nelikulmio palauttaa kuvan mittasuhteet. Alfaa ei kynnystetty eikä maalattu. Vastaanottaja testaa alpha-clipin, suodatuksen ja mipmapit; tämä ei ole valmis reuna- tai törmäysgeometria.

Huonematon1024 ×1536natiivi koodattiin koko ruudun resamplauksella1024 ×2048kuvaksi.2:3-nelikulmio palauttaa alkuperäisen kuvion mittasuhteen. Ovimaton1254 ×1254natiivi suurennettiin 2048 ×2048:ksi, joten 2048 ei tarkoita natiivin lisäyksityiskohtia. Kaikki5 todellista natiivia ovat säilyneet muuttumattomina tuotantokansion native-kansiossa; ensimmäiset kaksi vääräsuhteista käytävämattoa ovat hylättyä historiaa.

Väri: sRGB. Normaalit: tangenttiavaruuden **+Y/OpenGL**, RGB8 lineaarinen ei-väridata; dekoodaa2×(byte/255)−1 ja normalisoi shaderissa. Positiivinen G on tangentti+Y. Jos vastaanottajan shader käyttää vastakkaista Y-käytäntöä, sovita tuonti; ohjelmakohtaista oletusta ei tässä väitetä testatuksi. Kaikki vektorit äärellisiä, analyyttisesti yksikkömittaisia;8-bittidekoodauksen suurin normivirhe alle 0,00064. Ei height-kuvan tai värikirkkauden muunnosta.

Karheus: L8 lineaarinen byte/255, musta sileä/valkoinen karkea, sRGB-dekoodaus POIS. Kullanväriselle kudokselle taiteellinen tavoite 0,86 ja siniselle pohjalle 0,94, hieno periodinen vaihtelu. Nämä ovat artist-parametreja, eivät mitattuja materiaalivakioita. Ei metallikarttaa tai metallilangasta väitettä. Kuviomaskit perustuvat sävy-/kromaattisuusluokkiin, eivät valon tai relieffin tulkintaan.

Reunat katsottiin 2×2-toistossa ja täydellä pikselikoolla sauman ylittävissä kaistaleissa. Ulompi sininen vyöhyke on rauhallinen, ja kaikki kultareunukset kokonaisia. Yksittäiselle kokonaiselle matolle suositus ClampU/ClampV. Tämä ei ole loputtomasti jatkuva ornamentti tai matemaattinen rajapikselisertifikaatti; käytävämaton alfaperimetriä ei väitetä saumattomaksi yhtenäiseksi lattiapinnaksi.

Tuottajan QA valmis, rootin riippumaton tarkistus ja toimitusportti erillisiä. Kutsut 5/5, avoimia 0; näistä 3 alkuperäistä ja 2 erikseen valtuutettua kokonaan uutta käytävämattoyritystä. Ei uusia generointeja. PROMPT-SET.md/JSON sisältää täsmälliset promptit ja sisäisen työkalun tilan. SHA256SUMS kattaa tämän paketin. Ei Tripoa, peliin kytkentää, R2-latausta tai julkaisua.
