# Natiivi-UI: luovutus 9.11.2026 klo 16.56 (kontekstivahti 27 %; korvaa -1637:n)

PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31, JU local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd, PK local_d3bb1f78-e2ea-4089-8bae-d106bb1f9ff7.
Worktree /Users/Shared/Claude/wt/proto-natiivi-ui-temple (paikallinen haara natiivi-ui/temple-orbit = b75419ad3, eli 1 commit
remoten temple-orbitin edellä: se commit on remotessa haarana natiivi-ui/kadonnut-tahti). Tarkistus: `sh Linssit-testit/unity-tarkistus.sh`,
`python3 -I tyokalut/pohjavahti.py`. Skenaariot /Users/Shared/Claude/proto-3d/_tyo/natiivi-ui/, lokit /Users/Shared/Claude/proto-3d/lokit/.
Kartuscha (alakulman maa) = pelaajan maa, EI muutosta (omistaja 16.4x). FPV-nimikoe 14f9398b8: PT kuittasi "kelpaa" (KK:lle viety).

## 1. HAARAT (natiivi-backup)
- natiivi-ui/temple-orbit = 755a52fab: a73c5c202 valikko + 606e08631 palkin ✕/kaupunkisulku/Temple-diagnoosi + 9fd044500 (noston kortin
  pin-kuvake pois; Pinnaus.NaytaKuva(url, i, nauha) → "Unohdettu aarre" -kulma palkin pikkukuvaan; PaivitaSelaus: kaupungin nimi vain kun
  Kohde.Kaupunki == KaupunkiNakyma.KaupunkiId) + 755a52fab NIPISTYS EI PYSÄYTÄ KOHDEKIERTOA (OMISTAJA 16.14): PalloKierto
  kierronSormiOdottaa/nipistysKierrossa, KierronZoom(kerroin) → ajo.zoomKerroin, Etene jakaa korkeuden; Mac-zoom samoin.
- natiivi-ui/kadonnut-tahti = b75419ad3 (755a52fab + 3D-TÄHTI KADONNEELLE, OMISTAJA 16.12): PiirrosKerros.TahtiKuva(nimi)/TahtiHehkuKuva/
  OnTahti; NostotKartalla.AsetaTahti3D (kadonnut kyltti && !PiirrosTila), ajastin 83 ms; Kartta.uss .mk-nosto-merkki__tahti3d (36 px).

## 2. AJOT JU:lla
- VALMIS: lokit/nui-temple-palkki-2-ipad-9fd044500 (260 s). Lokirivit ok: kulmanauha, ✕, Lontoon sulku. KUVIA EI VIELÄ KATSOTTU
  (v-1, t-1…4, x-1, n-1/2, p-1, a-1 aarrekulma, p-2) → katso ≤ 1000 px ja arkki PT:lle; sitten pieni iPad (Raamattu 2.217) → juna 223.
  POIKKEUS ArgumentOutOfRange "ui konsoli pois" -kohdassa on vanha (oli jo 88954ff55:ssä).
- PYYDETTY: sk-orbit-nipistys-1 (755a52fab tai b75419ad3), sk-kadonnut-tahti-1 (b75419ad3); lokit nui-orbit-nipistys-1-ipad-<sha>,
  nui-kadonnut-tahti-1-ipad-<sha>. Nipistys myös pienellä iPadilla (PT). Vahti: scratchpadin vahti.sh-malli (sh, ei zsh-globia).

## 3. TEMPLE-PISTE LIUKUU (OMISTAJA 16.12, PT 16.5x: "kiinni maahan") – SYY LÖYTYI OSIN, EI KORJATTU
temple-palkki-2 t-1…t-4: kierron keskus = Templen lat/lon (katse 0 m). Diagnoosirivin muotoilu on VINO (NostotKartalla.KohdeSijainti
string.Format: indeksit siirtyneet; "pinta {7} {8}" näyttää NakyvaLat/ok, "nosto {9}" = MaanPinta.Hae = 90, "kohdenosto {10}" = Nosto = 90)
→ korjaa indeksit. Tasainen kartta: maa 90 m (KorkeusKerroin.TasaKorkeusM). Kyltti (m.Piste) on 90 m:n ruutupisteessä ("nosto"),
mutta PUNAINEN PISTE (valkoreunainen, kuvissa x 1376, y ≈ 1314 = h0-ruutupiste 0 m) piirtyy ellipsoidin 0 m:iin → kuvakulman mukaan
eri maan kohdan päällä = liukuu (65°:ssa ~190 m kehä). Piste ei ole NostotKartalla-merkki (sen Piste = kyltin 611 pt). Etsi piirtäjä:
ehdokkaat nähtävyysesittelyn/kierron kohdepiste, AarrepisteRengas, NostoKerros-maailmamerkki, Lautapelinostot; korjaus: korkeudeksi
MaanPinta.Nosto(lat, lon) kuten merkeillä. Testi: sk-temple-palkki-2 t-1…t-4 ja `ui kohdenostot sijainti Temple-torni`.

## 4. PK:N LIIKETAPPI (OMISTAJA 16.16, PT: sovi PK:n kanssa)
PK:lle kerrottu (jonossa): KierronZoom + ajo.zoomKerroin 755a52fab:ssä; PK:n 8cdb4549c ajoLiikeKerroin/AjonLiikeSiirto-rivit koskematta.
`git merge-tree --write-tree 755a52fab 8cdb4549c`: PalloKierto.cs puhdas, ristiriita vain KameraTappi.cs (PK:n pohja). Odota PK:n vastausta.

## 5. Jono tämän jälkeen
Kohdat 2 (kuvat → PT), 3 (Temple-piste), 4 (PK). Muuten jono tyhjä.
