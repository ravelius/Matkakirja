# Tehtävä 347: seam-candidate2, riippumaton visuaalinen arvio

**Tulos: visuaalinen portti hyväksytty rajatulle seuraavalle lentotestiehdokkaalle, kapea tumma saumaviiva kirjattuna avoimeksi.** Candidate2 ei näytetyissä kuvissa aiheuta uutta laajaa mustaa kaistaa, varjoaluetta, palatsiseinien peittymistä tai vesivarausten täyttymistä. Vaalea pystyrako sulkeutuu, mutta saumakohta ei ole täysin huomaamaton: se on paikoin hieman tummempi kuin ensimmäisessä saumakandidaatissa.

Tämä hyväksyntä koskee vain `seam-candidate2`-kokonaisuuden visuaalista soveltuvuutta rajattuun lentotestiin. Solin riippumaton tekninen portti on erillinen. Ensimmäinen seam-candidate1 hylättiin teknisesti ennen toimitusta; sen aiempi myönteinen kuvaportti jää historialliseksi eikä hyväksytä vanhaa ehdokasta teknisesti. Kiviverhoa ei sisällytetä tähän arvioon tai ehdokkaaseen.

## Aineisto ja tarkistukset

Katsoin kaikki 16 uutta alkuperäiskuvaa: kuusi vakionäkymää, neljä materiaalidiagnostiikkaa sekä kolme ennen/jälkeen-reikädiagnostiikkaparia. V4-vertailun kymmenen kuvaa oli katsottu tämän ketjun aiemmalla kierroksella; pihan pystysaumaa ja kanavan liittymää näyttävät V4-kuvat sekä ensimmäisen saumakandidaatin vastaavat kuvat avasin uudelleen tällä kierroksella.

Tarkistin 26 kuvan hashit (10 uutta materiaalikuvaa, 10 V4-vertailukuvaa ja 6 uutta reikädiagnostiikkaa), 48 materiaalituonnin GLB-hashia sekä reikädiagnostiikan neljä GLB-tuontiviitettä. Ehdokkaan kaikki 72 GLB-hashia täsmäävät sen proofiin; yhteenlaskettu koko on 157 667 960 tavua ja kolmioita on 1 385 100. Myös peitto-otoksen 24 lähdehashia täsmäävät. V4-proofin sidottu hash, kameroiden asetukset ja yhteinen ECEF-kehys täsmäävät.

Hashit, kameravertailun tulokset, kuvatiedostot ja numeeriset erot ovat rinnakkaisessa JSON-raportissa. Hashien tarkistus ei toista Solin geometriatarkastusta eikä hyväksytä LOD1/2:n ulkoasua.

## Alempi apupinta ja pihan lähiliittymä

`diagnostic-lod0-curtain-outer-tallest.png` on tässä peritty kameranimi, ei osoitus verhon mukanaolosta. 1280 × 720 -kuvan pystysauma on noin x=710–713. V4:n vaalea rako peittyy, mutta candidate2:ssa on kapea tumma hiusviiva. Se on paikoin ensimmäistä saumakandidaattia tummempi; en kuvaa tulosta täysin saumattomaksi.

Esimerkiksi kohdassa (712,100) RGB on V4:ssä (153,151,147), ensimmäisessä saumakandidaatissa (132,129,124) ja candidate2:ssa (115,111,105). Alueen `[709,0,715,395]` RGB-keskiarvot ovat vastaavasti noin (130,95;126,94;120,71), (125,04;120,59;113,69) ja (121,71;117,36;110,39). Nämä kuvaavat paikallista tummenemista; ne eivät ratkaise varjostuksen tai materiaalin osuutta siihen.

V4:n ja candidate2:n väliset yli 10 sävyarvon muutokset missä tahansa RGB-kanavassa rajautuvat tässä koko kuvassa alueeseen `[709,0,714,395]`, yhteensä 624 pikseliin. Kuvassa ei näy uutta leveää mustaa kaistaa tämän viivan ympärillä. Havaittu kapea viiva ei estä rajattua lentotestiä, mutta sen näkyvyys kameran liikkuessa ja eri valaistuksissa jää testattavaksi.

Tumma **vaakaviiva** noin y=266 on vanha V4-havainto. Esimerkkipiste (500,266) on kaikissa kolmessa versiossa RGB (107,101,93). Aiempi tuottajan lähdepaikannus viittaa noin 7 cm vanhaan kiveyksen korkeusportaaseen; se ei ratkaise lopullista renderöintisyytä. Vaaka- ja pystysuuntaisia viivoja ei pidä yhdistää samaksi korjaustulokseksi.

## Muut materiaalikuvat

