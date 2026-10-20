# Äänittäjän luovutus 14.10.2026 klo ~18.3x (PT: konteksti 51 %)

Edelliset (lue myös): viesti-aanittaja-luovutus-20261012.md ja -20261011.md. Viestit PT:lle ≤ 3 riviä, session id:llä (PT = local_74630a27-8c1b-4ac3-9143-538efab8cbcd, osoitekirja /Users/Shared/Claude/osoitekirja.md; local_593b89a1 = omistajan Keskustelukanava, ei sinne). PK = local_97810d35-a79c-484b-8573-660a4c40eaa6, LS1 = local_45a869de-4d6b-4ed6-a6c9-30fd8442587e, NUI = local_33ba1387-d688-4e44-8e05-10951e61efc0. Viestit jäävät usein jonoon ("ei aloittanut 20 s"): ei toisteta, tulokset kirjataan myös tiedostoihin/paketteihin.

## AVOIMET (järjestyksessä)
1. **Isoisän Kolme veljestä eleven_v3:lla → PK**: TEHTY ja ämpärissä: `aanet/aloitus-aarre-v3b/isoisa-aarre.mp3` (24,93 s, Viisas Kertoja, text-to-dialogue, yksi otto, portti 0/0) + `seikkailu/aloitus-aarre-v4/aarre.json`. PK ilmoitti kytkeneensä (669d945c9, käännös käynnissä). Omistajan päätös 14.10. 12.16 sanatarkasti: "isoisän aloituskertomus kolmesta veljestä on generoitu väärällä moottorilla. isoisän teksti pitää generoida aina sillä vanhemmalla mallilla, koska se kuulostaa paremmalta silloin." → POIKKEUS aina-turbo-sääntöön: isoisä AINA eleven_v3 (tools/generoi-avaus.mjs-resepti). Muut isoisän turbo-tekstit (PT:n päätettävä, ei uusintaa ilman PT:tä): kaari-184 (18 luentaa, paketit kaari-184-vienti/-v2/-taso) ja fokus-luennat-5 (5 kpl).
2. **Max Q -kolmiosainen → PK**: TEHTY ja ämpärissä kiinteillä poluilla `audio/efekti-raketti-maxq-nousu.mp3` (5,0 s, −20,3 LUFS) ja `…-maxq-isku.mp3` (2,2 s, −15,6 LUFS) (PK: manifestia ei tarvita). Omistajan pyyntö 18.2x sanatarkasti: "Max q hetkeen voisi tuoda vielä jonkun lisä ääni efektin. Voi olla jokin muu kuin aito. Joku kiihtymistä kuvaava ääni. Kävisikö kun lentokone rikkoo äänivallin tai joku sähkömetron kiihdytys ääni tai vastaava." Lähteet Raamatun järjestyksellä: 1) Sonniss (käytetty; aXLsound Planes 10 Takeoff BOOM tempo 2× ilman sävelkorkeuden siirtoa + Riser_16; Low Boom 3 + Bluezone sonic boom 002 + cinematic impact boom 003), 2) Soundly Pro, 3) Freesound CC0 (haut aanihaku.yml antoivat 0 osumaa; ei tarvittu). Kuuntelematta. Työ: proto-3d/_tyo/maxq-efekti-20261014/tee.py; paketit _valmiit/iss-raketti-maxq-lisa-vienti-20261014 (kolmiosainen + manifesti v11, ei käytössä) ja iss-raketti-maxq-nousu-isku-vienti-20261014.
3. **ÄÄNILÄHTEET-inventaario PT:lle** (omistajan pyyntö; tiedostoon, PT kirjaa Raamattuun): EI ALOITETTU. Jokaisesta lähteestä lisenssi, käyttösääntö, säilytyspaikka NAS:lla/T7:llä, kuka hakee, tilausten ehdot. Lähteet: Soundly Pro (EULA: tilauksen päättyessä peliin viemättömät raakatiedostot poistetaan), Sonniss GDC (rojaltivapaa, ei nimeämistä; T7 4TB/sonniss/{2017 zipit,poiminta} ja T7 4TB/koodaus/Soniss/Sonniss-N + GDC 2020/2023 kansiot), Freesound CC0 ja CC BY (vain Actionsin aanihaku.yml + avain; CC BY → nimeäminen js/lahteet.js), ElevenLabs (isoisä v3, muut turbo), NASA PD, Commons, omat äänitykset, Aalto OK5 -huonevaste (CC BY 4.0), Yle Arkisto (CC BY), CGEffex (CC BY) ym. Tiedot saa paketeista `_valmiit/*/LAHTEET.md` (grep Lisenssi) ja äänisivun LAHTEET-rivit. Tulos: docs/raportit/aanilahteet-inventaario-<pvm>.md, polku PT:lle.

