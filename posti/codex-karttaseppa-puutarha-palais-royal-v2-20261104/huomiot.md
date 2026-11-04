# Palais-Royal v2 — #1988 / 15k

Yksi uusi kokonainen ImageGen-otto, yksi kuva. Lähde `posti/karttaseppa-codex-puutarhat-v2-20261104.md`, commit `521084500f8157bb94f5d9d786b46bdac34a86be`, blob `9723eca82faba48e0874fa17a61ac7e64c12deec`. Nykyinen TILAUS.md ja kaikki tämän kansion manifestiliitteet luettu ja SHA256-varmennettu. Vanha otto säilyy erillisenä.

**PNG 1536 × 1024 RGBA; alkuperäiset generoidut tavut säilytetty.** SHA256 `13288927963c860a6ca5ba2ea6503352bbd2993a703f7858000f1d7e0a69056c`. Maskin SHA256 `76c29a43219c338ede7921bb86c17079196403dfb3d54d2dac2f5f8e3fa9108e`.

**Oma kokonais-QA: EI TÄYSIN LÄPÄISSYT.** Toimitetaan yhden oton ehdokas poikkeamineen vastaanottajan arvioon.

## Alfa

Maskiero alfa≥128-kynnyksellä **5260 px**: 5028 ulkopuolella ja 232 puuttuu sisältä. IoU 0.977674. Täsmällisiä erisuuria alfa-arvoja 243228 px; tähän sisältyy myös alpha254 vs maskin255, ei vain ääriviiva.

Alfan min/max [0, 254]. Kahden pikselin sallitun reunavyöhykkeen ulkopuolella alfa>0 7497 px, alfa≥16 2253 px, alfa≥128 1448 px. Kahdella pikselillä sisennetystä maskista puuttuu 0 px alfa128-kynnyksellä. Täsmällinen maski / enintään 2 px / täysin läpinäkyvä ulkopuoli ei täyty. Mitään koodirajausta ei tehty toimituskuvaan.

## Sävyt ja rakenne

Nurmialueiden otantakeski-RGB **200.0 / 166.29 / 83.45**, tavoite noin 196 / 170 / 106. Tummien kasvillisuuskohtien ja pensasaitojen otantakeski-RGB **138.25 / 113.3 / 53.8**, tavoite noin 135 / 112 / 71. Nämä ovat 6 puuttoman 16×16 px nurmiruudun ja 5 tumman 4×4 px ruudun keskiarvoja, eivät koko nurmen tai kaikkien varjojen segmentointi. Alkuperäiset RGB-arvot ilman taustaa, jokainen ruutu maskin sisällä ja alfa≥128. Sävyt eivät kokonaisuutena osu uuteen palettiin; tummien näytteiden sinistä on tavoitetta vähemmän. Vanhaa nurmen 200/175/105-minimiehtoa ei käytetty.

Neljä suoraa tiivistä puuriviä, kaksi kummallakin pitkällä sivulla, ja avoin keskusta toteutuivat. Kuusi rivin poikkisuuntaista latvusmittausta 35/35/35/36/36/36 px: pyydetty 24–28 px pienennys ei toteutunut. Mittarikuva tarkistettu 19 astetta käännetystä QA-näkymästä, natiivia ei muutettu. Vesialue noin 85 × 84 px tavoitteen noin 70 px sijaan; keskipiste (759,519.5), tavoite (761,518).

Latvusmitat ovat käsin valittujen näkyvien reunojen natiivipikselietäisyyksiä, epävarmuus noin ±3 px; limittäisten latvusten rajat ovat likimääräisiä. Käytävien mahdolliset sisusmitat eivät sisällä reunamustetta. Altaan mitta on vesialueen harmaan komponentin rajaus, vaalea reunus ei sisälly. Ei rakennuksia, katuja, ihmisiä tai tekstiä.

Mittaruudut, latvusviivaimet, maskivertailu, alkuperäinen ja täysi kehote: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/pariisi-nahtavyydet-1955-1964-20261103/puutarha-palais-royal-v2`. Työkalu: sisäänrakennettu image_gen. QA-kuvien ruudut/käännös eivät ole toimituskuvan muokkausta.

Vastaanottajan hyväksyntä, mahdollinen koodisovitus, KK:n käyttöpäätös, runtime-integraatio ja julkaisu ovat erillisiä ja tässä varmentamatta.