| Näkymä | Candidate2-havainto |
|---|---|
| ilma | Palatsin massat, puusto ja vesivaraukset säilyvät; ei havaittua uutta leveää tummaa kaistaa. |
| taihedian | Julkisivu, katot, terassit, portaat ja kaiteet säilyvät näkyvinä. |
| aukio | Kiveys, muistomerkki ja portti säilyvät; ei uutta laajaa pintavarjoa. |
| beihai | Saaren, pagodin, puuston ja rannan siluetti säilyy. |
| jingshan | Ei havaittua uutta mustaa viivaa tässä kamerassa. Puusto peittää suuren osan maasta; kuva ei osoita syvimmän apupinnan peittoa matalasta kulmasta. |
| hutong_ilma | Julkisivut, katot, kiveys ja puusto säilyvät; ei havaittua uutta tummaa raitaa. |
| inner-canal | Valkoinen kanavavaraus jää avoimeksi; seinät ja perustukset säilyvät näkyvinä. Ohut vaalea saumakohta vähenee. Ei uutta leveää mustaa rantakaistaa. |
| palace-pond | Punaiset muurit ja avoimet lampivaraukset säilyvät. Ei verhon korkeita kiviseiniä. |
| curtain-inner-large-hole | Pitkä punainen muuri ja oikea torni säilyvät näkyvinä; ei uutta peittävää kivipintaa. |

## Kolme paikallista reikädiagnostiikkaa

Laskin uusista 1024 × 1024 -kuvista magentapikselit kynnyksellä R > 200, G < 80, B > 200. Saumoissa 1–3 määrät muuttuvat 8192 → 0, 8192 → 0 ja 6144 → 0. Suurin rivileveys muuttuu 8 → 0, 8 → 0 ja 6 → 0 pikseliä. Kaikki kolme kuvattua aukkoa sulkeutuvat tässä kamerassa.

Diagnostiikka käyttää harmaata emissiopintaa ja magentaa maailmantaustaa. Se osoittaa paikallisen geometriapeiton, ei alkuperäisen materiaalin varjoa, jatkuvaa peittoa kaikista kulmista tai pelinäkymän onnistumista.

Tuottajan candidate2-peitto-otos raportoi 11 988 pistettä: 9324 vanhaa aukkoa peittyy, 1989 pistettä oli jo vanhan maan peitossa ja 675 on vesivarausten vuoksi poissuljettu. Avoimia otospisteitä ei raportoida. Luin tuloksen ja tarkistin sen lähdehashit; en toistanut sädelaskentaa. Yhdeksän pistettä per 1332 segmenttiä ei todista jatkuvaa koko kaupungin peittoa.

## Tekniset väitteet ja seuraavan testin rajat

Tuottajan proofin mukaan vain uusi apugeometria on rakennettu uudelleen: vanhat maapisteet, rakennukset, materiaalit ja V4-puut säilyvät. Ilmoitettu enintään noin 12,5 m lasku koskee uuden apupinnan muutosta vanhaan apupintaan verrattuna, ei vanhan maan laskua. 50 mm tukialue, vähintään noin 20 mm alitus, 14 635 leikkausparia sekä uusien pintojen 2 mm vesivarausvara ovat teknisen auditoinnin asioita. En päättele niiden oikeellisuutta kuvista.

Lukemani Solin candidate2-raportin tilannekuva oli `AUDIT_IN_PROGRESS_NOT_ACCEPTANCE`. Tämä visuaalinen arvio ei muuta sitä hyväksytyksi. Tarkastuksen valmistuminen ratkaistaan Solin lopullisesta raportista erikseen.

Rajattua lentotestiä varten ei tarvita tämän kuva-aineiston perusteella uutta estävää offline-kamerapyyntöä. Lentotestissä on kuitenkin tarkistettava:

- sama pihan pystysauma myös matalasta vinosta kulmasta ja kameran liikkuessa; katso levenevää tummaa kaistaa, paljastuvaa taustaa tai vilkkumista;
- syvimmän apupinnan laskun Jingshan-sauma läheltä ja vinosti, koska puustoinen yleiskuva ei kata sitä;
- kanavan ja lammen liittymät todellisella pelivedellä sekä Ion-yhdistelmä ja klo 13/18 -valaistus.

Tämä ei ole runtime-, koko kaupungin laatu-, julkaisu- tai ihmisomistajahyväksyntä. Vanhan verhokokeen palatsiseinäongelmaa eikä todellisen maskin kohdistusta hyväksytä tässä portissa. Arvioija kirjoitti vain tämän raporttiparin eikä muuttanut mallia, lähdekoodia, kuvia tai pelipakettia.