## VALMIINA mutta ODOTTAA (ei ämpärissä; vienti PT:n käskystä)
- Yövartio 4 ja Ranska 6 ovat jo ämpärissä (LS1 kytkenyt Ranskan); manifest-189.json:iin lisättävät Ranskan rivit: proto-3d/_tyo/ranska-kertoja-20261013/manifest-rivit-ranska.json (LS1:lle ilmoitettu).
- Praha v2 + Ateena v1 pallokierrosten kerronta (36 klippiä): `_valmiit/pallokierros-praha-ateena-kerronta-vienti-20261014` (kuiva-ajo ok, EI ämpärissä).
- Omistajan äänisivun valinnat odottavat: sello x3 (andante/moderato/allegretto), ISS-lähtölasku (v1 jo ämpärissä, raketti-lahtolaskenta-v1).
- ISS-selitteiden (Kuvat-galleria) generointi: PT:n luvanvarainen; 277 selitettä/73 277 merkkiä, R2:ssa 185 äänitettä (29.9.–5.10.), ≥92 puuttuu; omistajan pyyntö 12.4x: "tarkista, onko kaikki ISS:n tekstit generoitu etukäteen. Ne pitää generoida, jos ei ole. Nyt tuntui, että viivettä oli sen verran, että niitä ei oltu generoitu." PT hankkii luvan määrälle; tarkka puuttuvien lista vaatii säilöavaimen (worker puheenAvain = SHA256 `malli|aani|ohje|teksti`).
- PK:lle ehdotettu raketin kertojan duckkaus (moottori −9 dB); raketti-selostus-v7 + manifesti v10 ovat ämpärissä.

