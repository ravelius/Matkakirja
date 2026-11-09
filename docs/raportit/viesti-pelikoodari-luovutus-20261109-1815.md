# Pelikoodari: luovutus 09.11.2026 klo 18.15

Korvaa kaikki aiemmat. Nollaus kontekstivahdista (26 %). Edellinen: `git show 5841157d6:docs/raportit/viesti-pelikoodari-luovutus-20261109-1745.md`
(kaikki sen kohdat hoidettu). Kuvat ≤ 1000 px (sips -Z 1000 scratchpadiin), laajat haut Sonnet-agenteilla.

## TEHTY TÄSSÄ VUOROSSA
- LONTOO-PULU v4 08f48ac73 KUITATTU (ajo -v2, sisältö v1031; 1. ajo käytti välimuistin v1030:aa): Abbey/Cutty Sark keskikohteina,
  valmiit 2, siru → valmis vastaus. JU poimi junaan 224 (ae1e1b680).
- NIMIÄÄNET eb4318b15 KUITATTU (sk v3: napauttaa näkyviä Saint-Merrin kirkko / Porte Saint-Denis → n120/n109.mp3 soi; ✦ Les Halles ei
  nimiääntä). PT kuittasi junaan 224. sk v1/v2 -v1/-v2.txt samassa kansiossa. Concorden musta kuva = esikatselun kuvausvirhe ElavaKerros
  KERROS-tilassa (JU lisäsi mac-yleis.zsh:iin "pallo kerros pakota taysi").
- LES HALLESIN LUENTA HILJAA (PT 18.1x: selvitä ja korjaa):
  1. Syy A (korjattu): välimuistissa 0 tavun mp3 (palvelin 2xx ilman tavuja; esikatselun aani-kansiossa 62/158 tyhjiä) → FMOD "Unsupported",
     tyhjä klippi soi hiljaa. KORJAUS 6cd7efcdc natiivi-backup pelikoodari/puhe-tyhja-klippi (eb4318b15:n päällä; työpuu
     /Users/Shared/Claude/wt/natiivi-nimiaanet-yhd), unity-tarkistus 0: Puhe.Levylla (0 tavua ≠ osuma, poisto), TyhjaVastaus (ei tallenneta,
     1 uusi haku), rikki klippi → uusi haku verkosta / varalla / LatausPetti. JU-ajo pyydetty 18.1x: sk v3 iphone →
     lokit/pk-luenta-tyhja-iphone-6cd7efcdc (aani-kansiota EI tyhjennetä). PT tietää.
  2. Syy B (AUKI, seuraava työ): v8-valmisluennat eivät osu 7 kadonneelle ihmeelle (Grand Châtelet, Temple-torni, Palais d'Orsay, Palais de
     l'Industrie, Trocadéron palatsi, Galerie des Machines, Les Hallesin hallit). Hahmotelma-nosto (NostoSisalto.Kohde, ei ingressiä) →
     Kappalejako.Jaa puolittaa yksikappaleisen tekstin (≥ 3 virkettä: 1. kappale (n+1)/2 virkettä) → pelin pala 1 ≠ v8:n t (= koko teksti).
     Muut 19 osuvat. Tuileries'n palatsi: pelin tagi tyhjä vs v8 l "[pause]" (reitti tarkistamatta). Pelin pala 1 -tekstit ja tagit:
     /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/pariisi-nimet-20261109/v9-leikkaus/pelin-palat.json (laske.py).
     KORJAUSAJATUS (kerrottu PT:lle, ei uutta ottoa): nykyiset otot (alut1/alut2: ajat/ merkkiajat, master/, pilkonta.json) leikataan pelin
     paloiksi pala 1 (tagi [pause]) + pala 2 (viimeinen, tagi tyhjä) → v9/k/ + manifesti v9 (v8 + 14 avainta), Valmisluennat.ManifestiOletus
     v8 → v9, kultainen + testi kuten PariisinAlutOsuvatV8Kansioon (osuvat pelin LuennanPalatJaTagit-paloihin). Tarkista ensin pala 2
     (pelin pala 2 = loput tekstistä, viimeinen pala → tagi null) laske.py:llä. Media JU:n kautta (ämpäri), koodi omaan haaraan.

## JONO
1. JU:n ajo 6cd7efcdc (lokit/pk-luenta-tyhja-iphone-6cd7efcdc): Les Halles → "tyhjä välimuistitiedosto … poistettu" tai uusi haku,
   EI "FMOD Unsupported", "puhe: alkoi … (verkko)". Kuvat/loki katsottuna → PT:lle ≤ 3 riviä → junaan 224.
2. Syy B: v9-leikkaus (yllä) → JU-vienti + koodi → JU-ajo (Les Halles: "valmis kappale … ← <avain>.mp3" v9/k/) → PT.
3. Kun molemmat kuitattu: "JONO TYHJÄ: Pelikoodari" PT:lle.

Testit: `cd Peli-testit && sh kaanna.sh <osa>`, `sh Peli-testit/unity-tarkistus.sh` (työpuussa); pöllö: `node --test tests/pollo*.test.mjs`.
