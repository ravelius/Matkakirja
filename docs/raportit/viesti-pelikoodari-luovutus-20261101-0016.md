# Pelikoodari: luovutus 1.11.2026 klo 00.16 (konteksti 25 %, pehmeä raja)

Edellinen: -20261031-2345 (sen Kesken 1 ja 4–5 yhä voimassa). Muistin tila: pelikoodari-tila-20261018-aamu.md.
Proto-worktree wt/proto-pelikoodari-reitti-216 (haara pelikoodari/reitti-216, kärki c87118595, ei pushattu: protolla ei originia).
Työkansio /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/reitti-216/ (d6, c5: sk-*.txt, aja-*.zsh, havainnot).

## Valmista tässä vuorossa (reitti-216, Peli-testit 784/784, unity-tarkistus 0)
- 929c53514: TaustaKansio → kielletty-tausta-v89d (LAV: b-16:n harmaa askelma V4_lattiaksi). JU vei v89d:n ämpäriin 23.50 (100/100).
- d6 (lokit/esikatselu-20261031-234713, paikallinen juuri d6/juuri): b-16 kunnossa, PT kuittasi (pari d6/b16-pari-d5-v89c_d6-v89d.png).
- c5 ämpäristä (lokit/esikatselu-20261031-235021): kamera ≤ 5,2 m kuten d5, botti maalissa 135 s. UUSI VIKA b-47…49:
  Puyi kulki läntisintä kultaisen veden sivusiltaa ja upposi kanteen kaulaa myöten, kansi harmaa. Syy: rakennukset-v85:n
  e-kultaisen-veden-sillat-mallissa on reitti vain keskisillalle "S-N"; sivusilloilla (kaari 1,0) ei profiilia → Puyi tasolla 0.
  LAV:lta pyydetty reitit neljälle sivusillalle + kansi V4_lattiaksi (c5/c5-havainnot.txt).
- c87118595: botti keisarin sillalle (PT 1.11.): JuoksuV4Reitti.Sivusillat/SivusillanYli/BottiValinta, sivusillan ylitys +150 m
  (SivusiltaLisaM) maaliEt-Dijkstrassa ja botin valinnassa; pelaajalle vapaa. Testi OikeanPalatsinBottiKeisarinSillalla
  (MK_JUURI=…/d6/juuri MK_TAUSTA=kielletty-tausta-v89d): 289 lähtöä, sivusiltaa ylittää 0 (ilman korjausta 207).

## Kesken / seuraava
1. LAV:n uusi rakennukset-versio (sivusiltojen reitit + kannet) → RakennusKansio (JuoksuSokkeloMaailma.Palatsi.cs:68) uuteen,
   leivottu esto (EstoTiedosto) tarkistettava, jos verkko muuttuu; ämpäriin JU:lla; sitten uusi c5 ämpäristä (c5/aja-c5.zsh) → PT.
2. PT hyväksyy c5:n → c5 KK:lle kokonaisena, sitten merge-pyyntö NS:lle (pelikoodari/reitti-216).
3. Huom: c5:n s-osa ("sivukujan vartija lähtee") ei toteudu (aikaraja) d5:ssä eikä c5:ssä; s-kuvat ovat maalikameraa.
   Peli-testien OikeaVerkko-oletus MK_TAUSTA on yhä kielletty-tausta-v81 (anna ympäristömuuttujalla).
4. Edellisen luovutuksen Kesken 1 (PT:n ≤ 4,5 m -tavoite portissa) ja 5 (valo-k1-216) ennallaan.
