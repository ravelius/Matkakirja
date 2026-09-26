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
| `void Aja(lat, lon, korkeus, kestoS, valmis, Func<double,double> pehmennys)` | valmis | Sama omalla pehmennyskäyrällä (t → osuus); null = verkkopelin oletus. |
| `double KorkeusKaarelle(kaari°)` | valmis | Korkeus, jolla näkyy annettu kaari (rajattu Min–Max). Kaupunkiin saavutaan 18,6°:n näkymällä (`KaupunkiMerkit.saapumisKaari`). |
| `double MinKorkeus()`, `MaxKorkeus()` | valmis | Lähin näkymä (3,6° kuten webissä) ja koko pallo. |
| `double pituus, leveys, korkeus, kallistus` | valmis | Nykyinen kameratila. Lukea saa, kirjoittaa vain Natiiviseppä. |
| `event Action<string> KaupunkiNapautettu` (IKamera) | valmis | Kaupungin id napautuksesta. Herää ennen kameran omaa lentoa, joten kuuntelija voi ohittaa lennon omalla `Aja`-kutsullaan samassa kehyksessä. |
| `event Action<Vector2> Napautettu` | valmis | Raaka napautus näytön pikseleinä (osumaton napautus = tyhjä kohta). |
| `event Action PelaajanEle` | valmis | Pelaajan veto tai nipistys pallolla alkoi (kerran elettä kohden, kun liike ylittää napautusrajan tai sormia on kaksi; myös synteettinen `veto`/`nipistys`). Kamera-ajo ei herätä (web kutistaKortinLiikkeesta). |
| `bool SyoteEstetty` | valmis | Kosketusten esto dialogin, lehden tai linssin oman eleen ajaksi. Pallo ei lue sormia eikä tunnista napautuksia, ja liuku pysähtyy. `Aja` ja synteettiset eleet toimivat edelleen. Asettaja palauttaa arvon `false`, kun oma näkymä sulkeutuu. |
| `Func<Vector2,bool> UiPeittaa` | valmis | Natiivi-UI:n peittokysely: kosketus, joka alkaa UI:n päältä, ei liikuta palloa koko eleen aikana. |
| `Func<bool> NakymaPeitetty`, `bool Peitetty` | valmis | Koko näytön peitto (WKWebView-lehti). Asettaa vain `SyoteLukko` (`LisaaNakymaPeitto(Func<bool>)`, Pelikoodari). Peiton aikana pallo piirtää joka `PeitettyVali` (4.) kehyksen, ja kehysmittari kirjaa kehykset luokkaan `peitto`, ei lepoon. |
| `event Action NakymaMuuttui` | valmis | Kameratila muuttui tässä kehyksessä (linssit, sumu). |
| `bool Liikkeessa` | valmis | Sormi, liuku tai ajo käynnissä (mittarit ja UI). |
| `bool RuutuPiste(lat, lon, out Vector2 ruutu, korkeus = 0)` | valmis | Pisteen paikka näytön pikseleinä (origo vasen ala kuten Input); false = takapuolella tai ruudun ulkopuolella (Natiivi-UI:n noppa). |
| `double kallistus` (0–85°), `double KaytettyKallistus` | valmis | Kahden sormen yhdensuuntainen pystyveto kallistaa (ele lukitaan alussa: kallistus TAI nipistys+kierto, `KameraEleet`). `kallistus` on pelaajan tallennettu arvo; kuvassa käytetään `KaytettyKallistus` = min(tallennettu, raja): täysi ≤ 1500 km, nolla ≥ 7000 km (smootherstep), ja maaston rako (≥ 150 m tai 1 % etäisyydestä) voi pienentää sitä. Asentoa talteen ottava lukee `KaytettyKallistus`. |
| `double suuntima`, `void PalautaPohjoinen(float kestoS = 0.4f)` | valmis | Katseen suunta (0 = pohjoinen ylös). Pelaaja kääntää kahden sormen kiertoeleellä, ja suunta pysyy; tuplanapautus ja `PalautaPohjoinen` kääntävät pohjoisen ylös lyhintä tietä (smootherstep, 0 = heti). **Natiivi-UI:** kompassinappi kutsuu `PalautaPohjoinen()` ja voi kiertää neulaa `-suuntima` astetta (myötäpäivään positiivinen, kuten UI Toolkitin rotate). Lennon kuvauksen suuntima palautuu lennon jälkeen nollaan. |

## 2. Kaupungit — `KaupunkiMerkit` (CesiumGeoreference-olio)

| Jäsen | Tila | Merkitys |
|---|---|---|
| `bool ValitseKaupunki(string id)` | valmis | Sama kuin napautus: KaupunkiNapautettu, lento, korostus ja nimikortti. |
| `double saapumisKaari`, `float saapumisKesto` | valmis | 18,6° ja 1,4 s (webin PALLO_SUKELLUSLEVEYS ja PALLOKAMERAN_AJO_MS). |
| `NimiKortti kortti` | valmis | `Nayta(Sisalto.Kaupunki)` ja `Piilota()`. UI voi korvata oman korttinsa asettamalla `kortti = null`. |
| `void NaytaKaupungit(bool)` | tulossa | Kaikki merkit ja nimiöt päälle tai pois (linssit). |
| `void Korosta(string id, Color)` | tulossa | Yksittäisen kaupungin korostus (käyty, tavoite, linssin kohde). |
| `bool PeliOhjaaReitit { get; set; }` | valmis (build 13) | Tosi pelitilassa: `ValitseKaupunki` (napautus) ei koske Reitteihin (ei Tyhjenna, Korosta eikä NaytaNaapurit); PeliOhjain ohjaa reitit `Reitit.NaytaPeli`-kutsulla (web: napautus ei piirrä reittejä, vain `matkareittienValinta` ui.js:7885; pariteetti B10/D18/A3/A15/C18, löydökset 57 ja 60). Oletus epätosi = proto-komentojen entinen käytös. |
| `void PeliSuodatin(ICollection<string> kaupungit)` | valmis (build 13) | Pelin kaupunkirajaus (web lauta.js:2676–2716 pelinKaupunkirajaus, pariteetti D15): kohdemaan kaupungit + oma kaupunki + nopan siirtokohteet + tarjotut lentokohteet; muut eivät näy eivätkä ole napautettavissa. null = ei rajausta (nappula reitillä, maailmatila, peli pois). Erillinen `NaytaVain`-suodattimesta (radio, aloitus): merkki näkyy, jos molemmat sallivat. Linssinimissä ei käytetä. Pelikoodari antaa joukon. |
| `float osumaSade` | valmis (build 13) | 44 pt (web lauta.js:713 NAPAUTUKSEN_SADE_PX, lähin kohde säteellä); sama `Siirtokohdemerkit.osumaSade`. |

