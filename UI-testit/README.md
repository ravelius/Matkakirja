# Natiivi-UI:n testit ja komennot

UI Toolkit -näkymät: `Assets/Matkakirja/UI/` (Assembly-CSharp, ei asmdefiä, koska
Pelikoodarin näkymärajapinnat `Scripts/Peli/NakymaSopimukset.cs` ovat Assembly-CSharpissa).

- `../Peli-testit/unity-tarkistus.sh` (Pelikoodarin) kääntää myös UI-kansion oikeita
  Unity-DLL:iä vasten (iOS ja editori) ilman editoria. Tavoite 0 virhettä.
- Laitteella/simulaattorissa: kirjoita `Documents/ui-komento.txt`, rivit (ks. UiKomennot.cs):
  `ui valikko`, `ui asetukset`, `ui matka`, `ui heitto`, `ui viesti teksti`, `ui sulje`,
  `ui osuma x y`, `kuva nimi` (→ `Documents/ui-nimi.png`), `odota s`. Loki `Documents/ui-loki.txt`.
- `ui kysymys [laji]` näyttää kysymysnäkymän (`KysymysNakyma.cs`) käsin rakennetulla
  esimerkillä ilman peliä (`KysymysEsimerkki.cs`). Lajit: `visa` (oletus; vihje, 50:50,
  45 s tiimalasi), `vaite` (isoisän väittämä ja paikka), `kuva` (valokuva Commonsista),
  `lippu`, `pulma [id]` (luonnos Painter2D:llä; id: `pylvaat` (oletus, valokuvavaihtoehdot),
  `roomalaiset`, `kuunvaiheet`, muut webin oletusdatalla: `hieroglyfit`, `punnukset`,
  `naksutus`, `vesileilit`, `suolaaltaat`, `geysir`, `laiturit`, `kukko`),
  `tapahtumakortti`, `tulos [laattatyyppi]`
  (paljastus: löydön kuva — ensin löydön oma kuva `LoytoKuvaUrl`, varana laattatyypin
  kuva tai webin piirros: `isoAarre` (oletus, Ivalojoen kultahippu: maakohtainen nimi,
  fakta ja kuva ämpäristä), `pieniAarre` (tervatynnyrin hopeariksi), `star` (aarrekuva
  ämpäristä), `mannerAarre`, `pollo` ja `piirros` (ilman kuvaa: kätköarkku-
  piirros) — 50:50 käytetty, fakta, lähteet, Jatka), `kohtaaminen` (Márta, Budapest:
  pieni kohtaamiskuva, "yritys 1/2", vastauksen jälkeen repliikki, oikeasta vastauksesta
  löytö ja kätkökuva `KatkoKuvaUrl`, väärästä uuden yrityksen ohje) ja `kohtaaminen-tervehdys` (tervehdyssivu:
  iso kuva ja kuvateksti, tervehdys kirjoituskoneella, viimeisen yrityksen varoitus ja
  "Yritä viimeistä kertaa"; aika alkaa vasta napista). Esimerkki toimii kuin ohjain:
  vastaus näyttää tuomion ja 0,9 s myöhemmin paljastuksen (TulosVaihe 1 → 2), vihje,
  50:50, Aloita ja Jatka päivittävät näkymän, aika kuluu, ja aika loppuu -tulos tulee
  itsestään. Napautus kortissa näyttää kirjoitettavan tekstin kokonaan. `ui sulje` sulkee.

Kuvasarja erän 1 tarkistukseen (simulaattori, peli käynnissä):

```
odota 3
kuva palkki
ui valikko
odota 1
kuva valikko
ui sulje
ui asetukset
odota 1
kuva asetukset
ui sulje
ui matka
odota 1
kuva matka
ui sulje
ui heitto
ui viesti Heitit 4 — valitse kohde kartalta
odota 1
kuva heitto
ui sulje
ui kortti firenze
odota 4
kuva kortti
ui sulje
ui kartuscha ITA
odota 3
kuva kartuscha
ui kartuscha ITA auki
odota 2
kuva kartuscha-auki
ui sulje
ui selite
odota 3
kuva selite
```

