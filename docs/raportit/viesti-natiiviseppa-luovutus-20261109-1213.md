# Natiivisepän luovutus 9.11.2026 klo 12.13

Edellinen: git show 0cffb5031:docs/raportit/viesti-natiiviseppa-luovutus-20261109-1142.md (tausta: paluulento, FPV-latauskuva).
Sessio Natiiviseppä, kansio Matkakirja-3d-selvittaja, tili sami.reivinen@vvi.fi. Nollauksen syy: konteksti 26 % (7.37).
Id:t /Users/Shared/Claude/osoitekirja.md: PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31, JU local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd,
NUI local_4b84cd90-123f-46c5-bc07-75760ed4c80b.
Cron "4 9 * * *" unity-julkaisut.py: LUO UUDELLEEN (prompt: git show 9d77cf4dd:docs/raportit/viesti-natiiviseppa-luovutus-20261108-2320.md rivit 6–7).

## 1. PALUULENNON P-5A: PALUUN ESILATAUS (PT 12.2x PÄÄTTI A+B) – TEE ENSIN
Selvitys: /Users/Shared/Claude/proto-3d/lokit/natiiviseppa-ardeche-paikallaan-iphone/NS-paluu-p5a-selvitys.md (lue).
Lyhyesti: paluu Marseille → Ranska nousee 8 → 86 km ~0,9 s:ssa Ardèchen yli; paikallaan sama alue 30 km terävä → laatat eivät ehdi verkosta.
Ennakko 0,6/1,2 (75c0c0c47) ja loadingDescendantLimit 1000 eivät auttaneet.
- B TEHTY: 75c0c0c47 peruttu d82fc5886 (wt /Users/Shared/Claude/wt/proto-natiiviseppa-nostolento, haara natiiviseppa/noston-lento,
  pushattu natiivi-backup). AjoEnnakko.Paivita(kierto, erikois) on taas kaksiparametrinen.
- A TEKEMÄTTÄ (PT: "esilataus vain kun perillä on ladattu, ei hidasta perilläoloa; muistihuippu iPhonella lokiin ajossa; sovi NUI:n
  kanssa yksi kutsu; koehaara + JU:n p-5a-ajo → PT"). Suunnitelma (samaan wt:hen):
  * PalloKierto: `PaluuOdottaa(lat, lon, korkeusM, double? kallistukseen)` ja `PaluuPois(string syy)`; Aja():ssa ajo.matka-lohkon jälkeen
    automaattinen PaluuPois("paluu alkoi"), kun matkalennon kohde ≈ paluun kohde (0,01°). Esilataus käynnistyy vasta, kun ei lentoa
    (ajo == null tai ajo.aika ≥ ajo.pallo.Kesto) ja KarttaKerrokset.Instanssi.pallo.ComputeLoadProgress() ≥ 95 % yhtäjaksoisesti 1 s;
    sen jälkeen pysyy päällä (hystereesi), kunnes paluu alkaa tai PaluuPois.
  * `PaluunEsiAsento(osuus, out paikka, out asento, out etäisyys)`: rakenna 1 s välein nykytilasta PalloAjo kuten Etene():ssä
    (MatkaLento.Mitoita kuten MitoitaMatka, mutta ÄLÄ aseta mitoitusKehys/-Kohde; kallistus paluuKallistus ?? kallistus; nimi "matkalento";
    huippu m.HuippuM), käynnistä `new Kamerajohtaja(new PalloTila(leveys, pituus, korkeus, kallistus, suuntima).Asento).Lisaa(ajo).Paivita(0)`
    (Aloita on internal), sitten asento kuten AjonEnnakkoAsento:ssa (LaskeAsento + korkeus/kallistus väliaikaisesti).
  * AjoEnnakko: `PaivitaPaluu(kierto)` osuuksilla {0,3; 0,45; 0,6} keston ajasta (t ≈ 1,3/1,9/2,6 s 4,3 s:n paluussa = sumea vaihe);
    tilan vaihto ajo ↔ paluu → Irrota ja Kiinnita (kirjaa kiinnitetty n). PalloKierto ~865: lento → Paivita, muuten esilataus → PaivitaPaluu,
    muuten Paivita(-1).
  * Loki: "MATKAKIRJA paluun esilataus: alkaa (pallo X %, muisti Y Mt)" ja paluun alkaessa "…: paluu alkoi, esiladattu Z s, muistihuippu
    Y Mt" (Profiler.GetTotalAllocatedMemoryLong + GetAllocatedMemoryForGraphicsDriver, huippu kehyksittäin esilatauksen aikana).
  * Komento `maasto paluu <lat> <lon> <h> [kallistus] | pois | tila` (Komennot.cs, maasto ajoennakko -kohdan viereen).
  * Koe ilman NUI:n koodia: koehaara natiiviseppa/ennakko-paluu-koe (wt /Users/Shared/Claude/wt/proto-natiiviseppa-ennakkokoe; nyt
    d79031961 = NUI 5f8860254 + 75c0c0c47 → merge natiiviseppa/noston-lento uudelleen). Skenaario: kopioi
    /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/matkalento-paluu/sk-paluu-jalkelaisraja.txt, poista "maasto lataus" -rivi ja lisää p-4:n
    jälkeen ennen "ui pinnaus pois": `komento maasto paluu 46.8 2.4 835500 0` + `odota 8` (paluun kohde lokista "paluu odottaa (46.8, 2.4)
    835.5 km"). JU-ajo iphone → katso p-5a ja p-5b täysikokoisina (vertailu natiiviseppa-ennakko-paikkapalkki-iphone p-5a) → PT 3 riviä.
  * NUI:lle yksi kutsu: NostonLennossa, kun paluu odottaa (perillä), `kierto.PaluuOdottaa(lat, lon, h, kallistus)`; nosto vaihtuu tai
    pelaaja liikuttaa → `PaluuPois(syy)`. Paluun alku poistaa itse. NUI odottaa korjausta (ei yhdistä koehaaraa ennen sitä).
- unity-tarkistus: `sh Peli-testit/unity-tarkistus.sh` (EI zsh).

## 2. FPV-KAMERAKULMA (PT 12.0x) – ODOTTAA JU:N AJOA
- TEHTY e3379a7de (wt /Users/Shared/Claude/wt/proto-natiiviseppa-fpvkamera, haara natiiviseppa/fpv-kamerakulma, pushattu): automaatti 3°,
  manuaali 30°, liukuu 0,5 s; komento `fpv kamera <manu> [fov] [auto]`. NUI yhdisti fpv-napit-haaraan 9d32d7d84.
- JU ajaa (ketju CC) /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/sk-fpv-kamerakulma.txt → lokit/natiiviseppa-fpv-kamerakulma-iphone.
  KATSO fk-1…fk-4 täysikokoisina (fk-1 horisontti keskellä, fk-3 30° ylös, fk-2 kesken) → PT:lle kuvat + rivi.
- Korkeus 6 370 m: PT oikaisi, oikea lentokorkeus, ei tehtävää.

## 3. ODOTTAA: FPV-LATAUSKUVA PUHELIMELLE (ennallaan)
Codexin puhelinmuotoja (posti/drone-vastavalo-puhelin-20261109/) ei vielä postilaatikossa; posti/drone-vastavalo-vaaka-pysty-20261109 on
jo käytössä oleva pari (sha e669c45f…/d7641c8b…), ei puhelinkuva.

## JONO
1. Paluun esilataus (A). 2. FPV-kamerakulman kuvat → PT. 3. FPV-puhelinkuvat.
