# Champ-de-Mars v2 — #1984 / 15g

Yksi uusi kokonainen ImageGen-otto, yksi kuva. Lähde `posti/karttaseppa-codex-puutarhat-v2-20261104.md`, commit `521084500f8157bb94f5d9d786b46bdac34a86be`, blob `9723eca82faba48e0874fa17a61ac7e64c12deec`. Nykyinen TILAUS.md ja kaikki tämän kansion manifestiliitteet luettu ja SHA256-varmennettu. Vanha otto säilyy erillisenä.

**PNG 1536 × 1024 RGBA; alkuperäiset generoidut tavut säilytetty.** SHA256 `072198c43ed8de1981a26a2feb6ea17af7664cb4cefc1ff65b7b68c7f7182833`. Maskin SHA256 `222d683407096b84a672fd8e9530fc8d0d6834fc8926d4309bf04110a215ac01`.

**Oma kokonais-QA: EI TÄYSIN LÄPÄISSYT.** Toimitetaan yhden oton ehdokas poikkeamineen vastaanottajan arvioon.

## Alfa

Maskiero alfa≥128-kynnyksellä **11609 px**: 9962 ulkopuolella ja 1647 puuttuu sisältä. IoU 0.959022. Täsmällisiä erisuuria alfa-arvoja 297417 px; tähän sisältyy myös alpha254 vs maskin255, ei vain ääriviiva.

Alfan min/max [0, 254]. Kahden pikselin sallitun reunavyöhykkeen ulkopuolella alfa>0 17948 px, alfa≥16 6808 px, alfa≥128 5487 px. Kahdella pikselillä sisennetystä maskista puuttuu 309 px alfa128-kynnyksellä. Täsmällinen maski / enintään 2 px / täysin läpinäkyvä ulkopuoli ei täyty. Mitään koodirajausta ei tehty toimituskuvaan.

## Sävyt ja rakenne

Nurmialueiden otantakeski-RGB **176.08 / 150.96 / 88.68**, tavoite noin 196 / 170 / 106. Tummien kasvillisuuskohtien ja pensasaitojen otantakeski-RGB **112.03 / 93.66 / 51.31**, tavoite noin 135 / 112 / 71. Nämä ovat 4 puuttoman 16×16 px nurmiruudun ja 2 tumman 4×4 px ruudun keskiarvoja, eivät koko nurmen tai kaikkien varjojen segmentointi. Alkuperäiset RGB-arvot ilman taustaa, jokainen ruutu maskin sisällä ja alfa≥128. Sävyt eivät kokonaisuutena osu uuteen palettiin; tummien näytteiden sinistä on tavoitetta vähemmän. Vanhaa nurmen 200/175/105-minimiehtoa ei käytetty.

Tiiviit puureunat, pienet sisäryhmät ja pensasaitalohkot toteutuivat. Reunapuiden neljän otantaleveyden tulokset 27/27/28/29 px, tavoite 26–36 px. Keskiaukio on noin (779,518), ohje noin (775,520). Pääakselin vaalea sisus on yhdessä näytteessä 8,5 px; reunamuste mukaan lukien enintään 12 px ei ole kattavasti varmennettu. Osa sisäpuista näyttää rungon, joten latvuksia ei voi merkitä kauttaaltaan suoraan ylhäältä nähdyiksi.

Latvusmitat ovat käsin valittujen näkyvien reunojen natiivipikselietäisyyksiä, epävarmuus noin ±3 px; limittäisten latvusten rajat ovat likimääräisiä. Käytävien mahdolliset sisusmitat eivät sisällä reunamustetta. Altaan mitta on vesialueen harmaan komponentin rajaus, vaalea reunus ei sisälly. Ei rakennuksia, katuja, ihmisiä tai tekstiä.

Mittaruudut, latvusviivaimet, maskivertailu, alkuperäinen ja täysi kehote: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/pariisi-nahtavyydet-1955-1964-20261103/puutarha-champ-de-mars-v2`. Työkalu: sisäänrakennettu image_gen. QA-kuvien ruudut/käännös eivät ole toimituskuvan muokkausta.

Vastaanottajan hyväksyntä, mahdollinen koodisovitus, KK:n käyttöpäätös, runtime-integraatio ja julkaisu ovat erillisiä ja tässä varmentamatta.
