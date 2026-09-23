# Natiivin rajapinta: kartta, kamera ja kerrokset

Omistaja: Natiiviseppä. Muutoksista sovitaan hänen kanssaan (proto-3d/TYOTAPA.md).
Pelikoodari, Linssiseppä ja Natiivi-UI rakentavat tämän varaan. Merkintä **valmis** tarkoittaa,
että rajapinta on masterissa; **tulossa** tarkoittaa, että nimi ja merkitys on sovittu ja
Natiiviseppä toteuttaa sen pyynnöstä. Koordinaatit ovat aina asteina (lat, lon, WGS84) ja
korkeudet metreinä. Kaaret ovat asteina kapeammassa näyttösuunnassa.

## 1. Kamera — `PalloKierto` (kameran GameObject), toteuttaa `Matkakirja.Peli.IKamera`

| Jäsen | Tila | Merkitys |
|---|---|---|
| `void Aja(lat, lon, korkeus, kestoS, Action valmis)` | valmis | Kamera-ajo verkkopelin liikekielellä: siirtoajonPehmennys, ramppi 0,3; pitkällä matkalla kaari nousee. `korkeus <= 0` = nykyinen. Sormi keskeyttää ajon, eikä `valmis`-kutsua silloin tehdä. Uusi `Aja` korvaa edellisen. |
| `double KorkeusKaarelle(kaari°)` | valmis | Korkeus, jolla näkyy annettu kaari (rajattu Min–Max). Kaupunkiin saavutaan 18,6°:n näkymällä (`KaupunkiMerkit.saapumisKaari`). |
| `double MinKorkeus()`, `MaxKorkeus()` | valmis | Lähin näkymä (3,6° kuten webissä) ja koko pallo. |
| `double pituus, leveys, korkeus, kallistus` | valmis | Nykyinen kameratila. Lukea saa, kirjoittaa vain Natiiviseppä. |
| `event Action<string> KaupunkiNapautettu` (IKamera) | valmis | Kaupungin id napautuksesta. Herää ennen kameran omaa lentoa, joten kuuntelija voi ohittaa lennon omalla `Aja`-kutsullaan samassa kehyksessä. |
| `event Action<Vector2> Napautettu` | valmis | Raaka napautus näytön pikseleinä (osumaton napautus = tyhjä kohta). |
| `bool SyoteEstetty` | valmis | Kosketusten esto dialogin, lehden tai linssin oman eleen ajaksi. Pallo ei lue sormia eikä tunnista napautuksia, ja liuku pysähtyy. `Aja` ja synteettiset eleet toimivat edelleen. Asettaja palauttaa arvon `false`, kun oma näkymä sulkeutuu. |
| `Func<Vector2,bool> UiPeittaa` | valmis | Natiivi-UI:n peittokysely: kosketus, joka alkaa UI:n päältä, ei liikuta palloa koko eleen aikana. |
| `event Action NakymaMuuttui` | valmis | Kameratila muuttui tässä kehyksessä (linssit, sumu). |
| `bool Liikkeessa` | valmis | Sormi, liuku tai ajo käynnissä (mittarit ja UI). |
| `double kallistus` (0–60°) | valmis | Kahden sormen pystyveto kallistaa. Kallistus on sallittu vain alle 3000 km:n korkeudella, ja raja liukuu. |

## 2. Kaupungit — `KaupunkiMerkit` (CesiumGeoreference-olio)

| Jäsen | Tila | Merkitys |
|---|---|---|
| `bool ValitseKaupunki(string id)` | valmis | Sama kuin napautus: KaupunkiNapautettu, lento, korostus ja nimikortti. |
| `double saapumisKaari`, `float saapumisKesto` | valmis | 18,6° ja 1,4 s (webin PALLO_SUKELLUSLEVEYS ja PALLOKAMERAN_AJO_MS). |
| `NimiKortti kortti` | valmis | `Nayta(Sisalto.Kaupunki)` ja `Piilota()`. UI voi korvata oman korttinsa asettamalla `kortti = null`. |
| `void NaytaKaupungit(bool)` | tulossa | Kaikki merkit ja nimiöt päälle tai pois (linssit). |
| `void Korosta(string id, Color)` | tulossa | Yksittäisen kaupungin korostus (käyty, tavoite, linssin kohde). |

## 3. Reitit — `Reitit` (CesiumGeoreference-olio)

| Jäsen | Tila | Merkitys |
|---|---|---|
| `void NaytaNaapurit(string kaupunki)` | valmis | Naapurireitit ja lentokaaret, webin värein. |
| `bool Korosta(string a, string b)` | valmis | Valittu reitti korostuu, ja katko liikkuu. |
| `void Tyhjenna(bool myosKorostus = true)` | valmis | |
| `bool OnReitti(a, b)` | valmis | |
| `List<(lat, lon)> Polku(a, b)` | tulossa | Reitin polku kamera-ajoa ja nappulaa varten (sama kuin piirretty viiva). |

## 4. Kerrokset linsseille — `KarttaKerrokset` (valmis, `KarttaKerrokset.Instanssi`)

