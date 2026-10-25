# Lavastaja → Codex (Tripo 3D): salin tummat penkit ja kaapit, 25.10.2026 klo 03.18

Tilaus pohjan `docs/moduulit/tuotantopohjat/codex-3d-toimitus.md` mukaan. Kopio PT:lle.

**Peruste:** PT 25.10. (omistajan linja "identtiseksi" = ulkoasu): juoksupelin avointen salien sisustus havainnekuvan 810/04 mukaan.
Siniset matot, sermit ja maljakot on poistettu (avoimet-v36). Tilalle tulevat havainteen tummat puiset penkit ja kaapit seinien
vierelle. Valmiita hyväksyttyjä malleja ei ole (_valmiit ja Codexin toimitukset tarkistettu).

**Lupa:** Tripo pysyvällä luvalla (omistaja 21.10. klo 17.28, Raamattu 7.15; PT 25.10. "Pysyvä lupa 7.15"). Yksi otto per malli, ei
vertailuottoja.

**Havainnekuva (tavoite):** `/Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/identtisyys-erot/b11-20261025/havainne-810-04-sali.png`
(sali katto avattuna: penkit ja kaapit seinien vierellä pylväiden välissä). Nykytila: `…/b11-20261025/04-pari.png`.

## Mallit

| Nimi | Tyyppi | Koko (todellinen, m) | Kuvaus |
|---|---|---|---|
| `salin-penkki` | esine, liikkumaton | 1,60 × 0,45 × 0,50 (l × s × k) | Qing-kauden tumma punaruskea puupenkki (zitan/hongmu), suora istuin, kaiverretut sivupaneelit ja helmanauha, suorat jalat kuten havainteessa |
| `salin-kaappi` | esine, liikkumaton | 0,90 × 0,45 × 1,20 | sama puu, kaksioviset kaiverretut paneeliovet, messinkiset vetimet ja saranalevyt, matala jalusta |

- **LIIKE:** kumpikaan ei liiku. Toimitus ilman luurankoa ja animaatioita.
- **Pivot:** pohjan keskellä, alareuna y = 0, +Y ylös, glTF +Z eteen (istuimen/ovien puoli), metrit, root scale 1.
- **Mobiilirajat (pohjan luku 6):** penkki ≤ 3 000 ja kaappi ≤ 3 000 kolmiota, PBR 1024 px (perusväri, normaali, metallic-roughness).
  Ei läpinäkyvyyttä. Karheus vähintään 0,3 (lakattu puu, ei peilikiiltoa; vrt. #948:n lautaset).
- **Referenssikuvat:** edestä, sivulta ja takaa, tasainen valo, harmaa tausta.
- **PLACEMENTS:** ei tarvita. Lavastaja sijoittaa mallit avoimiin huoneisiin (juhlasali, työhuone, varasto, puutarha) seinien
  vierelle pylväsvälien kohdalle, kuten havainteessa (kaksi penkkiä ja yksi kaappi per pitkä seinä).

## Kytkentä

Lavastaja vastaanottaa portilla (`node tools/codex-3d-tarkistus.mjs`), kokoaa avoimet-v37:ksi ja tekee havainne/pelikuva-parin
PT:lle. Kohtaus: juoksupelin palatsin avoimet salit (810/04). Toimituskansio
`output/juoksupeli-salin-penkit-kaapit-<pvm>/delivery-v1` ja viesti postiin kuten #948.
