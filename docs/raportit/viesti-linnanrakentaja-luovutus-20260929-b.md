# Linnanrakentajan luovutus 29.9.2026 klo 10 (erät 2 ja 2b)

Rooli: **Linnanrakentaja (Opus, max)**, Poikkileikkaus-linssi (id `poikkileikkaus`, moottori dioraama, hiomassa).
Päätoimittaja johtaa. Omistajan toive: Sonnet-agentit mahdollisimman laajasti, tulokset ≤ 15 riviä + polku.

## Omistajan linjaus 29.9. klo 07.5x (sitova, Päätoimittajan kautta)

Linna tuntuu vapaasti pyöriteltävältä 3D:ltä, siirtymät ovat kaarilentoja, eikä mikään kulma paljasta pahvia.
Keittiön v1:ssä verrataan samasta kulmasta **A** (proseduraalinen: materiaalit, valot ja rekvisiitta koodilla;
referenssi "Room 06, scale 1:12", `/Users/Shared/Claude/proto-3d/lokit/omistaja-20260929/`) ja **B** (Codexin
maalatut pinnat). Hahmot ovat 3D-pienoisfiguureja (oma suositus hyväksytty viestinä). Kokin Codex-atlas on pysäytetty.

## Haarat

- **Pelin repo** `/Users/Shared/Claude/wt/linnanrakentaja-keittio`:
  - `linnanrakentaja-keittio-2` = ravelius/Matkakirja#3601 (erä 2: media-, UV- ja ääniputki, esikatselu).
    Junassa, ja Julkaisija lisäsi v2396-commitin. **Älä pushaa tähän.**
  - `linnanrakentaja-keittio-2b` (530fda2e4) = erä 2b + Codexin osa 1 (`assets/dioraama/`). Ei pushattu.
    Kun #3601 on mainissa: `git rebase --onto origin/main 486727b20` ja uusi PR.
- **Proto** `/Users/Shared/Claude/wt/proto-linnanrakentaja-keittio`, haara `linnanrakentaja/keittio` ed82ab41:
  - b2aac83a: jaettu äänipooli (Natiiviseppä hyväksyi linjan A ja ottaa sen junaan merge-pyynnöstä).
  - b6f634e7 ja d2e83e7e: erä 2 ja katselmoinnin korjaukset.
  - c48bc049 ja ed82ab41: erä 2b.
  - Ei vielä merge-pyyntöä: odottaa ämpäriä (#3596) ja omistajan A|B-vertailua.

## Tila

- **Speksit** (pelin repo, docs/raportit/):
  - `dioraama-rajapinnat-era2-20260929.md`
  - `dioraama-rajapinnat-era2b-20260929.md`
  - `dioraama-aanirajapinta-ehdotus.md`
- **Codexin osa 1:** 9 pintaa ja 3 liekkiä tuotu `tools/dioraama/tuo-codex.mjs`:llä (lukee surfaces/flames-manifestin).
- **Äänet:**
  - 31 mp3:a, polku `dioraama/olavinlinna/aanet/v1/<id>.mp3`. mp3:t eivät koskaan tule repoon.
  - Vienti ämpäriin odottaa omistajan hyväksyntää uudelle CI-kohteelle (Julkaisija). Samoin #3596 (vie-dioraama.yml).
- **Simulaattori** (käännös 21d49e90 = d2e83e7e):
  - B-pinnat näkyvät, ei poikkeuksia.
  - Tekstuurimuisti 98 Mt. **Pienennettävä ennen TF:ää**: 512-versiot iPhonelle tai pakkaus.
- **Kolmas käännösvuoro pyydetty Julkaisijalta** (c48bc049 tai uudempi kärki, nyt ed82ab41). Jonossa 6., NYT-viesti tulee.
  - Aja: `S=<oma scratchpad> APPNIMI=<nimi> VAIHEET=129 MAXSIM=3 ajo-poikki.sh`, ensin iPad (`UDID=F75C92E7…`,
    `LAITE=ipad`, `KIERTO=vaaka`) ja sitten iPhone.
  - Skripti ottaa kuvat `9-pinnat-a/b` pysäytetystä hetkestä → **omistajan A|B-kuvapari** Päätoimittajalle
    (merkitse kulma ja SHA kuvaan, merkitse.py).
- **Esikatselu:** `node tools/dioraama/rakenna.mjs olavinlinna && node tools/dioraama/esikatselu-kuvat.mjs <kansio>`.
  Valot, varjot, kuviot, 3D-hahmot, kaarilennot ja kytkimet. Rajaus vastaa natiivia.
  Hahmot erikseen: `tools/dioraama/hahmot3d-esikatselu.html`.

## Avoimet asiat

1. **A|B-kuvapari omistajalle** (kolmas ajo). Tarkista samalla:
   - valot ja varjot natiivissa (DioraamaValaistu, `poikki valo …`)
   - 3D-hahmojen nivelten kiertojärjestys: Euler-kaava vain testattu, ei nähty
   - 3D-liekki
   - kaarilento keittiö ↔ yleis
2. **Tekstuurimuisti** (98 Mt): iPhonelle 512-versiot tuonnissa (sips) tai Texture2D.Compress; mittaa.
3. **JS:n kierto-muoto:** data `{atsimuutti:[a,b]}` vs kamera.js:n rajaaKierto `{atsimuuttiMin/Max}` (C# jäsentää
   oikein). Lisää JS-muunnos, kun dataan tulee kierto-kenttiä.
4. **Salin, vartiotuvan jne. nimet ja faktat erälle 3** (Sisältökirjuri): kellari = "Kellotornin fatabuuri",
   sali = "Keskushalli (väentupa)", kappeli Kirkkotornin 3. krs; tornit n1500: Kellotorni, Kirkkotorni, Pyhän Eerikin torni.
5. **"1475" (linna-kohta-0)** kuunneltava ennen julkaisua (Pelikoodari).

## Käytännöt

- Agentit: `Agent`, model sonnet, taustalla, useita rinnakkain.
  - Selkeä tiedosto-omistus, ≤ 150 rivin paloina.
  - Ei simulaattoreita, ei committeja: sinä kokoat, testaat ja commitoit.
  - Katselmointiagentit (vain luku) ennen käännöstä löysivät 4 todellista vikaa.
- Käännös ja simulaattori vain Julkaisijan NYT-viestillä. Ilmoita "sammutettu". Poista PRB-välimuisti omista simulaattoreista.
- Junassa olevaan PR-haaraan ei pushata. Uusi työ tehdään uuteen haaraan.
