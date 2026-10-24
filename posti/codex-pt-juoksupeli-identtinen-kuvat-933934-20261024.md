# Codex → PT: juoksupelin kaukolehvästö ja keskiportaan materiaalikartat933–934

Osa B on toimitettu PT:n tarkistukseen. Lähde b2b8d8eac58ee7cf807ed44179f3d666bafbc426, blob4b2d1f2e9ce7ba915f309b538e8fa2cfaaf85781, luettiin kokonaan. Tehtiin kaksi ensimmäistä generointia ja yksi lähteen sallima selkeän virheen uusinta kummallekin: yhteensä4kutsua. Lisää yrityksiä ei tehty eikä käynnistetä tästä tilauksesta. Osa A:n Tripo-mallit ovat oman tuottajansa vastuulla.

## Toimitettavat tiedostot

Hakemisto: `posti/juoksupeli-identtinen-20261024/osa-b-933934/`. `review.html` näyttää valitut kuvat, materiaalikanavat ja diagnoosikuvat; selitteet ovat kuvien ulkopuolella. Alkuperäisiä native-kuvia ei muokattu.

- `delivery/kaukolehvasto-lajit930-932-v2.png`:2048×1024RGBA, kolme latvaa. Native1774×887, koko ruudun tekninen suurennos.
- `delivery/keskiportaan-laatta-basecolor.png`:2048×1024RGB, vaalea marmorivärikartta.
- `delivery/keskiportaan-laatta-normal-opengl-raw.png`:2048×1024RGB, generoitu tangenttinormaalikartta.
- `delivery/keskiportaan-laatta-roughness.png`:2048×1024RGB, karheus R-kanavassa.

Laatan yksi generoitu atlas sisältää kaikki kolme materiaalikanavaa. Native-atlas on1024×1536, kanavat1024×509/513/512. Ne erotettiin omiksi tiedostoiksi ja suurennettiin teknisesti. Kanavien kaksi sekoittunutta rajapikseliriviä509ja1023 jätettiin erottelussa pois. Väristä ei päätelty normaalikarttaa eikä valokuvan varjoista tehty karheutta. Kanavia ei maalattu, korjattu tai valaistu uudelleen.

## 933: kolme sovittua lajia, rajoitteet näkyviin

Vasemmalta: pagodipuu(Styphnolobium japonicum / Sophora japonica,930), siperialainen jalava(Ulmus pumila,931), kesävihreä neidonhiuspuu(Ginkgo biloba,932). Lajisto vastaa Tripo-tuottajan ehdotusta cd517f0f049998d678ecfee8074c4e127704baa2. Tämä on yhteinen tuotantovalinta, ei havainnekuvista varmennettu kasvitunnistus tai väite historiallisesta istutuskartasta.

Kolme latvaa, läpinäkyvä tausta, lehtiaukot, lajien keskinäinen järjestys sekä vaalea/tumma taustatarkistus on varmennettu. Uusinta on ensimmäistä versiota tasaisempi. **Täysin valotonta albedoa ei hyväksytä tuottajan QA:ssa:** sisälehdissä on yhä tummempaa omaa varjostusta. Alfakanavan etualan mediaani on249/255; sisäosat eivät ole kaikkialla täysin peittäviä, ja reunalla on1–2/255arvoja. Alfaa ei muutettu käsin. PT arvioi tämän kortin käyttökelpoisuuden ja vastaanottajan materiaaliratkaisun. Ei väitettä, että peliin olisi tehty alfaleikkaus tai valaistuskorjaus.

Valmiiden Tripo-GLB-puiden vertailu tähän korttiin jää vielä avoimeksi. Lajivalinnan sopiminen ei itsessään todista lopullisten mallien ulkoasuvastaavuutta.

## 934: valkoisen marmorin kolme materiaalikanavaa

