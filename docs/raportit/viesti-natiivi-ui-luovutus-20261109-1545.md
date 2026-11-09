# Natiivi-UI: luovutus 9.11.2026 klo 15.45 (kontekstivahti 25 %; korvaa -1440:n)

PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31, JU local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd, NS local_0f7f169f-2ceb-43d2-8fb4-223dda2c0870.
Kuvat ensin PT:lle (3 riviä). Lokit /Users/Shared/Claude/proto-3d/lokit/, skenaariot /Users/Shared/Claude/proto-3d/_tyo/natiivi-ui/.
Arkki: python3 -I /private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-natiivi-ui/9c1a5623-3b97-4844-91cc-7c2537a97060/scratchpad/arkki.py
ulos.jpg sarakkeet otsikko kuva1 nimi1 … Tarkistus `sh Linssit-testit/unity-tarkistus.sh`, `python3 -I tyokalut/pohjavahti.py` (worktreessä).
zsh-huomio: monisanaiset silmukat bash-skriptitiedostoon (set -- ei pilko zsh:ssa).

## 1. NOSTOKOKONAISUUS – kärki 0bf9cd57d (natiivi-backup natiivi-ui/palkki-aina, wt/proto-natiivi-ui-palkki-aina) – PT HYVÄKSYI
- Palkki aina -3: iphone e516f3fe1 + vaaka/ipad-pysty/ipad ed65f5b34 katsottu; PT kuittasi 4 koon arkin
  (lokit/nui-palkki-aina-3-ipad-ed65f5b34/arkki-palkki-aina-3-4-kokoa.jpg).
- OMISTAJAN PÄÄTÖS 15.23 (orbit): 0bf9cd57d = PalloKierto.KiertoJatkuuNapautuksessa (Pinnaus asettaa: Nykyinen != null) + ajo.napautusKaytetty:
  kohdekierron 1. karttanapautus ei nollaa ajoa, 2. napautus / veto / nipistys / toinen sormi pysäyttää. (d4ae2c4a3:n ehto "ei pienenä" ei
  lauennut: nähtävyysnapautus avaa noston suoraan palkiksi.) iPhone katsottu, PT hyväksyi 15.4x
  (lokit/nui-orbit-napautus-1-iphone-0bf9cd57d/arkki-orbit-napautus-iphone.jpg); PT vie 0bf9cd57d JU:lle junaan 223.
- JÄLJELLÄ: iPad 0bf9cd57d (JU:n ketju ED3) → lokit/nui-orbit-napautus-1-ipad-0bf9cd57d: katso o-1…o-4 (lokissa "ensimmäinen napautus
  kartalle nostosta, kierto jatkuu" ja kierto käynnissä o-3:ssa, päättyi o-4:ssä) → arkki PT:lle. o-5/o-6 (Grand Palais) ei testannut
  mitään iPhonella (kyltti ruudun ulkopuolella, kierto jo pysäytetty) – ei estä.
- Laskuri 1/4 → 2/4 = luennan eteneminen (PalkinOtsikko), ei vika.

## 2. SEURAAVA (PT 15.4x): selaus ja kaupunkinimi palkissa nähtävyyden aikana
- Kun nähtävyys on palkissa, palkissa ei ole ‹ › eikä kaupunkinimeä (sk-palkki-aina-3 a-7 "napauta-nimi ei näkyvissä"); kaupunkipilleri
  näkyy erikseen palkin vieressä. Tee palkki-aina-haaraan 0bf9cd57d:n päälle (Pinnaus.cs: PaivitaSelaus, PalkinOtsikko, Asettele).

## 3. FPV-KOE 2 (vihreät pisteet, OMISTAJA 14.59) – kärki d6fe26743 (natiivi-backup natiivi-ui/fpv-napit, wt/proto-natiivi-ui-fpv-napit)
- d2d4d3227: Sijaintipallo.AsetaSuositellut + varjostin _Suos/_SuosN (vihreä piste 0,7 × kohdepiste), Pallovalitsin.Keskimmainen
  suositellulle 6° etusija (SuosLisaAste), testikomento `pallo katse <lat> <lon>`. Lähde Linssit.Kehityskaupungit.Lista (NS hyväksyi;
  NS:llä ei lukitus-/piikkitehtävää, PT:n NS-erä oli vain FPV-vuoret 9edbc14a9 FpvLento.cs).
- d2d4d3227 iphone + vaaka ajettu: piste piirtyy, mutta vain Tukholma löytyi (minipallo-pisteet ohittaa kohdevalikon paikat) → d6fe26743:
  MinipalloPisteet.KaikkiEhdokkaat (FPV: + kohdevalikon paikat Pariisi, Madrid …).
- JÄLJELLÄ: JU:n ED3 orbitin jälkeen fpv-koe-2 d6fe26743 iphone → ipad (lokit/nui-fpv-koe-2-<koko>-d6fe26743; vaaka on vain d2d4d3227).
  KATSO: lokissa "suositellut 6", k-1 vihreät pisteet Euroopassa, k-2 nimi Pariisi ("keskimmäinen suositeltu"), k-3 Madrid, k-4 lento
  Madridin yltä → arkki PT:lle (KOE, ei junaan).

## 4. Vahti
- Taustavahdit pysäytetään luovutuksessa; käynnistä oma: odota lokit/nui-orbit-napautus-1-ipad-0bf9cd57d ja
  lokit/nui-fpv-koe-2-{iphone,ipad}-d6fe26743 (loki.txt rivi "valmis N s").

## Lisäys 15.5x: KOHDAT 1 (iPad) JA 3 VALMIIT – älä toista
- Orbit iPad 0bf9cd57d katsottu ok, arkki PT:lle (lokit/nui-orbit-napautus-1-ipad-0bf9cd57d/arkki-orbit-napautus-ipad.jpg); 0bf9cd57d on junassa 223.
- FPV-koe 2 d6fe26743 iPhone + iPad katsottu ok (suositellut 6, Bryssel → Pariisi, Madrid valittavissa, lento alkaa), arkki PT:lle
  (lokit/nui-fpv-koe-2-ipad-d6fe26743/arkki-fpv-koe-2.jpg). Odottaa PT:n/KK:n palautetta.
- Jono nyt: kohta 2 (palkin selaus ja kaupunkinimi nähtävyyden aikana).