Karttaselitteen Maakunnat-välilehti (`Maakunnat.cs`; data sisältöpaketin moduuleista
karttatyokalu-maakunnat, maakunnat-luonnehdinnat, maakunnat-pulu):
`ui maakunnat [kortti] [ISO:tunnus]` avaa selitteen Maakunnat-välilehdelle, valitsee alueen
(avaa sen maan) ja `kortti` avaa ⊕-kortin (kuvat, pitkä teksti, Pulun kysymykset).
`ui selite` palauttaa Nostot-välilehden.

```
ui maakunnat ITA:Toscana
odota 3
kuva maakunnat
ui maakunnat kortti FRA:Grand Est
odota 4
kuva maakunta-kortti
ui sulje
```

Aloitusnäkymä ja matkan huipennus (`Aloitusnakyma.cs`): peli jää tilaan Aloitus
(PeliOhjain.AloitusNakyma = true). Portti (Aloita seikkailu, tai Jatka matkaa / Uusi matka),
julisteotsikko ja naputettava avausteksti (kertoja lukee intro-puhe.mp3:n; napautus
kirjoittaa loppuun), VALITSE ALOITUSKAUPUNKI → lähtökaupungit → PeliOhjain.UusiMatka(id).
Automaatio ohittaa aloituksen: `ui aloita pariisi` (Pariisi = oletuslähtö; lähtökaupunkilistan
kaupunki kuten `ui aloita ateena` aloittaa siitä) tai `ui jatka` (tallennettu matka).
`ui aloitus [portti|avaus|valinta|jatka]` ilman peliä, `ui huipennus` kaikkien aarteiden
huipennus esimerkkiluvuin.

```
ui aloitus portti
odota 1
kuva aloitus-portti
ui aloitus avaus
odota 6
kuva aloitus-avaus
ui aloitus valinta
odota 2
kuva aloitus-valinta
ui sulje
ui huipennus
odota 1
kuva huipennus
ui sulje
```

Nostokortit (`Nostokortti.cs`, `NostoSisalto.cs`): karttavalon napautus (UiPalvelut.ValoNapautettu)
avaa kortin. Kuvallinen kortti aukeaa ensin kuvana (LISÄÄ), sitten koko korttina; kuvan
napautus avaa suurennoksen. `ui nosto <valoId>`: `skandaali:shakkiturkkilainen`,
`hetki:kolumbus-portugali-1484`, `elaintaky:FIN`, `kohde:thessaloniki@GRC`.

```
ui aloita pariisi
ui nosto skandaali:shakkiturkkilainen
odota 3
kuva nosto-skandaali-kuva
ui nosto hetki:kolumbus-portugali-1484
odota 3
kuva nosto-hetki
ui nosto elaintaky:FIN
odota 3
kuva nosto-elain
ui nosto kohde:thessaloniki@GRC
odota 3
kuva nosto-kohde
ui sulje
```

