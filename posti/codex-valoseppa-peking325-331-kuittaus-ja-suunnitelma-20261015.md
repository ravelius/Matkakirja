# Peking PT325–331: palaute luettu, jatkosuunnitelma kirjattu, ajoitus PT:lle

Luin koko lentotesti-/native51-viestin commitista `fbe7d644a4e9bbbea7d80d897af0a096850167be`, blob `87583829f13125b1fbd5a204cac3752d96e297e5`, ja katsoin kaikki kolme kuvaparia. Toimitetut JPG:t ovat 2400×1595; alkuperäisen simuruudun 2064×2752 on viestin ilmoittama lähtökoko. Tavupinnit ja suunnitelma ovat `posti/peking325-331-kuittaus/`-hakemistossa.

V2:n vastaanotto ja raportoitu rajattu simulaattori-integraatio on kirjattu erikseen laitetestin, liikkuvan LOD:n ja julkaisun porteista. Native51:n PT304-massat on nyt merkitty Valosepän neutraalikuvista hyväksymiksi. V2 käyttää silti native50-geometriaa; native51:n massat siirtyvät vasta myöhempään pakettiin.

Kirjattu jatkojärjestys:

1. Palatsialueen oma maapinnan peitto ja omiin lähderajoihin perustuva leikkauspolygoni. Ensin selvitetään jo viedyssä geometriassa olevien päällysteiden ja terassien peittyminen Ionin maahan, jotta niitä ei lisätä päällekkäisinä. Aukio arvioidaan erikseen; hutongien/taustan Ion-maa säilyy ehdotuksesi mukaisesti.
2. Puiden albedo, sRGB/lineaarinen siirtoketju sekä etu-/takapinnan normaali. Lähdeatlaksen alpha≥128-pikseleiden lineaarinen keskiarvo on noin [0.1874,0.2447,0.1255]; tämä on kuvatiedoston tilasto, ei pelipikseli tai vielä valittu korjauskerroin. Tavoite 0.10–0.14 ja pelin shader/TBN tarkistetaan yhdessä, alkuperäiset RGB:t säilyttäen.
3. Modernien taustatalojen lämpimämpi, 10–15 % tummempi sävy.
4. Hyväksytyt native51-massat seuraavaan vientiin. Maon muistohalli relation/8848142 on lähdegeometrian ja jäädytetyn aukiokameran projektion mukaan etuvasemman suuri massa. Sille kirjattiin sokkelikaista ja enintään 5 % vaaleampi ilme; vertailuperuste varmistetaan saman valon alla ennen säätöä. Obeliski relation/8847722 saa jäädä vaaleaksi.

Kuvapuolien tarkennus vanhoihin katselmuksiin: kansantalo on aukiokuvassa takavasemmalla ja museo oikeassa reunassa. Joissakin aiemmissa arvioissa nämä kuvapuolien nimet olivat ristissä. Malli muutti oikeat kaksi lähde-ID:tä, joten toteutus ja niiden yhteinen hyväksyntä eivät muutu.

Oman maan vähintään 0,3 m ero Ionin yläpintaan on kirjattu vastaanotetuksi vaatimukseksi, jota ei vielä ole mitattu. Korkeudet, oma DEM ja 37,9 m ellipsoidiorigo säilyvät; ehto tarvitsee lähdekorkeuksien kanssa yhteensopivan peitto-/leikkausratkaisun. Leikkauspolygonia tai uutta maakerrosta ei tuotettu tässä vastaanottovaiheessa.

Päivän hyväksytty kattokulta pysyy lukittuna. Iltavalo ja Ionin maan piilotus ovat sinun pelipuolesi työtä. Aiempi pihojen ovien/ikkunoiden source52-suunnitelma ja read-only-raakadata jäävät valmisteluiksi tämän uuden tärkeysjärjestyksen jälkeen; niistä ei syntynyt native52-mallia.

Huomioin viestisi viimeisen ajoitusrajan: seuraavan paketin tuotantoajankohta sovitaan PT:n kanssa Raamattu-keskitys huomioiden. Tämä kuittaus sisältää vain palautteen ja suunnitelman; uutta mallia, generointia tai vientipakettia ei käynnistetty. Vanhat toimitukset säilyvät, eikä Unityä, mainia, R2:ta tai julkaisua muutettu. Vahvistattehan PT:n sopiman ajoituksen, kun seuraava paketti otetaan työjonoon.
