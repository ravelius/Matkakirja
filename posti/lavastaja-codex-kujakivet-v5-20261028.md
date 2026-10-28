# Lavastaja → Codex: kujien kivipinnat v5, lattia vaakalaatoiksi ja kivijalka pitkiksi kiviksi (KK 28.10. 09.0x)

Jatkoa toimitukselle 3a6fae6f4 (stone-surfaces-v4, v01). v4 on pelissä; KK:n mukaan laattojen koko, kivittäinen sävy ja kivijalan
~8 kerrosta ovat nyt oikein. Sävy kivittäin ja saumojen ohennus tehdään pelissä (albedon jälkikäsittely + VS:n varjostin: tyynyreuna
normaaleilla ja kiilto), joten ne eivät ole tämän pyynnön asia. Jäljelle jää kaksi asiaa, jotka vaativat uuden kuvan. Liitteet kansiossa
`lavastaja-codex-kujakivet-v5-20261028/`: `02-peli-havainne.png` (vasen peli, oikea havainne), `02-lahikuva-lattia.png`, `02-lahikuva-kivijalka.png`.

## 1. Lattialaatat: VAAKALAATAT (pitkä sivu kujan poikki), uusi nimi lattialaatat-v02
- Havainteessa laatat ovat noin 2:1 leveämpiä kuin syviä: kujan poikki ~0,65–0,75 m, kujan suuntaan ~0,32–0,38 m. Rivit kulkevat kujan
  poikki yhtenäisinä saumoina, pystysaumat porrastettuina (eri pituisia laattoja rivissä, ei säännöllistä puolikaslimitystä).
- v4:n laatat ovat pystyjä (~0,47 × 0,68 m kuvassa); pelissä ne on venytetty vaaka-asentoon, ja kiven juonne venyy suoriksi raidoiksi
  (näyttää harjatulta tai puulta). Venytystä ei voi poistaa ilman uutta kuvaa.
- Pinta: aaltoileva, pehmeä marmorijuonne kuten havainteessa (vaalea kermanharmaa … harmaa), ei valkoisia kiemuraraapaleita.
- Tyynymäiset, pyöristyneet reunat korkeus-/normaalikarttaan; sauma OHUT (n. 5–8 mm), ei leveää tummaa ruudukkoa.
- Kuvan mitta toistuvana 2,00 × 2,00 m kuten ennen (1024² tai 2048²), saumat tasan reunoilla, jotta toisto on saumaton.

## 2. Kivijalka: PITKIÄ, ERIPITUISIA KIVIÄ, uusi nimi sokkeli-v02 (+ sokkelin-ylapinta-v02, pilarin-etu/-sivu-v02)
- Havainteessa kivet ovat noin 3–4 × korkeutensa pituisia ja eri pituisia (ei samanmittaisia "tiiliä"), ~8 kerrosta 1,20 m:llä
  (kerros ~0,15 m → kivi ~0,45–0,60 m). v4:ssä kivet ovat säännöllisiä ja lyhyitä (~2:1).
- Viistetyt/pyöristyneet reunat, juonne kuten lattiassa; sävy saa vaihdella kivittäin (tasaan sen tarvittaessa pelissä).
- Yläpinnan ja pilarien saumat yhteen sopivina kuten v4:ssä.

## Toimitus
Kuten v4: albedo + normal-opengl + height + roughness, SHA256SUMS, KAYTTO.md ja vertailuarkki havainteen rinnalla, nimellä
stone-surfaces-v5. LISÄKSI tarvitsen saumojen paikat (esim. JSON: rivien v-rajat ja kunkin rivin u-rajat 0–1-koordinaateissa)
kummastakin kuvasta: VS laskee niistä varjostimen tyynyreunan. Reunakivi: EI muutoksia (omistaja lukitsi 27.10.).
Kokoan pinnat peliin ja teen uuden parin samoista kameroista KK:lle.
