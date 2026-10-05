# Pulun chat: avauspaikat ja poikkeamat (Natiivi-UI 5.10.2026 klo 16.5x)

Omistaja 16.4x: "pululla ei saisi olla koskaan valmiiksi kirjoitettuja vastauksia, vain valmiita kysymyksiä … aina kaksi uutta
kysymysvaihtoehtoa viimeisimmän vastauksen perään … kysymykset eivät myöskään saisi jäädä tuolla tavalla pinoon … toiminta pitää
olla täysin sama kaikkialla … kaiutin … joko auto moodissa tai … ei luentaa" (16.5x: ei luentaa = kaiutin + yksi poikkiviiva).
Lähde: proto natiiviseppa/juna-144-koe (ec0038f4), polut `Assets/Matkakirja/`.

**Hyvä uutinen:** kaikki avauspaikat käyttävät jo samaa luokkaa `UI/Pulu/PuluChat.cs` (ei erillisiä kortteja). Poikkeamat ovat
avausmetodeissa (valmiit vastaukset, sirujen lähde ja määrä) ja teemassa, eivät asettelussa.

| # | Avauspaikka | Avaus | Teema | Valmiit vastaukset? | Kysymyssirut | Kasaantuuko? |
|---|---|---|---|---|---|---|
| 1 | Kartan/matkakirjan Pulu | UiNakymat.cs:410 → Chat.Vaihda | paperi | ei (paitsi Ihmisen matkassa, ks. 4) | avatessa `ehdotukset` 2, vastauksen jälkeen workerin `jatkot` 2 | ei, korvautuvat |
| 2 | Astronautin kuvan minipulu | Kuvanakyma → MinipulunKortti.cs:34 → AvaaLinssissa | lasi-avaruus | ei (poistettu löydöksessä 35) | kohteen `kysymykset` (kaikki), sitten `jatkot` 2 | ei |
| 3 | ISS-taulun "Kysy Pululta" (omistajan kuva, New York) | PulunTauluNakyma.cs:485 → AvaaLinssissa | lasi-avaruus | **KYLLÄ**: astro-kysymykset.json `vastaus` + `lahteet` (PuluChat.VastaaLinssinValmiilla :508) | 5 staattista; jäljellä olevat näytetään **uudelleen jokaisen vastauksen alla** | **kyllä (pino)** |
| 4 | Ihmisen matka (Pulun napautus) | AikajanaNakyma.cs:322 → Avaa → NaytaLinssinValmiit | paperi | **KYLLÄ**: ihmisen-matka-kysymykset.json | 3 staattista; jäljellä olevat jäävät alle | **kyllä** |
| 5 | Ajattelija-linssi | AjattelijaNakyma.cs:408 → AvaaLinssissa | lasi | ei | `pulunKysymykset`, sitten `jatkot` 2 | ei |
| 6 | Nostokortti ("Kysy", sirut, korostettu sana) | Nostokortti.cs:956/979/763 | paperi | ei | kortin `Kysymykset`, sitten `jatkot` 2 | ei |
| 7 | Maakuntakortti "Kysy" | Maakunnat.cs:1087 → AvaaValmiilla | paperi | **KYLLÄ**: q/a-parit (PuluChat.VastaaValmiilla :480) | jäljellä olevat q:t jäävät jokaisen vastauksen alle; **ei** dynaamisia jatkoja | **kyllä** |
| 8 | Ihmisen nostokortti "Kysy" | IhmisenNostokortti.cs:156 → AvaaValmiilla/AvaaKortista | paperi | **KYLLÄ**, jos parilla on vastaus | 3; jäljellä olevat jäävät | **kyllä** |

**Kaiutin nyt:** otsikkorivin KortinLukija on luku/tauko-nappi (lukee viimeisimmän vastauksen); automaattiluennan päälle/pois on
vain ≡-valikon rivillä "Lue vastaukset automaattisesti" (PlayerPrefs `matkakirja-pollo-aani`, oletus pois). Kaksitilaista
kaiutinta ei ole. Valmiit vastaukset luetaan, jos automaattiluenta on päällä.

**Muut erot:** teema (paperi / lasi / lasi-avaruus) ja ankkuri (linssissä ≤ 360 × 520 ankkurin yllä, kartalla Pulun yllä);
ISS-taulu itse on oma pohjansa (mk-astroTaulu), ei chat. Linnan Pulu-kupla (DioraamaTaulu) ei ole chat eikä kysy.

**Korjaussuunnitelma (yksi PULU-CHAT-pohja, juna 145):**
1. Valmiit vastaukset pois kaikkialta (3, 4, 7, 8): sirun napautus → elävä kysymys; tallennettu vastaus ja lähteet menevät
   workerille taustatiedoksi (Pelikoodarin rajapinta).
2. Sirut: avatessa tasan 2 (paikan datasta tai `ehdotukset`), jokaisen vastauksen perään tasan 2 workerin `jatkot`, jotka
   korvaavat edelliset; "jäljellä olevat" -rivit (NaytaJaljellaOlevat, NaytaLinssinValmiit vastauksen jälkeen) pois.
3. Kaiutin kaksitilaiseksi koko pelissä: Auto (kaiutin) ↔ ei luentaa (kaiutin + yksi vino viiva), tallentuu
   `matkakirja-pollo-aani`; Autolla jokainen vastaus luetaan, ei-luentaa-tilassa ei mitään. ≡-valikon rivi poistuu tarpeettomana.
4. Asettelu ja napit samat kaikkialla; vain teema vaihtuu linssin mukaan.
