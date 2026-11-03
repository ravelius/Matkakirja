# Lavastajan luovutus 3.11.2026 klo 21.00 (KONTEKSTI 25 %) — LUE TÄMÄ, ÄLÄ VANHOJA

Edellinen: viesti-lavastaja-luovutus-20261103-1905.md. Syy: kontekstiraja (7.37). Id:t (tämä tili): PT local_8d8ebf72-…,
JU local_2a7d6c96-…, PK local_d3bb1f78-… (list_sessions). Työkansio L = /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja.
Omat python-skriptit: /opt/homebrew/bin/python3 ILMAN -I:tä (numpy/scipy käyttäjäpaketeissa).

## TEHTY tällä vuorolla (kaikki viety ja kytketty)
- lahipuut-v16 YLEISKÄYTTÖISENÄ (L/lahipuut-v16/puut_v16.py, maski puut-maski-v121.npz uusittu Blenderillä): 4 935 → 5 728 puuta,
  latvuspeitto 30 m:n ruuduittain myös saavutettaville pihoille; reittikerros.json (65 runkoa + 52 kannatinta) PK:n kytkemänä.
  _valmiit/…-lahipuut-v16-… d6441d09755c. PK 2ca2f17b7, PT KUITTASI junaan 218.
- Raita 90 s (taso1b): kynnyslaatta pois kk-tausta-1-2-lod0 → tausta-v117 (7d4ea91d67af; v116-nimi oli saumat-v1:n, väärä paketti
  hylatty-…-tausta-v116-…-nimi-varattu). L/raita-90s/kaista_pois.py.
- Yangxinmen yläpääty: taustan oma 养心门-laatikko pois kk-tausta-1-3 lod0/1/2 → tausta-v118 (ea4a29498045; esto: PK, 2 turhaa ruutua, v38 pysyy).
  L/raita-90s/tausta_pois_yangxinmen.py. Pari 06 kunnossa (lokit/lav-lahipuut-v16-20261103/pari-06-yangxinmen-v117-v119.png).
- LAV-erot kohta 5 keltakatot: kattotiili-v01d (L/keltakatot-219/katto_savy_glb.py) → keltakatot-v1 = tausta-v119 + rakennukset-v122 +
  c2-v37 + avoimet-v56 (e01793511136), JU vei, PK 5733b689d (saumat-v1-219), JUNA 219. Pari 07: kattomediaani 190/134/77 → 206/158/75
  (tavoite 222/168/82; loppuero valoa/usvaa = VS). keltakatot-v2 (v01e, 45f13dc58efd: tausta-v120, rakennukset-v123, c2-v38, avoimet-v57)
  VARALLA, EI viety (PT: v1 pysyy). Tulos ilmoitettu PT:lle 21.0x.

## SEURAAVAKSI
1. Odota PT:n kuittausta pari 06/07 junaan 219; jos PT haluaa lisää keltaisuutta, se on VS:n valo (älä nosta albedoa, R jo 255).
2. Jono: LAV-erot (lokit/havainne-editori-20261103-074203/LAV-erot.md) kohdat 1–5 käsitelty; vallihauta ja Jingshan KS:lle.
   Uusi työ PT:ltä; jos ei mitään: "JONO TYHJÄ: Lavastaja" PT:lle.
3. Versiot käytössä: tausta ≤ v120, rakennukset ≤ v123, c2 ≤ v38, avoimet ≤ v57, lahipuut v16 → seuraavat vapaat nimet tarkista mediasta
   (curl -I media.matkakirja.app/juoksupeli/maailma-v4/<kansio>/SHA256SUMS) ja _valmiit:sta ennen paketointia.
