# Karttaseppä: luovutus 10.11.2026 klo 11.58 (KS)
Syy: konteksti 25 % (hook, Raamattu 7.37). Korvaa -0945:n.
Työlista on jono: `python3 -I /Users/Shared/Claude/Matkakirja-fable/tools/asemataulu/tyolista.py seuraava KS` (rivit PT kirjoittaa).
HUOM kello: aja `date` ennen jokaista aikaleimaa.

## SUUNTA (omistajan kortti 09.36, PT:n JAKO 09.3x)
Pariisin nähtävyydet KOODILLA oikeassa koossa, Pariisi ensin; Tripo-mallit talteen kytkimen taakse, EI poistoja. Suunnitelma (lue kokonaan):
/Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261110-pariisin-nahtavyydet-koodilla.md.
Osa 1 = kolme paria (Riemukaari + Notre-Dame = KS, Eiffel = VS) → YKSI yhteinen KK-kortti (PT 10.5x). ND:n levenevät tornit kysytään KK:n kortissa.

## TEHTY TÄSSÄ VUOROSSA (proto-repo /Users/Shared/Claude/proto-3d; haarat eivät pushattu, eivät junassa)
- Haara `karttaseppa/notredame-koodi` (worktree /Users/Shared/Claude/wt/proto-karttaseppa-notredame), kärki **1281fef9e**:
  b3876a0a4 Riemukaari KoodiId → Korvaa (VS:n kenttänimi) · dfd40b607 Notre-Dame koodina (2 664 kolmiota, OSM-paikka 48.853018 2.349881,
  Akseli −22, MaaH 45; mallikohtainen kytkin `koodimallit notre-dame:Notre-Dame 1`, Koodimallit.cs) · 7bb48f690 yhteinen kivi
  `OhjelmaKohdeGeometria.TaloKivi` (0xE9D3AA = talojen seinien keskiarvo) + ND:n ympäristö (Tripo-aukio, pyyhitty saari ja puut pois kytkimellä;
  korvaavat talopalat komennolla `koodimallit talot <avain> <kansio>`) · 1281fef9e suhteellinen kansio Documentsista. Testit 738/738, unity (sh) 0.
- VS: Eiffel 20fed45ff (haara linssiseppa2/eiffel-koodi-kivi) = 1281fef9e + VS:n paletti 9297b5b0f + Eiffel. **Yhteinen käännös kaikille kolmelle.**
- Korvaavat talopalat v2: /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/koodimallit/talot-v22-lahi-notre-dame (Palais de Justice takaisin,
  pois vain kirkko + Sainte-Chapellen Tripo-ala 6 m varalla; v1 viereen -v1). Tekoskripti tee-talot-nd.py samassa yläkansiossa.
- Mac-parit: ajot 39–40 (dfd40b607) ja uusinta 2 (20fed45ff, 11.18/11.31): kivi nyt talojen beige, ND:n ympäristö täynnä. PT kuittasi 11.5x.
  Kuvat _tyo/karttaseppa/koodimallit/kuvat/ (u2/ = uusinta 2), havainnot koodimallit/parit-rk-nd-20261110.md, skriptit koodimallit/skriptit/
  (parit.py, parit-u2.py, rajaa.py, rajaa-u2.py: `python3 -I parit-u2.py <lokikansio> rk|nd <otsikko>`).
  Harmaat lentävät koodipuolella = elävän kartan puluparvi (PT 12.0x: ei vika). Parvis-aukion tummat viivat = oikeat istutuskaistat (OSM), pikku laatikot =
  Marché aux fleurs (ei poisteta).
- Lontoo koe10 (BM-sahalaita, ajo 37): PT kuittasi talokoneeseen kokeena 10.2x. Avoimet 3 kirjattu
  _tyo/karttaseppa/katot-luuranko/koe10-tulos.md (PT: ei nyt).

## KESKEN (JU:lla; ohje _tyo/karttaseppa/koodimallit/ajopyynto.md, LISÄYS 12.0x)
1. **Mac 43**: sk-mac-notredame-u2.txt 20fed45ff, talopalat v2 → loki lokit/karttaseppa-notredame-koodi-20fed45ff-v2.
   Tarkista lokista v2: "pala 16597/11273 … (2613828". Kuvat: Palais de Justice ympäröi Sainte-Chapellea, Tripo ei leikkaudu taloihin.
   Parit: `python3 -I _tyo/karttaseppa/koodimallit/skriptit/parit-u2.py <loki> nd Notre-Dame` (vaihda U-kansio, ettei u2 ylikirjoitu).
2. **iPad I3** (iso iPad, 20fed45ff, samassa lukkovuorossa VS:n Eiffel): skenaario koodimallit/sk-ipad-rk-nd.txt (12 kuvaa, lähin kamera 0.0005),
   Documents/talopalat-pariisi-v22-lahi + talopalat-nd-koodi (v2 uudelleen) → loki lokit/karttaseppa-koodimallit-ipad-20fed45ff.
   Kuvat täysikoossa itse → parit PT:lle (≤ 3 riviä) → PT/KK yhteinen kortti VS:n Eiffelin kanssa.
   PT:n ydin: "oikeassa koossa Riemukaari erottuu tuskin viistosta; iPadin lähin kamera ratkaisee".

## SEURAAVAKSI
1. Mac 43 + iPad I3 tulokset (yllä) → PT.
2. Odottaa: koe7 iPad-pari, Louvren korttelit, nimiotto Lontoolle, koe10:n avoimet 3.

## Vahdit
- Postilaatikko: Monitor `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh` (30 min, viritä uudelleen).
- Kuvavahti: Bash run_in_background until-silmukka lokikansion png-määrälle (ks. KESKEN-polut).
