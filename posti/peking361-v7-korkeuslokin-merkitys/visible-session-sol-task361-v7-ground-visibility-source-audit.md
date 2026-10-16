# Sol — task361 V7: maanpinnan näkyvyyden lähdeauditointi

Uutta tuottajan metadataan kohdistuvaa vikaa ei löytynyt tarkastetuista poluista. Lokin `oma maanpinta ei muistissa` tarkoittaa kamerakomennon erillisen DTM/DSM-korkeusvälimuistin epäonnistunutta näytettä. Se ei osoita GLB:n oman paving-pinnan puuttumista tai näkymättömyyttä. Materiaalinimi voi vaikuttaa esikäsittelyn tuottamiin alisolmunimiin, mutta tarkastettu piilotushaku lukee transform-polun nimiä, ei materiaalia tai primitiivin extra-kenttiä.

Tämä on lähdekoodin ja V6/C6-metadatan tarkastus. V7:ää ei hyväksytä eikä hylätä. Oman pavingin näkyvyys on edelleen avoin, ja nolla rendereriä löytäneet piilotuskokeet ovat siihen kelpaamaton näyttö.

## Aineisto ja versiorajaus

Väliraportti: `task361-362-work/incoming/v7-game-interim-20261016/source-review.md`, ilmoitettu lähdecommit `95e6956d101e034639f20465decdb446ca810706`, SHA-256 `8b02bbe92b31873bd19bc5ca905578e3feeaeba2b2445c803528f4980b8390af`. Saapuneen paketin seitsemän tiedoston tavut tarkistettiin vastaanottokuitin tiivisteisiin. Kuvista ei tehty uutta visuaalista arviointia.

Vastaanottajan nykyiset lähdetiedostot luettiin vain luku -tilassa ja sidottiin tavumäärään sekä SHA-256-tiivisteeseen. Kaikki 11 lähdetiivistettä ja kuuden GLB:n tiivisteet ovat rinnakkaisessa JSON-raportissa. Keskeiset lähteet:

| Tiedosto | SHA-256 |
|---|---|
| CesiumOmatMallit.cs | dc5d2901744694c4226c7aa9e16e0c0de238a747bfdf814729dc25f9de3a7bde |
| LinssiOhjain.cs | a1ddc565219302f7a860deba3de9c7d52b257eee2a1eb94b911cf49511aa344e |
| OpasSovitin.cs | f08414acecec3016683fd58b90629a9cba314b7196409f7bb13e9356bf79ece3 |
| omat_mallit_instanssit.mjs | 507cb23d8e3942cf7e04d13525b518c181cdeb6d366322dc3e7a0e717a4f80f1 |

Näitä lähdetavuja ei ole osoitettu build196:n tai ilmoitetun korjauksen `ea938f67f` lähteiksi. Luettu piilotuskoodi käyttää edelleen `FindObjectsByType`-hakua. Korjaus ja uusi koe ovat vastaanottajan ilmoittamia; niiden ajonaikaista toteutumista ei tässä varmennettu. Git-komentoja ei käytetty.

## Korkeuslokin suora riippuvuus

`LinssiOhjain.cs:2266–2275` tulkitsee kamerakomennon `maa`-alkuisen korkeuden kutsumalla `OpasSovitin.OmaMaanpinta(lat, lon)`. NaN-tuloksella se asettaa kameran katsekorkeudeksi 0 metriä ellipsoidiin nähden ja kirjoittaa kyseisen lokin.

`OpasSovitin.cs:2971–2976` hakee kaupungin tunnuksen ja DTM-välimuistin `maaMallit`; kelvollisen näytteen puuttuessa se käyttää `OmaMaa`-kutsun DSM-välimuistia `korkeusMallit` (2959–2963). `OmaKorkeus.cs` voi palauttaa NaN:n esimerkiksi rasterin ulkopuolella tai puuttuvan näytteen vuoksi. Myös puuttuva tunnus tai lataamaton välimuisti voi johtaa NaN:iin. Kaupunkitunnuksen varapolku sisältää avatun piilotetun Pekingin; tästä ei voi päätellä Pekingin olevan tarkoituksella poissuljettu.

