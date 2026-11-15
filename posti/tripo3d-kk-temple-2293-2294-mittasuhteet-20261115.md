# Codex → KK/PT: Temple #2293/#2294 — mittasuhteet ja korjaustapa

15.11.2026. Kuittaan kysymykset #2293/#2294 ja vastaan tiedostojen tarkistuksen perusteella. Ei mallimuutosta, renderiä tai generointia. Tämä ei ole korjauksen toteutus eikä hyväksyntä.

## Vastaus

**Leveä siluetti oli jo halkaistun kuvan ohjaimessa, ja leveä mallisuhde on todistettavasti jo alkuperäisessä Tripo #2251 -verkossa. Pelimallin #2271 valmistelu ei levittänyt sitä.** Kuvasta ja yhdestä Tripo-tuloksesta ei voi erotella, kuinka paljon mahdollista virhettä syntyi kuvageneroinnissa ja kuinka paljon Tripon syvyystulkinnassa.

Ohjain oli tietoisesti likimääräinen **39 m korkea** rakennekoe, ei 50 m mittamalli. Sen runko oli 13,5 m, kulmatorneineen akselileveys 19,0 m. Kamera katsoi diagonaalista leikkausta, joten näkyvä vaakajänne on noin **24,5 m** (katon ulkonemat hieman lisää), ei suoran julkisivun 19–19,5 m. Kuvassa näkyvä leveys ja lähteen neliöakselin leveys eivät siis ole sama mitta. Alkuperäinen mallikuva seuraa katsotun ohjaimen kokonaisleveyttä ja kerrosjakoa varsin läheisesti; siinä ei näy yksin 1,74-kertaista lisälevitystä ohjaimeen verrattuna. Kuvan lähes sama siluetti ei silti todista oikeaa kolmiulotteista pohjaa.

Tripo luo kuvasta omat paikalliset akselinsa: mallin X kuvaa tuloksen vaakasuuntaa, eikä sen ole osoitettu vastaavan historiallisen neliörungon sivuakselia. Tämän vuoksi **34 m vastaan 19,5 m ei yksin varmista, että sekä X:n että Z:n kertoimeksi kuuluu 0,57**. Se on käyttökelpoinen pelissä tehtävä sovitus, mutta lähteen mukainen pohjamitta ja leikkausdiagonaalin suunta pitää erottaa ennen pysyvää korjausta. Myös 39 m ohjaimen skaalaaminen kauttaaltaan 50 metriin kasvattaa leveyden 50/39 = 1,282-kertaiseksi; tämä oli #2271:n dokumentoitu nimellinen korkeuspäätös, ei uusi mittatieto.

**Korjaus onnistuu teknisesti Blenderissä ilman uutta Tripo-ottoa.** Verkon vaakaskaalaus ja skaalan soveltaminen onnistuvat krediiteittä. UV-koordinaatit voidaan säilyttää, jolloin sama kuvapinta seuraa muuttuvaa verkkoa; pelkkä uusi UV-levitys ei kuitenkaan korjaa valmiin pintakuvan venymää vaan rikkoisi nykyisen kuvakohdistuksen ilman uutta tekstuuribakea tai materiaalien uudelleensovitusta. Tarvittaessa uudelle UV-kartalle voidaan bakeata olemassa oleva pinta ja tarkistaa kiven/liuskeen kuvioiden mittakaava sekä normaali-/tangenttikartan toiminta. Geometrinen litistys muuttaa samalla portaiden askelmia, pylväiden poikkileikkauksia ja holvikaarten suhteita; UV-työ ei korjaa näitä eikä todista takapuolta historialliseksi. Yhteinen vaakakerroin säilyttää jo vaakatasossa olevien ympyröiden pyöreyden, mutta ei suorista valmiiksi väärin tulkittuja muotoja.

Jos täsmälleen KK:n nykyinen pelisovitus halutaan leipoa tiedostoon, sen voi tehdä rajatusti ilman uutta ottoa. Jos tavoitteena on lähdevarma 13,5/19,5 m pohja, ensin tarvitaan sovittu pohja-akselien ja mitattavien rakennusosien rekisteröinti. **En tee kumpaakaan ennen KK:n sanaa.**

## Todennetut numerot ja muutosketju

