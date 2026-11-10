# Pelikoodari: luovutus 10.11.2026 klo 23.56 (konteksti 26 %, pehmeä raja)

Edellinen: viesti-pelikoodari-luovutus-20261110-2325.md (lue sen kohdat 1–2 vain tarvittaessa; tämä korvaa jonon).
Natiivityöpuu /Users/Shared/Claude/wt/proto-pelikoodari-juoksu haarassa **pelikoodari/seinat-taso1**, kärki **3199b079a** (ei originia, ei junaan).
- M7 (1bfc5c206, koneportaat reunuskiveksi 18) on JUNASSA: JU 224.47 = 474826dd7, testit läpi. Valmis.

## 0. TEHTY: P1 (KK:n linjaus 23.3x) → 3199b079a
- tyokalut/kulkukartta.py: ovi valitaan vanhalla säännöllä, sitten valittu kivijalkaovi seinään kivijalan päälle (rivi(..., kivijalka=True)),
  portaat reunalta maahan jo yhden ruudun nousulla, enintään 0,6 m (KIVIJALKA_PORRAS), "kj": 1 → kulkukartta_peli.py ei leimaa niitä.
  Siirto hylätään, jos se toisi uuden vian (viat()). kivijalan_yla(): kivijalka vain, jos päällä 1,5 m tyhjää (muuten seinän oma ruutu).
- Tulos (v129d:n pinnoilla, ajo proto-3d/_tyo/pelikoodari/kulkukartta/p1, loki p1-e.log): 56 ovea seinään, 17 kivijalkaportaat,
  245 ovea, viat ennallaan, kulkukartta 0 ruudun ero, rajat/kierros samat, alun ovet 益寿斋 ja 颐和轩 ennallaan. Peli-testit Juoksu 233/233.
- Viety Resources: JuoksuOvet.json + JuoksuKulku.bytes (vain ovien otsake). EI JuoksuEsineet.json:ia (ajo arpoi 103, repo 109 – pidä repon).
- Hylätyt kokeet (älä toista): sääntö jo valinnassa → 19 muuta ovea siirtyi (中宫殿 38 m). Kuvaus: seinat-taso1/p1/P1-TOTEUTUS.txt.
- Jäi kivijalan eteen 7: 奉先殿, 銮驾库, 东暖殿, 万春亭 (räystäs), 钦安殿 (portaat), 永和宫 (matala), 房子18 (tila).

## 1. ODOTTAA
- JU ajaa (pyydetty 23.5x): `zsh .../seinat-taso1/p1/aja-p1.zsh <linja> 3199b079a` → seinat-taso1/p1/ennen/ ja jalkeen/ (k1–k3 kiinni, a1–a3 auki).
  Kun "P1 AJETTU": katso kuvat (sips -Z 1000), tee pari ennen|jälkeen samasta rajauksesta (k2 ja a2 tärkeimmät) → KK:lle (näkyvä työ),
  kopio PT:lle, + P1-TOTEUTUS.txt:n polku. Junaan vasta KK:n katsottua → PT:lle pt-ok-pyyntö (sha 3199b079a).
  Huom KK:lle (ehto 1, törmäys): portaat eivät ole kulkukartassa (kuten ei ennen ovikaan); keho voi hipaista alinta askelmaa ≤ 0,2 m.

## 2. JONO
1. P2-LÄHDE LÖYTYI TODENNÄKÖISESTI: taustan korttipuut (V4_puukortti → JUOKSU_KORTTI, JuoksuV4Maailma.cs:691/859, JuoksuMaailma.shader:293)
   piilotetaan alle _JuoksuKorttiLahi kamerasta olettaen, että 3D-lähipuu (puut.json v15) tulee tilalle. (−283,6; 524,5) ei ole lähipuuta
   (lähin −299,0; 526,3) → lehvästö katoaa, rungot (eri aines, ei avainsanaa) jäävät; varjot leivottuja, siksi lehvien varjot näkyvät.
   Pelikuva r55 (kartoitus) näyttää saman, joten ei tarkastelutilan puupiilotuksen harha (tarkastelu piilottaa "puut"/"lehv"-nimet).
   Vahvista: QA `valo`/raja 0 (_JuoksuKorttiLahi = 0 → kortit aina näkyvissä) samasta kamerasta. Korjaus: joko LAV lisää lähipuut näille
   (puut.json) tai meidän: piilotus vain siellä, missä lähipuu on (maski). Päätös PT/KK:lle kuvan kanssa. Sama E3 (−149,2; 303,4).
2. Penger M7:n vieressä (KK: pitkä beige kivijalka samaan harmaaseen): lähde selvittämättä – mika rungon kohdalta, pursotukset vai paketti; paketti → LAV.
3. B1 bottijumi (−85; 500) ja eteläosan kartoitus (ennallaan).
4. Huomenna isolla iPadilla: aukiovideo, renkaiden uusinta (ennallaan).
