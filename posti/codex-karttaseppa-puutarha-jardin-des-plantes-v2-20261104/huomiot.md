# Jardin des Plantes v2 — #1987 / 15j

Yksi uusi kokonainen ImageGen-otto, yksi kuva. Lähde `posti/karttaseppa-codex-puutarhat-v2-20261104.md`, commit `521084500f8157bb94f5d9d786b46bdac34a86be`, blob `9723eca82faba48e0874fa17a61ac7e64c12deec`. Nykyinen TILAUS.md ja kaikki tämän kansion manifestiliitteet luettu ja SHA256-varmennettu. Vanha otto säilyy erillisenä.

**PNG 1536 × 1024 RGBA; alkuperäiset generoidut tavut säilytetty.** SHA256 `da90273f55281288266ec74f4a8b78e0928c7569de6b3f995f36fd55e5ea2570`. Maskin SHA256 `4ca1bfbab1546dd3a198ed03fdea5976193282348439720f915ea15a8795d883`.

**Oma kokonais-QA: EI TÄYSIN LÄPÄISSYT.** Toimitetaan yhden oton ehdokas poikkeamineen vastaanottajan arvioon.

## Alfa

Maskiero alfa≥128-kynnyksellä **2769 px**: 465 ulkopuolella ja 2304 puuttuu sisältä. IoU 0.99379. Täsmällisiä erisuuria alfa-arvoja 455100 px; tähän sisältyy myös alpha254 vs maskin255, ei vain ääriviiva.

Alfan min/max [0, 254]. Kahden pikselin sallitun reunavyöhykkeen ulkopuolella alfa>0 3507 px, alfa≥16 0 px, alfa≥128 0 px. Kahdella pikselillä sisennetystä maskista puuttuu 116 px alfa128-kynnyksellä. Täsmällinen maski / enintään 2 px / täysin läpinäkyvä ulkopuoli ei täyty. Mitään koodirajausta ei tehty toimituskuvaan.

## Sävyt ja rakenne

Nurmialueiden otantakeski-RGB **196.8 / 166.42 / 101.1**, tavoite noin 196 / 170 / 106. Tummien kasvillisuuskohtien ja pensasaitojen otantakeski-RGB **127.88 / 106.78 / 60.28**, tavoite noin 135 / 112 / 71. Nämä ovat 3 puuttoman 16×16 px nurmiruudun ja 2 tumman 4×4 px ruudun keskiarvoja, eivät koko nurmen tai kaikkien varjojen segmentointi. Alkuperäiset RGB-arvot ilman taustaa, jokainen ruutu maskin sisällä ja alfa≥128. Sävyt eivät kokonaisuutena osu uuteen palettiin; tummien näytteiden sinistä on tavoitetta vähemmän. Vanhaa nurmen 200/175/105-minimiehtoa ei käytetty.

Uusi ehjä alue on täytetty: vanhat sisäaukot ovat kasvillisuutta/nurmea. Eteläiset lohkot vaihtelevat pensasaitojen, puurivien ja ryhmien välillä; pohjoisessa on puuryhmiä ja avoimia nurmia. Ei allasta eikä spiraalia. Otannassa pohjoisen latvukset 33/43/52/34 px ja etelän pienet rivipuut 19/19 px. Pohjoisen ryhmissä näkyy lyhyitä runkoja; täysin ylhäältä nähtyä latvusrakennetta ei merkitä läpäisseeksi.

Latvusmitat ovat käsin valittujen näkyvien reunojen natiivipikselietäisyyksiä, epävarmuus noin ±3 px; limittäisten latvusten rajat ovat likimääräisiä. Käytävien mahdolliset sisusmitat eivät sisällä reunamustetta. Altaan mitta on vesialueen harmaan komponentin rajaus, vaalea reunus ei sisälly. Ei rakennuksia, katuja, ihmisiä tai tekstiä.

Mittaruudut, latvusviivaimet, maskivertailu, alkuperäinen ja täysi kehote: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/pariisi-nahtavyydet-1955-1964-20261103/puutarha-jardin-des-plantes-v2`. Työkalu: sisäänrakennettu image_gen. QA-kuvien ruudut/käännös eivät ole toimituskuvan muokkausta.

Vastaanottajan hyväksyntä, mahdollinen koodisovitus, KK:n käyttöpäätös, runtime-integraatio ja julkaisu ovat erillisiä ja tässä varmentamatta.
