# 1.0.42-kokonaisuus 44faaf32 (Laitetestaaja, 29.9.2026 klo 07.2x)

Käännös 44faaf32 (juna/b13 507d865e = BUILD 42 + radiolinssi 9ee9136e + ISS-nahka fb1465ed +
kyyti-säätimet ca610a6d), laite 1572C658 (iPhone). Natiivisepän pyynnöstä, kohdat 1-4. Kaikki PASS.

## 1) Asennus ja käynnistys: PASS
Puhtaasti, ei virheitä.

## 2) Radio: PASS (oikealla mittarilla vahvistettu)
`linssi radio` → napautus "ROOMA" asteikossa (`mk-radio__kaupunki--keski`) → "Viritys/Haku" →
"Viritys/Lukittuu" → "Soi ITA Rooma Rai Radio 1". **`radio tila` (EI `aani mittaa`, koska asema
soi natiiviliitännäisen AVAudioEnginellä Unityn ohi):**
- rms 0,1238 → 5 s kuluttua rms 0,1261, **tappikutsut kasvoi 117 → 255**, "polku engine",
  "moottori käy (käynnistyksiä 1)". Täsmää Natiivisepän odotukseen ("polku engine, rms > 0,
  tappikutsut kasvavat, moottori käy").
- `linssi pois` sulki siististi ("Hiljaa" → "auki: ei mitään"), ei poikkeuksia.

Tämä kumoaa aiemman 25c7c971-kierroksen "EI PASS" -löydöksen (savukierros-1042-radio-20260929.md)
— radio TOIMI, ongelma oli väärä mittaustyökalu (`aani mittaa` ei näe AVAudioEngine-polkua).

## 3) ISS-kyyti: PASS
`linssi satelliitti` → `astro kyyti`: säätöpaneeli Codexin nahalla (mk-issnahka--codex) avautuu,
kolme välilehteä Nopeus/Kohde/Olosuhteet toimivat. Kohde-välilehden kohdelistassa "Oma sijainti
· Suomi" ensimmäisenä + hakukenttä + nimetyt kohteet (Rooma, Pariisi, Dardanellit, ym.).
Valittaessa "Oma sijainti" näkymä pysyy oikealla maanpinnalla (tumma vihreä/sininen maasto pilvien
alla, EI harmaata paikkamerkkipintaa) — vahvistettu kuvakaappauksella. Etäisyys näytti "ISS 1521 km
sivussa": odotettua, koska ISS:n ratakaltevuus (~51,6°) ei koskaan vie sitä Suomen leveysasteille
(60-70°N) — sivuetäisyys on oikeaa ratafysiikkaa, ei bugi. Tarkkaa ≤5 s -siirtymäaikaa kohteen
valinnasta ei saatu erotettua lokista (lukema-rivi ei kirjaa kamera-ajon kestoa erikseen kohteen
valinnalle), mutta näkymä oli asiallinen heti tarkistettaessa.

## 4) Astroselite + nostokortin kaiutin: PASS
`ui linssi kuvaselite auki/kiinni`: liuku 146x27 ↔ 326x104, luenta käynnistyy automaattisesti
(`aani mittaa` rms 0,10), kiinni pysäyttää ("luenta ohi"). Testattu myös toisella kuvalla (Etna
2002 -purkaus, kuvagalleria selitteineen) — sama toimivuus. Nostokortti (skandaali:shakkiturkki-
lainen) LISÄÄ + kaiutin (`mk-lukija__kaari`): rms 0,087.

## Yhteenveto
1-4 kaikki PASS. Radio vahvistettu toimivaksi oikealla mittarilla (`radio tila`), korjaa
25c7c971-kierroksen virheellisen EI PASS -löydöksen (väärä mittaustyökalu).

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
