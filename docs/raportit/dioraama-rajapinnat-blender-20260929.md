# Dioraama uudella tavalla: fotogrammetriakuori + Blender-tilat (Linnanrakentaja 29.9.2026)

Omistaja 29.9. klo 19.2x (Päätoimittajan kautta): Olavinlinna vain natiiviin, ulkokuori Senaatin fotogrammetriasta
(CC BY 4.0), sisätilat Blenderissä valokuvamaisina (PBR, Cycles-leivottu valo). Unity-puoli: Siirtoseppä
(proto `siirtoseppa/linna-valo` linna-3:n päällä). Pohjat: `dioraama-rajapinnat-era3-20260929.md` (tilat, faktat,
tekstit), Sisältökirjurin `sisaltokirjuri-olavinlinna-pohjakaava-20260929.md` (paikat, varmuudet).

## 1. Koordinaatisto ja kuori

- Kuori `ulkokuori_{huippu,normaali,kevyt}.glb` (tools/dioraama/blender/ulkokuori.py): vesi poistettu, saaren
  bbox-keskipiste origossa, vedenpinta y −7 (glTF: +x itä, +y ylös, +z etelä). rakennus.json juuritaso
  `ulkokuori: { huippu, normaali, kevyt }` (Siirtosepän lataus ja laatutasot, b1ac2ab3).
- Siivous: 2021-restauroinnin nosturi, telineet, työkoneet ja pressut pois (kuori_siivous.py, `--siivoa`).
- Myöhemmät rakenteet (Kijlin torni 1595–1607, Paksu bastioni, Vesiportin/Pikkuportin bastionit, Suvorovin esilinna)
  näkyvät kuoressa, koska kartta elää nykyajassa (Raamattu, AIKA); sisätilat ovat n1500-tulkintaa ja taulu sanoo sen.

## 2. Tilojen sijoitus todellisiin paikkoihin (glTF x, z = −pohjoinen)

Tila-data pysyy tiivistetyissä lähdekoordinaateissaan; uusi kenttä `sijoitus: { ankkuri: [x,y,z], paikka: [x,y,z],
suunta: aste }` siirtää KAIKEN tilan geometrian ja datan (palikat, rajat, kamerat, pulu, hahmot ja reitit, valot,
liekit) muunnoksella p' = R(suunta) · (p − ankkuri) + paikka ennen rakennusta (rakenna.mjs). Blender saa siis valmiiksi
sijoitetun glb:n ja leipoo sen kuoren kanssa (kuori varjostaa).

| Tila | Todellinen paikka (mallin x itä, y pohjoinen) | Sijoitus (29.9. klo 21) |
|---|---|---|
| fatabuuri, kierreportaat | Kellotorni (−44,4; 4,6), pohjakerros y 2,9 | pohjoismuurin muunnos* |
| muurinharja | pohjoismuuri tornien välissä, kansi y 15,9 (harja 16,4…16,9) | pohjoismuurin muunnos* |
| keskushalli | pohjoissiipi tornien välissä (≈ −28; 3,7), lattia y 2,9, katto 13,8 | pohjoismuurin muunnos* |
| kappeli | Kirkkotorni (−15,4; 14,6), 3. krs lattia y 6,4 | ankkuri [0,0,−20] → [−15,4; −3; −14,6] |
| keittiö | itäsiiven alakerta Pienen linnanpihan (y −2,9) laidalla ≈ (−12, −8) | [14,0,7,5] → [−12; −3; 8], suunta 90 |
| vartiotupa | T heikko: portin sijainti tarkistamatta | ei vielä |
| laituri | T heikko: vesiportti | ei vielä |

\* Pohjoismuurin muunnos: ankkuri [−30, 0, −20] (lähteen Kellotorni) → paikka [−44,4; 2,9; −4,6], suunta 341: lähteen
Kello–Kirkko-jana (30 m, +x) osuu kuoren tornien väliin (30,7 m). Tornien keskipisteet ovat kartiokattojen huippuja
(kuori_korkeudet.py: Kello 34,6 m, Kirkko 32,3 m); aiemmat (−50, 5) ja (−21, 13) osuivat kattojen rinteisiin.
Tornitiloilla on nyt oma torniseinä (säde 6,6…7,1), koska kuoressa ei ole sisäpintaa.

Tornin sisäsäde mitataan kuoresta (ulkohalkaisija ≈ 17 m); tornitilojen kiekot, kupolit ja portaat skaalataan siihen.
Kerroskorkeudet ja lattiatasot luetaan kuoresta raycastilla (kuoren sisäpintaa ei ole: tilan omat seinät tekevät
sisäpinnan, leikkauspinnat 'leikkaus').

## 3. Leikkausikkuna kuoreen (Unity, Siirtosepän varjostin)

Kohdistetun tilan ajaksi kuoresta hylätään fragmentit leikkaustilavuudessa: tilan `rajat` laajennettuna 1 m ja
jatkettuna vaakasuunnassa kameran atsimuutin suuntaan kameraan asti (kameraa kohti oleva kuori pois, taaempi jää).
Reunalle ohut 'leikkaus'-sävy (kivi, vaalea), ettei kuori näytä pahvilta. Yleisnäkymässä kuori ehjä. Siirtymässä
leikkaus kasvaa 0 → 1 kaarilennon jälkipuoliskolla. rakennus.json tila: `leikkaus: { laajennus: 1.0, kameraan: true }`
(oletus), tarvittaessa `leikkaus: { min, max }` käsin.

## 4. Blender-putki per tila (tools/dioraama/blender/leivo_tila.py)

tuonti (sijoitettu glb) → Poly Havenin CC0-PBR (laatikkoprojektio) → valot rakennus.json:sta → UV1-atlas (pohjat pois,
pakkaus) → Cycles COMBINED 4k/2k (Metal, nice 15, yksi kerrallaan) → glb (TEXCOORD_1, liekki:/valo:/ikkuna:-tyhjät) +
`valot/<id>.jpg` + rakennus.json `valoatlas`. Valokuvamaisuus: myöhemmin CC0-mallit (Poly Haven) proseduraalisten
kalusteiden tilalle, kuluma ja lika bakeen.
