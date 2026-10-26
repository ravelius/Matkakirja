# Lavastaja: luovutus 26.10.2026 klo 14.4x (kova raja 35 %; b6-vertailuajo v47|v48 käynnissä luovutushetkellä)

Edellinen: `docs/raportit/viesti-lavastaja-luovutus-20261026c.md` (ba994b07e). Haara `linnanrakentaja-tyo-20260929`.
Proto: `wt/proto-lavastaja-muoto`, haara `lavastaja/muoto-210`, osoitin **eeac3ba50** (tausta-v56, rakennukset-v47, muurikate-v16;
paikallinen, ei originia). Juna 211 (natiiviseppa/juna-211, Unity b6) lukee jo samat nimet (v56/v47/v16, avoimet-v47).

## Valmiit tänään

- **Paketti56 kuitattu ja viety**: tausta-v56 (SHA256SUMS 48084969e162…), rakennukset-v47 (64a9bd73c063…), muurikate-v16
  (51b5562fa180…). JU vei ämpäriin 12.59–13.05, NS sai osoittimen eeac3ba50.
- **Salin kysely** (Valoseppä): juhlasali.glb:ssä ei ole UV1-osaa katon tai muurin kohdalla (korkein y 2,9). Pilotti 5
  (`leivottu-sali/avoimet-pilotti-leivottu-5/`, materiaalit nimetty "… sali") **EI käyttöön**: VS:n mukaan peli ryhmittää
  kuvan, värin ja lajin mukaan, ei nimen. Odotetaan VS:n P42:ta ("valo leivotut", 1ff173a1d) → mikä leivottu pinta on sotkussa.
  Pakettinimi tulee olemaan juoksupeli-avoimet-v49 (sali on avoimet-sarjassa, ei maailma-v5).

## Kesken: rakennukset-v48 (PT 26.10. paketti56:n 1:1-tarkistus)

Malli valmis: `kielletty-rakennukset/hallit-v56/kielletty-rakennukset-v48/` (ajo `tyokalut/aja_hallit_v56.zsh`, loki
`kielletty-rakennukset/aja_hallit_v56.log`). Muutokset v47:ään:
1. Porttihallien t-portti-m15/120/m216 jalustan korkeat pystypinnat (≥ 0,6 m, |ny| < 0,3) V4_marmori → **V4_sokkeli**
   (`tyokalut/hallit_jalusta_sokkeli.py`): pelin marmori (laji 16) piirtää pystypinnat tasavärinä, sokkeli (laji 11) kivikerroksina
   saumoineen kuten havainteessa (aukio03). Kaikki LODit.
2. LOD0-valo 1024 näytettä + 5 × 5 -suodatus (`leivo_malli.py`: uusi SUODATA/SUODATA_R, oletus pois; .v55 = edellinen).
3. **Taihemenin ja g-jalustan keskiluiska** V4_kaiverrus → V4_marmori (`tyokalut/kaiverrus_marmoriksi.py`, vain lod0, ei uutta
   leivontaa): PK:n laitekuva vaaka-aukio-09 – Codexin keskiportaan-laatta (sRGB ~218, ei kaiverrusta) piirtyi valkoisena.

Tarkistus: `havainne-kuja40/juuri-v48` (linkit rakennukset-v37…v43 ja -v47 → v48). Vertailupari b6:lla käynnistettiin 14.2x:
`REF=natiiviseppa/juna-211 nice -n 15 portti-lr.sh p15 p15n p216 p216k` ensin juuri-paketti56 (v47) → `ajo-portti-b6-v47.log`,
sitten juuri-v48 → `ajo-portti-b6-v48.log`. Kokoa pari kuten `hallit-v56/porttipari-v47-v48.png` (p15 ja p216 riveinä), arvioi
PT:n kohdat: (1) jalustan kyljet kivikerroksina, (2) p216 portaiden läiskät, (3) seinien kulmikkaat laikut. Vihreänä PT:lle
≤ 3 riviä, sitten pakkaus (pohja `pakkaa_v56_v47_v16.zsh`, vain rakennukset-v48) ja SHA:t PT:lle. Myös aukio-09 kannattaa
kuvata (PK: `ui juoksupeli palatsi alku 6.4,-232` + `maali 6.4,-120` + `v4 11`, t ≈ 4 s; keisari ~6,4, −215, katse +z).

## Jonossa (PK 14.3x, PT:n videolöydökset 3–4, b6 + 211-paketit, reitti B alku −147.5,420, siemen 11)

1. ~~Turkoosi palkki maassa~~ – PK korjasi (db9f6b790: avoimen juhlasalin palkisto_±2.7 jäi näkyviin katon häivytyksessä).
2. **Valkoinen ohut vino viiva kiveyksen poikki** mittarissa ~(82, −543), puiden reunustama aukio (sama kuva, oikea): rako
   maapintojen välissä (taivas läpi) vai marmorireuna? Jos rako → korjaus v48:n mukaan.

## Syyt ja opit

- **Editorikuvien kiilat 13.03–13.40 eivät olleet mallien vika** (NS): kuormitettu kone (b5/b6-varjostinten uudelleentuonti
  yhteisessä esikatselukopiossa) → botti ehti juosta pidemmälle ja avasi lisäkorttelit, joiden katot heittivät kiilat porttihallien
  seiniin. `portti-lr.sh`:ään lisätty `ui juoksupeli botti 0` heti palatsin latauduttua (.ennen-botti0 = edellinen).
  Vertaa aina saman tilan ajoja keskenään, ei aiempaan kuvaan.
- Havainne-työkalut: `wt/proto-lavastaja-havainne` on nyt natiiviseppa/juna-211:ssä (d832f38a9; esikatselu eristetty omaan
  datakansioon 9c854518e, ei laitteita). portti-lr.sh:n oletus-REF on yhä juna-210 → anna `REF=natiiviseppa/juna-211`.
- Kujan katteen raidat (PK löydös 4) = k3-kattovarjostin, ei muurikate-v16 (geometria sama kuin v15) → VS.
- Älä käytä `pgrep -f <skripti>` odotussilmukassa samassa komentorivissä (löytää itsensä); odota PID:iä `kill -0`.

## Työkalut (uudet, `kielletty-rakennukset/tyokalut/`)

hallit_jalusta_sokkeli.py, kaiverrus_marmoriksi.py, aja_hallit_v56.zsh, sali_uv1_nimet.py (ei käytössä), leivo_malli.py (SUODATA);
`_tyo/linnanrakentaja/sali-uv1/` (salin UV1-analyysi).
