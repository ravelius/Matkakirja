# Champs-Élysées v2 — #1985 / 15h

Yksi uusi kokonainen ImageGen-otto, yksi kuva. Lähde `posti/karttaseppa-codex-puutarhat-v2-20261104.md`, commit `521084500f8157bb94f5d9d786b46bdac34a86be`, blob `9723eca82faba48e0874fa17a61ac7e64c12deec`. Nykyinen TILAUS.md ja kaikki tämän kansion manifestiliitteet luettu ja SHA256-varmennettu. Vanha otto säilyy erillisenä.

**PNG 1536 × 1024 RGBA; alkuperäiset generoidut tavut säilytetty.** SHA256 `9a68c5c539cadbd26b85299b33c7765993f2d74cdf734fe53cb71ca8ba007a0a`. Maskin SHA256 `4c85ff483673ee3d0d84c1c1d259b47d05daedcc852fd26e97bb0bebc0755653`.

**Oma kokonais-QA: EI TÄYSIN LÄPÄISSYT.** Toimitetaan yhden oton ehdokas poikkeamineen vastaanottajan arvioon.

## Alfa

Maskiero alfa≥128-kynnyksellä **29907 px**: 15223 ulkopuolella ja 14684 puuttuu sisältä. IoU 0.946931. Täsmällisiä erisuuria alfa-arvoja 625306 px; tähän sisältyy myös alpha254 vs maskin255, ei vain ääriviiva.

Alfan min/max [0, 254]. Kahden pikselin sallitun reunavyöhykkeen ulkopuolella alfa>0 51030 px, alfa≥16 6316 px, alfa≥128 4019 px. Kahdella pikselillä sisennetystä maskista puuttuu 4237 px alfa128-kynnyksellä. Täsmällinen maski / enintään 2 px / täysin läpinäkyvä ulkopuoli ei täyty. Mitään koodirajausta ei tehty toimituskuvaan.

## Sävyt ja rakenne

Nurmialueiden otantakeski-RGB **190.62 / 162.26 / 94.29**, tavoite noin 196 / 170 / 106. Tummien kasvillisuuskohtien ja pensasaitojen otantakeski-RGB **108.1 / 90.88 / 49.77**, tavoite noin 135 / 112 / 71. Nämä ovat 3 puuttoman 16×16 px nurmiruudun ja 3 tumman 4×4 px ruudun keskiarvoja, eivät koko nurmen tai kaikkien varjojen segmentointi. Alkuperäiset RGB-arvot ilman taustaa, jokainen ruutu maskin sisällä ja alfa≥128. Sävyt eivät kokonaisuutena osu uuteen palettiin; tummien näytteiden sinistä on tavoitetta vähemmän. Vanhaa nurmen 200/175/105-minimiehtoa ei käytetty.

Pohjoinen Avenue Gabrielin alue on mukana ja maskin sisäaukot ovat pääosin läpinäkyviä. Tiiviit puu- ja pensasryhmät sekä pieni avoimen nurmen osuus toteutuivat. Otannassa neljä latvusta 52/61/56/56 px, eli tavoitetta 30–44 px suurempia. Pääkäytävien kahdessa näytteessä vaaleat sisukset 8,75 ja 12 px; reunamusteen sisältävää 12–15 px kokonaisleveyttä ei kattavasti varmennettu. Useilla puilla näkyy runko; kuvakulma ei ole puiden osalta puhtaasti suoraan ylhäältä.

Latvusmitat ovat käsin valittujen näkyvien reunojen natiivipikselietäisyyksiä, epävarmuus noin ±3 px; limittäisten latvusten rajat ovat likimääräisiä. Käytävien mahdolliset sisusmitat eivät sisällä reunamustetta. Altaan mitta on vesialueen harmaan komponentin rajaus, vaalea reunus ei sisälly. Ei rakennuksia, katuja, ihmisiä tai tekstiä.

Mittaruudut, latvusviivaimet, maskivertailu, alkuperäinen ja täysi kehote: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/pariisi-nahtavyydet-1955-1964-20261103/puutarha-champs-elysees-v2`. Työkalu: sisäänrakennettu image_gen. QA-kuvien ruudut/käännös eivät ole toimituskuvan muokkausta.

Vastaanottajan hyväksyntä, mahdollinen koodisovitus, KK:n käyttöpäätös, runtime-integraatio ja julkaisu ovat erillisiä ja tässä varmentamatta.