## 3. Reitit — `Reitit` (CesiumGeoreference-olio)

| Jäsen | Tila | Merkitys |
|---|---|---|
| `void NaytaNaapurit(string kaupunki)` | valmis | Naapurireitit ja lentokaaret, webin värein. |
| `bool Korosta(string a, string b)` | valmis | Valittu reitti korostuu, ja katko liikkuu. |
| `void Tyhjenna(bool myosKorostus = true)` | valmis | |
| `bool OnReitti(a, b)` | valmis | |
| `void Lentokaaret(string lahto, IReadOnlyCollection<string> kohteet, string elava = null)` | valmis (build 13) | Lentolista auki: lentokaaret lähdöstä kohteisiin (web matkareittienValinta, lennot) värillä rgba(150,54,40,.6), katko paikallaan; vain `elava`-kohteen (valittu lento, web ui.lentoKaari.b) katko liikkuu. Huippu paraabelina 0,5 · clamp(kulma/180, 0,02…1) säteestä. null = pois. Ei napautusta. |
| `void NaytaPeli(IReadOnlyList<string> ids)` | valmis (build 13) | Pelitilan ainoa reittiohjaus (web matkareittienValinta → reittiTunnukset): täsmälleen nämä reitit (pelin tunnukset "a|b", kumpaan suuntaan tahansa) tavallisella tyylillä, pergamenttivarjolla (B4) ja askelhelmillä (B5). Tyhjä/null = kaikki pois 250 ms:n häivytyksellä. Kutsu vain muutoksessa. |
| `(double Lat, double Lon)? ReittiPiste(string id, double osuus)` | valmis (build 13) | Askelpiste samalta polulta kuin piirto (web siirto.js:264 pointAlong(poly, idx/steps); LaudanPolku + Korjaa). id "a|b" (A = a), osuus 0–1 a:sta b:hen myös, kun data on b→a. Ilman laudan pisteitä isoympyrä. null, jos reittiä ei ole tai data ei ole ladattu. Koukku: `PeliApu.ReittiPiste = reitit.ReittiPiste`. |
| `Material helmi` | valmis (build 13) | Askelhelmen levy (Kohdemerkki-varjostin, Rakennus: Siirtokohde-materiaali); tyhjä = `Siirtokohdemerkit.materiaali`. |
| `void SovitaKohteet(IEnumerable<string> kaupungit, marginaali = 0,12)` | valmis | Kamera loitontaa, jos kohteet eivät mahdu ruutuun (web sovitaKohteetNakyviin); ei lähennä. Pohja: `PalloKierto.SovitaPisteet`. |
| `List<(lat, lon)> Polku(a, b)` | tulossa | Reitin polku kamera-ajoa ja nappulaa varten (sama kuin piirretty viiva). |

## 3b. Pelinappula ja aloituslento — `Nappula` (`KarttaKerrokset.Instanssi.nappula`)

| Jäsen | Tila | Merkitys |
|---|---|---|
| `void Aseta(lat, lon)`, `Piilota()` | valmis | Nappula näkyviin pisteeseen / pois. |
| `float Aja(Nappula.Matkaliike liike, Action valmis)` | valmis (25.9.) | **Maa- ja merimatka webin koreografialla** (pariteetti A20, A21, B12–B16; luvut `Kartta/Siirtokoreografia.cs`). `Matkaliike { IList<(lat, lon)> Pisteet; Kulkutapa Tapa; int Askelia }`: Pisteet = `PeliApu.Matkapisteet(...)` (ensimmäinen = lähtö), Tapa = `Kulkutapa.Maa` (liftaus), `Bussi` tai `Meri` (laiva; muut kuten liftaus), Askelia = polun askelmäärä (web `path.length`, 0 = pisteitä − 1). Kulku: ennakkozoomi 760–1800 ms + 120 ms → yksi saattava kamera-ajo kohti määränpäätä (clamp(300 + nappula + 280, 1200, 6200) ms, trapetsi 0,3) → nappula lähtee 300 ms myöhemmin: liftaus hyppyketjuna (860 ms/hyppy 1–5 askeleella, 6 askelta 708, lyhin 640, tauko 190), bussi autokyytinä (n × round(askel × 0,6)), laiva hyppyketjuna (190 + 190 ms). `valmis` perillä (nappula laskeutunut ja saatto päättynyt). **Palauttaa koko keston sekunteina** varakelloa varten. Sormi keskeyttää kamera-ajot, nappula jatkaa. |
| `float MatkanKesto(Nappula.Matkaliike liike)` | valmis (25.9.) | Sama kesto käynnistämättä (riippuu kameran nykyisestä paikasta, laske juuri ennen `Aja`a). Pelikoodari: `var l = new Nappula.Matkaliike { Pisteet = pisteet, Tapa = t.Tapa, Askelia = t.Polku?.Count ?? 0 }; float k = nappula.MatkanKesto(l); NappulaAjo(v => nappula.Aja(l, v), k, Perilla);` — `PeliApu.AjoKesto(kulma)` ei enää kuvaa maa- ja merimatkan kestoa. |
| `void Aja(IList<(lat, lon)> matkapisteet, kestoS, Action valmis)` | vanha | Sama koreografia liftauksena, koko aikataulu kutistettuna `kestoS`:ään (varakello ei laukea kesken). Kamera ei ole enää lukittu nappulaan. |
| `void Lenna(lat0, lon0, lat1, lon1, kestoS, Action valmis)` | valmis | Lento isoympyräkaarena. Valitun lennon kaari näkyy liikkuvana katkoviivana lähdöstä laskeutumiseen koneen reittiä pitkin (B24, `naytaLentokaari`), häivytettynä lähikuvissa. |
| `void AloitusLento(lahtoLat, lahtoLon, lat, lon, kestoS, Action lahti, Action valmis)` | valmis | Omistajan aloituskaava: kamera zoomaa lähtöön (`lahtoZoomS` 2,5 s, kaari 18,6°), sitten `lahti` (Pelikoodari: koneen ääni ja intro-luenta), lentokone lentää kaarta pitkin `kestoS` sekuntia kameran seuratessa ja noustessa niin, että kaari näkyy; perillä `valmis` (Pelikoodari: AloituslentoPaattyi → UI) ja kone vaihtuu nappulaksi. Sormi ei pysäytä lentoa. Testi: `nappula aloitus 51.5 -0.13 41.9 12.5 20`. |
| `LennonVaihe Vaihe`, `event Action<LennonVaihe> VaiheVaihtui` | valmis | LENNON ESITYS (kaikki lennot, `Lenna` ja `AloitusLento`): `Nousu` (p < 0,2), `Matka`, `Lasku` (p > 0,8, puoliorbitti koneen ympäri), `Ei` perillä tai keskeytettäessä. Kamera yläviistosta koneen takaa (`PalloKierto.Kuvaa`), aurinko UTC-ajan mukaan (`Aurinko.Aika` = pelin kello, jos Pelikoodari asettaa), etäisyyssumu matkalennolla, Linssisepän `LentoPilvet`, savujana (`Savujana`) ja DC-3-malli (`koneMalli`). Punaista reittikorostusta ei tarvita lennoilla. |

