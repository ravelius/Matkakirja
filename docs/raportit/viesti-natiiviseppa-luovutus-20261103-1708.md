# Natiivisepän luovutus 3.11.2026 klo 17.08 (konteksti 26 %, 7.37)

Vain voimassa oleva tila. Korvaa luovutuksen viesti-natiiviseppa-luovutus-20261103-1630.md; sen viittaama 1622-luovutuksen TILA-osio
on yhä voimassa (haarat, worktreet, simuketju, lukot, testit): `git show afbe75860:docs/raportit/viesti-natiiviseppa-luovutus-20261103-1622.md`.
Id:t: /Users/Shared/Claude/osoitekirja.md. Cron Unity-beeta luotu (7f114d4c) – nollauksen jälkeen luo uudelleen ("4 9 * * *",
muisti unity67-paivitysseuranta).

## KÄYNNISSÄ (oma, JU:n LAITE NYT ISO 17.08)
- `ipad-lukko.sh kaari natiiviseppa -- zsh proto-3d/_tyo/natiiviseppa/muistihuippu/vuoro-1708.zsh` (loki vuoro-1708.log samassa kansiossa):
  1) reunat pois -mittausten haku (scratchpad hae-pois.zsh → lokit/natiiviseppa-fps-vieritys-6da58f32b-reunat-pois-ipad-20261103-1627/
     mittaus-fps-*.txt + liikeruudut.txt), 2) **PT KIIRE: 44ecc31d1-kaatumisen toisto** muisti-tarkalla (toista.zsh: asentaa 44ecc31d1,
     Documents/muisti-tarkka.txt 100, NUI:n polku jatka → Lontoo → Pariisi bussilla → kohdenosto → `aja 48.862 2.320 0.03 3`, hakee
     muisti-tarkka.log, kuva-loki, ui-loki, pois päältä, jättää 693cf437f). Tulos lokit/natiiviseppa-muistihuippu-44ecc31d1-HHMM/.
- Valmis = "TOISTO VALMIS" vuoro-1708.logissa → **JU:lle "VAPAA iso"** → analyysi.
- Jos sessio nollattiin kesken: lukko vapautuu skriptin lopussa; tarkista `cat /tmp/matkakirja-ipad.lukko/kuka` ja vuoro-1708.log.

## KIIRE: lähizoomin muistihyppy (PT 17.1x, NUI nollautui 17.06, NUI:n data nui-muistihuippu-b0753ecc0-20261103/tulos.md)
- Isolla 44ecc31d1: oikea saapuminen Lontoo → Pariisi, kohdenosto (vapaa 843 Mt, palautui 1880), lähizoom → vapaa 1882 → 911 Mt
  sekunnissa, tekstuurit 919 / kuvat 120 / keko 485 / varattu 323 ENNALLAAN → signal 9. Jatketussa pelissä ilman saapumista lähizoom ok.
- ~970 Mt mittaamattomasta luokasta → muisti-tarkka.log: N-rivit (phys_footprint, internal, grafiikka = Metal), A-rivit (VM-alueet
  tunnisteittain, heti kun footprint +48 Mt), T-rivit (tekstuurit tyypeittäin + suurimmat, kun +150 Mt 0,3 s:ssa), L-rivit (lokit).
  Katso hyppyhetki: grafiikka (RenderTexture/mesh/Cesium) vai internal/malloc (purkupuskurit: PiirrosKerros.PuraTaustalla Task.Run
  ilman rinnakkaisuusrajaa, 2048² RGBA8+mipit ~22 Mt natiivi + 22 Mt hallittu per pala; lähitaso 35 palaa alle 6 km).
- Epäilyt (todistamatta, 6.16: mittaa ensin): PiirrosKerroksen rinnakkaiset taustapurut lähitasolla; ElavaKerros/valmiiksipiirto;
  LiikeLaatat varjoKohde (ei Create). Korjaus samaan JU:n iso-pakettiin (pohja 9b9695a7d). KuvaLoki.Muisti (UI/KuvaLoki.cs:52) =
  NUI:n ehdottama paikka uusille luokkariveille.
