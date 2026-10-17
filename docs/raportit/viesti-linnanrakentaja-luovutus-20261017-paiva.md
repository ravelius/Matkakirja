# Linnanrakentajan luovutus 17.10.2026 klo 11.00 (Opus) – konteksti 35 %, Postivahdin kova raja

Edellinen: `viesti-linnanrakentaja-luovutus-20261017-aamu.md`. Viestit lähetetään AINA session id:llä (`/Users/Shared/Claude/osoitekirja.md`):
- PT local_5df52e10…
- VS local_c238f4af…
- KS local_eec7f158…
- SK local_72d15713…
- JU local_5cb16c00…
- Postivahti local_a24c43c0…

PT:lle enintään 3 riviä ja ABSOLUUTTISET polut.

## 1. SEURAAVAKSI (Tivoli, LR vetäjänä – omistaja 09.46 pyysi, 09.59 "Kyllä (Suositus)")
1. **Codexin erä A (2 kuvaa)** on tilattu postilaatikkoon 58b6551df (`posti/linnanrakentaja-codex-tivoli-era-a-20261017.md`).
   - **Palautus:** `posti/tivoli-era-a-20261017-vastaus/` (`tivoli-Q110289-a1-paiva.png`, `-a2-ilta.png`).
   - **Kun kuvat tulevat:** tarkista ne (ei tekstiä, ei logoja, ei Margrethen verhoa, kohteet oikeissa suunnissa tilauksen
     taulukon mukaan) ja lähetä polut PT:lle. PT näyttää ne omistajalle Keskustelukanavan kautta.
2. **Kun omistaja on hyväksynyt erän A:** lähetä luonnokset postilaatikkoon.
   - **Luonnokset:** `_valmiit/tivoli-v1/tilaukset/LUONNOS-codex-tivoli-era-b.md` (täsmälleen 16 kuvaa) ja
     `LUONNOS-codex-tivoli-glb.md` (8 GLB-mallia).
   - **Liitteet:** `tavoite/kulmat.json` ja `tavoite/pohjat/*.png` (16 + 16) kansioon `posti/tivoli-era-b-<pvm>/`.
   - **Ennen lähetystä:** täytä luonnosten <pvm>-kohdat ja erän A hyväksyntäaika. **PK:n pitää hyväksyä GLB:n solmurakenne**
     (liikkuvat osat erillisinä solmuina on poikkeus 3D-pohjan "yksi mesh" -säännöstä).
   - **Generointiraja:** yhteensä 18 kuvaa (A 2 + B 16), eikä muuta generoida.
3. **Vaihe 4 (GLB-mallit vastaan):** tarkista IoU, korkeus ±5 % ja budjetti (`mallit/<kohde>/SUUNNITELMA.md`). Tee `omat-mallit`-paketti
   9 kohteelle, jokaiselle oma leikkaus (`leikkaus/<kohde>.json`; CesiumOmatMallit hyväksyy polygonin per kohde), ja `INTEGRAATIO-k1.md`.
4. **Vaiheessa 5 PK:lle välitettävät:**
   - äänimanifesti **manifest-v2.json** (ÄÄ 2b2c5fc50)
   - lähitarinat (SK 9863fa6f7)
   - karusellin siirto ENU (−26,8, −13,5).

   Kaikki on koottu `_valmiit/tivoli-v1/SUUNNITELMA.md`:n loppuun.
5. **Louvre:** yhteinen k66 (VS: `louvre1/v6k18-lv2f-k66vs-vesi`, md5 d956ac58/5c166140/73b452e7) = LR:n k65 + VS:n sävy, vesi ja altaat.
   - Pari on JU:n vuorolla, ja PT ohjaa sen omistajalle.
   - Altaiden tummuus on VS:n k68.
   - LR:llä ei ole Louvreen avointa työtä ennen PT:n palautetta. Seuraava LR-muutos on k67-geometria vain PT:n pyynnöstä.

## 2. TEHTY 07.50–11.00
- **Museosalien tarkistus** (juna 199): kaikki 115 teosta, 44 veistosta ja salien GLB:t löytyvät ämpäristä. Raportti
  `/Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/museosalit-tarkistus-20261017.md`.
- **Louvre k65:** karsinta 247,5 → 242,1 k. Horlogeen tulivat korinttilaiset kapiteelit, ikkunapäätyjen reliefit ja kello r 1,2 → 0,6
  pylväsparien väliin köynnösreliefeineen. Vienti md5 6b94513e/064b26be/0d72f13f. k64-GLB:t ovat tallessa `tavoite/kierrokset/k64-glb/`.
  Kirjanpito: `_valmiit/louvre-v1/VERTAILU.md`.
- **Tivoli:**
  - suunnitelma #4790, #4792 ja #4793 (main d77a6504f → 76b11995e)
  - erä A tilattu
  - KS:n vaihe 1 kuitattu, päätökset: Himmelskibet 80 m, Tårn 56 m, Rutschebanen 26/15 m, karuselli = Svingkarrusellen
  - leikkausrenkaat (9)
  - 8 mallisuunnitelmaa
  - erän B pohjakuvat
  - tilausluonnokset

  Kaikki on hakemistossa `/Users/Shared/Claude/proto-3d/_valmiit/tivoli-v1/`, ja työkalut ovat `lahde/`-kansiossa (`leikkaus.py`,
  `tarkistus.py`, `massat.py`, `kuvaa_tivoli.py`, `kuvaa-kaikki.zsh`, `mallisuunnitelmat.py`).

## Opit
- `kuvaa_louvre.py`:n LiDAR-maskivaihe on rikki 16.10. jälkeen: else-haara on väärän if:n alla, joten maski tulee täysvalkoisena.
  Tivolin kopiossa vika on korjattu, ja Louvren LiDAR-polkua ei nyt käytetä.
- LiDARin 0,4 m:n nDSM näyttää puut piikkeinä. Massakuviin kannattaa ottaa ympäristö OSM-jalanjälkinä ja tehdä 2 m:n avaus.
  Ohuet kohteet (masto) jätetään avaamatta.
- Kameran paikan suunnat lasketaan koordinaateista ennen Codex-tilausta. Ensimmäisessä erän A kamerassa torni oli kuvan ulkopuolella.
- Jos rajaus tehdään monella omalla mallilla, kukin malli saa oman leikkausrenkaansa, eikä siltoja tarvita.
