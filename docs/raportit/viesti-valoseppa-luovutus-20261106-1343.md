# Valosepän luovutus 6.11.2026 klo 13.43

Korvaa -1322:n kohdan "LISÄYS: TEE ENSIN" ja ND-epäilyn. -1322:n POMPIDOU, PARI KK:LLE ja KK:LLE JO KERROTTU pätevät. Syy: konteksti 25 %, kaikki odottaa muita.
Lukulista 7.47: periaatteet, 7.4, 7.23–7.25, 9.1–9.3, 9.5, 12.9 luettu; luvusta 6 ja luvun 2 linsseistä vain kohtien alut, luvut 9–10 sisällyksinä. Lue loput 2 ja 6 tarvittaessa.
Natiivirepo: /Users/Shared/Claude/proto-3d/Matkakirja-proto, etä `natiivi-backup`, puut /Users/Shared/Claude/wt/proto-linssiseppa2-k30 (nyt pompidou-varit, puhdas) ja -k17. `_tyo` = /Users/Shared/Claude/proto-3d/_tyo. Python, jossa numpy: `_tyo/venv-rembg/bin/python -I`.

## 1. USVA + ND: KS:N AJO 17
KS:lle kuitattu Eiffel 75 (rajaus ajo15/16 katsottu itse: haamu poissa; 85b:n hahmo jää erilliseksi KK-kysymykseksi). KS odotti ND-korjausta, sha annettu:
`a9a0bfd89` (`linssiseppa2/usva`, c3c1597ce:n päällä), kääntämättä, ei junaan. Peitto(): näkyvä osuus yli 0,55 = peittävä, alle 0,30 kuten ajossa 16, väli sekoittuu. Rajat arvioita.
Syy mitattu ajon 16 rajauksesta: yläikkuna 136 → 134, ovet 139 → 107–130, eli osuus sama koko julkisivussa ja vain tausta vaihtuu. -1322:n "alaosan suurempi usva" oli väärin. ND:n näkyvä osuus vähintään 0,65 (ajo 10:n ovet; `scratchpad/mittaa_nd_v.py`, sessiokohtainen).
Ajosta 17 katso: us-nd-85, us-kauko-85 (puu ei näy portaalista, ei tummaa kaistaa), us-eiffel-75 (haamu ei saa palata), us-eiffel-85b (saa muuttua, 0,4 jää väliin), Louvren pääty, pr-pohjoinen. Riski: tasainen usvaväri erottui ajossa 13.
Puiden tummuus ND:n vieressä tutkimatta; KS kertoo ajon 17 kuvasta. Puut ajossa 10 olivat muotoa eri kuin ajossa 16, joten kyse voi olla muiden muutoksista.
Pompidou f26fed3af on KS:n Y:ssä 867a39429 ja tulee samaan ajoon: pari -1322:n ehdoin.

## 2. TAIVAAN RAIDAT: DITHER JU:N IPAD-VUOROLLA
PT:n käsky: "tee dither Karttataivaaseen omana committina, ei väripuskurin vaihtoa. Ei junaan ennen kuittausta. Todistus: yksi taivaskuva isolta iPadilta ennen ja jälkeen samalta kameralta, ja portaiden mitta raidat2.py:llä; ajo JU:n seuraajalta iPad-vuorolla. Tarkista, ettei dither näy kohinana lähikuvassa. Jos raidat jatkuvat usvan kohdalla horisontissa, kerro. Mac-ero ei vaadi omaa selvitystä, ellei korjaus jää vaikuttamatta."
Tehty: `d092f48cc` (`linssiseppa2/taivas-dither`, runko 84872eaa9 + 1), kääntämättä. Sekoitus esikerrottu, kohina puoli porrasta kanavittain (1/128, 1/128, 1/64 lineaarisena), paikallaan ruudussa.
JU:lle pyyntö perillä: `_tyo/linssiseppa2/ohjelmakohteet/sk-taivas-dither.txt`, kansio lokit/julkaisija-taivas-dither-d092f48cc. Ennen-kuvat lokit/julkaisija-runko-ipad-84872eaa9 (nd-45, silta-85).
Mittaa: skriptit kopioitu `_tyo/valoseppa/raidat/` (raidat2.py kuva-ark + kuvat; raidat3.py hila). Ennen: silta-85 B-porras −2/−3 (11 porrasta), R ja G ±1; sama b7:llä (92c47e215 s-000); Mac b8 kaikki ±1. Rivin sisäinen hajonta oli 0, dither nostaa sitä: se on tarkoitus, ei vika.
Syy (11-11-10-puskuri) päätelty hilasta, ei todennettu laitteelta; jos raidat jatkuvat dithernä, päättely oli väärin → selvitä Mac-ero. Tuloskuva täysikoossa kohinan varalta, rivi PT:lle.

## 3. PUU-3
`a0c4a9576` (`linssiseppa2/puut-kevyet`), 80 kolmion taso: NS:lle sana. Laikut = atlaksen kukat, samat 1000 ja 300 kolmion tasoilla; 300 ennallaan. Skripti `_tyo/valoseppa/puut-kevyet/puu3-laikut.py`, esikatselu `puu3-laikut-ennen-jalkeen.png`. Pelissä näkemättä; NS kertoo.

## SEURAAVAKSI
KS:n ajo 17 (1 + Pompidou-pari). JU:n dither-ajo (2). LAV:n s--185p9 ja s--81p1. Siltakuvat ja palettikuvat -1105:n mukaan. Lippu (-1153) KK:n sanaa.
