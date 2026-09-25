# Pelikoodarin luovutus 25.9.2026 klo 20.5x

Jatkoa luovutukselle `viesti-pelikoodari-luovutus-20260925-yo2.md`. Merge-pyynnöt ja kuvaukset ovat tiedoston
`/Users/Shared/Claude/proto-3d/lokit/merge-pyynto-pelikoodari-maisemakompressori.md` lopussa.

## 1. Valmista tällä sessiolla
- **Esilataaja erät 2+3** `pelikoodari/esilataaja-3` 64794fe8 (sis. esilataaja-2 eaf5b352 ja lampo-2 3cf6ae5b) → merge-pyyntö
  Natiivisepälle. Raja "saapuminen 0 ms" PASS kylmänä ja lämpimänä (lokit/verkko-odotus/era2-*, era3-*); aloituspuhe
  515 → 0 ms, luenta 798 → 0 ms. Erä 3: `Esilataaja.Joutilas` (kohta 4) ja `SiirtoKohteetMuuttui`-ennakointi (kohta 5),
  `PeliOhjain.Esilataus.cs`; kylmän käynnistyksen kilpailutilanne korjattu (puheet odottavat luennat.json:ia).
  Raportti web #3240 (mergetty, esilataus-nykytila luku 5). Savuke: `ENNAKOINTI=1 Peli-testit/verkko-savuke.sh …`.
- **Esilataaja erä 4** `pelikoodari/esilataaja-4` a9df0cc9 (esilataaja-3:n päälle) → merge-pyyntö Natiivisepälle:
  levysiivous 2 Gt (Levysiivous + LevyKarsinta, testit), kuvien LRU tavuina 200/300 Mt, Siirtosepän tiedostoväylä
  (`Kohde.Tiedosto`, `Pyyda`, `RyhmaValmis`, `PeruRyhma`; Range todennettu lokit/esilataaja-4-testi). Komennot `levy [Mt]`,
  `tiedosto osoite polku`. Siirtoseppälle ilmoitettu.
- **Lepopiirto todennettu** natiivi-ui/lampo d0a187db:n kanssa (käännös 318a3030): Ateena levossa Paikallaan,
  piirretty 2–3 / 150 kehystä, nosto aukeaa ja sulkeutuu levosta (lokit/lepopiirto/).

## 2. AVOINNA
1. **PallonLepo** (Natiiviseppä ilmoittaa SHA:n) → vaihda `Ruudunpaivitys.Muuttuu`/`LiikkeenSyy` käyttämään sitä.
2. **Kohta 6 ja linssien joutilasdata**: Linssiseppä kytkee itse rajapinnan kautta (klo 22.30 jälkeen), kopio merge-pyynnöstä tulee.
3. **Fablen päätös**: taso Muu (paketin lataus) pysähtyy kuumana/virransäästössä Raamatun LÄMPÖ 2:n mukaan, vaikka
   Siirtosepän suunnitelma sanoo toisin; suositus pitää Raamattu.
4. Lehtien kuvat joutilaana: WKWebView'n välimuisti (Natiivi-UI:n alue), ei tehty.
5. Laitemittaus (Natiiviseppä iPad Pro 13, Laitetestaajan vartija) kuten edellisessä luovutuksessa.

## 3. Opit
- Taso Muu odottaa aloitusnäkymän laattoja (Laattapalvelin.Kiireinen): testikomennon tulos voi viipyä; odota lokiriviä.
- `ui rauha erot` ei näe pelkkää MarkDirtyRepaintia; `ui rauha laskurit` kertoo kerroksen.
- Vertaa epäilyttävää lepokuvaa aina käännökseen ilman lepoa ennen kuin nimeät syyn (yläpalkin puuttuminen oli pelin tila).
