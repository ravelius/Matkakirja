# Pelikoodarin luovutus 25.9.2026 klo 19.1x (kontekstin nollaus)

Jatkoa luovutukselle `viesti-pelikoodari-luovutus-20260925-ilta.md`. Merge-pyynnöt ja kuvaukset ovat tiedoston
`/Users/Shared/Claude/proto-3d/lokit/merge-pyynto-pelikoodari-maisemakompressori.md` lopussa.

## 1. Valmista tällä sessiolla (kaikki junassa juna/b13 b37d2b3e = build 16, ellei toisin mainita)
- **C16 + C10 + C12** todennettu videolla (`lokit/liikkuminen-pariteetti/c16-uusinta-D/TULOS.md`). Liikkumislistassa ei avoimia rivejä.
  Oppi: iPhonella pulun kuplat ovat piilossa (vain ääni) → videolle `ui pulu tekstit nakyviin`.
- **b14-tarkistuslista** `docs/raportit/b14-tarkistuslista.md` (#3194, main). Laitetestaaja: 109 PASS, 100/93/104 seuraavalla kierroksella.
- **Verkko-odotusmittari** `Kartta/VerkkoOdotus.cs` (odotus ms per vaihe, haut ja osuma-% per vaihe/lähde; `verkko`-komento)
  ja savuke `Peli-testit/verkko-savuke.sh` (kylmä; `LAMMIN=1`). Raportti `docs/raportit/esilataus-nykytila-20260925.md`
  (#3205, #3212, #3227 mainissa) ja suunnitelma `docs/raportit/esilataaja-suunnitelma-20260925.md` (Fable hyväksyi).
- **Löydös 117** (väripallojen valot vain kohdemaassa): `AiheValot` rajaa `NostoKerros.NykyinenMaa`:han. Kuvapari `lokit/loydos117-valot/`.
- **Löydös 118** (avausluenta aloitusruudussa): `Kartta/Mukana.cs` + `Assets/StreamingAssets/mukana/` (intro-puhe, etusivun musiikki).
  Mitattu 31 ms painalluksesta ääneen (Natiivi-UI). Musiikki jatkuu samana raitana webin vaimennuksella.
- **Esilataaja erä 1** `Kartta/Esilataaja.cs`: jono (6, näkyvä ohittaa, tausta väistää näkyviä laattoja), uusinta 1/2/4/8 s,
  osuma-%, uusin.json kerran (`Sisalto.VersioPolku`). Laatat pysyvät laattapalvelimen omassa jonossa (kirjattu poikkeama).
- **LÄMPÖERÄ** (omistaja 18.2x) `pelikoodari/lampo` 97f97fa4 → junassa b37d2b3e:
  - `Kartta/Ruudunpaivitys.cs`: ainoa targetFrameRaten/renderFrameIntervalin kirjoittaja. TÄYSI liikkeessä (kosketus, pallo, lento,
    linssi auki, Herata), LEPO 30 fps, PAIKALLAAN (piirto 2 s välein) kun kamera levossa + laatat valmiit + `UiRauhassa`.
    Peitossa (`ILehtiNakyma.PeittaaRuudun`) pallon kamera pois.
  - `Kartta/Lampo.cs` + `Plugins/iOS/MatkakirjaLampo.mm`: thermalState/virransäästö; Kuuma → 30 fps, renderScale 0,7, bloom pois,
    Esilataajan tasot 4–5 seis; Kriittinen → 20 fps. Komennot `ruutu`, `lampo normaali|kuuma|kriittinen|auto`.
  - KehysMittari: rivillä tilat/piirretty/fps/thermal/akku, tiedosto vain kehittäjätilassa. `LampoMittari`: 30 s rivi + Documents/lampo.jsonl.
    Erillinen `pelikoodari/lampo-mittari` de8fbec8 (masterin build 15 päällä, ei käytösmuutoksia) Natiivisepän iPad Pro 13 -vertailuun.
  - Mitattu simulaattorissa (`lokit/lampo/`): liike p95 18,1 → 17,7 ms, max 66 → 19,6 ms; lepo 30 fps; lehden sulkeminen ehjä.

## 2. AVOINNA (seuraava sessio aloittaa tästä)
1. **Lepopiirto (PAIKALLAAN) ei vielä toteudu**: `UiRauhassa` (Natiivi-UI, `UiKerros.Rauhassa`, IPanel.isDirty) pysyi epätotena
   Ateenassa levossa (iPhone ja iPad). Natiivi-UI selvittää `ui rauha` -komennolla. Tarkista heidän korjauksensa jälkeen `ruutu` →
   "Paikallaan" ja KehysMittarin `tilat.paikallaan > 0`, `piirretty < kehyksia`. Natiivisepän `PallonLepo` (Levossa + laatat +
   kartan animaatiot) tulee junaan → vaihda `Ruudunpaivitys.Muuttuu`/`LiikkeenSyy` käyttämään sitä (hän ilmoittaa SHA:n).
2. **Esilataaja erä 2** koodattu, MITTAAMATTA: `pelikoodari/esilataaja-2` eaf5b352 (worktree `/Users/Shared/Claude/wt/proto-pelikoodari-lampo2`,
   pohja juna/b13 b37d2b3e). Sisältää myös Natiivisepän pyytämän korjauksen 3cf6ae5b (PalloSumennus.PerusSkaala normaalilämmössä).
   - `PeliOhjain.SaapuminenTiedossa` (aloituslennon ja matkan alku) → `puhe.Esilataa` (saapumispuhe, luento); `UiNakymat.EsilataaSaapuminen`
     → `Kuvat.Esilataa` (luentakuvat, PuluCam, trailerin kuvat) + `NostoSisalto.Esilataa(maa, SeuraavaRuutu)`. lento-alku buildissa.
   - Käännös valmis: `/Users/Shared/Claude/proto-3d/lokit/esilataaja-2-app` (eaf5b352). **Simulaattorivuoro A2FD9C9F noin klo 19.50** (Julkaisija).
     Aja worktreestä: `Peli-testit/verkko-savuke.sh /Users/Shared/Claude/proto-3d/lokit/esilataaja-2-app A2FD9C9F-37CA-4D7A-BA59-E65AF9EBCCA2 /Users/Shared/Claude/proto-3d/lokit/verkko-odotus/era2-kylma`
     ja sama `LAMMIN=1` → `era2-lammin`. Tavoite rivi "RAJA saapuminen 0 ms verkko-odotusta: PASS" kylmänä ja lämpimänä.
     Kirjaa ennen/jälkeen raporttiin `docs/raportit/esilataus-nykytila-20260925.md` (luku 5), sitten merge-pyyntö Natiivisepälle
     (UiNakymat- ja NostoSisalto-muutokset ovat Natiivi-UI:n tiedostoissa: kerro heille).
3. **Esilataaja erät 3–4** (suunnitelma): kohdat 4 (joutilas) ja 5 (ennakointi `SiirtoKohteetMuuttui`), virransäästö (jo Lampo.Kuuma),
   muistin LRU (iPhone 200 / iPad 300 Mt) ja 2 Gt:n levysiivous, kohta 6 Linssisepän listoilla. Siirtosepän rajapinta
   (`Kohde.Tiedosto`, `RyhmaValmis`, `Joutilas`) on vielä toteuttamatta Esilataajassa (Siirtoseppä odottaa, PR #3200).
4. **Laitemittaus**: Natiiviseppä mittaa iPad Pro 13:lla build 15 (lampo-mittari) vs build 16; Laitetestaaja ajaa vartijan
   (levossa fps ≤ 30, lepo.p50 ≥ 30 ms; lepopiirto kun kohta 1 valmis). Lämmön pakotus: `lampo kuuma|kriittinen|auto`.

## 3. Opit
- `Peli-testit/unity-tarkistus.sh` palauttaa exit 0 myös virheillä: lue "virheitä yhteensä 0".
- "luento ei alkanut" → tarkista peli-tila `puhe.paalla` (simulaattorin luennat voivat olla pois).
- Simulaattorin datakansio vaihtuu uudelleenasennuksessa: hae `get_app_container` joka kerta. Asennus "ei asennettavissa" → `simctl uninstall` ensin.
- Pariteettikuvat worktreessä: `PLAYWRIGHT_JS=/Users/Shared/Claude/Matkakirja-fable/node_modules/playwright/index.js`; uusi näkymä tarvitsee TODENNUS-rivin.
- Väripallot (karttavalot) ja nostomerkit ovat eri kerroksia: merkit NostoKerros (jo kohdemaassa), valot AiheValot.