GLB:t luettu kevyesti glTF-JSONista: POSITION-accessorien min/max, solmumuunnokset ja SHA256. Alkuperäisessä on vain siirto; #2271:ssä koordinaatit on leivottu. Akselit glTF: X vaakasuora, Y ylös, Z syvyys. Taulukon mitat ovat akselisuuntaisia bounding box -mittoja, eivät seinästä seinään mitattuja historiallisen rungon mittoja.

| Tiedosto/vaihe | X leveys | Y korkeus | Z syvyys |
|---|---:|---:|---:|
| #2251 alkuperäinen, normalisoitu | 0,672149718 | 0,982391357 | 0,370117188 |
| Sama suhteellisesti 50 m korkeuteen | 34,209875 m | 50 m | 18,837563 m |
| #2271 todellinen kevennetty GLB | 34,211143 m | 50,001634 m | 18,845983 m |
| #2271 ×0,57 vain X/Z, laskennallinen | 19,500352 m | 50,001634 m | 10,741876 m |

Levenemistä #2251 → #2271 ei käytännössä ole: 50 m:iin normalisoitu leveys muuttuu noin 0,00015 m. Syvyysero on noin 0,008 m. Pienet erot sopivat verkkokevennyksen rajamuutokseen. `prepare.py` ja `preparation-report.json` vahvistavat **yhden tasaisen skaalan 50,8962132273**, keskityksen, verkkokevennyksen ja tekstuurien pienennyksen; ei erillistä vaakavenytystä tai UV-uudelleenlevitystä. Tämä tarkistus ei mittaa pelin nykyistä instanssia: 0,57 on KK:n ilmoittama peliasetus.

## Lähteet ja rajat

- Tilaus luettu kokonaan paikallisen Matkakirja-posti-git-repon kautta annetusta GitHub-commitista `c44f7796cdd4e1ec11901bfc11d0e5cb4e6621ea`, polku `posti/paatoimittaja-codex-temple-2271-suhteet-20261115.md`. `git rev-parse COMMIT:path` vahvisti täsmälleen blobin `1ba7b470ec4b54b878c2abd63d0c7d77886c3ec4`. Ei checkoutia tai git-muutoksia.
- Katsottu `temple-cutaway-v1.png` ja `work/temple-half-cut-guide-v2.png`. Luettu `temple-cutaway-v1.prompt.txt`, `work/guide-assumptions-v2.json`, kameran/geometrian relevantit kohdat tiedostosta `work/temple-guide-v2.py`, `delivery-reference-v1/manifest.json` ja `tripo-2251/job.json`. Guidekamera on ORTHO, sijainti (48,-58,39), kohde (0,0,19), ortho_scale 45, kuva 1024×1536; diagonaalinen leikkaus x=y, säilyy x<=y. Pelkkää perspektiivikuvaa ei voi käyttää metric-fronttina; tässä alkuperäinen guide on ortografinen, mutta vinosti katsottu, eikä generoitu kuva sisällä varmennettua kamerakalibrointia.
- Luettu `game-2271/prepare.py`, `preparation-report.json`, `temple-2271-technical-50m.metrics.json`, `source-order.md` ja `source-height-orientation.md`.
- Alkuperäisen #2251 SHA256 `5c7114ffba86b69ff9fe8e128c0e9b221f19b71845c0d6b74607e556dbdebe3d`; #2271 SHA256 `843ec7a3e22f952299e91af8c59d199ba7d6678fe540198e86959ff79424b74e`; molemmat tarkistettu tiedostotavuista. ImageGen-syöte SHA256 on manifestin mukaan `92a5974331f3f881b88ba585443adb5e63e9b46c4dddb52272b58c34fc06f7ec`; Tripo-jobi vahvistaa saman syötteen.
- Guide käytti 19,0 m eikä 19,5 m: 13,5 + 5,5 = 19,0 m sen tornikeskusten sijoittelulla. 13,5 − 2×2,27 = 8,96 m eikä lähteiden pyöristetty 9,1 m. Nämä pienet lähderistiriidat eivät selitä 34 m:ä.
- 39/50 m ristiriita ja maantieteellinen yaw olivat jo #2271:ssä avoimia; 50 m valittiin nimelliseksi työmitaksi. Takapuolen muotoa, kulmatornien kaikkia sijainteja tai holvien täydellistä lähdetarkkuutta ei voi varmentaa yhdestä halkaisukuvasta. Tämä vastaus erottaa todistetun tiedostomuutosketjun mahdollisista generaattorin tulkintavirheistä.
