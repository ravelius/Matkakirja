# Natiivisepän luovutus 12.10.2026 klo 22.3x (konteksti ~50 %)

Lue ensin: CLAUDE.md, Raamatun Ydinajatus kohta 2 ja tämä kokonaan. Työkalut ja jono: /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/juna184/
(jono-184.txt, jaljella-184.md, build184-viesti.txt, muutosloki-184.txt) ja juna183/luovutus-huomiot.txt (pysyvät säännöt).

## TILA

- **TF 184 valmis**: BUILD 184 = proto master 0b99959b2 (merge juna/b14 0b7f6414c, 50 erää; lukituskäännös KÄÄNNETTY 3a1c0bb45).
  iOS sisäisillä 21.37 (Julkaisija, ajo 38289583639 → 38291284779). Mac 1.1 (184) ladattu (ajo 38291385841). Web #4525 MERGED.
  Omistajan linja 20.2x: julkaisu heti kun kaikki 184-suunnitelmat sisässä, EI testikierrosta ennen TF:ää → testit, LT ja muistiportti TF:n jälkeen.
- **Pikajuna 184.1 = TF 1.1 (185)** (TF-työkalut hyväksyvät vain kokonaisluvun; seuraava juna on 186): master 0c68947bd = juna/b14 67c88856e
  (0b7f6414c + NUI cf5b48387 kuvakkeet/kohdekaupungit/Googlen laatat -kytkin + LS2 49a8575bc eläintäyt + lepotilan Google-laatat pois).
  iOS TF lähti 22.29 (ajo 38297999064). **Mac 185 EI** (omistaja 22.3x); Mac-käännös tehtiin jo (lokit/natiiviseppa-mac-tf-185, 0,47 Gt; jää lokien normaaliin siirtoon, PT).
- Runkohaara natiiviseppa/juna-184 (wt/proto-natiiviseppa-j175) = 0b7f6414c + pikajunan merget → 67c88856e. Seuraava juna 186 alkaa master 0c68947bd:stä.

## AUKI (järjestyksessä)

1. **Muistiportti A/B** (183-TF-app lokit/natiiviseppa-app-183-laite 7051f701 vs 185-runko 67c88856e) iPad Pro 13:lla: Julkaisija antaa KÄÄNNÖS NYT
   TF 185 -käännöksen jälkeen ja LAITE NYT perään → `zsh juna184/ketju184ab.sh 67c88856e` perl setsid -irrotuksella (Julkaisijan ohje; mittausskripteissä
   5 × uusinta devicectl-virheelle). Ketju: laite-sha.sh (L1-lukko, Release) → LUKKO VAPAA → odottaa lippua lokit/natiiviseppa-laitevuoro-ok (touch LAITE NYT:n
   jälkeen) → Pariisi 183|184, Olavinlinna+ISS ipad-ab, museo 183|184. HUOM: ketju184ab.sh nimeää appit 183/184 ja APPD=lokit/natiiviseppa-app-184-laite.
   Tulos PT:lle yhtenä rivinä (vapaa min, fp-huippu, kehysaika) + "lisää muistia: kyllä/ei".
2. **Juna 186 -jono** (PT:n kuittauksella): NS mac-nimi-185 b594e46a8 (Rakennus.MacNayttonimi: tuore Mac-ohjelmatiedosto korvaa aina vanhan — BUILD 184:n
   Mac-TF kaatui lipo-tarkistukseen, korjattiin käsin; mac184.sh tekee käsikorjauksen automaattisesti), Pelikoodari aanitesti-185 7c7b11525
   (PuuttuvatAanetTestit.TehosteetKytketty -lapi-vN; Linssit 1669/1669), taidehalli v6 (LS1), LS2:n raketin todennus TF-apilla, LT:n testit TF 184/185:llä.
   Omat iPad-mittaukset 186+: saapumisportin säätö, esikamera, rinnakkaiset 12 → 16 Pro-luokassa, Cesium for Unity -päivitys, MH-verkkojen CPU-kopio, B1-nykäys.
3. **Unity-beetaseuranta** klo 09.04 (CronCreate on istuntokohtainen → luo uudelleen: "4 9 * * *" + unity-julkaisut.py). 12.10.: ei uutta.

## OPITUT 12.10. ILTA (sitovia)

- **Yhdistys ehdokastyöpuussa**: wt/proto-natiiviseppa-ehdokas (haara natiiviseppa/mac-nimi-185 nyt) + juna184/yhdista-erat.sh <erälista> (rivit SHA|viesti,
  pysähtyy ristiriitaan). Runko j175 siirretään --ff-only vasta kun j175:n testiajo (testit184.sh) EI ole käynnissä (siirsin kerran kesken → väärä tulos).
- **Ristiriidat 184:ssä** (ratkaistu yhdistämällä): Maamerkit.Nayta (Kreikka + raketti), mac-plugarit/kaanna.sh (Swift + StoreKit-.mm), ui.fi.json ×2,
  KohdekarttaNakyma, Aarretehtavakortti (Seuraava(tuettu) + AlueellaPiilossa), OpasSovitin (KisaEstaa + etsintä), MuseoSovitin (LS1:n SaliAuki-erotus:
  Auki = SaliAuki || lahestyy; elämä ja MuseoAuki sovitettu), IlmakehaTaivas (myöhempi tummempi maasävy).
- **Käännöksen pysäytys**: tapa ensin proto-kaanna.sh (oma pid), sitten unity-vahti ja Unity-lapsi; muuten vahti käynnistää Unityn uudelleen ja orpo pitää
  projektin auki (seuraava käännös: "another Unity instance is running"). Tarkista lsof Temp/UnityLockfile.
- **LS1:n lähestymishaara** museo-lahestyminen-183 sisälsi hylätyn taidehalli v5b:n → vain puhdas haara (museo-lahestyminen-184b) junaan. Tarkista aina
  `git merge-base --is-ancestor <hylätty> <kärki>` ennen kuin otat roolin "uusimman kärjen".
- Auto mode -luokitin hylkää komentoja, joita ei ole luettu ("Blind Apply") → lue skripti Read-työkalulla ennen kuin ajat sen, joka muuttaa masteria.
- Asemataulun ArtifactData (talo/eteneminen) ei toimi tältä tililtä (artefakti jaettu toisesta organisaatiosta) → eteneminen viesteinä PT:lle/Julkaisijalle.
