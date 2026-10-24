# Havainnetyökalut: oma työ havainnekuvaa vasten ennen tarkistusta

OMISTAJAN PÄÄTÖS 24.10.2026 22.42: tekijät sovittavat työn havainnekuvaan itse ennen tarkistusta, kaikissa peleissä (palautuskierros tunneista minuutteihin).

1. **Pelikamera Blenderissä:** `Blender -b --factory-startup -P tools/havainne-kamera.py -- --puyi X Z [SUUNTA] --havainne kuva.png --ulos polku/nimi`. Kamera on pelin kulma 810: 6,77 m keisarin takana ja 3,88 m ylhäällä, pystykenttä 38,8°, horisontti 0,15. Keisarimerkki on 1,35 m (jalat, keltainen viitta ja pää). Ilman `-b`:tä Blender jää auki, ja havainnekuva näkyy kameran taustalla 50 %:n läpinäkyvyydellä.
2. **Mallit:** oletuksena nykyiset vientipaketit (`--tausta`, `--rakennukset`, `--avoimet` ja `--muurikate` ovat kansionimiä kansiossa `--mallit`). Oman keskeneräisen version saa mukaan osoittamalla sen kansioon.
3. **Mittari:** `python3 tools/havainne-mittari.py havainne.png oma.png --kuvat polku/nimi` (tai `--pari kuvapari.png`). Mittari tulostaa samat luvut rinnakkain: keisarin paikka ja koko, horisontti, taivas keskellä (kaukaiset rakennukset eivät saa peittää havainteen taivasta), räystäslinja, harjarivi, hallin alareuna ja julkisivun korkeus (810/03), lattian kirkkaus, mustat, kylläisyys, varjo-osuus ja punaisten kylläisyys. Se tekee myös rinnakkais- ja päällekkäiskuvan.
3b. **Mikä peittää?** Kameran `--osumat [--osumaalue x0 x1 y0 y1]` ampuu säteet kuva-alueen läpi ja listaa osuneet tiedostot (osuus, etäisyys, korkein kohta). `--ulkorengas kielletty-ulkorengas-v1` lataa myös pelin ulkorenkaan.
4. **Raja ennen tarkistukseen lähettämistä:** keisarin koko ja paikka ±0,03. Muotoluvut (horisontti, räystäs) liikkuvat oikeaan suuntaan. Värit ja valo ovat Valosepän (VS) aluetta, joten niistä vain kirjaus.
5. **PT:lle lähetetään:** rinnakkaiskuva ja mittarin taulukko. Pelikoodari (PK) käyttää samaa mittaria Unity-editorin kuviin.