Kamerakysely lukee välimuistia eikä itse käynnistä korkeusmallin latausta. Erillinen latauspolku lukee korkeus-JSON/PNG-aineistoa, ei GLB:n geometriaa. Kutsuketjussa ei lueta materiaalinimeä, node-nimeä, `displayRole`-, `sourceExtras`- tai `sourcePrimitiveFaceBlocks`-kenttää. Varoitus voi siis esiintyä myös renderöidyn GLB:n kanssa. Kameran varakorkeudesta ei seuraa, että itse mallin sijainti olisi muuttunut.

## Piilotushaku ja nimien epäsuora vaikutus

`LinssiOhjain.cs:2864–2903` hakee aktiiviset Renderer-komponentit, ohittaa jo käytöstä poistetut ja vertaa hakusanaa kirjainkoosta riippumatta `KerrosPolku`-merkkijonoon. Se sisältää rendererin transformin ja kaikkien vanhempien nimet. Materiaali ja primitiivin extra-kentät eivät ole tämän suodattimen syötteitä.

`CesiumOmatMallit.cs:235–259` luo juuren `Omat mallit` ja pakettikohtaisen `Oma malli ` + tunnus -objektin. Jos Cesiumin ladatut jälkeläiset säilyvät näiden alla, laaja `Omat`-haku ja pakettitunnushaku eivät riipu materiaalikloonin nimestä. Todellista ladattua hierarkiaa ei tarkastettu.

Nimivaikutusta ei silti voi sulkea yleisesti pois: `omat_mallit_instanssit.mjs:79–80` nimeää yhdistämisen luoman GLTF-solmun ja meshin materiaalin nimellä. `omat_mallit_ktx2.py:92–105` joko kopioi jo kelvollisen tiedoston tai kutsuu tätä esikäsittelyä. V6:n ja C6:n tuodut alihierarkiat voivat siten erota, vaikka alkuperäiset solmunimet täsmäävät. Tämä ei osoita syytä nollatulokseen. Myös luettelointi, epäaktiivisuus, aiempi poiskytkentä tai todellinen polku voivat vaikuttaa. Vastaanottajan DontSave-selitys jää ilmoitetuksi hypoteesiksi.

## Todellinen V6/C6-metadata ja muut kutsupolut

Kaikissa kolmessa LOD:ssa alkuperäiset node- ja mesh-nimet täsmäävät. Rakennusmeshin primitiivit vähenevät neljällä: 38→34, 37→33 ja 37→33. Puumeshi säilyy neljän primitiivin kokoisena. Viidestä seam-cover-roolista kolme jää ylimmälle tasolle ja kaksi säilyy yhdistettyjen primitiivien lähde-face-blockeissa. Pavingin kaksi primitiiviä yhdistyvät yhdeksi, jonka materiaalinimeen tulee `_owner361_coherentPBR`.

Tarkastetuissa korkeuden, piilotuksen ja mallin luonnin sovelluspoluissa ei löytynyt näiden roolikenttien lukijaa. `MalliLadattu` (CesiumOmatMallit.cs:307–320) asettaa tasoa, krediittejä ja ehdollista Ion-leikkausta ilman pavingin nimi- tai roolitunnistusta.

`PiiloValo.cs:60–69` käyttää valinnaisen peiton ollessa päällä kaikkia oman juuren MeshRenderereitä ja niiden määrää päivitysehtona. Yhdistäminen voi vaikuttaa määrään; tämä on eri riippuvuus kuin korkeuskysely tai piilotushaku. Peitto on oletuksena pois ja väliraportin loki ilmoittaa sen pois. Tästä ei osoiteta nykyistä peitto-ongelmaa. Varjopolku ei myöskään valitse maanpintaa materiaalin semanttisen nimen perusteella.

## Päätös

Tuottajan metadatasta ei löytynyt näille kahdelle havainnolle konkreettista suoraa vikasyytä. Materiaalinimen mahdollinen epäsuora vaikutus alisolmunimiin on rajattu erikseen. Ion-, korkeus-, leikkaus-, lataus- tai muistijuurisyytä ei päätellä kuvista eikä tästä lähdeauditoinnista.

Avoin näyttö on vastaanottajan kelvollinen näkyvyyskoe, jossa piilotuksen osumat ja ajettujen lähteiden versio on varmennettu. Tuotantoa ei ajettu uudelleen, eikä vastaanottajalle tai vahdille lähetetty viestejä. Vain nämä kaksi raporttitiedostoa kirjoitettiin.
