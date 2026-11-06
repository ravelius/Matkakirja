# Maalattu 360° taivas Valosepän pelikokeeseen

Kierros on valmis tiedostossa `/Users/Shared/Claude/proto-3d/_tyo/codex/kartan-taivas-20261106/taivas-kierros-8192x640.png`. Kansiossa on päivitetty SHA256SUMS. PNG on 8192 × 640, RGB, ja siinä on sRGB-väriavaruuden tunniste. SHA256 on `173afce20b2e009d87f03fadb91e3c3140170120b20d0f5672e0dc041939cd66`.

Kuvan vasen reuna on pohjoinen. Vaakakulma kasvaa myötäpäivään 360°, ja korkeuskulma kasvaa alarivin 0°:sta ylärivin +28°:een tasavälisesti. Alimmat 45 riviä ovat kauttaaltaan `#e6e2ca`. Vaimensin pilvien vaihtelun asteittain 4°:n alapuolella.

Mittasin hyväksytyn luonnoksen (kokeilulupa #2180) värit asteittain horisontista y=860, 42 px/aste. Näytteet kerättiin alkuperäiseen pelikuvan taivaaseen kuuluvilta pikseleiltä. Toimituskuvan rivimediaanit ovat 4° `#dddccd`, 8° `#ccd0d1`, 12° `#c6cbd2`, 16° `#b8c6d2`, 20° ja 28° `#a8bbce`. Yläjatkeen mediaani on tavoitevärissä yhden kanava-arvon tarkkuudella.

Tein yhdellä ImageGen-otolla yhden yhtenäisen pilvimaalauksen. Natiivin koko oli 1774 × 887. Rajasin maalatun kaistan, sovitin sen kulmaruudukkoon ja ristihäivytin saman maalauksen päät 384 pikselin matkalta. Sovitin sävyliuun mitatun luonnoksen mukaan. Pilvien poikittainen siveltimenjälki on tässä sovituksessa mallikuvaa pidempää ja pehmeämpää. Kierroksessa käytetään yksilöllistä maalausta koko matkalta.

Katsoin kaikki neljä 90° sektoria alkuperäisellä pikselikoolla sekä 64° näkymän pohjoisen sauman yli. Sauma jatkui silmämääräisesti tasaisesti. Ensimmäisen ja viimeisen sarakkeen suurin ero on 1/255 kanavaa kohti. Myös ristihäivytyksen sisempi liitos pysyi yhden askeleen sisällä. Tarkistin pilvimuotojen vaihtelun sektoreittain ja vertasin 249 vaakasuunnassa limittyvää kuva-aluetta. Kukin näyte oli erilainen. Pilvikorkeuksilla mitattu suurin rivin 5.–95. prosenttipisteiden luminanssiero oli 16,46/255, mallin vastaava 18,16/255.

Toimitus kuuluu tilaukseen #2181. Valoseppä voi nyt tarkistaa taivaan kartan kanssa iPhonen ja iPadin katselukulmissa sekä pelin sävykäyrällä.
