# Pelikoodari: luovutus 1.11.2026 klo 04.40 (konteksti 28 %, pehmeä raja)

Edellinen: -20261101-0220 (sen Kesken 4 = edellisen Kesken 3–4 yhä voimassa). Muistin tila: pelikoodari-tila-20261018-aamu.md.
Proto-worktree wt/proto-pelikoodari-reitti-216 (haara pelikoodari/reitti-216, kärki **6fbd10a68**, ei pushattu: protolla ei originia).
Työkansio /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/reitti-216/ (c5g/, c5h/, c5i/: arkit + *-havainnot.txt;
c5g/arkki.py = kuva-arkki: `python3 c5g/arkki.py <lokikansio> <ulos.jpg> <alku> <loppu> [sarakkeet]`).

## Valmista tässä vuorossa (haara pelikoodari/reitti-216, kaikki paketit ämpärissä 200)
- c5g (1d6f7463d): OVET OK, PT kuittasi – h-zhongyoumen/-zhongzuomen lehdet kiinni b-43…44, auki sisäänpäin b-45, ei seinästä.
- 4bf4e1591 EDUSTA: LAV:n kielletty-edusta-v1 (q-duanmen + q-chaofang) EdustaKansiona rakennusten rinnalla (sama rakennukset.json-
  muoto, LOD + peittokartta, ei törmäystä) + ulkorengas v10 → v13. c5h: Duanmen näkyy pääportin tunnelin läpi (leivottomana).
- MAALIKAMERA pääportilla (JuoksuMaaliKuva.DronePaaportti, JuoksuV4Maailma maaliKulma/maaliKentta): 7f84a8a7c → e510ec6d6 →
  **28e619584** (PT 06.3x "Puyi ensin"): 5 m taakse, 1,2 m, 13° ylös, kenttä 60° → Puyi ~1/4 tunnelinsuulla; 1 s:n pysähdyksen
  jälkeen 8 s:n hidas nousu (12 m, 3 m, 18°, 75°), räystäs tulee kuvaan. Ajon dronekamera ja kallistus ENNALLAAN. Testi
  PaaportinMaalikuvaPuyiEnsinJaHidasNousu; Peli-testit 786/786, unity-tarkistus 0 virhettä. c5i-arkki PT:lle 04.4x (vastaus auki).
- dab1272d6 C2 v26 → kielletty-c2-v29 (LAV kaiteeton-v1: valo_rgbm kaiteettomiin LOD0:ihin A 17/17, F 18/18, G 3/3 UV1).
- 350627ca6 → **6fbd10a68** muurikate → kielletty-muurikate-v35 (C3-kansio + MuurikateTiedosto; v26-pohjaan leivottu valo
  ilman osasarjavarjostajaa). LAV:lle vastattu: pohjan V4_palatsi_katto NÄKYY aina, V4_marmorikaide > 40 m näkyy / < 40 m C2:n tilalla.

## Kesken / seuraava
1. Odota PT:n vastaus c5i-arkkiin (proto-3d/_tyo/pelikoodari/reitti-216/c5i/arkki-maali-b57-b68.jpg). Jos säätöä: vain
   JuoksuAvaus.cs:n Paaportti*-vakiot (testi kertoo, jos Puyin jalat putoavat kuvasta).
2. LOPULLINEN VIDEO 6fbd10a68:sta (tai uudemmasta) PT:lle → KK (KK tarkistaa myös sivueunukin ennakoitavuuden ≥ 2,5 s).
   Kuva-ajot: aja-c5i.zsh-malli (sed c5i → c5j), odota ensin vapaa kone (ei Esikatselu.Aja/devicectl/todistusajo, levy ≥ 70 Gi).
3. Sen jälkeen merge-pyyntö NS:lle (pelikoodari/reitti-216, kärki 6fbd10a68 tai uudempi).
4. Edellisen luovutuksen Kesken 4 (botin uupuminen, kuva-ajoissa elinvoima-apu; s-osa/MK_TAUSTA, ≤ 4,5 m, valo-k1-216) ennallaan.
Huom. maalin hetki vaihtelee ajoittain (botti): c5g b-97, c5h b-108, c5i b-59 – etsi maali lokista ("maali Meridiaaniportti",
kameran paikka pysähtyy).
