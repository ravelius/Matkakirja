# C Resepti: museo (taidemuseon maa)

*(Lavastaja 23.10.2026, studiojako (Raamattu 4.21). Lyhyt tuotetyypin kooste. Tekotavat: `docs/tuotanto/tekotavat/3d-ja-kuvat.md`,
`tekstit.md`, `aani.md`, `ui.md`, `kamera-ja-video.md`, `testaus.md`; linssin kooste `reseptit/linssi-taidemuseo.md` (Linssiseppä);
vaiheet, portit ja luvat: `docs/tuotanto/tuotannonohjaus.md`. Voimassa oleva täysi pohja siirtymäajan:
`docs/moduulit/tuotantopohjat/taidemuseon-maa.md` (SITOVA, omistaja 20.10.2026 klo 23.22). Raamattu 2.123, 2.127–2.133, 2.182.)*

**Tavoitteen muoto:** havainnekuva salista (grafiikka), viitevideo tai kuvakäsikirjoitus uudesta kamerakulmasta (kamera) ja muutama
esimerkki pelinäkymässä uudesta tekstityypistä. Tavoitekuva ja valmis sali pelikuvana rinnakkain ennen junaa.

## Tuote

Yhden maan museo taidemuseolinssissä (vain natiivissa): salit ja kalusteet, teokset kehyksissä, veistokset jalustoilla, kävijät,
valo, opastettu kierros kertojan äänellä ja vapaa kulku, i-kortti ja ympyrät, salien avaukset. Malli: Louvre (`Resources/Museo/ranska/`);
Alankomaat Louvre-tasolla kävijöitä lukuun ottamatta (21.10.).

## Rajaus

- Maittain, yksi maa kerrallaan, Euroopassa (Raamattu 1.13). Italia vasta omistajan käskystä; Kreikan valtion muistomerkit piiloon
  Kreikan App Storessa.
- Ei kaupungin 3D-maamerkkiä eikä julkisivua kartalla (resepti `3d-maamerkki.md`), ei pääkaupungin avausta (`paakaupungin-avaus.md`).

## Tuotokset ja polut

| Tuotos | Tekijä | Polku |
|---|---|---|
| Aineistoselvitys | Sisältökirjuri | `docs/raportit/taidemuseo-<maa>-aineisto-<pvm>.md` |
| Teosdata ja kuvat | Linssiseppä | `Resources/Museo/<maa>/teokset.json`, `sali.json`, `huoneet.json`, `kierros.json`, `veistokset.json`, ASTC-paketit |
| Tekstit, i-kortti, ympyrät | Sisältökirjuri | kertojatekstit, `taiteilijat.json`, `lyhyt-<maa>.json`, `kohdat-<maa>.json` |
| Sali-GLB | Lavastaja | `_valmiit/taidemuseo-<maa>-vN-vienti-<pvm>/` → ämpäri `taidemuseo/<sali>-vN` |
| Kalusteet | yhteinen kirjasto `MuseoKalusteet` | `sali.json` `"glb": {"kalusteet": false}` + `penkit_malli`, veistosten `jalusta.malli` |
| Kävijät | Codex (Tripo), Lavastaja kokoaa | `Resources/Museo/<maa>/henkilot.json` + media `taidemuseo/<maa>-ihmiset-vN` |
| Valo | Valoseppä | `sali.json` `valotyyppi`, `valokeila`, galleriatyylin värit |
| Äänet | Äänittäjä | manifesti; askeläänet lattioittain (`lattia`-kenttä) |
| Kytkentä ja UI | Linssiseppä, Natiivi-UI | proto-haara + SHA Natiivisepälle |

## Reseptikohtaiset säännöt

- **Louvren taso kaikkiin:** penkit, teoskyltit, kävijät ja kalusteet ovat vakio-osia; `MuseoPariteettiTestit` vertaa Louvreen.
- **Sali-GLB:ssä ei kalusteita:** jalustat, penkit ja kaiteet yhteisestä kirjastosta. Jokaisella veistospaikalla jalusta; mikään ei leiju.
- **Kävijät maittain** (Tripon vaatteita ei vaihdeta), yhteinen liikkumistapa datasta (`MuseoKavijat`). Tilauksessa LIIKE: yleensä
  enintään yksi kävijä liikkuu. Kaikki saman salin kävelijät yhteen simulaatioon; kameran kaarelle ei sijoiteta (`MuseoLentoTestit`).
  Ensin muutama kävijä, lisää vasta kun ensimmäiset on nähty pelissä (määrän luvat: D).
- **Kehityslippu päälle samassa erässä kuin media** (`MuseoHenkilot.Paalla`); hyväksytty malli on pelissä oletuksena.
- **Valo alkaa valmiista valotyypistä** (kattoikkunasali, lasikattosali, kohdevalosali, kabinetti, grafiikkakabinetti, veistossali,
  aula); vain poikkeama säädetään ja perustellaan. Kehysten pehmeä varjo seinälle leivotaan (Lavastaja).
- **Uusi sali = uusi kansio** (`-v2k`, `-v2l` …); kerro kytkijälle käytössä oleva versio.
- **Ei koodin vakioita maalle:** salin rakenne, esteet ja penkit datasta (`MuseoMaaTestit.EiKovakoodattuaMaata`).

## Valmis kun

- [ ] Euroopassa (tai omistajan päätös); lähde- ja riskipäätökset tehty; teosluettelo PT:n hyväksymä.
- [ ] Tekstit, i-kortti ja ympyrät tarkistettu (riippumaton + PT) ja hyväksytty yhtenä eränä; puheen merkkimäärä PT:llä ennen ääniä.
- [ ] Sali-GLB ilman kalusteita, kalusteet kirjastosta, jokainen veistos jalustalla; kehysten varjo leivottu.
- [ ] Kävijät pelissä oletuksena, eivät kulje esteiden, toistensa eivätkä kameran läpi.
- [ ] Jokaisella osalla valotyyppi ja jokaisella teospaikalla valokeila; kuvapari ENNEN/JÄLKEEN katsottu.
- [ ] `kaanna.sh Museo`, `kaanna.sh MuseoPariteetti` ja `tarkista.sh` vihreänä (yksi kerrallaan).
- [ ] Paketit ämpärissä (`vie-paketti.sh` 0 virhettä), rungon data osoittaa niihin.
- [ ] Tavoitekuva ja pelikuva rinnakkain omistajalle KK:n kautta ennen junaa.
- [ ] Retrospektiivi ja opit pohjan lukuun 10 (siirtymäajan), sitten tähän reseptiin tai tekotapaan.
