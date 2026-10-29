# Valosepän luovutus 29.10.2026 klo 18.09

Lue ensin tämä, sitten loki `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md` (rivit 29.10. 17.2x →).
Worktree `/Users/Shared/Claude/wt/proto-linssiseppa2-p11`, haara **linssiseppa2/seinat-211**, kärki **e9f1174b1** (natiivi-backup).
Koehaara koe-luotain on poistettu. MAC-UUDELLEENKÄYNNISTYS: ei omia taustaajoja.

## Tehty: kivijalan pystyjuovat korjattu (PT kuittasi e9f1174b1)
- **Juurisyy:** `_NormaaliKartta` ei ollut JuoksuMaailma.shaderin Properties-lohkossa. Materiaalikohtainen kuva, jota ei ole
  Properties-lohkossa, jäi piirrossa edelliseltä materiaalilta, kun ympäristöheijastuksen luotain oli kuvannut kerran → kivijalka
  (sokkeli-v03) luki saman mallin kattotiilen normaalin (kattotiili-v01c: 4 harjaa + 4 vaakaviivaa = juovat ~0,3 m).
- **Korjaus e9f1174b1:** `[NoScaleOffset] _NormaaliKartta … = "bump"` ja `_ValoAtlas … = "white"` Properties-lohkoon
  (JuoksuMaailma; _ValoAtlas myös JuoksuLattia, sama riski). Heijastus säilyy. METAL 440/0, PIPELINE 432/0.
- Kokeet (02, juuri-v137m): M2 CPU-sidonta oikein; R GPU-kuva oikein (blit); N raaka normaali väreinä = kattotiili, mip ei vaikuta;
  O kappaleluotaimet pois ei auta; P SRP Batcher pois ajon aikana ei auta; V realtimeReflectionProbes vain kuvauksen ajan ei auta;
  W ominaisuus Properties-lohkoon → korjautui.
- Parit: v137m havainne-editori-20261029-172040 (+172314 pelikamera); omistajan korttiin pelikamerapari REF e9f1174b1 + juuri-v138m
  `proto-3d/lokit/havainne-editori-20261029-172625/{02,05}/havainne-peli.png` (havainne | peli, ei tekstiä) → PT:lle 17.3x.

## Kesken / seuraava askel
1. Odottaa omistajan korttia (PT/KK). Kortin jälkeen: seinat-211 **e9f1174b1** NS:lle junaan 214 (PT 17.3x). Viesti NS:lle id:llä
   osoitekirjasta, SHA + yksi rivi sisällöstä.
2. Muut odotukset ennallaan (LR:n katot → KK avaa valotyön; Codexin J4-v3).

## Opit
- Materiaalikohtaiset kuvat (`m.SetTexture`) aina varjostimen Properties-lohkoon; muuten sidonta voi jäädä edelliseltä materiaalilta.
- `Material.HasProperty`/`FindObjectsByType` eivät löytäneet palatsin piirtäjiä kokeessa: kerää tutkittavat kuvat luonnissa listaan.
- Raakanormaali väreinä (return tn) + blit tiedostoon erottaa nopeasti kuvan sisällön ja piirron sidonnan.