## 3c. Nostokerros — `NostoKerros` (`NostoKerros.Instanssi`), valmis

Webin pallon nostokerros (js/pallolauta/nostot.js, js/fokuskohteet.js). Kartta päättää, mitkä nostot näkyvät ja missä; **Natiivi-UI piirtää merkit** (NostoMerkit-symbolit, nimiöt, ryhmät 44 px, viuhka) ja avaa kortin napautuksesta.

| Jäsen | Merkitys |
|---|---|
| `IReadOnlyList<Nosto> Naytettavat` | Tämän kehyksen nostot: `Id, Tunnus, Aihe, Kategoria, Nimi, Nimio (null = ei nimeä), Maa, KaupunkiAvain, TakyNosto, Lat, Lon, Taso, Tarkeys, Lahizoom, Ruutu (px, origo vasen ala), Keskelta`. Vain ruudulla ja edessä, enintään `katto` 120 lähimpänä keskeltä. |
| `bool Nakyvissa`, `float Syttyminen` (0→1, 0,7 s), `float Osuus` | Kerros näkyy, kun maan leveys / näkyvä leveys ≥ 0,5 (LEHDEN_VAHIN_OSUUS) ja saapumisesta 1,4 s kamera ja nappula paikallaan (saapumisPortti). |
| `event Action Paivittyi` | Naytettavat, näkyvyys tai syttyminen muuttui tässä kehyksessä (kuuntele ja siirrä merkit). |
| `string Maa { get; set; }`, `NykyinenMaa` | Pakotettu maa (ISO3) tai null = nappulan kaupungin maa. |
| `bool LinssiNimet` | Linssinimet (KarttaKerrokset `"linssinimet"`): saapumisportti ohitetaan ja `Lahella` on tosi. **Natiivi-UI:** näytä merkit linssin aikana, kun tämä on tosi (`NaytaSallittu(false)` ei silloin piilota), ilman napautusta ja viuhkaa. |

## 3d. Nimikerros — `Nimikerros` (`Nimikerros.Instanssi`), build 11

Webin poltetun nimiötason maakunnat, nykyalueet ja meret sekä pohjalaattojen valtameret (löydös 38), elävinä mutta
painettuina maahan: teksti on pinnan tangenttitasossa (koko `korkeus_m` × `leveys_m`, kulma), näkyy vain omilla
pallotasoillaan (taso kamerakorkeudesta), häivytetään kallistuksessa 65–75°:n katselukulmassa ja käännetään 180°, jos
se olisi ruudulla ylösalaisin. Merien alla webin aaltomerkki. Aineisto: kokoelma `aluenimet` (skeema 1.37); vanhassa
paketissa `merinimet` (1.36) varareittinä (meri, joka on molemmissa, luetaan aluenimistä); ei kumpaakaan = tyhjä
kerros. Puhtaat osat: `Kartta/NimiLadonta.cs` (testit `Kartta-testit/Testit/NimiLadontaTestit.cs`). Nimiin ei voi napauttaa.

| Jäsen | Merkitys |
|---|---|
| `Ruutuvaraukset KaupunkiMerkit.Varaukset` | YHTEINEN RUUTUTÖRMÄYS: kehyksen varatut nimiöalueet pikseleinä (origo vasen ala). Kaupungit varaavat ensin, Nimikerros lisää nostojen laatikot (`NostoKerros.Naytettavat`, Natiivi-UI:n mitoin) ja omat nimensä. Prioriteetti kaupunki > nosto > maakunta/nykyalue > meri > valtameri; alempi nimi piilotetaan paikallaan (webin väistö on jo paikoissa). Uusi kirjoittaja: `Varmista(Time.frameCount)` ja `YritaVarata`. |
| `TMP_FontAsset fonttiPysty, fonttiKursiivi` | Liberation Serif Regular ja Italic SDF (Fable 24.9.2026; Rakennus lukee `Fontit/LiberationSerif-Regular SDF.asset` ja `-Italic SDF.asset`, kun ne on tehty). Tyhjä = `KaupunkiMerkit.fontti` (EB Garamond), kursiivi TMP:n vinona. Yksi materiaali fonttia kohden (TMP Distance Field Overlay, ZTest Always). |
| `bool paalla`, `bool valtameret` | Koko kerros; valtameret pois oletuksena, koska pohjasarja 2026-09-23a sisältää ne poltettuina Z1–Z4. |
| `int Taso`, `double JatkuvaTaso`, `int Naytetty`, `string Kuvaus()` | Pallotaso ja mittarit. Testi: `nimet paalle|pois|laske`, `nimet valtameret paalle`, `nimet siirto 0.6`. |

## 3e. Liput tuulessa — `Liput` (staattinen, `Kartta/Liput.cs`), löydös 144

