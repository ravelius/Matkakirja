# Pelikoodari: luovutus 31.10.2026 klo 23.45 (konteksti 27 %, PT:n pyyntö)

Edellinen: -20261031-2210 (sen Kesken 4–5 yhä voimassa). Muistin tila: pelikoodari-tila-20261018-aamu.md.
Proto-worktree wt/proto-pelikoodari-reitti-216 (haara pelikoodari/reitti-216, kärki 0555e95b0, ei pushattu: protolla ei originia).
Työkansio /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/reitti-216/ (d3, d4, d5: sk-*.txt, aja-*.zsh, juuri-linkit;
kameraväli-analyysi `python3 -I d3/kameravali.py <unity.log> [min-korkeus]`).

## Valmista tässä vuorossa (reitti-216, Peli-testit 783/783, unity-tarkistus 0)
- 031e85f4c: PT:n linjaus b (tunnelista ulos: vaatiiPidetty = vaatiiLasku = tarve, V ja pito 0) + TaustaKansio v81 → v89b,
  UlkorengasKansio v9 → v10.
- ca2ce6b1a: PT:n linjaus a (b:n lisäksi): ennakossa läpikulun katon alla oleva kohta on aina lattiaa (myös ennen porttia).
- e53eb7cdd: Peli-testit/Testit/PeittoKohtaDiag.cs (PEITTO_TAUSTA, PEITTO_KOHTA=x,z kk-kehyksessä, PEITTO_LOD): taustalaattojen
  peittokartta yhdessä kohdassa.
- 6686ae580: taustalaatan solmut "katto*" omaksi kappaleekseen LisaaPalatsinKatto:on (häivytys kuten rakennuksissa, Raamattu 2.177).
- 0555e95b0: TaustaKansio → kielletty-tausta-v89c (LAV: kk-tausta-1-2:ssa juurisolmu "katto-longzongmen" LOD0–2; ämpärissä, JU 23.4x).

## Ajot (lokit/esikatselu-…)
- d3 (224632, 031e85f4c): portti t 61 kunnossa (8,6 → ≤ 4,5 m). Uusi reitti Longzongmenin läpi (pelimaailma z −561 = kk z 170):
  kamera 11,5 m.
- d4 (225746, ca2ce6b1a): t 61 ≤ 3,9 m; Longzongmen yhä 12,3 m. Syy: halli 0,70 m:n lattialla ilman sivumuureja, joten
  peittokartta ei tunnista tunnelia (ala −1,3 / 7,7 / ∞), katto ei häivy ja näkyvyysnosto vie kameran 8 m ylemmäs.
- **d5 (232136, 0555e95b0, v89c paikallisesta juuresta d5/juuri): Longzongmen ≤ 5,1 m (oli 12,3), katto häivytetty
  (b-16: keisari näkyy hallissa). Koko ajon suurin korkeus 5,2 m.** Portti t 80: 5,1–5,2 m (d4: 5,6). Se on oikea porttitunneli, ja
  korkeus tulee tunnelin jälkeen jäävästä jyrkästä kulmasta (72°) noin 20 m portin jälkeen, ei nostosta (tarve 0, nosto 0).

## Kesken / seuraava
1. Viesti PT:lle d5:stä lähetetty. PT:n tavoite on ≤ 4,5 m portissa; d5:ssä Longzongmen 4,5–5,1 ja t 80 5,1–5,2 (kulma 71–72°).
   Jos PT vaatii ≤ 4,5: kulmapito tunnelin jälkeen (KulmaPitoS) lyhyemmäksi porttiJalki-aikana.
2. d5 b-16: hallin lattialla harmaa tekstuuriton levy (kk x ≈ −125…−100, z ≈ 167–175, V4_lattia −0,15…0,20) → LAV:lle, jos PT haluaa.
3. c5 KK:lle kokonaisena ämpäristä: sk-d5.txt ilman "palatsi mallit" -riviä (v89c on ämpärissä), PT ensin.
   Sitten merge-pyyntö NS:lle (pelikoodari/reitti-216).
4. Edellisen luovutuksen Kesken 4 (verkkotesti v89b-liitospisteillä): Peli-testit OikeanPalatsinVerkko meni läpi d3/d5-juurella.
   Kesken 5 (valo-k1-216) ennallaan.