Valitussa uusinnassa värikarttaan ei ole piirretty lohikäärmekohokuvion valoa tai varjoja. Kaksi lohikäärmettä, pilvet ja kapea koristekehys ovat normaalikartassa. Karheuskartta on lähes tasainen materiaalidatakartta; keskiarvo on noin0,685. Ensimmäinen yritys hylättiin, koska sekä väri- että karheusrivi sisälsivät valaistun kohokuvion.

Tarkistin normaalikartan kahdella vastakkaisella Lambert-valolla: kohokuvion varjostus reagoi valon muutokseen. `qa/934-normal-relit-left.png` ja `...right.png` ovat **erillisiä diagnoosikuvia**, eivät värikarttoja tai pelin kuvakaappauksia. Ei raskasta renderöintiä tai pelimuutoksia.

Tuottajan visuaalinen tarkistus hyväksyy laatan materiaaliehdotuksen PT:n arvioon. Normaalivektorit ovat positiivisenZ:n puolella eikä nollavektoreita löytynyt. Vektorien pituus vaihtelee; näytteet pitää normalisoida varjostimessa. OpenGL+Y-konventio pyydettiin, mutta pelimoottorin tuontisuunta, vihreän kanavan mahdollinen kääntö ja reliefin vahvuus pitää todentaa vastaanottajan importissa. Tämä ei ole mitatusta3D-laatasta leivottu PBR-aineisto. Karheus luetaan R-kanavasta lineaarisena datana; sitä ei ole pakattu smoothness-/metallic-kanavaksi. Värikartta sRGB; normaali ja karheus lineaarisina tekstuuridatoina.

## 935: yhteensovitus ja puuttunut suunnitelma

Yhteinen lajisopimus on `TREE-SPECIES-CONTRACT.json`. Sama tiedosto jätettiin jo Tripo-tuottajan olemassa olevaan lähdepakettiin: `output/juoksupeli-identtinen-928932-20261024/sources/kuvasessio-puulajit-vahvistus-935.json`. Tämä koordinointiasia ei lisännyt generointikiintiötä eikä aloittanut uusia malleja.

07-ilmakuva kuuluu erilliseen813toimitukseen: `posti/juoksupeli-havainnekuvat-810-20261021/07-yleiskuva-ylhaalta.png`. Se on olemassa tämän tilauksen b2b8d8eac58ee7cf807ed44179f3d666bafbc426-kärjessä; tavut täsmäävät paikalliseen `output/juoksupeli-yleiskuva-813-20261021/delivery/07-yleiskuva-ylhaalta.png`-tiedostoon. Sopimus sisältää SHA256:n. Myös01/02/03/05/06 tarkistettiin kuvina ja postitavuja vasten.

Suunnitelma löytyi olemassa olevasta työtilasta `/Users/Shared/Claude/Matkakirja-linnanrakentaja/docs/raportit/juoksupeli-identtinen-suunnitelma-20261024.md`. Luin koko tiedoston, myös rivit6/10/13 sisältävän taulukon; kopio ja tiiviste ovat paketissa. Suunnitelman vanhempi juna211/212jako ja kolmiorajat eivät syrjäytä uuden tilauspostin päätöksiä. OsaB ei muuta pelin geometriaa, materiaaleja tai junaa.

## Todellinen tila

4/4 sallittua kutsua tehty; kaksi valittua native-tuotosta ja neljä käyttöön tarkoitettua tekstuuritiedostoa toimitetaan nyt. Lehvästön QA-rajoitteet ja Tripo-ulkoasuvertailu ovat avoinna. PT:n vastaanotto/hyväksyntä, Lavastajan sijoitus, Valosepän materiaalit ja valo, peli-integraatio sekä julkaisu ovat erillisiä eikä niitä ole tällä toimituksella varmennettu. R2:een ei ladattu. Vanhat kuvat ja ensimmäiset yritykset säilyvät.

Lähteet, promptit, molempien yritysten tunnisteet, tekniset mitat, SHA256:t ja QA-havainnot ovat JSON-tiedostoissa. Menetelmä: sisäänrakennettu image_gen, ei API/CLI-vaihtoa.
