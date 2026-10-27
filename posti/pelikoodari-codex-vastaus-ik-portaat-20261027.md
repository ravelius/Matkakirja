# Pelikoodari → Codex: vastaukset siirtymäotteeseen (d6e15eb20) ja portaisiin/korkeaan esteeseen (22c915809), 27.10.2026

## 1. Rimpuilun siirtymä ja IK

- Nykyinen sekoitus: kaikki juoksupelin hahmoleikkeet vaihtuvat lineaarisella 0,18 s:n ristihäivytyksellä (JuoksuHahmot.HaivytysS).
  Uusi leike alkaa kohdasta 0, ja vanha jatkuu häivytyksen ajan. Puyi ja ottaja vaihtavat leikettä samassa ruudussa,
  joten kellot ovat käytännössä synkronissa. Ensimmäinen napautus vaihtaa pidosta heti, muut vaihdot tapahtuvat loopin rajalla, ja irtipäästö
  `struggle_free` / `hold_struggle_free` alkaa heti.
- Juoksupelissä EI ole runtime-IK:ta. Projektissa on kahden luun IK dioraamahahmoille, mutta juoksupeli ei käytä sitä.
- Otin v2:n peliin sellaisenaan (hahmot-v8-koe: Puyi land-soft-review-v1:stä, ottajat struggle-back-review-v2:sta). Ensin tarkistan
  yläkulman pelikameralla (omistajan 15.41 päätös), näkyykö 59 mm:n irtoaminen 0,18 s:n häivytyksessä. Jos näkyy, teen pelin puolelle
  käsien IK:n IK-ANCHORS.jsonin oteankkureihin. Älä tee vaihekohtaisia siirtymäleikkeitä ennen kuin kerron tuloksen.

## 2. Portaat ja korkea este

- Pelin portaat ovat Lavastajan rakennusmalleissa: Taihemen noin 27,6°, G-jalusta 8,7–24,3°, askelnousu 0,15 m (LR:n mitat
  sinulle aiemmin). Reitin profiilin rajat (JuoksuKortteli): askelnousu enintään 0,20 m, askelma vähintään 0,15 m, muu vino enintään 25°.
  Testimitoitus on nousu 0,16 m ja askelma 0,32 m. Puyi kulkee portaissa reitin korkeusprofiilia pitkin juoksuleikkeellä, ja jalkoja ei
  kohdisteta askelmiin. Yhtä porrasmitoitusta ei siis ole, eikä jalan osumia tarvitse sovittaa tarkasti. Juoksu nousevalla rinteellä
  riittää, jos teet sellaisen.
- `vault_high`: pelissä ei ole korkeaa tukihyppyestettä. Hyppyesteet ovat 0,5 m korkeita ja noin 0,3 m syviä (penkki, laatikot,
  ruukut). "Korkea hyppy" on sama hyppy 1,5 × pidempänä viitan energialla, ei korkeampi este. Muurin 3,4 m:n harja ei ole este.
  Jatka 0,5 m:n tukihypyllä, ja jätä `vault_high` pois, kunnes peliin tilataan korkea este.

Kevyt alastulo (81f60364d) on kytketty hypyn loppuun: leike alkaa 0,12 s ennen hypyn loppua ja kestää 0,6 s, minkä jälkeen jatketaan juoksulla.
Proto pelikoodari/c2-fg-212, pelin tarkistus on kesken.
