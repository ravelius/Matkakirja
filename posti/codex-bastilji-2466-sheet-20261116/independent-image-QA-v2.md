# Bastilji B-v2 – riippumaton uusintatarkistus

16.11.2026. Tarkistettu vain `B-east-south-v2.png` ja `B-v2-footprint-geometry-reference.png`. Aiempi QA säilyy. Ei generointia, kuvan muokkausta, Tripo-ajoa tai 3D-mallin tarkistusta.

## Päätös

**B-v1:n keskeinen pohjamuotovirhe on korjattu näkyvässä kuvassa.** B-v2:n kaksi keskitornia ovat selvästi päätytornien linjaa ulompana, ja päätyjen yhdysmuurit taittuvat. Kuva vastaa johdetun pohjakaavion perusmuotoa. Kaavion 6 metriä on tavoite, ei tästä perspektiivikuvasta todennettu mitta; kaavio ei ole uusi historiallinen lähde.

**Harjakorkeus ja eteläpaluu jäävät ehdollisiksi.** En näistä kahdesta kuvasta nimeä varmaa korkeusvirhettä tai pakollista uutta generointia. Lähdeuskollisen 3D-geometrian hyväksyntä vaatii korkeuden ja kokoonpanon varmennuksen.

## Näkyvät onnistumiset

- Neljä pyöreää tornia; kaksi keskimmäistä selvästi ulompana.
- Yksi sisäänpäin kääntyvä eteläpaluu, ei ylimääräistä viidettä tornia.
- Tasaiset torniterassit, crenellointi ja konsolilista; ei kartiokattoja.
- Näkyvä kaarimuoto on umpisyvennys. Läpi näkyvää tunnelia ei näy.
- Ei ympäristöä eikä yhteistä jalustaa.

## Korkeuden arvio

Pohjoisemman keskitornin näkyvä runko vaikuttaa muita pidemmältä. Keskimmäinen yhdysmuuri näkyy kapeana, kuvatasossa lähes pystysuuntaisena kaistana. Tämä ei yksin tarkoita, että pinta olisi 3D:ssä pystysuora tai että harja porrastuisi: kameran suunta ja tornien peitto vaikuttavat juuri tähän osuuteen. Yhteistä lähes tasaista harjakorkeutta ei kuitenkaan voi tästä näkymästä varmasti hyväksyä.

Eteläpaluu näyttää tornin etupuolista runkoa matalammalta. Tornin etummainen pohjareuna on myös lähempänä kameraa ja kuvassa alempana kuin paluumuurin maalinja, mikä selittää osan vaikutelmasta. Pelkkä kuvapikseleissä mitattu seinäkorkeus ei siksi todista erillistä madallettua paluuta. Liitoksen luettavuus jää epävarmaksi.

## Must-fix vai ehdollinen hyväksyntä?

**Tässä v2-tarkistuksessa ei löytynyt varmasti osoitettavaa uutta must-fix-muotovirhettä.** B-v1:n todettu lähes suora itärivi ei enää ole sellainen. Korkeusepäilyä ei pidä muuttaa varmaksi virheeksi ilman lisänäyttöä.

Seuraavat kohdat pitää kuitenkin varmentaa ennen kuin kokonaisuutta kutsutaan lähdeuskolliseksi geometriaksi:

1. Torniterassit ja muurikäytävät muodostavat saman lähes tasaisen korkeuden.
2. Eteläpaluu kuuluu samaan korkeusjärjestelmään etelätornin kanssa. Tarkistus tehdään samasta maatasosta sivunäkymässä tai koottuna geometriana.
3. A/B liittyvät samassa mittakaavassa, ja C jää ulkomuureja matalammaksi pohjoiskolmannekseen. Kaksi erikokoista pihaa säilyvät avoimina. Näitä ei tarkistettu nyt; tekeillä olevaa kaaviota ei lasketa valmiiksi kokoonpanoksi.

KK voi hyväksyä B-v2:n seuraavan kokeen kuvaksi tietoisena korkeuden, takasivujen ja kokoonpanon avoimista kohdista. Tämä olisi ehdollinen kokeiluhyväksyntä. Lähdeuskolliseksi hyväksyttävää maksullista tuotantoajoa varten korkeudet ja kokoonpano tulee ensin varmentaa. B-v1:n pohjamuotovirhe ei enää yksin estä jatkoa.

Tarkistettujen kuvien SHA256-tunnisteet ovat rinnakkaisessa JSONissa. Aiemmat QA-tiedostot ovat ennallaan.
