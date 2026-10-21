# Tekotapa: ääni (B) — musiikki, kertoja, tehosteet ja äänimaisemat käytännössä

*(Äänittäjä 21.10.2026, studiojako Raamattu 4.21. Laatutaso: `docs/tuotanto/suunta/aani.md`. Luvat, portit ja vaiheet: tuotannonohjaus (D); tässä on vain käytäntö: lähteet, työkalut, mittarit ja tyypilliset virheet. Opit 20.–21.10.2026 mukana.)*

## 1. Lähteet ja työkalut

| tarve | lähde | työkalu |
|---|---|---|
| kertoja, hahmot, Pulu | ElevenLabs `eleven_v4_turbo` (isoisä `eleven_v3`), hyväksytty ääni | `proto-3d/tyokalut/elevenlabs_kieli.py` (`pakota`: `language_code: fi`), tee-skriptit `_tyo`-kansiossa |
| musiikki | Google Lyria 3.5 | `tools/lyria.mjs` (`haeLyriasta`), kehote lyhyt ja myönteinen |
| tehosteet | Soundly Pro (NAS-originaalit), Sonniss GDC (paikallinen), Freesound vain aukkoihin alkuperäisinä | NAS `Matkakirja-arkisto/aanet/soundly/`; Sonniss `/Volumes/T7 4TB/sonniss/tyokalut/hae.py '<regex>'`; Freesound-haku `gh workflow run aanihaku.yml` |
| äänimaisemat | Soundly/Sonniss-silmukat, mitattu | ffmpeg `ebur128`, saumattomuus 3 s tasatehoristeys |
| kaiku | Aalto OK5 -huonevasteet (CC BY 4.0, nimeäminen) | NAS `aanet/lyhty-pallo-v2/ir/` |
| tarkistus | Gemini 3.1 Pro (sokkokuvaus) + ääniportti | `_tyo/juoksupeli-aanet-v2-20261019/gemini.py`; `proto-3d/tyokalut/aaniportti.py` |
| vienti | ämpäri `media.matkakirja.app` | `julkaisija-tyokalut/vie-paketti.sh` (ei ylikirjoita) |

Soundlyn käyttöliittymä ei toimi, kun omistajan Space on koko ruudun sovellus; ei kierretä. Käytä NAS:n originaaleja ja Sonnissin paikallista hakua.

## 2. Vaiheet (käytännössä)

1. **Tavoite:** mikä ääni, missä tapahtumassa, kuinka pitkä; mallinäyte tai yksi virke siitä, miltä sen pitää kuulostaa.
2. **Haku tai otto:**
   - *Tehoste:* hae kokonaisia valmiita yksittäisiä tiedostoja (kesto yleensä 0,2–3 s); älä leikkaa paloja pitkistä nauhoista. Lyhyt kuvaus riittää hakusanaksi.
   - *Puhe:* tee-skripti, `style 0`, `speed` natiivisti, `language_code fi`; yksi otto per teksti; raaka talteen heti.
   - *Musiikki:* yksi lyhyt myönteinen kehote (soittimet, tunnelma, tempo, paikka); Lyria ei noudata kestoa (~60 s), tempoa eikä soitinrajausta tarkasti.
3. **Käsittely:** vain taso, mono/stereo, alun ja lopun hiljaisuus, saumaton silmukka. Ei pitch-/tempomuutoksia puheeseen eikä musiikkiin.
4. **Sokkokuuntelu:** Gemini kuvaa äänen tietämättä tavoitetta (`gemini.kuvaile`), sitten verrataan tarpeeseen (`gemini.sopiiko`); ristiriita = hylkäys.
5. **Portti:** `aaniportti.py` (true peak ≤ 0 dBTP, tavoite −1; kertaäänten kovuus perheessä; `kieli.json` ElevenLabs-paketeille).
6. **Vienti:** `_valmiit/<nimi>-vienti-<pvm>/` + `LAHTEET.md` (lisenssi, lähde, nimeäminen) + `SHA256SUMS` + `manifest.json`; `vie-paketti.sh`; korjaus aina uudelle polulle.
7. **Kytkentä:** polut ja tunnukset kytkijälle (Pelikoodari/Linssiseppä); `korvaa`- ja `poista`-listat manifestiin.

## 3. Mittarit ja formaatit

- **Taso:** `ffmpeg -nostats -i x.mp3 -af ebur128=peak=true -f null -` (LUFS ja huippu). Kertoja −14,6, fokus/Pulu −17, musiikki −20, askeleet ja salit −34, kabinetti −37.
- **Kertaäänet:** mono mp3 192k, huippu −6,5 dBFS (true peak < −1 dBTP), pehmeät häivytykset (0,05–0,3 s). Silmukat: stereo mp3 192k, 34 s, 3 s tasatehoristeys, `highpass 40 Hz`.
- **Muisti (iPad/iPhone):** pitkät ja useat silmukat pakattuna muistiin (Compressed In Memory); ajonaikaisesti ladattu pakattu leike on merkittävä pakatuksi (`SaumatonSilmukka.MerkitsePakattu(c)`), muuten `GetData` kaatuu ("Cannot get data on compressed samples").
- **Tiedostokoot:** yksi 34 s silmukka ≈ 0,8 Mt; kertaääni < 50 kt.
- **Lyhyet äänet sokkokuuntelussa:** alle 0,5 s ääni toistetaan kolmesti hiljaisuudella vain arviointikopiossa (ei vientitiedostossa), koska Gemini ei kuule yhtä naksahdusta.

## 4. Tyypilliset virheet

- Musiikiksi otettu valmis kappale (Freesoundin erhu) → omistaja: ääni huono. Kaikki uusi musiikki Lyrialla.
- Lyria-kehotteessa kieltoja ("no drums…") → vain myönteisiä kuvauksia.
- Freesound esikuuntelu-mp3:na ja koneella leikatut palat pitkistä nauhoista → alkuperäiset tiedostot ja valmiit yksittäiset äänet; Gemini hylkää lyhyet leikkeet turhaan.
- Gemini-kriteeri liian tiukka äänimaisemille ("ei kohinaa") hylkää kaikki sorinat → hyväksy sorina, hennot askeleet ja kaiku; torju ymmärrettävä puhe, musiikki, kovat tapahtumat, ajoneuvohumina, tuuli/vesi.
- Huutotagi `[shouting]` iloisen alun jälkeen tuottaa ylimääräisen "Aaa!"-kiljaisun → `[excited]` ilman huutotagia; nopeus `[rushed]`-tagilla ja `speed` 1,2.
- Samalla tiedostolla kaksi tarvetta (posliini = lasi, viitta = kaistanvaihto) → tarkista kaksoiskappaleet `md5`:llä ennen vientiä.
- Vienti samaan nimeen ei onnistu (ämpäri muuttumaton) → `-v2` tai uusi polku; kopioi korjatut versiot (v2b), älä ensimmäistä.
- Ensimmäinen kielipakotus puuttui (ranskan aksentti suomessa) → `language_code: fi` kaikkiin ElevenLabs-pyyntöihin ja `kieli.json` pakettiin.
- Luvut sanoiksi ennen merkkimäärän laskentaa; "eaa." vain sanarajalla (`\beaa\.`).
- Jälkisäätö: puheen atempo ja venytys → ei; pidempi huuto generoidaan suoraan ohjeella.
