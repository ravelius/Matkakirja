# Codex → Karttaseppä / KK: Eiffel 24b, otto 2 toimitettu arviointiin (5.11.2026)

#2104 / lähde 51797b744ae9054c865b5d257ac51b5fd3225b54. Kahdeksan uutta natiivikuvaa on tehty ja toimitettu. **Koko sarja ei läpäise QA:ta; ei vielä Tripo-syöte.** Yksi kutsu per näkymä, yhteensä 8, ei tämän kierroksen uusintoja. Vanha #2091 säilyy erillään.

- Jaettu kansio: /Users/Shared/Claude/proto-3d/_tyo/codex/pariisi-sarja-20261105/_review-sarja-24b/eiffel/
- Postipaketti: posti/codex-karttaseppa-eiffel-sarja24b-20261105/
- Commit: 86a43ed82331c6977477ae0a2891c22154b745a2
- 18 tiedostoa / 18 711 200 tavua. SHA256SUMS ja kaikki etähaaran Git-blobien SHA256:t luettu takaisin ja varmennettu.
- Tuotantokuvat 1536 × 1024 RGB, alkuperäiset ImageGen-tavut ilman skaalausta tai pikselikorjausta. Mukana oikea.jpg ja lupa, huomiot.md, QA.json, PROMPTS.json sekä neljä erillistä QA-vertailukuvaa.

## Mitatut tulokset
Kaikissa neljässä sivukuvassa on nyt kaksi jalkaa ja yksi kaari. Laskennallisesti 900 px korkeuteen normalisoidut päämitat:

| Sivu | Pohjaleveys px | Tasannekorkeudet px maasta | Pääleveyden ja korkeuksien 5 % |
|---|---:|---|---|
| tavoite | 340,91 | 155,45 / 313,64 / 752,73 | |
| etelä | 448,63 | 212,46 / 394,83 / 786,02 | FAIL |
| pohjoinen | 330,54 | 159,60 / 319,20 / 763,06 | PASS |
| itä | 332,08 | 158,49 / 318,87 / 761,32 | PASS |
| länsi | 329,84 | 158,32 / 317,59 / 760,52 | PASS |

PASS koskee vain näitä neljää suhdetta, ei koko kuvan hyväksyntää. Tasanteiden leveydet poikkeavat myös lähteen likimääräisistä arvoista; esimerkiksi kolmen kapean sivun ensimmäinen tasanne on noin 16–18 % liian leveä. Eteläkuvan vuoksi yhteinen geometria/mittakaava ei toteudu. Mittausviivat ja menetelmät on kirjattu liitteisiin.

Viistotasanteen lävistäjäsuhteet ovat noin **0,724 (lounas)** ja **0,850 (koillinen)** tavoitteen 0,906 sijaan. Johdetut kulmat noin 46°/58°; takakulma peittyy ja se on päätelty kolmesta näkyvästä kulmasta, joten tämä ei ole kalibroitu kameramittaus. Kulmat eivät vastaa pyydettyä yhteistä 65° kulmaa.

Yläkuvan tasannerotaatio korjaantui. Jalanjälki on lähellä mutta ei pikselintarkka: lähde-bbox [369,125,757,512], rakennuksen mitattu bbox [375,131,749,511]. Koordinaattien oikea/alaraja on poissulkeva.

Maapohjan käytävät ovat nyt suorat ja symmetriset. Kiveyksen arvioitu peitto on noin 99,16 %; 630/75005 reunapikseliä luokittuu nurmen kaltaiseksi, joten täyttä peittoa ei varmisteta. Neljän käytäväleikkausnäytteen leveydet 12–14 px vastaavat lähteen 300 m neliöjalanjäljestä johdetulla mittakaavalla noin 13,1–15,3 m, hieman tavoitetta leveämpinä. Arviovirhe noin ±2 px. Vastaanottaja käyttää vain maskin sisäosan; ulkopuolisia pikselimuutoksia on edelleen.

**Pyydän KK:n seuraavaa päätöstä näiden mitattujen poikkeamien perusteella.** En tee kolmatta kierrosta tai aloita muita seitsemää kohdetta ilman uutta lähdepostia. Kuvat eivät ole menneet suoraan Tripolle, R2:een, runtimeen tai julkaisuun. Omistajan arvio ja vastaanottajan hyväksyntä ovat erillisiä.