Lipun arvokas aaltoilu UI Toolkitin taustakuvaksi (kartussin lippu, tervehdysten pikkuliput). Natiivi-UI hakee
tekstuurin (`Kuvat.Hae`) ja näyttää kahvan RT:n; Kartta piirtää sen `Graphics.Blit`illä aaltovarjostimen
(`Resources/Lippuaalto.shader`) läpi pieneen RT:hen, ilman kameraa ja verkkoa. Yksi yhteinen ajuri, enintään 30
päivitystä sekunnissa ja vain näkyville; kun mikään ei näy, ei GPU-työtä. Aaltoilu seuraa Joutosykettä: levossa
(3 s ilman aktiivisuutta) lippu asettuu suoraksi ja päivitys loppuu, kosketus jatkaa. Varjostimen puuttuessa kahva
näyttää alkuperäisen kuvan (varoitus lokiin).

| Jäsen | Merkitys |
|---|---|
| `Liput.Aalto Liput.Aaltoile(Texture lahde, int w, int h)` | Uusi kahva; w × h RT:n pikseleinä (UI-koko × paneelin skaala, rajataan 2–1024). Kuva piirretään heti kerran suorana. (Metodi ei voi olla `Aalto`, koska sisäkkäinen tyyppi on `Aalto`.) |
| `RenderTexture Aalto.Kuva` | Piirretty lippu (sRGB, tavallinen alfa, läpinäkyvä marginaali). UI: `new StyleBackground(Background.FromRenderTexture(a.Kuva))`. Sama olio koko eliniän. |
| `event Action Aalto.Paivittyi` | Kuva piirrettiin uudelleen (UI: `MarkDirtyRepaint`). |
| `bool Aalto.Nakyy` | UI asettaa: tosi vain, kun lippu on ruudulla (oletus epätosi). Näkyviin tullessa kuva päivittyy heti. |
| `void Liput.Vapauta(Aalto a)` | Vapauttaa RT:n ja irrottaa kuuntelijat (lähdetekstuuri jää Kuvat-välimuistiin). Kutsu, kun elementti poistuu tai lippu vaihtuu. |
| `const float Liput.Reuna` (0,04) | Marginaali joka reunalla: lippu on 92 % RT:stä, jotta aalto ei leikkaa kuvaa. Sama näkyvä koko kuin ennen: elementti × 1 / (1 − 2 · Reuna). |

Testi: `liput tila | jatkuva | syke`, `liput koe nimi [aika]` (Documents/nimi.png ilman UI:ta).

## 4. Kerrokset linsseille — `KarttaKerrokset` (valmis, `KarttaKerrokset.Instanssi`)

Linssi ei koske Cesium-komponentteihin suoraan. Se pyytää kerroksen avaimella:

| Jäsen | Merkitys |
|---|---|
| `void Nakyvyys(string kerros, bool)` | Sisäiset kerrokset: `"laatat"`, `"maasto"`, `"kaupungit"`, `"nimiot"`, `"reitit"`, `"napakannet"` (napakalotit ja niiden varakannet; reliefin ollessa pohjan tilalla kalotti piiloon ja kansi reliefin sävyyn automaattisesti), `"nappula"` (nappula ja kone), `"pisteet"` (Karttapisteet), `"valot"` (karttavalot; valinta säilyy). Linssiportti piilottaa nämä kuten webin body.aikajana-paalla. |
| `Nakyvyys("aluenimet", bool)` | Alue-, meri- ja valtamerinimet (Nimikerros, luku 3d) päälle tai pois. Ne seuraavat lisäksi `"kaupungit"`- ja `"nimiot"`-porttia (linssin aikana vain meret). |
| `Nakyvyys("linssinimet", bool)`, `bool Linssinimet` | Webin linssikartan nimet (build 10): kun linssi on piilottanut `"kaupungit"`, kaupunkipisteet ja -nimet näkyvät webin linssiasussa (harvennettu kapiteeli 0,14 em, muste rgba(103,88,73,0.92), nimi 9,5/10,5 pt, piste 3,3/4,3 pt) ilman napautusta, huomiorenkaita ja maan kehää, ja `NostoKerros.LinssiNimet` päästää nostot saapumisportin ohi ja avaa `Lahella`-portin (ryhmien nimet). Tila purkautuu, kun `"kaupungit"` palaa. Merinimet näkyvät linssin aikana Nimikerroksesta (luku 3d). Testi: `kerros kaupungit pois`, `kerros nimiot pois`, `kerros linssinimet paalle`. |
| `string LisaaRasteri(avain, urlTemplate, WebMercator/Geographic, minTaso, maxTaso, alfa)` | Linssin oma raster-kerros laattojen päälle (Cesium UrlTemplate). Enintään 2 linssikerrosta kerrallaan (Cesiumin oletusmateriaali tukee kolmea kerrosta). |
| `void PoistaRasteri(avain)`, `void Alfa(avain, float)` | |
| `event Action<string> KerrosValmis` | Linssin rasteri ladattu näkyvältä alueelta (Cesium ComputeLoadProgress). |
| `event Action<string> KerrosEpaonnistui` | Rasterin lataus epäonnistui (OnCesiumRasterOverlayLoadFailure). |

**Maatila (tulossa, Linssisepän vertailu ja maatiedot):**

| Jäsen | Merkitys |
|---|---|
| `void MaaTila(bool)` | Kaupungit ja nimiöt piiloon, maiden rajat näkyviin; napautus osuu maahan eikä kaupunkiin. |
| `event Action<string> MaaNapautettu` | iso2 napautetusta maasta (countryShapes, sama aineisto kuin `Sumu.PaljastaMaa`). |
| `void Korosta(string iso2, Color)`, `void KorostusPois()` | Maan täyttö ja raja korostusvärillä. |

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

Toteutus: `Alueet` toteuttaa Natiivi-UI:n rajapinnan `IOfflineLataus` (UI/UiPalvelut.cs:
`Maat`, `Muuttui`, `Lataa`, `Peru`, `Poista`, `VapaaTila`) ja asettaa `UiPalvelut.Offline`.
Latauslista tulee Siirtosepän manifestista `offline.json` (juuressa `lahteet`: rasterin ja
maaston osoitepohjat; `maat.ISO3`: rasteri- ja maastotasojen laattarajat, media-avaimet ja
tavut). Globaalisti kerran: rasteri z0–z5 ja maasto z0–z6; maittain rasteri z6–z8 ja
maaston syvemmät tasot. Alla oleva taulukko on alkuperäinen luonnos.

