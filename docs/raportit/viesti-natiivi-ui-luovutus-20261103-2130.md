# Natiivi-UI: luovutus 3.11.2026 klo 21.30 (konteksti 25 %, pehmeä raja)

Edellinen: viesti-natiivi-ui-luovutus-20261103-1955.md (sen jono käsitelty: 1 ja 2 todistettu, 4 tehty, 3 odottaa).
Proto-repo: /Users/Shared/Claude/proto-3d/Matkakirja-proto, peili natiivi-backup peili/proto/<haara>. HUOM: viestien "21.4x/21.5x" = todellisuudessa 21.1x–21.2x.

## Tehty
- **e971e1992 (lähizoomin VIKA) todistettu** iso paketilla ea2d6912f: kortti auki → lähizoom OK huippu 3659 Mt (ennen VIKA 4190),
  RenderTexture(piilo) ei kasva; oikea sulku (ui sulje = ✕, kuvasumennus pois 0,3 s sulusta) → lähizoom OK 3563 Mt.
  proto-3d/_tyo/natiivi-ui/todistus-e971e1992-ea2d6912f-20261103.md.
- **Elävä kartta vaihe 1 20b21efee todistettu** (JU ef37c2b84 OK; kuvapari _tyo/natiivi-ui/elava-kartta-20b21efee-pari/) → PT junalupa 218,
  JU liitti: 2ee44fed0 → iso paketti nyt **4397cf20d** (= 2ee44fed0 + 40ed9da3c). JU ajaa 4397cf20d: käännös + savu + muistivahti + salihyppy.
- **Salihypyt 40ed9da3c** (natiivi-ui/aloitukset-218): juoksupelin salit ys/tj/cx/ty/xf Testihypyt.Aloitukset-listaan sk3-riveistä
  (PK: yhtä salikomentoa ei ole). Junalupa, paketissa 4397cf20d. Laitetarkistus 'ui suora juoksupeli-sali-ys' JU:n ajossa.
- **iPad-lukko jumissa 20.15–21.02** (JU:n kuollut keisari-pid 37060): JU vapautti.
- **PT:n erä:** 1) Alkuintro Ateena/Košice/Vilna ESTETTY (Ateena Kreikan laki 2.135; Košice/Vilna ilman introa, omistajan kysymys 26.10.),
  työlistarivi kirjattu. 2) Yhtenäiset napit: tämän päivän osat pohjia vasten (_tyo/natiivi-ui/pohjat-tarkistus-20261103.md) →
  **natiivi-ui/pohjat-218 kärki 7f0ccc451** (4397cf20d:n päällä): 723f738c0 kuvamerkeille yksi reuna 1 pt (SaapumisKuvat.MerkinReuna, 2.205),
  odotusilmaisimen nimi Tyylikirja.Kirjain.Arkki, kommentit; 7f0ccc451 trailerin soikio Kuviot.Hehkupiste + Kuulto.HimmennysTumma55
  (PT:n päätös), tyylikirjaan EDISTYMINEN-variantti SAAPUMISEN ODOTUS (lähde 6bd3f9693704). unity-tarkistus 0, tyylikirja-tarkistus OK.
  PT: junalupa (723f738c0; JU:lle kerrottu kärki 7f0ccc451) seuraavalle kierrokselle. Web-puoli **PR 6216** (tyylikirja.json + styles.css).

## SEURAAJAN JONO
1. **4397cf20d-tulos** (JU): savu + muistivahti OK, salihyppy ys perillä (kuvat 40/60 s). VIKA → selvitä.
2. **Kuvapari PARIISI Notre-Damen edessä** ennen 4397cf20d / jälkeen 7f0ccc451 (pyydetty JU:lta 21.2x) → PT:lle (PT vie KK:lle).
   Jos KK hylkää: palauta VarjoKuva/0,5 (7f0ccc451:n TraileriLiike-muutos) ja kysy PT:ltä.
3. **PR 6216** (tyylikirja-variantti): vihreä → merge kaavan mukaan; sen jälkeen proto- ja web-tyylikirjan lähde täsmää (6bd3f9693704).
4. Elävä kartta vaihe 2 vasta KK:n/PT:n suunnitelman jälkeen (muiden kaupunkien json + Codex-kuvat, liikkujat NS:n AsetaLiikkuvaan).
5. Avoin (pohjat-tarkistus D6): TraileriLiike lisää yhä luokan mk-traileri__varjo, jolla ei ole USS-sääntöä – siivous kun koskee tiedostoon.
