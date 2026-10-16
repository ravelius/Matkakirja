# Kiinan dynastiat -linssi: lisäkerrokset (Karttaseppä → Linssiseppä, EHDOTUS 17.10.2026)

Omistajan päätös 17.10.2026 klo 01.25 PT:n kautta: "Pidä kiinan dynastiat työn alla niiden referenssi ideoittesi pohjalta
ja yritä tehdä valmiiksi". Hyväksytty pohja (KK 16.10.): Kings and Generals -karttakerronta, Minardin virtauskuvat, valta
leviää kuin muste, pääkaupungin siirroista jää jälki, viisi ratkaisevaa taistelua. Tämä on datan muoto; piirto LS.

Lukittu `kiinan-dynastiat.json` (MUOTO.md) pysyy ennallaan. Lisäys on uusi päätason avain `kerrokset` samaan
tiedostoon (skeema `matkakirja-linssi/kiinan-dynastiat/1` + `kerrokset`, vanha lukija ohittaa sen). WGS84 [lon, lat],
3 desimaalia, alue 60–145° I, viivat tihennetty ≤ 0,25°. Aikaväli `alku`–`loppu` vuosina (eaa negatiivisena, `loppu`
null = yhä olemassa): kerros näkyy, kun linssin vuosi on välillä. Lisenssi CC0 (omat piirrokset), lähteet `lahteet`-kentissä.

```
"kerrokset": {
  "muuri":   [ { "avain": "ming", "nimi": "Mingin muuri", "alku": 1368, "loppu": 1644, "osat": [ { "p": [[lon,lat],...] }, ... ] } ],
  "joet":    [ { "avain": "huanghe-pohjoinen" | "huanghe-etela" | "huanghe-nyky", "nimi": "Keltainen joki", "alku", "loppu", "osat" } ],
  "kanavat": [ { "avain": "sui" | "yuan", "nimi": "Suuri kanava", "alku", "loppu", "osat" } ],
  "reitit":  [ { "avain": "silkkitie" | "marco-polo" | "zheng-he", "nimi", "alku", "loppu",
                 "osat": [ { "alku": 1271, "loppu": 1275, "p": [...] }, ... ],      // osan oma aika valinnainen
                 "pysakit": [ { "nimi": "Khanbaliq", "lon": .., "lat": .., "vuosi": 1275 } ] } ],
  "vaesto":  [ { "vuosi": 1100, "milj": 100, "arvio": true, "huom": "...", "pisteet": [[lon, lat, milj], ...] } ],
  "alueet":  [ "Guanzhong", ... ],                                      // vaesto.pisteet samassa järjestyksessä
  "taistelut": [ { "avain", "nimi", "vuosi", "lon", "lat", "voittaja", "havio", "seuraus" } ],
  "siirrot": [ { "avain": "song", "vuosi": 1127, "mista": { "nimi", "lon", "lat" }, "mihin": {...}, "p": [[lon,lat],...] } ],
  "lahteet": { "<kerrokset>": "..." }
}
```

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
- `siirrot`: pääkaupungin siirrot avainvuosien välissä (esim. Han Chang'an → Luoyang 25, Jin → Jiankang 317, Song
  Kaifeng → Lin'an 1127, Ming Nanjing → Peking 1421); `p` on kaari, jota pitkin "jälki" piirretään.

Lähteet: omat piirrokset (CC0) julkisista koordinaateista; Keltaisen joen nykyuoma Natural Earth 10m (PD); väkiluvut
historiallisista laskennoista (faktat, ei tekijänoikeutta; lähde `lahteet`-kentässä). Ei OSM:ää (ODbL).

TOTEUTETTU 17.10. 01.3x (tools/kiinan-dynastiat/kerrokset.py + kerrokset_data.py, +52 kt). Kysymykset LS:lle: (1) sopiiko `kerrokset` samaan tiedostoon, vai oma `kiinan-dynastiat-kerrokset.json`? (2) Reitin osilla on oma aika (Marco Polo 4 osaa); riittääkö, vai haluatko ajan per pistettä?
