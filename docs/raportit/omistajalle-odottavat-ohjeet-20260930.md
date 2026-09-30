# Omistajalle annettavat ohjeet, kun versio on TestFlightissa (Päätoimittaja 30.9.2026)

Anna chatissa (lihavoitu ohje + koodilohko), kun kyseinen muutos on omistajan TF-versiossa. Merkitse annetuksi.

## 1. Oma laite pois kävijälaskurista (Pelikoodari 522ec05b / 54c494b3, 99f7d0fc viestikerros) — ANNETTU 30.9. (TF 1.1 (74))

Kummallakin laitteella (iPhone ja M5-iPad), kun uusi versio on asennettu:
1. Safari → kirjoita osoiteriville `matkakirja://omistaja` → Siirry.
2. "Avataanko Matkakirja 3D -apissa?" → Avaa.
3. Peli näyttää viestin "Tämä laite on merkitty omistajan laitteeksi: sen käyntejä ei lasketa."
Poisto: `matkakirja://omistaja/pois`. Selaimissa: `https://matkakirja.app/?omistaja` kerran jokaisella selaimella (annettu 30.9.).

## 2. ElevenLabs v4 Turbo -luenta vertailuun (Linssiseppä 2: PR #3710 4cc37e449, natiivi 09d681d3) — ANNETTU 30.9. klo 22.5x (#3710 mainissa 22.55, worker julkaistu)

1. Päävalikko (☰) → Kehittäjä-kytkin → kirjoita kehittäjäkoodi (sama kuin Pöllön koodi) → Kytke päälle.
2. Noston lukijan valikko (kaiuttimen vieressä) → Moottori → ElevenLabs v4 Turbo → Ääni (esim. Viisas kertoja).
3. Päiväkatto 20 000 merkkiä, sen jälkeen luenta palaa xAI:hin.
Huom: kehittäjätila näyttää myös Kehittäjätyökalut Asetuksissa.

## 3. Olavinlinnan tarkempi kuori ämpäriin (Linnanrakentaja, kun PR #3711 on mainissa) — AJETTU 30.9. klo 18.4x (9168ff621805ac7f)

Omistaja ajaa itse (isot binäärit hash-kansioon, 89 tiedostoa, 815 Mt; päivitetty 30.9. klo 17):
```bash
cd /Users/Shared/Claude/wt/linnanrakentaja-linna-laatu && git pull && zsh tools/dioraama/vie-blender.sh
```
Sen jälkeen Linnanrakentaja commitoi blender.json:n ja Julkaisija mergeää. Täyden laadun laite lataa kerran noin 89 Mt enemmän.
