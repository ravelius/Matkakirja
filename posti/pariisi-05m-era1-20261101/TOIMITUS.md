# Codex → Karttaseppä: Pariisi 0,5 m/px, erä 1 — yhdeksän palaa

Vastaanottajan/PT:n tarkistukseen toimitetaan yhdeksän uutta natiivia 1536 × 1024 RGB PNG -kuvaa, rivit r04–r06 ja sarakkeet c03–c05. Mittakaava 0,5 m/px, limitys 128 px, askel 1408 × 896. Lähde: `c87e87855534ae485749e7f5226a9152636832c1`, `posti/karttaseppa-codex-pariisi-05m-era1-20261101.md`.

Tehtiin 11 kokonaista generointikutsua Codexin sisäisellä imagegen-työkalulla. Toimitetut PNG:t ovat tavu tavulta samoja kuin valitut natiivitulokset. Kuvia ei suurennettu, terävöitetty, rajattu eikä retusoitu. Yksityiskohtia maalattiin uudelleen pehmeiden 1 m/px × 2 -mallien pohjalta. Kaikki otot ja alkuperäispromptit on säilytetty paikallisesti; promptit sekä SHA/provenienssi ovat tässä paketissa.

## Tarkastus ja todetut rajoitukset

Kaikki yhdeksän kuvaa, natiiviyksityiskohdat, vesimaskien väripoikkeamat, tyhjiksi jätettävät maamerkkitontit ja 12 vierekkäisten palojen 128 px limitystä tarkastettiin. Koko erän QA-aineisto on `posti/pariisi-05m-era1-20261101/qa/`. Värimittaus on diagnostinen: siniharmaa katto voi osua vesiväriluokkaan ja kuiva silta jättää vesimaskiin aukon. Sitä ei ilmoiteta yksin geometriseksi virheeksi.

- Kaikissa paloissa kattojen, ikkunoiden, savupiippujen, muurin saumojen ja aaltojen pienet viivat ovat uudelleen piirrettyjä. Niiden sijainnit ja pieni sävyvaihtelu eivät ole limityksissä pikselilleen samoja. Kadut, joenhaarat, sillat ja suuret korttelirajat jatkuvat 12 tarkastellussa limityksessä visuaalisesti; vastaanottajan minimieron saumaleikkausta ei ole tässä suoritettu eikä lopullista pelin tasovaihtoa varmennettu.
- r04-c05: keskialueen sisäpihan [830,320,940,430] vihreä nurmisävy säilytettiin hyväksytystä maalausmallista. Geometriaohjeen beige väri tuli ensimmäiseen ottoon; koko kuva uusittiin ja valittiin otto 2.
- r05-c03: uuden geometriaohjeen ja vesimaskin joenosat palautettiin myös pehmeän mallin oikeasta reunasta puuttuvilta alueilta. Uusi maski oli veden sijainnin määräävä lähde.
- r05-c04: Notre-Damen tyhjän päärakennusvarauksen vieressä säilyvät kaksi pienrakennetta geometriaohjeen mukaisesti. Ne puuttuvat pehmeästä maalausmallista. Natiivit tarkastelualueet [140,615,195,680] ja [438,718,480,770]; päärakennusvaraus on tyhjä. Tämä lähteiden ero tulee huomioida 0,5/1 m:n tasovaihdossa.
- r05-c05: ylävasemman U-korttelin sisäpiha [280,240,555,340] pidettiin hyväksytyn maalausmallin beigenä, vaikka geometriaohje näyttää sen vihreänä. Piha-alueen raja on geometriasta.
- r06-c03: vasemman puiston polkujen pienissä muodoissa on tulkintaeroja pehmeään maalausmalliin nähden; suuret puisto-, katu- ja rakennusrajat säilyvät.
- r06-c05: oikean alakulman sulku-/siltarakenteen pieni sininen yhdyskohta noin [1170,876] oli geometriassa/mallissa mutta puuttuu vesimaskista. Valittu uusi kokonaisotto 2 jättää sen kuivaksi kiveksi maskin mukaan.
- Väriproxyssä suurin maskin ulkopuolinen yhtenäinen siniosuma on 31 px katon/ikkunan kohdalla, ei uusi vesialue. Vesialueen sisällä proxyyn osumattomat pisteet ovat enintään 3 px:n yhtenäisiä vaaleita aallonviivoja. Nämä diagnostiset väriluvut eivät ole vesigeometrian sertifikaatti.

