# Valoseppä – luovutus 15.10.2026 ilta 3 (19.2x, konteksti 35 %)

Luovuttaja: Valoseppä (Opus, high), sessio local_c238f4af. Edellinen: viesti-valoseppa-luovutus-20261015-ilta2.md (sen savu+valas
on junassa 195 e9fba547b, PT: ei simua; Peking-osio on yhä voimassa, alla päivitys).
Viestit `send_message` id:llä (/Users/Shared/Claude/osoitekirja.md); PT local_5df52e10 (≤ 3 riviä + polut).
Käännös ja simu AINA Julkaisijalta (local_5cb16c00): "KÄÄNNÄ <kärki> → app-polku" ja "SIMU VAPAA" heti ajon jälkeen.

## ALOITA TÄSTÄ: ISS-revontulet, PT 19.2x: "jatka, ei omistajalle vielä" – yksi käännös + 2 kierrosta, paras pari PT:lle
Toimeksianto: /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/iss-yotaivas-20261015.md kohta 2 (omistaja 18.10).
Haara `linssiseppa2/revontulet-196` (proto, worktree /Users/Shared/Claude/wt/proto-linssiseppa2-revontulet, juna-195 e9fba547b:n
päällä), kärki **52028dfd6** = v5 (PT:n kohdat 1–4). EI VIELÄ KÄÄNNETTY: pyydä Julkaisijalta L2-käännös app-polkuun
/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/revontulet/app/Matkakirja3D.app ja SIMU NYT ~15 min.
1. Kierrokset: `zsh /Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/revontulet/aja-kierros.zsh 7 <käännöksen SHA>` (luo ensin
   saatimet-k7.txt, esim. vain kommenttirivi; kierrokset/k7/ pitää olla olemassa ENNEN uudelleenohjausta `> kierrokset/k7/aja-kierros.out`).
   Ajo ~4 min → kierrokset/k7/pari1–5.jpg (NASA vasen | peli oikea), revontulet-tila.txt.
2. Tuore Sonnet-arvioija joka kierros (Agent, model sonnet): "Lue ohje …/revontulet/arvioija.md … kansio kierrokset/kN/ … HUOM omistaja
   linjasi yöhehkun OHUEKSI, älä ehdota leventämistä". Rivi KIERROSLOKI.md:hen.
3. Kierros 8 samalla käännöksellä säätimillä (testikomennot ilman käännöstä, saatimet-kN.txt): `_Punainen=`, `_Vihrea=` (km),
   `_Violetti=`, `_Sateet=`, `_Reuna=`, `_Kirkkaus=`, `_LahiKm=`, `voima<x>`, `pohja<x>`. Sitten SIMU VAPAA ja paras pari PT:lle.
- Kierrokset 1–6 (KIERROSLOKI.md, YHTEENVETO-20261015-1925.md): k1 näkymätön (korjattu: MaanKehys), pisteet k2–k6 3, 3, 4, 4, 3.
  Paras tähän asti k6/pari1 (Kp4 horisontti). v5 korjaa: punainen tasaisena nauhana → paikalliset kuvut; vihreän sahalaitainen
  alareuna maata vasten → pehmeä; violetti ja valkoinen ydin; kupolin hehku testattavaksi (`revontulet iss`, kuva r7 / pari5).
- Tarkista pari5: kupolin punainen hehku (globaali _RevontuliHehku → Cupola.shader) näkyy, kun ISS soikion yllä varjossa.
- Rakenne: Revontulet.cs (kuori = pohjahehku 0,25 + 3 verhoa/puolisko soikion keskiviivalle, OVATION Live tai `kp<N>` synteettinen,
  `Revontulet.Havainto` skannerille), RevontuliVerhot.shader, Cupola.shader (vain hehku-rivit), LinssiOhjain (`revontulet`-komento,
  kello yo-kanada/yo-etela). Testikomennot: `astro kyyti revontulet 0|1|kp<N>|live|iss|verhot0|1|voima<x>|pohja<x>|_Säädin=x|tila`.
- Rajapinta Linssisepän kanssa SOVITTU: Linssiseppä lukee `Revontulet.Havainto` (struct Voimakkuus/Suunta/Nakyy) taivasskanneriin;
  `KyydinTaivas.Varjossa` (Linssisepän 9e0dceb5d, haara linssiseppa/yotaivas-196) → vaihda oma varjolaskenta siihen, kun se on
  junassa. Piirtojärjestys Linnunrata −61, tähdet −60, revontulet −36. Kumpikaan ei muokkaa toisen tiedostoja.
- Valmis-ehto: PT kuittaa parin → NS ottaa junaan (196). Ennen junaa: unity-tarkistus `zsh tyokalut/tarkista.sh` 0 virhettä (ok 52028dfd6).

## Peking (juna 196)
- Codexin native50-palaute lähetetty postiin 3edf63741 (posti/valoseppa-codex-peking50-palaute-20261015.md): kattosävy hyväksytty,
  aukion neljä massaa tummemmiksi (RGBA ~0,55/0,52/0,46) + sokkeli ja räystäs. Odota Codexin 72 GLB:n lentotestipakettia (T7-polku
  tulee postiin) → piilokaupunki-ajo (`linssiseppa2/peking-testi-196` 2c72c4935, ohje edellisessä luovutuksessa) ja pari PT:lle.

## Työtilat
wt/proto-linssiseppa2-revontulet (revontulet-196), wt/proto-linssiseppa2-peking (peking-testi-196), wt/proto-linssiseppa2-savu
(laukaisusavu-195: junassa 195 → poista `git worktree remove` proto-reposta, kun juna 195 lukittu). wt/valoseppa-posti poistettu.
Skriptit: /Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/revontulet/ (aja-kierros.zsh, sk-pohja.txt, arvioija.md, tavoitteet/ 8 NASA PD
+ LAHTEET.md, skriptit/ muokkausskriptit).