## TÄRKEÄT SÄÄNNÖT (opitut tässä sessiossa)
- Sävelkorkeutta EI muuteta generoidulle musiikille (omistaja 13.10.; muistissa musiikin-savelkorkeutta-ei-muuteta). Tempo-venytys (atempo) puheelle/ääneen kuitenkin sallittu.
- Ämpäri EI ylikirjoita (vie-paketti.sh: "on jo, ei ylikirjoiteta"): muutokset aina uusina nimillä (manifesti v-numero, polku v3b/v4).
- Sana-/Whisper-portti (`aaniportti.py --puhe`) antaa suomelle vääriä hylkäyksiä (Whisper-tunnistusvirheet): ajetaan puheelle ilman `--puhe`.
- Hiljainen tunti (omistaja): ei raskaita ajoja; ei äänen soittoa kaiuttimista (ei afplay); simu/Mac-ajo vain mykistettynä. Kuittaus "ÄÄNI Äänittäjä: ei mitään" annettu.
- ALUEET Äänittäjä (vastuukartta): musiikki (Lyria) + äänet (ElevenLabs) + ääniportti/häiriötarkistus + äänisivu (aanisivu-sivusto: index.html, valinnat.js, julkaisu `zsh /Users/Shared/Claude/julkaisija-tyokalut/aanisivu-julkaise.zsh`) + vientipaketit proto-3d/_valmiit/*-vienti-* (vie-paketti.sh) + työkansiot proto-3d/_tyo/<aihe>-<pvm>; EI pelikytkentöjä.
- Äänisivulla "Hyväksy kaikki" -nappi jokaisen osion otsikon alla (valinnat.js); rastit tallentuvat vain omistajan kirjautumisella (ei merkitä hänen puolestaan).

## Tämän session tehdyt (14.10.): vientipaketit ja polut
Kolme veljestä v3b (+data v4), ISS-kupoli v1+v2 (+telakointi), raketin lähtölaskenta v1 + avaus (manifesti v9), selostus v7 + manifesti v10, ISS-loppu 7 klippiä (iss-loppu-v1.json), Tavli/Mylly-tavoitteet (opas-v2.json), museon askelsarja kaiulla (museo-askeleet-v1/…sarja-sali.mp3, manifest-v2.json), Max Q nousu/isku. Odottavat paketit: ks. yllä.

## Tekniset
- ElevenLabs-avain `source ~/.zshrc` (ELEVEN_API_KEY); Lyria: GOOGLE_API_KEY samasta. Cloudflare-tunnukset samasta (R2-listaus API:lla toimii: accounts/$CLOUDFLARE_ACCOUNT_ID/r2/buckets/matkakirja-puhe/objects?prefix=).
- Freesound: `gh workflow run 326102787 -f tila=ehdokkaat -f haku=… -f lahteet=freesound -f maara=10` (syöte on `maara`, ei lukumaara; concurrency peruu odottavan ajon → aja yksi kerrallaan).
- numpy-venv: proto-3d/_tyo/venv-aaniluokitin/bin/python -I (ei muuta numpya); AST: _tyo/pallo-lyhty-v2-20261012/ast_top.py.
- Kertoja-putki (tempo 1,10×): proto-3d/_tyo/taidemuseo-kertoja-20261011/tee.py ja johdannaiset (ranska-/iss-kupoli-/yovartio-kertoja-… kansiot).

## PÄIVITYS 15.10.2026 klo ~11 (tilinvaihto; Postivahdin pyyntö) – kaikki ämpärissä ellei toisin mainittu
Osoitteet: PT local_74630a27-8c1b-4ac3-9143-538efab8cbcd, PK local_97810d35-a79c-484b-8573-660a4c40eaa6, NUI local_33ba1387-d688-4e44-8e05-10951e61efc0, LS1 local_45a869de-4d6b-4ed6-a6c9-30fd8442587e, KK (omistajan Keskustelukanava) local_593b89a1-2514-4d74-b956-2a73db862382. Viestit jäävät usein jonoon ("ei aloittanut 20 s"): älä toista, kirjaa polut paketteihin.

### Tehty ja viety (polut ämpärissä)
- ISS-raketti: lähtölaskenta v2 `audio/raketti-lahtolaskenta-v2.mp3` + manifesti `audio/raketti-aanet-v12.json` (iskut mitattu energia-alusta tasan 1,00 s, T0 5,0 s; v1:n ElevenLabs-aikaleimat olivat −0,08…+0,10 s pielessä); selostus v7 + manifesti v10; Max Q `audio/efekti-raketti-maxq-nousu|isku.mp3`; Andøya-avaus + manifesti v9; valas `audio/efekti-raketti-valas-parskahdys|roiske.mp3` (+ `audio/iss-192/valas-*.mp3`).
- ISS-kupoli v1/v2 (+telakointi), ISS-loppu (7), ISS-kamera `audio/iss-kamera-v1.json` + `audio/iss-192/iss-kamera-*.mp3`; ohje `audio/iss-192/ohje-ohjauspaneeli.mp3` (omistaja hyväksyi); Pulu Max Livia v4 `audio/iss-192/pulu-max-livia-v4.mp3` (omistaja hyväksyi 08.1x); telakoinnin Sojuz-radio `aanet/iss-v1/radio/iss-radio-sojuz-telakointi-alle.mp3`.
- Skanneri `aanet/cupola/skanneri/v1|v2/` WAV: avaus (v1 0,23 s; v2 `avaus-pitka` 0,72 s), sirina, rivi (v2: Soundly SND83198), sulku, kirjain (Sonic Bat) ja valittu `iss-skanneri-kirjain-mekaaninen.wav` (omistaja valitsi 1 "matala mekaaninen", Soundly SND163994). HUOM: ylikirjoitusta samaan nimeen EI tehty: ämpärin objektit ovat immutable (1 v) → NUI vaihtaa tiedostonimen koodissa; PT/KK:lle ilmoitettu (viestit jonossa).
- Museo: Moderato + 3 uutta (soittolista `audio/museo-sello-soittolista-v1.json`; moderato-2 harppumainen, -3 viulumainen AST:n mukaan), adagio, askelsarja kaiulla, askel-parketti, shakki; Ranska 6 puheklippiä + Ranskan salin 51 teoskertomusta `aanet/taidemuseo-kertoja-v2/ranska/<id>.mp3` + `ajat/ranska/` + `manifest-rivit-ranska51.json` (LS1 kytkee; hän kysyi "kohdat/"-polusta → rivin `aani`-kenttä riittää); Yövartio 4; Praha v2 + Ateena v1 pallokierrosten kerronta (36) VALMIS mutta EI ämpärissä (`_valmiit/pallokierros-praha-ateena-kerronta-vienti-20261014`); ISS-kupolin 17 jaksoa ämpärissä.
- Lautapelit: Tavli/Mylly-tavoitteet (`aanet/pelit/opas-v1/` + opas-v2.json). Kolme veljestä isoisä eleven_v3 (`aanet/aloitus-aarre-v3b/isoisa-aarre.mp3` + `seikkailu/aloitus-aarre-v4/aarre.json`).
- ÄÄNILÄHTEET-inventaario: `docs/raportit/aanilahteet-inventaario-20261014.md` (306efb1f9).

### AVOINTA
1. Skannerin kirjainääni: NUI vaihtaa nimen `iss-skanneri-kirjain-mekaaninen.wav` (TF 192 -ehto) tai PT päättää vanhan objektin poistosta (Julkaisija).
2. ISS-selitteiden (Kuvat-galleria 277 kpl, 73 277 merkkiä) etukäteisgenerointi odottaa PT:n lupaa määrälle; R2:ssa vain 185 ääntä, ≥92 puuttuu; tarkka lista vaatii säilöavaimen (puheenAvain SHA256 `malli|aani|ohje|teksti`).
3. Praha/Ateena kerronta vientiin PT:n käskystä. Soundly-lataus (kuukausipassi, uusia scifi-ääniä) vaatii GUI-ikkunan (näyttö vapaana ~15 min).
4. Moderato-2/-3 soitin voi olla väärä (harppu/viulu) → PT/omistaja päättää poistetaanko soittolistalta; uusi otto vaatii luvan.
5. Ranskan 51 kertomuksen nimien ääntämys (Géricault, Delacroix, Cha-U-Kao, Moulin de la Galette ym.) kuuntelematta.

### Opitut säännöt (uusia)
- vie-paketti.sh: kansion nimessä pitää olla `-vienti-`; kansiopolussa ei `..`; ämpäri ei ylikirjoita; nimeä muutokset uudella polulla/versiolla.
- Isoisä AINA eleven_v3 (omistaja 14.10.); muut turbo; ElevenLabs-aikaleimat sopivat lauseajoitukseen mutta EI iskun rytmitykseen → mittaa energia-alku.
- Soundly-lataus vain GUI:lla; oma kirjasto (Sonniss ~2 850 + Soundly 1 130 tiedostoa NAS/T7) on laaja – käy läpi ennen Freesoundia (omistaja 15.10.: "meillä on paljon niitä ääni lähteitä"). Raamatun järjestys: Sonniss → Soundly → Freesound CC0.
- Työkansiot `proto-3d/_tyo/<aihe>-<pvm>/` (iss-lahtolasku-20261013, iss-kupoli-kertoja-20261013, ranska-kohdat-20261014, skanneri-aanet-20261015, valas-aanet-20261015, kirjain-vaihtoehdot-20261015, maxq-efekti-20261014 ym.) sisältävät tee.py-skriptit.
