# Valoseppä – luovutus 17.10.2026 ilta (17.3x, KOVA RAJA 36 %)

Luovuttaja: Valoseppä (Opus, high), sessio local_c238f4af. Edellinen: viesti-valoseppa-luovutus-20261017-iltapaiva.md (670020bf5).
Viestit `send_message` TÄYDELLÄ id:llä (/Users/Shared/Claude/osoitekirja.md): PT local_5df52e10-10e4-4b72-9554-0049db300dfe (≤ 3 riviä),
JU local_5cb16c00-98db-4cd9-8d7c-1b0bc8ced914, LR local_996d60ab-b4af-4172-ad31-f8e948f141a3, NS local_674b9ec4-e2f3-48e9-a810-a129f20a4f03,
Postivahti local_a24c43c0-8094-4141-b734-90b9555f5044.
D=/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2. Päiväkirja: $D/JONO.md (kaikki rivit 15.37–17.3x). proto-git /Users/Shared/Claude/proto-3d/Matkakirja-proto.
SIMUT VAIN JU:n "SIMU NYT" -viestillä; heti vuoron jälkeen "SIMU VAPAA" JU:lle.

## 0. ENSIMMÄISENÄ (PT:n järjestys): valas k11 simu → sitten Louvre k80
1) **Valas k11** d416a71fc (proto linssiseppa2/valas-197 95a987738, appi $D/t212-valas-k11) on KÄÄNNETTY ja pyydetty JU:lta (17.3x).
   JU:n SIMU NYT → `zsh $D/valas-havainne/k11/valas-k11.zsh --vain-kuvat` (iPad + iPhone ~10 min; skripti siirtää kellon niin, että valo
   = k8:n 15.14/15.21-ajo, PT vaati samaa valoa) → SIMU VAPAA → `python3 $D/valas-havainne/k11/vertailu.py` → k11/vertailu-k8-k11.jpg PT:lle.
   k11 = tumma kylki roiskeen sisällä + valkea ääriviiva (profiilin yläreuna) + harmaa pää + Y-pyrstöevä (valas_vat_k6.py), roiske ohuempi.
   Sivuprofiili 1,5–2 s lukee valaana (luonnos); pelikamerasta EI vielä nähty.
2) **Louvre k80** (PT: "junaan vasta kun kunnossa", pari k77 | k80): k79-käännös `k79-kaanna.zsh` lähti jonoon 17.34 (nohup, L2 KS:n perään,
   appi $D/t209-louvre-varjo). TARKISTA, että käännöksen SHA sisältää da225cca1:n (oma yövalo): `git -C <proto> merge-base --is-ancestor
   da225cca1 <KÄÄNNETTY-sha>`; jos käännös alkoi ennen 17.37 commitia, aja `zsh $D/louvre1/k79-kaanna.zsh` uudelleen.
   Sitten "KÄÄNNÖS VALMIS <sha> k80" JU:lle → SIMU NYT → `zsh $D/louvre1/kuvaa-k80.zsh` (ED=k77, paketti v6k18-lv2f-k80 = k75 +
   varjoSavy [1,15; 1,0; 0,80] + yoValo [1,2; 0,25; 12]) → SIMU VAPAA → pari PT:lle (arkki + yö-crop kuten k78/yo-pyr-k77-k78.jpg).
   Tarkista: (a) päivän varjo lämpeni (k77 vain 2–4 %; k80:ssa kerroin ilmaperspektiivin jälkeen, d8b608115) – jos yhä heikko, syy on
   varjossa × paiva -painossa (nl kääre) → kokeile painoksi 1 − nl ilman ×2:ta; (b) yöllä pyramidi hehkuu, julkisivun alaosa valaistu,
   piha lämmin, EI raitoja. Säädöt vain mallit.json:ssa (`zsh louvre1/k80-paketti.zsh` + python-pätkä), ei uutta käännöstä.

## 1. TEHTY TÄLLÄ VUOROLLA (15.37–17.3x)
- **Louvre k74+k75 JUNASSA 200** (omistaja 16.56 "Kyllä, junaan"): NS runko 08ab7e6e8 (vesipeili e05d5808c, haara
  linssiseppa2/louvre-peili-200), data LR v6k24 (lod md5 8e343255/4ec3f39b/e939e489). Patsas pronssi, altaissa pyramidin peilikuva.
- **Yöraidat** (pyramidin sisäikkunat, pihan porrastetut lammikot): syy KaupunkiYovalot-passi (syvyydestä proseduraaliset ikkunat ja
  8 m:n lamppumaskin lammikot omien mallien päälle; pyramidin lasi ei kirjoita syvyyttä) → e17d527ee: omien mallien alueelta lamput
  G/B/A ja ikkunamaski pois. k78: raidat poissa, mutta liian tumma → oma yövalo da225cca1 (k80).
- **Varjopuolen sävy** (PT: varjot harmaat): mallit.json "varjoSavy" → OmaMalli _OmaVarjoSavy (920b5152b → b8be20c22 → d8b608115).
  k76/k77 vain 2–4 % → k80 ilmaperspektiivin jälkeen. OmatMallitTestit.VarjoSavy (myös yoValo).
- **Valas k9** (pohjan ääriviiva) hylätty: valkoinen laatikko. **k10** (siluetti yläreunaan) PT: ei omistajalle (harjasmainen laikku,
  eri valo). → k11 (yllä).
- Haarat: louvre-peili = e05d5808c + varjoSavy + yöfix + yövalo (KESKEN, ei junaan); louvre-peili-200 = junaan mennyt e05d5808c.

## 2. JONO
1) valas k11 simu + vertailu. 2) Louvre k80 pari → PT (junaan vasta PT/omistajan kuittauksella: koodi 920b5152b..da225cca1 NS:lle
   ja paketin mallit.json LR:lle). 3) V4 pala 4 (HDR) PT:n päätöksellä. 4) Valas: sävyt Valopohjaan ennen junaa.
Omat appit _tyo:ssa: t200-k65 (pois, k75 hyväksytty), t205/t208/t210 valas (pois kun k11 kuvattu), t207-louvre-peili, t209-louvre-varjo,
t211-louvre-yo (pois kun k80 kuvattu), t212-valas-k11.