| Jäsen | Merkitys |
|---|---|
| `IReadOnlyList<Alue> Alueet.Luettelo()` | Ladattavat alueet: `iso2`, nimi, koko tavuina (arvio), onko ladattu, versio. |
| `IEnumerator Alueet.Lataa(string iso2, IProgress<float> eteneminen)` | Lataa pallolaatat z0–z5 (maailma, kerran), maan syvät tasot, maaston (layer.json-alue), sisältöpaketin ja maan median (media.json). Jatkuu keskeytyksestä. |
| `void Alueet.Poista(string iso2)` | Vapauttaa tilan (yhteinen z0–z5 jää). |
| `long Alueet.Kaytossa()`, `void Alueet.TyhjennaValimuisti()` | Välimuistin koko ja tyhjennys asetuksista. |
| `event Action<string> Alueet.Muuttui` | Lataus valmis, poistettu tai uusi versio saatavilla. |

Binaariin tulee vain ensikäynnistyksen tarve: kohtaus, varjostimet, fontti ja pieni
varapallo (z0–z2), jos verkkoa ei ole ensimmäisellä kerralla.

## 8. Sisältö — `Sisalto` (staattinen)

| Jäsen | Tila | Merkitys |
|---|---|---|
| `IEnumerator Hae<T>(kokoelma, Action<T[]>)` | valmis | JsonUtility-tyypitetty kokoelma (uusin.json → versio → välimuisti laitteella). |
| `IEnumerator HaeTeksti(kokoelma, Action<string>)` | valmis | Raakateksti (MiniJson sisäkkäisille taulukoille). |

## 8b. Radion VU-taso — `Assets/Plugins/iOS/MatkakirjaRadio.mm` (Natiiviseppä, build 8: oma AVAudioEngine-soitin)

| Funktio (`[DllImport("__Internal")]`) | Tila | Merkitys |
|---|---|---|
| `float MatkakirjaRadio_Taso()` | valmis | Soivan virran RMS-taso 0…1 (~30 ms ikkuna, dBFS −60…0 → 0…1) ENNEN voimakkuutta; nopea nousu, vaimennus ~0,3 s; 0 kun ei soi (tila ≠ 2) tai tauolla. **−1** vain AVPlayer-varapolulla (HLS/.m3u8, Ogg/Opus tai muu tuntematon muoto, URLSessionin varhainen virhe, ei ääntä 8 s:ssa) → webin ajastettu varakuvio. Halpa: luetaan joka kehys (atomit, ei lukkoja). |
| `float MatkakirjaRadio_Huippu()` | valmis | Sama huippuarvosta (\|näyte\| max), vaimennus ~1 s. |
| `float MatkakirjaRadio_Rms()` | valmis | Raaka lineaarinen RMS 0…1 (~30 ms), ei tasoitusta eikä dB-asteikkoa, ennen voimakkuutta; 0 ei soi, −1 varapolku. VuMittari tasoittaa itse. |
| `void MatkakirjaRadio_Esikuuntele(const char* url)` | build 18 (Linssiseppä, Natiiviseppä katselmoi 26.9.) | Seuraavan aseman esikuuntelu (ESILATAUSPOLITIIKKA kohta 6): toinen virta jäsentää paketit enintään 4 s:n renkaaseen ilman muunnosta ja ajastusta; `MatkakirjaRadio_Avaa` samalla osoitteella ottaa sen käyttöön heti. NULL = pois. Yksi kerrallaan; Avaa toisella osoitteella, tauko ja 60 s ilman käyttöönottoa sulkevat; HLS ja ei-http eivät esikuuntele; `Sulje` ei sulje (asemanvaihdon Sulje–Avaa-pari). Linssit: `IRadioVirta.Esikuuntele`, RadioLinssi valitsee seuraavan. |

Mittaus (build 8): progressiiviset http(s)-virrat (Icecast/Shoutcast mp3, aac/aacp ADTS, myös Shoutcast v1
"ICY 200 OK") soitetaan omalla moottorilla URLSession → AudioFileStream → AudioConverter (Float32) →
AVAudioPlayerNode → mainMixerNode, ja taso lasketaan `installTapOnBus`-tapista soitinsolmun ulostulosta.
Tila 2 vasta kun ajastettu ääni oikeasti soi; puskurointi 1,5 s (alivuodon jälkeen +1 s, enintään 4 s),
ajastettua enintään ~6 s (live pysyy livenä). `MatkakirjaRadio_Kuvaus()` kertoo polun (engine/avplayer),
Content-Typen, muodon, ajastetut sekunnit, alivuodot, tavut, tappikutsut ja varapolun syyn.
ATS: `NSAllowsArbitraryLoadsForMedia` ei koske URLSessionia → http://-osoitteet menevät varapolulle (VU −1).
MediaToolbox-linkitystä (Rakennus.Kehykset) ei enää tarvita, mutta se on harmiton.
Koskee kaikkia MatkakirjaRadio_Avaa-virtoja (myös lehden mediarivi).

## 9. Testaus

Komentotiedosto `Documents/komento.txt` (Kartta, `Komennot.cs`) ja `Documents/peli-komento.txt`
(Peli). Katso proto-3d/TYOTAPA.md.

## 10. Ehdotukset: sisältöpaketti, offline ja palvelimet (Siirtoseppä 23.9.2026)

Siirtoseppä ylläpitää kohtia 10.1–10.2 (paketti on Matkakirja-repossa, `tools/vienti/`).
Kohta 10.3 on koottu web-pelin workereista (`tools/pollo/`, `worker/sahke/`,
`worker/ehdotukset/`) natiivin sopimuspohjaksi, ja päätökset (origin/tunnistus) jäävät
Natiivisepälle ja Fablelle.

### 10.1 Sisältöpaketti (Siirtoseppä tarjoaa)

Kaikki pelin sisältö datana, moottorineutraalina JSONina. Lähde: web-pelin
`js/packs/*` ja nimetyt exportit (`tools/vienti/`), tausta
`docs/raportit/sisallon-siirtoputki-20260923.md` (Matkakirja-repo).

