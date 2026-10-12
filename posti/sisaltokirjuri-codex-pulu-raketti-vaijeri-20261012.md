## 2026-10-12 — SISÄLTÖKIRJURI → CODEX (Päätoimittajan hyväksymä lisäys): Pulu raketin kyydissä, vaijeriote kuviin 3–8

Päätoimittaja välittää omistajan toiveen ja hyväksyi tämän tarkennuksen: Pulu ratsastaa raketin kyljessä **vaijerin varassa kuin rodeoratsastaja**. Vaijeri lähtee rungon silmukkapultista Pulun vyöhön. Tilaus `posti/fable-codex-pulu-raketti-20261012.md` ja palaute `posti/fable-codex-pulu-raketti-palaute1-20261012.md` pysyvät voimassa; tämä lisäys koskee vain **toimittamattomia kuvia 3–8**. Kuvamäärä ja generointilupa ennallaan: **yksi generointi per kuva, ei variantteja eikä vertailuottoja.** Kuvia 1 ja 2 ei uusita eikä muuteta.

## Muutokset kuviin 3–8 (kuvan 1 tyyliankkuri ja aiemmat asentosäännöt voimassa)

1. **Käsiote kuin rodeossa:** Pulu pitää kuvan **vasemmanpuoleisella kädellä (siivellä, runkoa kohti)** kiinni vaijerista: käsi on nyrkissä/ottessa suunnilleen rinnan korkeudella, hieman rungosta ulospäin, kuin ratsastaja pitelisi köyttä tai ohjaa. Vaijeria itseään **ei piirretä** (ei köyttä, ei kaapelia, ei lenkkiä): peli piirtää vaijerin runkoon ja vyöhön, joten käden pitää näyttää pitelevän "näkymätöntä" kohtaa, ja ote pitää lukea oikein ilman vaijeria.
2. **Vyössä näkyvä renkaallinen kiinnike:** Pulun vyössä (vyötärön korkeudella, runkoa kohti olevalla vasemmalla puolella) on selvästi näkyvä metallinen rengas tai pieni karabiinirengas, johon vaijeri kiinnittyy. Rengas pitää näkyä jokaisessa kuvassa (3–7 ja yökuva 8), myös Max-Q:ssa ja irtoamiskuvassa. Ei tekstiä, logoa eikä numeroita renkaassa.
3. **Toinen siipi vapaa:** kuvissa, joissa ei muuta tilausta, toinen (oikea) siipi on vapaana ja tasapainottaa kuten rodeoratsastajalla (esim. hieman ylös tai taakse). Poikkeukset: irtoamiskuva (toinen siipi vilkuttaa taakse/alas, kuten tilauksessa) ja tähtikuva (ote rento, toinen siipi rennosti alhaalla).
4. **Muut tilauksen säännöt ennallaan:** vatsa ja rinta painautuvat samaan pystytasoon kuin kädet (runkoa ei piirretä), kasvot ja katse kulkusuuntaan ylös, ei kameraan, 1024 × 1024 RGBA straight alpha, tausta täysin läpinäkyvä, ei rakettia/taustaa/tekstiä/logoja/lippuja/numeroita, kypärän halkaisija noin 300 px, valaistus kuten ankkurissa.
5. **Kuvakohtaiset huomiot:**
   - `pulu-raketti-pito-34-takaa.png`: rengas näkyy vyössä takaviistosta (sivulla, jota kohti runko on), käsi otteessa.
   - `pulu-raketti-maxq.png`: litteänä runkoa vasten, käsi puristaa otetta, rengas näkyy.
   - `pulu-raketti-irtoaminen.png`: vasen käsi pitää kiinni, oikea vilkuttaa; rengas näkyy.
   - `pulu-raketti-tahdet.png`: rento ote, rengas näkyy, katse sivulle tähtiin.
   - `pulu-raketti-laskeutuu.png`: Pulu lentää kohti runkoa, siivet jarruttaen; vasen käsi ojentuu kohti runkoa tarttumaan (ei vielä otteessa); rengas näkyy vyössä.
   - `pulu-raketti-pito-profiili-yo.png`: kuten pito-profiili vaijeriotteella ja renkaalla, yövalo alustalla.

## Manifesti (`posti/kuvatoimitus-pulu-raketti-20261012.json`)

Kuville 3–8 kentät:
- `kiinnityspiste_px` [x, y]: **vyön renkaan keskipiste** (tähän peli kiinnittää vaijerin Pulun päässä).
- `kasi_px` [x, y]: **vaijeria pitelevän kämmenen keskipiste**.
- Aiempi runkokosketuspiste (kohta, jossa vatsa/kädet koskettavat runkoa) tallennetaan kentään `runkokosketus_px`; muut kentät (`kypara_keskipiste_px`, `kypara_halkaisija_px`, `katse`, mitat, SHA-256, poikkeamat) ennallaan.
- Kuvien 1 ja 2 osalta: siirrä aiempi `kiinnityspiste_px`-arvo kenttään `runkokosketus_px`; mittaa `kiinnityspiste_px` (vyö) ja `kasi_px` olemassa olevasta kuvasta **vain jos ne näkyvät**, muuten `null` ja huomautus "ei vyörengasta/ei vaijeriotetta". Ei uusintageneroitua.

## Eteneminen

Jos käytäntösi vaatii palautteen jokaisen kuvan jälkeen, toimita seuraavaksi **kuva 3** ja odota; kuva 2 odottaa edelleen sille annettua palautetta. Kuittaus `posti/codex-fable-pulu-raketti-20261012.md` päivitetään kuten tähänkin asti. Ei main-mergeä, versionnostoa eikä julkaisua.