Linssi ei koske Cesium-komponentteihin suoraan. Se pyytää kerroksen avaimella:

| Jäsen | Merkitys |
|---|---|
| `void Nakyvyys(string kerros, bool)` | Sisäiset kerrokset: `"laatat"`, `"maasto"`, `"kaupungit"`, `"nimiot"`, `"reitit"`, `"napakannet"`. |
| `string LisaaRasteri(avain, urlTemplate, WebMercator/Geographic, minTaso, maxTaso, alfa)` | Linssin oma raster-kerros laattojen päälle (Cesium UrlTemplate). Enintään 2 linssikerrosta kerrallaan (Cesiumin oletusmateriaali tukee kolmea kerrosta). |
| `void PoistaRasteri(avain)`, `void Alfa(avain, float)` | |
| `event Action<string> KerrosValmis` | Linssin rasteri ladattu näkyvältä alueelta (Cesium ComputeLoadProgress). |
| `event Action<string> KerrosEpaonnistui` | Rasterin lataus epäonnistui (OnCesiumRasterOverlayLoadFailure). |

Alfa on nyt vain 0 tai 1 (kerros pois tai päällä), ja välimuoto on tulossa. `Nakyvyys("laatat", false)` poistaa pohjan Cesiumista, ja palautus lukee laatat levyvälimuistista. `"maasto"` vaihtaa ellipsoidin ja Karttasepän maaston välillä (kytkimen takana, kunnes rajasaumat on korjattu).

## 5. Valokeila (tulossa)

Kuvaruudun jälkikäsittely, joka ei muuta laattoja: himmentää kaiken paitsi ympyrän maan pinnalla.

| Jäsen | Merkitys |
|---|---|
| `void Valokeila.Nayta(lat, lon, sadeKm, himmennys 0–1, kestoS)` | Keila häivytetään sisään; `sadeKm` on maan pinnalla. |
| `void Valokeila.Siirra(lat, lon, sadeKm, kestoS)` | Sama liikekieli kuin kamera-ajossa. |
| `void Valokeila.Piilota(kestoS)` | |

## 6. Sumukerrokset (tulossa)

Tutkimaton alue pergamenttisumuna. Maskin resoluutio on noin 0,25°, ja se päivittyy
paljastuksesta.

| Jäsen | Merkitys |
|---|---|
| `void Sumu.Paalla(bool)` | |
| `void Sumu.Paljasta(lat, lon, sadeKm, kestoS)` | Pehmeä reuna; paljastus animoidaan. |
| `void Sumu.PaljastaMaa(string iso2)` | Koko maa (maan rajat Siirtosepän paketista). |
| `byte[] Sumu.Tila()`, `void Sumu.Palauta(byte[])` | Tallennus pelitilaan. |

## 7. Välimuisti ja offline-lataus — `Alueet` (tulossa)

Omistajan linjaus: binaari on mahdollisimman pieni. Sisältö, media, laatat ja maasto
striimataan ämpäristä ja välimuistitetaan (Cesiumin oma SQLite-välimuisti ja
Documents/sisalto). Pelaaja voi valinnaisesti ladata alueita offline-käyttöön maittain
asetuksista. **Natiivi-UI tekee valinnan ja näkymän, Natiiviseppä lataa.**

| Jäsen | Merkitys |
|---|---|
| `IReadOnlyList<Alue> Alueet.Luettelo()` | Ladattavat alueet: `iso2`, nimi, koko tavuina (arvio), onko ladattu, versio. |
| `IEnumerator Alueet.Lataa(string iso2, IProgress<float> eteneminen)` | Lataa pallolaatat z0–z8 (maailma, kerran), maan syvät tasot, maaston (layer.json-alue), sisältöpaketin ja maan median (media.json). Jatkuu keskeytyksestä. |
| `void Alueet.Poista(string iso2)` | Vapauttaa tilan (yhteinen z0–z8 jää). |
| `long Alueet.Kaytossa()`, `void Alueet.TyhjennaValimuisti()` | Välimuistin koko ja tyhjennys asetuksista. |
| `event Action<string> Alueet.Muuttui` | Lataus valmis, poistettu tai uusi versio saatavilla. |

Binaariin tulee vain ensikäynnistyksen tarve: kohtaus, varjostimet, fontti ja pieni
varapallo (z0–z2), jos verkkoa ei ole ensimmäisellä kerralla.

## 8. Sisältö — `Sisalto` (staattinen)

| Jäsen | Tila | Merkitys |
|---|---|---|
| `IEnumerator Hae<T>(kokoelma, Action<T[]>)` | valmis | JsonUtility-tyypitetty kokoelma (uusin.json → versio → välimuisti laitteella). |
| `IEnumerator HaeTeksti(kokoelma, Action<string>)` | valmis | Raakateksti (MiniJson sisäkkäisille taulukoille). |

## 9. Testaus

Komentotiedosto `Documents/komento.txt` (Kartta, `Komennot.cs`) ja `Documents/peli-komento.txt`
(Peli). Katso proto-3d/TYOTAPA.md.
