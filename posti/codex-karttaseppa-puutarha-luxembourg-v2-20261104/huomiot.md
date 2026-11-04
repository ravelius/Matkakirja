# Luxembourg v2 — #1986 / 15i

Yksi uusi kokonainen ImageGen-otto, yksi kuva. Lähde `posti/karttaseppa-codex-puutarhat-v2-20261104.md`, commit `521084500f8157bb94f5d9d786b46bdac34a86be`, blob `9723eca82faba48e0874fa17a61ac7e64c12deec`. Nykyinen TILAUS.md ja kaikki tämän kansion manifestiliitteet luettu ja SHA256-varmennettu. Vanha otto säilyy erillisenä.

**PNG 1536 × 1024 RGBA; alkuperäiset generoidut tavut säilytetty.** SHA256 `39099ea400b8f95df57d66ab27263af0f0140d96f9df4101c546d8123e3c0ab5`. Maskin SHA256 `e527632031f3e8fd509affb8cae7c03ac149a6d9f98903f472740764712a264b`.

**Oma kokonais-QA: EI TÄYSIN LÄPÄISSYT.** Toimitetaan yhden oton ehdokas poikkeamineen vastaanottajan arvioon.

## Alfa

Maskiero alfa≥128-kynnyksellä **9322 px**: 6327 ulkopuolella ja 2995 puuttuu sisältä. IoU 0.984481. Täsmällisiä erisuuria alfa-arvoja 618251 px; tähän sisältyy myös alpha254 vs maskin255, ei vain ääriviiva.

Alfan min/max [0, 254]. Kahden pikselin sallitun reunavyöhykkeen ulkopuolella alfa>0 15389 px, alfa≥16 2783 px, alfa≥128 1957 px. Kahdella pikselillä sisennetystä maskista puuttuu 817 px alfa128-kynnyksellä. Täsmällinen maski / enintään 2 px / täysin läpinäkyvä ulkopuoli ei täyty. Mitään koodirajausta ei tehty toimituskuvaan.

## Sävyt ja rakenne

Nurmialueiden otantakeski-RGB **187.44 / 161.25 / 84.99**, tavoite noin 196 / 170 / 106. Tummien kasvillisuuskohtien ja pensasaitojen otantakeski-RGB **140.28 / 122.67 / 62.7**, tavoite noin 135 / 112 / 71. Nämä ovat 6 puuttoman 16×16 px nurmiruudun ja 4 tumman 4×4 px ruudun keskiarvoja, eivät koko nurmen tai kaikkien varjojen segmentointi. Alkuperäiset RGB-arvot ilman taustaa, jokainen ruutu maskin sisällä ja alfa≥128. Sävyt eivät kokonaisuutena osu uuteen palettiin; tummien näytteiden sinistä on tavoitetta vähemmän. Vanhaa nurmen 200/175/105-minimiehtoa ei käytetty.

Altaan eteläpuolen U-kaari on poistunut. Soikea kehä, suorat akselit ja poikkikäytävät sekä läpinäkyvä palatsikolo säilyvät rakenteena. Reunoilla on erikokoisia limittäisiä latvuksia ja keskellä kolme pientä puuta. Viidessä suuren latvuksen mittauksessa 108/100/100/111/86 px; 70/90/110 px kolmen täsmällisen kokoluokan toteutumista ei varmennettu. Altaan vesialueen rajaus noin 85 × 89 px, keskipiste (856,476). Pienten keskipuiden runkoja näkyy.

Latvusmitat ovat käsin valittujen näkyvien reunojen natiivipikselietäisyyksiä, epävarmuus noin ±3 px; limittäisten latvusten rajat ovat likimääräisiä. Käytävien mahdolliset sisusmitat eivät sisällä reunamustetta. Altaan mitta on vesialueen harmaan komponentin rajaus, vaalea reunus ei sisälly. Ei rakennuksia, katuja, ihmisiä tai tekstiä.

Mittaruudut, latvusviivaimet, maskivertailu, alkuperäinen ja täysi kehote: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/pariisi-nahtavyydet-1955-1964-20261103/puutarha-luxembourg-v2`. Työkalu: sisäänrakennettu image_gen. QA-kuvien ruudut/käännös eivät ole toimituskuvan muokkausta.

Vastaanottajan hyväksyntä, mahdollinen koodisovitus, KK:n käyttöpäätös, runtime-integraatio ja julkaisu ovat erillisiä ja tässä varmentamatta.
