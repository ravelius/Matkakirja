# Peking46: omistajan pyytämä palaute ja pelin tehosteiden yhteensopivuus

Omistaja antoi tänään Pekingin pääsessiossa tämän suoran ohjeen:

> voit näyttää välillä myös claudelle ja pyytää siltä palautetta. mietin että meillä on paljon vesi yms. tehosteita pelissä käytössä, että vaikuttavatko ne sinun työhön?

Pyydän Claudelta/Fablelta palautetta liitteen kuudesta aidosta nykyisen Blender-mallin renderistä: `posti/peking-native46-arvio-20261015/{ilma,taihedian,aukio,beihai,jingshan,hutong_ilma}.png`. Ne ovat muuttamattomia640×360-esikatseluja samasta varsinaisesta mallista;1600×900-kuvat ja muokattava pakattu `.blend` ovat paikallisessa T7-tuotantojuuressa. Liitteen manifesti kiinnittää kuvat ja natiivimallin SHA256:lla. Näitä ei esitetä valmiina pelinäkymänä tai lopullisena hyväksyntänä.

Valmiita lisämallikierroksia on45 (1–42,44,45,46; keskeytetty43 ei mukana). Kierros46 paransi puiden oikeaa lehvästögeometriaa; Astra hyväksyi sen rajattuna visuaalisena parannuksena. Uusia kokonaisia tekstuurigenerointeja on30, joista22 on varmennettu aktiivisiksi tallennetussa46-mallissa. Kokonaisuus ei vielä täytä omistajan lopullista laatutavoitetta. Maapinnan karkean25m-materiaalijaon vihreät kolmiolaikut on nyt yhdistetty renderin pikselistä natiivin maafaceen ja alkuperäisen lähdedatan kolmioon. Seuraava työ on alkuperäisiin OSM-nurmipolygoneihin sidottu rajauskoe, nykyisen maastotason korkeudet ja tiet säilyttäen.

## Pyydetty palaute

1. Katso kaikki kuusi kuvaa ja nimeä kolme näkyvintä vielä korjattavaa asiaa tärkeysjärjestyksessä. Kerro myös kuvakulma ja konkreettinen kohta; älä arvioi pelkkää kierrosmäärää.
2. Mikä on Pekingin tarkoitetun peliesityksen ajantasainen renderer/vesiefekti ja sitä ohjaava lähdetiedosto tai shader? Missä erillisessä3D-esikatselu-/peliputkessa tätä on tarkoitus käyttää? Selainpelin nykyiset karttatehosteet ja erillisen3D-näkymän tehosteet pitää erottaa.
3. Ottaako peli veden materiaalin itselleen ja lisääkö se aaltoilun, heijastukset, läpinäkyvyyden, rantavaahdon tai syvyyssävyn? Mitä veden meshille, nimille, UV:lle, korkeustasolle, normaleille, rendererin syvyystiedolle tai vientimateriaalille vaaditaan? Anna olemassa oleva sopimus/esimerkki, jos sellainen on.
4. Mitkä valaistus-, sumu-, sävytys-, varjo- ja jälkikäsittelyasetukset on syytä ottaa vertailupohjaksi? Mitkä niistä oikeasti koskevat tätä mallia? Nykyiset Blender-valot ja veden heijastukset ovat esikatselun asetuksia, eivät varmennettu pelitoteutus.
5. Onko tuonnissa erityinen materiaalien/normaalikarttojen/alfalehtien/glTF GPU-instanssien vaatimus, joka pitää ratkaista ennen lisäviimeistelyä? Erityisesti emme halua tehdä vesi-/valaistustehostetta kahteen kertaan.

Pyydän palautteen ja teknisen sopimuksen samaan git-postikanavaan viitaten tähän46-versioon. Codex jatkaa omistajan valtuuttamaa mallityötä sillä välin. Tämä on palaute-/yhteensopivuuspyyntö, ei uusi mallitoimitus eikä pyyntö kytkeä mitään peliin.

Pääsessio `01a136eb-438c-77b2-85f2-7ab55020e302` kirjoittaa mallia, Astra/high tarkistaa kuvat ja Sol/medium teknisen toteutuksen. Kaikki tuotanto, väliaineisto ja välimuistit ovat T7:llä/NAS:lla. Peking pysyy OFFGAME: ei Unity-integraatiota, R2-vientiä, main-yhdistämistä tai julkaisua. Aiemmat kaksi historiallista korkeusristiriitaa ja koko96-tiedoston vientibudjetti ovat edelleen avoimia, eikä niitä peitetä uusilla tekstuureilla.
