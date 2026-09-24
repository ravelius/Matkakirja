# DC3.fbx ja Tekstuurit/ — lisenssi ja lähde

- **Malli:** DC-3-tyyppinen hopeinen potkurimatkustajakone (1930-luku), yksityiskohtainen (36 010 kolmiota),
  kestää kameran 3–5 m päässä (ELOKUVALLINEN ALOITUSLENTO, erä 1, 24.9.2026).
- **Tekstuurit** (4096 × 4096, yksi atlas koko koneelle; lasi erikseen ilman tekstuuria):
  `Tekstuurit/DC3_vari.png` (albedo, sRGB), `DC3_normaali.png` (tangenttiavaruus, OpenGL/vihreä ylös),
  `DC3_maski.png` (R metallisuus, G peittävyys, B 0, A sileys = URP/Litin _MetallicGlossMap; G myös _OcclusionMap).
  Tuontiasetukset asettaa `Editor/Rakennus.cs`:n `KoneTekstuurienTuonti` nimen perusteella.
- **Tekijä:** Matkakirja-projekti (Natiiviseppä, 24.9.2026). Oma työ: geometria, UV-atlas ja tekstuurit tuotetaan
  skripteillä `Lahde~/dc3_hd.py` ja `Lahde~/dc3_maalaus.py` Blender 5.2:lla (leivonta Cyclesillä, maalaus numpylla).
  Ei ulkopuolisia malleja, tekstuureja, kuvia eikä fontteja (kirjaimet omalla viivafontilla).
  Rekisteritunnus OH-MKJ ja nimi MATKAKIRJA ovat fiktiivisiä.
- **Lisenssi:** CC0 1.0 (public domain).
- **Miksi oma:** valmista CC0-lisensoitua DC-3:a ei löytynyt Sketchfabin CC0-hausta, Poly Pizzasta,
  Kenneyltä eikä Quaterniukselta (23.–24.9.2026).
- **Rakenne:** juuri `DC3`; lapset Runko, Ikkunat (ohjaamon lasi), Ikkunat_Matkustamo (lasi), Sisus (ohjaamon
  tumma sisus), Siipi_V/O, Vakaaja_V/O, Sivuvakaaja, Moottori_V/O (gondoli, suojus, sylinterit, pakoputki,
  imuaukko), Pyora_V/O (sisään vedetyt, näkyvät osin gondolin alta), Kannuspyora (kiinteä), Antennit, Valot,
  Potkuri_V/O (napa; origo navassa, pyörimisakseli paikallinen Z) ja niiden lapset Lapa_V1–3 / Lapa_O1–3
  (erilliset oliot; nimet eivät ala "Potkuri", joten Potkurit.cs pyörittää vain napaa ja lavat seuraavat).
  V = koneen vasen (Unityssä -X), O = oikea (+X). Materiaalit: Kone (atlas), Lasi.
  Mitat metreinä: pituus 19,8 m, kärkiväli 28,98 m.
- **Suunta:** nokka Unityn +Z, ylös +Y (Blender -Y/+Z, FBX-vienti Forward -Z, Up Y, Apply Transform;
  dc3_hd.py korjaa Blenderin viejän virheen sisäkkäisten olioiden paikallismuunnoksissa).
- **Uudelleenrakennus** (noin 3 min, CPU; kansiot suhteessa tähän kansioon):
  `/Applications/Blender.app/Contents/MacOS/Blender -b -P Lahde~/dc3_hd.py -- DC3.fbx Tekstuurit [esikatselukansio]`
- **Vanha matalapolyinen malli** (1 340 kolmiota, ei tekstuureja) on yhä rakennettavissa skriptillä `Lahde~/dc3.py`.