- **Osoitin:** `https://media.matkakirja.app/sisalto/1/uusin.json`. CI julkaisee sen jokaisesta
  main-mergestä, jossa sisältö muuttui (nippu 3 mainissa 23.9.2026, v2150). Mainia uudemmat
  haarat ovat koepaketissa `/Users/Shared/Claude/sisalto-koe/uusin.json` (polku `v<N>/`; paikallinen
  numerointi, ei sama kuin ämpärin N).
- **Osoittimen kentät:** `versio` (N), `polku` (`sisalto/1/v<N>/`), `sha256`, `skeemaversio` ("1.x"),
  `minSovellus.ios`, `edellinen`, `commit`, `julkaistu`. `sha256` = sha256 riveistä
  `<polku>\t<tiedoston sha256>\n` polkujen aakkosjärjestyksessä (tools/vienti/julkaise-sisalto.mjs
  paketinTiiviste).
- **Käyttöönotto:** lue osoitin. Jos major ≠ 1 tai `minSovellus.ios` on suurempi kuin
  sovelluksen oma, pidä vanha paketti. Muuten lataa `manifest.json`, tarkista kunkin tiedoston
  `sha256` ja `tavuja` ja vaihda paketti vasta, kun kaikki täsmää. **Vertaa skeemaversiota
  numeroina** (1.10 > 1.9), älä merkkijonoina.
- **Rakenne:** `manifest.json` (kokoelmat[], moduulit[], webNakymat[], logiikka[], media),
  `kokoelmat/<nimi>.json` = `{ nimi, lahde, kuvaus, viittaukset, alkiot: [{ id, … }] }`
  (viittaukset: kenttä → kokoelma), `media.json` (jokainen kuva, ääni ja URL: url, varat,
  suurennos), `skeema/*.schema.json`, `moduulit/` (raakakerros, häviötön), `tiedostot/`
  (JSON sellaisenaan, esim. luentojen aikaleimat), `web/lehti.json` (lehtikuoren riippuvuudet).
- **Sopimus:** käytä päätason kenttiä. `data` on webin raakaolio, eikä siihen nojata (voi muuttua
  ilman versionnostoa). Jos kenttä puuttuu, pyydä Siirtosepältä. Paketissa ei ole ajettavaa
  koodia: `manifest.logiikka[]` luokittelee jokaisen webin funktion (media | esilaskettu |
  saanto | logiikka tunnisteella, esim. `pulma:roomalaiset` | kuollut).

