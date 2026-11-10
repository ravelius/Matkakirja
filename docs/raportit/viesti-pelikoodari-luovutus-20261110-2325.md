# Pelikoodari: luovutus 10.11.2026 klo 23.25 (konteksti ~28 %, pehmeä raja)

Edellinen: viesti-pelikoodari-luovutus-20261110-2222.md (LISÄYKSET 22.2x–22.3x).
Natiivityöpuu /Users/Shared/Claude/wt/proto-pelikoodari-juoksu haarassa **pelikoodari/seinat-taso1** (b744c680b + 2 committia, ei originia, ei junaan):
- fa3cd7d02 mika: pienet kappaleet ensin, 24 riviä, verkon nimi, isovanhempi, [iso]-merkintä.
- 384d7ce96 QA `ui juoksupeli ovikoe porraslaji N [r g b]` (koneportaiden _Laji, oletus 16 ennallaan).
Työkansio /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/seinat-taso1/ (nimet/, nimet2/, etela/, m7-pinnat.png).

## 0. TEHTY TÄLLÄ VUOROLLA (kaikki Mac-ajot JU:n jonossa, rc 0)
- NIMET (lokit/pk-seinat-nimet-b744c680b): tarkastelukamera M1/P1/P2/M7-kohtiin 4 suuntaan + mika 3×3.
- NIMET2 (lokit/pk-seinat-nimet2-384d7ce96): mika osoitetuista kohdista + M7 porraspinnat 16/11/18/17.
- KARTOITUS 2 (lokit/pk-seinat-etela-b744c680b): lähtö −134,294 e. Botti EI mennyt etelään; e45–e60 jumissa silmukassa (−85; 500).
  Lista etela/LISTA2.txt (E1 vino laatta e04, E2 harmaa monikulmio e12, E3 paljas runko e29, E4 lohko jalustalla e46, B1 bottijumi).

## 1. TULOKSET KOHDITTAIN
- M1 → LAV:LLE (viesti 23.2x): lohkon kohdalla ei pelin luettavaa verkkoa, vain kk-tausta-1-4 lod0 (tausta v129). Kohde ~(−92; 476–480).
  LAV mittasi v131-koejuuren → ehkä korjautunut v131:ssä. Kuva nimet/m1-p-pist.png.
- M7 → MEIDÄN: ovien koneportaat (JuoksuSokkeloMaailma.Ovet, materiaali "ovi portaat" _Laji 16 marmori = tasainen beige). LAV:lle kerrottu.
  Pari m7-pinnat.png KK:lle (näkyvä työ, koe) 23.2x, suositus 18 (harmaa reunuskivi). ODOTTAA KK:N KATSETTA → sitten oletus 16→18 Ovet.cs:ssä
  (`internal static float PorrasLaji`), väri (1,1,1); unity-tarkistus sh:lla; Mac-pari; PT:lle.
  Huom: portaiden vieressä pitkä beige kivijalan etusivu on yhä tasainen (ei portaat; lähde selvittämättä: pursotukset vai paketti).
- P1 → MEIDÄN, PÄÄTÖS PUUTTUU: kulkukartta.py rivi(): "kivijalan eteen" siirtää oven kivijalan etureunaan (e ≤ 0,6 m, ovet.json tsy).
  39 ovella tsy ≥ 0,3 (29 ≥ 0,6). Korjausvaihtoehto: ovi seinään kivijalan päälle + koneportaat maahan (Portaat-koodi valmiina).
  Yhteinen ovisääntö → kuva + ehdotus PT:lle/KK:lle ennen tekoa. Kuvat nimet-ajon p1-l.png, kartoitus r49.png.
- P2 → AUKI: paljaat rungot (−283,6; 524,5 itä/etelä 8–15 m) eivät ole lähipuita (puut.json v15: lähin lähipuu −299,0; 526,3).
  Lehvästön varjot ovat todennäköisesti leivottua valoa. Mika-pisteet ohittivat ohuet rungot (osui pursotuksiin). Ehdokkaat: taustamallin
  puut (V4_puukortti piiloon lähellä JUOKSU_KORTTI, runko jää) tai "korttipuut keskipuut" (ristikortit). Seuraava: tarkastelukamera 2–3 m
  rungosta, mika rungon keskelle; tai `tarkastelu piilota <malli>` kunnes runko katoaa. Sama tyyppi E3 (e29, −149,2; 303,4).

## 2. SEURAAVAKSI
1. KK:n vastaus M7:stä → toteutus (yllä).
2. P2-lähde (yllä); jos taustan puu → LAV:lle, jos keskipuut/kaukopuut → meidän (runko piiloon samalla rajalla kuin latvus).
3. P1-ehdotus PT:lle kuvan kanssa.
4. B1 bottijumi (−85; 500) ja eteläosan kartoitus: lähtö suoraan maalin aukion lähelle tai `ui juoksupeli tarkastelu kierros 40 400 20`.
5. Huomenna isolla iPadilla: aukiovideo (lähtö −68,−368 i), renkaiden uusinta (191aaeaf2) – ennallaan edellisestä luovutuksesta.

## LISÄYS 23.3x
- LAV kuittasi M1:n: sokkelin ja seinän kohdistusvika kk-tausta-1-4 lod0:ssa (v129 = v131, v131 ei korjaa) → LAV:n muurin juuri -jono yhdessä E4:n kanssa; E1 ja E2 LAV:n lattiajonoon; M7 poistettu LAV:n jonosta (meidän). Meille jäävät M7, P1, P2, B1 ja eteläosa.
- 23.3x KK valitsi M7:lle 18 → TEHTY 1bfc5c206 (natiivi pelikoodari/seinat-taso1, unity 0), PT:lle pt-ok-pyyntö. KK:n lisätoive: portaan viereinen pitkä beige penkere samaan harmaaseen kiveen = ERI TYÖ (pysyi beigenä kaikissa pinnoissa) → SEURAAJA: selvitä lähde (mika rungon kohdalta, pursotukset vai paketti); jos paketti → LAV:lle.
