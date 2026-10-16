# Kiinan dynastiat -linssi: lisäkerrokset (Karttaseppä → Linssiseppä, EHDOTUS 17.10.2026)

Omistajan päätös 17.10.2026 klo 01.25 PT:n kautta: "Pidä kiinan dynastiat työn alla niiden referenssi ideoittesi pohjalta
ja yritä tehdä valmiiksi". Hyväksytty pohja (KK 16.10.): Kings and Generals -karttakerronta, Minardin virtauskuvat, valta
leviää kuin muste, pääkaupungin siirroista jää jälki, viisi ratkaisevaa taistelua. Tämä on datan muoto; piirto LS.

Lukittu `kiinan-dynastiat.json` (MUOTO.md) pysyy ennallaan. Lisäys on uusi päätason lista `kerrokset` (LS:n muoto
17.10.2026 01.3x, vuosista erillään) ja `kerrokset_lahteet`. WGS84 [lon, lat], 3 desimaalia, viivat tihennetty ≤ 0,25°.
Kerros näkyy, kun linssin vuosi on `alku`–`loppu` (eaa negatiivisena; yhä olemassa → 1912). Lisenssi CC0.

```
"kerrokset": [ { "avain": "muuri" | "joki" | "kanava" | "silkkitie" | "marco-polo" | "zheng-he" | "siirto"
                          | "taistelu" | "vaesto" | "pysakki-<reitti>",
                 "laji": "viiva" | "virtaus" | "piste", "alku": -214, "loppu": -206, "nimi": "Qinin muuri",
                 "pisteet": [[lon, lat], ...], "vari": "#6b3a2a",
                 "leveys": 0.6,                 // tai "leveydet": [0–1 per piste] (siirto: kapea → leveä)
                 "arvo": 12.5,                  // piste: väestö milj. (taistelu: null, joukkoja ei arvata)
                 ...lisäkentät: uoma (joki), arvio/huom/koko_kiina (vaesto), voittaja/havio/seuraus (taistelu), dynastia (siirto) } ],
"kerrokset_lahteet": { "viivat": "...", "vaesto": "...", "taistelut": "..." }
```

Määrät: muuri 6 osaa (4 muuria), joki 3 uomaa, kanava 4, silkkitie 5 haaraa (Hexi leveys 1, muut 0,6), marco-polo 4 osaa
(kukin oma aika), zheng-he 1 virtaus, pysäkit 15, väestö 19 vuotta × 10 aluetta (piste näkyy seuraavaan avainvuoteen asti),
taistelut 5, siirrot 8.

- `muuri`: Qin (214 eaa), Han (Hexi-käytävä ja Yumen 100 eaa), Pohjois-Qi/Sui (550–610), Ming (1368–1644). Aikaväli on
  rakennus- ja käyttöaika; muuri jää himmeänä näkyviin (piirron päätös).
- `joet`: Keltaisen joen kolme uomaa: pohjoinen (Bohai Tianjinin eteläpuolella, ennen 1128), eteläinen (Huai-joen kautta
  Keltaiseen mereen, 1128–1855: Song-armeija avasi padot 1128) ja nykyinen (Bohai Dongyingin luona, 1855–).
- `kanavat`: Sui-kanava (605–610, Luoyang–Yangzhou ja Luoyang–Zhuojun), Yuanin suora kanava Peking–Hangzhou (1289–1293–).
- `reitit`: Silkkitie (Chang'an–Dunhuang, sitten pohjoinen ja eteläinen Tarim-reitti Kashgariin ja länteen 60° I asti),
  Marco Polon meno 1271–1275, Kiinan matkat ja paluu meritse 1291–1295 (Quanzhou → Sumatra → Ceylon), Zheng He'n
  seitsemän laivastomatkaa 1405–1433 (yhdistetty päälinja Nanjing → Champa → Jaava → Malakka → Ceylon → Calicut;
  Hormuz ja Afrikka ovat 60° I länsipuolella, joten reitti katkeaa rajalla).
- `vaesto`: koko Kiinan väkiluku avainvuosille (historialliset väestölaskennat, `arvio` true kun tutkijoiden arvio) ja
  10 alueen pisteet (Guanzhong, Keskinen tasanko, Hebei, Shandong, Shanxi, Sichuan, Hubei–Hunan, Jiangxi, Jiangnan,
  Fujian–Guangdong) väestön painopisteen siirtymiseen etelään (Minardin virtaus: pisteiden koko = miljoonaa).
- `taistelut` (viisi, kukin avainvuoden vaihdokseen): Changping 260 eaa (Qin–Zhao), Punainen kallio 208 (Cao Cao –
  Sun Quan ja Liu Bei), Fei-joki 383 (Itä-Jin – Entinen Qin), Yamen 1279 (Yuan – Song), Shanhain sola 1644 (Qing ja
  Wu Sangui – Li Zicheng). `voittaja`/`havio` = dynastian `avain`, kun se on aineistossa.
  Kiistanalaisilla paikoilla (PT 17.10. 02.3x) lisäksi `alue` = mahdollisten paikkojen vyöhyke suljettuna renkaana
  [[lon, lat], ...] ja `alue_km` = vyöhykkeen säde; piste pysyy yleisimmin mainitussa paikassa. Punainen kallio: Jangtse
  Baqiusta (Yueyang) Wuhanin lounaispuolelle, 12 km; Fei-joki: Shouchunin (Shouxian) ympäristö Fei-joen varrella, 15 km.
  Piirto voi näyttää alueen pisteen sijaan (tai sen ympärillä).
- `siirrot`: pääkaupungin siirrot avainvuosien välissä (esim. Han Chang'an → Luoyang 25, Jin → Jiankang 317, Song
  Kaifeng → Lin'an 1127, Ming Nanjing → Peking 1421); `p` on kaari, jota pitkin "jälki" piirretään.

Lähteet: omat piirrokset (CC0) julkisista koordinaateista (myös Keltaisen joen nykyuoma); väkiluvut
historiallisista laskennoista (faktat, ei tekijänoikeutta; lähde `kerrokset_lahteet`-kentässä). Ei OSM:ää (ODbL).

TOTEUTETTU 17.10. 01.4x LS:n muodossa (tools/kiinan-dynastiat/kerrokset.py + kerrokset_data.py, +85 kt).
