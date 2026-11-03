# Lavastajan luovutus 3.11.2026 klo 16.28 (TILINVAIHTO, PT 16.26) — LUE TÄMÄ, ÄLÄ VANHOJA

Edellinen: viesti-lavastaja-luovutus-20261103-1412.md (K-polut, juhlasalin suunnitelma). Syy: tilinvaihto.
K = /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/kielletty-rakennukset. PT local_5df52e10-…, JU local_06f8c680-…, PK local_91a1bc27-…
(id:t osoitekirjasta, uudella tilillä uudet).

## TEHTY tällä vuorolla
- Pari 02+06 osasarja-v12 (cce530a1b): PT KUITTASI 15.4x → juna 218 (PT ilmoitti JU:lle). Kuvat proto-3d/lokit/havainne-editori-20261103-152139.
- k4 Blender-tarkistus (2.177) ajettu: proto-3d/lokit/lav-kohta4-20261103/esik-{v52,v53,v53b}-{kaytava,vino,katto}.png.
  Löytö: pituuspalkkien Muted gold -reunus venyi koko palkin kokoiseksi (primitiivikohtainen y-venytys) + alapinta puuttui
  → K/tyokalut/juhlasali_palkit.py korjattu (mitat koko meshistä, uusi alapinta V4_palkkivyo). juhlasali.glb rakennettu uudelleen
  v52:sta (pylvaat.py → palkit.py). Paketti _valmiit/juoksupeli-kk-lavastaja-avoimet-v53-vienti-20261103 UUDELLEEN, SHA256SUMS
  be1978957958 (vanha 42c8f356426f mitätön). EI VIETY. Huom: uudella alapinnalla ja poikkipalkeilla ei UV1:tä → katso editoriparissa 04.
- Pronssit: rakennukset-v120 (runko 97ef79bd6/cce530a1b) sisältää kaikki 42 (8 pr-ryhmää), media 24/24 glb 200, peli lataa json:sta.
  PT halusi kuvatarkistuksen → lisätty saumaajoon (alla).

## KESKEN / JONOSSA
1. JU:n L1-jonossa (3.): `PROTO_LINJA=1 zsh /Users/Shared/Claude/proto-3d/lokit/lav-saumat-20261103/unity/aja-saumat.zsh 97ef79bd6`
   = editoripari 02+03b+05 saumat-v1 (PK kytki 97ef79bd6, haara pelikoodari/saumat-v1-219) + pronssit 06-omapaikoilla
   (Taihedianin kuuterassi lattia 8,13; Taihemen ja Qianqingmen etelästä). Aja VAIN JU:n "VUORO NYT":lla, ~25–30 min.
   Sitten PT:lle: saumapari (sokkelikuva v04 näkyy, ei muuta eroa) ennen junaa 219 + pronssikuvat; JU:lle VAPAA L1.
   PK:lle sanottu: LAV ajaa parin, PK ei.
2. k4 kasetit: Codex-tilaus ac0492a15 (posti/codex-lavastaja-kasettikatto-20261103.md), ei toimitusta vielä (16.2x).
   Toimituksen jälkeen: sisäkaton tasainen osa (Katto alapinta ruoteet, |x| < 4, y ≈ 4,75) → kasettikuva, paketti v53 uudelleen,
   oma Blender-tarkistus (lav-kohta4-20261103/blender/juhlasali_esik.py, Blender /Applications/Blender.app/Contents/MacOS/Blender),
   JU vienti → PK kytkee → editoripari 04 → PT (PT: "paketti PT:lle kun kokonainen"). Kuittaa Codexille postilaatikkoon.
3. Seuraavat: kohta 5 (proto-3d/lokit/havainne-editori-20261103-074203/LAV-erot.md: yleiskuva 07, puut ja katot) PT:n järjestyksessä.

Huom: K/tyokalut/avoimet_glb.py tarvitsee numpyn → aja python3 ilman -I:tä (omat skriptit).