Matkalaukku (`Matkalaukku.cs`, webin #passport-dialog): yläpalkin tilapilleri avaa laukun pillerin
alle. `ui laukku` näyttää pelin datan (PeliOhjain.Laukku()), `ui laukku esimerkki` keksityn
sisällön ilman peliä. "Matkan tilastot ›" avaa lohkon (tila muistetaan).

```
ui laukku esimerkki
odota 2
kuva laukku
ui sulje
```

Offline-latauksen tila (`OfflineTilaUi.cs`): pilleri yläpalkin alla vasemmalla näkyy, kun
lataus on käynnissä tai verkkoa ei ole; napautus avaa ratas-paneelin. `ui offline demo`
vaihtaa tilalle keksityn palvelun (Ranska latautuu ~6 s ja valmistuu, Italia epäonnistuu
puolivälissä, Saksa on jo laitteella), `ui offline verkoton|verkko` pakottaa verkon tilan,
`ui offline pois` palauttaa oikean palvelun ja laitteen verkon tilan.

```
ui offline demo
odota 2
kuva offline-lataus
ui asetukset
odota 1
kuva offline-asetukset
ui sulje
odota 8
ui offline verkoton
odota 1
kuva offline-verkoton
ui offline pois
```

Kuvasarja kysymysnäkymän tarkistukseen (erä 3):

```
ui kysymys visa
odota 2
kuva kysymys-visa
ui kysymys vaite
odota 2
kuva kysymys-vaite
ui kysymys kuva
odota 4
kuva kysymys-kuva
ui kysymys lippu
odota 4
kuva kysymys-lippu
ui kysymys pulma pylvaat
odota 5
kuva kysymys-pulma
ui kysymys pulma kukko
odota 1
kuva kysymys-kukko
ui kysymys pulma kuunvaiheet
odota 1
kuva kysymys-kuunvaiheet
ui kysymys tapahtumakortti
odota 1
kuva kysymys-tapahtuma
ui kysymys tulos
odota 1
kuva kysymys-tulos
ui kysymys tulos star
odota 3
kuva kysymys-tulos-star
ui kysymys tulos piirros
odota 1
kuva kysymys-tulos-piirros
ui kysymys kohtaaminen-tervehdys
odota 1
kuva kysymys-tervehdys-kirjoitus
odota 5
kuva kysymys-tervehdys
ui kysymys kohtaaminen
odota 3
kuva kysymys-kohtaaminen
ui sulje
```

Pulu ja luennat (erä 5):

```
ui pulu sano Minä olen Livia. Kirjekyyhky, en mikään pulu.
odota 2
kuva pulu-kupla
ui pulu aani avaus 1
odota 3
kuva pulu-puhuu
ui pulu ele flyAway
odota 1
kuva pulu-lento
ui luento ateena
odota 4
kuva luento-kortti
ui luento ateena loppu
odota 5
kuva luento-pulu
```
## Livia (pulu) ilman peliä

`Assets/Matkakirja/UI/Livia/` on webin kokopulun (js/livia-svg.js, js/livia-svg-paa.js,
js/livia-uudet-versiot.js, asentologiikka js/livia-pikselit.js) siirto: `LiviaKuva`
(VisualElement, Painter2D), `LiviaTila` (yhden ruudun asento) ja `LiviaEleet`
(pelin 70 elettä, kestot, ryhmät ja nimet). Eleiden ajoitus ja valinta eivät kuulu tähän.

- `ui livia [ele] [p] [astro] [leiju] [puhe] [mini]` — Livia 152 × 304 pt keskellä
  kerrosta 40 (oletus `blink 0.5`), alla ele, p ja nimi. `astro` = kypärä ja leijunta,
  `leiju` = karttaleijunta, `puhe` = nokka puhuu kellon mukaan, `mini` = minipulu-rajaus.
- `ui livia kierros [astro|leiju|puhe]` — kaikki eleet peräkkäin oikeassa kestossaan
  (0,4 s tauko välissä, yhteensä noin 4,5 min), videotarkistukseen.
- `ui livia pois` — poistaa kuvan.

Kuvasarja (esim. webin kuviin vertaamiseen):

```
ui livia blink 0.5
odota 1
kuva livia-blink
ui livia welcome 0.4
odota 1
kuva livia-welcome
ui livia bunFeast 0.8
odota 1
kuva livia-pulla
ui livia shock 0.5 astro
odota 3
kuva livia-astro
ui livia pois
```

Piirron tarkistus ilman Unityä (tehty siirrossa 23.9.2026): primitiivilista tulostettiin
SVG:ksi ja verrattiin Chromiumissa webin `livianUusiPelikuva`-kuvaan 832 tilassa
(kaikki eleet p = 0 … 1, puhe, leijunta, astronautti, `right` 60). Erot: tekstit
(”z Z”, ”…”, ”?”) ovat viivakorvikkeita ja ryhmän peittävyys kerrotaan osille
(leijunnan siipien ristihäive), muuten kuvat vastaavat toisiaan.

## Linssit (valitsin, peite, selite, astronautti, vertailu, aikajanat)

`Assets/Matkakirja/UI/Linssit/` (tyylit `Resources/MatkakirjaUI/Linssit.uss`) kytkee
Linssisepän koukut natiiviin UI:hin: `LinssiOhjain.PeiteKasittelija`,
`MusiikkiKasittelija` (tyhjä, ellei äänillä ole omaa), `VahennettyLiikeKysely` ("Pieni
liike" pois = vähennetty liike), `Rekisteri` (valitsin, `Vaihtui`), `AstronauttiKerros`
(avaus, kuvanäkymä, sumu), `VertailuLinssi`/`MaatiedotLinssi` (alapalkki, vertailuarkki,
maakyltti → `PeliOhjain.LueMaalehti`), `KeksinnotKerros` (esittely, kello, paneeli,
välinäytös, tauko, loppu) ja `IhmisenMatkaKerros` (musta, valot, kertomus, kello, kuva,
pulu, tunne, loppu). Linssin ollessa auki kartuscha ja karttaselitteen nappi väistyvät
ja oikeaan yläkulmaan tulee "✕ Sulje linssi". Kerrokset: 5 sumu, 24 ihmisen matkan
musta, 25 linssien kalusteet, 37 peite/avaus/kuvanäkymä/vertailuarkki, 38 sulkunappi.

Oikeat linssit avataan Linssisepän komennoilla (`Documents/linssi-komento.txt`:
`linssi topografia`, `linssi satelliitti`, `linssi pois`, `maa ITA`, `vertaa`, `lehti`).
UI-osat ilman linssiä esimerkkiaineistolla (`LinssiKomennot.cs`):

- `ui linssi valitsin` — valitsin auki (ilman LinssiOhjainta esimerkkilinssit).
- `ui linssi peite [pois]` — odotuspeite rgba(20,16,10,.96) päälle / pois (häivytys 320 ms).
- `ui linssi selite [pois]` — selitekortti esimerkkiriveillä (topografian värit ja lähde).
- `ui linssi astro [musta|otsikko|paljastus|pois]` — astronautin avaus; ilman vaihetta
  koko sarja oikeassa ajassa (musta 2 s, otsikko häipyy 0,7 s, musta 1,1 s).
- `ui linssi kuva [tunnus] [pulu]` — kuvanäkymä sisältöpaketin kohteella (oletus ensimmäinen; `pulu` avaa minipulun kysymyskortin);
  jos aineisto ei lataudu, kaksi Commonsin NASA-kuvaa (pikkukuvanauha, zoomi, lisätiedot).
- `ui linssi sumu p` — avaruussumun peitto 0…1 (0 = pois); kalvot ajelehtivat.
- `ui linssi vertailu [arkki|taynna]` — alapalkki (Suomi, Italia, Japani) / vertailuarkki /
  "Vertailuun mahtuu 4 maata" -ilmoitus.
- `ui linssi maa [ISO3]` — maakyltti (oletus ITA); napautus avaa maalehden, jos peli käy.
- `ui linssi keksinnot [esittely|pysakki i|valinaytos [i]|loppu]` — keksintökaaren osat
  paketin `keksinnot.json`:n teksteillä.
- `ui linssi matka [aloitus|musta|valot|jakso i|kuva i|loppu]` — ihmisen matkan osat paketin
  kertomuksella ja löytöpaikoilla (`aloitus` = aloituskortti Ken Burns -taustalla; ilman auki
  olevaa linssiä Käynnistä vain sulkee kortin).
- `ui linssi sulje` — auki oleva linssi kiinni; `ui linssi pois` — testinäkymät pois.

Kuvasarja linssien tarkistukseen:

```
ui linssi valitsin
odota 1
kuva linssi-valitsin
ui linssi pois
ui linssi selite
ui linssi maa ITA
odota 2
kuva linssi-selite
ui linssi pois
ui linssi astro musta
odota 1
kuva linssi-astro-musta
ui linssi astro pois
ui linssi sumu 0.62
odota 2
kuva linssi-sumu
ui linssi sumu 0
ui linssi kuva
odota 5
kuva linssi-kuva
ui linssi kuva etna pulu
odota 4
kuva linssi-minipulu
ui linssi pois
ui linssi vertailu
odota 2
kuva linssi-vertailu
ui linssi vertailu arkki
odota 2
kuva linssi-vertailuarkki
ui linssi pois
ui linssi keksinnot pysakki 3
odota 3
kuva linssi-keksinnot
ui linssi keksinnot valinaytos
odota 1
kuva linssi-valinaytos
ui linssi pois
ui linssi matka aloitus
odota 6
kuva linssi-matka-aloitus
ui linssi pois
ui linssi matka jakso 0
odota 3
kuva linssi-matka-pimea
ui linssi matka kuva 2
odota 3
kuva linssi-matka-kuva
ui linssi pois
Pulun keskustelu (vaatii, että pollo-worker sallii natiivin chatin; muuten näkyy selittävä rivi):

```
ui chat
odota 3
kuva chat-auki
ui chat Missä Sparta on?
odota 8
kuva chat-vastaus
```
