# xAI-puhetagit: kuunneltava kooste (Pelikoodari 27.9.2026 klo 23.0x)

**Kooste:** `puhetagit-kooste.mp3` (3 min 4 s). Ääniotsikot ovat Macin Satu-äänellä, näytteet ovat xAI:n oletusäänellä
*ara*, kielenä `fi`, kuten tuotannossa. Jokainen näyte kuullaan ensin **A = ilman tageja** ja sitten **B = tagien kanssa**.
Syntaksi (docs.x.ai): pistetagit `[pause]`, kääretagit `<whisper>…</whisper>`.

| Näyte | Mitä kokeilee | B:n tagit | Mitattu (ffmpeg / xAI STT) |
|---|---|---|---|
| 1 Nosto | otsikko + leipäteksti, kappalejako | `Akropolis. [pause] …` ja `[long-pause]` kappaleiden väliin | tauko otsikon jälkeen 1,2–2,0 s (A: 0,5 s); `[long-pause]` 2,1–2,2 s (A: 0,6 s) |
| 2 Fakta + legenda | tauko ennen paljastusta, legendan loppu kuiskaten | `on [pause] kaupungin vanhin silta?`, `<whisper>Munia tuotiin…</whisper>` | tauko 0,4 + 0,4 s; kuiskaus EI hiljene (−23,9 vs −24,6 dB) → kuuntele, kuuluuko se kuiskauksena |
| 3 Pulun chat | persoonaosa alussa ja lopussa, asiaosa neutraalisti | `[sigh] Pulu? …` alussa, `[pause]` ennen asiaa, `<fast>Hei, kysy lisää…</fast>` lopussa | tauko ennen asiaa 1,3–1,4 s |
| 4 Suomen testi | toimivatko loput tagit suomeksi | `[clearing-throat]`, `<slow>`, `[gasp]`, `[laugh]`, `<loud>`, `[inhale] [exhale]`, `<low>`, `<high>`, `<soft>` | kuunneltava |

**Suomi:** xAI:n puheentunnistus luki kaikki B-näytteet ilman yhtään tagin nimeä (`stt-tagilliset.txt`), joten tageja
ei lueta sanoina ääneen. Tauot toimivat mitatusti. Äänensävytagien (kuiskaus, nopeus, korkeus) vaikutus on kuunneltava.

**Huomio:** `[pause]` otsikon perässä tuo 1–2 s:n tauon. Omistaja halusi otsikon jälkeen **ei taukoa** (TF 1.0.32:n palaute).
Siksi alla olevassa ehdotuksessa otsikon perään ei tule tagia.

**Kulutus:** 3 634 mrk. Näytteet (1 817 mrk) generoitiin vahingossa kahdesti, koska tarkistuskomento tuotti skriptin
uudelleen. Skripti vaatii nyt `generoi`-argumentin.

## EHDOTUS käyttöönotosta (toteutetaan vasta omistajan kuuntelun jälkeen)

Tagit vain striimiääneen: Pulun chat, nostojen luenta ja muut tekstit. Tallennettuja luentoja ei muuteta.

1. **Säännöt tekstidatasta:**
   - Luennan palat kokoaa `Lukijaaani.LuennanPalat`, webissä `keraaKohdat`. Kappalejaon kohdalle tulee `[pause]`.
   - Väliotsikon edelle tulee `[long-pause]`. Se korvaa webin OTSIKKOVALI-tauon, ja natiivissa tauko syntyy kappalepalojen väliin.
   - Otsikon perään ei tule tagia.
   - Tagit lisätään pyyntöön vasta generointihetkellä, eivät tekstidataan. Näytöllä näkyvä teksti pysyy puhtaana.
   - Välimuistiavaimeen tulee tagiversio (esim. lohko `kertoja-t1`). Vanhat tagittomat R2-palat eivät silloin sekoitu.
2. **Pulun järjestelmäkehote:**
   - Vastauksen alkuun ja loppuun saa merkitä korkeintaan yhden tagin persoonaosaan: `[sigh]`, `[laugh]` tai `<fast>…</fast>`.
   - Asiaosa jää aina ilman tagia.
   - Worker hyväksyy vain sallitut tagit. Muut poistetaan, ja tekstiksi näytetään tagiton versio.
3. **Kiintiö:** tagit eivät muuta merkkimäärää olennaisesti (+10–30 mrk/pala).