- Tulos → PT ≤ 3 riviä (luokka, MB, syy, korjaus-sha).

## TEHTY TÄLLÄ VUOROLLA
1. **Reunat ON pysyy** (PT kuittasi 16.5x): konsolin pitkät liikeruudut on/pois kauko 9/22, keski 8/1 (max 41/21), lähin 1/1, zoom 0/0.
   Ruutuprosentit haettu 17.1x (myöhästyneet liikeruudut on/pois): kauko 1,0/2,7 %, keski 1,0/0,3 %, lähin 0,7/0,1 %, zoom 0,5/0,0 %
   → PT:lle lähetettävä (jonon kohta 2).
2. **Saapumisen loppurajaus** (jonon kohta 0, NUI hyväksyi 16.5x): aaaed4758 = 9b9695a7d + loppurajaus (haara
   natiiviseppa/loppurajaus-9b9-218, peili pushattu; sama muutos e1d619acf haarassa natiiviseppa/loppurajaus-piirros-218).
   PiirrosKerros.SaapumisenEnintaanKorkeusM(kam) = 0,7 × täyden näkyvyyden korkeus; KohteidenRajaus piirroskaupungille enintään
   se, keskipiste silloin piirroksen keskusta; loki "ui saapuminen: piirroksen loppurajaus pariisi N m (yläraja M m)".
   **tarkista.sh AJAMATTA** (taustaodottaja kuoli nollauksessa): aja wt/proto-natiiviseppa-haivytys:ssä (nyt haara loppurajaus-9b9-218),
   kun `pgrep -fl "Unity -batchmode|esikatselu.sh"` tyhjä ja käännöslukko vapaa → "virheitä yhteensä 0" → sha aaaed4758 JU:lle
   (JU 17.0x: e1d619acf meni puhtaasti iso-pakettiin) → JU:n vuoro saapumisen 0–20 s kuvasarjalle, kaikki 3 zoomia, sama rajaus → PT.
3. **76d1adbdf JÄTETÄÄN POIS** (JU:lle sanottu): 9b9695a7d:n 4 ms -budjetti (56c06b836) tekee saman; ruudun 2497 42 ms = yksi iso pala.
4. JU:n koe 9b9695a7d analysoitu → PT: pisin 92 ms (ennen 140), mip 0; NostoKerros 33 ms (NUI/PK), Laattapalvelin.LataaTausta 76 ms
   ja Varitaso 56 ms (KS); kuvat 3 zoomista ok, palasauma (KS).
5. xctrace-aikakatkaisu ajo-laite.zsh:ssä (aikaraja + 60 s → kill -INT omalle pid:lle).

## JONO (järjestyksessä)
0. KIIRE muistihyppy (yllä). 1. tarkista.sh aaaed4758 → JU → saapumisen kuvasarja → PT. 2. Ruutuprosentit (reunat pois) PT:lle.
3. Vanhan jonon kohdat ennallaan (354 ms PostLateUpdate → xctrace; osa D NUI:n A+C jälkeen; GC-haara vasta PT:n luvalla;
   odottavat). Jono tyhjä → "JONO TYHJÄ: Natiiviseppä" PT:lle.

## TILA
- Uusi haara natiiviseppa/loppurajaus-9b9-218 (wt/proto-natiiviseppa-haivytys on nyt siinä), loppurajaus-piirros-218 (e1d619acf +
  76d1adbdf, ei pakettiin). Uusi kansio proto-3d/_tyo/natiiviseppa/muistihuippu/ (toista.zsh, vuoro-1708.zsh).
- Worktree wt/natiiviseppa-luovutus-1708 saa poistaa mergen jälkeen (myös vanhat -1230 … -1622 ja -1630).
