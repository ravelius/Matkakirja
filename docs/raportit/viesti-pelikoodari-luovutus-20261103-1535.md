# Pelikoodari: luovutus 3.11.2026 klo 15.35 – juna 218

Edellinen: -20261103-1401 (c9c715a1e), voimassa ellei alla toisin. Syy: konteksti (hook 27 %).
Testit: bash Peli-testit/kaanna.sh 805/805; zsh tyokalut/tarkista.sh 0 virhettä (unity-tarkistus 0).

## Tehty 14.03–15.35
- **218ae/af ajettu (JU L1 14.15–15.16)**. Tulokset: sali-218ae/ ja sali-218af/ (huom-, kamera-, mp4).
  - taso1b af: alkulento ok (995d5d1cb), ohjeet kerran ok → KK-paketti sali-218af/kk-taso1b/ (video + arkki-01…05), KK katsoi 15.26.
  - Salit ys tj cx ty xf af: kamera sivuoven seinän/ristikon takana (ys 6,5–7, tj 8, cx 4, ty 11, xf 6 s). Syy: polkukamera EI alkanut;
    jokainen "polkutukos" oli 1. näytteessä 0,5 m keisarista (oviaukon 1 m ruutu huippu 3,9 ala 0) → kaikki polkuehdokkaat hylättiin.
    **Korjaus 9d9580224** (polku-218af): KameraPolku.Lahella – näyte ≤ DroneNosto.PolullaVapaa 0,5 m keisarin juoksemasta polusta ei tuki.
  - cc ae: Puyi korokkeella ok, MUTTA Maali-kortti peitti hänet. Syy: tyokalut/esikatselu.sh kopioi Editor/Esikatselu.cs:n
    TYÖKALUPUUSTA (wt proto-pelikoodari-kivi-216, haara pelikoodari/piirtajat-218), ei ajettavasta haarasta → KierrosKatseAlas puuttui.
    Korjattu työkalupuuhun c4dd3a711. MUISTA: Editor-työkalumuutokset myös kivi-216-puuhun.
- **KK 15.26 kohta 1 (iso aukio 78–92 s ja 93,5–96 s pelkkää kiveystä)**: kameraväli t 52–66: SisakatonRaystas 2,3→3,8 m koko aukion
  ajan (katon suorakaide KattoHaivytys.Etaisyys kattoi aukion), rnosto 5,3 → kamera 5,3 m, katse jyrkästi alas. **Korjaus 131103d47**
  (polku-218af): JuoksuSokkeloMaailma – keisarin ruudun huippu < pää (TaivasPaaY 2 m) eikä avoimessa huoneessa → taivaan alla:
  ei SisakatonRaystasta eikä RaystasKohdassa-ennakkoa. HUOM: 93,5–96 s (t 68–71) on porttikäytävä (katon alla 1, kulma 66–72°) –
  sitä tämä ei muuta; tarkista ag:n taso1b:stä, ja jos yhä pelkkää kiveystä, porttikäytävän kulma (YhtKulmaMax katon alla) kuja-kulmaan.
- **Ajo JU:lle (jonossa L1: LAV → VS ISS → tämä)**: zsh /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/sali-218ag/ketju-ag.zsh
  ys tj cx ty xf cc taso1b (runko pelikoodari/polku-218af = 131103d47; JU:lle lähetetty 15.31, tarkista että taso1b on mukana).
- LAV: ovilehdet (*_ovilehti_*_avaus±N) peli avaa → GLB:ssä kiinni; juhlasalin pylväät eivät ole estossa (PalatsiEstoLeivonta ei lue
  avoimet-glb:tä; Kultaiset/avoimet-v2-tormays.json vain testiaineisto). avoimet-v53 kytketään LAV:n pyynnöstä (sha + SHA256SUMS).
  osasarja-v12 = cce530a1b (kapea-reitti-218), LAV ottaa parin 02+06 (PT 14.5x).
- NUI keisari-nosto 6119d4a12: merge-tree polku-218af ja kapea-reitti-218 kanssa 0 konfliktia; Tauolla pysäyttää saanto.Askelin → ok.

## SEURAAVA
1. ag-tulokset (sali-218ag/): salit – grep huom-*.txt "polkukamera alkaa" (pitää löytyä) ja ruudut kuten yllä; cc – kortti Puyin
   alapuolella pidossa; taso1b – aukio 78–92 s (video) rakennukset + taivas, ei kiveystä. Kuva-arkki: ffmpeg -ss T -t 4 -i X -vf
   "fps=2,scale=320:-1,tile=4x2" (drawtext ei ole käytössä).
2. KK 15.26 kohta 2: vartija menee pojan läpi 95–96 s (taso1b). Selvitä: skenaariossa sk3-taso1b rivi 319 `ui juoksupeli botti 1`
   (ei kuolemattomuutta löytynyt). Väistettävän vartijan kontakti: JuoksuV4.cs ~2023 ja 2345 (sivuvartija, KontaktiZ). Vastaa KK:lle
   (PT:n kautta) onko ajo kuolematon; muuten kiinniotto tai pysähdys, ei läpimenoa.
3. KK 15.26 kohta 3: 27,5–30 s (video) eunukki ovella lähikuvana (avauksen eunukki kurkistaa, JuoksuV4Maailma ~2727) ja Puyi poissa
   ruudusta ~2,5 s → rajaus, jossa molemmat näkyvät. Kuva: /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/kuvat/218af-taso1b-25-31.jpg
4. Kun kaikki ok: salien paketti KK:lle samaan tapaan kuin kk-taso1b (video + fps=1,scale=300:-1,tile=6x4).
5. Codex-toimitukset odottavat yhä (ks. -1401 kohta 5); postilaatikossa ei vielä 14.0x.
6. Checkout /Users/Shared/Claude/Matkakirja-pelikoodari: luovutushaara koti/pelikoodari-20261103-1535.
