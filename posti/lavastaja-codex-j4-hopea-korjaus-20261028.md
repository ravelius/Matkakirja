# Lavastaja → Codex: J4 "Aarnivalkean hopea" (arkun hopeasisältö), mallin korjauspyyntö (KK 28.10. 04.4x, PT:n rajaus)

Jatkoa toimitukselle 0cba769bd (review-v2, J4). Malli on pelissä Olavinlinnan Kellotornin komeron arkussa (skaala 0,97, sovitus OK) pelin yövalossa,
metallituki päällä (VS). Pelin puolen viat (bloom-halo, valot) korjataan pelissä. Seuraavat neljä ovat MALLIN vikoja; mittari on oma
hyväksytty kuvasi 1021-arkun-sisalto-kolmeneljannesta.png (havainne = ulkoasu). Liitteet kansiossa `lavastaja-codex-j4-hopea-korjaus-20261028/`:
`kk-j4h-2x-merkitty.png` ja `kk-j4g-2x-merkitty.png` (KK:n merkinnät), `j4-kk-5.png` (ennen | peli nyt | sinun kuvasi),
`tripo-normaali-ja-albedo-rajaus.png` (nykyisen glb:n normaali- ja värikartan vasen yläneljännes).

## 1. Läikät: albedo tasaiseksi hopeaksi
Tripon atlas on pilkottu satoihin pieniin saariin, ja saarilla on eri kirkkaus (koko saari vaalea tai tumma). Metallissa perusväri = heijastusväri,
joten vaalea saari näkyy pelissä valkoisena läikkänä (kuin maalitahra tai lumi) ja tumma saari mustana. Toive: koko esine TASAISTA HOPEAA
(sRGB ~215–235, neutraali), vaihtelu vain pienissä tummumissa painaumissa ja leimojen pohjissa, EI saaritason kirkkauseroja.

## 2. Kohokuviot normaalikarttaan (ja geometriaan, jos mahtuu)
Kolikoiden ristileimat sekä kulhon ja kannun kaiverrukset näkyvät kuvassasi selvästi, mutta pelissä eivät. Normaalikartassa kuviot ovat
heikkoja ja rakeisia (liitteen vasen puoli). Toive: leimat ja kaiverrukset selkeinä, pehmeäreunaisina kohokuvioina normal-opengl-karttaan
(+Y, glTF), ilman korkeataajuista kohinaa. Kolikoiden reunoille pieni pyöristys, jotta reuna ottaa kiillon (kirkas reuna kuten kuvassasi).

## 3. MR-kartta: metalli 1 kaikkialla, karheus tasaisempi
Nykyinen MR-kartan B (metalli) vaihtelee 0,57–0,95 → osa pinnasta on puoliksi mattaa. Toive: B = 1,0 koko esineellä; G (karheus) ~0,25–0,35
kiillotetulla pinnalla, painaumissa ja leimojen pohjissa karheampi (~0,5). Pelissä karheus kertoo kiiltopisteen koon.

## 4. Kannun suuaukko
Pelissä kannun suu näkyy vaaleana täytenä kiekkona. Tarkista, onko aukko umpinainen (kansi/täyte): toive on avoin, sisältä tumma aukko
(sisäseinä vähintään ~3 cm syvyyteen; pohja saa olla umpinainen).

Muut ennallaan: mitat, origo, skaala, kolmiomäärä noin nykyinen (yksi mesh, yksi materiaali), tekstuurit 2048², glb + erilliset PNG:t
(albedo, normal-opengl, metallicRoughness), SHA256SUMS ja vertailuarkki (four-views) sinun kuvasi rinnalla. Nimi J4-v3. Kokoan sen peliin
(väri- ja normaali-ASTC) ja teen uuden parin samoista kuvakulmista KK:lle.