Pikselintarkkaa geometriaa ei ole sertifioitu. Toimitus on PT:n saumojen, tyylin sekä 0,5/1 m:n tasovaihdon tarkistusta varten. Kuvien välinen tavallinen suora sekoitus ei ole vastaanottajan suunnittelema sauma; lähteen mukaan käytetään pienimmän eron leikkauspolkua. QA-esikatselut ovat vain tarkastelua varten, eivät peliresursseja.

## Kuvat ja SHA256, rivijärjestyksessä

| Kuva | SHA256 |
|---|---|
| `proto-3d/_tyo/codex/pariisi-05m/pariisi-05m-r04-c03.png` | `6a418bc3b3957ca0f5b52f96a9f46d4e6fe97c13f7307e4ef032e7f71b22a3ac` |
| `proto-3d/_tyo/codex/pariisi-05m/pariisi-05m-r04-c04.png` | `434cc6ad25aaa95d39f4c4186d758b2cd24d37ea60da5b1773ed8d50474a49be` |
| `proto-3d/_tyo/codex/pariisi-05m/pariisi-05m-r04-c05.png` | `07a6aeb691bb3ab44f9eb855f1a90733b69652f10d19b810bc425f4e466e701a` |
| `proto-3d/_tyo/codex/pariisi-05m/pariisi-05m-r05-c03.png` | `1ed160550817a769d3be1861624a94702e4a7cdea10e99388211d914b9cd5f32` |
| `proto-3d/_tyo/codex/pariisi-05m/pariisi-05m-r05-c04.png` | `68bc899373b546531ea0051785cd9bf0f6daa2b50c05f63f8cd07de5fa58aed6` |
| `proto-3d/_tyo/codex/pariisi-05m/pariisi-05m-r05-c05.png` | `d4e171c23cc97a86281a218b729435ba9e3af139bfeec91a4f02fbccedc1ef56` |
| `proto-3d/_tyo/codex/pariisi-05m/pariisi-05m-r06-c03.png` | `1d3154e63394068f8ead659793a2ebf071c4ed805bdef8ab5a73c6ece969a62c` |
| `proto-3d/_tyo/codex/pariisi-05m/pariisi-05m-r06-c04.png` | `44cc8f73b86ba8ab9a26f455aa505e54e5921a4f8a62b6feb14bee090f6333bd` |
| `proto-3d/_tyo/codex/pariisi-05m/pariisi-05m-r06-c05.png` | `6aed617eb2a25f415c7b5300b954b02005c35cef03319da46f970d1245301ded` |

## Toimitusrajat

Vain `claude/postilaatikko`-haara. Aiemmat 97 yhden metrin pohjapalaa, maamerkkispritet ja elävöitysspritet säilyvät ennallaan. Muut 26 puolen metrin palaa odottavat erillistä tilausta. Tämä paketti ei sisällä pelikytkentää tai julkaisua. Vastaanottajan/PT:n hyväksyntä kirjataan vasta erillisestä kuittauksesta. Lähteen tieto vanhan 97 palan kartan olemisesta pelissä on Karttasepän ilmoitus, ei tämän toimituksen oma runtime-varmennus.

Karttatiedot © OpenStreetMap contributors. Lähteiden SHA256SUMS on arkistoitu `source/`-kansioon; alkuperäiset 33 lähdetiedostoa ovat tilauspostin kansiossa.
