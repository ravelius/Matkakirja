# Valosepän luovutus 29.10.2026 klo 21.24

Lue ensin tämä, sitten loki `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md` (rivit 29.10. 18.14 →).
Worktree `/Users/Shared/Claude/wt/proto-linssiseppa2-p11`, haara **linssiseppa2/pinnat-215**, kärki **abdd058ed** (pushattu natiivi-backup),
pohjana PK:n aukio-k23-215 60488bf3e. Edellinen seinat-211 e9f1174b1 on jo junassa 214 (1f450dd3a). Ei omia taustaajoja.

## Tehtävä: juna 215, aukio 03/03b (PT 21.0x, KK:n erolista)
Erolista: `/Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/erolista-aukio-03-03b-20261029.md`. VS:lle pinnat:
1) hallin kattotiili kullankeltaiseksi lasitiileksi, 2) hallin julkisivu (punaiset ristikko-ovet, sinivihreä-kultainen palkkimaalaus),
7) kaukolattia ei saa sumentua saumattomaksi ~40 m:stä. Tasainen valo (omistaja 27.10. 10.56). LR tekee muodot.

## Tehty (PT:lle ilmoitettu 21.2x, 3 riviä)
- 9fde2169e: palatsikaton kylläisyys w (`_JuoksuPalatsiKattoSavy.w`, ValoKohteet.JuoksuPalatsiKattoKyll, QA `valo savy palatsikatto r g b w`).
- 41a2eac22: katto 0,74/0,64/1,0, kylläisyys 0,68. Kokeet: esikatselu-20261029-205042 (0,70/0,70/0,80 sitruuna s 0,77) ja -205651
  (0,66/0,62/0,50 beige s 0,46); havainne 03/05 kirkas tiili h 35–40, s 0,52–0,60. Koskee kaikkia V4_palatsi_katto-pintoja (myös 05).
- 55ff05567 + abdd058ed: JuoksuLattia `SaumaKauka` (k16): x-saumat fw.x:llä ja rivisaumat fw.y:llä, kaukana leveys vähintään 2,5 cm,
  haalistus 0,15–0,45 × rivi; k18-kuilu tummana (0,6) kaukana. Juurisyy: Sauma häivytti molemmat suunnat suuremman akselin mukaan.
- METAL 442/0, PIPELINE 434/0 (abdd058ed). Parit LR:n juuri-pk7-v73:lla: `proto-3d/lokit/havainne-editori-20261029-211437/{03,03b,05}`.
- Julkisivu: Codexin valmiit 1070 ristikko-pariovi (`_tyo/codex/juoksupinnat-v1/`) ja 1067 palkkimaalaus (T7 `…/delivery-friezes-v2/`).
  LR upotti ne (hallit_pinnat.py, juuri-pk7-v73), mutta vain lod0:aan. Aukiolta halli näkyy lod1/2:na (V4_wood ruskea, palkkivyo
  teal-1536 = kaukaa limenvihreä) → pyydetty LR:ltä lod1/2 ja kielletty-tausta-v71:n 20 palaa.

## Kesken / seuraava askel
1. LR:n lod1/2-juuri → pari 03/03b/05 (PK:n `proto-3d/_tyo/pelikoodari/kuja05-pk6-20261029/editori-sovitettu.sh`, REF=abdd058ed,
   RUNKO=natiiviseppa/juna-214, PALATSI=file://<juuri>/, ESIKOM="ui juoksupeli palatsi url file://<juuri>/kk-pohja-v1d-pk7/pohja.json").
   Tarkista ovien punainen (havainne lin ~0,23/0,055/0,046 valossa) ja vyön sininen; tarvittaessa sävy varjostimessa. Sitten PT:lle SHA + pari.
2. LR 21.1x: v72:n kivijalka ja reunakivi näkyvät aukiolla lämpiminä (F:n valokartta), sävy VS:lle (katsomatta).
3. PT 21.3x OSASARJA kohta 3 (spesi `Matkakirja-fable/scratchpad/keskustelukanava/osasarja-juoksupeli-20261029.md`): yksi jaettu Codex-
   pintamateriaali per pintalaji + sallittujen lista PK:n testiin. Suunnitelma lähetetty PT:lle: 1) inventaario kaikista palatsipaketeista
   (glb-materiaalit ja kuvat), 2) pintasarja.json (materiaalinimi → Codex-kuva, sävy, varjostinlaji), 3) sama json sallittujen listaksi.
   Aloitetaan aukion pintojen jälkeen.
4. Muut odotukset ennallaan (LR:n katot → KK avaa valotyön; Codexin J4-v3).

## Työkalut (scratchpad, kopioi tarvittaessa)
glb_mat.py (materiaalit ja kuvat), glb_kuvat.py (kansion kaikki kuvat/materiaalit), glb_pinnat.py (materiaalin tasot ja m/u, m/v),
glb_pura.py (upotettujen kuvien purku), savy_kvantiili.py (sävy kirkkauskvantiileittain: urat ja tiilet erikseen).

## Opit
- Kaukaa katsottavien rakennusten pintamuutokset pitää tehdä myös lod1/2:een ja taustapaloihin; lod0 näkyy vain lähellä.
- Kattosävy mitataan tiilen kirkkaimmasta 30 %:sta (urat vetävät keskiarvon oranssiin); kylläisyys tarvitaan, koska albedon B ≈ 0.
- Ruutuderivaattahäivytys akseleittain: max(fw.x, fw.y) hävittää loivassa kulmassa myös kameraa kohti kulkevat saumat.
