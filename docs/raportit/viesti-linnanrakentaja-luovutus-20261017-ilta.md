# Linnanrakentajan luovutus 17.10.2026 klo 20.15 (Opus) – Postivahdin kova raja 35 %

Edellinen luovutus: `viesti-linnanrakentaja-luovutus-20261017-iltapaiva.md` (f74f0e5b2). Viestit lähetetään AINA session id:llä
(`/Users/Shared/Claude/osoitekirja.md`). PT:lle enintään 3 riviä, ja polut ovat absoluuttisia.

## 1. SEURAAVAKSI

1. **Kartan 3D-yhtenäistys (LR vetää; OMISTAJAN PYYNTÖ 19.27 PT:n kautta: "Ne kaikki kartan 3d elementit pitäisi olla jotenkin
   yhdenmukaisen värisiä ja kokoisia"; EI junaan ennen omistajan hyväksyntää).**
   - **Simuajo:** JU ajaa gallerian simun käännöksellä **605a9df4b** (proto `pelikoodari/galleria-200`), skenaario
     `/Users/Shared/Claude/proto-3d/tyokalut/pelikoodari-ajot/sk-galleria.txt`, kuvat g-nyt, g-yhtenainen ja g-pois. Kuvat ja
     todistuskansio tulevat LR:lle ja PK:lle.
   - **Kun kuvat tulevat:** tee arkki nyt | yhtenäistetty → PT (3 riviä + polku) → KK → omistaja.
   - **Arkkiin merkintä:** 605a:sta puuttuu LS:n maavarjokorjaus d4cd95e70, joten matalan esineen (pyramidi) varjo voi jäädä
     esineen taakse.
   - **Korjattu versio 1ae87ca5a:** PK:n uusi sha sisältää korjauksen ja saman pudotuksen nappulan ja kipsipäiden soikioissa. Viestit
     menivät ristiin, ja JU pysäytti sen odottajan. Aja se vain, jos PT tai omistajan kierros tarvitsee uuden arkin.
   - **Suunnitelma ja säännön luvut:** `/Users/Shared/Claude/proto-3d/_valmiit/kartan-pienoismallit-v1/SUUNNITELMA.md` (5 polkua
     A–E, karttapaletti 15.10., seepiaramppi, kokosääntö KarttaesineKoko, valo 58°/x 0,35, MaaVarjo kaikille).
   - **Työnjako:**
     - VS: varjostimet proto `linssiseppa2/kartta-seepia` 6a2659c59 (KarttaSeepia.Aseta, include KarttaSeepia.hlsl). Ramppi tehdään vain
       varjostimessa. LR:n CPU-muuntaja `Seepiaramppi.cs.txt` jäi käyttämättä.
     - PK: galleria, kokosääntö, C-polku (Maamerkit → AjattelijaPaa) ja MaaVarjo kaikille.
     - LS: MaaVarjo-arvot (d4cd95e70).
   - **Hyväksynnän jälkeen:** sääntö kirjataan 3D-maamerkki-pohjaan uutena lukuna "Kartan pienoismallit" (LR). Sen jälkeen juna:
     NS kokoaa haarat (VS kartta-seepia + PK:n sääntöosat ilman galleriaa, jos PT niin linjaa).
2. **Codex, Tivolin erät A ja C (8 havainnekuvaa):**
   - Codex ei ole vastannut klo 15.00–20.15 välisenä aikana. Tilaukset: A 58b6551df, muistutus d77eb4d11, C 42e58111f, C6-korjaus 7f5456025.
   - PT:lle on ilmoitettu klo 18.00, ja Codex-kanava on PT:n.
   - Taustavahti sammuu nollauksessa. Tarkista posti käsin: `git ls-tree -r --name-only origin/claude/postilaatikko | grep tivoli-era`.
   - **Kun kuvat tulevat:** jatka iltapäivän luovutuksen kohdan 3 mukaan. Seuraava versiopari on esittely/koopenhamina-v11 +
     pallokierros-v13, ja paketin kirjain h.

## 2. TEHTY 15.00–20.15

- **Tivoli junaan 200** (omistaja 15.12 "Kyllä, junaan"):
  - PR #4808 mergetty c3efd3df6, ja Pöllön julkaisu meni läpi (worker v10).
  - Kuvanosto todistettu simulla klo 15.36 (PK, ed0985d7d): järvi 0,0 s, Carstensen 12,4 s, Pierrot 31,0 s, ei litografiaa.
  - pallokierros-v12 a59b0f916 on rungossa 3920f1205.
  - Oppi: klo 15.01 ajettu ajo käytti vanhaa workeria (v5) ja vanhaa kierrosta (v7). Tarkista lokista versiot (`yksityiskohtakuvat … [esittely/…-vN]`,
    `pallokierros-vN`) ennen kuin hyväksyt todistuksen.
- **Louvre k72 → v6k23 (omistaja 15.18):**
  - Leikkaus on 253 pistettä: oman pyramidin (k59+) ulkoraja ilman v6k22:n 722 pisteen aukkoja.
  - Natiivi: VS 169c804aa, rungossa b4242fbd2.
- **Louvre k75 → v6k24 → v6k25 (omistaja 16.56):**
  - LR:n julkisivu k75 (kivi ×1,04, kivi_v ×1,08, kivi_t ×0,94, lasi 40,43,48, puite 168,154,132, tummat päätykentät) + VS:n sävy, vesi ja pronssi.
  - v6k24 vietiin R2:een klo 17.03.
  - VS:n k82 yövalo ("yoValo": [3.0, 0.3, 40]) → **v6k25**, vietiin R2:een klo 19.40, ja se on lukitusehto uusin-4 → v6k25 junassa 200.
    VS:n koodi efd75c836 on rungossa 510d4dd39.
  - Rakennusskriptit ovat `_tyo/linnanrakentaja/louvre/rakenna-v6k2{3,4,5}.py`, ohje `_valmiit/louvre-v1/INTEGRAATIO-k72.md` + `-k75.md`.
  - PT: julkisivukierroksia ei tehdä nyt. Harmaus johtuu varjojen taivasvalosta, ja se kuuluu VS:lle.
- **Louvren pienoismalli** `_valmiit/louvre-kartta-v1` (1019 kolmiota):
  - LS kytki sen (749a0bc57), mutta omistaja 19.15 → LS korvasi sen pelkällä lasipyramidilla ja maavarjolla (f36097b49 → cf61e859d).
  - Malli jää varalle.
- **Worktreet:** 4 poistettu (~4,6 Gi). Jäljellä `wt/linnanrakentaja-vapaa-lento-osio` (pysäytetty) ja tyhjä `wt/linnanrakentaja-posti`
  (vain .DS_Store, Postivahti siivoaa).

## Opit

- **Talteen ennen vientiä:** luuppi-vienti ylikirjoittaa `luuppi-vienti/glb`:n. Ota edellinen talteen ennen kierrosta (k65 →
  `tavoite/kierrokset/k65-glb/`).
- **R2:ssa olevaa pakettia ei muuteta:** pienikin mallit.json-muutos tehdään uutena vNkM:nä (v6k24 → v6k25).
- **Ristiin menneet viestit:** kun jono on jo liikkeellä, älä lähetä uutta vaihtopyyntöä. Kysy ensin JU:lta, kumpi sha on lukossa
  (605a/1ae87 heilui kolmesti).
- **zsh ja git show:** `git show $B:polku` ei toimi zsh:ssa, koska `$B:A` laajenee polku-modifieriksi. Käytä muotoa `"haara:polku"`.
- **Nollauksen jälkeen:** Seuraava Pelikoodari voi palauttaa vanhan ohjeen luovutuksesta (CPU-ramppi). Tarkista PK:n luovutuksesta,
  että viimeisin linjaus on mukana.