| Kokoelma | Pääkäyttäjä | Sisältö |
|---|---|---|
| kaupungit, reitit, laatat | Natiiviseppä | lat/lon, maa2, tarkeys 0–3, lauta {x,y}; reitin laji, askelia, via; laattatyypit ja määrät |
| saannot, saapuminen, tapahtumat | Pelikoodari | hinnat, XP, arvovälit, BOT_SKILL; saapumishaut kaupungeittain; tapahtumakortit |
| kysymykset, kuvakysymykset, lippumaat | Pelikoodari | visat ja väittämät; kuvat ja liput pelin arvontajärjestyksessä url:eineen |
| pulmat, pulmaaineisto, esilasketut | Pelikoodari | generaattori-tunniste; pulmien lähdetaulut; esilasketut apufunktiot |
| luennat, aanitaulut | Pelikoodari | isoisän luennat (url, kesto, aikaleimat); tehosteet, näytteet, musiikkiketju |
| linssiaineisto (+ moduulit/js/linssit/*) | Linssiseppä | maskit, manifestit, pilvet, astronautin äänet, avauskynnykset |
| kaupunkilehdet, maalehdet, nahtavyydet, miniatyyrit, julisteet, skandaalit, monumentit, historianHetket, elaintayt, paikallisaarteet | Natiivi-UI | lehtien ja nostojen sisältö |
| fokusvirrat, saapumispuheet, kohtaamiset, kohtaamiskuvat, tarinakaari, livianpuhe, livianrepliikit, paikkatiedot | Natiivi-UI / Pelikoodari | saapumisvirta, puheet, kohtaamiset, Livian cuet (aani, eleet), Livian 68 äänitettyä repliikkiä |

**Skeemat 1.10–1.12 (Siirtoseppä 23.9.2026, koepaketti v14):**

- **1.10** `kaupungit[].korkeus` m (EGM2008, 10 m tarkkuus, Copernicus GLO-30; 265/266, St Helena
  null = meri). Lisäksi karttamerkit, karttavalot, maastonimet, maarajat ja muotokuvat;
  `luennat[].reaktiot` ja `tekstiSha256`.
- **1.11** Livia: `livianpuhe.cuet[]` = `{ id, ankkuri, esiintyma, tarkoitus, voimakkuus, ele, alku, loppu }`.
  `ele` on valmis SVG-ele (cityExplain, grin, think…), joten tarkoitus-elekarttaa ei tarvita.
  `alku`/`loppu` (ms äänen alusta) ovat mukana vain, kun `eleetTila` = `ok`; silloin `aaniTavut` ja
  `aaniSha256` kertovat, mihin mp3:een ajat kuuluvat. Muut tilat: `puuttuu` (ämpärissä ei eleitä),
  `vanhentunut` (teksti vaihtunut). `luennat[].reaktiot[].ele` samoin. Kokoelma `livianrepliikit`:
  `{ id, lahde, kaupunki, linssi, indeksi, teksti, aani, kesto, kuplaSekunteina, pinoutuu, saapuu,
  ajanTasalla }`; `ajanTasalla` false → älä soita.
- **1.12** Repon `assets/`-kuvat (karttamerkit, kätkökuva, omat liput ja valokuvat, kartat) osoittavat
  `https://media.matkakirja.app/assets/<polku>?v=<sha256 12>`. Pages-osoite on `varat[0]`:ssa.
  CI vie tiedostot ämpäriin ennen pakettia. Livian kypärä: `saannot` id `LIVIAN_ASTRONAUTTI_KYPARA`.

### 10.2 `offline.json` (Siirtoseppä, skeema 1.9, toteutettu)

Paketin juuressa, manifestissa `offline: { tiedosto, sha256, tavuja }`. Lähde
`tools/vienti/offline.mjs` (Matkakirja-repo), skeema `skeema/offline.schema.json`.

```
{ "$skeema": "matkakirja-vienti/1/offline", "arvio": true, "koot": { "haettu", "otos" },
  "lahteet": { "rasteri": { "url": "…/{z}/{x}/{y}.jpg", "skeema": "xyz", "projektio": "EPSG:3857",
                            "koko": 256, "minzoom": 0, "maxzoom": 8, "globaaliMax": 5 },
               "maasto":  { "layer": "…/layer.json", "url": "…/{z}/{x}/{y}.terrain?v=…",
                            "skeema": "tms", "projektio": "EPSG:4326", "globaaliMax": 6 } },
  "globaali": { "rasteri": { "0": [x0,y0,x1,y1], … "5": … },
                "maasto":  { "0": [[x0,y0,x1,y1], …], … "6": … },   // layer.json available -välit
                "media": [], "tavuja": { "rasteri", "maasto", "media": 0, "yht" } },   // noin 16,6 Mt (23b)
  "valinnaiset": { "aanet":   { "media": [url, …], "tavuja" },     // maahan sitomaton media,
                   "kuvat":   { "media": [url, …], "tavuja" },     // ladataan erikseen
                   "linssit": { "media": [url, …], "tavuja" } },
  "maat": { "FIN": { "iso2": "FI", "nimi": "Suomi",
                     "rasteri": { "6": [x0,y0,x1,y1], "7": …, "8": … },
                     "maasto":  { "7": [x0,y0,x1,y1], … },            // vain available-alueella
                     "laattoja": { "rasteri": 158, "maasto": 0 },       // muotoa leikkaavat
                     "media": [url, …],
                     "tavuja": { "rasteri", "maasto", "media", "yht" } }, … } }
```

- Laattaväli on maan bbox tällä tasolla. `laattoja` ja `tavuja` lasketaan vain laatoista,
  jotka leikkaavat maan muotoa (countryShapes). Lataaja voi joko ladata koko välin tai ohittaa
  laatat, jotka eivät leikkaa muotoa (pisteen testaus maan muotoa vasten).
- `media` = valmiit https-osoitteet (ei avaimia). Viite voi kuulua usealle maalle, joten
  poisto tehdään viitelaskennalla. Ulkoiset lähde- ja viitekuvat eivät kuulu mukaan.
- Tavut ovat arvioita: keskikoko otoksesta × määrä (`tools/vienti/offline-koot.json`,
  päivitys `node tools/vienti/offline.mjs --paivita-koot`). Nykyarvio (maasto 2026-09-23b, koko maailma z0–z6): globaali noin 16,6 Mt
  (rasteri 13,8 + maasto 2,8), valinnaiset äänet noin 190 Mt, kuvat noin
  350 Mt ja linssit noin 8 Mt, maan mediaani noin 30 Mt, suurin Ranska noin 460 Mt
  (maasto z7–z12).
- Avain on ISO3 (pelin maakoodi), ja `iso2` on mukana `Alueet.Luettelo()`:a varten.

### 10.3 Palvelinrajapinnat (Cloudflare Workers, sopimus natiiville)

#### Pöllö/Livia (chat, puhesynteesi, sähketuomio)

Osoite: `POLLOPALVELIN` = `https://matkakirja-pollo.samireivinen.workers.dev`
(js/packs/pollo-asetukset.js). Yksi POST-reitti, haarautuu kentällä
`tehtava`. Palvelin: tools/pollo/worker.js + tools/pollo/rajat.js.

| Polku | Metodi | Pyyntö | Vastaus |
|---|---|---|---|
| `/` (`vastaus`, oletus) | POST | `{kysymys, konteksti?, historia?[{rooli,teksti}], kehys?, striimi?}` | `{vastaus, jatkot[], syy:null, paikka?}` tai SSE (`pala`/`loppu`/`virhe`) |
| `/` `tehtava:"ehdotukset"` | POST | `{konteksti?}` | `{ehdotukset:string[2]}` |
| `/` `tehtava:"puhe"` | POST | `{teksti, persoona, lohko?, nopeus?, aani?, ohje?}` | `audio/mpeg`-virta |
| `/` `tehtava:"sahke"` | POST | `{id, vastaus}` (AI-sähketuomari, eri asia kuin moninpelin sähkejärjestelmä) | `{tulkittu, kohde, vuosi}` |
| `/` `tehtava:"tila"` | POST | `{}` | kulut/kiintiöt — vain kehittäjäkoodilla |

- Tunnistus: valinnainen otsake `x-pollo-kehittaja` (vakioaikainen
  vertailu `POLLO_KEHITTAJAKOODI`) ohittaa rajat, avaa puheen ääni/ohje-
  säädöt ja `tila`-reitin. Ilman koodia peli toimii tunnistamattomana.
- Rajat: chat/ehdotukset/sähke 30/vrk, 1500/kk per IP-tiiviste (KV);
  puhe merkkeinä 60 000/vrk, 900 000/kk. Ylitys → 429.
- CORS: `POLLO_ORIGINIT`-lista (tyhjä = kiinni kaikilta); origin
  tarkistetaan myös POST:ssa, ei vain esilennossa.
- Malli: Anthropic Messages API, `env.POLLO_MALLI` tai `claude-haiku-4-5-20251001`
  (`ANTHROPIC_API_KEY`). Puhe: OpenAI `/v1/audio/speech`,
  `gpt-4o-mini-tts`, äänet onyx/sage (`OPENAI_API_KEY`).
- Puhevastaukset välimuistoidaan reunalla + R2:ssa; `JATKOT:`/`PAIKKA:`-
  rivit ja SSE-jäsennys hoidetaan palvelimella, ei asiakkaassa.

#### Sähke (moninpeli: retkikunta, sähkeet, kaveriapu)

Osoite: `SAHKE_OSOITE` = `https://matkakirja-sahke.samireivinen.workers.dev`
(js/sahke.js). Palvelin: worker/sahke/worker.js+kasittelija.js, D1-kanta,
ei jaettua salaisuutta — jokainen jäsen saa oman avaimen.

| Polku | Metodi | Pyyntö | Vastaus |
|---|---|---|---|
| `/retkikunta/luo` | POST | `{nimimerkki}` (generaattorista) | `{koodi, jasenId, avain}` |
| `/retkikunta/liity` | POST | `{koodi, nimimerkki}` | `{jasenId, avain, jasenet}` (409 jos ≥8 jäsentä) |
| `/retkikunta/tila` | GET | query `koodi, jasenId, avain` | `{jasenet, sahkeet[], apupyynnot[], apuvastaukset[]}` |
| `/sahke` | POST | `{koodi, jasenId, avain, pohjaId, paikkaId}` (valkolistan pohja) | sähkerivi |
| `/apu/kysy` | POST | `{koodi, jasenId, avain, apuId, kysymys, vaihtoehdot}` | apupyyntö |
| `/apu/vastaa` | POST | `{koodi, jasenId, avain, apuId, veikkaus}` (indeksi) | vastausrivi |

- Tunnistus: ei header-tokenia — `jasenId`+`avain` selväkielisenä
  joka pyynnössä (avain paljastuu vain luonti-/liittymisvastauksessa).
  Väärä pari → 401.
- Rajat: kirjoitukset 30 kpl/60 s per jäsen → 429; retkikunta max 8.
- CORS: `SAHKE_ORIGINIT`-lista + **aina** `localhost`/`127.0.0.1`.
- Malli: ei tekoälyä — CRUD + rajattu sanasto/pohjalista.

#### Ehdotukset + reaktiot (palaute, PRO-tuottajat, tykkäykset)

Osoite: `EHDOTUS_OSOITE` = `https://matkakirja-ehdotukset.samireivinen.workers.dev`
(js/ehdotukset.js, js/reaktiot.js). Palvelin: worker/ehdotukset/
{worker,kasittelija,pro,reaktiot,kuvavinkki}.js, tallennus R2 (yksityinen).

| Polku | Metodi | Pyyntö | Vastaus |
|---|---|---|---|
| `/laheta` | POST | `multipart/form-data`: teksti, sivu?, nimimerkki?, sahkoposti?, kuvat[≤3,≤8Mt], koodi? (+hunajapurkki) | `{ok, kansio}` |
| `/kuvavinkki…` | POST | kuvapalautelomake (tarkistamatta tarkka kenttälista) | — |
| `/pro-tarkista` | POST | `{sahkoposti, koodi}` | `{ok, nimi, tekijaId, tila, profiili}` |
| `/reaktiot?kohteet=` | GET | pilkuin erotettu lista | `{<kohde>:{hieno,ihana,mielenkiintoinen,tylsa,virhe}}` |
| `/reaktio` | POST | `{kohde, symboli?, edellinen?}` | päivitetyt laskurit |
| `/lista`,`/kohde/…`,`/kommentti`,`/reaktio-lista`,`/reaktio-korjattu` | GET/PUT | `?avain=` | vain omistajan työhuoneelle |

- Tunnistus: pelaajareitit vain Origin-tarkistuksella, ei tokenia.
  Omistajareitit vaativat `?avain=EHDOTUS_AVAIN`.
- Rajat: ei erillistä pyyntörajoitinta löydetty (tarkistamatta —
  ehkä Cloudflaren oma suojaus); kuva ≤8 Mt/≤3 kpl, teksti ≤4000.
  Yhden-äänen-per-laite (reaktiot) on selaimen localStoragessa, ei palvelimella.
- CORS: `EHDOTUS_ORIGINIT`-lista; pro-julkiset sivut ilman origin-vaatimusta.
- Malli: ei tekoälyä.

#### Muut ei-media fetch()-kutsut js/*.js:ssä

`js/saa.js` → Open-Meteo (avaimeton, suora). `js/uutiset.js` → oma
worker `UUTISPROXY` (tools/uutisproxy/worker.js, avaimeton, sallittujen
isäntien lista palvelimella, CORS `*`) + MyMemory-käännös (avaimeton).
`js/ui.js` `PALAUTE_LOMAKE` on tyhjä = pois käytöstä. `js/tyohuone-
tilastot.js` (GitHub API) vain omistajan työhuoneessa. Karttalaatta-/
vektori-/reliefimoduulit hakevat vain staattista dataa — rajattu
tehtävänannon ulkopuolelle.

#### Päätös: natiivin tunnistus (Fable 23.9.2026, sitova)

- Web: `Origin`-sallittulista kuten nyt (`*_ORIGINIT`).
- Natiivi: ei `Origin`-otsaketta. Sen sijaan **vaaditaan** otsake `x-matkakirja-natiivi` ja
  sovelluksen bundle id `User-Agent`-otsakkeessa (sama kuin pollo-worker, Matkakirja-repon
  PR #2956), muuten pyyntö hylätään.
- Sama sääntö koskee kaikkia palvelinrajapintoja (pulu ja puhe, sähke, ehdotukset ja
  reaktiot, uutisproxy). Jokaiseen workeriin tarvitaan sama tarkistus kuin pollo-workerissa.

#### Natiivin huomiot

- Kaikki kolme workeria nojaavat selaimen `Origin`-otsakkeeseen;
  natiivilla ei ole web-originia — tarvitaan joko oma origin-arvo
  lisättynä *_ORIGINIT-listoihin tai app-kohtainen tunnistautuminen.
- Sähke-worker päästää aina `localhost`/`127.0.0.1` — ei ratkaise
  tuotanto-natiivin tarvetta.
- Pöllön kehittäjäotsake on vain omistajan testaukseen, ei yleinen
  natiivitoken — chat/puhe tarvitsee oman, rajoitetun tunnistautumisen
  (esim. App Attest tai kiinteä app-avain).
- Sähkeen `jasenId`+`avain`-tunnistus toimii sellaisenaan natiivissa
  (säilö Keychainissa).
- Pöllön SSE-jäsennys (`\n\n`-erotetut tapahtumat) pitää toteuttaa
  natiivissa itse; `JATKOT:`/`PAIKKA:`-poiminta on jo palvelimella.
- Ehdotukset-workerin pelaajareitit eivät vaadi tokenia, vain origin —
  natiivi tarvitsee saman ratkaisun kuin pöllö/sähke, muuten reitit
  ovat auki suoraan ilman appia.
