# Caernarfon #2309 — riippumaton mallikuvan QA

**Verdict: FAIL kulmikkaiden tornimuotojen lähdevastaavuudelle; muut keskeiset aiheet tunnistuvat.** Yksi sallittu kuva on käytetty. Ei uusintaa, korjausta tai Tripo-lupaa.

Katsottu `caernarfonin-linna-model-v1-1000.jpg` ja samankansion kuuden ruudun lähdekollaasi. Molemmat lähde-MD:t luettu kokonaan valmistelussa;22.32 tilaus luettu tässä uudelleen. Päävertailu3/5, portit1/6 ja pohjoisen varaukset4/6.

- **Eagle Tower / kolme pikkutornia: PARTIAL.** Vasemman länsipään päämassalla erottuu kolme pikkutornimaista runkoa: korkea noin(x132,y80–187), toinen(x192,y120–230) ja matalampi vasemmalla(x77,y185–250), koordinaatit1000×500 tarkistuskuvasta. Kolmen aiheen vaatimus siis näkyy, mutta niiden keskinäisiä korkeuksia tai pohjia ei hyväksytä mitatuiksi.
- **Kulmikkaat muodot: FAIL näkyvälle hahmolle.** Eagle Towerin pitkä eturunko ja sen pikkutornit on esitetty vahvasti pyöristyvinä/lieriömäisinä, vaikka lähteiden3/4/5 tärkeä tunnus on selvästi kulmikas, särmikäs rakenne. Myös eteläseinän välitornien muodot ovat pyöristettyjä/fasetoituja. Pelkkä kivitekstuurin vaakarytmi ei korvaa puuttuvia selviä seinäsärmiä. Muoto ei ole täysin sileä ympyrä joka kohdassa, mutta kokonaisluenta poikkeaa KK:n“kulmikkaita, eivät pyöreitä” -ehdosta.
- **Kamera ja yleisjärjestys: PASS pääasettelulle.** Kohotettu SW-perhe: Eagle Tower vasemmalla lähimpänä, pitkä eteläseinä oikealle ja piha takana. Ei ilmeistä peilausta tai eri julkisivujen irrallista yhteenliimausta. Tarkkaa kamerakulmaa ei mitattu.
- **Avoin piha: PASS näkyvälle avoimuudelle.** Muuri ympäröi kattamatonta pihaa ja matalia rauniojäänteitä. Ei keskustornia eikä keksittyä pihakattoa. Raunioiden täsmäpaikat ja pintojen tasot ovat pienestä ilmalähteestä varmistamattomia.
- **Portit: PARTIAL.** Itäpään Queen's Gate on oikeassa päässä; kaupungin puolen King's Gate -aihe näkyy kauemmalla vastaseinällä. Porttien tarkkoja sisä-/ulkopintoja, korkeuksia ja kulkulinjoja ei voi vahvistaa tästä yhdestä kuvasta; erityisesti King's Gaten pihanpuoli ja pohjoismuurin piiloliitokset ovat lähderajaus. Niitä ei merkitä lähdevarmoiksi vain oikean pääsijainnin perusteella.
- **Pinnat ja rajaus:** vaalea/tumma kivivyöhyke näkyy, eikä kuvassa ole kaupunkia, laituria, autoja, veneitä, metallisiltaa tai ylimääräistä maastoa. Nämä onnistuvat, mutta eivät poista tornigeometrian ongelmaa.

**KK-rivi:** Kolme Eagle Towerin pikkutorniaihetta, avoin piha ja porttien pääsijainnit näkyvät, mutta tornien lieriömäinen/pyöristetty hahmo poikkeaa kulmikkaista lähteistä; pohjoismuurin ja porttien piilopinnat jäävät lisäksi arvioiksi.

Vain paikallinen kuvallinen vertailu; ei mallimuutoksia, generointia, renderöintiä, selainta, postia tai checkpoint-muutoksia.
